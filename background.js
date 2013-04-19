var apiUrl = 'https://locksmith.io/api/v1';
var credsUrl = apiUrl + '/credentials/?limit=250';

function onRequest(request, sender, sendResponse) {
  var url = sender.tab.url;
  var username = localStorage['username'];
  var apiKey = localStorage['api_key'];

  function setHeaders(xhr) {
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('Authorization', 'ApiKey ' + username + ':' + apiKey);
  }
  switch(request.method) {
    case "getApiKey":
      sendResponse({api_key: apiKey});
      break;
    case "debug":
      var data = {
        apiUrl: apiUrl,
        credsUrl: credsUrl,
        apiKey: apiKey
      }
      sendResponse({debug: data});
      break;
    case "getCredentials":
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(data) {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            var data = JSON.parse(xhr.responseText);
            sendResponse({data: data});
          } else {
            sendResponse({});
          }
        }
      }
      xhr.open('GET', credsUrl, true);
      xhr.send();
      break;
    default:
      sendResponse({});
  }
};

// Listen for the content script to send a message to the background page.
chrome.extension.onRequest.addListener(onRequest);
