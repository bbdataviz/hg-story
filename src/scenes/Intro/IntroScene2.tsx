import { motion } from 'framer-motion';
import img from '@/assets/illustration/2.svg';
import { imageMotions } from '../../config/imageMotions';

export default function IntroScene2() {
  return (
    <>
      <p className="text text-rose"> It was supposed to be </p>

      <div className="img-container img-saturated">
        <motion.img
          src={img}
          className="intro-img"
          {...imageMotions.introFade}
        />
      </div>

      <p className="text text-rose"> the happiest time of my life. </p> 
    </>
  )
}