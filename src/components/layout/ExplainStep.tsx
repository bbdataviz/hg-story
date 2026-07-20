import { motion } from "framer-motion";
import { type EmotionVariable } from 'src/config/emotionConfig';

interface Props {
  index: number;
  onEnter: (index: number) => void;
  emotion?: EmotionVariable;
  onEmotionEnter?: (emotion: EmotionVariable) => void;
  children: React.ReactNode;
  
}

export default function ExplainStep({ index, onEnter, emotion, onEmotionEnter, children }: Props) {
  return (
    <motion.div
      className="explain-step"
      onViewportEnter={() => {
        onEnter(index);

        if (emotion && onEmotionEnter) {
          onEmotionEnter(emotion)
        }
      }}
      viewport={{ amount: 0.5, once: false }}
    >
      {children}
    </motion.div>
  );
}
