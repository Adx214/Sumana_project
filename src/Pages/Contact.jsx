import React, { useState, useEffect } from 'react';
import contact from '../assets/Content/contact.jpg';
import { motion } from 'motion/react';
import { useForm } from "react-hook-form";
import axios from 'axios';

const Contact = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [alert, setAlert] = useState(null);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/contact/", data);
      if (res.status === 200) {
        setAlert({ type: "success", message: "Your query has been submitted successfully!" });
      }
    } catch (err) {
      setAlert({ type: "error", message: "There was an error submitting your query. Please try again later." });
    }
  };

  // Auto hide alert after 10s
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 10000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <div className="bg-red-50 mt-[4rem] min-h-[calc(100vh-4rem)] px-4 py-10 flex flex-col items-center" id='Contact'>

      {/* Fixed alert at top */}
      {alert && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-lg w-[90%] max-w-xl text-center z-50
          ${alert.type === "success" 
            ? "text-green-800 bg-green-100 border border-green-300" 
            : "text-red-800 bg-red-100 border border-red-300"}`}>
          <span className="font-semibold">
            {alert.type === "success" ? "✅ Success: " : "❌ Error: "}
          </span>
          {alert.message}
        </div>
      )}

      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center font-light">
        Contact Us
      </h1>

      <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8 lg:gap-12 w-full max-w-6xl mt-8 md:mt-10">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, type: 'tween', ease: 'easeInOut' }}
          viewport={{ once: true }}
          className="img w-full md:w-1/2"
        >
          <img src={contact} alt="Contact" className="w-full h-auto object-cover rounded-lg" />
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, type: 'tween', ease: 'easeInOut' }}
          viewport={{ once: true }}
          className="form w-full md:w-1/2"
        >
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-extralight">
            Allow Us To Create Memories For You. Get Your Quotation Today
          </p>

          <form className="mt-6 md:mt-8 space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>

            {/* Name */}
            <input
              type="text"
              placeholder="Your Name"
              {...register("name", { required: "Name is required", minLength: { value: 2, message: "Name must be at least 2 characters" } })}
              className="block w-full text-lg sm:text-xl md:text-2xl border-b-2 p-2 focus:outline-none"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

            {/* Email + Number */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Your Email"
                  {...register("email", { 
                    required: "Email is required", 
                    pattern: { value: /^\S+@\S+$/i, message: "Enter a valid email" }
                  })}
                  className="w-full text-lg sm:text-xl md:text-2xl border-b-2 p-2 focus:outline-none"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              <div className="flex-1">
                <input
                  type="tel"
                  placeholder="Your Number"
                  {...register("number", { 
                    pattern: { value: /^[0-9]{7,15}$/, message: "Enter a valid phone number" }
                  })}
                  className="w-full text-lg sm:text-xl md:text-2xl border-b-2 p-2 focus:outline-none"
                />
                {errors.number && <p className="text-red-500 text-sm">{errors.number.message}</p>}
              </div>
            </div>

            {/* Category */}
            <select
              {...register("category", { required: "Please select a category" })}
              className="block w-full text-lg sm:text-xl md:text-2xl border-b-2 p-2 focus:outline-none bg-transparent"
            >
              <option value="">-- Select Query For --</option>
              <option value="corporate">Corporate Events</option>
              <option value="government">Government Events</option>
              <option value="festival">Festival Events</option>
              <option value="social">Social Events</option>
              <option value="tour">Tour and Travels</option>
              <option value="musical">Musical Events</option>
              <option value="others">Others</option>
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}

            {/* Message */}
            <textarea
              placeholder="Your Message"
              {...register("message", { required: "Message is required", minLength: { value: 10, message: "Message must be at least 10 characters" } })}
              className="block w-full text-lg sm:text-xl md:text-2xl border-b-2 p-2 focus:outline-none"
            />
            {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full sm:w-auto px-8 py-3 rounded-full shadow-md font-medium transition-all duration-300 ease-in-out
                ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 text-white"}`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
