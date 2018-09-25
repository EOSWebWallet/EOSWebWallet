import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { EosTypes } from '../models/eos-types.model'

@Injectable()
export class EosService {

  static typesEos: EosTypes

  constructor (private http: HttpClient) { }

  load () {
    const jsonFile = 'assets/eos/types.json'
    return new Promise<void>((resolve, reject) => {
      this.http.get(jsonFile).subscribe(response => {
        EosService.typesEos = response as EosTypes
        resolve()
      },
      error => {
        reject(`Could not load file '${jsonFile}': ${JSON.stringify(error)}`)
      })
    })
  }

}
