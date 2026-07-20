import { motion } from 'framer-motion';
import img from '@/assets/illustration/5.svg';
import { imageMotions } from '../../config/imageMotions';

export default function IntroScene5() {
  return (
    <>
      <p className="text text-white"> I felt sick all the time, sometimes I couldn't even drink. </p>
      
      <div className="img-container">
        <motion.img
          src={img}
          className="intro-img"
          {...imageMotions.introFade}
        />
      </div>
      <p className="text text-white"> I thought, I have to see my doctor ! </p>
    </>
  )
}