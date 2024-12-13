import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Globe,
  Facebook,
  Twitter,
  Tag,
  Info,
  Building,
  Clock,
  MapPin,
  Mail,
  Phone,
  FileText,
} from 'lucide-react';
import { Fund } from '@/types/fund';
import { Button } from '@/components/ui/button';
import { Badge } from 'lucide-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-hot-toast';
import { formatDateRange } from './FundCard';
import { SmartContractContextType } from '@/types/contexts/SmartContractContextType';
import SmartContractContext from '@/contexts/components/SmartContractContext';

const CategoryColors = {
  Education: 'bg-blue-100 text-blue-800',
  Healthcare: 'bg-green-100 text-green-800',
  Environment: 'bg-emerald-100 text-emerald-800',
  Poverty: 'bg-orange-100 text-orange-800',
  'Disaster Relief': 'bg-red-100 text-red-800',
  'Animal Welfare': 'bg-purple-100 text-purple-800',
  'Arts & Culture': 'bg-pink-100 text-pink-800',
  'Community Development': 'bg-indigo-100 text-indigo-800',
  'Children & Youth': 'bg-cyan-100 text-cyan-800',
  'Elderly Care': 'bg-teal-100 text-teal-800',
};

const truncatePurpose = (purpose: string, maxLength: number = 150) => {
  if (purpose.length <= maxLength) return purpose;
  return purpose.substring(0, maxLength) + '...';
};

interface FundDetailsSidebarProps {
  fund: Fund;
  onClose: () => void;
  onVerify: (fundId: string) => void;
  onCopyAddress?: (address: string) => void;
}

const FundDetailsSidebar: React.FC<FundDetailsSidebarProps> = ({
  fund,
  onClose,
  onVerify,
  onCopyAddress,
}) => {
  const { verifyFund } =
    useContext<SmartContractContextType>(SmartContractContext);
  const [isVerifying, setIsVerifying] = useState<Boolean>(false);
  const categoryColor =
    CategoryColors[fund.category] || 'bg-gray-100 text-gray-800';

  const handleCopyAddress = () => {
    if (onCopyAddress) {
      onCopyAddress(fund.fundAddress);
    }
    toast.success('Fund address copied');
  };

  const handleVerifyFund = async () => {
    try {
      setIsVerifying(true);

      // Chuẩn bị metadata để verify
      const fundMetadata = {
        organizationName: fund.organizationName,
        fundAddress: fund.fundAddress,
        category: fund.category,
        purpose: fund.purpose,
        startDate: fund.startDate,
        endDate: fund.endDate,
        // Các trường metadata khác nếu cần
      };

      // Gọi hàm verify từ context
      const verifyTxHash = await verifyFund({
        txHash: fund.txHash,
        fundOwner: fund.walletAddress, // Địa chỉ ví của chủ quỹ
        fundMetadata: fundMetadata,
      });

      // Hiển thị thông báo thành công
      toast.success('Fund verified successfully!', {
        duration: 4000,
        position: 'top-right',
        icon: '✅',
      });

      // Gọi callback nếu có
      onVerify && onVerify(verifyTxHash);

      // Đóng sidebar sau khi verify
      onClose();
    } catch (error) {
      // Xử lý lỗi
      console.error('Verification error:', error);
      toast.error('Failed to verify fund. Please try again.', {
        duration: 4000,
        position: 'top-right',
        icon: '❌',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ type: 'tween', duration: 0.3 }}
      className="fixed top-0 right-0 w-[600px] h-full bg-white shadow-2xl z-50 overflow-y-auto"
    >
      {/* Header với hình ảnh */}
      <div className="relative">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
        >
          <div className="relative">
            <motion.img
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              src={fund.image}
              alt={fund.organizationName}
              className="w-full h-64 object-cover filter brightness-75"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
              <motion.h2
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="text-3xl font-bold"
              >
                {fund.organizationName}
              </motion.h2>
              <Badge
                className={`mt-2 self-start p-0.5 rounded-full ${categoryColor}`}
              >
                {fund.category}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30"
              onClick={onClose}
            >
              <X className="w-6 h-6 text-white" />
            </Button>
          </div>
        </motion.div>

        {/* Nội dung chi tiết */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 300 }}
          className="p-6 space-y-6"
        >
          {/* Mục đích quỹ */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center mb-2">
              <FileText className="mr-2 w-5 h-5 text-blue-500" />
              <h3 className="font-semibold text-lg">Purpose</h3>
            </div>
            <p className="text-gray-600 italic line-clamp-3 text-ellipsis text-pretty">
              {fund.purpose}
            </p>
          </motion.div>

          {/* Thời gian quỹ */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center mb-2">
              <Clock className="mr-2 w-5 h-5 text-purple-500" />
              <h3 className="font-semibold text-lg">Fund Timeline</h3>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 w-4 h-4 text-gray-500" />
              <p className="font-medium">
                {formatDateRange(fund.startDate, fund.endDate)}
              </p>
            </div>
          </motion.div>

          {/* Thông tin liên hệ */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center mb-2">
              <Building className="mr-2 w-5 h-5 text-indigo-500" />
              <h3 className="font-semibold text-lg">Contact Information</h3>
            </div>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                {fund.organizationInfo.website && (
                  <a
                    href={fund.organizationInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm hover:text-blue-500 group"
                  >
                    <Globe className="mr-2 w-4 h-4 group-hover:text-blue-500" />
                    Website
                  </a>
                )}
                {fund.organizationInfo.socialInfo.facebook && (
                  <a
                    href={fund.organizationInfo.socialInfo.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm hover:text-blue-500 group"
                  >
                    <Facebook className="mr-2 w-4 h-4 group-hover:text-blue-500" />
                    Facebook
                  </a>
                )}
                {fund.organizationInfo.socialInfo.twitter && (
                  <a
                    href={fund.organizationInfo.socialInfo.twitter}
                    target="_blank rel="
                    className="flex items-center text-sm hover:text-blue-500 group"
                  >
                    <Twitter className="mr-2 w-4 h-4 group-hover:text-blue-500" />
                    Twitter
                  </a>
                )}
              </div>
              {fund.organizationInfo.socialInfo.email && (
                <div className="flex items-center">
                  <Mail className="mr-2 w-4 h-4 text-gray-500" />
                  <p className="text-sm">
                    {fund.organizationInfo.socialInfo.email}
                  </p>
                </div>
              )}
              {fund.organizationInfo.socialInfo.phone && (
                <div className="flex items-center">
                  <Phone className="mr-2 w-4 h-4 text-gray-500" />
                  <p className="text-sm">
                    {fund.organizationInfo.socialInfo.phone}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Nút hành động */}
        <div className="sticky bottom-0 bg-white shadow-top p-4 flex space-x-4">
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleVerifyFund}
            disabled={isVerifying}
          >
            {isVerifying ? 'Verifying...' : 'Verify Fund'}
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={onClose}
            disabled={isVerifying}
          >
            Close
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default FundDetailsSidebar;
