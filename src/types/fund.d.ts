export interface OrganizationInfo {
  name: string;
  description: string;
  foundedYear?: number;
  website?: string;
  email: string;
  phone?: string;
  address?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export type FundCategory =
  | 'Education'
  | 'Healthcare'
  | 'Environment'
  | 'Poverty'
  | 'Disaster Relief'
  | 'Animal Welfare'
  | 'Arts & Culture'
  | 'Community Development'
  | 'Children & Youth'
  | 'Elderly Care';

export type Fund = {
  organizationName: string;
  startDate: string;
  endDate: string;
  image: string;
  organizationInfo: {
    website?: string | '';
    socialInfo: {
      facebook?: string | '';
      twitter?: string | '';
      phone?: string | '';
      email?: string | '';
    };
  };
  purpose: string;
  targetAmount: bigint;
  currentAmount: bigint;
  walletAddress: string;
  fundAddress: string;
  txHash: string;
  inlineDatum: string | null;
  dataHash: string | null;
  block: string | null;
  category:
    | 'Education'
    | 'Healthcare'
    | 'Environment'
    | 'Poverty'
    | 'Disaster Relief'
    | 'Animal Welfare'
    | 'Arts & Culture'
    | 'Community Development'
    | 'Children & Youth'
    | 'Elderly Care';
  tags: string[];
};

export interface Transaction {
  id: string;
  fundId: string;
  amount: number;
  fromWallet: string;
  timestamp: Date;
  message?: string;
  isAnonymous?: boolean;
}

export type FundTransaction = {
  txHash: string;
  sender: string;
  amount: bigint;
  timestamp: Date;
  metadata?: any;
  block: number;
};
