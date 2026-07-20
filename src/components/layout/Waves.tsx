import { motion } from 'framer-motion';
import { EmotionConfig, type EmotionVariable } from '../../config/emotionConfig';

interface WaveProps {
  emotion: EmotionVariable;
  level: number;
  index: number;
  visible: boolean;
}

export default function Waves({ emotion, level, index, visible }: WaveProps) {
  let sec = 1.5;
  if (index === 0) {
    sec = 0;
  }
  
  return (
    <motion.div 
      className="wave-wrapper"

      animate={{ 
        translateY: `${level}vh`,
        opacity: visible ? 1 : 0
      }}

      transition={{ 
        translateY: {
          duration: sec, 
          ease: 'easeInOut'
        },
        opacity: { 
          duration: sec,
          ease: 'easeOut'
        }
      }}
      >
      <div className="wave-track wave wave1">
        <svg viewBox="0 0 1440 500">
          <motion.path
            animate={{
              fill: EmotionConfig[emotion].color,
              opacity: EmotionConfig[emotion].opacity
            }}
            transition={{
              duration: 2,
              ease: 'easeInOut'
            }}
            d="
              M0,160
              C120,160 240,120 360,120
              C480,120 600,160 720,160
              C840,160 960,200 1080,200
              C1200,200 1320,160 1440,160
              V500 H0 Z
            "
          />
        </svg>

        <svg viewBox="0 0 1440 500">
          <motion.path
            animate={{
              fill: EmotionConfig[emotion].color,
              opacity: EmotionConfig[emotion].opacity
            }}
            transition={{
              duration: 2,
              ease: 'easeInOut'
            }}
            d="
              M0,160
              C120,160 240,120 360,120
              C480,120 600,160 720,160
              C840,160 960,200 1080,200
              C1200,200 1320,160 1440,160
              V500 H0 Z
            "
          />
        </svg>
      </div>

      <div className="wave-track wave wave2">
        <svg  viewBox="0 0 1440 500">
          <motion.path
            animate={{
              fill: EmotionConfig[emotion].color,
              opacity: EmotionConfig[emotion].opacity
            }}
            transition={{
              duration: 3,
              ease: 'easeInOut'
            }}
            d="
              M0,160
              C120,150 240,140 360,150
              C480,160 600,170 720,160
              C840,150 960,140 1080,150
              C1200,160 1320,170 1440,160
              V500 H0 Z
            "
          />
        </svg>

        <svg  viewBox="0 0 1440 500">
          <motion.path
            animate={{
              fill: EmotionConfig[emotion].color,
              opacity: EmotionConfig[emotion].opacity
            }}
            transition={{
              duration: 3,
              ease: 'easeInOut'
            }}
            d="
              M0,160
              C120,150 240,140 360,150
              C480,160 600,170 720,160
              C840,150 960,140 1080,150
              C1200,160 1320,170 1440,160
              V500 H0 Z
            "
          />
        </svg>
      </div>

      <div className="wave-track wave wave3">
        <svg viewBox="0 0 1440 500">
          <motion.path
            animate={{
              fill: EmotionConfig[emotion].color,
              opacity: EmotionConfig[emotion].opacity
            }}
            transition={{
              duration: 4,
              ease: 'easeInOut'
            }}
            d="
              M0,160
              C240,145 480,135 720,145
              C960,155 1200,175 1440,160
              V500 H0 Z
            "
          />
        </svg>

        <svg viewBox="0 0 1440 500">
          <motion.path
            animate={{
              fill: EmotionConfig[emotion].color,
              opacity: EmotionConfig[emotion].opacity
            }}
            transition={{
              duration: 4,
              ease: 'easeInOut'
            }}
            d="
              M0,160
              C240,145 480,135 720,145
              C960,155 1200,175 1440,160
              V500 H0 Z
            "
          />
        </svg>
      </div>
      
    </motion.div>
  );
}


