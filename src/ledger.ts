import { sign, isSupported } from "u2f-api";
import Transport from "@ledgerhq/hw-transport-u2f"; // for browser
import Eos from './hw-app-eos';

const CLA = 0xD4;
const INS_GET_APP_CONFIGURATION = 0x06;

export async function startListen() {

let ledgerIndex = "44'/194'/0'/0/0";

Transport.create().then(transport => {

  console.log(transport);

  const eos = new Eos(transport);

  eos.getPublicKey(ledgerIndex, true).then(function(result) {
    console.log(result);
  }).catch(function(error) {
    console.log(error);
  });

  });

}