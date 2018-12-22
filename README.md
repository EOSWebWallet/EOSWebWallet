## Getting started
1. Open terminal
2. Clone the repo: `git clone git@github.com:EOSWebWallet/EOSWebWallet.git` 
3. run `npm install`. 
4. run `npm start`
5. App should be running in `http://localhost:4200`

## Use of transport.js and transportU2F.js

For using ledger add " var Buffer = global.Buffer || require('buffer').Buffer" and "var regeneratorRuntime = require("@babel/runtime/regenerator ");" lines at the beginning of 
transport.js and transportU2F.js files. 
