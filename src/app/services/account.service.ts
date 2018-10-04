import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of, forkJoin } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { LocalStorage } from 'ngx-webstorage'
import * as _ from 'lodash'

@Injectable()

export class AccountService {
  @LocalStorage()
  currentNetwork: string
  @LocalStorage()
  protocol: string
  @LocalStorage()
  port: number

  constructor (private httpClient: HttpClient) {}

  findByName (body: string): Observable<any> {
    return this.httpClient.post(this.protocol + this.currentNetwork + ':' + this.port + '/v1/chain/get_account' , body).pipe(
     catchError(err => {
       return of(false)
     })
   )
  }
  findByKey (body: string): Observable<any> {
    return this.httpClient.post(this.protocol + this.currentNetwork + ':' + this.port + '/v1/history/get_key_accounts' , body).pipe(
      catchError(err => {
        return of(false)
      })
    )
  }
  getTokenInfo (body: string): Observable<any> {
    return this.httpClient.post(this.protocol + this.currentNetwork + ':' + this.port + '/v1/chain/get_currency_balance' , body).pipe(
      catchError(err => {
        return of(false)
      })
    )
  }

  getAllTokensInfo (tokens: string[], accountName) {
    if (_.isEmpty(tokens)) {
      return of([])
    }

    return forkJoin(tokens.map(token => this.getTokenInfo('{"code":"' + token + '","account":"' + accountName + '"}')))
      .pipe(map(result => {
        return result.filter(item => item !== false && item.length > 0)
      }))
  }

  getChainInfo (): Observable<any> {
    return this.httpClient.post(this.protocol + this.currentNetwork + ':' + this.port + '/v1/chain/get_info','').pipe(
      catchError(err => {
        return of(false)
      })
    )
  }

  getActions (body: string): Observable<any> {
    return this.httpClient.post(this.protocol + this.currentNetwork + ':' + this.port + '/v1/history/get_actions', body).pipe(
      catchError(err => {
        return of(false)
      })
    )
  }

  getProducers (): Observable<any> {
    return this.httpClient.post(this.protocol + this.currentNetwork + ':' + this.port + '/v1/chain/get_producers',
      JSON.stringify({ json: true })).pipe(
        catchError(err => {
          return of(false)
        })
      )
  }

  getCurrentCourse (): Observable<any> {
    let custHeaders = new HttpHeaders().set('Referrer-Policy', 'no-referrer')
    return this.httpClient.get('https://api.coingecko.com/api/v3/coins/eos').pipe(
      catchError(err => {
        return of(false)
      })
    )
  }
}
