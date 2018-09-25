export class LinkPermission {
  constructor (
    public account: string,
    public code: string,
    public type: string,
    public requirement: string
  ) {}
}
