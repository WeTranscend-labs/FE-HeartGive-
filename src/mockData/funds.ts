import { Fund } from "../types/fund";

export const mockFunds: Fund[] = [
  {
    id: "1",
    organizationName: "Quỹ Từ thiện Nâng bước tuổi thơ",
    organizationInfo: {
      name: "Quỹ Từ thiện Nâng bước tuổi thơ",
      description: `Nâng Bước Tuổi Thơ là tổ chức từ thiện duy nhất tại Việt Nam cung cấp chuyên môn điều trị bệnh lý & phẫu thuật đa khoa theo tiêu chuẩn quốc tế cho trẻ em dị tật bẩm sinh có hoàn cảnh khó khăn.`,
      website: "https://nangbuoctuoitho.org",
      email: "contact@nangbuoctuoitho.org",
      phone: "(+84) 123-456-789",
      address: "123 Nguyễn Văn Linh, Quận 7, TP.HCM",
      socialLinks: {
        facebook: "https://facebook.com/nangbuoctuoitho",
        twitter: "https://twitter.com/nangbuoctuoitho",
      },
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
- Giảm gánh nặng tâm lý và kinh tế cho gia đình`,
    targetAmount: 500000,
    currentAmount: 325000,
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    createdAt: new Date("2024-01-01"),
    imageUrl:
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80",
    supporterCount: 1250,
    category: "Healthcare",
    tags: ["children", "surgery", "medical-care", "charity"],
  },
  {
    id: "2",
    organizationName: "Quỹ Học Bổng Thắp Sáng Tương Lai",
    organizationInfo: {
      name: "Quỹ Học Bổng Thắp Sáng Tương Lai",
      description:
        "Quỹ học bổng hỗ trợ học sinh, sinh viên nghèo vượt khó tại các vùng khó khăn trên cả nước, đặc biệt là vùng núi phía Bắc và Tây Nguyên.",
      website: "https://thapsangtuonglai.org",
      email: "info@thapsangtuonglai.org",
      phone: "(+84) 234-567-890",
      address: "45 Lý Tự Trọng, Quận 1, TP.HCM",
      socialLinks: {
        facebook: "https://facebook.com/thapsangtuonglai",
        linkedin: "https://linkedin.com/company/thapsangtuonglai",
      },
    },
    purpose: `Chương trình "Thắp Sáng Ước Mơ 2024" nhằm trao 1000 suất học bổng cho học sinh, sinh viên có hoàn cảnh khó khăn nhưng đạt thành tích học tập tốt trên toàn quốc.

HOÀN CẢNH:
Nhiều em học sinh, sinh viên tại các vùng khó khăn đang phải đối mặt với nguy cơ bỏ học do hoàn cảnh kinh tế. Đặc biệt tại các tỉnh miền núi phía Bắc và Tây Nguyên, tỷ lệ học sinh bỏ học giữa chừng vẫn còn cao.

GIẢI PHÁP:
- Trao học bổng toàn phần và bán phần
- Hỗ trợ chi phí sinh hoạt và học tập
- Tổ chức các khóa đào tạo kỹ năng
- Kết nối mentor hướng nghiệp

MỤC TIÊU:
- 1000 suất học bổng mỗi năm
- Tỷ lệ học sinh, sinh viên hoàn thành chương trình học đạt 95%
- Tạo cơ hội việc làm cho 80% sinh viên sau tốt nghiệp`,
    targetAmount: 300000,
    currentAmount: 150000,
    walletAddress: "0x8912dF34a5E234C0532925a3b844Bc454e4438f12",
    createdAt: new Date("2024-01-05"),
    imageUrl:
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80",
    supporterCount: 750,
    category: "Education",
    tags: ["education", "scholarship", "students", "poverty"],
  },
  {
    id: "3",
    organizationName: "Quỹ Bảo Tồn Rừng Xanh Việt Nam",
    organizationInfo: {
      name: "Quỹ Bảo Tồn Rừng Xanh Việt Nam",
      description:
        "Tổ chức phi lợi nhuận hoạt động trong lĩnh vực bảo tồn thiên nhiên và đa dạng sinh học tại Việt Nam.",
      website: "https://rungxanhvietnam.org",
      email: "contact@rungxanhvietnam.org",
      phone: "(+84) 345-678-901",
      address: "78 Hoàng Hoa Thám, Ba Đình, Hà Nội",
      socialLinks: {
        facebook: "https://facebook.com/rungxanhvietnam",
        instagram: "https://instagram.com/rungxanhvn",
      },
    },
    purpose: `Dự án "Phục Hồi Rừng Ngập Mặn 2024" nhằm khôi phục và bảo vệ 500 hecta rừng ngập mặn tại các tỉnh ven biển miền Trung, góp phần chống biến đổi khí hậu và bảo vệ đa dạng sinh học.

THÁCH THỨC:
- Mất 60% diện tích rừng ngập mặn trong 30 năm qua
- Tác động nghiêm trọng đến hệ sinh thái và sinh kế người dân
- Gia tăng nguy cơ thiên tai và xói lở bờ biển

GIẢI PHÁP:
- Trồng mới 500,000 cây rừng ngập mặn
- Xây dựng mô hình đồng quản lý rừng với cộng đồng
- Phát triển sinh kế bền vững cho người dân địa phương
- Giáo dục môi trường cho thanh thiếu niên

KẾT QUẢ MONG ĐỢI:
- Phục hồi 500 ha rừng ngập mặn
- Tạo sinh kế cho 1000 hộ dân
- Giảm 50% tình trạng xói lở bờ biển
- Tăng 30% đa dạng sinh học trong khu vực`,
    targetAmount: 400000,
    currentAmount: 280000,
    walletAddress: "0x9023eF45b6E234C0532925a3b844Bc454e4438d34",
    createdAt: new Date("2024-01-10"),
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80",
    supporterCount: 920,
    category: "Environment",
    tags: ["environment", "conservation", "climate-change", "sustainability"],
  },
  {
    id: "4",
    organizationName: "Quỹ Hỗ Trợ Người Cao Tuổi Sống Vui",
    organizationInfo: {
      name: "Quỹ Hỗ Trợ Người Cao Tuổi Sống Vui",
      description:
        "Tổ chức chuyên cung cấp dịch vụ chăm sóc và hỗ trợ người cao tuổi có hoàn cảnh khó khăn.",
      website: "https://songvui.org",
      email: "support@songvui.org",
      phone: "(+84) 456-789-012",
      address: "234 Nguyễn Thị Minh Khai, Quận 3, TP.HCM",
      socialLinks: {
        facebook: "https://facebook.com/songvui",
        youtube: "https://youtube.com/songvui",
      },
    },
    purpose: `Chương trình "Mái Ấm Tuổi Vàng 2024" hướng đến mục tiêu cải thiện chất lượng cuộc sống cho 500 người cao tuổi có hoàn cảnh khó khăn tại TP.HCM và các tỉnh lân cận.

THỰC TRẠNG:
- 30% người cao tuổi sống dưới mức nghèo khổ
- Thiếu tiếp cận dịch vụ y tế và chăm sóc
- Cô đơn và thiếu kết nối xã hội

GIẢI PHÁP:
- Xây dựng 5 trung tâm chăm sóc ban ngày
- Cung cấp dịch vụ y tế tại nhà
- Tổ chức các hoạt động văn hóa, giải trí
- Đào tạo tình nguyện viên chăm sóc người cao tuổi

MỤC TIÊU:
- Hỗ trợ 500 người cao tuổi
- Tạo việc làm cho 50 nhân viên chăm sóc
- Giảm 40% tỷ lệ trầm cảm ở người cao tuổi
- Tăng 60% mức độ hài lòng với cuộc sống`,
    targetAmount: 250000,
    currentAmount: 120000,
    walletAddress: "0xa134dF56c7E234C0532925a3b844Bc454e4438e78",
    createdAt: new Date("2024-01-15"),
    imageUrl:
      "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80",
    supporterCount: 480,
    category: "Elderly Care",
    tags: ["elderly", "healthcare", "social-care", "community"],
  },
  {
    id: "5",
    organizationName: "Quỹ Phát Triển Nghệ Thuật Cộng Đồng",
    organizationInfo: {
      name: "Quỹ Phát Triển Nghệ Thuật Cộng Đồng",
      description:
        "Tổ chức phi lợi nhuận thúc đẩy phát triển nghệ thuật và văn hóa tại các cộng đồng địa phương.",
      website: "https://nghethuat.org",
      email: "info@nghethuat.org",
      phone: "(+84) 567-890-123",
      address: "56 Trần Hưng Đạo, Hoàn Kiếm, Hà Nội",
      socialLinks: {
        facebook: "https://facebook.com/nghethuat",
        instagram: "https://instagram.com/nghethuat",
      },
    },
    purpose: `Dự án "Nghệ Thuật Vì Cộng Đồng 2024" nhằm mang nghệ thuật đến gần hơn với cộng đồng thông qua các hoạt động giáo dục và trải nghiệm nghệ thuật.

THÁCH THỨC:
- Thiếu không gian và cơ hội tiếp cận nghệ thuật
- Hạn chế trong giáo dục nghệ thuật cho trẻ em
- Mất dần các giá trị văn hóa truyền thống

GIẢI PHÁP:
- Xây dựng 3 trung tâm nghệ thuật cộng đồng
- Tổ chức các lớp học nghệ thuật miễn phí
- Tổ chức festival nghệ thuật đường phố
- Bảo tồn và phát triển nghệ thuật truyền thống

KẾT QUẢ MONG ĐỢI:
- Tiếp cận 10,000 người dân
- Đào tạo 500 học viên nghệ thuật
- Tổ chức 50 sự kiện nghệ thuật cộng đồng
- Tạo việc làm cho 100 nghệ sĩ địa phương`,
    targetAmount: 350000,
    currentAmount: 180000,
    walletAddress: "0xb245eF67d8E234C0532925a3b844Bc454e4438f90",
    createdAt: new Date("2024-01-20"),
    imageUrl:
      "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?auto=format&fit=crop&q=80",
    supporterCount: 630,
    category: "Arts & Culture",
    tags: ["arts", "culture", "community", "education"],
  },
  {
    id: "6",
    organizationName: "Quỹ Cứu Trợ Thiên Tai Miền Trung",
    organizationInfo: {
      name: "Quỹ Cứu Trợ Thiên Tai Miền Trung",
      description:
        "Tổ chức chuyên hỗ trợ khắc phục hậu quả thiên tai và xây dựng khả năng chống chịu cho cộng đồng tại miền Trung.",
      website: "https://cuutromientrung.org",
      email: "support@cuutromientrung.org",
      phone: "(+84) 678-901-234",
      address: "89 Trần Phú, Hội An, Quảng Nam",
      socialLinks: {
        facebook: "https://facebook.com/cuutromientrung",
        twitter: "https://twitter.com/cuutromientrung",
      },
    },
    purpose: `Chiến dịch "Xây Dựng Nhà Chống Lũ 2024" nhằm xây dựng 200 ngôi nhà chống lũ cho các hộ gia đình dễ bị tổn thương tại các tỉnh miền Trung.

THỰC TRẠNG:
- Hàng nghìn hộ dân sống trong vùng ngập lụt
- Thiệt hại nặng nề về người và tài sản mỗi mùa lũ
- Thiếu nguồn lực để xây nhà kiên cố

GIẢI PHÁP:
- Xây dựng nhà chống lũ theo tiêu chuẩn
- Đào tạo kỹ năng ứng phó thiên tai
- Lắp đặt hệ thống cảnh báo sớm
- Xây dựng quỹ dự phòng cộng đồng

MỤC TIÊU:
- 200 nhà chống lũ được xây dựng
- 1000 người được đào tạo ứng phó thiên tai
- Giảm 70% thiệt hại do lũ lụt
- Tăng cường khả năng phục hồi cộng đồng`,
    targetAmount: 600000,
    currentAmount: 420000,
    walletAddress: "0xc356eF78f9E234C0532925a3b844Bc454e4438a12",
    createdAt: new Date("2024-01-25"),
    imageUrl:
      "https://images.unsplash.com/photo-1602870045686-27741c3c2e0b?auto=format&fit=crop&q=80",
    supporterCount: 1580,
    category: "Disaster Relief",
    tags: ["disaster-relief", "housing", "community-resilience", "emergency"],
  },
];
