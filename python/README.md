MultiChain JSON-RPC API Library for Python
==========================================

Official Python library for the [JSON-RPC API](https://www.multichain.com/developers/json-rpc-api/) of [MultiChain](https://www.multichain.com/), the enterprise blockchain platform. This library uses a "catch-all" approach rather than a fixed list of API commands and parameters, so it will continue to work as new commands and parameters appear in new versions of MultiChain.


System Requirements
-------------------

* MultiChain Community, Enterprise Demo or Enterprise
* Python 3+


How to Use the Library
----------------------

1. Ensure the `multichain.py` file is accessible from within your Python project.

2. Add the following to the top of any Python file which accesses the API, replacing `path.to` as appropriate:

	`import path.to.multichain`
	
3. Within your code, initialize the connection to MultiChain as follows, replacing variable values as appropriate:

```	
rpchost='127.0.0.1' # change if multichaind is not running locally
rpcport=1234 # usually default-rpc-port in blockchain parameters
rpcuser='multichainrpc' # see multichain.conf in blockchain directory
rpcpassword='CowAa1xM47GVrasYq71UU2KfhNV9fCuba28WkoiZmCa3' # see multichain.conf in blockchain directory

mc=MultiChainClient(rpchost, rpcport, rpcuser, rpcpassword)
```

4. Access any of MultiChain's [API commands](https://www.multichain.com/developers/json-rpc-api/) in the intuitive way, e.g.:

```
txid=mc.publish('stream1', 'key1', {'json' : {'name' : 'John', 'age' : 30}})
```

5. Check for errors after any API command, including those which return no results, as follows:

```
if mc.success():
	pass # operation was successful

else: # operation failed		
	print('Error code: '+str(mc.errorcode())+'\n')
	print('Error message: '+mc.errormessage()+'\n')
```

6. The JSON data types used by the MultiChain API map naturally to Python types, including strings, numbers, booleans, arrays, objects and null. If you're not sure what to expect in an API response, Python's [pretty printer](https://docs.python.org/3/library/pprint.html) can help.

7. See the `examples.py` file for an extensive list of examples.


Using the API with SSL
----------------------

If `multichaind` is running on a different server to your application, you may wish to set up an SSL proxy for accessing the MultiChain API. This proxy should run on the same server as `multichaind`, accept incoming SSL connections on your port of choice, and forward them to the `rpcport` being used by MultiChain. A huge number of free and open source SSL proxies are available, so we won't recommend anything specific.

After setting up the API proxy, use this library to connect to it as follows:

```
sslhost='34.56.78.90' # host where SSL proxy is running
sslport=1234 # incoming port of SSL proxy
rpcuser='multichainrpc' # see multichain.conf in blockchain directory
rpcpassword='CowAa1xM47GVrasYq71UU2KfhNV9fCuba28WkoiZmCa3' # see multichain.conf in blockchain directory
usessl=True

mc=MultiChainClient(sslhost, sslport, rpcuser, rpcpassword, usessl)
```

If you wish to turn off SSL certification verification (less secure), call this immediately afterwards:

```
mc.setoption('verifyssl', False)
```


Other Options
-------------

All options should be set after creating the `mc` object and before sending API commands.

* To verify the blockchain name, set the option below. If the chain name does not match, all API commands will return an error.

```
mc.setoption('chainname', 'chain1')
```