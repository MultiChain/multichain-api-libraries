
// createrawsendfrom  **********************

// send empty transaction output
$result = $mc->createrawsendfrom($from_address,[$to_address => 0]);

// send native currency of blockchain
$result = $mc->createrawsendfrom($from_address,[$to_address => 1.0]);

// create stream
$result = $mc->createrawsendfrom($from_address,[],[['create' => 'stream','name' => 'stream2','details' => ['status' => 'free','type' => 'doc']]]);

// publish to stream
$result = $mc->createrawsendfrom($from_address,[],[['for' => 'stream1','key' => 'key02','data' => '']]);
$result = $mc->createrawsendfrom($from_address,[],[['for' => 'stream1','keys' => ['key01','key02'],'data' => ['json' => ['abc' => 3,'zxc' => 'fgh','abw' => -3.01,'sdc' => true]]]]);
$result = $mc->createrawsendfrom($from_address,[],[['for' => 'stream1','key' => 'key01','options' => 'offchain','data' => 'abcdef01']]);
$result = $mc->createrawsendfrom($from_address,[],[['for' => 'stream1','key' => 'key02','data'=>['text' => 'my text']]]);
$result = $mc->createrawsendfrom($from_address,[],[['for' => 'stream1','key' => 'key02','data'=>['cache' => 'cache1']]]);

// issue regular asset
$result = $mc->createrawsendfrom($from_address,[$to_address => ['issue' => ['raw' => 100000]]],[['create' => 'asset','name' => 'asset2','multiple' => 100,'open' => true]]);

// issue more of regular asset
$result = $mc->createrawsendfrom($from_address,[$to_address => ['issuemore' => ['asset' => 'asset1','raw' => 1000]]]);

// change asset property
$result = $mc->createrawsendfrom($from_address,['asset1' => ['open' => true]]);

// issue non-fungible asset
$result = $mc->createrawsendfrom($from_address,[$to_address => ['issue' => ['raw' => 0]]],[['create' => 'asset','name' => 'asset5','open' => true,'fungible' => false]]);

// issue token for non-fungible asset
$result = $mc->createrawsendfrom($from_address,[$to_address => ['issuetoken' => ['asset' => 'asset5','raw' => 1000,'token' => 'token2']]]);

// send asset
$result = $mc->createrawsendfrom($from_address,[$to_address => ['asset1' => 10]]);
$result = $mc->createrawsendfrom($from_address,[$to_address_1 => ['asset1' => 100], $to_address_2 => ['asset1' => 10]]);

// send asset with raw binary metadata
$result = $mc->createrawsendfrom($from_address,[$to_address => ['asset1' => 1]],['a1c3b245d37e']);

// send asset with a JSON stream item
$result = $mc->createrawsendfrom($from_address,[$to_address => ['asset1' => 1]],[['for' => 'stream1','key' => 'key03','data'=>['cache' => 'cache1']]]);

// send token
$result = $mc->createrawsendfrom($from_address,['1a1Z9NcfT4YCPbd1tEE5c4GzijEKnEaiPUe27J' => ['asset4' => ['token' => 'token1','qty' => 1]]]);
$result = $mc->createrawsendfrom($from_address,['1a1Z9NcfT4YCPbd1tEE5c4GzijEKnEaiPUe27J' => ['asset4' => [['token' => 'token1','qty' => 1],['token' => 'token2','qty' => 1]]]]);

// setting permissions
$result = $mc->createrawsendfrom($from_address,[$to_address => ['permissions' => ['type' => 'connect,send,receive']]]);
$result = $mc->createrawsendfrom($from_address,[$to_address => ['permissions' => ['for' => 'asset0','type' => 'receive']]]);
$result = $mc->createrawsendfrom($from_address,[$to_address => ['permissions' => ['for' => 'stream0','type' => 'write']]]);

// create txfilter
$result = $mc->createrawsendfrom($from_address,[],[['create' => 'txfilter','name' => 'txf1','code' => 'function filtertransaction(){}']]); 
// approve txfilter
$result = $mc->createrawsendfrom($from_address,['txf1' => ['approve' => true ]]);

// create streamfilter
$result = $mc->createrawsendfrom($from_address,[],[['create' => 'streamfilter','name' => 'stf1','code' => 'function filterstreamitem(){return '';}']]); 
// approve streamfiter
$result = $mc->createrawsendfrom($from_address,['stf1' => ['approve' => true,'for' => 'stream1']]);

// create variable with initial value
$result = $mc->createrawsendfrom($from_address,[],[['create' => 'variable','name' => 'var1','value' => 'london']]);
$result = $mc->createrawsendfrom($from_address,[],[['create' => 'variable','name' => 'var2','value' => ['a' => 'abc']]]);

// update variable value
$result = $mc->createrawsendfrom($from_address,[],[['update' => 'var1','value' => 'new york']]);
$result = $mc->createrawsendfrom($from_address,[],[['update' => 'var1','value' => ['b' => 'bcd']]]);

// create library
$result = $mc->createrawsendfrom($from_address,[],[['create' => 'library','name' => 'lib3','updatemode' => 'approve','code' => 'function a00(){}']]);
// update library
$result = $mc->createrawsendfrom($from_address,[],[['update' => 'lib3','updatename' => 'upd1','code' => 'function a00(){}']]);

// approve library update
$result = $mc->createrawsendfrom($from_address,['lib1' => ['approve' => true,'updatename' => 'upd1']]);

// create upgrade
$result = $mc->createrawsendfrom($from_address,[],[['create' =>'upgrade','name' => 'upgr1','details' => ['protocol-version' => 20013]]]); 
$result = $mc->createrawsendfrom($from_address,[],[['create' =>'upgrade','name' => 'upgr2','details' => ['maximum-block-size' => 9200]]]); 


// General utilities *************************
// getblockchainparams
$result = $mc->getblockchainparams();

// gethealthcheck
$result = $mc->gethealthcheck();
// getruntimeparams
$result = $mc->getruntimeparams();
// setruntimeparam
$result = $mc->setruntimeparam('sendfiltertimeout',33);
// getinfo
$result = $mc->getinfo();
// getinitstatus
$resul t= $mc->getinitstatus();
// help
$result = $mc->help('listaddresses');
// stop
$result = $mc->stop();


//  approve upgrade
$result = $mc->createrawsendfrom($from_address,[],[['approve' => true,'for' => 'upgr1']]);

//  Managing wallet addresses *************************
// addmultisigaddress
$result = $mc->addmultisigaddress(2,[$addr0,$addr1]);

// getaddresses
$result = $mc->getaddresses();
$result = $mc->getaddresses(true);
// getnewaddress
$result = $mc->getnewaddress();
// importaddress
$result = $mc->importaddress($addr1);
$result = $mc->importaddress($addr0.','.$addr1);
$result = $mc->importaddress([$addr0,$addr1]);
$result = $mc->importaddress($addr0,'label',true);
// listaddresses
$result = $mc->listaddresses($addr1,true);
$result = $mc->listaddresses($addr0.','.$addr1,true);
$result = $mc->listaddresses([$addr0,$addr1],true);
$result = $mc->listaddresses('*',false,2,0);


//  Working with non-wallet addresses *************************
// createkeypairs
$result = $mc->createkeypairs(2);
// createmultisig
$result = $mc->createmultisig(2,[$addr0,$addr1]);
// validateaddres
$result = $mc->validateaddress($privkey1);
$result = $mc->validateaddress($addr1);


//  Permissions management *************************
// grant
$result = $mc->grant($addr1,'send,receive',0.0,1,2,'comment1','comment2');
$result = $mc->grant($addr0.','.$addr1,'send,receive');
// grantfrom
$result = $mc->grantfrom($addr0,$addr1,'issue');
// grantwithdata
$result = $mc->grantwithdata($addr1,'connect','a0b1c23456',0.0,1,2);
// grantwithdatafrom
$result = $mc->grantwithdatafrom($addr0,$addr1,'issue','a0b1c23456',0.0,1,2);
// listpermissions
$result = $mc->listpermissions('receive',$addr0.','.$addr1,true);
// revoke
$result = $mc->revoke($addr1,'issue',0.0,'comment1','comment2');
// revokefrom
$result = $mc->revokefrom($addr0,$addr1,'connect',0.0,'comment1','comment2');
// verifypermission
$result = $mc->verifypermission($addr1,'send');


//  Asset management  *************************
// getassetinfo
$result = $mc->getassetinfo($asset4_oJuvSc3XI8,true);

// gettokeninfo
$result = $mc->gettokeninfo($asset4_oJuvSc3XI8,'token1');
$result = $mc->gettokeninfo($asset4_oJuvSc3XI8,'token1',true);

// issue
$result = $mc->issue($addr0,$asset6_oJuvSc3XI8,1000,0.1,0.0,['a'  =>  'abcd','value'  =>  '1000']);
$result = $mc->issue($addr0,['name'  =>  $asset7_oJuvSc3XI8,'canopen' => true],1000);

// issuefrom
$result = $mc->issuefrom($addr0,$addr1,['name'  =>  $asset8_oJuvSc3XI8,'open' => true],1000,0.1,0.0);
// issuemore
$result = $mc->issuemore($addr0,$asset8_oJuvSc3XI8,2000,0.0);
// issuemorefrom
$result = $mc->issuemorefrom($addr0,$addr1,$asset8_oJuvSc3XI8,2000,0.0);
// issuetoken
$result = $mc->issuetoken($addr0,$asset4_oJuvSc3XI8,'token10',100,0.0);
// issuetokenfrom
$result = $mc->issuetokenfrom($addr0,$addr1,$asset4_oJuvSc3XI8,'token20',1);
// listassetissues
$result = $mc->listassetissues($asset4_oJuvSc3XI8,true);
// listassets
$result = $mc->listassets([$asset0_oJuvSc3XI8,$asset6_oJuvSc3XI8],true);
$result = $mc->listassets([$asset0_ref,$asset6_oJuvSc3XI8],true);
$result = $mc->listassets([$asset0_txid,$asset6_oJuvSc3XI8],true);
$result = $mc->listassets('*',true,3,0);
// update
$result = $mc->update($asset7_oJuvSc3XI8,['open'  =>  true]);

//  Querying wallet balances and transactions   *************************

// getaddressbalances
$result = $mc->getaddressbalances($addr0,1,true);
// getaddresstransaction
$result = $mc->getaddresstransaction($addr0,$asset4_txid,true);
// getmultibalances
$result = $mc->getmultibalances('*','*',1,false,false);
// getmultibalances
$result = $mc->getmultibalances([$addr0,$addr1],'*',1,false,false);
$result = $mc->getmultibalances($addr0.','.$addr1,'*',1,false,false);
$result = $mc->getmultibalances($addr1,[$asset1_oJuvSc3XI8,$asset4_oJuvSc3XI8],1,false,false);
$result = $mc->getmultibalances($addr0,$asset4_oJuvSc3XI8,1,false,false);
// gettokenbalances
$result = $mc->gettokenbalances([$addr0,$addr1],[$asset4_oJuvSc3XI8],1,false,false);
$result = $mc->gettokenbalances($addr0,$asset4_oJuvSc3XI8,1,false,false);
// gettotalbalances
$result = $mc->gettotalbalances(1,false,false);
// getwallettransaction
$result = $mc->getwallettransaction($asset4_txid,false,true);
// listaddresstransactions
$result = $mc->listaddresstransactions($addr1);
$result = $mc->listaddresstransactions($addr1,10,0,true);
// listwallettransactions
$result = $mc->listwallettransactions();
$result = $mc->listwallettransactions(10,0,false,true);

// Sending one-way payments      *************************

// send
$result = $mc->send($addr0,[$asset1_oJuvSc3XI8 => 20]);
// sendasset
$result = $mc->sendasset($addr0,$asset1_oJuvSc3XI8,20,0.0,'comment1','comment2');
// sendassetfrom
$result = $mc->sendassetfrom($addr0,$addr1,$asset1_oJuvSc3XI8,20,0.0,'comment1','comment2');
// sendfrom
$result = $mc->sendfrom($addr1,$addr0,[$asset1_oJuvSc3XI8 => 20]);
// sendwithdata
$result = $mc->sendwithdata($addr0,[$asset1_oJuvSc3XI8 => 20],'a2e3c4b6');
// sendwithdatafrom
$result = $mc->sendwithdatafrom($addr0,$addr1,[$asset1_oJuvSc3XI8 => 20],'a2e3c4b6');\

// atomic exchange transactions  ********************************
// preparelockunspentfrom addr1 with give away assets
$dict1 = $mc->preparelockunspentfrom($addr1,[$asset1_oJuvSc3XI8 => 10,$asset2_oJuvSc3XI8 => 20]);
// createrawexchange with ask-asset
$rawtx = $mc->createrawexchange($dict1['txid'],$dict1['vout'],[$asset3_oJuvSc3XI8 => 30]);

// decoderawexchange
$json = $mc->decoderawexchange($rawtx);

// preparelockunspentfrom addr2  with give away asset
$dict2 = $mc->preparelockunspentfrom($addr2,[$asset3_oJuvSc3XI8 => 30]);
// appendrawexchange with ask-assets
$append = $mc->appendrawexchange($rawtx,$dict2['txid'],$dict2['vout'],[$asset1_oJuvSc3XI8 => 10,$asset2_oJuvSc3XI8 => 20]);

// decoderawexchange
$json = $mc->decoderawexchange($append['hex']);

// completerawchange  with ask-assets
$hex = $mc->completerawexchange($rawtx,$dict2['txid'],$dict2['vout'],[$asset1_oJuvSc3XI8 => 10,$asset2_oJuvSc3XI8 => 20]);

// disablerawtransaction exchange
$result = $mc->disablerawtransaction($hex);

// sendrawtransaction exchange
$result = $mc->sendrawtransaction($hex);

// Stream management  *************************
// create
$result = $mc->create('stream',$stream3_oJuvSc3XI8,true);
//createfrom
$result = $mc->createfrom($addr0,'stream',$stream4_oJuvSc3XI8,['restrict' => 'write,read','salted' => true]);
//getstreaminfo
$result = $mc->getstreaminfo($stream3_oJuvSc3XI8,true);
//liststreams
$result = $mc->liststreams('*',true,2,0);
$result = $mc->liststreams([$stream3_oJuvSc3XI8,$stream4_oJuvSc3XI8]);

// Publishing stream items *************************
// publish
$result = $mc->publish($stream3_oJuvSc3XI8,'key1','23c4a5e6','offchain');
$result = $mc->publish($stream3_oJuvSc3XI8,'key2',['json' => ['name' =>  'John','age' => 30]]);
// publishfrom
$result = $mc->publishfrom($addr1,$stream3_oJuvSc3XI8,'key1','23c4a5e6','offchain');
// publishmulti
$result = $mc->publishmulti($stream3_oJuvSc3XI8,[['key' => 'key3','data' => ['json' => ['name' =>  'John','age' => 30]]],['key' => 'key4','data' => ['json' => ['name' =>  'Iogan','age' => 20]]]]);
// publishmultifrom
$result = $mc->publishmultifrom($addr1,$stream3_oJuvSc3XI8,[['key' => 'key5','data' => ['json' => ['name' =>  'John','age' => 30]]],['key' => 'key6','data' => ['json' => ['name' =>  'Iogan','age' => 20]]]]);

// Managing stream and asset subscriptions *************************
// subscribe
$result = $mc->subscribe($stream1_oJuvSc3XI8);
$result = $mc->subscribe($stream1_oJuvSc3XI8,false,'items,keys');
$result = $mc->subscribe([$asset1_oJuvSc3XI8,$asset4_oJuvSc3XI8],false);
$result = $mc->subscribe([$asset0_txid,$asset4_oJuvSc3XI8],true);
// trimsubscribe
$result = $mc->trimsubscribe($stream1_oJuvSc3XI8,'keys');
// unsubscribe
$result = $mc->unsubscribe($asset4_oJuvSc3XI8,true);
$result = $mc->subscribe($stream1_oJuvSc3XI8);

//  Querying subscribed assets*************************
// getassettransaction
$result = $mc->getassettransaction($asset1_oJuvSc3XI8,$asset1_txid1,true);
// listassettransactions
$result = $mc->listassettransactions($asset1_oJuvSc3XI8,true,2,0);

//  Querying subscribed streams*************************

// getstreamitem
$result = $mc->getstreamitem($stream1_oJuvSc3XI8,$publish1_txid,true);
// getstreamkeysummary
$result = $mc->getstreamkeysummary($stream1_oJuvSc3XI8,'key1','jsonobjectmerge,ignoreother');
// getstreampublishersummary
$result = $mc->getstreampublishersummary($stream1_oJuvSc3XI8,$addr1,'jsonobjectmerge,ignoreother');
// gettxoutdata
$result = $mc->gettxoutdata($publish1_txid,0);
// liststreamblockitems
$result = $mc->liststreamblockitems($stream1_oJuvSc3XI8,1-1000,true);
// liststreamkeyitems
$result = $mc->liststreamkeyitems($stream1_oJuvSc3XI8,'key1',true);
// liststreamkeys
$result = $mc->liststreamkeys($stream1_oJuvSc3XI8,'*',true);
// liststreamitems
$result = $mc->liststreamitems($stream1_oJuvSc3XI8,true);
// liststreampublisheritems
$result = $mc->liststreampublisheritems($stream1_oJuvSc3XI8,$addr1,true);
// liststreampublishers
$result = $mc->liststreampublishers($stream1_oJuvSc3XI8,'*',true);
// liststreamqueryitems
$result = $mc->liststreamqueryitems($stream1_oJuvSc3XI8,['publisher' => $addr1],true);
// liststreamtxitems
$result = $mc->liststreamtxitems($stream1_oJuvSc3XI8,$publish1_txid,true);

//  Controlling offchain data*************************
// purgepublisheditems
$result = $mc->purgepublisheditems($publish1_txid);
// purgestreamitems
$result = $mc->purgestreamitems($stream1_oJuvSc3XI8,'all');
// retrievestreamitems
$result = $mc->retrievestreamitems($stream1_oJuvSc3XI8,'all');

//  Managing wallet unspent outputs*************************
// combineunspent
$result = $mc->combineunspent('*');
// listlockunspent
$result = $mc->listlockunspent();

//listunspent
$result = $mc->listunspent();

//lockunspent
$result = $mc->lockunspent(true);

// Working with raw transactions*************************
//appendrawchange
//preparelockunspent
$dict = $mc->preparelockunspent([$asset1_oJuvSc3XI8 => 100]);
$txid1 = $dict['txid'];
$vout1 = $dict['vout'];
$rawtx = $mc->createrawtransaction([['txid' => $txid1,'vout' => $vout1]],[$addr2 =>[$asset1_oJuvSc3XI8 => 10,'permissions' => ['type' => 'receive']]]);
$rawtx1 = $mc->appendrawchange($rawtx,$addr2);
// decoderawtransaction
$json = $mc->decoderawtransaction($rawtx1);

// signrawtransaction
$sign = $mc->signrawtransaction($rawtx1);
$hex = $sign['hex'];
// sendrawtransaction
$result = $mc->sendrawtransaction($hex);
 


// appendrawdata
$dict = $mc->preparelockunspent(0);
$txid1 = $dict['txid'];
$vout1 = $dict['vout'];	
// createrawtransaction
$rawtx = $mc->createrawtransaction([['txid' => $txid1,'vout' => $vout1]],[]);
$rawtx1 = $mc->appendrawdata($rawtx,['for' => $stream3_oJuvSc3XI8,'key' => 'key01','options' => 'offchain','data' => 'abcdef01']);
$json = $mc->decoderawtransaction($rawtx1);

$sign = $mc->signrawtransaction($rawtx1);
$hex = $sign['hex'];
$result = $mc->sendrawtransaction($hex);

// appendrawtransaction
$dict = $mc->preparelockunspent([$asset1_oJuvSc3XI8 => 10]);
$txid1 = $dict['txid'];
$vout1 = $dict['vout'];
$rawtx0 = $mc->createrawtransaction([],[]);
$rawtx = $mc->appendrawtransaction($rawtx0,[['txid' => $txid1,'vout' => $vout1]],[$addr2 =>[$asset1_oJuvSc3XI8 => 10,'permissions' => ['type' => 'receive']]]);
// decoderawtransaction
$json = $mc->decoderawtransaction($rawtx);

// signrawtransaction
$sign = $mc->signrawtransaction($rawtx);
$hex = $sign['hex'];
// sendrawtransaction
$result = $mc->sendrawtransaction($hex);

//  Peer-to-peer connections*************************
// ping
$result = $mc->ping();
// addnode
$result = $mc->addnode('192.168.56.1:6721','add');
// storenode
$result = $mc->storenode('192.168.56.1:6721');
// getaddednodeinfo
$result = $mc->getaddednodeinfo(true, '192.168.56.1:6721');
// getpeerinfo
$result = $mc->getpeerinfo();
// getnetworkinfo
$result = $mc->getnetworkinfo();
// liststorednodes
$result = $mc->liststorednodes(true);

//  Messaging signing and verifications*************************
// signmessage
$signature = $mc->signmessage($addr1,'It is my message');
// verifymessage
$result = $mc->verifymessage($addr1,$signature,'It is my message');

//  Querying the blockchain*************************
// getblock
$result = $mc->getblock(1,4);
// getblockchaininfo
$result = $mc->getblockchaininfo();
// getblockhash
$result = $mc->getblockhash(1);
// getchaintotals
$result = $mc->getchaintotals();
// getlastblockinfo
$result = $mc->getlastblockinfo();
// getmempoolinfo
$result = $mc->getmempoolinfo();
// getrawmempool
$result = $mc->getrawmempool();
// getrawtransaction
$result = $mc->getrawtransaction($txid1,1);
// gettxout
$result = $mc->gettxout($txid1,0);
// listblocks
$result = $mc->listblocks('-10',true);
// listminers
$result = $mc->listminers(true);

//  Binary cache *************************
// createbinarycache
$cache_oJuvSc3XI8 = $mc->createbinarycache();
// appendbinarycache
$result = $mc->appendbinarycache($cache_oJuvSc3XI8,'a1b2c3d4');
// txouttobinarycache
$cache_oJuvSc3XI81 = $mc->createbinarycache();
$txid = $mc->publish($stream1_oJuvSc3XI8,'key7','23c4a5e6');
$result = $mc->txouttobinarycache($cache_oJuvSc3XI81,$txid,0);
// deletebinarycache
$result = $mc->deletebinarycache($cache_oJuvSc3XI8);

//  Advanced wallet control*************************
// backupwallet
$result = $mc->backupwallet('backup.bk');
// dumpwallet
$result = $mc->dumpwallet('dump.wl');
// dumpprivkey
$privkey0 = $mc->dumpprivkey($addr0);
// encryptwallet
// $result = $mc->encryptwallet('my pass phrase');
// getwalletinfo
$result = $mc->getwalletinfo();
// importprivkey
$result = $mc->importprivkey($privkey0);
// importwallet
$result = $mc->importwallet('dump.wl');
// walletlock
$result = $mc->walletlock();
// walletpassphrase
$result = $mc->walletpassphrase('my new pass phrase',10);
// walletpassphrasechange
$result = $mc->walletpassphrasechange('my pass phrase','my new pass phrase');


//  Working with feeds*************************
// createfeed
$result = $mc->createfeed($feed_oJuvSc3XI8);
// addtofeed
$result = $mc->create('stream',$stream5_oJuvSc3XI8,true);
$result = $mc->liststreams([$stream5_oJuvSc3XI8],true,10,0);
$result = $mc->addtofeed($feed_oJuvSc3XI8,$stream5_oJuvSc3XI8);
// listfeeds
$result = $mc->listfeeds('*',true);
// getdatarefdata
$publishtxid1 = $mc->publish($stream5_oJuvSc3XI8,'key2','23c4a5e6');
$a = '000000f1';
$c = '00000000';
$ref = $a.$publishtxid1.$c;
$result = $mc->getdatarefdata($ref);
// datareftobinarycache
$cache_oJuvSc3XI8 = $mc->createbinarycache(); 
$result = $mc->datareftobinarycache($cache_oJuvSc3XI8,'000000f21e99122066722fba8fcf0405648c6b739bcc9ba2368058f8463821ede80af14105000000');	
// pausefeed
$result = $mc->pausefeed($feed_oJuvSc3XI8,true);
// resumefeed
$result = $mc->resumefeed($feed_oJuvSc3XI8,true);
// purgefeed
$result = $mc->purgefeed($feed_oJuvSc3XI8,'*');
// updatefeed
$result = $mc->updatefeed($feed_oJuvSc3XI8,$stream5_oJuvSc3XI8,'','start',['maxshowndata' => 10]);
// deletefeed
$result = $mc->deletefeed($feed_oJuvSc3XI8,true);

//  smart filters and upgrades*************************
// create library
$result = $mc->create('library',$lib06,['updatemode' => 'instant'],"function fname(){return '';}");
$result = $mc->create('library',$lib07,['updatemode' => 'instant'],"function fname1(){return '';}");
// create streamfilter
$result = $mc->create('streamfilter',$streamfilter1,['libraries' => [$lib06,$lib07]],"function filterstreamitem(){var item=getfilterstreamitem();if(item.data.text==fname())return fname();return '';}");
// create txfilter
$result = $mc->create('txfilter',$txfilter1,['libraries' => [$lib06,$lib07]],"function filtertransaction(){var tx=getfiltertransaction();if(tx.vout[0].data[0].text==fname())return fname();return '';}");
// createfrom
$result = $mc->createfrom($addr0,'txfilter',$txfilter2,['libraries' => [$lib06,$lib07]],"function filtertransaction(){var tx=getfiltertransaction();if(tx.vout[0].data[0].text==fname())return fname();return '';}");
// getfiltercode
$result = $mc->getfiltercode($txfilter1);
// liststreamfilters
$result = $mc->liststreamfilters('*',true);
// listtxfilters
$result = $mc->listtxfilters('*',true);
// create upgrade
$result = $mc->create('upgrade',$upgrade1,false,['anyone-can-receive' => true,'anyone-can-issue' => true]);
// listupgrades
$result = $mc->listupgrades('*');


// runtxfilter
$result = $mc->createrawsendfrom($from_address,[$addr2=>['permissions'=>['for' => $stream1__oJuvSc3XI8,'type'=>'write']]],[],'sign');
$result = $mc->runtxfilter($txfilter1,$result['hex']);

// runstreamfilter
$result = $mc->createrawsendfrom($from_address,[],[['for' => $stream1__oJuvSc3XI8,'key' => 'key02','data'=>['text' => 'my text']]],'sign,lock');
$result = $mc->runstreamfilter($streamfilter1,$result['hex']);

// testtxfilter
$script = "function filtertransaction(){var date=new Date();return date.getTime().toString();return '';}"; 
$result = $mc->createrawsendfrom($from_address,[$addr1 => 0],[],'sign,lock');
$result = $mc->testtxfilter(false,$script,$result['hex']);	
   
// teststreamfilter
$result = $mc->createrawsendfrom($from_address,[],[['for' => $stream1__oJuvSc3XI8,'key' => 'key02','data'=>['text' => 'my text']]],'sign,lock');
$script = "function filterstreamitem(){var item=getfilterstreamitem();if(item.keys[0]!='key02')return 'error key';return '';}";
$result = $mc->teststreamfilter(false,$script,$result['hex']);





//  libraries and variables*************************
// create variable
$result = $mc->create('variable',$var01,true,'a1=');
// createfrom
$result = $mc->createfrom($addr1,'variable',$var02,true,'a1=');
// setvariablevalue
$result = $mc->setvariablevalue($var01,['value' => 'var=5']);
// setvariablevaluefrom
$result = $mc->grant($addr0,"$var01.write");
$result = $mc->setvariablevaluefrom($addr0,$var01,['value' => 'var=1']);
// getvariablevalue
$result = $mc->getvariablevalue($var01);
// getvariableinfo
$result = $mc->getvariableinfo($var01,true);
// getvariablehistory
$result = $mc->getvariablehistory($var01,true);
// listvariables
$result = $mc->listvariables('*',true);
// create library
$result = $mc->create('library',$lib01,['updatemode' => 'approve'],"function fname(){return '';}");
$result = $mc->create('library',$lib02,['updatemode' => 'instant'],"function fname(){return '';}");
$result = $mc->create('library',$lib03,['updatemode' => 'none'],"function fname(){return '';}");
// createfrom library
$result = $mc->createfrom($addr1,'library',$lib04,['updatemode' => 'none'],"function fname(){return '';}");
// getlibrarycode
$result = $mc->getlibrarycode($lib01);
// addlibraryupdate
$result = $mc->addlibraryupdate($lib01,$updt01,"function fname(){return 'error1';}");
$result = $mc->grant($addr1,"$lib01.write");
// addlibraryupdatefrom
$result = $mc->addlibraryupdatefrom($addr1,$lib01,$updt02,"function fname(){return 'error1';}");
// approvefrom
$result = $mc->approvefrom($addr0, $lib01,['approve' => true,'updatename' => $updt01]);
// listlibraries
$result = $mc->listlibraries('*',true);
// testlibrary
$result = $mc->testlibrary($lib01);

//  Advanced node control*************************

// getchunkqueueinfo
$result = $mc->getchunkqueueinfo();
// getchunkqueuetotals
$result = $mc->getchunkqueuetotals();
// pause
$result = $mc->pause('incoming,mining');
// getblockchaininfo
$result = $mc->getblockchaininfo();

$num = $result['blocks'];
// getblockhash
$hash = $mc->getblockhash($num);
// setlastblock
$result = $mc->setlastblock($hash);
$result = $mc->setlastblock('$num');
// clearmempool
$result = $mc->clearmempool();
// resume
$result = $mc->resume('incoming,mining');

//  MultiChain Enterprise licensing
//getlicenserequest
$request = $mc -> getlicenserequest();

$confirmation = '0030fd4e0140926609127a8010170bd38b98e3e798be9b2259bc6f53cd269f55ee913860c7b0173eb2051e80d198f3db42a8be7c37298e1c04592b3f6040e5b1c31422e1c81f30b2dfb97e76140ba5f80e232fc135b2f637bdd4634f26e5ad9a7d7c5e18accce3ea034169d08a816f799579311bdbbe20db587ac712d8b4817ee13955b6f7fe24748821b8f0a513ff0c17c18151209640f389bb602c5c3aaba64c2dc08daa21f8a7a588bff83fe41153c7c3402368f1a5537131811c4a6e1c1e0f59d45f4319c58bcb4d5467a2e1b20403f5911e48d78afc740fa39c8a248f72e7948ddbdd1ffb9a2be00218a533ad069170d6a4c99d201d0f96a8f1ab21539afedf2e70e08e011a446dc93a286a713a5df3937ac4ddb5a160f59d73bfedc352ac966221292ad5906bca881d433fc62c4c31b025b315a0eeb4d7c53578ad35cf22078a91c803609666a008db1e49505fb1367d00312042a174c3ba62c26eb4ac563b257e6f1117dd36b0335b4ffb903231da07f1a62800322089382bc96d1d8b1f1e80eb53a8b469542f65bf52343db2d9b9ab2959ab8e8eee006020650597cca9ecd47d2913c863beaa2a3868d3ebb73e17dfdbcb7b4d34bba14689006114c93c1296851514dd37611a1812e173dc8a78a4a5006204098d63630063080e7aa14bda892a3f006921032b8b5922c3460cc3d9e1f9649c2bfe09bad10967963478f6ec287ac5c9c243d2006a04d0343101006b042a4e0000006f473045022100d9ca9ae3384f622766a0497ad18dbaf37eb3e9870f5c87b75b262ba56748528a022012ccb3cb07f411ae19b5736ebd16ed87d35b97527941f3cdbb3d52ed6b6bb98d';

// decodelicenseconfirmation
$result=$mc->decodelicenseconfirmation($confirmation);
$lic_name = $result['name'];

//activatelicense
$result = $mc -> activatelicense($confirmation);

// listlicenses
$result = $mc -> listlicenses('*',true);

// transferlicense
$request = $mc->getlicenserequest();
$txid = $mc->transferlicense($lic_name,$request);
?> 