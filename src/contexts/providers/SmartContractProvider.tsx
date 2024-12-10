import { FundDatum, FundManagementDatum } from '@/constants/datum';
import { createFund } from '@/types/contexts/SmartContractContextType';
import readValidators, { Validators } from '@/utils/readValidators';
import { Data, Lucid, Script, SpendingValidator } from 'lucid-cardano';
import { ReactNode, useContext, useEffect, useState } from 'react';
import SmartContractContext from '../components/SmartContractContext';
import { applyParams } from '@/utils/applyParams';
import { LucidContextType } from '@/types/contexts/LucidContextType';
import LucidContext from '../components/LucidContext';

type Props = {
  children: ReactNode;
  lucid: Lucid; // Lucid được truyền từ ngoài
};

const SmartContractProvider = function ({ children }: Props) {
  const { lucid } = useContext<LucidContextType>(LucidContext);
  const [fundManagementAddress, setFundManagementAddress] = useState<string>(
    null!
  );

  useEffect(() => {
    const validators = readValidators();
    setFundManagementAddress(
      lucid.utils.validatorToAddress(validators.fundManagement)
    );
  }, []);

  const createFund: createFund = async ({ fundOwner }) => {
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
        fundAddress: fundAddress,
      },
      FundManagementDatum
    );

    const tx = await lucid
      .newTx()
      .payToContract(
        fundAddress,
        { inline: fundDatum },
        { lovalace: 1_000_000n }
      )
      .payToContract(
        fundManagementAddress,
        { inline: fundManagementDatum },
        { lovalace: 5_000_000n }
      )
      .complete();

    const txSigned = await tx.sign().complete();
    const txHash = await txSigned.submit();

    const success = await lucid.awaitTx(txHash);

    if (success) {
      console.log(txHash);
    }
  };

  return (
    <SmartContractContext.Provider value={{ createFund }}>
      {children}
    </SmartContractContext.Provider>
  );
};

export default SmartContractProvider;
