var credDOM = document.createElement('div');
credDOM.setAttribute('id', 'locksmith-main');
credDOM.innerHTML = '<a href="#" id="locksmith-show">Locksmith</a>';
var credListDOM = document.createElement('div');
credListDOM.setAttribute('id', 'locksmith-creds');
credListDOM.setAttribute('class', 'locksmith-creds');
//credDOM.appendChild(credListDOM);
document.body.appendChild(credDOM);
document.body.appendChild(credListDOM);

credDOM.addEventListener('click', toggleList, false);

// debug
//chrome.extension.sendRequest({method: "debug"}, function(response) {
//  console.log('Debug:');
//  console.log(response.debug);
//});
function toggleList() {
  var visible = credListDOM.style.visibility;
  if (visible === 'visible') {
    credListDOM.style.visibility = 'hidden';
  } else {
    credListDOM.style.visibility = 'visible';
  }
}
function isUsernameField(elName) {
  var found = false;
  if (elName.indexOf('user') > -1) { found = true; }
  if (elName.indexOf('name') > -1) { found = true; }
  if (elName.indexOf('email') > -1) { found = true; }
  if (elName.indexOf('login') > -1) { found = true; }
  return found;
}
function isPasswordField(elName) {
  var found = false;
  if (elName.indexOf('pass') > -1) { found = true; }
  return found;
}
function setCredentials(username, password) {
  var fields = document.getElementsByTagName('input');
  for (var i=0, len=fields.length; i<len; i++) {
    var f = fields[i];
    // username
    var fname = f.name.toLowerCase();
    if (fname == '') { fname = f.id.toLowerCase(); }
    if (isUsernameField(fname)) {
      f.value = username;
    }
    // password
    if (isPasswordField(fname)) {
      f.value = password;
    }
  }
}
function credLinkClick(e) {
  var username = e.target.getAttribute('username');
  var password = e.target.getAttribute('password');
  setCredentials(username, password);
  toggleList();
}
function showCredentialList(credentials) {
  credDOM.style.visibility = 'visible';
  credListDOM.innerHTML = '';
  var newDiv = document.createElement('div');
  for (var i=0,len=credentials.length; i<len; i++) {
    var cred = credentials[i];
    var credParent = document.createElement('p');
    var credLink = document.createElement('a');
    credLink.setAttribute('name', cred.name);
    credLink.setAttribute('username', cred.username);
    credLink.setAttribute('password', cred.password);
    credLink.innerText = cred.groups[0].name + ': ' + cred.name;
    credLink.addEventListener('click', credLinkClick, false);
    credParent.appendChild(credLink);
    newDiv.appendChild(credParent);
  }
  credListDOM.appendChild(newDiv);
}
chrome.extension.sendRequest({method: "getCredentials"}, function(response) {
  var credentials = response.data.objects;
  if (credentials.length == 1) {
    var cred = credentials[0];
    setCredentials(cred.username, cred.password);
  } else if (credentials.length > 1) {
    showCredentialList(credentials);
  }
});
