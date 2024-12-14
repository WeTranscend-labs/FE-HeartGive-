import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { ScrollProgress } from '@/components/ScrollProgress';
import WalletModalRoot from '@/components/wallet/WalletModalRoot';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
}

export function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <div className="relative min-h-screen">
      <Toaster />
      <ScrollProgress />
      <Navbar />

      <div className="sticky top-4 h-0 right-12 z-50 flex justify-end pr-4">
        {/* <ConnectWallet /> */}
      </div>

      {/* Main Content */}

      <WalletModalRoot />

      <AnimatePresence mode="wait">
        <motion.main
          key="main"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={cn('min-h-[calc(100vh-4rem)] pt-20 pb-16', className)}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
}
