import {time, loadFixture} from '@nomicfoundation/hardhat-network-helpers';
import {expect} from 'chai';
import {ethers, web3} from 'hardhat';
import {GDefiToken__factory} from 'typechain/factories/contracts/gdefi/token/Gdefi.sol';
import {decimals} from 'utils/numbers';

describe('contracts/gdefi/GDefi test', () => {
  // Contracts are deployed using the first signer/account by default
  const hardhatPublicAddress1 = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
  const hardhatPublicAddress2 = '0x90F79bf6EB2c4f870365E785982E1f101E93b906';

  const deployGdefiFixture = async () => {
    // (CHECK) check my hardhat predefined address
    const deployer = await ethers.getImpersonatedSigner(hardhatPublicAddress1);
    const user = await ethers.getImpersonatedSigner(hardhatPublicAddress2);

    const gDefiFactory = (await ethers.getContractFactory('GDefiToken')) as GDefiToken__factory;
    // generate contract to new address
    const gDefi = await gDefiFactory.deploy();

    console.log('GDefi Token address is ', gDefi.address);

    return {deployer, user, gDefi};
  };

  it('Token information', async () => {
    const {gDefi} = await loadFixture(deployGdefiFixture);

    const address = gDefi.address;
    expect(address.length).to.eq(42);

    const symbol = await gDefi.symbol();
    expect(symbol).to.eq('GDT');

    const name = await gDefi.name();
    expect(name).to.eq('GDefi Token');

    const totalSupply = await gDefi.totalSupply();
    expect(totalSupply).to.eq(100000n * decimals());
  });

  it('Token transfer', async () => {
    const {deployer, user, gDefi} = await loadFixture(deployGdefiFixture);

    const prevSenderBalance = await gDefi.balanceOf(deployer.address);
    const prevReceiverBalance = await gDefi.balanceOf(user.address);

    const transfer = await gDefi.transfer(user.address, 1n * decimals());
    expect(transfer.from).to.eq(hardhatPublicAddress1);
    expect(transfer.to).to.eq(gDefi.address);

    const nextSenderBalance = await gDefi.balanceOf(deployer.address);
    const nextReceiverBalance = await gDefi.balanceOf(user.address);

    expect(nextSenderBalance).to.eq(prevSenderBalance.sub(1n * decimals()));
    expect(nextReceiverBalance).to.eq(prevReceiverBalance.add(1n * decimals()));
  });
});
