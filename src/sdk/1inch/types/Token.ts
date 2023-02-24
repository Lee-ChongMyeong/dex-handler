// reference : https://docs.1inch.io/docs/aggregation-protocol/api/swagger
// response
export type Token = {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  logoURI: string;
  eip2612: boolean;
  domainVersion?: string;
  tags: Array<string>;
};
