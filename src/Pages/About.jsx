import React, { useState } from 'react';
import axios from 'axios';
const About = () => {
  const [About, setAbout] = useState("")
  async function fetchData() {
    let r = await axios.get("http://127.0.0.1:3000/about")
    setAbout(r.data.about)
  }
  fetchData()
  return (
    <div className="bg-gray-50 min-h-[calc(100vh-4rem)] mt-[4rem]" id='About'>
      <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl pt-6 md:pt-10 text-center font-light underline">
        About Us
      </h1>
      <p className="text-base xs:text-lg sm:text-xl md:text-2xl mt-4 md:mt-5 text-left md:text-justify px-4 xs:px-6 sm:px-8 md:px-10 py-6 md:py-10">
        {About}
      </p>
    </div>
  );
};

export default About;
