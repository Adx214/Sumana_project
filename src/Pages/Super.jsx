import React, { Suspense, lazy } from 'react';
import Home from './Home';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';


const About = lazy(() => import('./About'));
const Choose = lazy(() => import('./Choose'));
const Contact = lazy(() => import('./Contact'));
const Services = lazy(() => import('./Services'));
const Reviews = lazy(() => import('./Reviews'));
const Portfolio = lazy(() => import('./Portfolio'));
const Footer = lazy(() => import('./Footer'));

const Super = () => {
  return (
    <>
      <Navbar key="navbar" />
      <Home />
        <About />
        <Services />
        <Choose />
        <Reviews />
        <Portfolio />
        <Contact />
        <Footer />
      
      <div className="fixed bottom-0 right-0">
        <a href="https://wa.me/919874587843" target='_blank' rel="noopener noreferrer"><img src="https://img.icons8.com/?size=100&id=7OeRNqg6S7Vf&format=png&color=000000" alt="WhatsApp" className='w-20 h-full' /></a>
      </div>
    </>
  );
};

export default Super;
