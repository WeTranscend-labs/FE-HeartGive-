import { FundFormData } from '@/components/FundForm';

export type createFund = ({
  fundOwner,
  fundMetadata,
}: {
  fundOwner: string;
  fundMetadata: FundFormData;
}) => Promise<void>;

export type SmartContractContextType = {
  createFund: createFund;
};

export type { create, SmartContractContextType };
