export interface DataPoint {
  month: number;
  group: string;
  symptom: string;
  population_pct: number | "<10";
  within_group_pct: number | "<10";
  tooltipValue?: number;
} 