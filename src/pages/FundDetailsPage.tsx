import { useParams, Link } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import { motion } from 'framer-motion';
import { useFundStore } from '../store/useFundStore';
import { TransactionList } from '../components/TransactionList';
import { TransactionForm } from '../components/TransactionForm';
import { ProgressBar } from '../components/ProgressBar';
import { formatCurrency } from '../utils/format';
import { formatDistanceToNow } from '../utils/date';
import { CampaignStory } from '../components/CampaignStory';
import { Breadcrumbs } from '../components/Breadcrumbs';
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
} from '@heroicons/react/24/outline';

const campaignImages = [
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80'
];

export function FundDetailsPage() {
  const { id } = useParams();
  const fund = useFundStore((state) => state.getFundById(id!));
  const transactions = useFundStore((state) => state.getFundTransactions(id!));

  if (!fund) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Fund not found</h2>
          <Link
            to="/funds"
            className="text-primary-600 hover:text-primary-700"
          >
            Browse other funds
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs />
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="h-96 overflow-hidden">
          <img
            src={fund.imageUrl}
            alt={fund.organizationName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 text-white/80 text-sm mb-4">
                <ClockIcon className="w-4 h-4" />
                <span>Started {formatDistanceToNow(fund.createdAt)} ago</span>
                <span className="mx-2">•</span>
                <UserGroupIcon className="w-4 h-4" />
                <span>{fund.supporterCount} supporters</span>
                <span className="mx-2">•</span>
                <TagIcon className="w-4 h-4" />
                <span>{fund.category}</span>
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-4">
                {fund.organizationName}
              </h1>
              
              <p className="text-xl text-white/90 max-w-3xl">
                {fund.purpose.split('\n')[0]}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Fund Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <Tab.Group>
                <Tab.List className="flex border-b">
                  <Tab className={({ selected }) => `
                    flex-1 py-4 px-6 text-sm font-medium focus:outline-none
                    ${selected 
                      ? 'text-primary-600 border-b-2 border-primary-600' 
                      : 'text-gray-500 hover:text-gray-700'
                    }
                  `}>
                    Câu chuyện
                  </Tab>
                  <Tab className={({ selected }) => `
                    flex-1 py-4 px-6 text-sm font-medium focus:outline-none
                    ${selected 
                      ? 'text-primary-600 border-b-2 border-primary-600' 
                      : 'text-gray-500 hover:text-gray-700'
                    }
                  `}>
                    Lịch sử ủng hộ
                  </Tab>
                </Tab.List>

                <Tab.Panels>
                  {/* Story Tab */}
                  <Tab.Panel className="p-6">
                    <div className="prose max-w-none">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Campaign Story */}
                        <div className="lg:col-span-2">
                          <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Về chiến dịch này
                          </h2>
                          <CampaignStory 
                            content={fund.purpose}
                            images={campaignImages}
                          />

                          {/* Impact Stats */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                            {[
                              { icon: HeartIcon, label: 'Lives Impacted', value: '1,000+' },
                              { icon: ShieldCheckIcon, label: 'Success Rate', value: '95%' },
                              { icon: CheckBadgeIcon, label: 'Years Active', value: '5+' }
                            ].map((stat, index) => (
                              <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                                <stat.icon className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                                <div className="text-sm text-gray-600">{stat.label}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Organization Info */}
                        <div className="lg:col-span-1">
                          <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                              Thông tin tổ chức
                            </h3>
                            <div className="space-y-4">
                              <p className="text-gray-600 text-sm whitespace-pre-wrap">
                                {fund.organizationInfo.description}
                              </p>

                              <div className="pt-4 border-t border-gray-200 space-y-3">
                                {fund.organizationInfo.website && (
                                  <p className="flex items-center text-sm">
                                    <GlobeAltIcon className="w-5 h-5 text-gray-400 mr-3" />
                                    <a 
                                      href={fund.organizationInfo.website}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-primary-600 hover:text-primary-700"
                                    >
                                      {fund.organizationInfo.website}
                                    </a>
                                  </p>
                                )}
                                
                                <p className="flex items-center text-sm">
                                  <EnvelopeIcon className="w-5 h-5 text-gray-400 mr-3" />
                                  <a 
                                    href={`mailto:${fund.organizationInfo.email}`}
                                    className="text-primary-600 hover:text-primary-700"
                                  >
                                    {fund.organizationInfo.email}
                                  </a>
                                </p>

                                {fund.organizationInfo.phone && (
                                  <p className="flex items-center text-sm">
                                    <PhoneIcon className="w-5 h-5 text-gray-400 mr-3" />
                                    <span className="text-gray-600">{fund.organizationInfo.phone}</span>
                                  </p>
                                )}

                                {fund.organizationInfo.address && (
                                  <p className="flex items-center text-sm">
                                    <MapPinIcon className="w-5 h-5 text-gray-400 mr-3" />
                                    <span className="text-gray-600">{fund.organizationInfo.address}</span>
                                  </p>
                                )}
                              </div>

                              {/* Social Links */}
                              {fund.organizationInfo.socialLinks && Object.values(fund.organizationInfo.socialLinks).some(Boolean) && (
                                <div className="pt-4 border-t border-gray-200">
                                  <h4 className="text-sm font-medium text-gray-900 mb-3">Follow Us</h4>
                                  <div className="flex space-x-4">
                                    {Object.entries(fund.organizationInfo.socialLinks).map(([platform, url]) => {
                                      if (!url) return null;
                                      return (
                                        <a
                                          key={platform}
                                          href={url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-gray-400 hover:text-gray-500"
                                        >
                                          <span className="capitalize">{platform}</span>
                                        </a>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tab.Panel>

                  {/* Transactions Tab */}
                  <Tab.Panel className="p-6">
                    <TransactionList transactions={transactions} />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>

          {/* Right Column - Contribution Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <div className="mb-6">
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

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Ủng hộ chiến dịch
                </h3>
                <TransactionForm fundId={fund.id} />
              </div>

              <div className="text-sm text-gray-500">
                <p className="mb-2">
                  Wallet Address của tổ chức:
                </p>
                <p className="font-mono bg-gray-50 p-3 rounded-lg break-all">
                  {fund.walletAddress}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}