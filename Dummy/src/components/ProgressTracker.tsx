import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Award, TrendingUp } from "lucide-react";

interface ProgressTrackerProps {
  totalDays: number;
  completedDays: number[];
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ 
  totalDays, 
  completedDays 
}) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const progress = totalDays > 0 ? Math.round((completedDays.length / totalDays) * 100) : 0;
  
  useEffect(() => {
    // Use a small timeout for smoother animation
    const timer = setTimeout(() => {
      setDisplayProgress(progress);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [progress]);
  
  if (totalDays === 0) {
    return null;
  }
  
  return (
    <motion.div 
      className="bg-white rounded-lg p-5 mb-6 border border-gray-100 shadow-sm overflow-hidden relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      layout
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 opacity-80"></div>
      
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-500" />
            Your Progress
          </h3>
          <p className="text-xs text-gray-500">
            {completedDays.length === 0 ? "Let's get started on your learning journey!" : 
             completedDays.length === totalDays ? "Amazing work! You've completed everything!" : 
             "Keep going, you're doing great!"}
          </p>
        </div>
        <motion.div 
          className="text-lg font-bold text-blue-600 flex items-center gap-2"
          key={displayProgress}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring" }}
        >
          {displayProgress}%
          <AnimatePresence mode="wait">
            <motion.span 
              key={completedDays.length === totalDays ? 'complete' : 'progress'}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={`ml-1 text-xs px-2 py-0.5 rounded-full ${
                completedDays.length === totalDays 
                ? 'bg-green-100 text-green-700' 
                : 'bg-blue-100 text-blue-700'
              }`}
            >
              {completedDays.length === totalDays ? 'Complete' : 'In Progress'}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      </div>
      
      <div className="relative pt-1 mb-3">
        <Progress 
          value={displayProgress} 
          className="h-3 rounded-full bg-gray-100 overflow-hidden"
        >
          <motion.div 
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400"
            initial={{ width: 0 }}
            animate={{ width: `${displayProgress}%` }}
            transition={{ duration: 0.6 }}
          />
        </Progress>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5">
          {completedDays.length > 0 ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <div className="h-4 w-4 rounded-full border-2 border-gray-300"></div>
          )}
          <div className="text-sm text-gray-700">
            {completedDays.length} of {totalDays} days completed
          </div>
        </div>
        
        <AnimatePresence>
          {completedDays.length > 0 && (
            <motion.div 
              className="flex items-center gap-1.5 text-xs bg-amber-50 text-amber-600 px-2.5 py-1 rounded-full border border-amber-100"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: [0.8, 1.1, 1] }}
              transition={{ duration: 0.4 }}
            >
              <Award className="h-3.5 w-3.5" />
              {completedDays.length === 1 ? '1 day streak 🔥' : `${completedDays.length} day streak 🔥`}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="flex justify-between w-full pt-1">
        {Array.from({ length: totalDays }).map((_, i) => {
          const isDone = completedDays.includes(i + 1);
          
          return (
            <motion.div 
              key={i} 
              className="flex flex-col items-center"
              whileHover={{ scale: 1.1 }}
              initial={false}
              animate={isDone ? { y: [0, -3, 0] } : {}}
              transition={isDone ? { duration: 0.3, delay: i * 0.05 } : {}}
            >
              <div 
                className={`w-7 h-7 rounded-md flex items-center justify-center ${
                  isDone 
                    ? 'bg-green-100 text-green-600 border border-green-200 shadow-sm' 
                    : 'bg-white text-gray-400 border border-gray-200'
                } transition-all duration-300`}
              >
                {isDone ? (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                  >
                    <CheckCircle className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <span>{i + 1}</span>
                )}
              </div>
              <div className="text-xs mt-1.5 font-medium text-gray-600">Day {i + 1}</div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ProgressTracker;
