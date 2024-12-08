import React, { ReactNode, useState } from 'react';
import { Lucid, Data, Script } from 'lucid-cardano';
import SmartContractContext from '../components/SmartContractContext';
import { SmartContractContextType } from '@/types/contexts/SmartContractContextType';
import readValidators from '@/utils/readValidators';
import { FundDatum } from '@/constants/datum';

type Props = {
  children: ReactNode;
  lucid: Lucid; // Lucid được truyền từ ngoài
};

const SmartContractProvider = function ({ children, lucid }: Props) {
  // Hàm tạo quỹ từ thiện
  const create = async ({
    policyId,
    assetName,
    totalExpected,
    startTime,
    endTime,
    walletAddress,
    creator,
    lucid,
  }: {
    policyId: string;
    assetName: string;
    totalExpected: bigint;
    startTime: bigint;
    endTime: bigint;
    walletAddress: string;
    creator: string;
    lucid: Lucid;
  }): Promise<void> => {
    const validator: Script = readValidators();
    const contractAddress: string = lucid.utils.validatorToAddress(validator);

    const creatorPublicKey: string = lucid.utils.getAddressDetails(
      await lucid.wallet.address()
    ).paymentCredential?.hash as string;

    const datum = Data.to(
      {
        policyId: policyId,
        assetName: assetName,
        totalExpected: totalExpected,
        startTime: startTime,
        endTime: endTime,
        walletAddress: walletAddress,
        creator: creator,
      },
      FundDatum
    );

    const tx = await lucid
      .newTx()
      .payToContract(
        contractAddress,
        { inline: datum },
        {
          lovelace: 1000000n,
        }
      )
      .complete();

    const signedTx = await tx.sign().complete();

    const txHash = await signedTx.submit();

    console.log(txHash);
  };

  return (
    <SmartContractContext.Provider value={}>
      {children}
    </SmartContractContext.Provider>
  );
};

export default SmartContractProvider;
