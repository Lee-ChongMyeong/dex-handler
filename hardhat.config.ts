import '@nomicfoundation/hardhat-toolbox';
import '@nomiclabs/hardhat-web3';
import {HardhatUserConfig} from 'hardhat/config';
import 'tsconfig-paths/register';

const alchemyapiKey = process.env.ALCHEMYAPI_KEY;

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{version: '0.8.17'}, {version: '0.6.0'}, {version: '0.8.0'}, {version: '0.8.9'}],
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${alchemyapiKey}`,
      },
      allowUnlimitedContractSize: true,
    },
  },
  paths: {
    sources: 'contracts',
    root: 'src',
    tests: 'test',
  },
  mocha: {
    timeout: 40000,
  },
  typechain: {
    outDir: 'typechain',
    target: 'ethers-v5',
  },
};

export default config;
