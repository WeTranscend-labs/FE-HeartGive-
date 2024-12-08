export type create = ({
  policyId: string,
  assetName: string,
  totalExpected: bigint,
  startTime: bigint,
  endTime: bigint,
  walletAddress: string,
  creator: string,
  lucid: Lucid,
}) => Promise<void>;

export type SmartContractContextType = {
  create: create;

  // cancel: ({
  //   fundId: string,
  //   creator: string,
  //   lucid: Lucid,
  // }) => Promise<boolean>;

  // contribute: ({
  //   fundAddress: string,
  //   amount: bigint,
  //   contributor: string,
  //   lucid: Lucid,
  // }) => Promise<boolean>;
};

export type { create, SmartContractContextType };
