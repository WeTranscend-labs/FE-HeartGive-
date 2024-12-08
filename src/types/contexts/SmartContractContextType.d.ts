export type SmartContractContextType = {
  create: ({
    name: string,
    totalExpected: bigint,
    startTime: number,
    endTime: number,
    walletAddress: string,
    creator: string,
  }) => Promise<boolean>;

  cancel: ({ fundId: string, creator: string }) => Promise<boolean>;

  contribute: ({
    fundAddress: string,
    amount: bigint,
    contributor: string,
  }) => Promise<boolean>;
};
