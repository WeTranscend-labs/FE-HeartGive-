import { Data } from 'lucid-cardano';

const FundRedeemerSchema = Data.Object({
  fundOwner: Data.Bytes(),
});

export type FundRedeemer = Data.Static<typeof FundRedeemerSchema>;
export const FundRedeemer = FundRedeemerSchema as unknown as FundRedeemer;
