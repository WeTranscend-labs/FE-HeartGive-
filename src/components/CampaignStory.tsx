import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface CampaignStoryProps {
  content: string;
  images: string[];
}

export function CampaignStory({ content, images }: CampaignStoryProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Split content into paragraphs and identify sections
  const sections = content.split('\n\n').map(section => {
    const isHeader = section.includes(':') && section === section.toUpperCase();
    return {
      content: section,
      isHeader
    };
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="prose max-w-none"
    >
      {sections.map((section, index) => {
        // Insert images at strategic points (after introduction and between major sections)
        const shouldInsertImage = index === 1 || index === Math.floor(sections.length / 2);
        const imageIndex = Math.floor(index / (sections.length / images.length));

        return (
          <div key={index}>
            {section.isHeader ? (
              <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">
                {section.content}
              </h3>
            ) : (
              <p className="text-gray-600 whitespace-pre-wrap leading-relaxed mb-6">
                {section.content}
              </p>
            )}
            
            {shouldInsertImage && images[imageIndex] && (
              <div className="my-8">
                <img
                  src={images[imageIndex]}
                  alt={`Campaign ${imageIndex + 1}`}
                  className="w-full rounded-lg shadow-lg"
                />
                <p className="text-sm text-gray-500 mt-2 text-center italic">
                  Những nụ cười và hành trình thay đổi cuộc sống
                </p>
              </div>
            )}
          </div>
        );
      })}
    </motion.div>
  );
}