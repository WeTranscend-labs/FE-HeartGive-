import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ShieldCheckIcon,
  CodeBracketIcon,
  ChartBarIcon,
  SparklesIcon,
  GlobeAltIcon,
  ServerIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    icon: ServerIcon,
    title: 'Decentralized Infrastructure',
    description: 'Cutting-edge blockchain technology ensuring secure, transparent, and efficient fundraising.',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Smart Contract Governance',
    description: 'Automated fund management with programmable, tamper-proof smart contracts.',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: ChartBarIcon,
    title: 'Real-time Analytics',
    description: 'Comprehensive dashboard providing instant insights and impact tracking.',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: RocketLaunchIcon,
    title: 'Rapid Innovation',
    description: 'Accelerating social impact through technology-driven fundraising solutions.',
    color: 'from-orange-500 to-orange-600'
  }
];

const stats = [
  { number: '100+', label: 'Tech Innovations' },
  { number: '₳5M+', label: 'Total Funding' },
  { number: '50+', label: 'Global Partners' },
  { number: '99%', label: 'Platform Reliability' }
];

const technologies = [
  'Cardano Blockchain',
  'Smart Contracts',
  'Decentralized Finance',
  'Web3 Technologies',
  'Machine Learning',
  'Cloud Infrastructure',
  'AI-Powered Analytics',
  'Secure Encryption'
];

export  function AboutPage() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 to-primary-700 text-white">
        <div className="container mx-auto px-4 py-24 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center bg-primary-600/30 px-4 py-2 rounded-full">
              <SparklesIcon className="w-5 h-5 mr-2 text-primary-300" />
              <span className="text-sm text-primary-100">
                Next-Generation Fundraising Platform
              </span>
            </div>
            <h1 className="text-5xl font-bold leading-tight">
              Transforming Social Impact with Blockchain Technology
            </h1>
            <p className="text-xl text-primary-100 opacity-80">
              We leverage cutting-edge blockchain solutions to create transparent,
              efficient, and secure fundraising ecosystems.
            </p>
            <div className="flex space-x-4">
              <Link
                to="/solutions"
                className="bg-white text-primary-800 px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors flex items-center"
              >
                Explore Solutions
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/contact"
                className="border border-white/30 text-white px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-white/10 rounded-2xl p-6">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/5 rounded-xl p-4 text-center"
                  >
                    <div className="text-3xl font-bold text-white">{stat.number}</div>
                    <div className="text-sm text-primary-200">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Technological Edge
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Innovative solutions that redefine fundraising through blockchain and advanced technologies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-xl transition-all group"
              >
                <div className="bg-primary-50 rounded-xl p-3 mb-4 inline-block">
                  <feature.icon className="w-7 h-7 text-primary-600 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Technologies We Leverage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cutting-edge technologies powering our innovative fundraising platform
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all"
              >
                <div className="text-primary-600 font-semibold">{tech}</div>
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
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center bg-white/20 px-4 py-2 rounded-full mb-4">
              <LightBulbIcon className="w-5 h-5 mr-2 text-white" />
              <span className="text-sm text-white">
                Join the Future of Fundraising
              </span>
            </div>
            <h2 className="text-5xl font-bold text-white mb-6">
              Revolutionize Your Fundraising Strategy
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Unlock the power of blockchain technology to create transparent,
              efficient, and impactful fundraising campaigns.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/demo"
                className="bg-white text-primary-700 px-8 py-4 rounded-lg hover:bg-primary-50 transition-colors flex items-center"
              >
                Request a Demo
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Partners Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from organizations that have transformed their fundraising approach
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "A game-changing platform that brings unprecedented transparency to our fundraising efforts.",
                name: "Sarah Johnson",
                role: "CEO, Global Impact Foundation",
                avatar: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                quote: "The blockchain technology has completely revolutionized how we track and manage donations.",
                name: "Michael Chen",
                role: "Director, Tech for Good",
                avatar: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                quote: "Incredible ease of use and the level of trust it builds with our donors is unmatched.",
                name: "Elena Rodriguez",
                role: "Fundraising Coordinator, Community Builders",
                avatar: "https://randomuser.me/api/portraits/women/65.jpg"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all"
              >
                <div className="text-primary-600 text-5xl mb-4 opacity-30">"</div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">HeartGive</h3>
              <p className="text-gray-400">
                Transforming social impact through blockchain technology
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-primary-300">Solutions</h4>
              <ul className="space-y-2">
                {[
                  "Fundraising Platform",
                  "Smart Contract Solutions",
                  "Impact Tracking",
                  "Blockchain Consulting"
                ].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-primary-300">Company</h4>
              <ul className="space-y-2">
                {[
                  "About Us",
                  "Careers",
                  "Press",
                  "Contact"
                ].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-primary-300">Connect</h4>
              <div className="flex space-x-4">
                {[
                  { icon: GlobeAltIcon, link: "#" },
                  { icon: CodeBracketIcon, link: "#" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-500">
              © {new Date().getFullYear()} HeartGive. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AboutPage;