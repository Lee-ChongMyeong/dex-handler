import {SwapNames} from './SwapNames';

export type Swap = {
  name: SwapNames;
  part: number;
  fromTokenAddress: string;
  toTokenAddress: string;
};
