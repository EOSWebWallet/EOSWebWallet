import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { IAppConfig } from '../models/app-config.model'

@Injectable()
export class ConfigService {

  static settings: IAppConfig

  constructor (private http: HttpClient) { }


  load () {
    const jsonFile = 'assets/config/config.json'
    return new Promise<void>((resolve, reject) => {
      this.http.get(jsonFile).subscribe(response => {
        ConfigService.settings = <IAppConfig>response
        resolve()
      },
      error => {
        reject(`Could not load file '${jsonFile}': ${JSON.stringify(error)}`)
      })
    })
  }

}
