
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Resource {
  title: string;
  url: string;
  type: string;
}

export interface DayCardProps {
  dayNumber: number;
  title: string;
  objectives: string[];
  resources: Resource[];
  assignment: string;
  completed: boolean;
  onMarkComplete: (dayNumber: number) => void;
}

const DayCard: React.FC<DayCardProps> = ({
  dayNumber,
  title,
  objectives,
  resources,
  assignment,
  completed,
  onMarkComplete
}) => {
  return (
    <Card className={`glass-card transition-all duration-300 ${completed ? 'border-custom-light-blue/50' : 'border-white/10'}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${completed ? 'bg-custom-blue' : 'bg-custom-dark-blue'} text-white font-medium`}>
              {dayNumber}
            </div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
          </div>
          {completed && (
            <Badge variant="outline" className="bg-custom-blue/20 text-custom-light-blue border-custom-light-blue/30">
              Completed
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-custom-light-blue mb-2">Objectives</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-white/90">
            {objectives.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-custom-light-blue mb-2">Resources</h4>
          <ul className="space-y-2">
            {resources.map((resource, index) => (
              <li key={index} className="flex items-center gap-2">
                <Badge variant="outline" className="bg-custom-purple/20 text-xs">
                  {resource.type}
                </Badge>
                <a 
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-custom-light-blue hover:underline"
                >
                  {resource.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-custom-light-blue mb-2">Assignment</h4>
          <p className="text-sm text-white/90">{assignment}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onMarkComplete(dayNumber)}
          variant={completed ? "outline" : "default"}
          size="sm"
          className={completed 
            ? "w-full border-custom-blue/30 text-custom-blue hover:bg-custom-blue/10" 
            : "w-full bg-custom-blue hover:bg-custom-light-blue text-white"
          }
        >
          {completed ? "Completed ✓" : "Mark as Complete"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DayCard;
