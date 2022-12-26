/*
    MultiChain JSON-RPC API Library for Node.js
    
    Copyright (c) Coin Sciences Ltd - www.multichain.com
    
    All rights reserved under BSD 3-clause license
    
    Examples of Node.js library usage, for more details see:
    https://www.multichain.com/developers/json-rpc-api/
*/

return; // in case this file is run accidentally!


/***********************/
/*  General utilities  */
/***********************/

mc.getblockchainparams((status, result) => {
});

mc.gethealthcheck((status, result) => {
});

mc.getruntimeparams((status, result) => {
});

mc.setruntimeparam('maxshowndata', 16384, (status) => { // no result, check status.success
});

mc.getinfo((status, result) => {
});

mc.getinitstatus((status, result) => {
});



/*******************************/
/*  Managing wallet addresses  */
/*******************************/

mc.addmultisigaddress(2, [address1, address2], (status, address) => {
});

mc.getaddresses((status, result) => {
});

mc.getnewaddress((status, address) => {
});


mc.importaddress(address, (status) => { // no result, check status.success
});

mc.importaddress([address1, address2], (status) => { // no result, check status.success
});


mc.listaddresses((status, result) => { // all addresses
});

mc.listaddresses(address, (status, result) => { // one specific address
});

mc.listaddresses([address1, address2], (status, result) => { // multiple specific addresses
});



/***************************************/
/*  Working with non-wallet addresses  */
/***************************************/

mc.createkeypairs((status, result) => {
});

mc.createmultisig(2, [address1, address2], (status, result) => {
});


mc.validateaddress(address, (status, result) => {
});

mc.validateaddress(privkey, (status, result) => {
});



/****************************/
/*  Permissions management  */
/****************************/

mc.grant(address, 'send,receive', (status, txid) => { // global permission
});

mc.grant(address, 'stream1.write', (status, txid) => { // per-entity permission
});

mc.grant(address1+','+address2, 'connect', (status, txid) => { // multiple addresses
});

mc.grantfrom(fromaddress, address, 'create', (status, txid) => {
});


// see online API documentation for many more ways to attach data
mc.grantwithdata(address, 'connect', 'a1b2c3d4', (status, txid) => { // raw binary data
});

mc.grantwithdata(address, 'connect', {'for' : 'stream1', 'keys' : ['key1'], 'data' : {'json' : {'name' : 'Mary'}}}, (status, txid) => { // JSON stream item
});

mc.grantwithdatafrom(frommaddress, address, 'issue', 'a1b2c3d4', (status, txid) => {
});


mc.listpermissions((status, result) => { // all permissions
});

mc.listpermissions('send,receive', (status, result) => { // specific permissions
});

mc.listpermissions('*', address, (status, result) => { // one specific address
});

mc.listpermissions('*', [address1, address2], (status, result) => { // multiple specific addresses
});


mc.revoke(address, 'send,receive', (status, txid) => {
});

mc.revokefrom(fromaddress, address, 'create', (status, txid) => {
});


mc.verifypermission(address, 'send', (status, result) => {
});



/**********************/
/*  Asset management  */
/**********************/

mc.getassetinfo('asset1', (status, result) => {
});

mc.gettokeninfo('asset1', 'token1', (status, result) => {
});


// see online API documentation for many more options when issuing an asset
mc.issue(address, {'name' : 'asset1'}, 1000, 0.01, (status, txid) => { // fungible asset
});

mc.issue(address, {'name' : 'asset1', 'open' : true}, 1000, 0.01, (status, txid) => { // allow reissuance
});

mc.issue(address, {'name' : 'asset1'}, 1000, 0.01, 0, {'origin' : 'US'}, (status, txid) => { // custom fields
});

mc.issue(address, {'name' : 'nfts1', 'fungible' : false, 'open' : true}, 0, 1, (status, txid) => { // non-fungible asset
});

mc.issuefrom(fromaddress, address, {'name' : 'asset1'}, 1000, 0.01, (status, txid) => { // fungible asset
});


mc.issuemore(address, 'asset1', 100, (status, txid) => {
});

mc.issuemore(address, 'asset1', 100, 0, {'origin' : 'EU'}, (status, txid) => { // custom fields
});

mc.issuemorefrom(fromaddress, address, 'asset1', 100, (status, txid) => {
});


mc.issuetoken(address, 'nfts1', 'token1', 1, (status, txid) => {
});

mc.issuetoken(address, 'nfts1', 'token1', 1, 0, {'origin' : 'UK'}, (status, txid) => { // token details
});

mc.issuetokenfrom(fromaddress, address, 'nfts1', 'token1', 1, (status, txid) => {
});


mc.listassetissues('asset1', (status, result) => {
});

mc.listassetissues('asset1', false, 10, 30, (status, result) => { // paging through issues
});


mc.listassets((status, result) => { // all assets
});

mc.listassets('asset1', (status, result) => { // one specific asset
});

mc.listassets(['asset1', 'asset2'], (status, result) => { // multiple specific assets
});

mc.listassets('*', false, 10, 30, (status, result) => { // paging through assets
});


mc.update('asset1', {'open' : true}, (status, txid) => {
});

mc.updatefrom(fromaddress, 'asset1', {'open' : false}, (status, txid) => {
});



/***********************************************/
/*  Querying wallet balances and transactions  */
/***********************************************/

mc.getaddressbalances(address, (status, result) => {
});

mc.getaddressbalances(address, 0, (status, result) => { // including unconfirmed transactions
});


mc.getmultibalances((status, result) => { // all addresses, all assets
});

mc.getmultibalances(address, (status, result) => { // one specific address
});

mc.getmultibalances([address1, address2], (status, result) => { // multiple specific addresses
});

mc.getmultibalances('*', 'asset1', (status, result) => { // one specific asset
});

mc.getmultibalances('*', ['asset1', 'asset2'], (status, result) => { // multiple specific assets
});

mc.getmultibalances('*', '*', 0, (status, result) => { // including unconfirmed transactions
});

mc.getmultibalances('*', '*', 1, true, (status, result) => { // including watch-only addresses
});


// the gettokenbalances command supports all the same parameters as getmultibalances
mc.gettokenbalances((status, result) => { // all addresses, all non-fungible assets
});


mc.gettotalbalances((status, result) => {
});

mc.gettotalbalances(0, (status, result) => { // including unconfirmed transactions
});

mc.gettotalbalances(1, true, (status, result) => { // including watch-only addresses
});


mc.getaddresstransaction(address, txid, (status, result) => {
});

mc.getwallettransaction(txid, (status, result) => {
});

mc.listaddresstransactions(address, (status, result) => { // 10 most recent
});

mc.listaddresstransactions(address, 10, 30, (status, result) => { // paging backwards through transactions
});

mc.listwallettransactions((status, result) => { // 10 most recent
});

mc.listwallettransactions(10, 30, (status, result) => { // paging backwards through transactions
});



/******************************/
/*  Sending one-way payments  */
/******************************/

// see online API documentation for native currency, multiple assets, inline metadata
mc.send(address, {'asset1' : 20}, (status, txid) => { // one fungible asset
});

mc.send(address, {'asset1' : {'token' : 'token1', 'qty' : 5}}, (status, txid) => { // non-fungible asset token
});

mc.sendfrom(fromaddress, address, {'asset1' : 20}, (status, txid) => {
});


mc.sendasset(address, 'asset1', 20, (status, txid) => {
});

mc.sendassetfrom(fromaddress, address, 'asset1', 20, (status, txid) => {
});


// see online API documentation for many more ways to attach data
mc.sendwithdata(address, {'asset1' : 20}, 'a1b2c3d4', (status, txid) => { // raw binary data
});

mc.sendwithdata(address, {'asset1' : 20}, {'for' : 'stream1', 'keys' : ['key1'], 'data' : {'json' : {'name' : 'Mary'}}}, (status, txid) => { // JSON stream item
});

mc.sendwithdatafrom(fromaddress, address, {'asset1' : 20}, 'a1b2c3d4', (status, txid) => {
});



/**********************************/
/*  Atomic exchange transactions  */
/**********************************/

mc.appendrawexchange(txhex, txid, vout, {'asset1' : 10}, (status, result) => {
});

mc.completerawexchange(txhex_in, txid, vout, {'asset1' : 10}, (status, txhex) => {
});

mc.createrawexchange(txid, vout, {'asset1' : 10}, (status, txhex) => {
});

mc.decoderawexchange(txhex, (status, result) => {
});


mc.disablerawtransaction(txhex, (status, txid) => {
});


mc.preparelockunspent({'asset1' : 10}, (status, result) => {
});

mc.preparelockunspentfrom(fromaddress, {'asset1' : 10}, (status, result) => {
});



/***********************/
/*  Stream management  */
/***********************/

// see online API documentation for more options when creating a stream
mc.create('stream', 'stream1', true, (status, txid) => { // open to all to write
});

mc.create('stream', 'stream1', {'restrict' : 'write'}, (status, txid) => { // write-restricted
});

mc.create('stream', 'stream1', {'restrict' : 'write,read'}, (status, txid) => { // read/write-restricted (requires Enterprise)
});

mc.create('stream', 'stream1', false, {'purpose' : 'inventory'}, (status, txid) => { // custom fields
});

mc.createfrom(fromaddress, 'stream', 'stream1', false, (status, txid) => {
});


mc.getstreaminfo('stream1', (status, result) => {
});

mc.liststreams((status, result) => { // all streams
});

mc.liststreams('stream1', (status, result) => { // one specific stream
});

mc.liststreams(['stream1', 'stream2'], (status, result) => { // multiple specific streams
});

mc.liststreams('*', false, 10, 30, (status, result) => { // paging through streams
});



/*****************************/
/*  Publishing stream items  */
/*****************************/

mc.publish('stream1', 'key1', 'a1b2c3d4', (status, txid) => { // raw binary data
});

mc.publish('stream1', 'key1', {'text' : 'hello world'}, (status, txid) => { // text data
});

mc.publish('stream1', 'key1', {'json' : {'name' : 'John', 'age' : 30}}, (status, txid) => { // JSON data
});

mc.publish('stream1', 'key1', {'cache' : 'Ev1HQV1aUCY'}, (status, txid) => { // data from binary cache
});

mc.publish('stream1', ['key1', 'key2'], 'a1b2c3d4', (status, txid) => { // multiple keys
});

mc.publish('stream1', 'key1', 'a1b2c3d4', 'offchain', (status, txid) => { // data offchain
});

mc.publishfrom(fromaddress, 'stream1', 'key1', 'a1b2c3d4', (status, txid) => {
});


// see online API documentation for multi-publishing offchain
mc.publishmulti('stream1', [
    {'key' : 'key1', 'data' : {'json' : {'name' : 'John', 'age' : 30}}},
    {'keys' : ['key2', 'key3'], 'data' : {'json' : {'name' : 'Iogan', 'age' : 20}}}
], (status, txid) => {
});

mc.publishmultifrom(fromaddress, 'stream1', [
    {'key' : 'key1', 'data' : {'json' : {'name' : 'John', 'age' : 30}}},
    {'keys' : ['key2', 'key3'], 'data' : {'json' : {'name' : 'Iogan', 'age' : 20}}}
], (status, txid) => {
});


/*********************************************/
/*  Managing stream and asset subscriptions  */
/*********************************************/

// none of these commands return a result, check status.success
mc.subscribe('stream1', (status) => { // one asset or stream
});

mc.subscribe(['stream1', 'asset1'], (status) => { // multiple assets or streams
});

mc.subscribe('stream1', true, 'items,keys', (status) => { // partial subscription (requires Enterprise)
});


mc.trimsubscribe('stream1', 'items-local,keys-local', (status) => { // requires Enterprise
});

mc.unsubscribe('asset1', (status) => { // purge off-chain data
});

mc.unsubscribe('stream1', true, (status) => { // purge off-chain data
});



/********************************/
/*  Querying subscribed assets  */
/********************************/

mc.getassettransaction('asset1', txid, (status, result) => {
});

mc.listassettransactions('asset1', (status, result) => { // 10 most recent
});

mc.listassettransactions('asset1', false, 10, 30, (status, result) => { // paging through transactions
});



/*********************************/
/*  Querying subscribed streams  */
/*********************************/

// see online API documentation for verbose, local ordering, more summarization options

mc.liststreamitems('stream1', (status, result) => { // 10 most recent items
});

mc.liststreamitems('stream1', false, 10, 30, (status, result) => { // paging through items
});

mc.liststreamkeyitems('stream1', 'key1', (status, result) => { // 10 most recent key items
});

mc.liststreamkeyitems('stream1', 'key1', false, 10, 30, (status, result) => { // paging through items
});

mc.liststreampublisheritems('stream1', address, (status, result) => { // 10 most recent publisher items
});

mc.liststreampublisheritems('stream1', address, false, 10, 30, (status, result) => { // paging through items
});


mc.liststreamkeys('stream1', (status, result) => { // all keys in stream
});

mc.liststreamkeys('stream1', 'key1', (status, result) => { // one specific keys
});

mc.liststreamkeys('stream1', ['key1', 'key2'], (status, result) => { // multiple specific keys
});

mc.liststreamkeys('stream1', '*', false, 10, 30, (status, result) => { // paging through keys
});

mc.liststreampublishers('stream1', (status, result) => { // all publishers in stream
});

mc.liststreampublishers('stream1', address, (status, result) => { // one specific publisher
});

mc.liststreampublishers('stream1', [address1, address2], (status, result) => { // multiple specific publishers
});

mc.liststreampublishers('stream1', '*', false, 10, 30, (status, result) => { // paging through publishers
});


mc.liststreamblockitems('stream1', 1234, (status, result) => { // one block
});

mc.liststreamblockitems('stream1', '1-100', (status, result) => { // block range
});

mc.liststreamblockitems('stream1', -10, (status, result) => { // most recent blocks
});

mc.liststreamblockitems('stream1', {'starttime' : 1577836800, 'endtime' : 1609459199}, (status, result) => { // blocks stamped in time range
});


mc.getstreamkeysummary('stream1', 'key1', 'jsonobjectmerge', (status, result) => {
});

mc.getstreampublishersummary('stream1', address, 'jsonobjectmerge,recursive', (status, result) => {
});

mc.liststreamqueryitems('stream1', {'keys' : ['key1', 'key2']}, (status, result) => { // items with both keys (AND logic)
});

mc.liststreamqueryitems('stream1', {'key' : 'key1', 'publisher' : address}, (status, result) => { // with key and publisher
});


mc.getstreamitem('stream1', txid, (status, result) => {
});

mc.liststreamtxitems('stream1', txid, (status, result) => {
});


mc.gettxoutdata(txid, vout, (status, hex) => { // all data
});

mc.gettxoutdata(txid, vout, 1048576, 3145728, (status, hex) => { // paging within data
});



/*************************************************/
/*  Controlling offchain data (Enterprise only)  */
/*************************************************/

mc.purgepublisheditems('all', (status, result) => { // all published data, use with extreme caution!
});

mc.purgepublisheditems(txid, (status, result) => { // one specific transaction
});

mc.purgepublisheditems([txid1, txid2], (status, result) => { // multiple specific transactions
});

mc.purgepublisheditems({'blocks' : 1234}, (status, result) => { // one specific block
});

mc.purgepublisheditems({'blocks' : '1-100'}, (status, result) => { // block range
});

mc.purgepublisheditems({'blocks' : {'starttime' : 1577836800, 'endtime' : 1609459199}}, (status, result) => { // blocks in time range
});


mc.purgestreamitems('stream1', 'all', (status, result) => { // all retrieved data in stream
});

mc.purgestreamitems('stream1', txid, (status, result) => { // one specific transaction
});

mc.purgestreamitems('stream1', [txid1, txid2], (status, result) => { // multiple specific transactions
});

mc.purgestreamitems('stream1', {'blocks' : 1234}, (status, result) => { // one specific block
});

mc.purgestreamitems('stream1', {'blocks' : '1-100'}, (status, result) => { // block range
});

mc.purgestreamitems('stream1', {'blocks' : {'starttime' : 1577836800, 'endtime' : 1609459199}}, (status, result) => { // blocks in time range
});

mc.purgestreamitems('stream1', {'key' : 'key1'}, (status, result) => { // one specific key
});

mc.purgestreamitems('stream1', {'keys' : ['key1', 'key2']}, (status, result) => { // items with both keys (AND logic)
});

mc.purgestreamitems('stream1', {'publisher' : address}, (status, result) => { // one specific publisher
});


mc.retrievestreamitems('stream1', 'all', (status, result) => { // all unretrieved data in stream
});

mc.retrievestreamitems('stream1', txid, (status, result) => { // one specific transaction
});

mc.retrievestreamitems('stream1', [txid1, txid2], (status, result) => { // multiple specific transactions
});

mc.retrievestreamitems('stream1', {'blocks' : 1234}, (status, result) => { // one specific block
});

mc.retrievestreamitems('stream1', {'blocks' : '1-100'}, (status, result) => { // block range
});

mc.retrievestreamitems('stream1', {'blocks' : {'starttime' : 1577836800, 'endtime' : 1609459199}}, (status, result) => { // blocks in time range
});

mc.retrievestreamitems('stream1', {'key' : 'key1'}, (status, result) => { // one specific key
});

mc.retrievestreamitems('stream1', {'keys' : ['key1', 'key2']}, (status, result) => { // items with both keys (AND logic)
});

mc.retrievestreamitems('stream1', {'publisher' : address}, (status, result) => { // one specific publisher
});



/*************************************/
/*  Managing wallet unspent outputs  */
/*************************************/

mc.combineunspent((status, txids) => { // see online API documentation for many more options
});


mc.listunspent((status, result) => {
});

mc.listunspent(0, (status, result) => { // including unconfirmed transactions
});

mc.listunspent(1, 999999999, [address1, address2], (status, result) => { // specific addresses only
});


mc.listlockunspent((status, result) => {
});

mc.lockunspent(true, (status, result) => { // unlock all outputs
});

mc.lockunspent(false, [{'txid' : txid, 'vout' : vout}], (status, result) => { // lock specific output
});

mc.lockunspent(true, [{'txid' : txid, 'vout' : vout}], (status, result) => { // unlock specific output
});



/***********************************/
/*  Working with raw transactions  */
/***********************************/

// the next four APIs accept a very large range of parameters for building transactions
// see online documentation, 'help addresses-all' and 'help data-all' inside multichain
// also see next section here for many examples using createrawsendfrom

mc.appendrawdata(txhex_in,
    {'for' : 'stream1', 'key' : 'key1', 'data' : 'a1b2c3d4'},
    (status, txhex) => {
    }
);

mc.appendrawtransaction(txhex_in,
    [{'txid' : txid1, 'vout' : vout1}, {'txid' : txid2, 'vout' : vout2}], // inputs to add
    {address1 : {'asset1' : 10}, address2 : {'asset2' : 20}}, // address-based outputs to add
    [{'for' : 'stream1', 'key' : 'key1', 'data' : 'a1b2c3d4'}], // data outputs to add
    'sign', // additional action to perform
    (status, txhex) => {
    }
);

mc.createrawtransaction(
    [{'txid' : txid1, 'vout' : vout1}, {'txid' : txid2, 'vout' : vout2}], // inputs to add
    {address1 : {'asset1' : 10}, address2 : {'asset2' : 20}}, // address-based outputs to add
    [{'for' : 'stream1', 'key' : 'key1', 'data' : 'a1b2c3d4'}], // data outputs to add
    'send', // additional action to perform
    (status, txhex) => {
    }
);

mc.createrawsendfrom(fromaddress,
    {address1 : {'asset1' : 10}, address2 : {'asset2' : 20}}, // address-based outputs to add
    [{'for' : 'stream1', 'key' : 'key1', 'data' : 'a1b2c3d4'}], // data outputs to add
    'send', // additional action to perform
    (status, txhex) => {
    }
);

mc.appendrawchange(txhex_in, address, (status, txhex) => {
});

mc.decoderawtransaction(txhex, (status, result) => {
});

mc.sendrawtransaction(txhex, (status, txid) => {
});

mc.signrawtransaction(txhex, (status, result) => {
});



/***********************************/
/*  Examples of createrawsendfrom  */
/***********************************/

// sending an empty transaction output (examples for action parameter)
mc.createrawsendfrom(fromaddress, {address : 0}, (status, txhex) => {
});

mc.createrawsendfrom(fromaddress, {address : 0}, [], 'lock', (status, txhex) => { // also lock the inputs
});

mc.createrawsendfrom(fromaddress, {address : 0}, [], 'sign', (status, result) => { // also sign the transaction
});

mc.createrawsendfrom(fromaddress, {address : 0}, [], 'lock,sign', (status, result) => { // lock and sign
});

mc.createrawsendfrom(fromaddress, {address : 0}, [], 'send', (status, txid) => { // sign and send (lock irrelevant)
});


// publishing stream item(s)
mc.createrawsendfrom(fromaddress, {},
    [{'for' : 'stream1', 'key' : 'key1', 'data' : 'a1b2c3d4'}], (status, txhex) => { // raw binary data
    }
);

mc.createrawsendfrom(fromaddress, {},
    [{'for' : 'stream1', 'key' : 'key1', 'data' : {'text' : 'hello world'}}], (status, txhex) => { // text data
    }
);

mc.createrawsendfrom(fromaddress, {},
    [{'for' : 'stream1', 'key' : 'key1', 'data' : {'json' : {'name' : 'John', 'age' : 30}}}], (status, txhex) => { // JSON data
    }
);

mc.createrawsendfrom(fromaddress, {},
    [{'for' : 'stream1', 'key' : 'key1', 'data' : {'cache' : 'Ev1HQV1aUCY'}}], (status, txhex) => { // data from binary cache
    }
);

mc.createrawsendfrom(fromaddress, {},
    [{'for' : 'stream1', 'keys' : ['key1', 'key2'], 'data' : 'a1b2c3d4'}], (status, txhex) => { // multiple keys
    }
);

mc.createrawsendfrom(fromaddress, {},
    [{'for' : 'stream1', 'key' : 'key1', 'data' : 'a1b2c3d4', 'options' : 'offchain'}], (status, txhex) => { // data offchain
    }
);

mc.createrawsendfrom(fromaddress, {}, [
    {'for' : 'stream1', 'key' : 'key1', 'data' : 'a1b2c3d4'},
    {'for' : 'stream2', 'key' : 'key2', 'data' : {'text' : 'hello world'}}
], (status, txhex) => { // multiple items
});


// sending native currency, asset(s), token(s)
mc.createrawsendfrom(fromaddress, {address : 1.0}, (status, txhex) => { // native currency
});

mc.createrawsendfrom(fromaddress, {address : {'asset1' : 10}}, (status, txhex) => { // asset
});

mc.createrawsendfrom(fromaddress,
    {address1 : {'asset1' : 100}, address2 : {'asset1' : 10}}, (status, txhex) => { // asset to two addresses
    }
);

mc.createrawsendfrom(fromaddress,
    {address : {'nfts1' : {'token' : 'token1', 'qty' : 1}}}, (status, txhex) => { // token
    }
);

mc.createrawsendfrom(fromaddress,
    {address : {'nfts1' : [{'token' : 'token1', 'qty' : 1}, {'token' : 'token2', 'qty' : 1}]}}, (status, txhex) => { // two tokens
    }
);


// sending asset or token with metadata
mc.createrawsendfrom(fromaddress, {address : {'asset1' : 10}}, ['a1c3b245d37e'], (status, txhex) => { // asset with raw binary metadata
});

mc.createrawsendfrom(fromaddress,
    {address : {'nfts1' : {'token' : 'token1', 'qty' : 1}}},
    [{'for' : 'stream1', 'key' : 'key1', 'data' : {'json' : {'name' : 'John'}}}],
    (status, txhex) => { // token with JSON stream item
    }
);


// creating a stream - see 'help data-all' in multichain for more options
mc.createrawsendfrom(fromaddress, {}, [{'create' : 'stream', 'name' : 'stream1'}], (status, txhex) => {
});

mc.createrawsendfrom(fromaddress, {}, [{
    'create' : 'stream', 'name' : 'stream1', 'restrict' : 'read,write',
    'details' : {'purpose' : 'inventory'}
}], (status, txhex) => {
});

// issuing assets - see 'help addresses-all' and 'help data-all' in multichain for more options
mc.createrawsendfrom(fromaddress, {address : {'issue' : {'raw' : 100000}}},
    [{'create' : 'asset', 'name' : 'asset1', 'multiple' : 100, 'open' : true}], (status, txhex) => { // issue fungible asset
    }
);

mc.createrawsendfrom(fromaddress, {address : {'issue' : {'raw' : 0}}},
    [{'create' : 'asset', 'name' : 'nfts1', 'open' : true, 'fungible' : false}], (status, txhex) => { // issue non-fungible asset
    }
);

mc.createrawsendfrom(fromaddress,
    {address : {'issuemore' : {'asset' : 'asset1', 'raw' : 1000}}}, (status, txhex) => { // issue more of fungible asset
    }
);

mc.createrawsendfrom(fromaddress,
    {address : {'issuetoken' : {'asset' : 'nfts1', 'raw' : 1, 'token' : 'token1'}}}, (status, txhex) => { // issue non-fungible token
    }
);

mc.createrawsendfrom(fromaddress, {'asset1' : {'open' : true}}, (status, txhex) => { // change asset openness
});


// setting permissions
mc.createrawsendfrom(fromaddress,
    {address : {'permissions' : {'type' : 'send,receive'}}}, (status, txhex) => { // global permission grant
    }
);

mc.createrawsendfrom(fromaddress,
    {address : {'permissions' : {'type' : 'send,receive', 'startblock' : 0, 'endblock' : 0}}}, (status, txhex) => { // global permission revoke
    }
);

mc.createrawsendfrom(fromaddress,
    {address : {'permissions' : {'for' : 'stream1', 'type' : 'write'}}}, (status, txhex) => { // per-entity permission grant
    }
);


// creating and approving filters and upgrades
mc.createrawsendfrom(fromaddress, {},
    [{'create' : 'txfilter', 'name' : 'txfilter1', 'code' : 'function filtertransaction() {}'}], (status, txhex) => { // create tx filter
    }
);

mc.createrawsendfrom(fromaddress, {'txfilter1' : {'approve' : true}}, (status, txhex) => { // approve tx filter
});

mc.createrawsendfrom(fromaddress, {},
    [{'create' : 'streamfilter', 'name' : 'streamfilter1', 'code' : 'function filterstreamitem() {}'}], (status, txhex) => { // create stream filter
    }
);

mc.createrawsendfrom(fromaddress,
    {'streamfilter1' : {'approve' : true, 'for' : 'stream1'}}, (status, txhex) => { // approve stream filter
    }
);

mc.createrawsendfrom(fromaddress, {},
    [{'create' : 'upgrade', 'name' : 'upgrade1', 'details' : {'protocol-version' : 20013}}], (status, txhex) => { // create upgrade
    }
);

mc.createrawsendfrom(fromaddress, {}, [{'approve' : true, 'for' : 'upgrade1'}], (status, txhex) => { // approve upgrade
});


// creating and updating variables
mc.createrawsendfrom(fromaddress, {},
    [{'create' : 'variable', 'name' : 'var1'}], (status, txhex) => { // create variable
    }
);

mc.createrawsendfrom(fromaddress, {},
    [{'create' : 'variable', 'name' : 'var1', 'value' : 'london'}], (status, txhex) => { // create variable with default value
    }
);

mc.createrawsendfrom(fromaddress, {},
    [{'update' : 'var1', 'value' : 'new york'}], (status, txhex) => { // update variable value
    }
);


// creating, updating, approving updates for libraries
mc.createrawsendfrom(fromaddress, {},
    [{'create' : 'library', 'name' : 'lib1', 'updatemode' : 'approve', 'code' : 'function f1() {}'}], (status, txhex) => { // create library
    }
);

mc.createrawsendfrom(fromaddress, {},
    [{'update' : 'lib1', 'updatename' : 'lib1_2', 'code' : 'function f1() {}'}], (status, txhex) => { // update library code
    }
);

mc.createrawsendfrom(fromaddress,
    {'lib1' : {'approve' : true, 'updatename' : 'lib1_2'}}, (status, txhex) => { // approve library update
    }
);



/******************************/
/*  Peer-to-peer connections  */
/******************************/

mc.addnode('12.34.56.78', 'add', (status) => { // no result, check status.success
});

mc.getaddednodeinfo(true, (status, result) => { // all added nodes
});

mc.getaddednodeinfo(true, '12.34.56.78', (status, result) => { // one added node
});


mc.storenode('12.34.56.78', (status) => { // no result, check status.success
});

mc.storenode('12.34.56.78', 'ignore', (status) => { // no result, check status.success
});

mc.liststorednodes((status, result) => {
});


mc.getnetworkinfo((status, result) => {
});

mc.getpeerinfo((status, result) => {
});

mc.ping((status) => { // no result, check status.success
});



/****************************************/
/*  Messaging signing and verification  */
/****************************************/

mc.signmessage(address, 'It is my message', (status, signature) => {
});

mc.verifymessage(address, signature, 'It is my message', (status, result) => {
});



/*****************************/
/*  Querying the blockchain  */
/*****************************/

mc.getblock(1, (status, result) => { // by height
});

mc.getblock(hash, (status, result) => { // by block hash
});

mc.getblock(1, 4, (status, result) => { // highest level of verbosity
});

mc.getblockhash(1, (status, result) => {
});

mc.getlastblockinfo((status, result) => { // most recent block
});

mc.getlastblockinfo(10, (status, result) => { // 10 blocks before most recent
});


mc.listblocks(1234, (status, result) => { // one block by height
});

mc.listblocks(hash, (status, result) => { // one block by hash
});

mc.listblocks([hash1, hash2], (status, result) => { // multiple blocks by hash
});

mc.listblocks('1-100', (status, result) => { // block range
});

mc.listblocks(-10, (status, result) => { // most recent blocks
});

mc.listblocks({'starttime' : 1577836800, 'endtime' : 1609459199}, (status, result) => { // blocks stamped in time range
});


mc.getblockchaininfo((status, result) => {
});

mc.getchaintotals((status, result) => {
});

mc.getmempoolinfo((status, result) => {
});

mc.getrawmempool((status, result) => {
});

mc.listminers((status, result) => {
});


mc.getrawtransaction(txid, (status, txhex) => { // get transaction as hex
});

mc.getrawtransaction(txid, true, (status, result) => { // get transaction description
});

mc.gettxout(txid1, vout, (status, result) => {
});



/******************/
/*  Binary cache  */
/******************/

mc.createbinarycache((status, cacheid) => {
});

mc.appendbinarycache(cacheid, '', (status, size) => { // query length
});

mc.appendbinarycache(cacheid, 'a1b2c3d4', (status, size) => { // append data
});

mc.deletebinarycache(cacheid, (status) => { // no result, check status.success
});

mc.txouttobinarycache(cacheid, txid, vout, (status, size) => { // all data
});

mc.txouttobinarycache(cacheid, txid, vout, 1048576, 3145728, (status, size) => { // paging within data
});



/*****************************/
/*  Advanced wallet control  */
/*****************************/

// encryptwallet and walletpassphrasechange omitted
mc.backupwallet('/path/to/wallet.dat.bak', (status) => { // no result, check status.success
});

mc.dumpprivkey(address, (status, privkey) => {
});

mc.dumpwallet('/path/to/wallet.txt', (status) => { // no result, check status.success
});

mc.getwalletinfo((status, result) => {
});

mc.importprivkey(privkey, (status) => { // no result, check status.success
});

mc.importwallet('/path/to/wallet.txt', (status) => { // no result, check status.success
});

mc.walletlock((status) => { // no result, check status.success
});

mc.walletpassphrase('mypassword', 60, (status) => { // no result, check status.success
});



/******************************************/
/*  Working with feeds (Enterprise only)  */
/******************************************/

mc.addtofeed('feed1', 'stream1', (status) => { // no result, check status.success
});

mc.createfeed('feed1', (status) => { // no result, check status.success
});

mc.deletefeed('feed1', (status) => { // no result, check status.success
});

mc.listfeeds((status, result) => {
});

mc.pausefeed('feed1', (status) => { // no result, check status.success
});

mc.purgefeed('feed1', -30, (status) => { // older than 30 days, no result, check status.success
});

mc.resumefeed('feed1', (status) => { // no result, check status.success
});

mc.updatefeed('feed1', ['stream1', 'stream2'], '*', 'sync', (status) => { // no result, check status.success
});


mc.datareftobinarycache(cacheid, dataref, (status, size) => { // all data
});

mc.datareftobinarycache(cacheid, dataref, 1048576, 3145728, (status, size) => { // paging within data
});

mc.getdatarefdata(dataref, (status, hex) => { // all data
});

mc.getdatarefdata(dataref, 1048576, 3145728, (status, hex) => { // paging within data
});



/********************************/
/*  Smart filters and upgrades  */
/********************************/

mc.approvefrom(fromaddress, 'txfilter1', true, (status, txid) => { // approve tx filter
});

mc.approvefrom(fromaddress, 'upgrade1', true, (status, txid) => { // approve upgrade
});

mc.approvefrom(fromaddress, 'streamfilter1',
    {'for' : 'stream1', 'approve' : true}, (status, txid) => { // approve stream filter
    }
);


mc.create('streamfilter', 'streamfilter1', {},
    'function filterstreamitem() {}', (status, txid) => { // create stream filter
    }
);

mc.create('streamfilter', 'streamfilter1', {'libraries' : ['lib1', 'lib2']},
    'function filterstreamitem() {}', (status, txid) => { // create stream filter that uses libraries
    }
);

mc.createfrom(fromaddress, 'streamfilter', 'streamfilter1', {},
    'function filterstreamitem() {}', (status, txid) => { // create stream filter from specific address
    }
);


mc.create('txfilter', 'txfilter1', {}, 'function filtertransaction() {}', (status, txid) => { // create tx filter
});

mc.create('txfilter', 'txfilter1', {'libraries' : ['lib1', 'lib2']},
    'function filtertransaction() {}', (status, txid) => { // create tx filter that uses libraries
    }
);

mc.create('txfilter', 'txfilter1', {'for' : 'asset1'},
    'function filtertransaction() {}', (status, txid) => { // create tx filter active for one entity only
    }
);

mc.create('txfilter', 'txfilter1', {'for' : ['asset1', 'asset2']},
    'function filtertransaction() {}', (status, txid) => { // create tx filter active for specific entities only
    }
);

mc.createfrom(fromaddress, 'txfilter', 'txfilter1', {},
    'function filtertransaction() {}', (status, txid) => { // create tx filter from specific address
    }
);


mc.create('upgrade', 'upgrade1', false,
    {'protocol-version' : 20013, 'maximum-block-size' : 16777216}, (status, txid) => { // create upgrade
    }
);

mc.createfrom(fromaddress, 'upgrade', 'upgrade1', false,
    {'protocol-version' : 20013, 'maximum-block-size' : 16777216}, (status, txid) => { // create upgrade from specific address
    }
);


mc.getfiltercode('filter1', (status, code) => {
});


mc.liststreamfilters((status, result) => { // all stream filters
});

mc.liststreamfilters('streamfilter1', (status, result) => { // one specific stream filter
});

mc.liststreamfilters(['streamfilter1', 'streamfilter2'], (status, result) => { // multiple specific stream filters
});


mc.listtxfilters((status, result) => { // all tx filters
});

mc.listtxfilters('txfilter1', (status, result) => { // one specific tx filter
});

mc.listtxfilters(['txfilter1', 'txfilter2'], (status, result) => { // multiple specific tx filters
});


mc.listupgrades((status, result) => { // all upgrades
});

mc.listupgrades('upgrade1', (status, result) => { // one specific upgrade
});

mc.listupgrades(['upgrade1', 'upgrade2'], (status, result) => { // multiple specific upgrades
});


mc.runstreamfilter('streamfilter1', txhex, (status, result) => { // test on transaction hex
});

mc.runstreamfilter('streamfilter1', txid, (status, result) => { // test on previous transaction
});


mc.teststreamfilter({}, 'function filterstreamitem() {}', (status, result) => { // compile test only
});

mc.teststreamfilter({'libraries' : ['lib1', 'lib2']}, 'function filterstreamitem() {}', (status, result) => { // with libraries
});

mc.teststreamfilter({}, 'function filterstreamitem() {}', txhex, (status, result) => { // test on transaction hex
});

mc.teststreamfilter({}, 'function filterstreamitem() {}', txid, (status, result) => { // test on previous transaction
});


mc.runtxfilter('txfilter1', txhex, (status, result) => { // test on transaction hex
});

mc.runtxfilter('txfilter1', txid, (status, result) => { // test on previous transaction
});


mc.testtxfilter({}, 'function filtertransaction() {}', (status, result) => { // compile test only
});

mc.testtxfilter({'libraries' : ['lib1', 'lib2']}, 'function filtertransaction() {}', (status, result) => { // with libraries
});

mc.testtxfilter({'for' : 'asset1'}, 'function filtertransaction() {}', (status, result) => { // active for one entity only
});

mc.testtxfilter({}, 'function filtertransaction() {}', txhex, (status, result) => { // test on transaction hex
});

mc.testtxfilter({}, 'function filtertransaction() {}', txid, (status, result) => { // test on previous transaction
});



/***************************/
/* Libraries and variables */
/***************************/

mc.addlibraryupdate('lib1', 'lib1_2', 'function f1() {}', (status, txid) => {
});

mc.addlibraryupdatefrom(fromaddress, 'lib1', 'lib1_2', 'function f1() {}', (status, txid) => {
});

mc.approvefrom(fromaddress, 'lib1', {'updatename' : 'lib1_2', 'approve' : true}, (status, txid) => {
});


mc.create('library', 'lib1', {'updatemode' : 'approve'}, 'function f1() {}', (status, txid) => {
});

mc.createfrom(fromaddress, 'library', 'lib1', {'updatemode' : 'approve'}, 'function f1() {}', (status, txid) => {
});


mc.getlibrarycode('lib1', (status, code) => { // currently active code
});

mc.getlibrarycode('lib1', '', (status, code) => { // original code before updates
});

mc.getlibrarycode('lib1', 'lib1_2', (status, code) => { // specific update name
});


mc.listlibraries((status, result) => { // all libraries
});

mc.listlibraries('lib1', (status, result) => { // one specific library
});

mc.listlibraries(['lib1', 'lib2'], (status, result) => { // multiple specific libraries
});


mc.testlibrary((status, result) => { // get information on test libraries
});

mc.testlibrary('libtemp', '', 'function f1() {}', (status, result) => { // create new test library
});

mc.testlibrary('libtemp', 'libtemp_2', 'function f1() {}', (status, result) => { // create test library update
});

mc.testlibrary('libtemp', 'libtemp_2', (status, result) => { // switch to previous update of test library
});

mc.testlibrary('libtemp', (status, result) => { // clear code for this test library
});

mc.testlibrary('*', (status, result) => { // clear code for all test libraries
});


mc.create('variable', 'var1', (status, txid) => { // no default value
});

mc.create('variable', 'var1', true, 'tokyo', (status, txid) => { // with default value
});

mc.createfrom(fromaddress, 'variable', 'var1', (status, txid) => { // no default value
});

mc.createfrom(fromaddress, 'variable', 'var1', true, 'tokyo', (status, txid) => { // with default value
});


mc.getvariablehistory('var1', (status, result) => { // entire history
});

mc.getvariablehistory('var1', false, 10, 30, (status, result) => { // paging through history
});

mc.getvariableinfo('var1', (status, result) => {
});

mc.getvariablevalue('var1', (status, value) => {
});


mc.listvariables((status, result) => { // all variables
});

mc.listvariables('var1', (status, result) => { // one specific variable
});

mc.listvariables(['var1', 'var2'], (status, result) => { // multiple specific variables
});

mc.listvariables('*', false, 10, 30, (status, result) => { // paging through variables
});


mc.setvariablevalue('var1', (status, txid) => { // clear value (set to null)
});

mc.setvariablevalue('var1', 1234, (status, txid) => { // set value to number
});

mc.setvariablevalue('var1', 'toronto', (status, txid) => { // set value to string
});

mc.setvariablevalue('var1', {'a' : 1, 'b' : 2}, (status, txid) => { // set value to JSON structure
});

mc.setvariablevaluefrom(fromaddress, 'var1', (status, txid) => { // clear value (set to null)
});

mc.setvariablevaluefrom(fromaddress, 'var1', 1234, (status, txid) => { // set value
});



/***************************/
/*  Advanced node control  */
/***************************/

mc.clearmempool((status) => { // no result, check status.success
});

mc.getchunkqueueinfo((status, result) => {
});

mc.getchunkqueuetotals((status, result) => {
});

mc.pause('incoming,mining', (status) => { // no result, check status.success
});

mc.resume('incoming,mining', (status) => { // no result, check status.success
});

mc.setlastblock(hash, (status, hash) => { // by block hash
});

mc.setlastblock(1234, (status, hash) => { // by block height
});



/*************************************/
/*  MultiChain Enterprise licensing  */
/*************************************/

mc.getlicenserequest((status, hex) => {
});

mc.activatelicense(hex, (status, txid) => {
});

mc.listlicenses((status, result) => { // all licenses
});

mc.listlicenses('license-a1b2-c3d4-e5f6-7890', (status, result) => { // one specific license
});

mc.listlicenses([license1, license2], (status, result) => { // multiple specific licenses
});

mc.transferlicense('license-a1b2-c3d4-e5f6-7890', hex, (status, txid) => {
});
