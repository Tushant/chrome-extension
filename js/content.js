
function init(event) {
  var topic = "";
  if (window.getSelection) {
    topic = window.getSelection().toString();
  } else if (document.selection) {
      topic = document.selection.createRange().topic;
  } else {
    return topic;
  }
  // if((event.ctrlKey && event.keyCode === 65) && topic.length) {
  if(topic.length) {
    chrome.runtime.sendMessage({'message': 'setTopic', 'data': topic}, function(response){
      console.log('response', response);
    });
    // do the processing here now
  }
}

document.addEventListener('keydown',init);
