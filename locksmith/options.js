function save_options() {
  var host = document.getElementById("host").value;
  var username = document.getElementById("username").value;
  var apiKey = document.getElementById("apiKey").value;
  localStorage["host"] = host || "https://locksmith.io";
  localStorage["username"] = username;
  localStorage["api_key"] = apiKey;

  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

function restore_options() {
  var host = localStorage["host"];
  var user = localStorage["username"];
  var api_key = localStorage["api_key"];
  if (!api_key) {
    return;
  }
  var hostEl = document.getElementById("host");
  hostEl.value = host || "https://locksmith.io";
  var username = document.getElementById("username");
  username.value = user;
  var apiKey = document.getElementById("apiKey");
  apiKey.value = api_key;
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);

