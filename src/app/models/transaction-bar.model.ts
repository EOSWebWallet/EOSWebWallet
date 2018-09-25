export class TransactionBar {
  constructor (
    public actions: {
      block_time: string,
      direction: string,
      action_trace: {trx_id: string,act: {account: string, name: string, data: {from: string, to: string, memo: string, quantity: string}}}
    }[]
  ) {}
}
