
import { FormValues } from "@/lib/schema";
import { CurriculumDay } from "@/types/curriculum";

// Sample curriculum data generator based on form input
export const generateCurriculum = (formData: FormValues): CurriculumDay[] => {
  const { topic, learningDepth, learningPace, preferredStyles } = formData;
  
  // Format the topic name for display
  const topicName = topic.includes("-") 
    ? topic.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
    : topic.charAt(0).toUpperCase() + topic.slice(1);
  
  // Number of days based on learning pace
  const daysCount = learningPace === "slow" ? 7 : learningPace === "normal" ? 5 : 3;
  
  // Adjust difficulty based on learning depth
  const difficultyLevel = learningDepth === "beginner" 
    ? "foundational" 
    : learningDepth === "intermediate" 
      ? "practical" 
      : "advanced";
  
  // Generate curriculum days
  return Array.from({ length: daysCount }, (_, i) => {
    const dayNumber = i + 1;
    
    // Create day-specific content
    const title = dayNumber === 1 
      ? `Introduction to ${topicName}` 
      : dayNumber === daysCount 
        ? `Advanced ${topicName} Concepts` 
        : `Building with ${topicName} - Part ${dayNumber-1}`;
    
    // Generate between 3-4 objectives based on the day number
    const objectiveCount = Math.min(3 + Math.floor(dayNumber/2), 5);
    const objectives = Array.from({ length: objectiveCount }, (_, j) => {
      return `${difficultyLevel.charAt(0).toUpperCase() + difficultyLevel.slice(1)} ${topicName} objective ${j+1} for day ${dayNumber}`;
    });
    
    // Generate resources based on preferred learning styles
    const resources = preferredStyles.map((style, index) => {
      const type = style.charAt(0).toUpperCase() + style.slice(1);
      return {
        title: `${type} resource for ${topicName} - Day ${dayNumber}`,
        url: `https://example.com/${topic}/${style}/${dayNumber}`,
        type: style === "hands-on" ? "Hands-on" : type
      };
    });
    
    return {
      dayNumber,
      title,
      objectives,
      resources,
      assignment: `Complete a ${difficultyLevel} ${topicName} project that demonstrates your understanding of today's concepts.`,
      completed: false
    };
  });
};
