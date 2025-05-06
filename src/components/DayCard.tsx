
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Video, BookOpen, FileText } from "lucide-react";

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

const ResourceTypeIcon = ({ type }: { type: string }) => {
  switch (type.toLowerCase()) {
    case 'video':
      return <Video className="h-3 w-3" />;
    case 'article':
      return <FileText className="h-3 w-3" />;
    case 'guide':
      return <FileText className="h-3 w-3" />;
    case 'hands-on':
      return <BookOpen className="h-3 w-3" />;
    default:
      return <FileText className="h-3 w-3" />;
  }
};

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
    <Card className={`glass-card transition-all duration-300 ${completed ? 'border-custom-light-blue/50 shadow-lg shadow-custom-blue/10' : 'border-white/10'}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${completed 
              ? 'bg-gradient-to-br from-custom-blue to-custom-light-blue'
              : 'bg-custom-dark-blue'} text-white font-medium`}>
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
          <ul className="space-y-2">
            {objectives.map((objective, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-white/90">
                <span className="mt-0.5 text-custom-light-blue">
                  <Check className="h-4 w-4" />
                </span>
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-custom-light-blue mb-2">Resources</h4>
          <ul className="space-y-2">
            {resources.map((resource, index) => (
              <li key={index} className="flex items-center gap-2">
                <Badge className="py-0.5 px-2 bg-custom-purple/20 border border-custom-purple/30 text-custom-light-purple flex items-center gap-1.5">
                  <ResourceTypeIcon type={resource.type} />
                  <span className="text-xs">{resource.type}</span>
                </Badge>
                <a 
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-custom-light-blue hover:underline hover:text-white transition-colors"
                >
                  {resource.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-custom-light-blue mb-2">Assignment</h4>
          <p className="text-sm text-white/90 p-3 bg-custom-dark-blue/40 rounded-md border border-white/5">{assignment}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onMarkComplete(dayNumber)}
          variant={completed ? "outline" : "default"}
          size="sm"
          className={completed 
            ? "w-full border-custom-blue/30 text-custom-blue hover:bg-custom-blue/10" 
            : "w-full bg-gradient-to-r from-custom-blue to-custom-light-blue hover:opacity-90 text-white shadow-md"
          }
        >
          {completed ? "Completed ✓" : "Mark as Complete"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DayCard;
