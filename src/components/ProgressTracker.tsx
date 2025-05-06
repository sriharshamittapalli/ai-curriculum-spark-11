
import React from "react";
import { Progress } from "@/components/ui/progress";

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
    <div className="glass-card p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-white">Your Progress</h3>
        <span className="text-sm text-custom-light-blue">{progress}% Complete</span>
      </div>
      <Progress value={progress} className="h-2 bg-custom-dark-blue [&>div]:bg-gradient-to-r [&>div]:from-custom-blue [&>div]:to-custom-light-blue" />
      <div className="mt-2 flex items-center gap-1.5">
        <div className="text-xs text-white/70">
          {completedDays.length} of {totalDays} days completed
        </div>
        {completedDays.length > 0 && (
          <div className="text-xs bg-custom-blue/20 text-custom-light-blue px-2 py-0.5 rounded-full">
            {completedDays.length === 1 ? '1 day streak' : `${completedDays.length} day streak`}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressTracker;
