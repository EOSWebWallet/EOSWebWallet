export interface EosTypes {
  typeInput: Array<string>,
  types: [
      {
        name: string,
        type: string,
        length: number
      }
  ],
  defaultType: {
    type: string
  }
}
