import { sign, isSupported } from 'u2f-api'
import Transport from '@ledgerhq/hw-transport-u2f' // for browser
import Api from './hw-app-eos'

import * as fcbuffer from 'fcbuffer'
import * as assert from 'assert'
import * as asn1 from 'asn1-ber'

declare var Eos: any
import * as Eos from 'eosjs'

const CLA = 0xD4
const INS_GET_APP_CONFIGURATION = 0x06

export async function getPublicKey () 
 {
  let ledgerIndex = "44'/194'/0'/0/0"

  var transport = await Transport.create()

  const api = new Api(transport)
  var result = await api.getPublicKey(ledgerIndex, true)
  return result.wif;

}


export async function setupEos (endpoint:string, chainId: string) {

  let ledgerIndex = "44'/194'/0'/0/0"

  var transport = await Transport.create()

    const signProvider = async ({ transaction }) => { 
      transport.httpEndpoint = endpoint
      const { fc } = new Eos(transport)
      const buffer = this.serialize(chainId, transaction, fc.types)  // chainId instead of fc.types.config.chainId
      const api = new Api(transport)
      const result = await api.signTransaction("44'/194'/0'/0/0", buffer.toString('hex'))
      const rawSig = result.v + result.r + result.s
      return rawSig
    }

    const promiseSigner = args => Promise.resolve(signProvider(args));

    const eos = Eos({ signProvider: promiseSigner, authorization: 'eoswebwa11et@active', chainId: chainId, httpEndpoint: endpoint, expireInSeconds: 60 })
    
    return eos
}


export function serialize (chainId, transaction, types) {
  const writter = new asn1.BerWriter();

  this.encode(writter, fcbuffer.toBuffer(types.checksum256(), chainId));
  this.encode(writter, fcbuffer.toBuffer(types.time(), transaction.expiration));
  this.encode(writter, fcbuffer.toBuffer(types.uint16(), transaction.ref_block_num));
  this.encode(
    writter,
    fcbuffer.toBuffer(types.uint32(), transaction.ref_block_prefix)
  );
  this.encode(
    writter,
    fcbuffer.toBuffer(types.unsigned_int(), transaction.max_net_usage_words)
  );
  this.encode(
    writter,
    fcbuffer.toBuffer(types.uint8(), transaction.max_cpu_usage_ms)
  );
  this.encode(
    writter,
    fcbuffer.toBuffer(types.unsigned_int(), transaction.delay_sec)
  );

  assert(transaction.context_free_actions.length === 0);
  this.encode(writter, fcbuffer.toBuffer(types.unsigned_int(), 0));

  assert(transaction.actions.length === 1);
  this.encode(writter, fcbuffer.toBuffer(types.unsigned_int(), 1));

  const action = transaction.actions[0];

  this.encode(writter, fcbuffer.toBuffer(types.account_name(), action.account));
  this.encode(writter, fcbuffer.toBuffer(types.action_name(), action.name));

  this.encode(
    writter,
    fcbuffer.toBuffer(types.unsigned_int(), action.authorization.length)
  );
  for (let i = 0; i < action.authorization.length; i += 1) {
    const authorization = action.authorization[i];

    this.encode(
      writter,
      fcbuffer.toBuffer(types.account_name(), authorization.actor)
    );
    this.encode(
      writter,
      fcbuffer.toBuffer(types.permission_name(), authorization.permission)
    );
  }
  const Buffer = global.Buffer || require('buffer').Buffer;
  const data = Buffer.from(action.data, 'hex');
  this.encode(writter, fcbuffer.toBuffer(types.unsigned_int(), data.length));
  this.encode(writter, data);

  assert(writter, String(transaction.transaction_extensions.length === 0));
  this.encode(writter, fcbuffer.toBuffer(types.unsigned_int(), 0));
  this.encode(writter, fcbuffer.toBuffer(types.checksum256(), Buffer.alloc(32, 0)));

  return writter.buffer;
}

export function encode(writter, buffer) {
  writter.writeBuffer(buffer, asn1.Ber.OctetString);
}
