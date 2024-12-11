import { BlockFrostAPI } from '@blockfrost/blockfrost-js';

class BlockfrostService extends BlockFrostAPI {
  constructor() {
    super({
      projectId: process.env.VITE_BLOCKFROST_PROJECT_API_KEY_PREVIEW!,
    });
  }
}

export default new BlockfrostService();
