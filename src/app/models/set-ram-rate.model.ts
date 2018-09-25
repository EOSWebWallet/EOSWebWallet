export enum Unit {
  bytes = 'Bytes',
  eos = 'EOS'
}

export class SetRamRate {
  constructor (
    public ramSize: number,
    public ramSizeUnit: string
  ){}
}
