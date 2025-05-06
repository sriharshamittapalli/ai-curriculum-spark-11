
import React, { useState } from "react";
import DayCard, { DayCardProps } from "./DayCard";
import ProgressTracker from "./ProgressTracker";

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

const CurriculumPanel: React.FC = () => {
  const [curriculumData, setCurriculumData] = useState(initialCurriculumData);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  
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
    } else if (!isCompleted) {
      setCompletedDays(completedDays.filter(day => day !== dayNumber));
    }
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="glass-card p-6 mb-4">
        <h2 className="text-2xl font-semibold mb-2 text-white">Your Personalized Curriculum</h2>
        <p className="text-sm text-white/70">Machine Learning for Beginners - 3 day curriculum</p>
      </div>
      
      <ProgressTracker totalDays={curriculumData.length} completedDays={completedDays} />
      
      <div className="flex-grow overflow-auto scrollbar-hide pr-2">
        <div className="space-y-4">
          {curriculumData.map((day) => (
            <DayCard 
              key={day.dayNumber}
              {...day}
              onMarkComplete={handleMarkComplete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurriculumPanel;
