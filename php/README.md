MultiChain API Library for PHP
==============================

Official PHP library for the [JSON-RPC API](https://www.multichain.com/developers/json-rpc-api/) of [MultiChain](https://www.multichain.com/), the enterprise blockchain platform. This library uses a "catch-all" approach rather than a fixed list of API commands and parameters, so it will continue to work as new commands and parameters appear in new versions of MultiChain.


System Requirements
-------------------

* MultiChain Community, Enterprise Demo or Enterprise
* PHP 5+


How to Use the Library
----------------------

1. Ensure the `multichain.php` file is accessible from within your PHP project.

2. Add the following to the top of any PHP file which accesses the API, replacing `/path/to` as appropriate:

	`require_once '/path/to/multichain.php';`
	
3. Within your code, initialize the connection to MultiChain as follows, replacing variable values as appropriate:

```	
	$rpchost='127.0.0.1'; // change if multichaind is not running locally
	$rpcport=1234; // usually default-rpc-port in blockchain parameters
	$rpcuser='multichainrpc'; // see multichain.conf in blockchain directory
	$rpcpassword='CowAa1xM47GVrasYq71UU2KfhNV9fCuba28WkoiZmCa3'; // see multichain.conf in blockchain directory

	$mc=new MultiChainClient($rpchost, $rpcport, $rpcuser, $rpcpassword);
```

4. Access any of MultiChain's [API commands](https://www.multichain.com/developers/json-rpc-api/) in the intuitive way, e.g.:

```
	$txid=$mc->publish('stream1', 'key1', ['json' => ['name' => 'John', 'age' => 30]]);
```

5. Check for errors after any API command, including those which return no results, as follows:

```
	if ($mc->success()) {
		// operation was successful
	
	} else { // operation failed		
		echo 'Error code: '.$mc->errorcode()."\n";
		echo 'Error message: '.$mc->errormessage()."\n";
	}
```

6. The JSON data types used by the MultiChain API map naturally to PHP types, including strings, numbers, booleans and null. Use a PHP indexed array to represent a JSON array, and a PHP associative array to represent a JSON object. If you're not sure what to expect in an API response, PHP's `print_r()` and `var_dump()` functions can help.

7. See the `examples.php` file for an extensive list of examples.


Using the API with SSL
----------------------

If `multichaind` is running on a different server to your application, you may wish to set up an SSL proxy for accessing the MultiChain API. This proxy should run on the same server as `multichaind`, accept incoming SSL connections on your port of choice, and forward them to the `rpcport` being used by MultiChain. A huge number of free and open source SSL proxies are available, so we won't recommend anything specific.

After setting up the API proxy, use this library to connect to it as follows:

```
	$sslhost='34.56.78.90'; // host where SSL proxy is running
	$sslport=1234; // incoming port of SSL proxy
	$rpcuser='multichainrpc'; // see multichain.conf in blockchain directory
	$rpcpassword='CowAa1xM47GVrasYq71UU2KfhNV9fCuba28WkoiZmCa3'; // see multichain.conf in blockchain directory
	$usessl=true;

	$mc=new MultiChainClient($sslhost, $sslport, $rpcuser, $rpcpassword, $usessl);
```

If you wish to turn off SSL certification verification (less secure), call this immediately afterwards:

```
	$mc->setoption(MC_OPT_VERIFY_SSL, false);
```


Other Options
-------------

All options should be set after creating the `$mc` object and before sending API commands.

* To verify the blockchain name, set the option below. If the chain name does not match, all API commands will return an error.

```
	$mc->setoption(MC_OPT_CHAIN_NAME, 'chain1');
```

* By default, this library uses curl if SSL is enabled, and a direct socket connection otherwise. To use curl in all cases, set the option below: 

```
	$mc->setoption(MC_OPT_USE_CURL,true);
```