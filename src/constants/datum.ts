import { Data } from 'lucid-cardano';

const FundDatumSchema = Data.Object({
  fundOwner: Data.Bytes(),
});

const FundManagementDatumSchema = Data.Object({
  fundAddress: Data.Bytes(),
});

export type FundDatum = Data.Static<typeof FundDatumSchema>;
export const FundDatum = FundDatumSchema as unknown as FundDatum;

export type FundManagementDatum = Data.Static<typeof FundManagementDatumSchema>;
export const FundManagementDatum =
  FundManagementDatumSchema as unknown as FundManagementDatum;
