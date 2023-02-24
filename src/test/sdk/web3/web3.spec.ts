import {expect} from 'chai';
import {TransactionConfig} from 'web3-core';
import {AbiItem} from 'web3-utils';
import web3 from 'sdk/web3';
import {eSub} from '../../shared/test-utils';
import oneInchFromEtherscan from './oneInch.abi.json';

describe('sdk/web3', () => {
  it('getBlockNumber', async () => {
    const blockNumber = await web3.eth.getBlockNumber();

    const expectedBlockNumber = 16331359;
    expect(blockNumber).to.gte(expectedBlockNumber);
  });

  it('create account', async () => {
    const account = web3.eth.accounts.create();

    const expectedLength = '0x7d7ff79e5db206c8c52E54cEB230C0f45aE58128'.length;
    const exportedPkeyLength = '0x97a53f02f381f7f9c2a4318a5576339da8254022c3f73d8cc9e80421b4b277ab'.length;
    expect(account.address.length).to.eq(expectedLength);
    expect(account.privateKey.length).to.eq(exportedPkeyLength);

    const config: TransactionConfig = {
      gas: 53000,
    };
    const transaction = await account.signTransaction(config);
    expect(transaction.transactionHash).to.not.be.empty;
  });

  it('get contract', async () => {
    const oneInchAddress = '0x1111111254EEB25477B68fb85Ed929f73A960582';
    const code = await web3.eth.getCode(oneInchAddress);
    expect(code).to.not.be.empty;

    const jsonInterface: AbiItem[] = [];
    oneInchFromEtherscan.forEach((v) => {
      jsonInterface.push(v as AbiItem);
    });

    const oneInchContract = new web3.eth.Contract(jsonInterface, oneInchAddress);

    const ownerMethod = await oneInchContract.methods.owner();
    const ownerResult = await ownerMethod.call(eSub);

    expect(ownerResult).to.eq('0x5E89f8d81C74E311458277EA1Be3d3247c7cd7D1');
  });
});
