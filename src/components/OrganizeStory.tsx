export function OrganizeStory() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <p className="text-gray-800 leading-relaxed mb-4">
        <span className="font-semibold mr-2">Mission:</span>
        We are a non-profit organization working in Vietnam, aiming to promote
        sustainable development and support initiatives that bring benefits to
        the community.
      </p>

      <div className="space-y-3 mb-4">
        {[
          {
            text: 'Through grant funds, we financially support projects with positive impacts on society, economy, and critical areas like education, healthcare, cultural preservation, and community development.',
          },
          {
            text: 'We operate with principles of transparency and fairness, committed to creating long-term value for partners and communities.',
          },
          {
            text: 'Our fund not only supports domestic projects but also encourages innovative models that can be scaled and create positive change.',
          },
        ].map((item, index) => (
          <div key={index} className="flex items-start">
            <p className="text-gray-700 text-sm">• {item.text}</p>
          </div>
        ))}
      </div>

      <blockquote className="bg-gray-50 p-3 rounded-lg italic text-gray-700">
        "We believe that every initiative, big or small, can make a difference.
        Together, we can build a brighter future."
      </blockquote>
    </div>
  );
}
