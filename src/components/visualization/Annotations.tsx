import { useVisualizationState } from 'src/hooks/useVisualizationState.ts';
import PopulationAnnotation from 'src/components/visualization/annotation/PopulationAnnotation'
import DataPointAnnotation from 'src/components/visualization/annotation/DataPointAnnotation.tsx';
import type { DataPoint } from 'src/types/DataPoint.ts';

interface HoverState {
    point: DataPoint;
    x: number;
    y: number;
}

interface AnnotationsProps {
  vizScene: number;
  data: DataPoint[];
  hoveredPoint: HoverState | null;
  hasInteracted: boolean;
}

export default function Annotations({ vizScene, data, hasInteracted }: AnnotationsProps) {

  const state = useVisualizationState(vizScene);

  const dataPoint = data.find(d => d.month === 3 && d.symptom === "nausea_vomiting");

  return (
    <>
      <PopulationAnnotation 
        visible={state.showPopulationAnnotation} 
      />

      {dataPoint && <DataPointAnnotation
        visible={state.showDataPointAnnotation}
        dataPoint={dataPoint}
        hasInteracted={hasInteracted}
      />}
    </>
  );
}