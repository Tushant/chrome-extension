/*
A content script is a part of your extension that runs in the context of a particular web page
(as opposed to background scripts which are part of the extension, or scripts which are part of
the web site itself, such as those loaded using the <script> element).

Background scripts can access all the WebExtension JavaScript APIs, but they can't directly
access the content of web pages. So if your extension needs to do that, you need content scripts.

*/

// Send a message containing the page details back to the event page
chrome.runtime.sendMessage({
    'email': document.email,
    'password': document.password,
});

function init(event) {
  var topic = "";
  if (window.getSelection) {
    topic = window.getSelection().toString();
  } else if (document.selection) {
      topic = document.selection.createRange().topic;
  } else {
    return topic;
  }
  if(topic.length) {
    chrome.runtime.sendMessage({'message': 'setTopic', 'data': topic}, function(response){
      console.log('response', response);
    });
  }
}

document.addEventListener('click',init);

// event.ctrlKey && event.keyCode === 65
