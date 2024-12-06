import { FundCategory } from '../types/fund';
import { motion } from 'framer-motion';

interface CategoryFilterProps {
  selectedCategory: FundCategory | 'All';
  onSelectCategory: (category: FundCategory | 'All') => void;
}

const CATEGORIES: (FundCategory | 'All')[] = [
  'All',
  'Education',
  'Healthcare',
  'Environment',
  'Poverty',
  'Disaster Relief',
  'Animal Welfare',
  'Arts & Culture',
  'Community Development',
  'Children & Youth',
  'Elderly Care'
];

export function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex space-x-2 min-w-max">
        {CATEGORIES.map((category) => (
          <motion.button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </div>
    </div>
  );
}