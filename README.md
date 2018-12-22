## Getting started
1. Open terminal
2. Clone the repo: `git clone git@github.com:EOSWebWallet/EOSWebWallet.git` 
3. run `npm install`. 
4. run `npm start`
5. App should be running in `http://localhost:4200`

## Use of transport.js and transportU2F.js

For using ledger add into 
node_modules\@ledgerhq\hw-transport-u2f\lib\TransportU2F.js
 and 
node_modules\@ledgerhq\hw-transport\lib\Transport.js
lines:

var regeneratorRuntime = require("@babel/runtime/regenerator");
var Buffer = global.Buffer || require('buffer').Buffer;

at the beginning of the files
