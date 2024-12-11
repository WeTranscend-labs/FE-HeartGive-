export type utxo = {
  address: string;
  tx_hash: string;
  tx_index: number;
  output_index: number;
  amount: Array<{
    unit: string;
    quantity: string;
  }>;
  block: string;
  data_hash: string | null;
  inline_datum: string | null;
  reference_script_hash: string | null;
};

export type rootMetdata = {
  label: string;
  json_metadata: {
    2: {
      data: {
        [key: string]: number;
      };
    };
  };
};
