export class SetAccountLimits {
  constructor (public account: string, public ram: number, public net: number, public cpu: number) {}
}
