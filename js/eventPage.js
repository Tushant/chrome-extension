// This function is called onload in the popup code
function getPageDetails(callback) {

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      for(var i = 0; i<tabs.length;i++) {
        var tabId=tabs[i].id;
        // Inject the content script into the current page
        chrome.tabs.executeScript(tabId, {"file": "js/content.js"});
      }
  });
    // When a message is received from the content script
    chrome.runtime.onMessage.addListener(function(message) {
        // Call the callback function i.e onPageDetailsReceived in our case
        callback(message);
    });
};
