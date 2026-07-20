import { AnimatePresence, motion } from 'framer-motion';
import { useChart } from 'src/hooks/useChart.ts';

interface VisProps {
  visible: boolean;
  waterlineY: number;
}

export default function Waterline({ visible, waterlineY }: VisProps) {
  
  const { xScale, innerWidth } = useChart();

  const months = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <AnimatePresence>
      {visible &&
      <motion.g
        animate={{
          opacity: visible ? 1 : 0
        }}
        transition={{
          delay: 0,
          duration: 0
        }}
        exit={{
          opacity: 0
        }}
      >
        {/* axis line */}
        <line 
          x1={0}
          y1={waterlineY}
          x2={innerWidth}
          y2={waterlineY}
          stroke="black"
        />

        {/* ticks and tick labels */}
        {months.map(month => (
          <g key={month}>
            <line
              x1={xScale(month)}
              y1={waterlineY}
              x2={xScale(month)}
              y2={waterlineY + 6}
              stroke="black"
            />
          </g>
        ))}
      </motion.g>
      }
    </AnimatePresence>

  ) 
}