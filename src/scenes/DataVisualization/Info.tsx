import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Props {
  vizScene: number;
  onEnter: (scene: number) => void;
}
export default function Info({ vizScene, onEnter}: Props) {
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
      <div className="info">

        <p className="text text-side outro"> 
          Hyperemesis Gravidarum is more than morning sickness. <br/>
          Understanding it is the first step toward better care.<br/><br/>
          For more Information and Stories about HG experiences visit: <br/><br/>
          <a className="web-link" href="https://www.hyperemesis.org/" target="_blank"> www.hyperemesis.org </a>
        </p>
        <br/><br/>
        <hr/>

        <div className="moba-data">
          <p>
            The Norwegian Mother, Father and Child Cohort Study is supported by the Norwegian
            Ministry of Health and Care Services and the Ministry of Education and Research. We are
            grateful to all the participating families in Norway who take part in this on-going cohort
            study. 
          </p>
        </div>
        
      </div>
      
    </motion.section>
  )
}