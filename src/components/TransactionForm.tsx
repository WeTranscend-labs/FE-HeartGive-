import { useForm } from 'react-hook-form';
import { useFundStore } from '../store/useFundStore';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { CurrencyDollarIcon, WalletIcon } from '@heroicons/react/24/outline';

interface TransactionFormProps {
  fundId: string;
}

interface TransactionFormData {
  amount: number;
  fromWallet: string;
}

export function TransactionForm({ fundId }: TransactionFormProps) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<TransactionFormData>();
  const addTransaction = useFundStore((state) => state.addTransaction);

  const onSubmit = async (data: TransactionFormData) => {
    try {
      addTransaction({
        ...data,
        fundId,
      });
      toast.success('Contribution added successfully!');
      reset();
    } catch (error) {
      toast.error('Failed to process contribution. Please try again.');
    }
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(onSubmit)} 
      className="space-y-6"
    >
      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
          <CurrencyDollarIcon className="w-5 h-5 mr-2 text-gray-400" />
          Amount (USD)
        </label>
        <div className="mt-1 relative rounded-lg shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            step="0.01"
            {...register('amount', { 
              required: 'Amount is required',
              min: { value: 1, message: 'Minimum amount is $1' },
              valueAsNumber: true
            })}
            className="block w-full pl-7 rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500 transition-colors"
            placeholder="0.00"
          />
        </div>
        {errors.amount && (
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="mt-1 text-sm text-red-600"
          >
            {errors.amount.message}
          </motion.p>
        )}
      </div>

      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
          <WalletIcon className="w-5 h-5 mr-2 text-gray-400" />
          From Wallet
        </label>
        <input
          type="text"
          {...register('fromWallet', { 
            required: 'Wallet address is required',
            pattern: {
              value: /^0x[a-fA-F0-9]{40}$/,
              message: 'Invalid Ethereum wallet address'
            }
          })}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-colors"
          placeholder="0x..."
        />
        {errors.fromWallet && (
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="mt-1 text-sm text-red-600"
          >
            {errors.fromWallet.message}
          </motion.p>
        )}
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        {isSubmitting ? (
          <div className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </div>
        ) : (
          'Contribute'
        )}
      </motion.button>
    </motion.form>
  );
}