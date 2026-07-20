import { useState } from 'react';
import Header from './components/layout/Header.tsx';
import Introduction from './components/layout/Introduction.tsx';
import IntroSection from './components/layout/IntroSection.tsx';
import ExplainDiseaseSection from './scenes/ExplainDisease/ExplainDiseaseSection.tsx';
import DataSection from './components/layout/DataSection.tsx';
import DataVisualizationSection from './scenes/DataVisualization/DataVisualizationSection.tsx';
import Waves from './components/layout/Waves.tsx';
import Title from './scenes/Intro/Title.tsx';
import IntroScene1 from './scenes/Intro/IntroScene1.tsx';
import IntroScene2 from './scenes/Intro/IntroScene2.tsx';
import IntroScene3 from './scenes/Intro/IntroScene3.tsx';
import IntroScene4 from './scenes/Intro/IntroScene4.tsx';
import IntroScene5 from './scenes/Intro/IntroScene5.tsx';
import IntroScene6 from './scenes/Intro/IntroScene6.tsx';
import IntroScene7 from './scenes/Intro/IntroScene7.tsx';
import IntroScene8 from './scenes/Intro/IntroScene8.tsx';
import IntroScene9 from './scenes/Intro/IntroScene9.tsx';
import IntroScene10 from './scenes/Intro/IntroScene10.tsx';
import TransitionData from './scenes/DataVisIntro/TransitionData.tsx';
import DataVisIntro from './scenes/DataVisIntro/DataVisIntro.tsx';
import Prevalence from './scenes/DataVisIntro/Prevalence.tsx';
import Data from './scenes/DataVisIntro/Data.tsx';

//import OutroScence1 from './scenes/DataVisualization/DataVisualizationScene1.tsx';
import './styles/App.css'
import { type EmotionVariable } from './config/emotionConfig.ts';

function App() {
  const [emotion, setEmotion] = useState<EmotionVariable>("none");
  const [storyScene, setStoryScene] = useState(0);

  const waveLevels = [
    30, // Scene 1
    30, // Scene 2
    25, // Scene 3
    20, // Scene 4
    15, // Scene 5
    10, // Scene 6
    5, // Scene 7
    0, // Scene 8
    10, // Scene 9
    30, // Scene 10
    30, // Scene 11
    30, // Scene 12
    0, // Scene 13
    0, // Scene 14
    0, // Scene 15
    0, // Scene 16
    10, // Scene 17
  ];

  return (
    <>
      <Header />
      <Introduction>
        <div className="intro">
          <Waves 
            emotion={emotion} 
            level={waveLevels[storyScene]} 
            index={storyScene}
            visible={storyScene <= 16 }
          />

          <IntroSection 
            index={0} 
            onEnter={setStoryScene}
            emotion="happy"
            onEmotionEnter={setEmotion}
          >
            <Title />
          </IntroSection>

          <IntroSection 
            index={0} 
            onEnter={setStoryScene}
            emotion="happy"
            onEmotionEnter={setEmotion}
          >
            <IntroScene1 />
          </IntroSection>

          <IntroSection 
            index={1} 
            onEnter={setStoryScene}
            emotion="hopeful"
            onEmotionEnter={setEmotion}
          >
            <IntroScene2 />
          </IntroSection>

          <IntroSection 
            index={2} 
            onEnter={setStoryScene}  
            emotion="anxious"
            onEmotionEnter={setEmotion}
          >
            <IntroScene3 />
          </IntroSection>

          <IntroSection 
            index={3} 
            onEnter={setStoryScene}
          >
            <IntroScene4 />
          </IntroSection>

          <IntroSection 
            index={4} 
            onEnter={setStoryScene}
            emotion="anxious"
            onEmotionEnter={setEmotion}
          >
            <IntroScene5 />
          </IntroSection>

          <IntroSection 
            index={5} 
            onEnter={setStoryScene}
            emotion="overwhelmed"
            onEmotionEnter={setEmotion}
          >
            <IntroScene6 />
          </IntroSection>

          <IntroSection 
            index={6}
            onEnter={setStoryScene}
            emotion="overwhelmed"
            onEmotionEnter={setEmotion}
          >
            <IntroScene7 />
          </IntroSection>

          <IntroSection 
            index={7} 
            onEnter={setStoryScene}  
            emotion="depressed"
            onEmotionEnter={setEmotion}
          >
            <IntroScene8 />
          </IntroSection>

          <IntroSection 
            index={8}
            onEnter={setStoryScene}
          >
            <IntroScene9 />
          </IntroSection>

          <IntroSection
            index={9} 
            onEnter={setStoryScene}  
            emotion="curious"
            onEmotionEnter={setEmotion}
          >
            <IntroScene10 />
          </IntroSection>
        </div>
      
      </Introduction>

      <div className="sticky-bg">
        <ExplainDiseaseSection 
          index={10}
          onEnter={setStoryScene}
          emotion="curious"
          setEmotion={setEmotion}
           />
      </div>

      <div className="data-intro">
        <IntroSection
          index={14}
          onEnter={setStoryScene}
          emotion="sad"
          onEmotionEnter={setEmotion}
        >
          <TransitionData />
        </IntroSection>

        <IntroSection
          index={15}
          onEnter={setStoryScene}
          emotion="sad"
          onEmotionEnter={setEmotion}
        >
          <DataVisIntro />
        </IntroSection>

        <DataSection
          index={16}
          onEnter={setStoryScene}
          emotion="sad"
          onEmotionEnter={setEmotion}
          >
          <Prevalence />
        </DataSection>
      </div>

      <div className="transition-bg">
        <DataSection
          index={17}
          onEnter={setStoryScene}>
          <Data />
        </DataSection>
      </div>
        
      <div className="sticky-bg">
        <DataVisualizationSection 
        index={18}
        onEnter={setStoryScene}/>
      </div>
      
    </>
  )
}

export default App
