import React from 'react'

const Services = () => {
  return (
    <div className='px-4 py-10' id='Services'>
      <h1 className='text-4xl xs:text-5xl sm:text-6xl md:text-7xl underline flex flex-wrap gap-4 justify-center font-light text-center'>Check Out Our Services</h1>
      <div className="cards_container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-10 justify-items-center">
        {[
            {
                title : "Corporate Events",
                description : "Tailored corporate conferences and team-building for impactful professional gatherings.",
                img : 'https://img.icons8.com/?size=100&id=20397&format=png&color=000000'
            },{
                title : "Government Events",
                description : "Secure, dignified public sector ceremonies executed with precision.",
                img : 'https://img.icons8.com/?size=100&id=8779&format=png&color=000000'
            },{
                title : "Festival Events",
                description : "Community festivals bursting with live music, art, and family fun.",
                img : "https://img.icons8.com/?size=100&id=R2j0IjhlQBbK&format=png&color=000000"
            },{
                title : "Social Events",
                description : "Custom parties and reunions designed for memorable, personalized gatherings.",
                img : 'https://img.icons8.com/?size=100&id=96474&format=png&color=000000'
            },{
                title : "Tour and Travels",
                description : "Curated cultural tours blending comfort, discovery, and immersive experiences.",
                img : "https://img.icons8.com/?size=100&id=Fkumhj8VyfoN&format=png&color=000000"
            },{
                title : "Musical Events",
                description : "Live concerts and recitals delivering immersive, unforgettable musical performances.",
                img : "https://img.icons8.com/?size=100&id=uYr65VS3LN1a&format=png&color=000000"
            },
        ].map((card,index)=>{return(
            <div key={index} className="card h-auto min-h-[300px] sm:min-h-[350px] w-full max-w-[350px] border border-gray-200 m-2 md:m-3 p-4 md:p-5 flex flex-col items-center justify-center rounded-2xl gap-3 md:gap-5 hover:bg-gradient-to-br hover:from-red-200 hover:to-pink-50 hover:shadow-2xl transition duration-300">
            <img src={card.img} alt="" className="w-16 h-16 md:w-20 md:h-20" />
            <h2 className='text-xl md:text-2xl text-black text-center font-medium'>{card.title}</h2>
            <p className='mt-1.5 text-black text-sm md:text-base text-center'>{card.description}</p>
            <a href='#Contact'><button type="button" className="mt-2 text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-xs md:text-sm px-4 py-2 md:px-5 md:py-2.5 text-center"> Get Quotation </button></a>

        </div>
        )})}
        
        
      </div>
    </div>
  )
}

export default Services
