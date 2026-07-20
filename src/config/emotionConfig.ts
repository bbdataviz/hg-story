export const EmotionConfig = {
  none: {
    color: "#fff",
    opacity: 0
  },
  happy: {
    color: "#d87093",
    opacity: 0.1
  },

  hopeful: {
    color: "#d98fa5",
    opacity: 0.2
  },

  anxious: {
    color: "#593f72",
    opacity: 0.4
  },

  overwhelmed: {
    color: "#362e54",
    opacity: 0.5
  },

  depressed: {
    opacity: 0.3,
    color: "#07021c"
  },

  curious: {
    opacity: 0,
    color: "#ccc3f0"
  },

  sad: {
    opacity: 0.3,
    color:"#181731"
  }
} as const;

export type EmotionVariable = 
  keyof typeof EmotionConfig;

