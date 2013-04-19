//chrome.extension.sendRequest({method: "debug"}, function(response) {
//  console.log('Debug:');
//  console.log(response.debug);
//});
chrome.extension.sendRequest({method: "getCredentials"}, function(response) {
  console.log('getCredentials');
  var credentials = response.data.objects;
  var fields = document.getElementsByTagName('input');
  for (var x=0, l=fields.length; x<l; x++) {
    var f = fields[x];
    for (var i=0, len=credentials.length; i<len; i++) {
      var cred = credentials[i];
      if (cred.url != "" && document.URL.indexOf(cred.url) > -1) {
        // username
        // TODO: refactor the search to a lib
        var fname = f.name.toLowerCase();
        if (fname.indexOf('user') > -1 || fname.indexOf('name') > -1 || fname.indexOf('email') > -1 || fname.indexOf('login') > -1) {
          f.value = cred.username;
          break;
        }
        // password
        if (fname.indexOf('pass') > -1) {
          f.value = cred.password;
          break;
        }
      }
    }
  }
});
