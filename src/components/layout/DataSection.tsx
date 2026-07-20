import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { type EmotionVariable } from 'src/config/emotionConfig';

interface StorySectionProps {
  children: React.ReactNode;
  index: number;
  onEnter: (index: number) => void;
  emotion?: EmotionVariable;
  onEmotionEnter?: (emotion: EmotionVariable) => void;
}

export default function DataSection({ children, index, onEnter, emotion, onEmotionEnter }: StorySectionProps) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 0.9, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.8]);

  return (
    <motion.section
      ref={ref}
      className="story-section-intro"
      onViewportEnter={() => {
        onEnter(index);

        if (emotion && onEmotionEnter) {
          onEmotionEnter(emotion);
        }
      }}
      viewport={{ amount: 0.5 }}
      style={{ opacity, scale }}
    >
      {children}
    </motion.section>
  );
}
