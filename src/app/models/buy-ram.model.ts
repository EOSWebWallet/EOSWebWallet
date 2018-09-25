export enum Unit {
  eos, bytes
}
export class BuyRam {
  recipient: string
  payer: string
  unit: string
  ram: number
}
