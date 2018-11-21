export interface IAppConfig {
  eos: {
    chainId: string,
    host: string,
    port: number,
    protocol: string
  },
  eosTokens: {
    greymass: string,
    eosflare: string
  },
  vector: string,
  twitterLink: string,
  facebookLink: string,
  telegramLink: string,
  githubLink: string,
  scatterLink: string,
  mediumLink: string,
  gtag: string,
}
