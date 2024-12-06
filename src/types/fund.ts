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

export interface Fund {
  id: string;
  organizationName: string;
  organizationInfo: OrganizationInfo;
  purpose: string;
  targetAmount: number;
  currentAmount: number;
  walletAddress: string;
  createdAt: Date;
  imageUrl: string;
  supporterCount: number;
  category: FundCategory;
  tags: string[];
}

export interface Transaction {
  id: string;
  fundId: string;
  amount: number;
  fromWallet: string;
  timestamp: Date;
  message?: string;
  isAnonymous?: boolean;
}