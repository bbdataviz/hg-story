import img from '@/assets/illustration/pregnancy-stages.svg';
import { motion } from 'framer-motion';

export default function PregnancyStages() {

  return (
    <div className="pregnancy-stage-panel">
      <svg viewBox="0 0 800 120"
        width="100%"
        height="120"
      >
        <motion.image
          href={img}
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
        />
      </svg>
    </div>
  )
}
