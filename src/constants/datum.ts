import { Data } from 'lucid-cardano';

const FundDatumSchema = Data.Object({
  policyId: Data.Bytes(),
  assetName: Data.Bytes(),
  totalExpected: Data.Integer(),
  startTime: Data.Integer(),
  endTime: Data.Integer(),
  walletAddress: Data.Bytes(),
  creator: Data.Bytes(),
});

export type FundDatum = Data.Static<typeof FundDatumSchema>;
export const FundDatum = FundDatumSchema as unknown as FundDatum;
