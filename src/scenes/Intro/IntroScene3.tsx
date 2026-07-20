import { motion } from 'framer-motion';
import img from '@/assets/illustration/3.svg';
import { imageMotions } from '../../config/imageMotions';

export default function IntroScene3() {
  return (
    <>
      <p className="text text-lightviolet"> But it turned into a </p>

      <div className="img-container img-saturated">
        <motion.img
          src={img}
          className="intro-img"
          {...imageMotions.introFade}
        />
      </div>

      <p className="text text-white" style={{fontSize: '4rem'}}> NIGHTMARE </p> 
    </>
  )
}
