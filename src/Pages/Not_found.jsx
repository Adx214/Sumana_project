import React from 'react'
import { Link } from 'react-router-dom'

const not_found = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <div className="text-center px-6 md:px-12">
        <h1 className="text-[8rem] md:text-[12rem] font-extrabold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-transparent bg-clip-text drop-shadow-lg">
          404
        </h1>
        <h2 className="mt-4 text-3xl md:text-4xl font-light tracking-wider text-gray-300">
          Oops! Page Not Found
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 mx-auto mt-6 mb-8 rounded-full shadow-lg"></div>
        <p className="text-gray-400 text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable. Let us guide you back to the
          royal path.
        </p>
        <div className="mt-10">
          <Link
            to="/"
            className="inline-block px-8 py-3 text-lg font-medium rounded-full bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800 transition-all duration-300 ease-in-out shadow-lg"
          >
            Go Back Home
          </Link>
        </div>
        <div className="mt-16 text-yellow-500 opacity-70">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-20 h-20 mx-auto"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3 7h7l-5.5 4.5L19 21l-7-4.5L5 21l2.5-7.5L2 9h7l3-7z" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default not_found