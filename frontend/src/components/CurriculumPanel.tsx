import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import DayCard from "./DayCard";
import ProgressTracker from "./ProgressTracker";
import EmptyState from "./EmptyState";
import CompletedState from "./CompletedState";
import { CurriculumDay } from "@/types/curriculum";

interface CurriculumPanelProps {
  data?: CurriculumDay[];
  completedDays: number[];
  onMarkComplete: (dayNumber: number) => void;
  onRestart: () => void;
  isGenerated: boolean;
  currentTopic: string;
}

const CurriculumPanel: React.FC<CurriculumPanelProps> = ({ 
  data = [],
  completedDays,
  onMarkComplete,
  onRestart,
  isGenerated,
  currentTopic
}) => {
  const curriculumData = data;
  
  // Animation variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };
  
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };
  
  // If no curriculum is generated yet
  if (!isGenerated && completedDays.length === 0) {
    return <EmptyState />;
  }
  
  // If all days are completed
  if (completedDays.length === curriculumData.length && completedDays.length > 0) {
    return <CompletedState onRestart={onRestart} />;
  }
  
  return (
    <div className="h-full flex flex-col relative">
      <motion.div 
        className="bg-white rounded-lg p-6 border border-gray-100 shadow-md mb-6"
        variants={headerVariants}
        initial="hidden"
        animate="show"
        layout
      >
        <h2 className="text-2xl font-bold mb-1 text-gray-800 flex items-center gap-2">
          Your Personalized Curriculum
          <span className="inline-block w-1.5 h-1.5 bg-custom-blue rounded-full animate-pulse"></span>
        </h2>
        <div className="flex items-center">
          <span className="text-sm text-gray-500">
            {currentTopic || "Learning Curriculum"} - {curriculumData.length} day curriculum
          </span>
          <div className="ml-auto flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            <span className="text-xs font-medium text-gray-700">Active</span>
          </div>
        </div>
      </motion.div>
      
      {curriculumData.length > 0 && <ProgressTracker totalDays={curriculumData.length} completedDays={completedDays} />}
      
      <motion.div 
        className="flex-grow overflow-auto pr-2 pb-4 scroll-smooth snap-y snap-mandatory"
        variants={containerVariants}
        initial="hidden"
        animate="show"
        layout
      >
        <AnimatePresence mode="wait">
          {curriculumData.length > 0 ? (
            <motion.div 
              className="space-y-6"
              layout
              key="curriculum-list"
            >
              {curriculumData.map((day) => (
                <motion.div 
                  key={day.dayNumber} 
                  variants={itemVariants} 
                  className="snap-start"
                  layout
                >
                  <DayCard 
                    {...day}
                    onMarkComplete={onMarkComplete}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty-curriculum"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center h-full"
            >
              <p className="text-gray-500 text-center">
                Ready to generate a curriculum? Fill out the form on the left to get started.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CurriculumPanel;
