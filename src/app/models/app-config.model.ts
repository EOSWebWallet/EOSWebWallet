export interface IAppConfig {
  eos: {
    chainId: string,
    host: string,
    port: number,
    protocol: string
  },
  vector: string,
  telegramLink: string,
  scatterLink: string,
  gtag: string,
}
