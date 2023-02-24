import {loadFixture} from '@nomicfoundation/hardhat-network-helpers';
import {expect} from 'chai';
import {web3} from 'hardhat';
import {AbiItem} from 'web3-utils';

import oneinch from 'sdk/1inch/1inch';
import {SwapRequest, SwapResponse} from 'sdk/1inch/types';
import {decimals} from '../../../utils/numbers';
import {connectERC20, deployAggregationRouterV5Fixture, deploySwapProxyFixture} from './fixtures';
import {abi as swapProxyAbi} from '../../../artifacts/contracts/oneinch/SwapProxy.sol/SwapProxy.json';
import {abi as routerAbi} from '../../../artifacts/contracts/oneinch/AggregationRouterV5.sol/AggregationRouterV5.json';

const publicKey = process.env.PUBLIC_KEY || '0x70997970c51812dc3a010c7d01b50e0d17dc79c8';
const privateKey = process.env.PRIVATE_KEY || '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d';

describe('contracts/1inch/SwapProxy', () => {
  const ETH = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
  const OneInch = '0x111111111117dC0aa78b770fA6A738034120C302';
  const DAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F';

  it('owner', async () => {
    const {router} = await loadFixture(deployAggregationRouterV5Fixture);
    const {proxy} = await deploySwapProxyFixture(router, publicKey);

    const owner = await proxy.owner();

    expect(owner).to.eq(publicKey);
  });

  it('swap', async () => {
    const {user, userPrivateKey} = await loadFixture(deployAggregationRouterV5Fixture);

    const amount = decimals() / 40n; // only available number when we testing with prod 1inch API.

    const ethBalance = await web3.eth.getBalance(publicKey);
    if (BigInt(ethBalance) < decimals() * 10n) {
      // ****************
      // Recharge Ether
      //  - send 10 ETH
      const nonce = await web3.eth.getTransactionCount(user.address, 'latest');
      const sendEthereumTx = {
        to: publicKey,
        value: (decimals() * 10n).toString(),
        nonce: nonce,
      };
      const sendEthereumTxGas = await web3.eth.estimateGas(sendEthereumTx);
      const signed = await web3.eth.accounts.signTransaction(
        {...sendEthereumTx, gas: sendEthereumTxGas},
        userPrivateKey
      );
      const sendEthereumTxResult = await web3.eth.sendSignedTransaction(signed.rawTransaction!!);
    }

    // ****************
    // Approve step
    //  - oneinch
    const approveResponse = await oneinch.approve.transaction({
      tokenAddress: ETH,
      amount: amount.toString(),
    });
    const approveGasLimit = await web3.eth.estimateGas(approveResponse);
    const signedApproveTransaction = await web3.eth.accounts.signTransaction(
      {
        ...approveResponse,
        from: publicKey,
        gas: approveGasLimit,
      },
      privateKey
    );
    const approveTransactionResult = await web3.eth.sendSignedTransaction(signedApproveTransaction.rawTransaction!!);

    expect(approveGasLimit).to.gt(0);
    expect(signedApproveTransaction.rawTransaction).to.not.null;
    expect(approveTransactionResult.status).to.eq(true);

    // ****************
    // Swap step
    const response: SwapResponse = await oneinch.swap({
      fromTokenAddress: ETH,
      toTokenAddress: OneInch,
      amount: amount.toString(),
      fromAddress: publicKey,
      destReceiver: publicKey,
      slippage: 1,
    });

    const swapSignedTansaction = await web3.eth.accounts.signTransaction(response.tx, privateKey);
    const transaction = await web3.eth.sendSignedTransaction(swapSignedTansaction.rawTransaction!!);
    expect(transaction.status).to.eq(true);

    console.log('gasPrice', transaction.gasUsed);
  });

  it('delegate swap', async () => {
    const {user, router, userPrivateKey} = await loadFixture(deployAggregationRouterV5Fixture);
    const {proxy} = await deploySwapProxyFixture(router, user.address);
    const {token: oneInchToken} = await connectERC20(OneInch, publicKey);
    const {token: daiToken} = await connectERC20(DAI, publicKey);

    const amount = decimals() / 1000000000n;

    // ****************
    // Approve step
    const approveResult = await oneInchToken.approve(proxy.address, amount * 2n);
    console.log('gasPrice approve', approveResult.gasPrice)

    // ****************
    // Swap step
    const req: SwapRequest = {
      fromTokenAddress: OneInch,
      toTokenAddress: DAI,
      amount: (amount / 2n).toString(),
      fromAddress: publicKey,
      destReceiver: publicKey,
      slippage: 1,
    };
    const response: SwapResponse = await oneinch.swap(req);

    const swapGas = await web3.eth.estimateGas(response.tx);

    // await proxy.swap(OneInch, DAI, publicKey, amount, response.tx.data, {
    //   gasLimit: (BigInt(swapGas) * 10n) / 5n,
    // });
    const swapAbi = swapProxyAbi.find((abi) => abi.name == 'swap') as AbiItem;
    const swapData = web3.eth.abi.encodeFunctionCall(swapAbi, [
      req.fromTokenAddress,
      req.toTokenAddress,
      req.fromAddress,
      req.amount,
      response.tx.data,
    ]);
    const swapTransaction1 = await web3.eth.accounts.signTransaction(
      {
        data: swapData,
        gas: ((BigInt(swapGas) * 10n) / 5n).toString(),
        from: user.address,
        to: proxy.address,
      },
      userPrivateKey
    );
    const result1 = await web3.eth.sendSignedTransaction(swapTransaction1.rawTransaction!!);
    console.log('gasPrice1', result1.gasUsed);

    const balance1 = await oneInchToken.balanceOf(publicKey);
    expect(balance1.gt(req.amount)).to.eq(true);
    console.log('balance1', balance1);

    const swapTransaction2 = await web3.eth.accounts.signTransaction(response.tx, privateKey);
    const result2 = await web3.eth.sendSignedTransaction(swapTransaction2.rawTransaction!!);
    console.log('gasPrice2', result2.gasUsed);

    const balance2 = await oneInchToken.balanceOf(publicKey);
    console.log('balance2', balance2);
    expect(balance2.gt(req.amount)).to.eq(true);

    const convertedBalance = await daiToken.balanceOf(publicKey);
    const convertedBalanceOfUser = await daiToken.balanceOf(user.address);
    const convertedBalanceOfProxy = await daiToken.balanceOf(proxy.address);

    expect(convertedBalance.gt(0)).to.eq(true);
    expect(convertedBalanceOfUser.eq(0)).to.eq(true);
    expect(convertedBalanceOfProxy.eq(0)).to.eq(true);
  });
});
