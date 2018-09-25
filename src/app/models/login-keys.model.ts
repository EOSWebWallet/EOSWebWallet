export class LoginKeys {
  constructor (
    public privateKey: string,
    public publicKey: string,
    public remember: boolean,
    public pass: string,
    public accountName: string,
    public permission: string
  ) {}
}
