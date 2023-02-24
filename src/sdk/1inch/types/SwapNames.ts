import protocols from '../json/protocols.json';

const ExtractedSwapNames = `'${protocols.map((v) => v.id).join("' | '")}'`;
const AllSwapNames = `['${protocols.map((v) => v.id).join("', '")}']`;

// > npx ts-node src/sdk/1inch/types/SwapNames.ts
// console.log('Extract swap names type definated string')
// console.log(ExtractedSwapNames)
// console.log('Extract swap names list')
// console.log(AllSwapNames)

export type SwapNames =
  | 'UNISWAP_V1'
  | 'UNISWAP_V2'
  | 'SUSHI'
  | 'MOONISWAP'
  | 'BALANCER'
  | 'COMPOUND'
  | 'CURVE'
  | 'CURVE_V2_SPELL_2_ASSET'
  | 'CURVE_V2_SGT_2_ASSET'
  | 'CURVE_V2_THRESHOLDNETWORK_2_ASSET'
  | 'CHAI'
  | 'OASIS'
  | 'KYBER'
  | 'AAVE'
  | 'IEARN'
  | 'BANCOR'
  | 'PMM1'
  | 'SWERVE'
  | 'BLACKHOLESWAP'
  | 'DODO'
  | 'DODO_V2'
  | 'VALUELIQUID'
  | 'SHELL'
  | 'DEFISWAP'
  | 'SAKESWAP'
  | 'LUASWAP'
  | 'MINISWAP'
  | 'MSTABLE'
  | 'PMM2'
  | 'SYNTHETIX'
  | 'AAVE_V2'
  | 'ST_ETH'
  | 'ONE_INCH_LP'
  | 'ONE_INCH_LP_1_1'
  | 'LINKSWAP'
  | 'S_FINANCE'
  | 'PSM'
  | 'POWERINDEX'
  | 'PMM3'
  | 'XSIGMA'
  | 'SMOOTHY_FINANCE'
  | 'SADDLE'
  | 'KYBER_DMM'
  | 'BALANCER_V2'
  | 'UNISWAP_V3'
  | 'SETH_WRAPPER'
  | 'CURVE_V2'
  | 'CURVE_V2_EURS_2_ASSET'
  | 'CURVE_V2_EURT_2_ASSET'
  | 'CURVE_V2_XAUT_2_ASSET'
  | 'CURVE_V2_ETH_CRV'
  | 'CURVE_V2_ETH_CVX'
  | 'CONVERGENCE_X'
  | 'ONE_INCH_LIMIT_ORDER'
  | 'ONE_INCH_LIMIT_ORDER_V2'
  | 'ONE_INCH_LIMIT_ORDER_V3'
  | 'DFX_FINANCE'
  | 'FIXED_FEE_SWAP'
  | 'DXSWAP'
  | 'SHIBASWAP'
  | 'UNIFI'
  | 'PSM_PAX'
  | 'WSTETH'
  | 'DEFI_PLAZA'
  | 'FIXED_FEE_SWAP_V3'
  | 'SYNTHETIX_WRAPPER'
  | 'SYNAPSE'
  | 'CURVE_V2_YFI_2_ASSET'
  | 'CURVE_V2_ETH_PAL'
  | 'POOLTOGETHER'
  | 'ETH_BANCOR_V3'
  | 'ELASTICSWAP'
  | 'BALANCER_V2_WRAPPER'
  | 'FRAXSWAP'
  | 'RADIOSHACK'
  | 'KYBERSWAP_ELASTIC'
  | 'CURVE_V2_TWO_CRYPTO'
  | 'STABLE_PLAZA'
  | 'ZEROX_LIMIT_ORDER'
  | 'CURVE_3CRV'
  | 'KYBER_DMM_STATIC'
  | 'ANGLE'
  | 'ROCKET_POOL'
  | 'ETHEREUM_ELK'
  | 'ETHEREUM_PANCAKESWAP_V2'
  | 'SYNTHETIX_ATOMIC_SIP288'
  | 'PSM_GUSD'
  | 'INTEGRAL';

export const allSwapNames: Array<SwapNames> = [
  'UNISWAP_V1',
  'UNISWAP_V2',
  'SUSHI',
  'MOONISWAP',
  'BALANCER',
  'COMPOUND',
  'CURVE',
  'CURVE_V2_SPELL_2_ASSET',
  'CURVE_V2_SGT_2_ASSET',
  'CURVE_V2_THRESHOLDNETWORK_2_ASSET',
  'CHAI',
  'OASIS',
  'KYBER',
  'AAVE',
  'IEARN',
  'BANCOR',
  'PMM1',
  'SWERVE',
  'BLACKHOLESWAP',
  'DODO',
  'DODO_V2',
  'VALUELIQUID',
  'SHELL',
  'DEFISWAP',
  'SAKESWAP',
  'LUASWAP',
  'MINISWAP',
  'MSTABLE',
  'PMM2',
  'SYNTHETIX',
  'AAVE_V2',
  'ST_ETH',
  'ONE_INCH_LP',
  'ONE_INCH_LP_1_1',
  'LINKSWAP',
  'S_FINANCE',
  'PSM',
  'POWERINDEX',
  'PMM3',
  'XSIGMA',
  'SMOOTHY_FINANCE',
  'SADDLE',
  'KYBER_DMM',
  'BALANCER_V2',
  'UNISWAP_V3',
  'SETH_WRAPPER',
  'CURVE_V2',
  'CURVE_V2_EURS_2_ASSET',
  'CURVE_V2_EURT_2_ASSET',
  'CURVE_V2_XAUT_2_ASSET',
  'CURVE_V2_ETH_CRV',
  'CURVE_V2_ETH_CVX',
  'CONVERGENCE_X',
  'ONE_INCH_LIMIT_ORDER',
  'ONE_INCH_LIMIT_ORDER_V2',
  'ONE_INCH_LIMIT_ORDER_V3',
  'DFX_FINANCE',
  'FIXED_FEE_SWAP',
  'DXSWAP',
  'SHIBASWAP',
  'UNIFI',
  'PSM_PAX',
  'WSTETH',
  'DEFI_PLAZA',
  'FIXED_FEE_SWAP_V3',
  'SYNTHETIX_WRAPPER',
  'SYNAPSE',
  'CURVE_V2_YFI_2_ASSET',
  'CURVE_V2_ETH_PAL',
  'POOLTOGETHER',
  'ETH_BANCOR_V3',
  'ELASTICSWAP',
  'BALANCER_V2_WRAPPER',
  'FRAXSWAP',
  'RADIOSHACK',
  'KYBERSWAP_ELASTIC',
  'CURVE_V2_TWO_CRYPTO',
  'STABLE_PLAZA',
  'ZEROX_LIMIT_ORDER',
  'CURVE_3CRV',
  'KYBER_DMM_STATIC',
  'ANGLE',
  'ROCKET_POOL',
  'ETHEREUM_ELK',
  'ETHEREUM_PANCAKESWAP_V2',
  'SYNTHETIX_ATOMIC_SIP288',
  'PSM_GUSD',
  'INTEGRAL',
];
