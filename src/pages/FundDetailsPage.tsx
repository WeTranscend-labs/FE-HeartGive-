import { OrganizeStory } from '@/components/OrganizeStory';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import WalletContext from '@/contexts/components/WalletContext';
import {
  getFundByAddress,
  getFundTransactions,
} from '@/services/blockfrost.service';
import { WalletContextType } from '@/types/contexts/WalletContextType';
import { Fund, FundTransaction } from '@/types/fund';
import {
  ArrowLeftIcon,
  CheckBadgeIcon,
  ClockIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  HeartIcon,
  LockClosedIcon,
  PhoneIcon,
  ShieldCheckIcon,
  TagIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { Loader2 } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CampaignStory } from '../components/CampaignStory';
import { ContributeDialog } from '../components/ContributeDialog';
import { ProgressBar } from '../components/ProgressBar';
import { TransactionList } from '../components/TransactionList';
import { formatCurrency } from '../utils/format';
import { calculateRoundStats, calculateTransactionStats } from '@/utils/stats';
import { WithdrawFundsDialog } from '@/components/WithdrawFundsDialog';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';

export default function FundDetailsPage() {
  const { id } = useParams<string>();
  const [fund, setFund] = useState<Fund | null>(null!);
  const { wallet } = useContext<WalletContextType>(WalletContext);
  const [transactions, setTransactions] = useState<FundTransaction[]>(null!);
  const [isLoading, setIsLoading] = useState(true);
  const stats = calculateTransactionStats(transactions);
  console.log(stats);
  const [roundStats, setRoundStats] = useState<{
    totalInRound: bigint;
    matchingPool: bigint;
    contributionsTotal: bigint;
    contributorsCount: number;
  } | null>(null);
  console.log(roundStats);
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const [fundResult, transactionsResult] = await Promise.all([
          getFundByAddress({ address: id }),
          getFundTransactions({ fundAddress: id }),
        ]);

        setFund(fundResult);
        setTransactions(transactionsResult);
      } catch (error) {
        console.error('Error fetching fund details:', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    async function fetchRoundStats() {
      try {
        // Fetch transactions for the specific fund
        const fundTransactions = await getFundTransactions({
          fundAddress: id,
        });

        // Calculate round stats for this specific fund
        const calculatedRoundStats = calculateRoundStats([fundTransactions]);

        // Update round stats state
        setRoundStats({
          totalInRound: calculatedRoundStats.totalInRound,
          matchingPool: calculatedRoundStats.matchingPool,
          contributionsTotal: calculatedRoundStats.contributionsTotal,
          contributorsCount: calculatedRoundStats.contributorsCount,
        });
      } catch (error) {
        console.error('Error fetching round statistics:', error);
      }
    }

    if (id) {
      fetchRoundStats();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-900">
            Loading fund details...
          </h2>
        </div>
      </div>
    );
  }

  if (!fund) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Fund not found
          </h2>
          <Link to="/funds" className="text-primary-600 hover:text-primary-700">
            Browse other funds
          </Link>
        </div>
      </div>
    );
  }

  console.log(fund);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link
              to="/funds"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Funds
            </Link>
            <div className="text-gray-300">|</div>
            <Breadcrumbs />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        {/* Clean Hero Image Section */}
        <div className="h-[600px] overflow-hidden relative">
          <img
            src={fund.image}
            alt={fund.organizationName}
            className="w-full h-full object-cover"
          />
          {/* Refined overlay with primary color influence */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-primary-900/10" />
        </div>

        {/* Content Section */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-8 pb-24">
            {/* Main Content Container */}
            <div className="max-w-4xl space-y-8">
              {/* Campaign Stats */}
              <div className="flex items-center gap-8">
                {[
                  { icon: ClockIcon, text: 'Started 2 days ago' },
                  {
                    icon: UserGroupIcon,
                    text: `${transactions?.length || 0} supporters`,
                  },
                  { icon: TagIcon, text: fund.category },
                ].map((item, index) => (
                  <div key={index} className="flex items-center text-white/90">
                    <item.icon className="w-4 h-4 mr-2 text-primary-200" />
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Title & Description */}
              <div className="space-y-5">
                <h1 className="text-5xl font-bold text-white tracking-tight leading-tight">
                  {fund.organizationName}
                </h1>
                <p className="text-lg text-white/90 leading-relaxed max-w-3xl">
                  {fund.purpose.split('\n')[0].length > 120
                    ? fund.purpose.split('\n')[0].slice(0, 120) + '...'
                    : fund.purpose.split('\n')[0]}
                </p>
              </div>

              <div className="flex gap-6 pt-3">
                <div className="w-[70%]">
                  <ContributeDialog
                    fundAddress={fund.fundAddress}
                    currentAmount={fund.currentAmount}
                    targetAmount={fund.targetAmount}
                    className="bg-primary-600 hover:bg-primary-700
                             text-white font-medium 
                             py-4 px-8 rounded-xl 
                             shadow-xl shadow-primary-900/20
                             transition-all duration-300"
                  />
                </div>
                <div className="w-[30%]">
                  {wallet?.address == fund?.walletAddress &&
                    (new Date(fund.endDate) <= new Date() ? (
                      <WithdrawFundsDialog
                        fundId={fund.txHash}
                        fundAddress={fund.fundAddress}
                        currentAmount={fund.currentAmount}
                        fundOwner={wallet?.publicKeyHash}
                        walletAddress={fund.walletAddress}
                        randomHashKey={fund.randomHashKey}
                        className="bg-white/10 hover:bg-white/15
                           text-white font-medium 
                           py-4 px-8 rounded-xl
                           backdrop-blur-sm
                           transition-all duration-300
                           border border-white/10"
                      />
                    ) : (
                      <Tooltip delayDuration={300}>
                        <TooltipTrigger asChild>
                          <button
                            disabled
                            className="w-full py-2.5 px-8 rounded-xl bg-white/10 border border-white/20 text-white/50 cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2 hover:bg-white/15 hover:border-white/30"
                          >
                            <LockClosedIcon className="w-5 h-5 opacity-70 mr-2" />
                            Withdraw
                          </button>
                        </TooltipTrigger>
                        <TooltipContent
                          side="bottom"
                          className="bg-primary-900 text-white border-none shadow-xl rounded-xl px-4 py-2 text-sm"
                        >
                          <div className="flex items-center space-x-2">
                            <ClockIcon className="w-5 h-5 text-yellow-400" />
                            <span>
                              Funds can be withdrawn after{' '}
                              <span className="font-bold text-primary-200">
                                {new Date(fund.endDate).toLocaleDateString(
                                  'en-US',
                                  {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                  }
                                )}
                              </span>
                            </span>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Elegant decorative elements */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent" />
        </div>
      </div>

      {/* Progress Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-3xl">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-2xl font-bold text-gray-900">
                {formatCurrency(fund.currentAmount)}
              </span>
              <span className="text-gray-500">
                of {formatCurrency(fund.targetAmount)}
              </span>
            </div>
            <ProgressBar
              current={fund.currentAmount}
              target={fund.targetAmount}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="container mx-auto px-4 -mt-2">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Campaign Story */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Story</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <CampaignStory
                      content={fund.purpose}
                      images={[fund.image]}
                    />

                    {/* Impact Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
                      {[
                        {
                          icon: HeartIcon,
                          label: 'Lives Impacted',
                          value: '1,000+',
                        },
                        {
                          icon: ShieldCheckIcon,
                          label: 'Success Rate',
                          value: '95%',
                        },
                        {
                          icon: CheckBadgeIcon,
                          label: 'Years Active',
                          value: '5+',
                        },
                      ].map((stat, index) => (
                        <Card key={index} className="text-center p-6">
                          <stat.icon className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                          <div className="text-2xl font-bold text-gray-900 mb-1">
                            {stat.value}
                          </div>
                          <div className="text-sm text-gray-600">
                            {stat.label}
                          </div>
                        </Card>
                      ))}
                    </div>

                    {/* Transaction History */}
                    <div className="mt-12">
                      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                        Transaction History
                      </h2>
                      <TransactionList transactions={transactions} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Organization Info */}
            <div className="lg:col-span-1">
              <div className="space-y-6 sticky top-24">
                <Card className="backdrop-blur-sm bg-white/90 shadow-xl border-0 overflow-hidden">
                  {/* Organization Header */}
                  <div className="relative h-32 bg-gradient-to-r from-primary-600 to-primary-700">
                    <div className="absolute -bottom-12 left-6">
                      <div className="w-24 h-24 rounded-xl bg-white p-2 shadow-lg">
                        <img
                          src={fund.image}
                          alt={fund.organizationName}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    </div>
                  </div>

                  <CardHeader className="pt-16">
                    <CardTitle className="flex items-center justify-between">
                      <span>{fund.organizationName}</span>
                      <span className="text-sm font-normal px-3 py-1 bg-primary-50 text-primary-700 rounded-full">
                        Verified
                      </span>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-8">
                    {/* Organization Story */}
                    <div className="prose prose-sm max-w-none">
                      <OrganizeStory />
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-primary-600">
                          {formatCurrency(fund.currentAmount)}
                        </div>
                        <div className="text-sm text-gray-600">Raised</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-primary-600">
                          {transactions?.length || 0}
                        </div>
                        <div className="text-sm text-gray-600">Supporters</div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-gray-900">
                        Contact Information
                      </h4>
                      <div className="space-y-3">
                        {fund.organizationInfo?.website && (
                          <a
                            href={fund.organizationInfo.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                          >
                            <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center mr-3">
                              <GlobeAltIcon className="w-5 h-5 text-primary-600 group-hover:scale-110 transition-transform" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                Website
                              </div>
                              <div className="text-sm text-gray-500 truncate">
                                {
                                  new URL(fund.organizationInfo.website)
                                    .hostname
                                }
                              </div>
                            </div>
                          </a>
                        )}

                        {fund.organizationInfo?.socialInfo?.email && (
                          <a
                            href={`mailto:${fund.organizationInfo.socialInfo.email}`}
                            className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                          >
                            <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center mr-3">
                              <EnvelopeIcon className="w-5 h-5 text-primary-600 group-hover:scale-110 transition-transform" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                Email
                              </div>
                              <div className="text-sm text-gray-500 truncate">
                                {fund.organizationInfo.socialInfo.email}
                              </div>
                            </div>
                          </a>
                        )}

                        {fund.organizationInfo?.socialInfo?.phone && (
                          <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                            <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center mr-3">
                              <PhoneIcon className="w-5 h-5 text-primary-600 group-hover:scale-110 transition-transform" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                Phone
                              </div>
                              <div className="text-sm text-gray-500">
                                {fund.organizationInfo.socialInfo.phone}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Social Links */}
                    {fund?.organizationInfo?.socialInfo &&
                      Object.values(fund.organizationInfo.socialInfo).some(
                        Boolean
                      ) && (
                        <div className="space-y-4">
                          <h4 className="text-sm font-semibold text-gray-900">
                            Social Media
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            {Object.entries(
                              fund.organizationInfo.socialInfo
                            ).map(([platform, url]) => {
                              if (!url) return null;
                              return (
                                <a
                                  key={platform}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-4 py-2 rounded-full bg-gray-50 text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                                >
                                  <span className="capitalize">{platform}</span>
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      )}

                    {/* Fund Address */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-gray-900">
                        Fund Address
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            Contract Address
                          </span>
                          <button
                            onClick={() =>
                              navigator.clipboard.writeText(fund.fundAddress)
                            }
                            className="text-primary-600 hover:text-primary-700 text-sm"
                          >
                            Copy
                          </button>
                        </div>
                        <p className="font-mono text-xs text-gray-600 break-all">
                          {fund.fundAddress}
                        </p>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="rounded-lg bg-primary-50 p-4">
                      <div className="flex items-center text-primary-700">
                        <ShieldCheckIcon className="w-5 h-5 mr-2" />
                        <span className="text-sm font-medium">
                          Verified Organization
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-primary-600/80">
                        This organization has been verified and meets our trust
                        & safety standards
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
