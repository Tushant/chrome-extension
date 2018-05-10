  var selectedTopic = null;
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log('req', request.message, request.data) // not listened
      switch(request.message) {
       case 'setTopic':
        window.selectedTopic = request.data;
        break;
       default:
        sendResponse({data: 'Invalid'})
        break;
      }
  });

  function savetopic(info, tab) {
    fetch('http://www.google.com/search?q='+selectedTopic)
      .then(function(response) {
        console.log('response ---->', response);
        return response.json()
      })
      .then(function(re){
        window.location.href = 'http://www.google.com/search?q=topic'
      })
      .catch(function(error){
        console.log('fetched error --->', error)
      })
}

var contexts = ["selection"];
for (var i = 0; i < contexts.length; i++)
{
    var context = contexts[i];
    chrome.runtime.onInstalled.addListener(function() {
      chrome.contextMenus.create({"title": "Send to Google",
        "id": 'Google',
        "contexts":[context]});
    })
}

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === 'Google') {
    savetopic(info, tab)
  }
})
