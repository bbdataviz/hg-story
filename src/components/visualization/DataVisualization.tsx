import { useState, useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { chartConfig } from 'src/config/chartConfig.ts';
import { useVisualizationData } from 'src/hooks/useVisualizationData.ts';
import { useChart } from 'src/hooks/useChart.ts';
import type { DataPoint } from 'src/types/DataPoint.ts';
import { motion, AnimatePresence, useMotionValue, animate, useTransform } from 'framer-motion';

import ChartTitle from 'src/components/visualization/ChartTitle.tsx';
import XAxis from 'src/components/visualization/XAxis.tsx';
import YAxis from 'src/components/visualization/YAxis.tsx';
import Annotations from 'src/components/visualization/Annotations.tsx';
import Area from 'src/components/visualization/Area.tsx';
import Waterline from 'src/components/visualization/Waterline.tsx';
import YAxisReversed from 'src/components/visualization/YAxisReversed.tsx';
import PregnancyStages from 'src/components/visualization/PregnancyStages.tsx';
import SymptomPanel from 'src/components/visualization/SymptomPanel.tsx';
import Tooltip from 'src/components/visualization/Tooltip.tsx';
import QuoteOverlay from 'src/scenes/DataVisualization/QuoteOverlay.tsx';


interface HoverState {
    point: DataPoint;
    x: number;
    y: number;
    scaleType: "population" | "transition";
}

interface ChartProps {
  vizScene: number;
  state: Record<string, boolean>;
  zoomed?: boolean;
  mode?: "story" | "comparison";
  hasInteracted: boolean;
  setInteracted: Dispatch<SetStateAction<boolean>>;
  
}

export default function DataVisualization({ vizScene, state, zoomed, mode, hasInteracted, setInteracted }: ChartProps) {
  
  {/* fetch data and filter by group */}
  const { nauseaVomiting, hospitalization } = useVisualizationData();

  const { innerHeight } = useChart();

  const [hoveredPoint, setHovered] = useState<HoverState | null>(null);

  useEffect(() => {
    if (hoveredPoint) return setInteracted(true)
  })


  const activeSeries =
    Number(state.showArea) +
    Number(state.showHospitalization) +
    Number(state.showFatiguePopulation) +
    Number(state.showHeadaches) +
    Number(state.showSleepProblems) +
    Number(state.showDepressions);
  
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
    mode === "comparison" ? 1 : 0);

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
        <QuoteOverlay vizScene={vizScene}/>
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
              visible={state.showChartTitle}
              title="Nausea with Vomiting"
            />
                  
            <XAxis 
              visible={state.showXAxis}
              chartCompression={chartCompression}
              moveDown={state.showIceberg}  
            />

            <YAxis 
              visible={state.showYAxis}
              zoomed={zoomed}
              chartCompression={chartCompression}
            />

            <Annotations 
              vizScene={vizScene} 
              data={nauseaVomiting} 
              hoveredPoint={hoveredPoint}
              hasInteracted={hasInteracted}
            />

            <Area 
              visible={state.showArea}
              scaleType="population"
              data={nauseaVomiting}
              symptom="nausea_vomiting"
              color="#00d023"
              animateIn={state.animateAreaNV}
              revealDirection="timeline"
              hoveredPoint={hoveredPoint}
              setHovered={setHovered}
              zoomed={zoomed} 
              seriesCount={seriesCount}
              chartCompression={chartCompression}
              tooltipmode="population"
              transition={transition}
            />


            <Area 
              visible={state.showFatiguePopulation}
              scaleType="population"
              data={nauseaVomiting}
              symptom="fatigue"
              color="#92a2c3" // 
              animateIn={state.animateAreaNV}
              revealDirection="population"
              hoveredPoint={hoveredPoint}
              setHovered={setHovered}
              seriesCount={seriesCount}
              chartCompression={chartCompression}
              transition={transition}
            />

            
            <YAxisReversed visible={state.showIceberg} />
           
            <Area 
              visible={state.showNVTransition}
              scaleType="transition"
              data={nauseaVomiting}
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
              visible={state.showFatigueTransition}
              scaleType="transition"
              data={nauseaVomiting}
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
              visible={state.showHeadaches}
              scaleType="transition"
              data={nauseaVomiting}
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
              visible={state.showHospitalization}
              scaleType="population"
              data={hospitalization}
              symptom="hospitalization"
              color="#d00042"
              animateIn={state.animateHospitalization}
              revealDirection="population"
              hoveredPoint={hoveredPoint}
              setHovered={setHovered} 
              zoomed={zoomed}
              seriesCount={seriesCount}
              chartCompression={chartCompression}
              transition={transition}
            />

            <Area 
              visible={state.showSleepProblems}
              scaleType="transition"
              data={nauseaVomiting}
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
              visible={state.showDepressions}
              scaleType="transition"
              data={nauseaVomiting}
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
              visible={state.showWaterline}
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

          {state.showPregnancyStages && (
            <PregnancyStages />
          )}

          {state.showSymptomPanel && (
            <SymptomPanel 
              vizScene={vizScene} 
              group="nv"
            />
          )}

        </AnimatePresence>

      </div>
    </div>
  )
}