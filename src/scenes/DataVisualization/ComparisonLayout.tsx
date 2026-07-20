import DataVisualization from 'src/components/visualization/DataVisualization.tsx';
import ComparisonChart from 'src/components/visualization/ComparisonChart.tsx';
import { useVisualizationState } from 'src/hooks/useVisualizationState.ts';
import type { Dispatch, SetStateAction } from 'react';

interface Props {
  vizScene: number;
  onEnter: (vizScene: number) => void;
  hasInteracted: boolean;
  setInteracted: Dispatch<SetStateAction<boolean>>
}

export default function ComparisonLayout({
  vizScene, hasInteracted, setInteracted
}: Props) {

  const state = useVisualizationState(vizScene);

  return (
    <>
    <div className="chart-layout">

      <div className="chart-column">
        <DataVisualization
          vizScene={vizScene}
          state={state}
          mode="comparison"
          hasInteracted={hasInteracted}
          setInteracted={setInteracted}
        />
      </div>

      <div className="chart-column">
        <ComparisonChart
          vizScene={vizScene}
          state={state}
          mode="comparison"
          setInteracted={setInteracted}
        />
      </div>

    </div>
  </>
    
  );
}