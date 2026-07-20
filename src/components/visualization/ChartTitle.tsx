import { motion } from 'framer-motion';
import { chartConfig } from 'src/config/chartConfig';

interface Props {
  visible: boolean;
  title: string;
}

export default function ChartTitle({ visible, title }: Props) {

  return(
    <motion.g
      transform={`translate(${chartConfig.innerWidth / 2}, 
      ${0 - (chartConfig.margin.top / 2) - 5}))`}
      animate={{
        opacity: visible ? 1 : 0
      }}
      transition={{ ease: "easeOut", duration: 1.5 }}
    >
      <text
        x={chartConfig.innerWidth / 2}
        y={-30}
        textAnchor="middle"
        fontSize="30"
      >
        {title}
      </text>
    </motion.g>
  )
}
