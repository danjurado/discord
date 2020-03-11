### Node.JS Adapter for BitMEX Realtime Data (Modified + Wrapper)

Modification of the reference adapter for receiving realtime data from the BitMEX API.

Modification - removed in memory table store. Returns the incoming data and action (partial, insert, update or delete) to your callback.
Wrapper - added heartbeat to detect and reconnect silently broken connections. Still depends on the reference code to reconnect or end the stream in other situations.

#### Usage

> The following is runnable in [example2.js](example2.js).

To get started, create a new client:

```js
const BitMEXClient = require('@terminal123/bitmex-api-lite');
// See 'options' reference below
const client = BitMEXClient({testnet: true});
```

Then subscribe to a symbol and table, and pass a callback.

```js
client.addStream('XBTUSD', 'instrument', function (stream, symbol) {
  const { table, action, data } = stream;
  // Do something with the data...
});
```

#### API Reference

##### BitMEXClient(object options)

Options:

```js
{
  testnet: false, // set `true` to connect to the testnet site (testnet.bitmex.com)
  // Set API Key ID and Secret to subscribe to private streams.
  // See `Available Private Streams` below.
  apiKeyID: '',
  apiKeySecret: ''
}
```

##### client.addStream(string symbol, [string tableName], function callback)

Subscribe to a data stream. Pass a symbol to subscribe to all public data for an instrument.

Pass `tableName` to receive data for a specific table.

```js
client.addStream('XBTUSD', 'quote', function (stream, symbol) {
  const { table, action, data } = stream;
  if (!data.length) return;
  const quote = data[data.length - 1];  // the last data element is the newest quote
  // Do something with the quote (.bidPrice, .bidSize, .askPrice, .askSize)
});
```

##### client.on(string eventName, function callback)

The client also doubles as a basic EventEmitter. The following events are fired:

```
"initialize"  // Socket initialized, client.streams available
"error"
"open"
"close"
```
Example:
```js
client.on('initialize', () => {
  console.log(client.streams);  // Log .public, .private and .all stream names
});
```

**Note**: The wrapper has an error handler attached by default so that unhandled errors will not crash your client. However there is no handler attached for the "end" event.

#### Available Public Streams

The streams below echo the models described in the [API Explorer](https://www.bitmex.com/api/explorer).

```
"chat",         // Trollbox
"instrument",   // Instrument updates including turnover and bid/ask
"liquidation",  // Liquidations
"orderBookL2",  // Full orderBook using deltas
"orderBook10",  // Last 10 bids and asks (price and size)
"quote",        // Top level of the book
"trade"         // Trades
...             // See https://www.bitmex.com/app/wsAPI#Subscriptions for more streams
```

#### Available Private Streams

The following streams require authentication via an API key. Use
[this Python script](https://github.com/BitMEX/market-maker/blob/master/generate-api-key.py) to easily create a key.

```
"execution",    // Individual order placements and executions, settlements, commissions
"margin",       // Your account's margin details
"order",        // Order creations, cancellations, and updates
"position"      // Your positions, per instrument
...             // See https://www.bitmex.com/app/wsAPI#Subscriptions for more streams
```

### Debugging

For much more information on what this module is doing, run it with the `DEBUG` environment variable. For example:

```bash
# Display all debug messages
DEBUG=* node example.js
# Display all high-level debug messages
DEBUG=BitMEX:* node example.js
```
