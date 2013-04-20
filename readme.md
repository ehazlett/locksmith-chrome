# Locksmith Chrome Extension
This is a Chrome extension that will auto-fill fields with data from Locksmith.

Note: this is experimental.

# Installation
Since this is still experimental, you will need to clone this repo, open
`chrome://extensions`, select `Load unpacked extension...`, and browse to the
`locksmith` directory in this repo.

# Usage
You will need to set the host (default is https://locksmith.io), username
and api key.  To get your API key, login to Locksmith and then visit
`https://locksmith.io/api/v1/accounts/?format=json` (replace locksmith.io if
you are hosting your own instance) -- use the value from `api_key`in the
extension options.

This will query the locksmith API asynchronously whenever you load a page.  It
will then look for corresponding username and password fields and auto-fill them
if it finds a credential.  It uses the `url` field of the credential to match.

Note: the Locksmith api uses your current session to decrypt your data so you
will need to make sure you have logged in to the Locksmith web app in order for
the extension to work.  You can set the "encryption key timeout" in the
Locksmith web app account options.

