export class Network {
  constructor (
        public host: string,
        public viewValue: string,
        public currentChainId: string,
        public port: number,
        public protocol: string,
        public isCustome: boolean = false
    ) {}
}

export enum NetworkProtocol {
    Http = 'http://',
    Https = 'https://'
}

export enum NetworkChaindId {
    MainNet = 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    Jungle = '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca'
}
