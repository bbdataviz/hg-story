import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Anatomy from 'src/components/anatomy/Anatomy.tsx';
import ExplainStep from 'src/components/layout/ExplainStep.tsx';
import SideNotesStep1 from 'src/scenes/ExplainDisease/SideNotesStep1.tsx';
import SideNotesStep2 from 'src/scenes/ExplainDisease/SideNotesStep2.tsx';
import SideNotesStep3 from 'src/scenes/ExplainDisease/SideNotesStep3.tsx';
import { type EmotionVariable } from 'src/config/emotionConfig';


interface ExplainSectionProps {
  index: number;
  onEnter: (index: number) => void;
  emotion?: EmotionVariable;
  setEmotion?: (emotion: EmotionVariable) => void;

}

export default function ExplainDiseaseSection({ index, onEnter, emotion, setEmotion }: ExplainSectionProps) {

  const [currentScene, setCurrentScene] = useState(0);

  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 0.9, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.8]);

  return (
    <>
      {/* transition for the whole section */}
      <motion.section 
        ref={ref}
        onViewportEnter={() => {
          onEnter(index);

          if (emotion && setEmotion) {
            setEmotion(emotion);
          }
        }}
        viewport={{ amount: 0.5 }}
        style={{ opacity, scale }}
      > 
        {/* Anatomy and Side notes below */}
        <div className="content-container">
          <div className="graphic-container">
            <Anatomy currentScene={currentScene} />
          </div>

          <div className="side-notes">
            <ExplainStep 
              index={10}
              onEnter={setCurrentScene}
              emotion="curious"
              onEmotionEnter={setEmotion}
            >
              <SideNotesStep1 />
            </ExplainStep>
            
            <ExplainStep
              index={11}
              onEnter={setCurrentScene}
            >
              <SideNotesStep2 />
            </ExplainStep>

            <ExplainStep
              index={12}
              onEnter={setCurrentScene}
              emotion="curious"
              onEmotionEnter={setEmotion}
            >
              <SideNotesStep3 />
            </ExplainStep>
          </div>
        </div>
      </motion.section>
    </>
  )
}
