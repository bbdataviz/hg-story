import { motion } from 'framer-motion';
import img from '@/assets/illustration/6.svg';
import { imageMotions } from '../../config/imageMotions';

export default function IntroScene6() {
  return (
    <>
      <p className="text text-white"> My doctor diagnosed me with <span className="text-lightgreen">Hyperemesis Gravidarum</span>,</p>

      <div className="img-container">
        <motion.img
          src={img}
          className="intro-img"
          {...imageMotions.introFade}
        />
      </div>

      <p className="text text-white"> a <span className="text-lightgreen"> severe 
        </span> form of <span className="text-lightgreen"> Nausea and Vomiting </span> 
        during Pregnancy. 
      </p>
    </>
  )
}