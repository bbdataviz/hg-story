import { motion } from "framer-motion";
import type { DataPoint } from "src/types/DataPoint";

interface HoverState {
    point: DataPoint;
    x: number;
    y: number;
    scaleType: "population" | "transition";
}

interface TooltipProps {
  hoveredPoint: HoverState;
}

export default function Tooltip({ hoveredPoint}: TooltipProps) {

  const value = hoveredPoint.point.tooltipValue

  const num = Number(value);

  const label =
    num === 0 ? "N/A" : `${num.toFixed(2)}%`;
    
  const width = label.length * 8 + 35;
  const center = width / 2;
  const height = 26;

  return(
    <motion.g 
      className="tooltip"
      pointerEvents="none"
      initial={{
        opacity: 0,
        x: hoveredPoint.x - center,
        y: hoveredPoint.y - 40
      }}
      animate={{
        opacity: hoveredPoint.point ? 1 : 0,
        x: hoveredPoint.x - center,
        y: hoveredPoint.point
          ? hoveredPoint.y - 45
          : hoveredPoint.y - 40
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut"
      }}
    >
      <filter id="shadow">
        <feDropShadow
          dx="0"
          dy="1"
          stdDeviation="1.8"
          floodOpacity="0.1"
        />
      </filter>

      <rect
        width={width}
        height={height}
        rx={5}
        ry={5}
        fill="#f4e8fe"
        filter="url(#shadow)"
      />

      <path 
        d={`
          M ${center - 4} 26
          L ${center} 32
          L ${center + 4} 26
        `}
        y={10}
        fill="#f4e8fe"
        filter="url(#shadow)"
      />

      <text
        x={center}
        y={height / 2 }  
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="1.1rem"
      >
        {label}
      </text>

    </motion.g>
  )
}
