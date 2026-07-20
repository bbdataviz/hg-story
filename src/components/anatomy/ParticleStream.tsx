import { useSvgPath } from '../../hooks/useSvgPath';
import Particle from '../../components/anatomy/Particle';

interface Props {
  isActive: boolean;
  svgRef: React.RefObject<SVGSVGElement | null>;
  pathId: string;
  color: string;
  radius: number;
  duration: number;
  count?: number;
  delay?: number;
  repeat?: number;
  repeatDelay: number;
}

export default function ParticleStream({ 
  isActive,
  svgRef, 
  pathId, 
  color, 
  radius, 
  duration,
  count = 12,
  delay = 0,
  repeat = Infinity,
  repeatDelay
}: Props) {

  const path = useSvgPath(svgRef, pathId);  

  if (!path) return null;

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Particle 
          isActive={isActive}
          path={path}
          color={color}
          radius={radius}
          duration={duration}
          delay={delay + (i * duration) / count}
          repeat={repeat}
          repeatDelay={repeatDelay}
        />
      ))}      
    </>
  );
}
