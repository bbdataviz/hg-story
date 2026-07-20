import { AnimatePresence } from 'framer-motion';
import SymptomItem from 'src/components/visualization/SymptomItem.tsx';
import { nvSymptoms } from 'src/config/nvSymptoms.ts';
import { noNvSymptoms } from 'src/config/noNvSymptoms.ts';

interface VisProps {
  vizScene: number;
  group: "nv" | "no_nv";
}

export default function SymptomPanel({vizScene, group}: VisProps) {

const symptoms = 
  group === "nv" 
    ? nvSymptoms
    : noNvSymptoms 

const visibleSymptoms = symptoms.filter(symptom =>
    symptom.group.includes(group) &&
    symptom.visibleAt.some(([start, end]) =>
        vizScene >= start &&
        vizScene <= end
    )
);

return (
  <div className="label-panel">
    <p className="symptom-headline">Symptoms shown:</p>
    <div className="symptom-panel">
      <AnimatePresence>    
        {visibleSymptoms.map(symptom => (
          <SymptomItem
            key={symptom.id}
            symptom={symptom}
          />
        ))}
      </AnimatePresence>
    </div>
  </div>
  )
}