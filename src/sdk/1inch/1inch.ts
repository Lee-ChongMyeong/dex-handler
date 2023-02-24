import assert from 'assert';
import Caeb1inch, {Client1inchRequestQuoteAddress, IBlockchain, ITokenList} from 'caeb-1inch';
import {Protocol, QuoteResponse, SwapRequest, SwapResponse} from './types';
import {API_VERSION, BASE_URL} from './1inch.contants';
import request from '../shared/request';

const chainId = IBlockchain.ETH;
const client = new Caeb1inch({chainId: chainId, apiVersion: API_VERSION, apiUrl: BASE_URL});

const OneInch = {
  tokens: async (): Promise<ITokenList> => {
    const tokens: ITokenList = await client.getTokensList();
    assert(Object.entries(tokens).length > 0, 'token list shoudl be greater than zero(0)');
    return tokens;
  },
  quote: async (params: Client1inchRequestQuoteAddress): Promise<QuoteResponse> =>
    request.get(`${BASE_URL}/${API_VERSION}/${chainId}/quote`, params),
  swap: async (params: SwapRequest): Promise<SwapResponse> =>
    request.get(`${BASE_URL}/${API_VERSION}/${chainId}/swap`, params),
  approve: {
    spender: async (): Promise<{address: string}> =>
      request.get(`${BASE_URL}/${API_VERSION}/${chainId}/approve/spender`),
    transaction: async (params: {
      tokenAddress: string;
      amount: string;
    }): Promise<{data: string; gasPrice: number; to: string; value: number}> =>
      request.get(`${BASE_URL}/${API_VERSION}/${chainId}/approve/transaction`, params),
    allowance: async (params: {tokenAddress: string; walletAddress: string}): Promise<{allowance: number}> =>
      request.get(`${BASE_URL}/${API_VERSION}/${chainId}/approve/allowance`, params),
  },
  liquiditySources: async (): Promise<{protocols: Array<Protocol>}> =>
    request.get(`${BASE_URL}/${API_VERSION}/${chainId}/liquidity-sources`),
};

export default OneInch;
