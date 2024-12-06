import { Fund } from '../types/fund';

export const mockFunds: Fund[] = [
  {
    id: '1',
    organizationName: 'Quỹ Từ thiện Nâng bước tuổi thơ',
    organizationInfo: {
      name: 'Quỹ Từ thiện Nâng bước tuổi thơ',
      description: `Nâng Bước Tuổi Thơ là tổ chức từ thiện duy nhất tại Việt Nam cung cấp chuyên môn điều trị bệnh lý & phẫu thuật đa khoa theo tiêu chuẩn quốc tế cho trẻ em dị tật bẩm sinh có hoàn cảnh khó khăn. 

Thành lập từ năm 2015, chúng tôi đã thực hiện hơn 1,000 ca phẫu thuật thành công, mang lại nụ cười và tương lai tươi sáng cho nhiều em nhỏ kém may mắn.

Với đội ngũ y bác sĩ giàu kinh nghiệm và tâm huyết, chúng tôi cam kết mang đến dịch vụ y tế chất lượng cao nhất cho các em.`,
      website: 'https://nangbuoctuoitho.org',
      email: 'contact@nangbuoctuoitho.org',
      phone: '(+84) 123-456-789',
      address: '123 Nguyễn Văn Linh, Quận 7, TP.HCM',
      socialLinks: {
        facebook: 'https://facebook.com/nangbuoctuoitho',
        twitter: 'https://twitter.com/nangbuoctuoitho'
      }
    },
    purpose: `Chương trình "Nụ Cười Tuổi Thơ 2024" hướng tới mục tiêu thực hiện 100 ca phẫu thuật miễn phí cho trẻ em dị tật bẩm sinh từ các gia đình khó khăn trên khắp Việt Nam.

HOÀN CẢNH:
Tại Việt Nam, cứ 100 trẻ sinh ra thì có khoảng 2-3 trẻ mắc dị tật bẩm sinh. Với các gia đình khó khăn, chi phí phẫu thuật chỉnh hình là một gánh nặng quá lớn, khiến nhiều em phải sống chung với dị tật, ảnh hưởng nghiêm trọng đến sự phát triển và tương lai.

GIẢI PHÁP:
Thông qua chương trình này, chúng tôi sẽ:
- Thực hiện phẫu thuật miễn phí cho 100 trẻ em
- Cung cấp dịch vụ chăm sóc hậu phẫu toàn diện
- Hỗ trợ chi phí đi lại và ăn ở cho gia đình
- Theo dõi và phục hồi chức năng sau phẫu thuật

TÁC ĐỘNG:
Mỗi ca phẫu thuật không chỉ mang lại sự thay đổi về mặt thể chất mà còn là cơ hội để các em:
- Tự tin hơn trong cuộc sống
- Hòa nhập tốt hơn với cộng đồng
- Có cơ hội phát triển toàn diện như những đứa trẻ khác
- Giảm gánh nặng tâm lý và kinh tế cho gia đình

TIẾN ĐỘ HIỆN TẠI:
- Đã thực hiện: 65 ca phẫu thuật
- Đang trong quá trình điều trị: 15 em
- Danh sách chờ: 20 em

Mỗi đóng góp của bạn, dù lớn hay nhỏ, đều góp phần mang lại nụ cười và tương lai tươi sáng cho các em nhỏ kém may mắn.

MINH BẠCH TÀI CHÍNH:
- 70% quỹ dùng cho chi phí phẫu thuật và điều trị
- 20% cho chi phí hỗ trợ gia đình
- 10% cho chi phí vận hành và theo dõi sau phẫu thuật

Tất cả các khoản chi được công khai và cập nhật thường xuyên trên website của quỹ.`,
    targetAmount: 500000,
    currentAmount: 325000,
    walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    createdAt: new Date('2024-01-01'),
    imageUrl: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80',
    supporterCount: 1250,
    category: 'Healthcare',
    tags: ['children', 'surgery', 'medical-care', 'charity']
  },
  // ... other funds remain the same
];