# Locksmith Chrome Extension
This is a Chrome extension that will auto-fill fields with data from Locksmith.

Note: this is experimental.

# Installation
Since this is still experimental, you will need to clone this repo, open
`chrome://extensions`, select `Load unpacked extension...`, and browse to this
directory.

# Usage
This will query the locksmith API asynchronously whenever you load a page.  It
will then look for corresponding username and password fields and auto-fill them
if it finds a credential.  It uses the `url` field of the credential to match.
