<?php

/*
	MultiChain API Library for PHP (c) Coin Sciences Ltd
	All rights reserved under BSD 3-clause license
	
	See README file for instructions and examples.php for examples
*/

define('MC_DEFAULT_ERROR_CODE', 502); 

define('MC_OPT_CHAIN_NAME', 1);
define('MC_OPT_USE_CURL'  , 2);
define('MC_OPT_VERIFY_SSL', 3);

class MultiChainClient
{
    private $host;
    private $port;
    private $username;
    private $password;
    private $chainname;
    private $error_code;
    private $error_message;
    
    function __construct($host, $port, $username, $password, $usessl = false)   
    {
        $this->host = $host;
        $this->port = $port;
        $this->username = $username;
        $this->password = $password;
        $this->chainname = null;
        $this->usessl = $usessl;
        $this->usecurl = $usessl; 
        $this->verfyssl = true;
        $this->error_code = 0;
        $this->error_message = "";
    }
    
    function setoption($option, $value)
    {
        switch($option)
        {
            case MC_OPT_CHAIN_NAME:
                $this->chainname = $value;
                break;
            case MC_OPT_USE_CURL:
                $this->usecurl = $value;
                break;
            case MC_OPT_VERIFY_SSL:
                $this->verfyssl = $value;
                break;
            default:
                return false;
        }
        return true;
    }

    private function prepare_payload($method, $params)
    {
        $request=array(
            'id' => time(),
            'method' => $method,
            'params' => $params,
        );
        if(!is_null($this->chainname))
        {
            $request['chain_name'] = $this->chainname;
        }
        
        return json_encode($request);
    }
    
    private function parse_response($encoded)
    {
        $result = NULL;
        
        $decoded = NULL;
        if(!is_null($encoded))
        {
            $decoded = json_decode($encoded);
        }

        if(!is_null($decoded))
        {
            if(property_exists($decoded, 'error') && property_exists($decoded, 'result')) 
            {
                $this->error_code = 0; 
                if(!is_null($decoded->error))
                {
                    $this->error_code = $decoded->error->code;
                    $this->error_message = $decoded->error->message;
                    if($this->error_code == -1) 
                    {
                        if(strpos($this->error_message,"\n\n") !== false)
                        {
                            $this->error_message = "Wrong parameters. Usage:\n\n".$this->error_message;
                        }
                    }
                }
                else
                {
                    $result = $decoded->result;
                    $this->error_message = "";
                }
            }
            else
            {
                $this->error_message = "Invalid Response";
            }
        }
        else
        {
            if($this->error_code == 200)
            {
                $this->error_message = "Missing Response";
            }
        }
        
        return $result;
    }
    
    private function http_status_message($http_code)
    { 
        $text="";
        switch ($http_code) {
            case 401: $text = 'Unauthorized'; break;
            case 403: $text = 'Forbidden'; break;
            default:  $text="HTTP Code $http_code error"; break;
        }

        return $text;
    }
    
    private function call_fsockopen($method, $params)
    {
        $fp = fsockopen($this->host, $this->port);
        $strUserPass64 = base64_encode($this->username.':'.$this->password);
                
        $payload = $this->prepare_payload($method, $params);
        
        $result = NULL;
        $this->error_code = MC_DEFAULT_ERROR_CODE;
        $this->error_message = "Unable to Connect";
        if($fp)
        {
            fputs($fp, "POST / HTTP/1.1\r\n");
            fputs($fp, "Host: $this->host\r\n");
            fputs($fp, "Authorization: Basic $strUserPass64\r\n");
            fputs($fp, "Content-type: application/json\r\n"); 
            fputs($fp, "Content-length: ".strlen($payload)."\r\n");
            fputs($fp, "Connection: close\r\n\r\n");
            fputs($fp, $payload."\r\n\r\n");
            
            $chunks = array();
            while(!feof($fp)) 
            {
                $chunks[] = fgets($fp, 32768);
            }
            $response = implode("",$chunks);

            $encoded=NULL;
            $header_end=strpos($response,"\r\n\r\n");
            $http_code = 0;
            
            if($header_end)
            {
                $encoded=trim(substr($response,$header_end+4));
                $headers = explode("\r\n",substr($response,0,$header_end));
                if(substr($headers[0],0,4) == 'HTTP') 
                {
                    $arr = explode(" ",trim($headers[0]));
                    $this->error_code = $arr[1];
                    $this->error_message = $arr[2];
                }
            }
            
            $result=$this->parse_response($encoded);
            
            fclose($fp);
        }

        return $result;
    }
    
    private function call_curl($method, $params)
    {
        $url=($this->usessl ? 'https' : 'http').'://'.$this->host.':'.$this->port.'/';
        $strUserPass64 = base64_encode($this->username.':'.$this->password);
        
        $payload = $this->prepare_payload($method, $params);
        
        
        $ch=curl_init($url);

        $result = NULL;
        $this->error_code = MC_DEFAULT_ERROR_CODE;
        $this->error_message = "Unable to Connect";
        
        if(curl_errno($ch) == 0)
        {
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            
            if(!$this->verfyssl)
            {
                curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            }
            
            curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                'Content-Type: application/json',
                'Content-Length: '.strlen($payload),
                'Connection: close',
                'Authorization: Basic '.$strUserPass64
            ));
        
            $encoded=curl_exec($ch);
            
            if(curl_errno($ch) == 0)
            {                    
                $info=curl_getinfo($ch);
                $this->error_code = $info['http_code'];
                $this->error_message = $this->http_status_message($this->error_code); 
                
                $result=$this->parse_response($encoded);
            }
            else
            {
                $this->error_code = curl_errno($ch);
                $this->error_message = curl_error($ch);
            }
        
            curl_close($ch);
        }
        
        return $result;
    }
    
    public function __call($method, $params)
    {
        if($this->usecurl)
        {
            return $this->call_curl($method, $params);
        }
        
        return $this->call_fsockopen($method, $params);
    }
    
    public function errorcode()
    {
        return $this->error_code;
    }
    
    public function errormessage()
    {
        return $this->error_message;
    }
    
    public function success()
    {
        return ($this->error_code == 0);
    }
    
}