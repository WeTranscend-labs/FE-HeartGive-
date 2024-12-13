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

export type verifyFund = (params: {
  txHash: string;
  fundOwner: string;
  fundMetadata: any;
}) => Promise<string>;

export interface SmartContractContextType {
  createFund: createFund;
  cancelFund: cancelFund;
  contribute: contribute;
  verifyFund: verifyFund;
}
