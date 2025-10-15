import React, { useEffect, useState } from 'react'
import img1 from '../assets/Content/banner.png'
import { motion } from "motion/react"
import axios from 'axios'
const Choose = () => {
  const [Chose, setChose] = useState("")
  
  useEffect(() => {
    async function fetchData() {
      setChose("At Rareelite Events, we specialize in crafting unforgettable experiences tailored to your unique vision. Our dedicated team of professionals is committed to excellence, ensuring every detail is meticulously planned and flawlessly executed. From intimate gatherings to grand celebrations, we bring creativity, passion, and precision to every event we undertake. Choose us for our unwavering dedication to making your special moments truly extraordinary.")
    let r = await axios.get("http://localhost:3000/choose")
    console.log("status",r.status);
    
    if (r.status===200) {
      setChose(r.data.choose)
    } else {
      
      
    }
    
  }
      fetchData()
    
  },[] )
  
  
  

  return (
    <div className='flex flex-col md:flex-row p-4 sm:p-6 md:p-8 lg:p-10 bg-gray-50'>
      <div className="txt w-full md:w-1/2 mb-6 md:mb-0 md:pr-6">
        <motion.p initial ={{x:-100,opacity:0}} whileInView={{x:0,opacity:1}} transition={{
          duration: 1, type:"tween" ,ease:"easeInOut"
        }} viewport={{ once: true }} className='text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-light'>Why Choose Us?</motion.p>
        <motion.p initial ={{x:-100,opacity:0}} whileInView={{x:0,opacity:1}} transition={{
          duration: 1, type:"tween" ,ease:"easeInOut"
        }} viewport={{ once: true }} className='text-base sm:text-lg md:text-xl mt-4 md:mt-5'>{Chose}</motion.p>
      </div>
      <div className="img w-full md:w-1/2">
      <img src={img1} alt="" className="w-full h-auto rounded-lg"/>
      </div>
    </div>
  )
}

export default Choose
