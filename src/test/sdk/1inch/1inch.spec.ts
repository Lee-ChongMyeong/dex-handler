import {IToken} from 'caeb-1inch';
import {expect} from 'chai';
import oneinch from 'sdk/1inch/1inch';
import type {QuoteResponse, Swap, SwapResponse} from 'sdk/1inch/types';
import {allSwapNames} from 'sdk/1inch/types/SwapNames';

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

describe('sdk/1inch/1inch', () => {
  it('token list', async () => {
    const tokens = await oneinch.tokens();
    const tokenSymbols = Object.entries(tokens).map((t: [string, IToken]) => t[1].symbol);
    expect(tokenSymbols).to.length.gt(0);
    expect(tokenSymbols).to.contains('DAI');
    expect(tokenSymbols).to.contains('USDC');
  });

  it('quote', async () => {
    const DAI = '0x6b175474e89094c44da98b954eedeac495271d0f';
    const USDC = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';
    const amount = 100000000 * 10000 * 10000;
    const response: QuoteResponse = await oneinch.quote({
      fromTokenAddress: DAI,
      toTokenAddress: USDC,
      amount: amount,
    });
    expect(response.fromToken.address).to.eq(DAI);
    expect(response.toToken.address).to.eq(USDC);
    expect(Number.parseInt(response.fromTokenAmount)).to.eq(amount);
    expect(Number.parseInt(response.toTokenAmount)).to.gt(0);
  });

  it('swap', async () => {
    const ETH = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
    const USDC = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';
    const amount = 100000000 * 10000 * 10000;
    const response: SwapResponse = await oneinch.swap({
      fromTokenAddress: ETH,
      toTokenAddress: USDC,
      amount: amount,
      fromAddress: ETH,
      slippage: 1,
    });
    // respnse token address converted to lowercase address
    expect(response.fromToken.address).to.eq(ETH.toLowerCase());
    expect(response.toToken.address).to.eq(USDC);
    expect(response.tx.value).to.eq(amount);

    const protocol: Swap = {
      name: 'AAVE',
      part: 100,
      fromTokenAddress: ETH.toLowerCase(),
      toTokenAddress: USDC,
    };
    expect(response.protocols[0][0][0].name).to.oneOf(allSwapNames);
    expect(response.protocols[0][0][0].part).to.eq(protocol.part);
    expect(response.protocols[0][0][0].fromTokenAddress).to.eq(protocol.fromTokenAddress);
    expect(response.protocols[0][0][0].toTokenAddress).to.eq(protocol.toTokenAddress);
  });

  it('approve spender', async () => {
    const response = await oneinch.approve.spender();
    expect(response.address).to.eq('0x1111111254eeb25477b68fb85ed929f73a960582');
  });

  it('approve transaction', async () => {
    const USDC = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';
    const response = await oneinch.approve.transaction({tokenAddress: USDC, amount: 100});

    expect(response.to).to.eq(USDC);
    expect(response.gasPrice).to.gt(0);
    expect(response.value).to.eq(0);
    expect(response.data).to.eq(
      '0x095ea7b30000000000000000000000001111111254eeb25477b68fb85ed929f73a9605820000000000000000000000000000000000000000000000000000000000000064'
    );
  });

  it('approve allowance', async () => {
    const USDC = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';
    const walletAddress = '0x1a4d33C94Cc42DFd893f129314e099CbE56D1d89';
    const response = await oneinch.approve.allowance({tokenAddress: USDC, walletAddress: walletAddress});

    expect(response.allowance).to.eq(0);
  });

  it('liquidity-sources', async () => {
    const response = await oneinch.liquiditySources();

    expect(response.protocols.length).to.gt(0);
  });
});
