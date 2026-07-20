import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import StoryLayout from "./StoryLayout";
import ComparisonLayout from "./ComparisonLayout";
import TransitionPage from "./TransitionPage";
import Conclusion from "./Conclusion.tsx";
import Outro from "./Outro.tsx";
import Info from "./Info.tsx";

import { useVisualizationState } from "src/hooks/useVisualizationState";

interface Props {
  index: number;
  onEnter: (scene: number) => void;
}

export default function DataVisualizationSection({ index, onEnter}: Props) {
  
  const [vizScene, setVizScene] = useState(19);

  const [hasInteracted, setInteracted] = useState(false)

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1],
    [0, 1, 1, 0]
  );

  const state = useVisualizationState(vizScene);

  return (

    <motion.section
      ref={ref}
      style={{ opacity }}
      onViewportEnter={() => onEnter(index)}
      >
        <div className="layout-stack">

          <motion.div
            animate={{
              opacity: state.showComparison ? 0 : 1
            }}
            transition={{
              duration: 1
            }}
            style={{
              pointerEvents: state.showComparison ? "none" : "auto"
            }}
          >
            <StoryLayout 
              vizScene={vizScene} onEnter={setVizScene} 
              hasInteracted={hasInteracted}
              setInteracted={setInteracted}
            />
          </motion.div>

          <TransitionPage vizScene={33} onEnter={setVizScene}/>

          <motion.div
            animate={{
                opacity: state.showComparison ? 1 : 0
            }}
            transition={{
                duration: 1,
                delay: 3
            }}
            style={{
                pointerEvents: state.showComparison ? "auto" : "none"
            }}
          >
            <ComparisonLayout 
              vizScene={vizScene} onEnter={setVizScene} 
              hasInteracted={hasInteracted}
              setInteracted={setInteracted}
              
            />
          </motion.div>

          <Conclusion vizScene={35} onEnter={setVizScene}/>

          <Outro vizScene={36} onEnter={setVizScene}/>

          <Info vizScene={37} onEnter={setVizScene}/>

        </div>
      </motion.section>
    );
  }
