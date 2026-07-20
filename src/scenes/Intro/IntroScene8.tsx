import { motion } from 'framer-motion';
import img from '@/assets/illustration/8.svg';

export default function IntroScene8() {
  return (
    <>
      <p className="text text-white"> HG can feel quite the same as <em> dying</em>. </p>

      <div className="img-container">
        <motion.img
          src={img}
          className="img-intro"
          initial={{ 
            scale: 1, 
            rotate: 0,
            opacity: 1, 
            filter: "blur(0px)", 
            translateY: 0 }}
          whileInView={{ 
            scale: 0.8, 
            rotate: -3,
            opacity: 0.2, 
            filter: "blur(5px)", 
            translateY: "10vh"}}
          transition={{ 
            duration: 8,
             
          }}
        />
      </div>

      <p></p>
    </>
  )
}