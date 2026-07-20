import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Props {
  vizScene: number;
  onEnter: (scene: number) => void;
}
export default function Conclusion({ vizScene, onEnter}: Props) {
    const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0, 1, 0.9, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0.95, 1, 1, 0.8]
  );

  return (
    <motion.section
    className="conclusion"
    ref={ref}
    style={{ opacity, scale }}
    onViewportEnter={() => onEnter(vizScene)}

    >
      <p className="text text-side"> 
        Comparing both groups side by side reveals which symptoms are closely associated with nausea and vomiting and which are common during pregnancy regardless of group.      
      </p>
    </motion.section>


  )
}