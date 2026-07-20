import { motion } from 'framer-motion';
import type { Symptom } from 'src/types/Symptom.ts';

interface ItemProps {
  symptom: Symptom;
}

export default function SymptomItem({ symptom }: ItemProps){

  return (
    <motion.div
      className="symptom-item"
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <svg 
        width="18" height="18"
        viewBox="0 0 18 18"
        className="symptom-icon">
        <circle
            cx="9"
            cy="9"
            r="6.5"
            fill={symptom.color}
            stroke="white"
            strokeWidth="2.5"
            vectorEffect="non-scaling-stroke"
          />
      </svg>

      <span>{symptom.label}</span>

    </motion.div>
  )
}
            
              