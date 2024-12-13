import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClipboardIcon,
} from '@heroicons/react/24/solid';
import {
  Globe,
  Facebook,
  Twitter,
  Phone,
  Mail,
  Calendar,
  Target,
  GridIcon,
  ListIcon,
  ClipboardCheckIcon,
  TrendingUp,
  Tag,
} from 'lucide-react';

import { Fund } from '@/types/fund';
import { Button } from '@/components/ui/button';
import { Badge } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'react-hot-toast';
import { getFunds, getVerifiedFunds } from '@/services/blockfrost.service';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatDateRange } from '@/components/FundCard';
import { AnimatePresence } from 'framer-motion';
import FundDetailsSidebar from '@/components/FundDetailsSidebar';

// Skeleton Components
const GridSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {[...Array(9)].map((_, index) => (
      <div
        key={index}
        className="bg-white shadow-md rounded-lg overflow-hidden animate-pulse"
      >
        <div className="w-full h-48 bg-gray-300"></div>
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="h-6 bg-gray-300 rounded w-1/2"></div>
            <div className="h-6 bg-gray-300 rounded w-1/4"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-10 bg-gray-300 rounded mt-4"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const ListSkeleton = () => (
  <div className="space-y-4">
    {[...Array(5)].map((_, index) => (
      <div
        key={index}
        className="flex bg-white shadow-md rounded-lg p-4 animate-pulse"
      >
        <div className="w-32 h-32 bg-gray-300 rounded-md mr-4"></div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div className="space-y-2 w-full">
              <div className="h-8 bg-gray-300 rounded w-1/2"></div>
              <div className="h-6 bg-gray-300 rounded w-1/4"></div>
            </div>
            <div className="flex space-x-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-6 h-6 bg-gray-300 rounded-full"></div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-300 rounded w-3/4"></div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-10 bg-gray-300 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const FundDisplayPage: React.FC = () => {
  const [funds, setFunds] = useState<Fund[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [copiedAddresses, setCopiedAddresses] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null);

  const fetchVerifiedFunds = async () => {
    setLoading(true);
    try {
      const fetchedFunds = await getVerifiedFunds({
        page,
        pageSize: viewMode === 'grid' ? 9 : 5,
      });
      setFunds(fetchedFunds);
    } catch (error) {
      toast.error('Failed to fetch funds');
      console.error('Error fetching funds:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerifiedFunds();
  }, [page, viewMode]);

  const handleCopyAddress = (txHash: string) => {
    setCopiedAddresses((prev) => ({
      ...prev,
      [txHash]: true,
    }));

    setTimeout(() => {
      setCopiedAddresses((prev) => ({
        ...prev,
        [txHash]: false,
      }));
    }, 2000);
  };

  const handleVerifyFund = async (fundId: string) => {
    try {
      // await verifyFund(fundId);

      // Cập nhật danh sách funds
      setFunds((currentFunds) =>
        currentFunds.filter((fund) => fund.txHash !== fundId)
      );

      setSelectedFund(null);
      toast.success('Fund verified successfully');
    } catch (error) {
      toast.error('Failed to verify fund');
      console.error('Verification error:', error);
    }
  };

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {funds.map((fund) => (
        <Card
          key={fund.txHash}
          className="hover:shadow-xl transition-all duration-300 ease-in-out"
        >
          <CardHeader className="p-0">
            <img
              src={fund.image}
              alt={fund.organizationName}
              className="w-full h-48 object-cover rounded-t-lg"
            />
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-bold truncate">
                {fund.organizationName}
              </CardTitle>
              <Badge variant="secondary" className="ml-2">
                {fund.category}
              </Badge>
            </div>

            <div className="flex items-center text-sm text-muted-foreground">
              <Target className="mr-2 w-4 h-4" />
              <span>
                {fund.currentAmount.toLocaleString()} /
                {fund.targetAmount.toLocaleString()} ADA
              </span>
            </div>

            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-2 w-4 h-4" />
              <span>{formatDateRange(fund.startDate, fund.endDate)}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              variant="outline"
              onClick={() => setSelectedFund(fund)}
            >
              View Fund Details
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="space-y-4">
      {funds.map((fund) => (
        <Card
          key={fund.txHash}
          className="flex hover:shadow-xl transition-all duration-300 ease-in-out"
        >
          <div className="w-1/4 p-4">
            <img
              src={fund.image}
              alt={fund.organizationName}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
          <div className="w-3/4 p-4 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h2 className="text-2xl font-bold">
                    {fund.organizationName}
                  </h2>
                  <Badge variant="secondary" className="mt-1">
                    {fund.category}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  {fund.organizationInfo.website && (
                    <a
                      href={fund.organizationInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Globe className="w-5 h-5 text-gray-500 hover:text-blue-500" />
                    </a>
                  )}
                  {fund.organizationInfo.socialInfo.facebook && (
                    <a
                      href={fund.organizationInfo.socialInfo.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Facebook className="w-5 h-5 text-gray-500 hover:text-blue-500" />
                    </a>
                  )}
                  {fund.organizationInfo.socialInfo.twitter && (
                    <a
                      href={fund.organizationInfo.socialInfo.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="w-5 h-5 text-gray-500 hover:text-blue-500" />
                    </a>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="flex items-center">
                  <TrendingUp className="mr-2 w-4 h-4 text-green-500" />
                  <span>
                    {fund.currentAmount.toLocaleString()} /
                    {fund.targetAmount.toLocaleString()} ADA
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 w-4 h-4 text-blue-500" />
                  <span>
                    <span>{formatDateRange(fund.startDate, fund.endDate)}</span>
                  </span>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 w-4 h-4 text-purple-500" />
                  <span>{fund.organizationInfo.socialInfo.phone || 'N/A'}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-2 w-4 h-4 text-red-500" />
                  <span>{fund.organizationInfo.socialInfo.email || 'N/A'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <CopyToClipboard
                text={fund.fundAddress}
                onCopy={() => handleCopyAddress(fund.txHash)}
              >
                <div className="flex items-center cursor-pointer group">
                  <Tag className="mr-2 w-4 h-4 text-gray-500 group-hover:text-blue-500" />
                  <span className="text-gray-600 truncate max-w-[200px] group-hover:text-blue-500">
                    {fund.fundAddress}
                  </span>
                  {copiedAddresses[fund.txHash] ? (
                    <ClipboardCheckIcon className="ml-2 w-5 h-5 text-green-500" />
                  ) : (
                    <ClipboardIcon className="ml-2 w-5 h-5 text-gray-500 group-hover:text-blue-500" />
                  )}
                </div>
              </CopyToClipboard>
              <Button variant="outline" onClick={() => setSelectedFund(fund)}>
                View Fund Details
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Funds Pending Confirmation</h1>
        <div className="flex space-x-2">
          <Button
            variant={viewMode === 'list' ? 'primary' : 'outline'}
            onClick={() => setViewMode('grid')}
          >
            <GridIcon className="w-5 h-5" />
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'primary' : 'outline'}
            onClick={() => setViewMode('list')}
          >
            <ListIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {loading ? (
        viewMode === 'grid' ? (
          <GridSkeleton />
        ) : (
          <ListSkeleton />
        )
      ) : viewMode === 'grid' ? (
        renderGridView()
      ) : (
        renderListView()
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          <ChevronLeftIcon className="w-5 h-5 mr-2" />
          Previous
        </Button>
        <span className="text-muted-foreground">Page {page}</span>
        <Button
          variant="outline"
          disabled={funds.length < (viewMode === 'grid' ? 9 : 5)}
          onClick={() => setPage(page + 1)}
        >
          Next
          <ChevronRightIcon className="w-5 h-5 ml-2" />
        </Button>
      </div>

      <AnimatePresence>
        {selectedFund && (
          <FundDetailsSidebar
            fund={selectedFund}
            onClose={() => setSelectedFund(null)}
            onVerify={handleVerifyFund}
            onCopyAddress={(address) => toast.success('Fund address copied')}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default FundDisplayPage;
