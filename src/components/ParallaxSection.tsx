import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface ParallaxSectionProps {
  imageUrl: string;
  title: string;
  description: string;
  reverse?: boolean;
  children?: React.ReactNode;
}

export function ParallaxSection({ imageUrl, title, description, reverse = false, children }: ParallaxSectionProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <div ref={containerRef} className="relative min-h-[60vh] overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute inset-0"
      >
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20" />
      </motion.div>

      <div className="relative container mx-auto px-4 py-24">
        <div className={`flex items-center min-h-[40vh] ${reverse ? 'justify-end' : 'justify-start'}`}>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: reverse ? 100 : -100 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ opacity }}
            className={`max-w-xl ${reverse ? 'text-right' : 'text-left'}`}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              {title}
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              {description}
            </p>
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}