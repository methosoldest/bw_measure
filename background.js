

var uploaded_bytes = 0;
var downloaded_bytes = 0;

function http_request_content_length_reader(details) {
    for (var i = 0; i < details.requestHeaders.length; i++) {
        if (details.requestHeaders[i].name.toLowerCase() == "content-length") {
	    uploaded_bytes += parseInt(details.requestHeaders[i].value);
        }
    }
}

function http_response_content_length_reader(details) {
    for (var i = 0; i < details.responseHeaders.length; i++) {
        if (details.responseHeaders[i].name.toLowerCase() == "content-length") {
	    downloaded_bytes += parseInt(details.responseHeaders[i].value);
        }
    }
}

function add_bw_handlers(tab) {
    console.log("DEBUG: Adding callbacks for: " + tab.id);

    chrome.webRequest.onSendHeaders.addListener(http_request_content_length_reader,                        
					    { 
						"tabId" : tab.id,
						    "urls": ["<all_urls>"]                     
						    },                                         
						["requestHeaders"]);  
    
    
    chrome.webRequest.onHeadersReceived.addListener(http_response_content_length_reader, {
	    "tabId" : tab.id,
		"urls": ["<all_urls>"]
		},
	["responseHeaders"]);
}

chrome.tabs.onCreated.addListener(add_bw_handlers);