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
  AlertCircle,
  Target,
  ChevronRight,
  Loader2,
  Copy,
} from 'lucide-react';
import { Fund } from '@/types/fund';
import { Button } from '@/components/ui/button';
import { Badge } from 'lucide-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-hot-toast';
import { formatDateRange } from './FundCard';
import { SmartContractContextType } from '@/types/contexts/SmartContractContextType';
import SmartContractContext from '@/contexts/components/SmartContractContext';
import { PurposeModal } from './PurposeModal';
import { useToast } from '@/hooks/use-toast';

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

const calculateRemainingTime = (endDate: string) => {
  const now = new Date();
  const end = new Date(endDate);

  if (end < now) return 'Campaign Ended';

  const diff = end.getTime() - now.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);

  if (months > 0) {
    return `${months} month${months > 1 ? 's' : ''} remaining`;
  }

  return `${days} day${days > 1 ? 's' : ''} remaining`;
};

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
  const [isPurposeModalOpen, setIsPurposeModalOpen] = useState(false);
  const { toast } = useToast();

  const handleVerifyFund = async () => {
    try {
      setIsVerifying(true);

      const fundMetadata = {
        organizationName: fund.organizationName,
        fundAddress: fund.fundAddress,
        category: fund.category,
        purpose: fund.purpose,
        startDate: fund.startDate,
        endDate: fund.endDate,
      };

      // Toast loading
      toast({
        variant: 'default',
        title: 'Verifying Fund...',
        description: 'Processing fund verification',
      });

      // Gọi hàm verify từ context
      const verifyTxHash = await verifyFund({
        txHash: fund.txHash,
        fundOwner: fund.walletAddress,
        fundMetadata: fundMetadata,
      });

      // Cập nhật toast thành công với khả năng copy
      toast({
        variant: 'success',
        title: 'Fund Verified Successfully',
        description: (
          <div className="flex items-center justify-between">
            <span className="inline-block mr-1">Transaction Hash: </span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(verifyTxHash);
                toast({
                  variant: 'default',
                  title: 'Copied',
                  description: 'Transaction Hash copied to clipboard',
                });
              }}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <span className="mr-2">{`${verifyTxHash.slice(
                0,
                10
              )}...${verifyTxHash.slice(-4)}`}</span>
              <Copy className="w-4 h-4" />
            </button>
          </div>
        ),
      });

      // Gọi callback nếu có
      onVerify && onVerify(verifyTxHash);

      // Đóng sidebar sau khi verify
      onClose();
    } catch (error) {
      // Xử lý lỗi chi tiết
      toast({
        variant: 'destructive',
        title: 'Verification Failed',
        description:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred during verification',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCopyAddress = () => {
    if (onCopyAddress) {
      onCopyAddress(fund.fundAddress);
    }

    toast({
      title: 'Address Copied',
      description: `${fund.fundAddress.slice(0, 10)}... copied to clipboard`,
      variant: 'default',
      duration: 2000,
    });
  };

  return (
    <>
      {' '}
      <motion.div
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed top-0 right-0 w-[600px] h-full bg-white/95 backdrop-blur-sm shadow-2xl z-50 overflow-y-auto rounded-l-3xl border-l border-gray-100"
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
                className="w-full h-64 object-cover filter brightness-75 rounded-tl-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-tl-3xl"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <motion.h2
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                  className="text-3xl font-bold drop-shadow-lg"
                >
                  {fund.organizationName}
                </motion.h2>
                <Badge
                  className={`mt-2 self-start p-1 px-3 rounded-full text-xs font-medium ${categoryColor}`}
                >
                  {fund.category}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-110"
                onClick={onClose}
              >
                <X className="w-6 h-6 text-white drop-shadow-md" />
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
              className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border border-blue-100 shadow-md hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center mb-4 pb-2 border-b border-blue-100">
                <FileText className="mr-3 w-7 h-7 text-blue-600 group-hover:rotate-6 transition-transform duration-300" />
                <h3 className="font-bold text-xl text-blue-800">
                  Fund Purpose
                </h3>
              </div>

              <div className="relative">
                <div className="absolute -top-2 -left-3 text-[100px] font-bold text-blue-50 opacity-50 -z-10">
                  "
                </div>
                <p
                  className="text-gray-700 text-base leading-relaxed relative z-10 pl-4 border-l-4 border-blue-400 italic 
  max-h-[6.5rem] overflow-hidden relative after:content-['...'] after:absolute after:bottom-0 after:right-0 
  after:bg-white after:pl-2"
                >
                  {fund.purpose}
                </p>
                <div className="absolute -bottom-2 -right-3 text-[100px] font-bold text-blue-50 opacity-50 -z-10 self-end">
                  "
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-blue-100 pt-3">
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-600">Core Objective</span>
                </div>
                {fund.purpose.length > 150 && (
                  <button
                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors flex items-center group"
                    onClick={() => setIsPurposeModalOpen(true)}
                  >
                    Read More
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>
            </motion.div>

            {/* Thời gian quỹ */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-2xl border border-purple-100 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-4 pb-2 border-b border-purple-100">
                <Clock className="mr-3 w-7 h-7 text-purple-600" />
                <h3 className="font-bold text-xl text-purple-800">
                  Fund Timeline
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Campaign Duration</p>
                    <p className="font-semibold text-gray-800">
                      {formatDateRange(fund.startDate, fund.endDate)}
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-purple-200"></div>
                  <div className="pl-12 space-y-3">
                    <div className="relative">
                      <div className="absolute -left-[33px] top-1 w-4 h-4 bg-purple-200 rounded-full border-3 border-white"></div>
                      <p className="text-sm font-medium text-gray-700">
                        Start Date
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(fund.startDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[33px] top-1 w-4 h-4 bg-purple-200 rounded-full border-3 border-white"></div>
                      <p className="text-sm font-medium text-gray-700">
                        End Date
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(fund.endDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center bg-purple-50 p-3 rounded-xl border border-purple-100">
                  <AlertCircle className="mr-3 w-6 h-6 text-purple-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Remaining Time
                    </p>
                    <p className="text-xs text-gray-500">
                      {calculateRemainingTime(fund.endDate)}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Thông tin liên hệ */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl border border-indigo-100 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-4 pb-2 border-b border-indigo-100">
                <Building className="mr-3 w-7 h-7 text-indigo-600" />
                <h3 className="font-bold text-xl text-indigo-800">
                  Contact Information
                </h3>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {fund.organizationInfo.website && (
                    <a
                      href={fund.organizationInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-2 bg-white rounded-xl shadow-sm hover:shadow-md hover:bg-indigo-50 transition-all duration-300 group"
                    >
                      <Globe className="mr-3 w-6 h-6 text-indigo-500 group-hover:text-indigo-700" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-800">
                        Website
                      </span>
                    </a>
                  )}
                  {fund.organizationInfo.socialInfo.facebook && (
                    <a
                      href={fund.organizationInfo.socialInfo.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-2 bg-white rounded-xl shadow-sm hover:shadow-md hover:bg-blue-50 transition-all duration-300 group"
                    >
                      <Facebook className="mr-3 w-6 h-6 text-blue-500 group-hover:text-blue-700" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-800">
                        Facebook
                      </span>
                    </a>
                  )}
                  {fund.organizationInfo.socialInfo.twitter && (
                    <a
                      href={fund.organizationInfo.socialInfo.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-2 bg-white rounded-xl shadow-sm hover:shadow-md hover:bg-sky-50 transition-all duration-300 group"
                    >
                      <Twitter className="mr-3 w-6 h-6 text-sky-500 group-hover:text-sky-700" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-sky-800">
                        Twitter
                      </span>
                    </a>
                  )}
                </div>

                {fund.organizationInfo.socialInfo.email && (
                  <div className="flex items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <Mail className="mr-3 w-6 h-6 text-green-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Email</p>
                      <p className="text-xs text-gray-500">
                        {fund.organizationInfo.socialInfo.email}
                      </p>
                    </div>
                  </div>
                )}

                {fund.organizationInfo.socialInfo.phone && (
                  <div className="flex items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <Phone className="mr-3 w-6 h-6 text-purple-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Phone</p>
                      <p className="text-xs text-gray-500">
                        {fund.organizationInfo.socialInfo.phone}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Nút hành động */}
          <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm shadow-top p-4 flex space-x-4 border-t border-gray-100 rounded-b-3xl">
            <Button
              variant="destructive"
              className="w-full rounded-xl transition-all duration-300 
    hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
              onClick={handleVerifyFund}
              disabled={isVerifying}
            >
              {isVerifying ? (
                <div className="animate-spin">
                  <Loader2 className="w-full h-full mr-2" />
                </div>
              ) : (
                'Verify Fund'
              )}
            </Button>
            <Button
              variant="outline"
              className="w-full rounded-xl transition-all duration-300 
    hover:scale-[1.02] active:scale-[0.98]"
              onClick={onClose}
              disabled={isVerifying}
            >
              Close
            </Button>
          </div>
        </div>
      </motion.div>
      {isPurposeModalOpen && (
        <PurposeModal
          fund={fund}
          onClose={() => setIsPurposeModalOpen(false)}
        />
      )}
    </>
  );
};

export default FundDetailsSidebar;
