import { Blockfrost, Lucid } from 'lucid-cardano';

class LucidService {
  async initial(): Promise<Lucid> {
    const lucid = await Lucid.new(
      new Blockfrost(
        import.meta.env.VITE_BLOCKFROST_RPC_URL_PREVIEW!,
        import.meta.env.VITE_BLOCKFROST_PROJECT_API_KEY_PREVIEW!
      ),
      'Preview'
    );

    return lucid;
  }
}

export default new LucidService().initial();
