import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ShieldCheckIcon,
  CubeTransparentIcon,
  ChartBarIcon,
  UserGroupIcon,
  GlobeAltIcon,
  ServerIcon,
  LockClosedIcon,
  DocumentCheckIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    icon: CubeTransparentIcon,
    title: 'Cardano Blockchain',
    description: 'Built on Cardano for maximum security and transparency. Every transaction is permanently recorded and verifiable.',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Smart Contracts',
    description: 'Automated fund distribution through secure Cardano smart contracts.',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: ChartBarIcon,
    title: 'Real-time Tracking',
    description: 'Monitor contributions and fund usage in real-time through our blockchain dashboard.',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: UserGroupIcon,
    title: 'Trusted Community',
    description: 'Build donor trust through complete transparency and verified organizations.',
    color: 'from-orange-500 to-orange-600'
  }
];

const stats = [
  { number: '50K+', label: 'Active Donors' },
  { number: '₳1.2M+', label: 'Total Contributions' },
  { number: '100+', label: 'Successful Projects' },
  { number: '95%', label: 'Success Rate' }
];

const partners = [
  'Red Cross Vietnam',
  'UNICEF Vietnam',
  'Save the Children',
  'World Vision',
  'Habitat for Humanity',
  'Room to Read',
  'Operation Smile',
  'Blue Dragon'
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80"
            alt="Hero"
            className="w-full h-full object-cover"
          />

        </div>

        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Empowering Change Through Technology
              </h1>
              <p className="text-xl text-primary-100 leading-relaxed mb-8">
                HeartGive is Vietnam's first blockchain-powered fundraising platform,
                bringing transparency and trust to charitable giving.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center px-6 py-3 rounded-lg text-primary-900 bg-primary-100 hover:bg-primary-200 transition-colors"
              >
                Start Making Impact
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-primary-900 to-primary-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-primary-200">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose HeartGive?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine the power of Cardano blockchain with a user-friendly platform
              to create the most transparent and efficient fundraising solution.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className={`h-2 bg-gradient-to-r ${feature.color}`} />
                <div className="p-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl flex items-center justify-center mb-6">
                    <feature.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Partners
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Working with trusted organizations to create lasting impact
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <p className="font-medium text-gray-900">{partner}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary-600 to-primary-700">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Join us in creating positive change through transparent fundraising
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-primary-600 hover:bg-primary-50 transition-colors"
              >
                Start a Campaign
              </Link>
              <Link
                to="/funds"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-white text-white hover:bg-white/10 transition-colors"
              >
                Browse Campaigns
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}