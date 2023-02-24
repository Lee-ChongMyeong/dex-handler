import Web3 from 'web3';

export const CosmosConnector = (testnet?: boolean): Web3 => {
  const provider = testnet ? 'ws://10.0.34.173:8552' : '';
  const web3Provider = new Web3.providers.WebsocketProvider(provider);
  const web3 = new Web3(web3Provider);
  return web3;
};
