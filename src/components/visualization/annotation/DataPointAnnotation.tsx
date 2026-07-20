    import { AnimatePresence, motion } from "framer-motion";

import { useChart } from 'src/hooks/useChart.ts';
import type { DataPoint } from 'src/types/DataPoint';

interface Props {
  visible: boolean;
  dataPoint: DataPoint;
  hasInteracted: boolean;
}

export default function PopulationAnnotation({ visible, dataPoint, hasInteracted }: Props) {

  const { xScale, yScale } = useChart();
  const x = xScale(dataPoint.month);
  const y = yScale(dataPoint.population_pct as number);
  
  return(

    <motion.g
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? y - 3 : y - 40
      }}
      transition={{
        opacity: {
          duration: visible ? 1 : 1,
          delay: visible ? 1.5 : 0,
          ease: "easeOut"
        },
        y: {
          duration: visible ? 1 : 0,
          delay: visible ? 1.5 : 1.5,
          ease: "easeOut"
        }
      }}
    >
      {/* Visual guidance: Switch between hover hint and data point interpretation */}
      <AnimatePresence mode="wait">
        {!hasInteracted ? (
          <motion.text
            key="hover"
            x={x}
            y={-58}
            textAnchor="middle"
            className="annotation"
            initial={{ opacity: 0, translateY: 5 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -5 }}
            transition={{ duration: 0.35 }}
          >
            Hover over a point!
          </motion.text>
        ) : (
          <motion.text
            key="peak"
            x={x}
            y={-85}
            textAnchor="middle"
            className="annotation"
            initial={{ opacity: 0, translateY: 5 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -5 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <tspan x={x}>Highest prevalence</tspan>
            <tspan x={x} dy="1.3em">
              during month 3
            </tspan>
          </motion.text>
        )}
      </AnimatePresence>

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
          x1={x}
          y1={-40}
          x2={x}
          y2={-15}
          stroke="#666"
        />

        <path
          d={`
            M ${x-4} -19
            L ${x} -15
            L ${x+4} -19
          `}
          fill="none"
          stroke="#666"
        />
      </motion.g>
    </motion.g>  
  )
}
