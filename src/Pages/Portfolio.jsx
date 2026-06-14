import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import axios from "axios";

const Portfolio = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get("http://localhost:3000/image/images10");
        // format the response
        const formatted = res.data.map((img) => ({
          id: img.id,
          url: `http://localhost:3000${img.url}`,
        }));
        setImages(formatted);
      } catch (err) {
        console.error("Error fetching images:", err);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="px-4 py-8 md:py-12">
      <h2 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-light text-center text-stone-800 mb-6 md:mb-10">
        Our Portfolio
      </h2>

      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="break-inside-avoid overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
          >
            <motion.img
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              viewport={{ once: true }}
              src={img.url}
              alt={`portfolio-${img.id}`}
              className="w-full h-auto object-cover rounded-lg"
              
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
