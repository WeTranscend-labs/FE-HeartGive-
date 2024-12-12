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
          address:
            metadata.fundAddress ??
            'addr_test1wr539xfv8psyhejd8yukjfuu9j2w9h5y9t2lukz04348aes7hvm5e',
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

export const getFundByAddress = async ({
  address,
}: {
  address: string | undefined;
}): Promise<Fund | null> => {
  try {
    const validators: Validators = readValidators();
    const fundManagementValidatorScript = validators.fundManagement;

    // Lấy UTXOs từ địa chỉ validator
    const validatorAddress = (await lucidService).utils.validatorToAddress(
      fundManagementValidatorScript
    );

    const utxos: utxo[] = await blockfrostApi
      .get(`/addresses/${validatorAddress}/utxos`)
      .then((response) => response.data);

    // Tìm UTXOs có liên quan đến địa chỉ fund cụ thể
    const fundUtxo = utxos.find(async (utxo) => {
      try {
        const rootMetadata: rootMetdata[] = await blockfrostApi
          .get(`/txs/${utxo.tx_hash}/metadata`)
          .then((response) => response.data);

        const encodedMetadataJson = rootMetadata[0].json_metadata[2].data;
        const metadataJsonString = decodeMetadata(encodedMetadataJson);
        const metadata: Fund = JSON.parse(metadataJsonString);

        return (
          metadata.fundAddress ??
          'addr_test1wr539xfv8psyhejd8yukjfuu9j2w9h5y9t2lukz04348aes7hvm5e' ===
            address
        );
      } catch (error) {
        console.error('Error processing UTXO:', error);
        return false;
      }
    });

    if (!fundUtxo) {
      console.warn(`No fund found for address: ${address}`);
      return null;
    }

    // Lấy metadata của UTXO tìm thấy
    const rootMetadata: rootMetdata[] = await blockfrostApi
      .get(`/txs/${fundUtxo.tx_hash}/metadata`)
      .then((response) => response.data);

    const encodedMetadataJson = rootMetadata[0].json_metadata[2].data;
    const metadataJsonString = decodeMetadata(encodedMetadataJson);
    const metadata: Fund = JSON.parse(metadataJsonString);

    // Tính toán số tiền hiện tại
    const totalAda = await getTotalAda({
      address:
        metadata.fundAddress ??
        'addr_test1wr539xfv8psyhejd8yukjfuu9j2w9h5y9t2lukz04348aes7hvm5e',
    });

    // Cập nhật metadata
    metadata.currentAmount = totalAda.totalAda;
    metadata.targetAmount = BigInt(metadata.targetAmount);

    return metadata;
  } catch (error) {
    console.error('Error fetching fund by address:', error);
    return null;
  }
};

const decodeMetadata = (
  encodedMetadataJson: Record<string, number>
): string => {
  try {
    // Chuyển đổi mảng số thành mảng byte
    const bytes = Object.values(encodedMetadataJson).map((num) => num);

    // Sử dụng TextDecoder để giải mã UTF-8
    const decoder = new TextDecoder('utf-8');
    const decodedString = decoder.decode(new Uint8Array(bytes));

    // Loại bỏ các ký tự không mong muốn
    const cleanedString = decodedString
      .trim()
      .replace(/^[^\{]*/, '') // Loại bỏ các ký tự trước dấu {
      .replace(/[^\}]*$/, ''); // Loại bỏ các ký tự sau dấu }

    return cleanedString;
  } catch (error) {
    console.error('Metadata decoding error:', error);

    // Fallback method nếu TextDecoder gặp vấn đề
    try {
      return Object.values(encodedMetadataJson)
        .map((num) => String.fromCharCode(num))
        .join('')
        .trim()
        .replace(/^[^\{]*/, '')
        .replace(/[^\}]*$/, '');
    } catch (fallbackError) {
      console.error('Fallback decoding error:', fallbackError);
      return '';
    }
  }
};
