import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Parallax } from 'react-parallax';
import { useInView } from 'react-intersection-observer';
import {
  ShieldCheckIcon,
  CubeTransparentIcon,
  ChartBarIcon,
  UserGroupIcon,
  GlobeAltIcon,
  ServerIcon,
  LockClosedIcon,
  DocumentCheckIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    icon: CubeTransparentIcon,
    title: 'Blockchain Integration',
    description: 'Mọi giao dịch được ghi lại trên blockchain, tạo ra một bản ghi bất biến và minh bạch về tất cả các khoản đóng góp.',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Smart Contract',
    description: 'Nền tảng của chúng tôi sử dụng smart contract để tự động hóa và bảo mật việc phân phối quỹ.',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: ChartBarIcon,
    title: 'Theo dõi thời gian thực',
    description: 'Theo dõi các khoản đóng góp và sử dụng quỹ trong thời gian thực thông qua bảng điều khiển blockchain.',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: UserGroupIcon,
    title: 'Cộng đồng tin cậy',
    description: 'Xây dựng niềm tin với nhà tài trợ thông qua tính minh bạch hoàn toàn và hồ sơ tổ chức được xác minh.',
    color: 'from-orange-500 to-orange-600'
  }
];

const techFeatures = [
  {
    icon: ServerIcon,
    title: 'Hạ tầng bảo mật',
    description: 'Máy chủ hiệu suất cao với nhiều lớp bảo mật'
  },
  {
    icon: LockClosedIcon,
    title: 'Mã hóa dữ liệu',
    description: 'Mã hóa đầu cuối cho mọi giao dịch'
  },
  {
    icon: DocumentCheckIcon,
    title: 'Kiểm toán độc lập',
    description: 'Kiểm toán định kỳ bởi đơn vị uy tín'
  },
  {
    icon: GlobeAltIcon,
    title: 'Kết nối toàn cầu',
    description: 'Hỗ trợ giao dịch xuyên quốc gia'
  }
];

const partners = [
  'Trung ương Hội chữ thập đỏ Việt Nam',
  'Quỹ Bảo Trợ Trẻ Em Việt Nam',
  'Quỹ Hy vọng',
  'Quỹ từ thiện Nâng bước tuổi thơ',
  'Quỹ từ thiện Bông Sen',
  'Quỹ Trò nghèo Vùng cao',
  'Quỹ Vì Tầm Vóc Việt',
  'Quỹ từ tâm Đắk Lắk'
];

export function AboutPage() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <div className="bg-white">
      {/* Hero Section with Parallax */}
      <Parallax
        blur={0}
        bgImage="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80"
        bgImageAlt="Technology Background"
        strength={200}
        className="relative"
      >
        <div className="relative h-[60vh] flex items-center">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Về VolunteerFund
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Nền tảng gây quỹ cộng đồng tiên phong ứng dụng công nghệ blockchain, 
                đảm bảo tính minh bạch và an toàn tuyệt đối cho mọi hoạt động từ thiện.
              </p>
            </motion.div>
          </div>
        </div>
      </Parallax>

      {/* Mission Statement */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Sứ mệnh của chúng tôi
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              VolunteerFund là nền tảng gây quỹ cộng đồng tiên phong kết hợp sức mạnh của 
              cộng đồng với công nghệ blockchain. Chúng tôi tự hào được công nhận là Top 3 
              Giải pháp Chuyển đổi số xuất sắc cho các dự án cộng đồng tại Viet Solutions 2022 
              và nhận giải thưởng Chiến dịch Marketing vì sự phát triển bền vững tại 
              Marketing for Development Awards 2022.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blockchain Features */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Công nghệ Blockchain
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ứng dụng công nghệ blockchain tiên tiến để đảm bảo tính minh bạch và 
              an toàn cho mọi giao dịch
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${feature.color}`} />
                <div className="p-6">
                  <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Nền tảng công nghệ
              </h2>
              <p className="text-xl text-gray-600">
                Được hỗ trợ bởi các đối tác công nghệ hàng đầu
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {techFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Đối tác tin cậy
            </h2>
            <p className="text-xl text-gray-600">
              Được tin tưởng bởi các tổ chức uy tín
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow"
              >
                <p className="font-medium text-gray-900">{partner}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Sẵn sàng tạo nên sự thay đổi?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Hãy cùng chúng tôi xây dựng một cộng đồng minh bạch và đáng tin cậy
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-primary-600 bg-white hover:bg-primary-50 transition-colors"
              >
                Bắt đầu gây quỹ
              </Link>
              <Link
                to="/funds"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-white border-2 border-white hover:bg-white/10 transition-colors"
              >
                Khám phá các quỹ
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}