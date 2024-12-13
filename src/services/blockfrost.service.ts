import { rootMetdata, utxo } from '@/types/blockfrost';
import { Fund, FundTransaction } from '@/types/fund';
import readValidators, { Validators } from '@/utils/readValidators';
import axios from 'axios';
import { decode } from 'cbor-x';
import lucidService from './lucid.service';
import { UTxO } from 'lucid-cardano';

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
    const validatorAddress = (await lucidService).utils.validatorToAddress(
      fundManagementValidatorScript
    );

    // Lấy tổng số UTXOs tại địa chỉ validator
    const totalUtxosResponse = await blockfrostApi.get(
      `/addresses/${validatorAddress}/utxos`,
      {
        params: {
          count: 1, // Chỉ lấy thông tin tổng số
        },
      }
    );

    // Tính toán tổng số trang
    const [utxos, totalUtxos] = await Promise.all([
      blockfrostApi
        .get(`/addresses/${validatorAddress}/utxos`, {
          params: {
            page: page,
            count: pageSize,
          },
        })
        .then((response) => response.data),
      blockfrostApi
        .get(`/addresses/${validatorAddress}/utxos`)
        .then((response) => response.data.length),
    ]);

    const defaultFundAddress =
      'addr_test1wr539xfv8psyhejd8yukjfuu9j2w9h5y9t2lukz04348aes7hvm5e';

    const funds: Fund[] = await Promise.all(
      utxos.map(async (utxo) => {
        const rootMetadata: rootMetdata[] = await blockfrostApi
          .get(`/txs/${utxo.tx_hash}/metadata`)
          .then((response) => response.data);

        // Trích xuất JSON string từ metadata
        const encodedMetadataJson = rootMetadata[0].json_metadata[2].data;

        // Giải mã metadata
        const metadataJsonString = decodeMetadata(encodedMetadataJson);

        // Parse JSON string thành object Fund
        const metadata: Fund = JSON.parse(metadataJsonString);

        const totalAda = await getTotalAda({
          address: metadata.fundAddress || defaultFundAddress,
        });

        return {
          ...metadata,
          fundAddress: metadata.fundAddress || defaultFundAddress,
          txHash: utxo.tx_hash,
          inlineDatum: utxo.inline_datum,
          dataHash: utxo.data_hash,
          blockHash: utxo.block,
          currentAmount: totalAda.totalAda,
          targetAmount: BigInt(metadata.targetAmount ?? 100n),
        };
      })
    );

    console.log();

    // Trả về cả funds và totalPages
    return {
      funds,
      totalPages: Math.ceil(totalUtxos / pageSize),
    };
  } catch (error) {
    console.error('Error fetching funds:', error);
    return {
      funds: [],
      totalPages: 1,
    };
  }
};

export const getMetadataFromUtxo = async (utxo: UTxO | undefined) => {
  try {
    // Lấy metadata từ transaction
    const rootMetadata: rootMetdata[] = await blockfrostApi
      .get(`/txs/${utxo?.txHash}/metadata`)
      .then((response) => response.data);

    // Kiểm tra xem metadata có tồn tại không
    if (!rootMetadata || rootMetadata.length === 0) {
      console.warn('No metadata found for transaction');
      return null;
    }

    // Trích xuất JSON string từ metadata
    const encodedMetadataJson = rootMetadata[0].json_metadata[2].data;

    // Giải mã metadata
    const metadataJsonString = decodeMetadata(encodedMetadataJson);

    // Parse JSON string thành object
    const metadata = JSON.parse(metadataJsonString);

    return metadata;
  } catch (error) {
    console.error('Error extracting metadata:', error);
    return null;
  }
};

export const getVerifiedFunds = async ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) => {
  try {
    const validators: Validators = readValidators();
    const fundVerifiedValidatorScript = validators.fundVerified;
    const validatorAddress = (await lucidService).utils.validatorToAddress(
      fundVerifiedValidatorScript
    );

    // Lấy tổng số UTXOs tại địa chỉ validator
    const totalUtxosResponse = await blockfrostApi.get(
      `/addresses/${validatorAddress}/utxos`,
      {
        params: {
          count: 1, // Chỉ lấy thông tin tổng số
        },
      }
    );

    // Tính toán tổng số trang
    const [utxos, totalUtxos] = await Promise.all([
      blockfrostApi
        .get(`/addresses/${validatorAddress}/utxos`, {
          params: {
            page: page,
            count: pageSize,
          },
        })
        .then((response) => response.data),
      blockfrostApi
        .get(`/addresses/${validatorAddress}/utxos`)
        .then((response) => response.data.length),
    ]);

    const defaultFundAddress =
      'addr_test1wr539xfv8psyhejd8yukjfuu9j2w9h5y9t2lukz04348aes7hvm5e';

    const verifiedFunds: Fund[] = await Promise.all(
      utxos.map(async (utxo) => {
        const rootMetadata: rootMetdata[] = await blockfrostApi
          .get(`/txs/${utxo.tx_hash}/metadata`)
          .then((response) => response.data);

        // Trích xuất JSON string từ metadata
        const encodedMetadataJson = rootMetadata[0].json_metadata[2].data;

        // Giải mã metadata
        const metadataJsonString = decodeMetadata(encodedMetadataJson);

        // Parse JSON string thành object Fund
        const metadata: Fund = JSON.parse(metadataJsonString);

        const totalAda = await getTotalAda({
          address: metadata.fundAddress || defaultFundAddress,
        });

        return {
          ...metadata,
          fundAddress: metadata.fundAddress || defaultFundAddress,
          txHash: utxo.tx_hash,
          inlineDatum: utxo.inline_datum,
          dataHash: utxo.data_hash,
          blockHash: utxo.block,
          currentAmount: totalAda.totalAda,
          targetAmount: BigInt(metadata.targetAmount ?? 100n),
          status: 'verified', // Thêm trạng thái verified
        };
      })
    );

    // Trả về cả verifiedFunds và totalPages
    return {
      funds: verifiedFunds,
      totalPages: Math.ceil(totalUtxos / pageSize),
    };
  } catch (error) {
    console.error('Error fetching verified funds:', error);
    return {
      funds: [],
      totalPages: 1,
    };
  }
};

export const getFundTransactions = async ({
  fundAddress,
}: {
  fundAddress: string | undefined;
}): Promise<FundTransaction[]> => {
  // Kiểm tra fundAddress có tồn tại không
  if (!fundAddress) {
    console.warn('No fund address provided');
    return [];
  }

  try {
    // Lấy tất cả các UTXO tại địa chỉ quỹ
    let utxos: utxo[] = [];
    try {
      utxos = await blockfrostApi
        .get(`/addresses/${fundAddress}/utxos`)
        .then((response) => response.data);
    } catch (utxoError) {
      console.warn('Error fetching UTXOs:', utxoError);
      // Không ném lỗi, chỉ trả về mảng rỗng
      return [];
    }

    // Nếu không có UTXO, trả về mảng rỗng
    if (!utxos || utxos.length === 0) {
      console.warn('No transactions found for this fund address');
      return [];
    }

    // Lấy thông tin chi tiết của từng transaction
    const transactions: FundTransaction[] = await Promise.all(
      utxos.map(async (utxo) => {
        try {
          // Lấy thông tin transaction
          const txDetails = await blockfrostApi
            .get(`/txs/${utxo.tx_hash}`)
            .then((response) => response.data);

          // Lấy địa chỉ người gửi (input đầu tiên)
          const txInputs = await blockfrostApi
            .get(`/txs/${utxo.tx_hash}/utxos`)
            .then((response) => response.data.inputs);

          // Lấy metadata của transaction (nếu có)
          let metadata: any = null;
          try {
            const rootMetadata: rootMetdata[] = await blockfrostApi
              .get(`/txs/${utxo.tx_hash}/metadata`)
              .then((response) => response.data);

            if (rootMetadata && rootMetadata.length > 0) {
              metadata = rootMetadata[0].json_metadata;
            }
          } catch (metadataError) {
            console.warn('No metadata found for transaction');
          }

          // Tìm số lượng ADA được gửi
          const adaAmount = utxo.amount.find(
            (asset) => asset.unit === 'lovelace'
          );

          return {
            txHash: utxo.tx_hash,
            sender: txInputs[0]?.address || 'Unknown',
            amount: adaAmount
              ? BigInt(adaAmount.quantity) / 1_000_000n // Chuyển từ lovelace sang ADA
              : 0n,
            timestamp: new Date(txDetails.block_time * 1000), // Chuyển unix timestamp sang Date
            metadata: metadata,
            block: txDetails.block_height,
          };
        } catch (txError) {
          console.warn(
            `Error processing transaction ${utxo.tx_hash}:`,
            txError
          );
          // Trả về null để bỏ qua transaction lỗi
          return null;
        }
      })
    );

    // Lọc bỏ các transaction null và sắp xếp
    const validTransactions = transactions.filter(
      (tx): tx is FundTransaction => tx !== null
    );

    // Sắp xếp transactions theo thời gian giảm dần (mới nhất lên trước)
    return validTransactions.sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    );
  } catch (error) {
    console.error('Unexpected error in getFundTransactions:', error);
    return [];
  }
};

const getTotalAda = async ({ address }: { address: string }) => {
  try {
    const utxos: utxo[] = await blockfrostApi
      .get(`/addresses/${address}/utxos`)
      .then((response) => response.data);

    // Nếu không có UTXO, trả về 0
    if (utxos.length === 0) {
      return {
        totalLovelace: 0n,
        totalAda: 0n,
      };
    }

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
  } catch (error) {
    // Xử lý lỗi khi gọi API
    if (error?.response && error.response?.status === 404) {
      // Địa chỉ chưa được sử dụng
      return {
        totalLovelace: 0n,
        totalAda: 0n,
      };
    }

    // Nếu là lỗi khác, log và ném lỗi
    console.error('Error fetching total ADA:', error);
    throw error;
  }
};

export const getFundByAddress = async ({
  address,
}: {
  address: string | undefined;
}): Promise<Fund | null> => {
  try {
    const validators: Validators = readValidators();
    const fundManagementValidatorScript = validators.fundManagement;
    const defaultFundAddress =
      'addr_test1wr539xfv8psyhejd8yukjfuu9j2w9h5y9t2lukz04348aes7hvm5e';

    // Lấy UTXOs từ địa chỉ validator
    const validatorAddress = (await lucidService).utils.validatorToAddress(
      fundManagementValidatorScript
    );

    const utxos: utxo[] = await blockfrostApi
      .get(`/addresses/${validatorAddress}/utxos`)
      .then((response) => response.data);

    // Tìm UTXOs có liên quan đến địa chỉ fund cụ thể
    const fundUtxo = await (async () => {
      for (const utxo of utxos) {
        try {
          const rootMetadata: rootMetdata[] = await blockfrostApi
            .get(`/txs/${utxo.tx_hash}/metadata`)
            .then((response) => response.data);

          const encodedMetadataJson = rootMetadata[0].json_metadata[2].data;
          const metadataJsonString = decodeMetadata(encodedMetadataJson);
          const metadata: Fund = JSON.parse(metadataJsonString);

          if (
            (metadata.fundAddress ??
              'addr_test1wr539xfv8psyhejd8yukjfuu9j2w9h5y9t2lukz04348aes7hvm5e') ===
            address
          ) {
            return utxo;
          }
        } catch (error) {
          console.error('Error processing UTXO:', error);
        }
      }
      return null;
    })();

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

    // Trả về đầy đủ thông tin như trong getFunds
    return {
      ...metadata,
      fundAddress: metadata.fundAddress || defaultFundAddress, // Đảm bảo luôn có fundAddress
      txHash: fundUtxo.tx_hash,
      inlineDatum: fundUtxo.inline_datum,
      dataHash: fundUtxo.data_hash,
      block: fundUtxo.block,
      currentAmount: totalAda.totalAda,
      targetAmount: BigInt(metadata.targetAmount ?? 100n),
    };
  } catch (error) {
    console.error('Error fetching fund by address:', error);
    return null;
  }
};

export const decodeMetadata = (
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
