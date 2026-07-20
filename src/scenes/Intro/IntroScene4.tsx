import { motion } from 'framer-motion';
import img from '@/assets/illustration/4.svg';
import { imageMotions } from '../../config/imageMotions';

export default function IntroScene4() {
  return (
    <>
      <p className="text text-white"> I was just 4 weeks pregnant when the </p>

      <div className="img-container">
        <motion.img
          src={img}
          className="intro-img"
          {...imageMotions.introFade}
        />
      </div>

      <p className="text text-white"> Nausea and Vomiting began. </p>
    </>
  )
}

