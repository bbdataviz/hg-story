import { motion } from 'framer-motion';
import img from '@/assets/illustration/8.svg';

export default function IntroScene9() {
  return (
    <>
      <p className="text text-white"> At just 6 weeks pregnant, I already had my first hospital visit. </p>
      
      <div className="img-container">
        <motion.img
          src={img}
          initial={{ 
            scale: 0.8,
            rotate: "-3deg", 
            opacity: 0.2, 
            filter: "blur(5px)" 
          }}
          whileInView={{ 
            scale: 1, 
            rotate: 0,
            opacity: 1,
            filter: "blur(0px)"
          }}
          transition={{ 
            duration: 8 
          }}
        />
      </div>
      
      <p className="text text-white"> I obtained fluids against dehydration, medication, and treatment. </p>
    </>
  )
}