function bookmarkit(tab_id, bTitle, bUrl, bText){

	var action_url = "http://d99.us/createemail.php?";
	action_url += "curl=" + encodeURIComponent(bUrl) + "&";
	action_url += "ctitle=" + encodeURIComponent(bTitle) + "&";
	action_url += "cbody=" + encodeURIComponent(bText);
	
	//alert(action_url);
	
	chrome.tabs.update(
			tab_id, {url: action_url}
			);
			
}


chrome.extension.onConnect.addListener(
function(port) {
    var tab = port.sender.tab;

    // This will get called by the content script we execute in
    // the tab as a result of the user pressing the browser action.
    port.onMessage.addListener(function(info) {
      var max_length = 4096;
      if (info.selection.length > max_length)
        
		info.selection = info.selection.substring(0, max_length);
		
		//alert(info.title);
		
		bookmarkit(tab.id, info.title, tab.url, info.selection);
	
	  
    });
});



chrome.browserAction.onClicked.addListener( 

	function(tab){
		chrome.tabs.executeScript(null, {file: "content_script.js"});		
	}

);
