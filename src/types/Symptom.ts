export interface Symptom {
  id: string;
  group: "nv" | "no_nv",
  label: string;
  color: string;
  visibleAt: [number, number][];
}