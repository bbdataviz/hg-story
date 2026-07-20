import { motion } from "framer-motion";
import { usePathParticle } from "../../hooks/usePathParticle";

interface Props {
  isActive: boolean;
  path: SVGPathElement;
  color: string;
  radius: number;
  duration: number;
  delay?: number;
  repeat: number;
  repeatDelay: number;
}

export default function Particle({
  isActive,
  path,
  color,
  radius,
  duration,
  delay = 0,
  repeat = Infinity,
  repeatDelay
}: Props) {

  const { x, y, opacity } = usePathParticle(isActive, path, duration, delay, repeat, repeatDelay);

  return (
    <motion.circle
      r={radius}
      fill={color}
      style={{
        cx: x,
        cy: y,
        opacity
      }}
    />
  );
}