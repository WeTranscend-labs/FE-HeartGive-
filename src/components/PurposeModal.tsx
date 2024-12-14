import { AnimatePresence, motion } from 'framer-motion';
import { FileText, Target, X } from 'lucide-react';

// Modal Component
export const PurposeModal = ({ fund, onClose }: any) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-blue-100/50 
            p-8 max-h-[90vh] overflow-y-auto relative transform transition-all 
            ring-4 ring-blue-50/50"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 bg-blue-50 text-blue-700 
              rounded-full p-2 hover:bg-blue-100 transition-all 
              shadow-md hover:shadow-lg group"
          >
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
          </button>

          <div className="flex items-center mb-6 pb-4 border-b-2 border-blue-100">
            <FileText
              className="mr-4 w-9 h-9 text-blue-600 
              bg-blue-50 rounded-full p-2 shadow-md"
            />
            <h3
              className="font-bold text-2xl text-blue-900 
              bg-gradient-to-r from-blue-600 to-blue-800 
              bg-clip-text text-transparent"
            >
              Complete Fund Purpose
            </h3>
          </div>

          <div className="relative group">
            <div
              className="absolute -top-4 -left-5 text-[150px] font-bold 
              text-blue-50 opacity-30 -z-10 group-hover:text-blue-100 
              transition-all duration-300"
            >
              "
            </div>
            <p
              className="text-gray-800 text-lg leading-relaxed 
  pl-6 border-l-6 border-blue-500 italic 
  bg-blue-50/30 p-4 rounded-xl 
  whitespace-pre-wrap break-words"
            >
              {fund.purpose}
            </p>
            <div
              className="absolute -bottom-4 -right-5 text-[150px] font-bold 
              text-blue-50 opacity-30 -z-10 group-hover:text-blue-100 
              transition-all duration-300"
            >
              "
            </div>
          </div>

          <div
            className="mt-6 flex items-center space-x-3 
            border-t-2 border-blue-100 pt-4"
          >
            <Target
              className="w-6 h-6 text-blue-600 
              bg-blue-50 rounded-full p-1 shadow-md"
            />
            <span
              className="text-base text-gray-700 
              font-medium bg-gradient-to-r from-blue-500 to-blue-700 
              bg-clip-text text-transparent"
            >
              Comprehensive Objective Overview
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
