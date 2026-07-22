import * as d3 from 'd3';
import { useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { useChart } from 'src/hooks/useChart';
import { motion, animate, useMotionValue, type MotionValue, useTransform } from 'framer-motion';
import type { DataPoint } from 'src/types/DataPoint.ts';
import type { RevealDirection } from 'src/types/revealDirection.ts';

interface HoverState {
    point: DataPoint;
    x: number;
    y: number;
    scaleType: "population" | "transition";
}

interface Props {
  visible: boolean;
  scaleType: "population" | "transition";
  data: DataPoint[];
  symptom: string;
  color: string;
  animateIn?: boolean;
  revealDirection: RevealDirection;
  hoveredPoint: HoverState | null; 
  setHovered: Dispatch<SetStateAction<HoverState | null>>;
  zoomed?: boolean;
  seriesCount: number;
  chartCompression: MotionValue<number>;
  delayed?: number;
  tooltipmode?: "population" | null;
  transition: MotionValue<number>;
}

function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

export default function Area({ visible, scaleType, data, symptom, color, animateIn, revealDirection, hoveredPoint, setHovered, zoomed, seriesCount, chartCompression, delayed, tooltipmode, transition }: Props) {
  
  const { innerWidth, innerHeight, xScale } = useChart();

  const areaData = data.filter(
    d => d.symptom === symptom
  );

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
  const populationScale = d3.scaleLinear()
    .domain([currentDomain, 0])
    .range([0, chartHeight])
    .clamp(true);

  // merge withinGroupScale and mirrorScale => lowerScale
  const lowerScale = d3.scaleLinear()
    .domain([0, currentDomain])
    .range([chartHeight, 2 * chartHeight])

  const yScale = scaleType === "population"
    ? populationScale
    : lowerScale;

  const [transitionValue, setTransitionValue] = useState(0);

  useEffect(() => {
    const unsubscribe = transition.on("change", setTransitionValue);
    return unsubscribe;
  }, [transition]);

  const area = d3.area<DataPoint>()
    .x(d => xScale(d.month))
    .y0(yScale(0)) // baseline 0

    .y1(d => {
      if (scaleType === "population") {
        return populationScale(d.population_pct as number);
      }

      const mirrorY = lowerScale(d.population_pct as number);
      const withinY = lowerScale(d.within_group_pct as number);

      return lerp(mirrorY, withinY, transitionValue);
    })

    .curve(d3.curveCardinal.tension(0.5));


  function getPointPosition(
    d: DataPoint,
    focusedMonth: number | null
  ) {

    const value = scaleType === "transition"
      ? d.within_group_pct as number
      : d.population_pct as number


    let baseY: number;

    if (scaleType === "population") {
        baseY = populationScale(d.population_pct as number);
    } else {
        const mirrorY = lowerScale(d.population_pct as number);

        const withinY = lowerScale(d.within_group_pct as number);

        baseY = lerp(
            mirrorY,
            withinY,
            transitionValue
        );
    }
      
    // local vertical expansion around the hovered month depending on number of areas
    const isFocusedMonth =
      focusedMonth === d.month && d.month >= 6;

     const focusedOffset = isFocusedMonth && !zoomed && scaleType === "population"
      ? ((Math.log10(Math.max(value, 0.05))) * ( 1 + 0.4 * (seriesCount - 1))) + 2
      : 0;
      // ((100 - value) * (Math.log(Math.max(value, 0.07)) * 0.008 * seriesCount)) + 8
      // (8 + Math.abs(Math.log10(Math.max(value, 0.05))) * 5) * (1 + 0.25 * (seriesCount - 1))
   
    return {
      x: xScale(d.month),
      y: baseY - focusedOffset,
    };
  }


  const offsetAreaMargin = -50; // to avoid cutoff elements that go beyond axis
  const maskWidth = innerWidth - 2 * offsetAreaMargin;
  const maskHeight = chartHeight * 2 + 2 * Math.abs(offsetAreaMargin);

  const gradientId = `${symptom}-${scaleType}-gradient`;
  const maskId = `${symptom}-${scaleType}-mask`;
  const revealMaskId = `${symptom}-${scaleType}-revealMask`;

  const revealMask = (() => {
    switch(revealDirection) {
      case "timeline":
        return (
          <motion.rect
            x={offsetAreaMargin}
            y={offsetAreaMargin}
            height={maskHeight} 
            initial={
              animateIn 
                ? { width: maskWidth } 
                : { width: 0 }
            }
            animate={{
              width: visible ? innerWidth + 200 : 0
            }}
            transition={{
              delay: 0.8,
              duration: 3,
              ease: "easeOut"
            }}
            fill={`url(#${maskId})`}
          />
        );

      case "population":
        return (
          <motion.rect
            x={offsetAreaMargin}
            y={offsetAreaMargin}
            width={maskWidth} 
            initial={
              animateIn 
                ? { y: offsetAreaMargin + maskHeight,
                  height: 0 } 
                : { y: offsetAreaMargin + maskHeight,
                  height: 0 }
            }
            animate={{
              y: visible ? offsetAreaMargin : offsetAreaMargin + chartHeight,
              height: visible ? maskHeight + 100 : 0
            }}
            exit={{
              opacity: visible ? 1 : 0
            }}
            transition={{
              delay: 1,
              duration: 5
            }}
            fill={`url(#${maskId})`}
          />
          
        );

      case "iceberg":
        return (
          <motion.rect
            x={offsetAreaMargin}
            y={offsetAreaMargin}
            width={maskWidth} 
            initial={
              animateIn 
                ? { height: maskHeight } 
                : { height: 0 }
            }
            animate={{
              height: visible ? maskHeight + 100 : 0
            }}
            transition={{
              delay: delayed ?? 0.5,
              duration: 4,
              ease: "easeOut"
            }}
            fill={`url(#${maskId})`}
          />
        );
    }
  })();

  const areaGradient = 
    revealDirection === "iceberg" ? (
      <>
        <stop
          offset="0%"
          stopColor={`${color}55`}
        />
        <stop
          offset="100%"
          stopColor={`${color}`}
        />
      </>
    ) : (
      <>
        <stop
          offset="0%"
          stopColor={`${color}`}
        />
        <stop
          offset="100%"
          stopColor={`${color}55`}
        />
      </>
    );
      
  const gradientMask =
    revealDirection === "population" ? (
      <>
        <stop offset="0%" stopColor="black" />
        <stop offset="10%" stopColor="white" />
        <stop offset="100%" stopColor="white" />
      </>
    ) : (
      <>
        <stop offset="0%" stopColor="white" />
        <stop offset="90%" stopColor="white" />
        <stop offset="100%" stopColor="black" />
      </>
  );


  return(
    <>
      <defs>

        {/* Area fill */}
        <linearGradient
            id={gradientId}
            x1="0%"
            y1={revealDirection === "iceberg" ? "100%" : "0%"}
            x2="0%"
            y2={revealDirection === "iceberg" ? "0%" : "100%"}
        >
            {areaGradient}
        </linearGradient>

        {/* Reveal mask */}
        <linearGradient
            id={maskId}
            x1={revealDirection === "timeline" ? "0%" : "0%"}
            y1={revealDirection === "timeline" ? "0%" : "100%"}
            x2={revealDirection === "timeline" ? "100%" : "0%"}
            y2={revealDirection === "timeline" ? "0%" : "0%"}
        >
            {gradientMask}
        </linearGradient>

        <mask id={revealMaskId}>
            {revealMask}
        </mask>

      </defs>

      <g mask={`url(#${revealMaskId})`}>
        {/* Area element */}
        <motion.path 
          d={area(areaData) ?? ""}
          fill={`url(#${gradientId})`}
          // transition between population and within group
          //style={{ opacity }}
  
          transition={{
            delay: scaleType === "transition" ? delayed : 0.5, 
            duration: 3 
          }}
        />

        {/* Data point circle */}
        {areaData.map((d) => {
          // const value = d.population_pct as number;

          

           // decide value for tooltip based on state of the chart
          const tooltipValue =
            (transitionValue < 1 || tooltipmode === "population")
              ? d.population_pct as number
              : d.within_group_pct as number;

          if (zoomed && tooltipValue > 3) {
            return null;
          }

          const { x, y } = getPointPosition(
            d,
            hoveredPoint?.point.month ?? null
          );

          return (
            <g key={d.month}>
              <rect
                x={x - 15}
                y={y - 7}
                width={30}
                height={14}
                fill="transparent"
                style={{
                  pointerEvents: visible ? "auto" : "none",
                  cursor: "pointer",
                }}
                onMouseEnter={() => 
                  setHovered({
                    point: {...d,
                      tooltipValue
                    },
                    x,
                    y,
                    scaleType: scaleType === "transition"
                      ? "transition"
                      : "population"
                })} 

                onMouseLeave={() => setHovered(null)}
              />
              <motion.circle
                cx={x}
                cy={y}
                fill={color}
                stroke="white"
                strokeWidth={2}
                style={{
                  pointerEvents: visible ? "auto" : "none"
                }}

                animate={{
                  r: hoveredPoint?.point === d ? 7.5 : 5,
                  cy: y
                }}
                transition={{
                  duration: 0.15
                }}

                onMouseEnter={() => 
                  setHovered({
                    point: {...d,
                      tooltipValue
                    },
                    x,
                    y,
                    scaleType: scaleType === "transition"
                      ? "transition"
                      : "population"
                })} 

                onMouseLeave={() => setHovered(null)}
              />
            </g>
        )})}
      </g>
    </>
  )
}


{/*
areaData: 

const areaData = data.filter(
    d => d.symptom === symptom
  );

Result: Array of objects
[
 d = { month: 1, population_pct: ... },
 d = { month: 2, population_pct: ... },
  ...
]  
*/}