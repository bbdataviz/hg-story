import { useEffect, useState, useMemo } from 'react';
import * as d3 from 'd3';

interface DataPoint {
  month: number;
  group: string;
  symptom: string;
  population_pct: number | "<10";
  within_group_pct: number | "<10";
}

function parsePercentage(value: string | undefined): number | "<10" {
  if (value === "<10") return "<10";
  return +value!;
}

export function useVisualizationData() {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    d3.csv('/data/data.csv', d => ({ // path when data lives inside public
      month: +d.month!, // + means convert string to number (because all csv entries come as numbers)
      group: d.group!, // ! means there must be a value 
      symptom: d.symptom!,
      population_pct: parsePercentage(d.population_pct),
      within_group_pct: parsePercentage(d.within_group_pct)
    })).then(setData);
  }, []); // empty [] means: run this only once when the component mounts, avoids infinite loop

  const nauseaVomiting = useMemo(() => 
    data.filter(d => d.group === "nausea_vomiting"),
    [data]
  );

  const noNauseaVomiting = useMemo(() => 
    data.filter(d => d.group === "no_nausea_vomiting"),
    [data]
  );

  const hospitalization = useMemo(() => 
    data.filter(d => d.group === "hospitalization"),
    [data]
  );


  return{
    data,
    nauseaVomiting,
    noNauseaVomiting,
    hospitalization
  };
}