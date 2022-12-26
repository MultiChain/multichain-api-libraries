MultiChain JSON-RPC API Library for Node.js
===========================================

Official Node.js library for the [JSON-RPC API](https://www.multichain.com/developers/json-rpc-api/) of [MultiChain](https://www.multichain.com/), the enterprise blockchain platform. This library uses a "catch-all" approach rather than a fixed list of API commands and parameters, so it will continue to work as new commands and parameters appear in new versions of MultiChain.


System Requirements
-------------------

* MultiChain Community, Enterprise Demo or Enterprise
* Node.js 6.4+


How to Use the Library
----------------------

1. Ensure the `multichain.js` file is accessible from within your Node.js project.

2. Add the following to the top of any Node.js file which accesses the API, replacing `/path/to` as appropriate:

	`const MultiChainClient = require('/path/to/multichain.js');`
	
3. Within your code, initialize the connection to MultiChain as follows, replacing variable values as appropriate:

```	
var rpchost='127.0.0.1'; // change if multichaind is not running locally
var rpcport=1234; // usually default-rpc-port in blockchain parameters
var rpcuser='multichainrpc'; // see multichain.conf in blockchain directory
var rpcpassword='CowAa1xM47GVrasYq71UU2KfhNV9fCuba28WkoiZmCa3'; // see multichain.conf in blockchain directory

const mc=new MultiChainClient(rpchost, rpcport, rpcuser, rpcpassword);
```

4. Access any of MultiChain's [API commands](https://www.multichain.com/developers/json-rpc-api/) in the intuitive way. The last parameter is a callback function that is called with two arguments. The first argument is a `status` object containing three properties – `success`, `errorcode` and `errormessage`. The second contains the result of the API call. Example of usage:

```
mc.publish('stream1', 'key1', {'json' : {'name' : 'John', 'age' : 30}}, (status, txid) => {
	if (status.success) {
		// operation was successful, do something with txid

	} else { // operation failed
		console.log('Error code: '+status.errorcode);
		console.log('Error message: '+status.errormessage);
	}
});
```

5. Of course, the JSON data types used by the MultiChain API map naturally to JavaScript types, including strings, numbers, booleans, arrays, objects and null. If you're not sure what to expect in an API response, `console.log()` and the `JSON.stringify()` function can help.

6. See the `examples.js` file for an extensive list of examples.


Using the API with SSL
----------------------

If `multichaind` is running on a different server to your application, you may wish to set up an SSL proxy for accessing the MultiChain API. This proxy should run on the same server as `multichaind`, accept incoming SSL connections on your port of choice, and forward them to the `rpcport` being used by MultiChain. A huge number of free and open source SSL proxies are available, so we won't recommend anything specific.

After setting up the API proxy, use this library to connect to it as follows:

```
var rpchost='127.0.0.1'; // change if multichaind is not running locally
var rpcport=1234; // usually default-rpc-port in blockchain parameters
var rpcuser='multichainrpc'; // see multichain.conf in blockchain directory
var rpcpassword='CowAa1xM47GVrasYq71UU2KfhNV9fCuba28WkoiZmCa3'; // see multichain.conf in blockchain directory
var usessl=true;

const mc=new MultiChainClient(rpchost, rpcport, rpcuser, rpcpassword, usessl);
```

If you wish to turn off SSL certification verification (less secure), set the `NODE_TLS_REJECT_UNAUTHORIZED` [environment variable](https://nodejs.org/api/cli.html#node_tls_reject_unauthorizedvalue) to `0` when running your Node.js project.


Other Options
-------------

All options should be set after creating the `mc` object and before sending API commands.

* To verify the blockchain name, set the option below. If the chain name does not match, all API commands will return an error.

```
mc.setoption('chainname', 'chain1');
```
