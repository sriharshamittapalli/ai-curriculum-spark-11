
import React from "react";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { CheckCircle, Award, TrendingUp } from "lucide-react";

interface ProgressTrackerProps {
  totalDays: number;
  completedDays: number[];
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ 
  totalDays, 
  completedDays 
}) => {
  const progress = Math.round((completedDays.length / totalDays) * 100);
  
  return (
    <motion.div 
      className="bg-white rounded-2xl p-6 mb-6 border border-gray-100 shadow-sm overflow-hidden relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-70"></div>
      
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-custom-blue" />
            Your Progress
          </h3>
          <p className="text-xs text-gray-500">Keep going, you're doing great!</p>
        </div>
        <div className="text-lg font-bold text-custom-blue flex items-center">
          {progress}%
          <span className="ml-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
            {completedDays.length === totalDays ? 'Complete' : 'In Progress'}
          </span>
        </div>
      </div>
      
      <div className="relative pt-1">
        <Progress 
          value={progress} 
          className="h-2.5 rounded-full bg-gray-100 [&>div]:bg-gradient-to-r [&>div]:from-custom-blue [&>div]:to-custom-light-blue"
        />
      </div>
      
      <div className="mt-4 flex items-center justify-between">
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
        
        {completedDays.length > 0 && (
          <div className="flex items-center gap-1.5 text-xs bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full border border-yellow-100">
            <Award className="h-3 w-3" />
            {completedDays.length === 1 ? '1 day streak' : `${completedDays.length} day streak`}
          </div>
        )}
      </div>
      
      <div className="mt-3 flex justify-between w-full pt-1">
        {Array.from({ length: totalDays }).map((_, i) => {
          const isDone = completedDays.includes(i + 1);
          
          return (
            <div key={i} className="flex flex-col items-center">
              <div 
                className={`w-7 h-7 rounded-full flex items-center justify-center ${
                  isDone 
                    ? 'bg-green-100 text-green-700 border-2 border-green-200' 
                    : 'bg-white text-gray-400 border-2 border-gray-200'
                }`}
              >
                {isDone ? <CheckCircle className="h-4 w-4" /> : i + 1}
              </div>
              <div className="text-xs mt-1 font-medium text-gray-500">Day {i + 1}</div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ProgressTracker;
