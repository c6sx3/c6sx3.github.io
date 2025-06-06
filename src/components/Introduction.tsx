import React from 'react';
import { motion } from 'framer-motion';

const Introduction: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-3xl font-bold mb-4">
        <span className="block">Hello, I'm</span>
        <span className="block text-white">c6sx3</span>
      </h1>
      <p className="text-text-secondary text-base mb-0">
      15 y/o dev — I'm not here for clout, I'm here to build what works. From web apps to system architecture, I keep it real: no flex, just function. I write code that runs smooth, design flows that actually make sense, and focus on making tools people can really use.
      </p>
    </motion.div>
  );
};

export default Introduction;