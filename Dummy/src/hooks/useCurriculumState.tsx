import { useState } from 'react';
import { FormValues } from '@/lib/schema';
import { generateCurriculum } from '@/services/curriculumService';
import { toast } from '@/components/ui/sonner';
import { CurriculumDay } from '@/types/curriculum';

export function useCurriculumState() {
  const [curriculumData, setCurriculumData] = useState<CurriculumDay[]>([]);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [currentTopic, setCurrentTopic] = useState('');

  const generateCurriculumFromForm = (formValues: FormValues) => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      try {
        // Get formatted topic name for display
        const topicDisplay = formValues.topic
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        setCurrentTopic(topicDisplay);
        
        // Generate curriculum data
        const data = generateCurriculum(formValues);
        setCurriculumData(data);
        setCompletedDays([]);
        setIsGenerated(true);
        
        toast.success(`${topicDisplay} curriculum generated successfully!`);
      } catch (error) {
        console.error("Error generating curriculum:", error);
        toast.error("Failed to generate curriculum. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleMarkComplete = (dayNumber: number) => {
    // Use a callback to ensure we're working with the latest state
    setCurriculumData(prevData => {
      return prevData.map(day => {
        if (day.dayNumber === dayNumber) {
          return { ...day, completed: !day.completed };
        }
        return day;
      });
    });
    
    // Also use a callback for the completedDays array
    setCompletedDays(prevCompletedDays => {
      const dayIndex = prevCompletedDays.indexOf(dayNumber);
      if (dayIndex === -1) {
        // Day wasn't completed before, so add it
        const newCompletedDays = [...prevCompletedDays, dayNumber];
        
        // Only show toast for the first few completions to avoid spam
        if (prevCompletedDays.length < 3) {
          setTimeout(() => {
            toast.success(`Day ${dayNumber} completed! 🎉`);
          }, 300);
        } else if (prevCompletedDays.length === 3) {
          setTimeout(() => {
            toast.success(`Multiple days completed! Great progress! 🎉`);
          }, 300);
        }
        
        return newCompletedDays;
      } else {
        // Day was already completed, so remove it
        return prevCompletedDays.filter(d => d !== dayNumber);
      }
    });
  };
  
  const handleRestart = () => {
    // Reset all progress with smoother animation
    setTimeout(() => {
      setCurriculumData(prevData => 
        prevData.map(day => ({ ...day, completed: false }))
      );
      setCompletedDays([]);
      toast.success("Ready for a new learning journey! 💪");
    }, 200);
  };

  return {
    curriculumData,
    completedDays,
    isLoading,
    isGenerated,
    currentTopic,
    generateCurriculumFromForm,
    handleMarkComplete,
    handleRestart
  };
}
