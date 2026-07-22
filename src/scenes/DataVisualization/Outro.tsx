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
    
      <p className="text text-side outro"> 
        Despite the heavy burden of Hyperemesis Gravidarum, many mothers are happy and relieved when they finally hold their child in their arms. <br/><br/>

        For some women, however, the emotional and physical effects do not end with pregnancy. 
        Recovery can take time, and the experience may leave lasting psychological or physical consequences. 
        Recognizing these challenges and providing timely support can make a meaningful difference. <br/><br/>

        If you or someone you know experiences persistent nausea and vomiting during pregnancy, don't hesitate to seek medical advice. 
        Effective treatments and supportive care are available, and early intervention can help reduce the burden of the condition.    
      </p>
   
    </motion.section>
  )
}