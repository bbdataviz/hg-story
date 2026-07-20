import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { motion } from 'framer-motion';

interface VisProps {
  visible: boolean
  zoomed: boolean;
  setZoomed: Dispatch<SetStateAction<boolean>>;
}



export default function ZoomButton({visible, zoomed, setZoomed}: VisProps) {
  
  const [hovered, setHovered] = useState(false); 

  const buttonLabel = !zoomed ? (
    <>
      <motion.span 
        className="zoom-icon"
        animate={{
          rotate: hovered ? -10 : 0,
          scale: hovered ? 1.1 : 1.02
        }}
        whileTap={{
          scale: 1
        }}
        transition={{ duration: 0.3}}
      >🔍</motion.span> 
      {" "}Zoom to severe cases
    </>
  ) : (
    <>
    <span className="return-icon">⮐</span> 
    {"  "}Return to full scale
    </>
  );
     
  return (
    <motion.button
      className="zoom-button"
      animate={{ 
        opacity: visible ? 1 : 0, 
        scale: visible ? 1 : 0.9
      }}
      transition={{
        duration: 0.5
      }}

      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      
      onClick={() => !zoomed 
        ? setZoomed(true) 
        : setZoomed(false)
      }
      >
      {buttonLabel}

    </motion.button>

  )
}