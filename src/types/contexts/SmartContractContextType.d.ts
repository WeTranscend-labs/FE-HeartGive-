export type SmartContractContextType = {
  create: ({
    name: string,
    totalExpected: bigint,
    startTime: bigint,
    endTime: bigint,
    walletAddress: string,
    creator: string,
    lucid: Lucid,
  }) => Promise<void>;

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
