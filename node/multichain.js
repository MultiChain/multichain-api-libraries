/*
    MultiChain JSON-RPC API Library for Node.js
    
    Copyright (c) Coin Sciences Ltd - www.multichain.com

    All rights reserved under BSD 3-clause license
    
    See README file for instructions and examples.js for examples
*/


module.exports = class
{
    host;
    port;
    username;
    password;
    usessl;
    chainname;
    
    constructor(host, port, username, password, usessl = false)
    {
        this.host = host;
        this.port = port;
        this.username = username;
        this.password = password;
        this.usessl = usessl;
        this.chainname = null;
        
        return this.asProxy();
    }
    
    setoption(option, value)
    {
        if(option === "chainname")
            this.chainname = value;
    }
    
    parse_response(encoded, response)
    {
        var result = null;
        var error = null;
        var success = false;
        
        var decoded = null;
        if(encoded)
        {
            try {
                decoded = JSON.parse(encoded);
            }
            catch (error) {
            }
        }
        
        if(decoded)
        {
            if(decoded.hasOwnProperty('error') && decoded.hasOwnProperty('result'))
            {
                if(decoded['error'])
                {
                    error = decoded['error'];
                    if(error['code'] == -1)
                    {
                        if(error['message'].indexOf("\n\n") != -1)
                           error['message'] = "Wrong parameters. Usage:\n\n" + error['message'];
                    }                    
                }
                else
                {
                    result = decoded['result'];
                    success = true;
                }
            }
            else error = {code: 502, message: "Invalid Response"};
        }
        else
        {
            if(response.statusCode == 200)
            {
                error = {code: 502, message: "Missing Response"};
            }
            else
            {
                error = {code: response.statusCode, message: response.statusMessage};
            }
        }
        
        return {success: success, result: result, error: error};
    }
    
    asProxy ()
    {
        let handler = {
            get: function(target, property, x){
                
                if (typeof target[property] !== 'undefined')
                    return target[property];
                
                return function wrapper() {
                    var args = Array.prototype.slice.call(arguments);
                    var params = [];
                    var callback=args.pop();
                    if (typeof args[0] !== 'undefined') params=args;
                    
                    this.call_multichain(property,params).then(data => {
                        var status={success: true, errorcode: 0, errormessage: ""};	
                        callback(status,data);
                    })
                    .catch(err => {
                        var status={success: false, errorcode: err.code, errormessage: err.message};	
                        callback(status,null);
                    });
                };
            }
        };
        return new Proxy(this, handler);
    }
    
    call_multichain(method,params)
    {
        const MultiChainPromise = new Promise((resolve, reject) => {
            
            const https = require('node:https');
            const http = require('node:http');
            
            const now = new Date();
            const secondsSinceEpoch = Math.round(now.getTime() / 1000);
            var jsonrpc={
                id: secondsSinceEpoch,
                method: method,
                params: params
            };
            if(this.chainname){
                jsonrpc['chain_name'] = this.chainname;
            }
            
            const postData = JSON.stringify(jsonrpc);
            const strUserPass64 = Buffer.from(this.username+":"+this.password).toString('base64');
            
            const options = {
              hostname: this.host,
              port: this.port,
              path: '/',
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData),
                'Authorization' : 'Basic '+ strUserPass64
              }
            };
            
            let protocol=this.usessl ? https : http;
            
            const request = protocol.request(options, (response) => {
                var encoded="";
                response.setEncoding('utf8');
                response.on('data', (chunk) => {
                  encoded += chunk;		
                });
                response.on('end', () => {
                  var parsed = this.parse_response(encoded, response);
                  if(parsed.success){
                      resolve(parsed['result']);
                  }
                  else{
                      reject(parsed['error']);
                  }
                  
                });
            });
            
            request.on('error', (e) => {
                reject({code: 502, message: e.message});
            });
            
            request.write(postData);
            request.end();
        });
        
        return MultiChainPromise;
    }
};
