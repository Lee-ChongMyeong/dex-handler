import {SwapNames} from './SwapNames';

export type SwapRequest = {
  fromTokenAddress: string;
  toTokenAddress: string;
  amount: string;
  fromAddress: string;
  slippage: number;
  protocols?: SwapNames;
  destReceiver?: string;
  referrerAddress?: string;
  fee?: string;
  disableEstimate?: boolean;
  permit?: string; // https://eips.ethereum.org/EIPS/eip-2612
  compatibilityMode?: boolean;
  burnChi?: boolean;
  allowPartialFill?: boolean;
  parts?: string;
  mainRouteParts?: string;
  connectorTokens?: string;
  complexityLevel?: string;
  gasLimit?: string;
  gasPrice?: string;
};
