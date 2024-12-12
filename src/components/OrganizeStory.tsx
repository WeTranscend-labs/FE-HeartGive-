export function OrganizeStory() {
  return (
    <>
      <div className="relative bg-white rounded-lg shadow-soft p-6 border-l-4 border-primary-500">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary-500 rounded-l-lg"></div>
        <p className="text-gray-700 text-base leading-relaxed tracking-wide relative pl-4 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-primary-500 before:rounded-full">
          <span className="font-semibold text-primary-600 mr-2">Sứ mệnh:</span>
          Chúng tôi là một{' '}
          <span className="italic text-primary-700">tổ chức phi lợi nhuận</span>
          hoạt động tại Việt Nam, với mục tiêu thúc đẩy sự phát triển bền vững
          và hỗ trợ các sáng kiến mang lại lợi ích cho cộng đồng.
        </p>

        <div className="mt-4 space-y-3">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-primary-500 mr-3 mt-1 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-gray-600 text-sm">
              Thông qua quỹ tài trợ, chúng tôi hỗ trợ tài chính cho các dự án có
              <span className="font-medium text-primary-700">
                {' '}
                tác động tích cực
              </span>
              đến xã hội, kinh tế và các lĩnh vực quan trọng như giáo dục, y tế,
              bảo vệ văn hóa và phát triển cộng đồng.
            </p>
          </div>

          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-primary-500 mr-3 mt-1 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm14 4H3v8a2 2 0 002 2h10a2 2 0 002-2V8zm-9 4a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-gray-600 text-sm">
              Chúng tôi hoạt động với nguyên tắc
              <span className="font-semibold text-primary-700">
                {' '}
                minh bạch, công bằng
              </span>
              và cam kết mang lại giá trị lâu dài cho các đối tác và cộng đồng.
            </p>
          </div>

          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-primary-500 mr-3 mt-1 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-gray-600 text-sm">
              Quỹ của chúng tôi không chỉ hỗ trợ các dự án trong nước mà còn
              <span className="font-medium text-primary-700">
                {' '}
                khuyến khích các mô hình sáng tạo
              </span>
              có thể nhân rộng và tạo ra thay đổi tích cực.
            </p>
          </div>
        </div>

        <div className="mt-4 bg-primary-50 p-3 rounded-lg border-l-4 border-primary-500">
          <p className="text-sm text-gray-700 italic">
            "Chúng tôi tin rằng mỗi sáng kiến, dù nhỏ hay lớn, đều có thể tạo ra
            sự khác biệt. Với sự chung tay của cộng đồng, chúng ta có thể xây
            dựng một tương lai tươi sáng hơn."
          </p>
        </div>
      </div>
    </>
  );
}
