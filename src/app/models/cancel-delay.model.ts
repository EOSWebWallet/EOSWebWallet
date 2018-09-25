export class CancelDelay {
  constructor (
    public accountName: string,
    public permission: string,
    public trxId: string
  ) {}
}
