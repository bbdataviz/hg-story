import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Props {
  vizScene: number;
  onEnter: (scene: number) => void;
}
export default function TransitionPage({ vizScene, onEnter}: Props) {
    const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.9, 1],
    [0, 1, 0.8, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0.95, 1, 1, 0.8]
  );

  return (
    <motion.section
      className="transition-page"
      ref={ref}
      style={{ opacity, scale }}
      onViewportEnter={() => onEnter(vizScene)}
    >
      <p className="text"> 
        How different is this pattern among women who did not experience nausea and vomiting?       
      </p>
    </motion.section>


  )
}