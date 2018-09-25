export class VoteProducer {
  constructor (public proxy: string, public voter: string, public producers: string[]) {
    this.proxy = proxy
    this.voter = voter
    this.producers = producers
  }
}
