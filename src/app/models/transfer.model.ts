export class Transfer {
  constructor (
    public recipient: string,
    public sender: string,
    public memo: string,
    public quantity: number,
    public symbol: string
  ) {}
}
