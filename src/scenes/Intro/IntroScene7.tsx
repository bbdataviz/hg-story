import { motion } from 'framer-motion';
import img from '@/assets/illustration/7.svg';
import { imageMotions } from '../../config/imageMotions';

export default function IntroScene7() {
  return (
    <>
      <p className="text text-white"> The doctor gave me a prescription for 
        <span className="text-lightrose"> Anti-nausea Medication. </span>  
      </p>
      
      <div className="img-container">
        <motion.img
          src={img}
          className="intro-img"
          {...imageMotions.introFade}
        />
      </div>
      
      <p className="text text-white"> That helped a bit but my 
        <span className="text-lightgreen"> symptoms </span> 
        were still 
        <span className="text-lightgreen"> too severe. </span> 
      </p>
    </>
  )
}