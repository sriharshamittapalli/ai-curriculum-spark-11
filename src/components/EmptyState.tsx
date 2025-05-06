
import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Sparkles, ArrowRight } from "lucide-react";

const EmptyState: React.FC = () => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center p-12 h-full rounded-3xl border border-gray-100 bg-white/90 backdrop-blur-sm shadow-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="w-24 h-24 flex items-center justify-center rounded-full bg-blue-50 mb-6 relative overflow-hidden"
        whileHover={{ scale: 1.05 }}
      >
        <BookOpen className="w-12 h-12 text-custom-blue z-10" />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-custom-blue/10 to-custom-purple/10"
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
        className="text-2xl font-bold text-gray-800 mb-3 text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        No curriculum yet
      </motion.h3>
      
      <motion.p 
        className="text-gray-500 text-center max-w-sm mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Start by selecting your preferences on the left panel and let's build your personalized learning journey!
      </motion.p>
      
      <motion.div
        className="flex items-center text-custom-blue text-sm font-medium cursor-pointer"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
      >
        <Sparkles className="w-4 h-4 mr-2" />
        <span>Configure your learning preferences</span>
        <ArrowRight className="ml-1 w-4 h-4" />
      </motion.div>
    </motion.div>
  );
};

export default EmptyState;
