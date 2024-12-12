import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useFundStore } from '../store/useFundStore';
import { TransactionList } from '../components/TransactionList';
import { ContributeDialog } from '../components/ContributeDialog';
import { ProgressBar } from '../components/ProgressBar';
import { formatCurrency } from '../utils/format';
import { formatDistanceToNow } from '../utils/date';
import { CampaignStory } from '../components/CampaignStory';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  HeartIcon,
  ShieldCheckIcon,
  CheckBadgeIcon,
  GlobeAltIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  UserGroupIcon,
  TagIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { getFundByAddress } from '@/services/blockfrost.service';

export function FundDetailsPage() {
  const { id } = useParams<string>();
  const fund = useFundStore((state) => state.getFundById(id!));
  const transactions = useFundStore((state) => state.getFundTransactions(id!));

  useEffect(() => {
    (async () => {
      const temp = await getFundByAddress({ address: id });

      console.log(temp);
    })();
  }, []);

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
        <div className="h-[500px] overflow-hidden">
          <img
            src={fund.image}
            alt={fund.organizationName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <div className="container mx-auto px-4 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl"
            >
              <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm mb-6">
                <span className="flex items-center">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  Started {formatDistanceToNow(fund.startDate)} ago
                </span>
                <span className="flex items-center">
                  <UserGroupIcon className="w-4 h-4 mr-2" />
                  {/* {fund.supporterCount} supporters */}
                </span>
                <span className="flex items-center">
                  <TagIcon className="w-4 h-4 mr-2" />
                  {fund.category}
                </span>
              </div>

              <h1 className="text-5xl font-bold text-white mb-6">
                {fund.organizationName}
              </h1>

              <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
                {fund.purpose.split('\n')[0]}
              </p>

              <div className="mt-8">
                <ContributeDialog
                  fundId={fund.id}
                  currentAmount={fund.currentAmount}
                  targetAmount={fund.targetAmount}
                />
              </div>
            </motion.div>
          </div>
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
        <div className="max-w-7xl mx-auto">
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
                      images={[fund.imageUrl]}
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
                <Card>
                  <CardHeader>
                    <CardTitle>Organization Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <p className="text-gray-600 text-sm whitespace-pre-wrap">
                        {fund.organizationInfo.description}
                      </p>

                      <div className="pt-4 border-t border-gray-200 space-y-4">
                        {fund.organizationInfo.website && (
                          <a
                            href={fund.organizationInfo.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-sm text-primary-600 hover:text-primary-700"
                          >
                            <GlobeAltIcon className="w-5 h-5 text-gray-400 mr-3" />
                            Website
                          </a>
                        )}

                        <a
                          href={`mailto:${fund.organizationInfo.email}`}
                          className="flex items-center text-sm text-primary-600 hover:text-primary-700"
                        >
                          <EnvelopeIcon className="w-5 h-5 text-gray-400 mr-3" />
                          {fund.organizationInfo.email}
                        </a>

                        {fund.organizationInfo.phone && (
                          <p className="flex items-center text-sm text-gray-600">
                            <PhoneIcon className="w-5 h-5 text-gray-400 mr-3" />
                            {fund.organizationInfo.phone}
                          </p>
                        )}

                        {fund.organizationInfo.address && (
                          <p className="flex items-center text-sm text-gray-600">
                            <MapPinIcon className="w-5 h-5 text-gray-400 mr-3" />
                            {fund.organizationInfo.address}
                          </p>
                        )}
                      </div>

                      {/* Social Links */}
                      {fund.organizationInfo.socialLinks &&
                        Object.values(fund.organizationInfo.socialLinks).some(
                          Boolean
                        ) && (
                          <div className="pt-4 border-t border-gray-200">
                            <h4 className="text-sm font-medium text-gray-900 mb-3">
                              Follow Us
                            </h4>
                            <div className="flex flex-wrap gap-4">
                              {Object.entries(
                                fund.organizationInfo.socialLinks
                              ).map(([platform, url]) => {
                                if (!url) return null;
                                return (
                                  <a
                                    key={platform}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-500 hover:text-primary-600 transition-colors"
                                  >
                                    <span className="capitalize">
                                      {platform}
                                    </span>
                                  </a>
                                );
                              })}
                            </div>
                          </div>
                        )}
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-500 mb-2">
                        Wallet Address:
                      </p>
                      <p className="font-mono text-xs bg-gray-50 p-3 rounded break-all">
                        {fund.walletAddress}
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
