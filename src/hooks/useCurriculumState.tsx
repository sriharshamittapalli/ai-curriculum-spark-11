
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
    toast.success("Ready for a new learning journey! 💪");
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
