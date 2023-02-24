import {Swap} from './Swap';
import {Token} from './Token';
import {Transaction} from './Transaction';

export type ErrorMeta = {
  type: string;
  value: string;
};

export type ErrorResponse = {
  statusCode: number;
  error: string;
  description: string;
  meta: Array<ErrorMeta>;
  requestId: string;
};

export type SwapResponse = {
  fromToken: Token;
  toToken: Token;
  toTokenAmount: string;
  fromTokenAmount: string;
  protocols: [[[Swap]]];
  tx: Transaction;
};
