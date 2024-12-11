import { Lucid } from 'lucid-cardano';

const fetchPublicKeyHash = async (lucid: Lucid): Promise<string> => {
  const publicKeyHash = lucid.utils.getAddressDetails(
    await lucid.wallet.address()
  ).paymentCredential?.hash as string;
  return publicKeyHash;
};

export default fetchPublicKeyHash;
