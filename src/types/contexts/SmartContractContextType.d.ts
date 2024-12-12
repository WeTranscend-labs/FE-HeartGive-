import { FundFormData } from '@/components/FundForm';

export type createFund = (params: {
  fundOwner: string;
  fundMetadata: any;
}) => Promise<void>;

export type cancelFund = (params: {
  txHash: string;
  fundOwner: string;
}) => Promise<string>;

export interface SmartContractContextType {
  createFund: createFund;
  cancelFund: cancelFund;
}
