import React from 'react';
import width1066 from '../assets/width1066.webp';
import { easeInOut, motion } from 'motion/react';

const Home = () => {
  return (
    <div className="w-full min-h-screen relative overflow-hidden">
      <img
        src={width1066}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-70 md:opacity-80"
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="mb-4 md:mb-8">
          <motion.p 
            initial={{opacity:0}} 
            whileInView={{opacity:1}} 
            transition={{duration:1,type:'tween',ease:easeInOut}} 
            className="text-[10px] xs:text-xs sm:text-sm md:text-base text-stone-600 font-medium tracking-widest uppercase"
          >
            "NOT JUST EVENTS. RARE EXPERIENCES"
          </motion.p>
        </div>

        <div className="maintext space-y-2 md:space-y-4">
          <motion.p
            initial={{x:-100,opacity:0}}
            whileInView={{x:0,opacity:1}}
            transition={{duration:1.5,type:"tween",ease:"easeInOut"}}
            viewport={{ once: true }}
            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-stone-700 tracking-wide leading-tight"
            id="txt"
          >
            RAREELITE
          </motion.p>
          <motion.p
            initial={{x:100,opacity:0}}
            whileInView={{x:0,opacity:1}}
            transition={{duration:1.5,type:"tween",ease:"easeInOut"}}
            viewport={{ once: true }}
            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-wide leading-tight"
            id="txt"
          >
            EVENTS
          </motion.p>
        </div>

        <div className="mt-6 md:mt-8">
          <a href="#Services"><button className="border-2 border-[#69443C] text-[#69443C] bg-transparent rounded-full px-6 py-2 text-sm md:px-8 md:py-3 md:text-lg font-semibold hover:bg-[#69443C]/10 hover:text-[#4B2E28] transition duration-300">
            Explore Our Services
          </button></a>
        </div>
      </div>
    </div>
  );
};

export default Home;
