export const imageMotions = {
  introFade: {
    initial: {
      opacity: 0,
      filter: "blur(6px)",
    },
    whileInView: {
      opacity: 1,
      filter: "blur(0px)",
    },
    transition: {
      duration: 2,
    },
  },
} as const;

export type ImageMotionType = 
  keyof typeof imageMotions;