export class Account {
  constructor (
    public name: string,
    public owner: string,
    public ownerKey: string,
    public activeKey: string,
    public cpuStake: number,
    public netStake: number,
    public bytes: number,
    public transfer: boolean
  ) {}
}
