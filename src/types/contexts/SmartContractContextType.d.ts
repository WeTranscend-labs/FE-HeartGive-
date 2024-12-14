import { FundFormData } from '@/components/FundForm';

export type createFund = (params: {
  fundOwner: string;
  fundMetadata: any;
}) => Promise<void>;

export type cancelFund = (params: {
  txHash: string;
  fundOwner: string;
}) => Promise<string>;

export type contribute = (params: {
  fundAddress: string;
  contributionAmount: bigint;
  fundOwner: string;
}) => Promise<string>;

export type withdrawFunds = (params: {
  fundAddress: string;
  withdrawAmount: bigint;
  fundOwner: string;
  walletAddress: string;
  randomHashKey: string;
}) => Promise<string>;

export interface SmartContractContextType {
  createFund: createFund;
  cancelFund: cancelFund;
  contribute: contribute;
  withdrawFunds: withdrawFunds;
}
