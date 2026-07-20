import { motion } from 'framer-motion';
import { useChart } from 'src/hooks/useChart.ts';

interface Props {
  visible: boolean;
}

export default function PopulationAnnotation({ visible }: Props) {

  const { innerHeight } = useChart();
  const y = innerHeight * 0.335

  return(
    <motion.g
      animate={{
        opacity: visible ? 1 : 0,
        x: visible ? 5 : 30
      }}
      transition={{
        opacity: {
          duration: visible ? 1 : 1,
          delay: visible ? 1.5 : 0,
          ease: "easeOut"
        },
        x: {
          duration: visible ? 1 : 0,
          delay: visible ? 1.5 : 1.5,
          ease: "easeOut"
        }
      }}
    >
      <motion.g
        animate={{
          y: [0, 4, 0]
        }}
        transition={{
          repeat: 3,
          duration: 1.5,
          ease: "easeInOut"
        }}
      >
        <line
          x1={25}
          y1={y}
          x2={3}
          y2={y}
          stroke="#666"
        />

        <path
          d={`
            M 7 ${y+4} 
            L 3 ${y} 
            L 7 ${y-4} 
          `}
          fill="none"
          stroke="#666"
        />
      </motion.g>
      <text
        className="annotation"
        x={30}
        y={innerHeight * 0.35}
        fill="#666"
      >
        Percent of all 102,810 women
      </text>
    </motion.g>
  )
}