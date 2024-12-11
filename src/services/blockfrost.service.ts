import { rootMetdata, utxo } from '@/types/blockfrost';
import { Fund } from '@/types/fund';
import readValidators, { Validators } from '@/utils/readValidators';
import axios from 'axios';
import { decode } from 'cbor-x';

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
  const validators: Validators = readValidators();
  const fundManagementAddress = validators.fundManagement.script;

  const utxos: utxo[] = await blockfrostApi
    .get(`/addresses/${fundManagementAddress}/utxos`, {
      params: {
        page: page,
        count: pageSize,
      },
    })
    .then((response) => response.data);

  const funds = await Promise.all(
    utxos.map(async (utxo) => {
      const rootMetadata: rootMetdata[] = await blockfrostApi
        .get(`/txs/${utxo.tx_hash}/metadata`)
        .then((response) => response.data);

      // Trích xuất JSON string từ metadata
      const encodedMetadataJson = rootMetadata[0].json_metadata[2].data;

      // Chuyển đổi JSON string sang object
      const metadata: Fund = JSON.parse(
        Object.values(encodedMetadataJson)
          .map((num) => String.fromCharCode(num))
          .join('')
      );

      return metadata;
    })
  );

  return funds;
};
