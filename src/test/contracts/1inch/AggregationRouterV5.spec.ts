import {expect} from 'chai';
import {ethers, web3} from 'hardhat';

import oneinch from 'sdk/1inch/1inch';
import {SwapResponse} from 'sdk/1inch/types';
import {decimals} from '../../../utils/numbers';
import {deployAggregationRouterV5Fixture} from './fixtures';

describe('contracts/1inch/AggregationRouterV5', () => {
  it('owner', async () => {
    const {router} = await deployAggregationRouterV5Fixture();
    const owner = await router.owner();
    expect(owner).to.eq('0x5E89f8d81C74E311458277EA1Be3d3247c7cd7D1');
  });

  it('swap', async () => {
    const {deployer, user, userPrivateKey} = await deployAggregationRouterV5Fixture();

    const ETH = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
    const DAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
    const amount = decimals(); // only available number when we testing with prod 1inch API.

    const ethBalance = await web3.eth.getBalance(user.address);
    expect(BigInt(ethBalance)).to.gt(0);

    // ****************
    // Approve step
    //  - oneinch
    const approveResponse = await oneinch.approve.transaction({
      tokenAddress: ETH,
      amount: amount.toString(),
    });
    const approveGasLimit = await web3.eth.estimateGas(approveResponse);

    //  - transaction
    const signedApproveTransaction = await web3.eth.accounts.signTransaction(
      {
        ...approveResponse,
        from: user.address,
        gas: approveGasLimit,
      },
      userPrivateKey
    );
    const approveTransactionResult = await web3.eth.sendSignedTransaction(signedApproveTransaction.rawTransaction!!);

    expect(approveGasLimit).to.gt(0);
    expect(signedApproveTransaction.rawTransaction).to.not.null;
    expect(approveTransactionResult.status).to.eq(true);

    // ****************
    // Swap step
    try {
      const response: SwapResponse = await oneinch.swap({
        fromTokenAddress: ETH,
        toTokenAddress: DAI,
        amount: amount.toString(),
        fromAddress: deployer.address,
        slippage: 1,
        disableEstimate: false,
        allowPartialFill: false,
      });
      const gasLimit = await web3.eth.estimateGas(response.tx);
      const swapSignedTansaction = await web3.eth.accounts.signTransaction(response.tx, userPrivateKey);
      const transaction = await web3.eth.sendSignedTransaction(swapSignedTansaction.rawTransaction!!);
      expect(gasLimit).to.gt(0);
      expect(transaction.status).to.eq(true);
    } catch (e) {
      expect(e).to.eq(`Not enough ETH balance. Amount: ${amount}. Balance: 0`);
    }
  });
});
