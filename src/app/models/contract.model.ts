export interface IContract {
  version: string,
  types: string[],
  structs:[
    {
      name: string,
      base: string,
      fields: [
        {
          name:string,
          type:string
        }
      ]
    }
  ],
  actions:[
    {
      name: string,
      type: string
    }
  ]
}
