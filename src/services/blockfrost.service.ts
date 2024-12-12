import { rootMetdata, utxo } from '@/types/blockfrost';
import { Fund } from '@/types/fund';
import readValidators, { Validators } from '@/utils/readValidators';
import axios from 'axios';
import { decode } from 'cbor-x';
import lucidService from './lucid.service';

// Tạo instance axios với baseURL
const blockfrostApi = axios.create({
  baseURL: 'https://cardano-preview.blockfrost.io/api/v0',
  headers: {
    'Content-Type': 'application/json',
    project_id: import.meta.env.VITE_BLOCKFROST_PROJECT_API_KEY_PREVIEW,
  },
});

export const getFunds = async ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) => {
  try {
    const validators: Validators = readValidators();
    const fundManagementValidatorScript = validators.fundManagement;

    const utxos: utxo[] = await blockfrostApi
      .get(
        `/addresses/${(
          await lucidService
        ).utils.validatorToAddress(fundManagementValidatorScript)}/utxos`,
        {
          params: {
            page: page,
            count: pageSize,
          },
        }
      )
      .then((response) => response.data);

    const funds: Fund[] = await Promise.all(
      utxos.map(async (utxo) => {
        const rootMetadata: rootMetdata[] = await blockfrostApi
          .get(`/txs/${utxo.tx_hash}/metadata`)
          .then((response) => response.data);

        // Trích xuất JSON string từ metadata
        const encodedMetadataJson = rootMetadata[0].json_metadata[2].data;

        // Giải mã metadata
        const metadataJsonString = decodeMetadata(encodedMetadataJson);

        console.log(metadataJsonString);

        // Parse JSON string thành object Fund
        const metadata: Fund = JSON.parse(metadataJsonString);

        const totalAda = await getTotalAda({
          address: metadata.walletAddress,
        });

        metadata.currentAmount = totalAda.totalAda;
        metadata.targetAmount = BigInt(metadata.targetAmount);

        return metadata;
      })
    );

    console.log(funds);

    return funds;
  } catch (error) {
    console.error('Error fetching funds:', error);
    return [];
  }
};

const getTotalAda = async ({ address }: { address: string }) => {
  const utxos: utxo[] = await blockfrostApi
    .get(`/addresses/${address}/utxos`)
    .then((response) => response.data);

  const totalAda = utxos.reduce((total, utxo) => {
    // Tìm amount có unit là 'lovelace'
    const adaAmount = utxo.amount.find((asset) => asset.unit === 'lovelace');

    return total + (adaAmount ? BigInt(adaAmount.quantity) : 0n);
  }, 0n);

  const totalAdaInAda = BigInt(totalAda) / 1_000_000n;

  return {
    totalLovelace: totalAda,
    totalAda: totalAdaInAda,
  };
};

const decodeMetadata = (
  encodedMetadataJson: Record<string, number>
): string => {
  // Loại bỏ các ký tự không mong muốn và trim
  const cleanedString = Object.values(encodedMetadataJson)
    .map((num) => String.fromCharCode(num))
    .join('')
    .trim()
    .replace(/^[^\{]*/, '') // Loại bỏ các ký tự trước dấu {
    .replace(/[^\}]*$/, ''); // Loại bỏ các ký tự sau dấu }

  return cleanedString;
};
