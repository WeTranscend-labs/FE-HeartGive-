import { useNavigate } from 'react-router-dom';
import { FundForm } from '../components/FundForm';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export function RegisterPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back
          </motion.button>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 mb-8"
          >
            Register New Fund
          </motion.h1>

          <FundForm />
        </div>
      </div>
    </div>
  );
}