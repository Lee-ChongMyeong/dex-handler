import {Swap} from './Swap';
import {Token} from './Token';

export type QuoteResponse = {
  fromToken: Token;
  toToken: Token;
  toTokenAmount: string;
  fromTokenAmount: string;
  protocols: [[[Swap]]];
  estimatedGas: number;
};
