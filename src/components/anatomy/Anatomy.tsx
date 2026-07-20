import { useRef } from 'react';
import AnatomySVG from '@/assets/illustration/anatomy-paths.svg?react';
import ParticleStream from '../../components/anatomy/ParticleStream';

interface Props {
  currentScene: number;
}

{/* Each child in a list should have a unique "key" prop. */}
export default function Anatomy({ currentScene }: Props) {

  const svgRef = useRef<SVGSVGElement>(null);

  return(
    <svg viewBox="0 0 1060 1028">
      {/* static anatomy */}
      <AnatomySVG
        ref={svgRef}
      />

      {/* animated particles */}
      <ParticleStream
        isActive={currentScene >= 10}
        svgRef={svgRef}
        pathId="bloodstream"
        color="#ff6b8a"
        radius={5}
        duration={3}
        delay={0}
        repeatDelay={0}
      />

      <ParticleStream
        isActive={currentScene >= 11}
        svgRef={svgRef}
        pathId="neuralsignal"
        color="#00d023"
        radius={5}
        duration={1.2}
        delay={0}
        repeatDelay={4}
      />

      <ParticleStream
        isActive={currentScene >= 11}
        svgRef={svgRef}
        pathId="vomiting"
        color="#008717"
        radius={5}
        duration={2.5}
        delay={1.2}
        repeat={0}
        repeatDelay={12}
      />
    </svg>
  )
}