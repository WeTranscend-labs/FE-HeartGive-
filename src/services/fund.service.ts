import LucidService from './lucid.service';

class FundService {
  private lucidService: LucidService;

  constructor() {
    this.lucidService = new LucidService();
  }

  //   async getFunds({ page, pageSize }: { page: number; pageSize: number }) {}
}
