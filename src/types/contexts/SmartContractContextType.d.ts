export type createFund = ({
  fundOwner,
}: {
  fundOwner: string;
}) => Promise<void>;

export type SmartContractContextType = {
  createFund: createFund;
};

export type { create, SmartContractContextType };
