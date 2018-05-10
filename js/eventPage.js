// var contextMenuItem = {
//   "id": "navi",
//   "title": "NAVI",
//    "shortcut": "ctrl+n",
//   "contexts": ["selection"]
// }
//
// chrome.contextMenus.create(contextMenuItem);

chrome.commands.onCommand.addListener(function(command) {
  console.log('Command:', command);
});

function init() {
  textToHyperLink();
}

function textToHyperLink(event) {
  var text = "";
  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection) {
    text = document.selection.createRange().text;
  }
  return text;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// chrome.tabs.query({ active: true, currentWindow: true}, function(tabs) {
//   chrome.pageAction.show(tabs[0].id);
// })