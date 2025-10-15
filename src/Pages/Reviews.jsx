import React, { useEffect, useState } from 'react';
import axios from 'axios';

const reviews = [
  {
    Name: "Alice Johnson",
    Review: "Absolutely amazing service! Highly recommend to everyone.",
    Role: "Event Manager",
  },
  {
    Name: "Bob Smith",
    Review: "The team was professional and made our event memorable.",
    Role: "Marketing Lead",
  },
  {
    Name: "Clara Williams",
    Review: "Very satisfied! Everything went smoothly as planned.",
    Role: "Coordinator",
  },
  {
    Name: "Daniel Lee",
    Review: "Their attention to detail was exceptional. 10/10!",
    Role: "Operations",
  },
  {
    Name: "Eva Brown",
    Review: "Flawless execution and great communication throughout.",
    Role: "Creative Director",
  },
];

const Reviews = () => {
  const [rev, setrev] = useState([])
  async function fetchData() {
    let r = await axios.get("http://localhost:3000/reviews/?limit=5")
    if(r.status===200){
      setrev(r.data)
    }else{
      setrev(reviews)
    }
    
  }
  useEffect(() => {
    fetchData()
  }, [])
  
  // Triple the array for smoother infinite scroll
  const loopedReviews = [...rev, ...rev, ...rev];
  
  return (
    <div className="w-full overflow-hidden bg-gradient-to-br from-stone-50 to-amber-50 py-16" id ='Reviews'>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-light text-center text-stone-800 mb-8 md:mb-16 tracking-wide">
          What Our Clients Say
        </h2>
        
        <div className="relative">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 w-10 md:w-20 h-full bg-gradient-to-r from-stone-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-10 md:w-20 h-full bg-gradient-to-l from-amber-50 to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex animate-scroll gap-4 md:gap-8">
            {loopedReviews.map((review, idx) => (
              <div
                key={idx}
                className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 md:p-8 min-w-[280px] max-w-[280px] md:min-w-[320px] md:max-w-[320px] flex-shrink-0 border border-stone-200/50 hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                {/* Quote icon */}
                <div className="text-stone-400 mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                </div>
                
                <p className="text-stone-700 text-lg leading-relaxed mb-6 font-light">
                  {review.Review}
                </p>
                
                <div className="border-t border-stone-200 pt-4">
                  <h3 className="text-xl font-semibold text-stone-800 mb-1">
                    {review.Name}
                  </h3>
                  <p className="text-stone-500 text-sm tracking-wide uppercase">
                    {review.Role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-350px * ${reviews.length} - ${reviews.length * 2}rem));
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Reviews;