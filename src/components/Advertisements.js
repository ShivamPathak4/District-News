// src/components/Advertisements.js
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../ThemeContext';

const Advertisements = ({ ads }) => {
  const { darkMode } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full space-y-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}
    >
     
      {ads.map((ad) => (
        <motion.a
          key={ad.id}
          href={ad.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`block p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}
          whileHover={{ scale: 1.05 }}
        >
          {ad.image && <img src={ad.image} alt="Advertisement" className="w-full h-auto mb-2 rounded" />}
          {ad.video && <video src={ad.video} controls className="w-full h-auto mb-2 rounded" />}
        </motion.a>
      ))}
    </motion.div>
  );
};

export default Advertisements;