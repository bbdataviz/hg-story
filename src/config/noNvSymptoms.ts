import type { Symptom } from 'src/types/Symptom.ts';

export const noNvSymptoms: Symptom[] = [
  {
    id: "no_nausea_vomiting",
    group: "no_nv",
    label: "No nausea with vomiting",
    color: "#d87093",
    visibleAt: [[33, Infinity]],
  },
  {
    id: "compare_fatigue",
    group: "no_nv",
    label: "Fatigue / Drowsiness",
    color: "#92a2c3",
    visibleAt: [[33, Infinity]],
  },
  {
    id: "compare_headache",
    group: "no_nv",
    label: "Headaches",
    color: "#ff794b",
    visibleAt: [[33, Infinity]],
  },
  {
    id: "compare_sleep",
    group: "no_nv",
    label: "Sleeping problems",
    color: "#552ed4",
    visibleAt: [[33, Infinity]],
  },
  {
    id: "compare_depression",
    group: "no_nv",
    label: "Depression",
    color: "#222222",
    visibleAt: [[33, Infinity]],
  },
];