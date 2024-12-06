import { Transaction } from '../types/fund';

export const mockTransactions: Transaction[] = [
  {
    id: 'tx1',
    fundId: '1',
    amount: 5000,
    fromWallet: '0x1234567890123456789012345678901234567890',
    timestamp: new Date('2024-01-15T10:30:00'),
    message: 'Ủng hộ các em nhỏ! Chúc các em mau khỏe mạnh.'
  },
  {
    id: 'tx2',
    fundId: '1',
    amount: 10000,
    fromWallet: '0x2345678901234567890123456789012345678901',
    timestamp: new Date('2024-01-16T15:45:00'),
    message: 'Cầu mong các em sớm bình phục.'
  },
  {
    id: 'tx3',
    fundId: '2',
    amount: 3000,
    fromWallet: '0x3456789012345678901234567890123456789012',
    timestamp: new Date('2024-01-20T09:15:00'),
    message: 'Ủng hộ giáo dục vùng cao!'
  },
  {
    id: 'tx4',
    fundId: '3',
    amount: 2500,
    fromWallet: '0x4567890123456789012345678901234567890123',
    timestamp: new Date('2024-02-05T14:20:00'),
    message: 'Vì một môi trường xanh sạch đẹp'
  }
];