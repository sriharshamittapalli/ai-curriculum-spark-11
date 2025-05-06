import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Sparkles, ArrowRight } from "lucide-react";

const EmptyState: React.FC = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1 
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const arrowVariants = {
    idle: { x: 0 },
    active: { x: 10, transition: { type: "spring", stiffness: 400 } }
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-between p-8 h-full rounded-lg border border-gray-100 bg-white shadow-sm"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex flex-col items-center">
        <motion.div 
          className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-50 mb-6 relative overflow-hidden"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
        >
          <BookOpen className="w-10 h-10 text-blue-500 z-10" />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
        
        <motion.h3 
          variants={itemVariants}
          className="text-xl font-bold text-gray-800 mb-3 text-center"
        >
          No curriculum yet
        </motion.h3>
        
        <motion.p 
          variants={itemVariants}
          className="text-gray-500 text-center max-w-md mb-6 text-sm"
        >
          Start by selecting your preferences on the left panel and let's build your personalized learning journey!
        </motion.p>
        
        <motion.div
          variants={itemVariants}
          className="flex items-center text-blue-500 text-sm font-medium cursor-pointer group"
          whileHover="active"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          <span className="group-hover:underline">Configure your learning preferences</span>
          <motion.div
            variants={arrowVariants}
          >
            <ArrowRight className="ml-1 w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>

      {/* Help tips */}
      <motion.div
        variants={containerVariants}
        className="mt-auto pt-10 grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-md"
      >
        <motion.div 
          variants={itemVariants}
          className="p-4 rounded-lg border border-blue-100 text-sm bg-blue-50/70 hover:bg-blue-50 transition-all shadow-sm"
          whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)" }}
        >
          <p className="text-blue-600 font-medium mb-1">Choose a topic</p>
          <p className="text-blue-500 text-xs">Select from popular subjects or add your own custom topic</p>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="p-4 rounded-lg border border-purple-100 text-sm bg-purple-50/70 hover:bg-purple-50 transition-all shadow-sm"
          whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)" }}
        >
          <p className="text-purple-600 font-medium mb-1">Set your pace</p>
          <p className="text-purple-500 text-xs">Choose how quickly you want to progress through the material</p>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="col-span-1 md:col-span-2 mt-4 flex justify-center"
        >
          <motion.button
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium shadow-sm transition-all"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Sparkles className="w-4 h-4" />
            Get Started
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default EmptyState;
