import {expect} from 'chai';
import {ethers} from 'hardhat';
import {StakingV7__factory} from 'typechain/factories/contracts/wemix/staking/StakingV7__factory';
import {decimals} from 'utils/numbers';

const publicKey = process.env.PUBLIC_KEY || '0x70997970c51812dc3a010c7d01b50e0d17dc79c8';

/**
 * This test is only working on the WEMIX mainnet.
 * Using `$ npm run fork:mainnet-wemix`.
 */
describe('StakingV7 reward', () => {
  const hardhatPublicAddress1 = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';

  const deployStakingV7 = async () => {
    const factory = (await ethers.getContractFactory('StakingV7')) as StakingV7__factory;
    const signer = await ethers.getImpersonatedSigner(hardhatPublicAddress1);
    const stakingV7 = factory.connect(signer).attach('0x6F3f44B0Cf7C751f2a44Faf6bFdd08e499Eb0973');

    return {stakingV7};
  };

  it('initialize', async () => {
    const {stakingV7} = await deployStakingV7();
    const routerAddress = await stakingV7.router();
    const poolLength = await stakingV7.poolLength();

    expect(routerAddress).to.eq('0x80a5A916FB355A8758f0a3e47891dc288DAC2665');
    expect(poolLength.toNumber()).to.eq(2);
  });

  it('check pool id', async () => {
    const {stakingV7} = await deployStakingV7();
    const pool0 = await stakingV7.getPoolInfo(0);
    const pendingReward = await stakingV7.pendingReward(0, publicKey);
    const userInfo = await stakingV7.getUserInfo(0, publicKey);

    // only show over 0.000001
    const convertedReward = Number((pendingReward.toBigInt() * 100000n) / decimals()) / 100000;

    console.log(pool0);
    console.log(pendingReward, convertedReward);
    console.log(userInfo);
  });
});
