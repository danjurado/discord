'use strict';
const _ = require('lodash');
const EventEmitter = require('eventemitter2').EventEmitter2;
const util = require('util');
const debug = require('debug')('BitMEX:realtime-api');
const createSocket = require('./lib/createSocket');
const getStreams = require('./lib/getStreams');

const endpoints = {
  production: 'wss://www.bitmex.com/realtime',
  testnet: 'wss://testnet.bitmex.com/realtime'
};
const noSymbolTables = BitMEXClient.noSymbolTables = [
  'account',
  'affiliate',
  'funds',
  'insurance',
  'margin',
  'transact',
  'wallet',
  'announcement',
  'connected',
  'chat',
  'publicNotifications',
  'privateNotifications'
];

module.exports = BitMEXClient;

function BitMEXClient(options) {
  const emitter = this;
  // We inherit from EventEmitter2, which supports wildcards.
  EventEmitter.call(emitter, {
    wildcard: true,
    delimiter: ':',
    maxListeners: Infinity,
    newListener: true,
  });
  if (!options) options = {};
  if (!options.endpoint) {
    options.endpoint = options.testnet ? endpoints.testnet : endpoints.production;
  }
  if (process.env.BITMEX_ENDPOINT) options.endpoint = process.env.BITMEX_ENDPOINT;
  debug(options)

  this._setupListenerTracking();

  // Initialize the socket.
  this.socket = createSocket(options, emitter);
  if (options.apiKeyID) {
    this.authenticated = true;
  }

  // Get valid streams so we can validate our subscriptions.
  getStreams(options.endpoint, function(err, streams) {
    if (err) throw err;
    emitter.initialized = true;
    emitter.streams = streams;
    emitter.emit('initialize');
  });
}
util.inherits(BitMEXClient, EventEmitter);

/**
 * Simple data getter. Clones data on the way out so it can be safely modified.
 * @param  {String} [symbol]    Symbol of data to retrieve.
 * @param  {String} [tableName] Table / stream name.
 * @return {Object}             All current data. If no tableName is provided, will return an object keyed by
 *                              the table name.
 */

/**
 * Add a stream to listen to. This function calls back with a full dataset with the arity
 * (data, symbol, tableName).
 *
 * To catch errors, attach an 'error' listener to the client itself.
 *
 * If no tableName is passed, will subscribe to all public tables.
 *
 * @param {String}   symbol    Symbol to subscribe to.
 * @param {String}   [tableName] Table to subscribe to. See README.
 * @param {Function} callback  Data callback.
 */
BitMEXClient.prototype.addStream = function(symbol, tableName, callback) {
  const client = this;
  if (!this.initialized) {
    return this.once('initialize', () => client.addStream(symbol, tableName, callback));
  }
  if (!this.socket.opened) {
    // Not open yet. Call this when open
    return this.socket.once('open', () => client.addStream(symbol, tableName, callback))
  }

  // Massage arguments.
  if (typeof callback !== 'function') throw new Error('A callback must be passed to BitMEXClient#addStream.');

  else if (client.streams.all.indexOf(tableName) === -1) {
    throw new Error('Unknown table for BitMEX subscription: ' + tableName +
      '. Available tables are ' + client.streams.all + '.');
  }

  addStreamHelper(client, symbol, tableName, callback);
};

BitMEXClient.prototype._setupListenerTracking = function() {
  // Keep track of listeners.
  const listenerTree = this._listenerTree = {};
  this.on('newListener', (eventName) => {
    const split = eventName.split(':');
    if (split.length !== 3) return; // other events

    const [table, , symbol] = split;
    if (!listenerTree[table]) listenerTree[table] = {};
    if (!listenerTree[table][symbol]) listenerTree[table][symbol] = 0;
    listenerTree[table][symbol]++;
  });
  this.on('removeListener', (eventName) => {
    const split = eventName.split(':');
    if (split.length !== 3) return; // other events
    const [table, , symbol] = split;
    listenerTree[table][symbol]--;
  });
}

BitMEXClient.prototype.subscriptionCount = function(table, symbol) {
  return this._listenerTree[table] && this._listenerTree[table][symbol] || 0;
};

BitMEXClient.prototype.sendSubscribeRequest = function(table, symbol) {
  console.log(JSON.stringify({op: 'subscribe', args: `${table}:${symbol}`}))
  this.socket.send(JSON.stringify({op: 'subscribe', args: `${table}:${symbol}`}));
};

function addStreamHelper(client, symbol, tableName, callback) {
  const tableUsesSymbol = noSymbolTables.indexOf(tableName) === -1;
  if (!tableUsesSymbol) symbol = '*';

  // Tell BitMEX we want to subscribe to this data. If wildcard, sub to all tables.
  let toSubscribe;
  if (tableName === '*') {
    // This list comes from the getSymbols call, which hits
    // https://www.bitmex.com/api/v1/schema/websocketHelp
    toSubscribe = client.streams[client.authenticated ? 'all' : 'public'];
  } else {
    // Normal sub
    toSubscribe = [tableName];
  }

  // For each subscription,
  toSubscribe.forEach(function(table) {
    // Create a subscription topic.
    const subscription = `${table}:*:${symbol}`;

    debug('Opening listener to %s.', subscription);

    // Add the listener for deltas before subscribing at BitMEX.
    // These events come from createSocket, which does minimal data parsing
    // to figure out what table and symbol the data is for.
    //
    // The emitter emits 'partial', 'update', 'insert', and 'delete' events, listen to them all.
    client.on(subscription, function(data) {
      const [table, action, symbol] = this.event.split(':');

      try {
        callback(data, symbol);
      } catch(e) {
        client.emit('error', e);
      }
    });

    // If this is the first sub, subscribe to bitmex adapter.
    if (client.subscriptionCount(table, symbol) === 1) {
      const openSubscription = () => client.sendSubscribeRequest(table, symbol);
      // If we reconnect, will need to reopen.
      client.on('open', openSubscription);
      // If we're already opened, prime the pump (I made that up)
      if (client.socket.opened) openSubscription();
    }
  });
}

function clone(data) {
  return data.map(o => Object.assign({}, o));
}

if (require.main === module) {
  console.error('This module is not meant to be run directly. Try running example.js instead.');
  process.exit(1);
}
