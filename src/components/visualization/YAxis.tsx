import * as d3 from 'd3';
import { useEffect, useState } from 'react';
import { motion, animate, useMotionValue, type MotionValue, useTransform } from 'framer-motion';
import { useChart } from 'src/hooks/useChart';

interface VisProps {
  visible: boolean;
  zoomed?: boolean;
  chartCompression: MotionValue<number>;
}

export default function YAxis({ visible, zoomed, chartCompression }: VisProps) {

  const { innerHeight } = useChart();

  const [chartHeight, setChartHeight] = useState(innerHeight);

  const animatedChartHeight = useTransform(
    chartCompression,
    c => innerHeight + c
  );

  useEffect(() => {
    const unsubscribe = animatedChartHeight.on("change", value => {
      setChartHeight(value);
    });
    return unsubscribe;
  }, [animatedChartHeight]);

  {/* Create an animated domain maximum */}
  const yDomain = useMotionValue(100);

  useEffect(() => {
    animate(
      yDomain,
      zoomed ? 3 : 100,
      {
        duration: 1.5,
        ease: "easeInOut"
      }
    );
  }, [zoomed]);

  const [currentDomain, setCurrentDomain] = useState(100);

  useEffect(() => {
    const unsubscribe = yDomain.on("change", value => {
      setCurrentDomain(value);
    });
    return unsubscribe;
  }, []);

  {/* Create an animated scale */}
  const animatedYScale = d3.scaleLinear()
    .domain([currentDomain, 0])
    .range([0, chartHeight])
    .clamp(true);

  const percentages = !zoomed 
    ? animatedYScale.ticks(10)
    : animatedYScale.ticks(7);

  return(
    <motion.g
      className="axis"
      animate={{
        opacity: visible ? 1 : 0
      }}
      transition={{ ease: "easeOut", duration: 2 }}
    >
      <text
        x={-40}
        y={-25}
        className="y-axis-label"
      >
        %
      </text>
      
      {/* axis line */}
      <line
        x1={0}
        y1={0}
        x2={0}
        y2={chartHeight}
        stroke="black"
      />

      {/* ticks and tick labels */}
      {percentages.map(percent => (
        <g key={percent}>
          <text
            x={-25}
            y={animatedYScale(percent) + 3} // label position on y axis
            textAnchor="middle"
          >
            {percent}
          </text>

          <line
            x1={-6}
            y1={animatedYScale(percent)}
            x2={0}
            y2={animatedYScale(percent)}
            stroke="black"
          />
        </g>
      ))}

    </motion.g>
  )
}