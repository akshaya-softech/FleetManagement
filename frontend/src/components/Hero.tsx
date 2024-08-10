import hero from "../assets/hero.jpg";

const Hero = () => {
  return(
    <div>
        <img src={hero} className="w-1/2 max-h-[500px] object-fit-cover"/>
        
    </div>
  );
}

export default Hero;