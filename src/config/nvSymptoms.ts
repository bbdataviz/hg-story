import type { Symptom } from 'src/types/Symptom.ts';

export const nvSymptoms: Symptom[] = [
  {
    id: "nausea_vomiting",
    group: "nv",
    label: "Nausea with vomiting (NV)",
    color: "#00d023",
    visibleAt: [[25, Infinity]],
  },
  {
    id: "hospital",
    group: "nv",
    label: "Hospitalized due to NV",
    color: "#d00042",
    visibleAt: [
      [23, 25],
      [30, Infinity]
    ],
  },
  {
    id: "fatigue",
    group: "nv",
    label: "Fatigue / Drowsiness",
    color: "#92a2c3",
    visibleAt: [[25, Infinity]],
  },
  {
    id: "headache",
    group: "nv",
    label: "Headaches",
    color: "#ff794b",
    visibleAt: [[30, Infinity]],
  },
  {
    id: "sleep",
    group: "nv",
    label: "Sleeping problems",
    color: "#552ed4",
    visibleAt: [[31, Infinity]],
  },
  {
    id: "depression",
    group: "nv",
    label: "Depression",
    color: "#222222",
    visibleAt: [[32, Infinity]],
  },
];