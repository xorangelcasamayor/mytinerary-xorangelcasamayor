
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [showText, setShowText] = useState([false, false, false]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText([true, false, false]);
    }, 1000);

    const timer2 = setTimeout(() => {
      setShowText([true, true, false]);
    }, 2000);

    const timer3 = setTimeout(() => {
      setShowText([true, true, true]);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <section className="hero-section relative flex flex-col items-center justify-center h-96">
      <div className="hero-content absolute inset-0"></div>

      <motion.h1
        className="text-6xl font-bold relative z-10" 
        initial={{ opacity: 0, y: -20 }}
        animate={showText[0] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        My Tinerary
      </motion.h1>

      <motion.p
        className="mt-2 text-xl relative z-10" 
        initial={{ opacity: 0, y: -20 }}
        animate={showText[1] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        Find your perfect trip, designed by insiders who know and love their cities!
      </motion.p>

      <motion.a
        href="#"
        className="relative z-10 mt-4 px-6 py-2 bg-black text-white font-semibold rounded-lg shadow-md"
        whileHover={{
          scale: 1.1,
          opacity: 0.8,
          transition: { duration: 0.3 },
        }}
        whileTap={{
          scale: 0.95,
          opacity: 1,
        }}
      >
        Start your adventure today!
      </motion.a>
    </section>
  );
};

export default Hero;
