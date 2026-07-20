import * as d3 from 'd3';
import { motion } from 'framer-motion';
import { useChart } from 'src/hooks/useChart';

interface VisProps {
  visible: boolean;
}

export default function YAxis({ visible }: VisProps) {

  const { innerHeight } = useChart();

  const chartHeight = innerHeight - 70; // compressed scale

  {/* Create an animated scale */}
  const reversedYScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, chartHeight])
    .clamp(true);

  const percentages = reversedYScale.ticks(10);

  return(
    <motion.g
      className="axis"
      animate={{
        opacity: visible ? 1 : 0
      }}
      transition={{ 
        duration: 2.5,
        delay: 2.5,
        ease: "easeOut" }}
    >
      
      {/* axis line */}
      <line
        x1={0}
        y1={chartHeight}
        x2={0}
        y2={2 * chartHeight}
        stroke="black"
      />

      {/* ticks and tick labels */}
      {percentages.map(percent => (
        <g key={percent}>
          <text
            x={-25}
            y={reversedYScale(percent) + chartHeight + 3} // label position on y axis
            textAnchor="middle"
          >
            {percent}
          </text>

          <line
            x1={-6}
            y1={reversedYScale(percent) + chartHeight}
            x2={0}
            y2={reversedYScale(percent) + chartHeight}
            stroke="black"
          />
        </g>
      ))}

    </motion.g>
  )
}