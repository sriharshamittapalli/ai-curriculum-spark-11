
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DayCard, { DayCardProps } from "./DayCard";
import ProgressTracker from "./ProgressTracker";
import EmptyState from "./EmptyState";
import CompletedState from "./CompletedState";
import { toast } from "@/components/ui/sonner";
import { CurriculumDay } from "@/types/curriculum";

const initialCurriculumData: Omit<DayCardProps, 'onMarkComplete'>[] = [
  {
    dayNumber: 1,
    title: "Getting Started with Machine Learning",
    objectives: [
      "Understand basic ML concepts and terminology",
      "Set up your development environment",
      "Learn about data preprocessing techniques"
    ],
    resources: [
      {
        title: "Introduction to Machine Learning",
        url: "https://www.coursera.org/learn/machine-learning",
        type: "Video"
      },
      {
        title: "Setting Up Your ML Environment",
        url: "https://www.tensorflow.org/install",
        type: "Guide"
      }
    ],
    assignment: "Install Python and required ML libraries. Create and run your first ML 'Hello World' script.",
    completed: false
  },
  {
    dayNumber: 2,
    title: "Data Preprocessing and Exploration",
    objectives: [
      "Learn how to clean and prepare datasets",
      "Understand exploratory data analysis",
      "Apply visualization techniques"
    ],
    resources: [
      {
        title: "Data Cleaning Techniques",
        url: "https://pandas.pydata.org/docs/",
        type: "Article"
      },
      {
        title: "Data Visualization with Python",
        url: "https://www.kaggle.com/learn/data-visualization",
        type: "Hands-on"
      }
    ],
    assignment: "Clean and visualize a provided dataset. Identify and handle missing values, outliers, and create meaningful visualizations.",
    completed: false
  },
  {
    dayNumber: 3,
    title: "Building Your First ML Model",
    objectives: [
      "Understand supervised learning concepts",
      "Implement linear regression",
      "Evaluate model performance"
    ],
    resources: [
      {
        title: "Linear Regression Tutorial",
        url: "https://scikit-learn.org/stable/modules/linear_model.html",
        type: "Guide"
      },
      {
        title: "Model Evaluation Techniques",
        url: "https://www.analyticsvidhya.com/blog/2019/08/11-important-model-evaluation-metrics-for-machine-learning-everyone-should-know/",
        type: "Article"
      }
    ],
    assignment: "Build a linear regression model to predict housing prices using a sample dataset. Evaluate and report on the model's performance.",
    completed: false
  }
];

interface CurriculumPanelProps {
  isGenerated?: boolean;
}

const CurriculumPanel: React.FC<CurriculumPanelProps> = ({ isGenerated = false }) => {
  const [curriculumData, setCurriculumData] = useState(initialCurriculumData);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isGeneratedCurriculum, setIsGeneratedCurriculum] = useState(isGenerated);
  
  useEffect(() => {
    setHasAnimated(true);
  }, []);
  
  useEffect(() => {
    setIsGeneratedCurriculum(isGenerated);
  }, [isGenerated]);
  
  useEffect(() => {
    // Check if all days are completed
    if (completedDays.length > 0 && completedDays.length === curriculumData.length) {
      toast.success("Congratulations! You've completed the entire curriculum! 🎉");
    }
  }, [completedDays, curriculumData.length]);
  
  const handleMarkComplete = (dayNumber: number) => {
    // Update the completed status of the day
    const updatedCurriculumData = curriculumData.map(day => {
      if (day.dayNumber === dayNumber) {
        return { ...day, completed: !day.completed };
      }
      return day;
    });
    
    setCurriculumData(updatedCurriculumData);
    
    // Update the completed days array
    const isCompleted = updatedCurriculumData.find(day => day.dayNumber === dayNumber)?.completed;
    
    if (isCompleted && !completedDays.includes(dayNumber)) {
      setCompletedDays([...completedDays, dayNumber]);
      toast.success(`Day ${dayNumber} completed! 🎉`);
    } else if (!isCompleted) {
      setCompletedDays(completedDays.filter(day => day !== dayNumber));
    }
  };
  
  const handleRestart = () => {
    // Reset all progress
    const resetData = curriculumData.map(day => ({ ...day, completed: false }));
    setCurriculumData(resetData);
    setCompletedDays([]);
    setIsGeneratedCurriculum(false);
    toast.success("Ready for a new learning journey! 💪");
  };
  
  // Animation variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.25
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  // If no curriculum is generated yet
  if (!isGeneratedCurriculum && completedDays.length === 0) {
    return <EmptyState />;
  }
  
  // If all days are completed
  if (completedDays.length === curriculumData.length && completedDays.length > 0) {
    return <CompletedState onRestart={handleRestart} />;
  }
  
  return (
    <div className="h-full flex flex-col relative">
      <motion.div 
        className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl mb-6"
        variants={headerVariants}
        initial="hidden"
        animate="show"
      >
        <h2 className="text-2xl font-bold mb-1 text-gray-800 flex items-center gap-2">
          Your Personalized Curriculum
          <span className="inline-block w-1.5 h-1.5 bg-custom-blue rounded-full animate-pulse"></span>
        </h2>
        <div className="flex items-center">
          <span className="text-sm text-gray-500">Machine Learning for Beginners - 3 day curriculum</span>
          <div className="ml-auto flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            <span className="text-xs font-medium text-gray-700">Active</span>
          </div>
        </div>
      </motion.div>
      
      <ProgressTracker totalDays={curriculumData.length} completedDays={completedDays} />
      
      <motion.div 
        className="flex-grow overflow-auto pr-2 pb-4 scrollbar-hide scroll-smooth snap-y snap-mandatory"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <div className="space-y-6">
          {curriculumData.map((day) => (
            <motion.div key={day.dayNumber} variants={itemVariants} className="snap-start">
              <DayCard 
                {...day}
                onMarkComplete={handleMarkComplete}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CurriculumPanel;
