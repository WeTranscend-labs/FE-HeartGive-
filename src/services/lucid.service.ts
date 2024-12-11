import { Blockfrost, Lucid } from 'lucid-cardano';

class LucidService {
  async initial(): Promise<Lucid> {
    const lucid = await Lucid.new(
      new Blockfrost(
        process.env.VITE_BLOCKFROST_RPC_URL_PREVIEW!,
        process.env.VITE_BLOCKFROST_PROJECT_API_KEY_PREVIEW!
      ),
      'Preview'
    );

    return lucid;
  }
}

export default LucidService;
