import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useFundStore } from '../store/useFundStore';
import { FundCard } from '../components/FundCard';
import { CategoryFilter } from '../components/CategoryFilter';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Fund, FundCategory } from '../types/fund';
import {
  MagnifyingGlassIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { getFunds } from '@/services/blockfrost.service';

type FundStatus = 'active' | 'completed' | 'all';

export default function HomePage() {
  // const funds = useFundStore((state) => state.funds);
  const [selectedCategory, setSelectedCategory] = useState<
    FundCategory | 'All'
  >('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'progress' | 'amount'>(
    'recent'
  );
  const [status, setStatus] = useState<FundStatus>('active');
  const [funds, setFunds] = useState<Fund[]>(null!);

  useEffect(() => {
    fetchFunds();
  }, []);

  const fetchFunds = async () => {
    const funds = await getFunds({ page: 1, pageSize: 1 });

    setFunds(funds);
  };

  const filteredFunds: Fund[] = funds?.filter((fund) => {
    const matchesCategory =
      selectedCategory === 'All' || fund.category === selectedCategory;
    const matchesSearch =
      fund.organizationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fund.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fund?.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesStatus =
      status === 'all' ||
      (status === 'completed'
        ? fund.currentAmount >= fund.targetAmount
        : status === 'active'
        ? fund.currentAmount < fund.targetAmount
        : true);

    return matchesCategory && matchesSearch && matchesStatus;
  });
  // .sort((a: Fund, b: Fund) => {
  //   switch (sortBy) {
  //     case 'progress':
  //       return (
  //         b.currentAmount / b.targetAmount - a.currentAmount / a.targetAmount
  //       );
  //     case 'amount':
  //       return b.currentAmount - a.currentAmount;
  //     default:
  //       return b.createdAt.getTime() - a.createdAt.getTime();
  //   }
  // });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs />
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
        <div className="container mx-auto px-4">
          <div className="py-16 md:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Khám phá các Quỹ Tình nguyện
              </h1>
              <p className="text-xl text-primary-100 mb-8">
                Tìm kiếm và hỗ trợ các dự án có ý nghĩa, tạo nên sự thay đổi
                tích cực trong cộng đồng
              </p>
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên tổ chức, mục đích hoặc từ khóa..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-transparent focus:border-primary-300 focus:ring-4 focus:ring-primary-100 bg-white shadow-lg text-gray-900 placeholder-gray-500"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        {/* Filters Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="space-y-6">
            {/* Top Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <ChartBarIcon className="w-5 h-5 text-gray-400" />
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(
                        e.target.value as 'recent' | 'progress' | 'amount'
                      )
                    }
                    className="rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value="recent">Mới nhất</option>
                    <option value="progress">Tiến độ</option>
                    <option value="amount">Số tiền quyên góp</option>
                  </select>
                </div>
              </div>
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors shadow-sm"
              >
                Bắt đầu gây quỹ
              </Link>
            </div>

            {/* Status Tabs */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setStatus('active')}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  status === 'active'
                    ? 'bg-primary-100 text-primary-800'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ClockIcon className="w-5 h-5 mr-2" />
                Đang gây quỹ
              </button>
              <button
                onClick={() => setStatus('completed')}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <CheckCircleIcon className="w-5 h-5 mr-2" />
                Đã hoàn thành
              </button>
              <button
                onClick={() => setStatus('all')}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  status === 'all'
                    ? 'bg-gray-100 text-gray-800'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Tất cả
              </button>
            </div>

            {/* Category Filter */}
            <div className="border-t pt-4">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>
          </div>
        </motion.div>

        {/* Results Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {filteredFunds?.length}{' '}
              {filteredFunds?.length === 1 ? 'Quỹ' : 'Quỹ'} phù hợp
            </h2>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setSortBy('recent');
                setStatus('active');
              }}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
            >
              <ArrowPathIcon className="w-5 h-5" />
              <span>Đặt lại</span>
            </button>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredFunds?.map((fund) => (
              <motion.div
                key={fund?.walletAddress}
                variants={itemVariants}
                transition={{ duration: 0.5 }}
              >
                <Link to={`/fund/${fund?.fundAddress}`}>
                  <FundCard fund={fund} />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {filteredFunds?.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="bg-white rounded-xl shadow-sm p-8">
                <img
                  src="https://illustrations.popsy.co/gray/question-mark.svg"
                  alt="No results"
                  className="w-48 h-48 mx-auto mb-6"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Không tìm thấy quỹ nào
                </h3>
                <p className="text-gray-600 mb-6">
                  {funds.length === 0
                    ? 'Chưa có quỹ nào được đăng ký. Hãy là người đầu tiên tạo quỹ!'
                    : 'Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm để tìm thấy quỹ phù hợp.'}
                </p>
                <Link
                  to="/register"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                >
                  Tạo Quỹ Mới
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
