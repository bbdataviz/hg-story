import { motion } from 'framer-motion';
import img from '@/assets/prevalence.svg';
import { imageMotions } from '../../config/imageMotions.ts';

export default function Prevalence() {
  return (
    <>
      <p className="text text-white"> How common is Hyperemesis Gravidarum?</p>
      <div className="img-container">
        <motion.img src={img} 
          className="intro-img"
          {...imageMotions.introFade}/>
      </div> 
      <p className="text text-white text-middle">Research suggests that <a className="text-drowsiness">0.3–10.8%</a> of pregnancies are affected by HG, depending on the population* studied.
        On average <a className="text-nausea">~3%</a> of pregnancies worldwide are affected by HG [<a className="link text-lightlavendel" href="https://pubmed.ncbi.nlm.nih.gov/31515515/" target="_blank">Fejzo 2019</a>].<br/>
        <a className="foot-note">* Prevalence estimates vary due to differences in diagnostic criteria, study methods, and ethnical and regional factors.</a> 
      </p>
    </>
  ) 
}