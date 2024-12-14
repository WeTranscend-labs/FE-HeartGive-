import { FundDatum, FundManagementDatum } from '@/constants/datum';
import { FundRedeemer } from '@/constants/redeemer';
import { LucidContextType } from '@/types/contexts/LucidContextType';
import { createFund } from '@/types/contexts/SmartContractContextType';
import { WalletContextType } from '@/types/contexts/WalletContextType';
import { applyParams } from '@/utils/applyParams';
import readValidators, { Validators } from '@/utils/readValidators';
import { encode } from 'cbor-x';
import { Data, fromText } from 'lucid-cardano';
import { ReactNode, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import LucidContext from '../components/LucidContext';
import SmartContractContext from '../components/SmartContractContext';
import WalletContext from '../components/WalletContext';

type Props = {
  children: ReactNode;
};

const SmartContractProvider = function ({ children }: Props) {
  const { lucid } = useContext<LucidContextType>(LucidContext);
  const [fundManagementAddress, setFundManagementAddress] = useState<string>(
    null!
  );
  const { wallet } = useContext<WalletContextType>(WalletContext);
  // const [fundVerifiedAddress, setFundVerifiedAddress] = useState<string>(null!);

  useEffect(() => {
    const validators = readValidators();

    setFundManagementAddress(
      lucid?.utils.validatorToAddress(validators.fundManagement)
    );
    // setFundVerifiedAddress(
    //   lucid?.utils.validatorToAddress(validators.fundVerified)
    // );
  }, [lucid]);

  const createFund: createFund = async ({ fundOwner, fundMetadata }) => {
    const validators: Validators = readValidators();
    const randomHashKey = uuidv4();
    const fundAppliedParams = applyParams({
      validators,
      fundOwner,
      lucid,
      randomHashKey,
    });
    const fundAddress = fundAppliedParams.fundAddress;

    const fundManagementDatum = Data.to(
      {
        fundAddress: fromText(fundAddress),
      },
      FundManagementDatum
    );

    fundMetadata = {
      ...fundMetadata,
      fundAddress: fundAddress,
      randomHashKey: randomHashKey,
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
        fundManagementAddress,
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

      console.log('targetUtxo: {}', targetUtxo);

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

  const withdrawFunds = async ({
    fundAddress,
    fundOwner,
    withdrawAmount,
    walletAddress,
    randomHashKey,
  }: {
    fundAddress: string;
    fundOwner: string;
    withdrawAmount: bigint;
    walletAddress: string;
    randomHashKey: string;
  }) => {
    try {
      const validators: Validators = readValidators();
      const temp = applyParams({ validators, fundOwner, lucid, randomHashKey });

      if (walletAddress !== wallet.address) return 'This Fund is owned by you';
      // Tìm tất cả UTXOs tại địa chỉ quỹ
      const utxos = await lucid.utxosAt(fundAddress);

      // Tính tổng số ADA hiện có tại quỹ
      const totalFundBalance = utxos.reduce(
        (total, utxo) => total + utxo.assets.lovelace,
        0n
      );

      // Kiểm tra số tiền rút có hợp lệ không
      if (withdrawAmount > totalFundBalance) {
        throw new Error('Withdrawal amount exceeds fund balance');
      }

      // Tạo redeemer chỉ với fundOwner
      const withdrawRedeemer = Data.to(
        {
          fundOwner: fundOwner,
        },
        FundRedeemer
      );

      // Xây dựng transaction
      const tx = await lucid
        .newTx()
        .collectFrom(utxos, withdrawRedeemer)
        .attachSpendingValidator(temp.fund)
        .payToAddress(walletAddress, { lovelace: totalFundBalance })
        .complete();

      // Ký và submit transaction
      const signedTx = await tx.sign().complete();
      const withdrawTxHash = await signedTx.submit();

      // Chờ xác nhận transaction
      const success = await lucid.awaitTx(withdrawTxHash);

      if (success) {
        console.log('Funds withdrawn successfully. Tx Hash:', withdrawTxHash);
        return withdrawTxHash;
      } else {
        throw new Error('Withdrawal transaction failed to confirm');
      }
    } catch (error) {
      console.error('Error withdrawing funds:', error);
      throw error;
    }
  };

  return (
    <SmartContractContext.Provider
      value={{ createFund, cancelFund, contribute, withdrawFunds }}
    >
      {children}
    </SmartContractContext.Provider>
  );
};

export default SmartContractProvider;
