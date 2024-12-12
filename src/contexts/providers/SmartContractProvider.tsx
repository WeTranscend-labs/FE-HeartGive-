import { FundDatum, FundManagementDatum } from '@/constants/datum';
import { createFund } from '@/types/contexts/SmartContractContextType';
import readValidators, { Validators } from '@/utils/readValidators';
import {
  applyDoubleCborEncoding,
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
  const [fundVerifiedAddress, setFundVerifiedAddress] = useState<string>(null!);

  useEffect(() => {
    const validators = readValidators();

    setFundManagementAddress(
      lucid?.utils.validatorToAddress(validators.fundManagement)
    );
    setFundVerifiedAddress(
      lucid?.utils.validatorToAddress(validators.fundVerified)
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

    fundMetadata = {
      ...fundMetadata,
      fundAddress: fundAddress,
    };

    console.log(fundMetadata);

    const tx = await lucid
      .newTx()
      // .payToContract(
      //   fundAddress,
      //   { inline: fundDatum },
      //   { lovelace: 1_000_000n }
      // )
      .payToContract(
        fundVerifiedAddress,
        { inline: fundManagementDatum },
        { lovelace: 5_000_000n }
      )
      .attachMetadata(1, {
        2: {
          data: encode(JSON.stringify(fundMetadata)),
        },
      })
      .complete();

    const txSigned = await tx.sign().complete();
    const txHash = await txSigned.submit();

    const success = await lucid.awaitTx(txHash);

    if (success) {
      console.log(txHash);
    }

    // return txHash;
  };

  const cancelFund = async ({
    txHash,
    fundOwner,
  }: {
    txHash: string;
    fundOwner: string;
  }) => {
    try {
      const validators: Validators = readValidators();
      const fundManagementValidator = validators.fundManagement;

      // Tìm UTXOs tại địa chỉ quản lý quỹ
      const utxos = await lucid.utxosAt(fundManagementAddress);

      // Tìm UTXO cụ thể dựa trên transaction hash
      const targetUtxo = utxos.find((utxo) => utxo.txHash === txHash);

      if (!targetUtxo) {
        throw new Error('UTXO not found for the given transaction hash');
      }

      // Xây dựng transaction để cancel fund
      const tx = await lucid
        .newTx()
        .collectFrom([targetUtxo], Data.void())
        .attachSpendingValidator(fundManagementValidator)
        // .addSigner(fundOwner)
        .complete();

      // Ký và submit transaction
      const signedTx = await tx.sign().complete();
      const cancelTxHash = await signedTx.submit();

      // Chờ xác nhận transaction
      const success = await lucid.awaitTx(cancelTxHash);

      if (success) {
        console.log('Fund canceled successfully. Tx Hash:', cancelTxHash);
        return cancelTxHash;
      } else {
        throw new Error('Transaction failed to confirm');
      }
    } catch (error) {
      console.error('Error canceling fund:', error);
      throw error;
    }
  };

  const contribute = async ({
    fundAddress,
    contributionAmount,
    fundOwner,
  }: {
    fundAddress: string;
    contributionAmount: bigint;
    fundOwner: string;
  }) => {
    try {
      const validators: Validators = readValidators();
      const fundValidator = validators.fund;
      // Tạo datum cho contribution
      const contributionDatum = Data.to(
        {
          fundOwner: fundOwner,
        },
        FundDatum
      );

      // Xây dựng transaction
      const tx = await lucid
        .newTx()
        .payToContract(
          fundAddress,
          {
            inline: contributionDatum,
          },
          {
            lovelace: contributionAmount,
          }
        )
        .complete();

      // Ký và submit transaction
      const signedTx = await tx.sign().complete();
      const contributeTxHash = await signedTx.submit();

      // Chờ xác nhận transaction
      const success = await lucid.awaitTx(contributeTxHash);

      if (success) {
        console.log('Contribution successful. Tx Hash:', contributeTxHash);
        return contributeTxHash;
      } else {
        throw new Error('Transaction failed to confirm');
      }
    } catch (error) {
      console.error('Error contributing to fund:', error);
      throw error;
    }
  };

  return (
    <SmartContractContext.Provider
      value={{ createFund, cancelFund, contribute }}
    >
      {children}
    </SmartContractContext.Provider>
  );
};

export default SmartContractProvider;
