import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ParallaxSection } from '../components/ParallaxSection';
import {
  HeartIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';
import { useFundStore } from '../store/useFundStore';
import { FundCard } from '../components/FundCard';
import { useEffect, useState } from 'react';
import { getFunds, getVerifiedFunds } from '@/services/blockfrost.service';
import { Fund } from '@/types/fund';

export function LandingPage() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const [funds, setFunds] = useState<Fund[]>([]);

  useEffect(() => {
    fetchFunds();
  }, []);

  const fetchFunds = async () => {

    const funds: Fund[] = (await getFunds({ page: 1, pageSize: 3 })).funds;


    setFunds(funds);
  };

  const [featuresRef, featuresInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [campaignsRef, campaignsInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="relative h-full overflow-hidden">
          <motion.div style={{ y }} className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80"
              alt="Hero"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            style={{ opacity }}
            className="absolute inset-0 flex items-center bg-gradient-to-r from-black/70 to-transparent"
          >
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl"
              >
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                  Online Crowdfunding Platform
                </h1>
                <p className="text-xl text-white/90 mb-8">
                  Fundraising projects from verified organizations
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                  >
                    Start Fundraising
                  </Link>
                  <Link
                    to="/funds"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-white border-2 border-white hover:bg-white/20 transition-colors"
                  >
                    Explore Funds
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Campaigns Section */}
      <section ref={campaignsRef} className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={campaignsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Campaigns
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover and support projects making a positive impact in the community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {funds.slice(0, 3).map((fund, index) => (
              <motion.div
                key={fund.txHash}
                initial={{ opacity: 0, y: 20 }}
                animate={campaignsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/fund/${fund.fundAddress}`}>
                  <FundCard fund={fund} />
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={campaignsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              to="/funds"
              className="inline-flex items-center px-6 py-3 rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors"
            >
              View All Campaigns
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600">
              A transparent and reliable fundraising platform
            </p>
          </div>

          <div
            ref={featuresRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: HeartIcon,
                title: 'Trustworthy',
                description: 'Verified and licensed organizations',
              },
              {
                icon: ShieldCheckIcon,
                title: 'Secure',
                description: 'Secure transactions and information',
              },
              {
                icon: UserGroupIcon,
                title: 'Community',
                description: 'Connecting donors with organizations',
              },
              {
                icon: GlobeAltIcon,
                title: 'Transparent',
                description: 'Track funds in real-time',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-6">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax Impact Section */}
      <ParallaxSection
        imageUrl="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80"
        title="Make a Real Impact"
        description="Support meaningful projects and track your impact in real-time"
      >
        <Link
          to="/funds"
          className="inline-flex items-center px-6 py-3 rounded-lg text-white border-2 border-white hover:bg-white/20 transition-colors"
        >
          View Campaigns
        </Link>
      </ParallaxSection>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: '50K+', label: 'Donors' },
              { number: '$1.2M+', label: 'Raised' },
              { number: '100+', label: 'Successful Projects' },

            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-24">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
        </div>

        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to make a difference?
            </h2>
            <p className="text-xl text-white/90 mb-12">
              Start your fundraising campaign today
            </p>

            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 rounded-xl text-lg font-semibold bg-white text-primary-600 hover:bg-primary-50 transition-colors"
            >
              Start Fundraising
            </Link>
          </motion.div>
        </div>

      </section>
    </div>
  );
}

export default LandingPage;
