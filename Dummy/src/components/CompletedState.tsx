
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Award, RefreshCw, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface CompletedStateProps {
  onRestart: () => void;
}

const CompletedState: React.FC<CompletedStateProps> = ({ onRestart }) => {
  // Container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  };
  
  // Item variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  useEffect(() => {
    // Trigger confetti with better performance settings
    const launchConfetti = () => {
      const duration = 2000;
      const end = Date.now() + duration;
      
      const colors = ['#3b82f6', '#60a5fa', '#8b5cf6', '#a78bfa'];
      
      // Do moderate confetti burst instead of continuous
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors
      });
      
      // Add another burst after short delay
      setTimeout(() => {
        confetti({
          particleCount: 50,
          spread: 100,
          origin: { y: 0.6 },
          colors
        });
      }, 500);
    };

    launchConfetti();
  }, []);

  return (
    <motion.div 
      className="flex flex-col items-center justify-center p-12 h-full rounded-3xl border border-gray-100 bg-white shadow-md"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="w-24 h-24 flex items-center justify-center rounded-full bg-green-50 border border-green-100 mb-6"
        variants={itemVariants}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, 10, 0] }}
          transition={{ 
            scale: { delay: 0.3, type: "spring", damping: 10, stiffness: 100 },
            rotate: { delay: 0.5, duration: 0.5, ease: "easeInOut" }
          }}
        >
          <Award className="w-12 h-12 text-green-500" />
        </motion.div>
      </motion.div>
      
      <motion.h3 
        variants={itemVariants}
        className="text-2xl font-bold text-gray-800 mb-3 text-center"
      >
        🎉 Congratulations!
      </motion.h3>
      
      <motion.p 
        variants={itemVariants}
        className="text-gray-500 text-center max-w-sm mb-8"
      >
        You've completed your entire curriculum. Ready to explore more learning paths?
      </motion.p>
      
      <motion.div
        variants={itemVariants}
        className="space-y-3 w-full max-w-xs"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            onClick={onRestart} 
            className="w-full bg-gradient-to-r from-custom-blue via-custom-light-blue to-custom-purple hover:opacity-90 text-white shadow-lg py-6 rounded-xl relative overflow-hidden group h-14"
          >
            <motion.div 
              className="absolute inset-0 w-full h-full bg-white/10"
              initial={{ y: "100%" }}
              whileHover={{ y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative flex items-center gap-2 text-base">
              <RefreshCw className="h-5 w-5" />
              Start a New Curriculum
            </span>
          </Button>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            variant="outline" 
            className="w-full border-gray-200 py-5 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <Sparkles className="h-4 w-4 text-custom-blue" />
            <span>Explore More Topics</span>
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CompletedState;
