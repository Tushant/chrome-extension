// This callback function is called when the content script has been
// injected and returned its results
function onPageDetailsReceived(pageDetails) {
    document.getElementById('email').value = pageDetails.email || 'example@example.com';
    document.getElementById('password').value = pageDetails.password;
}

// Global reference to the status display SPAN
var statusDisplay = null;

// POST the data to the server using XMLHttpRequest
function naviLogin() {
    // Cancel the form submit
    event.preventDefault();
    // The URL to POST our data to
    var postUrl = 'http://127.0.0.1:3008/users/sign_in.json';

    // Prepare the data to be POSTed by URLEncoding each field's contents
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var body = {
      email: email,
      password: password
    }
    // Set correct header for form data
    const headers =  new Headers();
    headers.append('Content-Type', 'application/json');
    console.log('apiurl', postUrl, headers, body)
    fetch(postUrl, {
      method: 'POST',
      headers:headers,
      body: JSON.stringify(body)
    })
    .then(function(response){
      console.log('respnse ------>', response)
      return response.json()
    })
    .then(function(data){
      console.log('data ------->', data)
    })
    .catch(function(err){
      console.log('err ---->', err)
    })
}

// When the popup HTML has loaded
window.addEventListener('load', function(evt) {
    // Cache a reference to the status display SPAN
    statusDisplay = document.getElementById('status-display');
    // Handle the bookmark form submit event with our naviLogin function
    document.getElementById('navi-login')
            .addEventListener('submit', naviLogin);
    // Get the event page
    chrome.runtime.getBackgroundPage(function(eventPage) {
        // Call the getPageInfo function in the event page, passing in
        // our onPageDetailsReceived function as the callback. This
        // injects content.js into the current tab's HTML
        eventPage.getPageDetails(onPageDetailsReceived);
    });
});
