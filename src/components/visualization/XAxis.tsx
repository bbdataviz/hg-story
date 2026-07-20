import { useState, useEffect } from 'react';
import { motion, type MotionValue, useTransform } from 'framer-motion';
import { useChart } from 'src/hooks/useChart.ts';

interface VisProps {
  visible: boolean;
  chartCompression: MotionValue<number>;
  moveDown: boolean;
  mode?: "story" | "comparison";
}

export default function XAxis({ visible, chartCompression, moveDown, mode }: VisProps) {
  
  const { xScale, innerWidth, innerHeight } = useChart();
  
  const [chartHeight, setChartHeight] = useState(innerHeight);

  const compressedHeight = 2 * (chartHeight - 70);

  const animatedChartHeight = useTransform(
    chartCompression,
    c => innerHeight + c
  );

  useEffect(() => {
    if (mode === "comparison") return;
    const unsubscribe = animatedChartHeight.on("change", value => {
      setChartHeight(value);
    });
    return unsubscribe;
  }, [animatedChartHeight]);

  const tickHeight = mode === "comparison" ? compressedHeight + 20 : chartHeight + 20;
  const textMonths = [1, 2, 3, 4, 5, 6, 7, 8];


  return (
    <motion.g
      animate={{
        opacity: visible ? 1 : 0,

        translateY: moveDown ? chartHeight : 0
      }}
      
      transition={{ 
        ease: "easeOut", 
        delay: moveDown ? 3 : 0,
        duration: moveDown ? 2 : 2 
      }}
    >
      {/* axis line */}
      <line 
        x1={0}
        y1={mode === "comparison" ? compressedHeight : chartHeight}
        x2={innerWidth}
        y2={mode === "comparison" ? compressedHeight : chartHeight}
        stroke="black"
      />

      {/* ticks and tick labels */}
      {textMonths.map(month => (
        <g key={month}>
          <text 
            x={xScale(month)}
            y={tickHeight + 3}
            textAnchor="middle"
          >
            {month}
          </text>

          <line
            x1={xScale(month)}
            y1={mode === "comparison" ? compressedHeight : chartHeight}
            x2={xScale(month)}
            y2={mode === "comparison" ? compressedHeight + 6 : chartHeight + 6}
            stroke="black"
          />
        </g>
      ))}

      {/* axis label */}
      <text
        x={innerWidth + 15}
        y={mode === "comparison" ? compressedHeight + 22 : chartHeight + 22}
        className="x-axis-label">
        month
      </text>

    </motion.g>
  ) 
}