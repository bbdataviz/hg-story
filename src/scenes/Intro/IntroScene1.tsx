import { motion } from 'framer-motion';
import img from '@/assets/illustration/1.svg';
import { imageMotions } from '../../config/imageMotions';

export default function IntroScene1() {
  return (
    <>
      <p className="text-greet"> Hi! </p>

      <div>
        <motion.img
          src={img}
          className="intro-small"
          {...imageMotions.introFade}
        />
      </div>

      <p className="text text-rose text-first"> My name is Freja Solberg. </p>
    </>
  )
}