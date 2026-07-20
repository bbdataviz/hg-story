import { useState, useEffect } from 'react';
import { chartConfig } from 'src/config/chartConfig.ts';
import { useVisualizationData } from 'src/hooks/useVisualizationData.ts';
import { useChart } from 'src/hooks/useChart.ts';
import type { DataPoint } from 'src/types/DataPoint.ts';
import { motion, AnimatePresence, useMotionValue, animate, useTransform } from 'framer-motion';
import type { Dispatch, SetStateAction } from 'react';

import ChartTitle from 'src/components/visualization/ChartTitle.tsx';
import XAxis from 'src/components/visualization/XAxis.tsx';
import YAxis from 'src/components/visualization/YAxis.tsx';
import Area from 'src/components/visualization/Area.tsx';
import Waterline from 'src/components/visualization/Waterline.tsx';
import YAxisReversed from 'src/components/visualization/YAxisReversed.tsx';
import SymptomPanel from 'src/components/visualization/SymptomPanel.tsx';
import Tooltip from 'src/components/visualization/Tooltip.tsx';


interface HoverState {
    point: DataPoint;
    x: number;
    y: number;
    scaleType: "population" | "transition";
}

interface ChartProps {
  vizScene: number;
  state: Record<string, boolean>;
  mode?: "story" | "comparison";
  setInteracted: Dispatch<SetStateAction<boolean>>;
}

export default function DataVisualization({ vizScene, state, mode, setInteracted }: ChartProps) {
  
  {/* fetch data and filter by group */}
  const { noNauseaVomiting } = useVisualizationData();

  const { innerHeight } = useChart();

  const [hoveredPoint, setHovered] = useState<HoverState | null>(null);

  useEffect(() => {
    if (hoveredPoint) return setInteracted(true)
  })

  const activeSeries = 5;
  
  const seriesCount = Math.max(activeSeries, 1);
  
  {/* "master animation" */}
  {/* chartOffset continously changes during 1.8 s from 0 to -110} */}
  const chartYOffset = useMotionValue(
    mode === "comparison" ? -110 : 0
  )

  useEffect(() => {
    animate(
      chartYOffset,
      state.showIceberg ? -110 : 0,
      {
        duration: 1.8,
        ease: 'easeInOut'
      }
    );
  }, [state.showIceberg]);

  {/* Whenever chartYOffset changes, map values to chartCompression, e.g., [0 0], [-27.5, -20], ..., [-110, -80] */}
  const moveUpOffset = -110
  const compressionOffset = -70

  const chartCompression = useTransform(
    chartYOffset,
    [0, moveUpOffset],
    [0, compressionOffset]
  )

  const waterlineY = innerHeight + compressionOffset;

  const viewportOffset = state.showIceberg === true ? 105 : 0;

  {/* transition between mirror and within group */}
  const transition = useMotionValue(
    mode === "comparison" ? 1 : 0
  );

  useEffect(() => {
    animate(
      transition,
      state.showTransition ? 1 : 0,
      {
        duration: 1.2,
        ease: "easeInOut",
      }
    );
  }, [state.showTransition]);


  return (
    <div className="chart-container">
      <div className="quote-overlay">
      </div>
      
      <svg 
        viewBox={`0 -120 ${chartConfig.viewBox.width} ${chartConfig.viewBox.height + 120 + viewportOffset}`} 
        width="100%" // make the chart responsive
      >
        <g
          transform={`translate(${chartConfig.margin.left}, ${chartConfig.margin.top})`}
        > {/* group of chart elements, shift from left, shift from top  */}

          <motion.g
            style={{ y: chartYOffset }}
          >
            <ChartTitle 
              visible={state.showComparison}
              title="No Nausea with Vomiting"
            />
                  
            <XAxis 
              visible={state.showComparison}
              chartCompression={chartCompression}
              moveDown={mode === "comparison" ? false : state.showIceberg} // treat X axis
              mode="comparison"
            />

            <YAxis 
              visible={state.showComparison}
              chartCompression={chartCompression}
            />

            <Area 
              visible={state.showComparison}
              scaleType="population"
              data={noNauseaVomiting}
              symptom="no_nausea_vomiting"
              color="#d87093"
              animateIn={state.animateAreaNV}
              revealDirection="timeline"
              hoveredPoint={hoveredPoint}
              setHovered={setHovered}
              seriesCount={seriesCount}
              chartCompression={chartCompression}
              transition={transition}
            />
            
            <YAxisReversed visible={state.showIceberg} />
           
            <Area 
              visible={state.showComparison}
              scaleType="transition"
              data={noNauseaVomiting}
              symptom="nausea_vomiting"
              color="#00d023" 
              revealDirection="iceberg"
              hoveredPoint={hoveredPoint}
              setHovered={setHovered}
              seriesCount={seriesCount}
              chartCompression={chartCompression}
              transition={transition}
            />
           
            <Area 
              visible={state.showComparison}
              scaleType="transition"
              data={noNauseaVomiting}
              symptom="fatigue"
              color="#92a2c3" 
              revealDirection="iceberg"
              hoveredPoint={hoveredPoint}
              setHovered={setHovered}
              seriesCount={seriesCount}
              chartCompression={chartCompression}
              transition={transition}
            />

            <Area 
              visible={state.showComparison}
              scaleType="transition"
              data={noNauseaVomiting}
              symptom="headaches"
              color="#ff794b" 
              revealDirection="iceberg"
              hoveredPoint={hoveredPoint}
              setHovered={setHovered}
              seriesCount={seriesCount}
              chartCompression={chartCompression}
              transition={transition}
            />

            <Area 
              visible={state.showComparison}
              scaleType="transition"
              data={noNauseaVomiting}
              symptom="sleep_problems"
              color="#552ed4" 
              revealDirection="iceberg"
              hoveredPoint={hoveredPoint}
              setHovered={setHovered}
              seriesCount={seriesCount}
              chartCompression={chartCompression}
              transition={transition}
            />

            <Area 
              visible={state.showComparison}
              scaleType="transition"
              data={noNauseaVomiting}
              symptom="depression"
              color="#000000" 
              revealDirection="iceberg"
              hoveredPoint={hoveredPoint}
              setHovered={setHovered}
              seriesCount={seriesCount}
              chartCompression={chartCompression}
              transition={transition}
            />

            <Waterline 
              visible={state.showComparison}
              waterlineY={waterlineY}
            />
          
          </motion.g>

          <motion.g style={{ y: chartYOffset }}>
            {hoveredPoint && (
            <Tooltip
              hoveredPoint={hoveredPoint}
            />
          )}
          </motion.g>
          
        </g>
      </svg>

      {/* Panel for illustrations, annotations */}
      <div className="supporting-panel">
        <AnimatePresence mode="wait">

          {state.showComparison && (
            <SymptomPanel 
              vizScene={vizScene} 
              group="no_nv"
            />
          )}

        </AnimatePresence>

      </div>
    </div>
  )
}