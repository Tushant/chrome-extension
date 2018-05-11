  var selectedTopic = null;
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      switch(request.message) {
       case 'setTopic':
        window.selectedTopic = request.data;
        break;
       default:
        sendResponse({data: 'Invalid'})
        break;
      }
  });


  // TODO - find the topic id from the topic name if it exists then show CRM
  // if does not exist, then add it to custom topic
  function savetopic(info, tab) {
    const apiUrl = 'http://localhost:3020/v2/check_topic/'+selectedTopic;
    const headers =  new Headers()
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Basic U2Vzc2lvbjogTkIzeERmTExkZWxyQU8tSEdpX1FCcUVQLW9PdGlmSk1TSlRDanpLRnhNQmtzYkx3a1ktSUllb3FlR0RZQ25RNjZzZGhnVElWZE5kOVlzalhMQmg2eXc=');
    fetch(apiUrl, {
      method: 'GET',
      headers: headers,
    })
      .then(function(response) {
        console.log('response ---->', response);
        return response.json()
      })
      .then(function(data) {
        if(data) {
          const uri = 'http://localhost:3000/Me/Company/entity_crm/'+data.topic.id;
          chrome.tabs.create({url: uri});
        }
      })
      .catch(function(err) {
        console.log('error --->', err)
      })
}

var contexts = ["selection"];
for (var i = 0; i < contexts.length; i++)
{
    var context = contexts[i];
    chrome.runtime.onInstalled.addListener(function() {
      chrome.contextMenus.create({"title": "Send to Navi",
        "id": 'Navi',
        "contexts":[context]});
    })
}

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === 'Navi') {
    savetopic(info, tab)
  }
})
