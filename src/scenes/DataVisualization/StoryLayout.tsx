import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useVisualizationState } from 'src/hooks/useVisualizationState.ts';
import type { Dispatch, SetStateAction } from 'react';

import DataVisualization from 'src/components/visualization/DataVisualization.tsx';
import ExplainStep from 'src/components/layout/ExplainStep.tsx';
import SideNotesStep1 from 'src/scenes/DataVisualization/SideNotesStep1.tsx';
import SideNotesStep2 from 'src/scenes/DataVisualization/SideNotesStep2.tsx';
import SideNotesStep3 from 'src/scenes/DataVisualization/SideNotesStep3.tsx';
import SideNotesStep4 from 'src/scenes/DataVisualization/SideNotesStep4.tsx';
import SideNotesStep5 from 'src/scenes/DataVisualization/SideNotesStep5.tsx';
import SideNotesStep6 from 'src/scenes/DataVisualization/SideNotesStep6.tsx';
import SideNotesStep7 from 'src/scenes/DataVisualization/SideNotesStep7.tsx';
import SideNotesStep8 from 'src/scenes/DataVisualization/SideNotesStep8.tsx';
import SideNotesStep9 from 'src/scenes/DataVisualization/SideNotesStep9.tsx';
import SideNotesStep10 from 'src/scenes/DataVisualization/SideNotesStep10.tsx';
import SideNotesStep11 from 'src/scenes/DataVisualization/SideNotesStep11.tsx';
import SideNotesStep12 from 'src/scenes/DataVisualization/SideNotesStep12.tsx';
import SideNotesStep13 from 'src/scenes/DataVisualization/SideNotesStep13.tsx';
import SideNotesStep14 from 'src/scenes/DataVisualization/SideNotesStep14.tsx';


interface StoryLayoutProps {
  vizScene: number;
  onEnter: (vizScene: number) => void;
  hasInteracted: boolean;
  setInteracted: Dispatch<SetStateAction<boolean>>;
}

export default function DataVisualizationSection({ vizScene, onEnter, hasInteracted, setInteracted }: StoryLayoutProps) {

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 0.9, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.95, 1, 1, 0.8]);

  {/* progressive disclosure logic */}
  const state = useVisualizationState(vizScene);

  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (vizScene !== 24) {
      setZoomed(false);
    }
  }, [vizScene]);

  return (
    <>
      <motion.section
        ref={ref}
        onViewportEnter={() => {
          onEnter(vizScene);
        }}
        viewport={{ amount: 0.5 }}
        style={{ opacity, scale }}
      >

        <div className="vis-container">

          <motion.div 
            className="visualization"
            animate={{
              flex: state.showComparison ? 1 : 3
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut"
            }}
            >
            <DataVisualization 
              vizScene={vizScene}
              state={state}
              zoomed={zoomed}
              mode="story"
              hasInteracted={hasInteracted}
              setInteracted={setInteracted}
            />
          </motion.div>
          
          {/* Side Notes /*}
          {/* x axis */}
          <div className="vis-side-notes">
            <ExplainStep
              index={19}
              onEnter={onEnter}
            >
              <SideNotesStep1 />
            </ExplainStep>

            {/* y axis */}
            <ExplainStep
              index={20}
              onEnter={onEnter}
            >
              <SideNotesStep2 />
            </ExplainStep>

            {/* area */}
            <ExplainStep
              index={21}
              onEnter={onEnter}
            >
              <SideNotesStep3 />
            </ExplainStep>

            <ExplainStep
              index={22}
              onEnter={onEnter}
            >
              <SideNotesStep4 />
            </ExplainStep>

            <ExplainStep
              index={23}
              onEnter={onEnter}
            >
              <SideNotesStep5 />
            </ExplainStep>

            <ExplainStep
              index={24}
              onEnter={onEnter}
            >
              <SideNotesStep6 
                state={state.showZoomButton}
                zoomed={zoomed}
                setZoomed={setZoomed}
              />
            </ExplainStep>

            <ExplainStep
              index={25}
              onEnter={onEnter}
            >
              <SideNotesStep7 />
            </ExplainStep>

            {/* I c e b e r g */}

            {/* move chart up, axis */}
            <ExplainStep
              index={26}
              onEnter={onEnter}
            >
              <SideNotesStep8 />
            </ExplainStep>

            {/* mirror, waterline, annotate chart regions */}
            <ExplainStep
              index={27}
              onEnter={onEnter}
            >
              <SideNotesStep9 />
            </ExplainStep>

            {/* transform to within */}
            <ExplainStep
              index={28}
              onEnter={onEnter}
            >
              <SideNotesStep10 />
            </ExplainStep>

            {/* Fatigue example */}
            <ExplainStep
              index={29}
              onEnter={onEnter}
            >
              <SideNotesStep11 />
            </ExplainStep>

            {/* Headaches */}
            <ExplainStep
              index={30}
              onEnter={onEnter}
            >
              <SideNotesStep12 />
            </ExplainStep>

            {/* Sleeping Problems */}
            <ExplainStep
              index={31}
              onEnter={onEnter}
            >
              <SideNotesStep13 />
            </ExplainStep>

            {/* Depressions */}
            <ExplainStep
              index={32}
              onEnter={onEnter}
            >
              <SideNotesStep14 />
            </ExplainStep>

          </div>
        </div>
        
      </motion.section>
    </>
  )
}