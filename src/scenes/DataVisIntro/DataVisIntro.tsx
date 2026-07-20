import img from '@/assets/illustration/dv-intro.svg';

export default function DataVisIntro() {
  return (
    <>
      <p className="text text-white"> Symptoms beneath the Surface </p>
      
      <div className="img-container img-dv-intro">
        <img src={img}></img>
      </div>

      <p className="text text-white"> Was Freja's experience unique? </p>
    </>
  )
}