import { FundDatum, FundManagementDatum } from '@/constants/datum';
import { createFund } from '@/types/contexts/SmartContractContextType';
import readValidators, { Validators } from '@/utils/readValidators';
import {
  Data,
  fromText,
  Lucid,
  Script,
  SpendingValidator,
  toText,
} from 'lucid-cardano';
import { ReactNode, useContext, useEffect, useState } from 'react';
import SmartContractContext from '../components/SmartContractContext';
import { applyParams } from '@/utils/applyParams';
import { LucidContextType } from '@/types/contexts/LucidContextType';
import LucidContext from '../components/LucidContext';
import { decode, encode } from 'cbor-x';

type Props = {
  children: ReactNode;
};

const SmartContractProvider = function ({ children }: Props) {
  const { lucid } = useContext<LucidContextType>(LucidContext);
  const [fundManagementAddress, setFundManagementAddress] = useState<string>(
    null!
  );

  useEffect(() => {
    const validators = readValidators();

    setFundManagementAddress(
      lucid?.utils.validatorToAddress(validators.fundManagement)
    );
  }, [lucid]);

  const createFund: createFund = async ({ fundOwner, fundMetadata }) => {
    const validators: Validators = readValidators();
    const fundAppliedParams = applyParams({ validators, fundOwner, lucid });
    const fundAddress = fundAppliedParams.fundAddress;

    const fundDatum = Data.to(
      {
        fundOwner: fundOwner,
      },
      FundDatum
    );

    const fundManagementDatum = Data.to(
      {
        fundAddress: fromText(fundAddress),
      },
      FundManagementDatum
    );

    console.log(toText(fromText(fundAddress)));

    console.log(fromText(fundAddress));

    const tx = await lucid
      .newTx()
      .payToContract(
        fundAddress,
        { inline: fundDatum },
        { lovelace: 1_000_000n }
      )
      .attachMetadata(1, {
        2: {
          data: encode(JSON.stringify(fundMetadata)),
        },
      })
      .payToContract(
        fundManagementAddress,
        { inline: fundManagementDatum },
        { lovelace: 5_000_000n }
      )
      .complete();

    const txSigned = await tx.sign().complete();
    const txHash = await txSigned.submit();

    const success = await lucid.awaitTx(txHash);

    if (success) {
      console.log(txHash);
    }

    // return txHash;
  };

  return (
    <SmartContractContext.Provider value={{ createFund }}>
      {children}
    </SmartContractContext.Provider>
  );
};

export default SmartContractProvider;
