import {impersonateAccount} from '@nomicfoundation/hardhat-network-helpers';
import {ethers} from 'hardhat';

import {AggregationRouterV5, SafeERC20} from 'typechain/contracts/oneinch/AggregationRouterV5.sol';
import {
  AggregationRouterV5__factory,
  SafeERC20__factory,
  UniERC20__factory,
} from 'typechain/factories/contracts/oneinch/AggregationRouterV5.sol';
import {ERC20, ERC20__factory, SwapProxy__factory} from '../../../typechain';

export const deployAggregationRouterV5Fixture = async () => {
  // Contracts are deployed using the first signer/account by default
  const hardhatPublicAddress1 = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
  const hardhatPublicAddress2 = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';
  const hardhatPrivateAddress2 = '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d';
  const aggregationRouterV5Address = '0x1111111254EEB25477B68fb85Ed929f73A960582';

  await impersonateAccount(hardhatPublicAddress1);
  await impersonateAccount(hardhatPublicAddress2);

  const deployer = await ethers.getSigner(hardhatPublicAddress1);
  const user = await ethers.getSigner(hardhatPublicAddress2);

  const Router: AggregationRouterV5__factory = await ethers.getContractFactory('AggregationRouterV5');
  const router: AggregationRouterV5 = Router.connect(deployer).attach(aggregationRouterV5Address);

  return {deployer, user, router, userPrivateKey: hardhatPrivateAddress2};
};

export const deploySwapProxyFixture = async (router: AggregationRouterV5, publicKey: string) => {
  const Proxy: SwapProxy__factory = await ethers.getContractFactory('SwapProxy');
  const owner = await ethers.getImpersonatedSigner(publicKey);
  const proxy = await Proxy.connect(owner).deploy(router.address);

  return {proxy};
};

export const connectERC20 = async (address: string, publicKey: string) => {
  const Token: ERC20__factory = await ethers.getContractFactory('ERC20');
  const owner = await ethers.getImpersonatedSigner(publicKey);
  const token: ERC20 = Token.connect(owner).attach(address);

  return {token};
};
