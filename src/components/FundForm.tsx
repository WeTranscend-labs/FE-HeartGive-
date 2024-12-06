import { useForm, FormProvider } from 'react-hook-form';
import { useFundStore } from '../store/useFundStore';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  BuildingOfficeIcon, 
  DocumentTextIcon, 
  CurrencyDollarIcon,
  WalletIcon,
  TagIcon,
  PhotoIcon,
  ArrowPathIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { FundCategory } from '../types/fund';
import { TagInput } from './TagInput';
import { ImageUpload } from './ImageUpload';
import { getCategoryImage } from '../utils/categoryImage';
import { OrganizationInfoForm } from './OrganizationInfoForm';

interface FundFormData {
  organizationName: string;
  organizationInfo: {
    description: string;
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
  };
  purpose: string;
  targetAmount: number;
  walletAddress: string;
  category: FundCategory;
  tags: string[];
  imageUrl: string;
}

export function FundForm() {
  const navigate = useNavigate();
  const addFund = useFundStore((state) => state.addFund);
  
  const methods = useForm<FundFormData>({
    defaultValues: {
      tags: [],
      organizationInfo: {
        socialLinks: {}
      }
    }
  });

  const { register, handleSubmit, control, watch, formState: { errors, isSubmitting } } = methods;

  const onSubmit = async (data: FundFormData) => {
    try {
      const imageUrl = data.imageUrl || getCategoryImage(data.category);
      
      const fund = addFund({
        ...data,
        imageUrl,
        supporterCount: 0,
      });
      
      toast.success('Fund registered successfully!');
      navigate(`/fund/${fund.id}`);
    } catch (error) {
      toast.error('Failed to register fund. Please try again.');
    }
  };

  return (
    <FormProvider {...methods}>
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8"
      >
        {/* Organization Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 hover:border-primary-100 transition-colors"
        >
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
              <BuildingOfficeIcon className="w-6 h-6 text-primary-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Organization Details
            </h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organization Name
              </label>
              <input
                type="text"
                {...register('organizationName', {
                  required: 'Organization name is required',
                  minLength: { value: 3, message: 'Name must be at least 3 characters' }
                })}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50 transition-colors"
                placeholder="Enter organization name"
              />
              {errors.organizationName && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-600"
                >
                  {errors.organizationName.message}
                </motion.p>
              )}
            </div>

            <OrganizationInfoForm />
          </div>
        </motion.div>

        {/* Campaign Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 hover:border-primary-100 transition-colors"
        >
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
              <DocumentTextIcon className="w-6 h-6 text-primary-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Campaign Details
            </h2>
          </div>
          
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Purpose
              </label>
              <textarea
                {...register('purpose', {
                  required: 'Purpose is required',
                  minLength: { value: 50, message: 'Purpose must be at least 50 characters' }
                })}
                rows={4}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50 transition-colors"
                placeholder="Describe the purpose of your fundraising campaign..."
              />
              {errors.purpose && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-600"
                >
                  {errors.purpose.message}
                </motion.p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Amount (USD)
              </label>
              <div className="mt-1 relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CurrencyDollarIcon className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  step="0.01"
                  {...register('targetAmount', {
                    required: 'Target amount is required',
                    min: { value: 100, message: 'Minimum amount is $100' },
                    valueAsNumber: true
                  })}
                  className="block w-full pl-10 rounded-lg border-gray-300 focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50 transition-colors"
                  placeholder="0.00"
                />
              </div>
              {errors.targetAmount && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-600"
                >
                  {errors.targetAmount.message}
                </motion.p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Wallet Address
              </label>
              <div className="mt-1 relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <WalletIcon className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  {...register('walletAddress', {
                    required: 'Wallet address is required',
                    pattern: {
                      value: /^0x[a-fA-F0-9]{40}$/,
                      message: 'Invalid Ethereum wallet address'
                    }
                  })}
                  className="block w-full pl-10 rounded-lg border-gray-300 focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50 transition-colors"
                  placeholder="0x..."
                />
              </div>
              {errors.walletAddress && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-600"
                >
                  {errors.walletAddress.message}
                </motion.p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <div className="mt-1 relative rounded-lg shadow-sm">
                <select
                  {...register('category', { required: 'Category is required' })}
                  className="block w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50 transition-colors"
                >
                  <option value="">Select a category</option>
                  <option value="Education">Education</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Environment">Environment</option>
                  <option value="Poverty">Poverty</option>
                  <option value="Disaster Relief">Disaster Relief</option>
                  <option value="Animal Welfare">Animal Welfare</option>
                  <option value="Arts & Culture">Arts & Culture</option>
                  <option value="Community Development">Community Development</option>
                  <option value="Children & Youth">Children & Youth</option>
                  <option value="Elderly Care">Elderly Care</option>
                </select>
              </div>
              {errors.category && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-600"
                >
                  {errors.category.message}
                </motion.p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <TagInput
                value={watch('tags')}
                onChange={(tags) => methods.setValue('tags', tags)}
                placeholder="Add relevant tags..."
              />
              <p className="mt-2 text-sm text-gray-500">
                Press Enter or comma to add tags
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Image
              </label>
              <ImageUpload
                value={watch('imageUrl')}
                onImageSelect={(url) => methods.setValue('imageUrl', url)}
              />
              <p className="mt-2 text-sm text-gray-500">
                Add a compelling image that represents your campaign
              </p>
            </div>
          </div>
        </motion.div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl text-base font-medium text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
        >
          {isSubmitting ? (
            <>
              <ArrowPathIcon className="animate-spin -ml-1 mr-3 h-5 w-5" />
              Processing...
            </>
          ) : (
            <>
              <CheckCircleIcon className="w-5 h-5 mr-2" />
              Register Fund
            </>
          )}
        </motion.button>
      </motion.form>
    </FormProvider>
  );
}