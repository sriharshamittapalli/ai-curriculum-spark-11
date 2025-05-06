
import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const LoadingOverlay: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center"
    >
      <div className="relative">
        <svg className="w-20 h-20 animate-spin text-custom-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          animate={{ 
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-custom-blue/30 to-custom-purple/30 backdrop-blur-sm"></div>
        </motion.div>
      </div>
      
      <motion.div
        className="mt-8 text-xl font-medium text-gray-700 flex items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Sparkles className="w-5 h-5 text-custom-blue" />
        Creating your personalized curriculum
      </motion.div>
      
      <motion.div 
        className="mt-2 text-sm text-gray-500 max-w-md text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Our AI is crafting a tailored learning path just for you, analyzing the best resources and optimal learning sequence...
      </motion.div>
      
      <motion.div
        className="mt-6 flex space-x-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        {[0, 1, 2].map((dot) => (
          <motion.div
            key={dot}
            className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-custom-blue to-custom-purple"
            animate={{ 
              y: [0, -6, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: dot * 0.2
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default LoadingOverlay;
