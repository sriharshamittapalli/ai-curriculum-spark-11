
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Brain, BookOpen } from "lucide-react";

const LoadingOverlay: React.FC = () => {
  // Array of encouraging loading messages to cycle through
  const loadingMessages = [
    "Creating your personalized curriculum...",
    "Analyzing optimal learning sequences...",
    "Curating the best resources for you...",
    "Tailoring content to your preferences...",
    "Crafting your learning journey...",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center"
    >
      <div className="relative">
        {/* Main spinner */}
        <motion.div
          animate={{ 
            rotate: 360,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <svg className="w-20 h-20 text-custom-blue" viewBox="0 0 100 100">
            <circle 
              cx="50" cy="50" 
              r="40" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="8" 
              strokeLinecap="round" 
              strokeDasharray="62.83185307179586 188.49555921538757"
              className="opacity-25"
            />
            <circle 
              cx="50" cy="50" 
              r="40" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="8" 
              strokeLinecap="round" 
              strokeDasharray="62.83185307179586 188.49555921538757"
              className="opacity-75"
              strokeDashoffset="25"
            />
          </svg>
        </motion.div>
        
        {/* Center icon */}
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
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Brain className="w-8 h-8 text-custom-light-blue" />
          </motion.div>
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
        className="mt-2 text-sm text-gray-500 max-w-md text-center px-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          key={Math.random()}
        >
          {loadingMessages[Math.floor(Math.random() * loadingMessages.length)]}
        </motion.div>
      </motion.div>
      
      <motion.div
        className="mt-6 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        {/* Book icons that move up and down */}
        <motion.div className="flex space-x-1.5">
          {[0, 1, 2].map((dot) => (
            <motion.div
              key={dot}
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
              className="flex items-center justify-center"
            >
              <BookOpen className="w-4 h-4 text-custom-blue" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingOverlay;
