
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, Video, BookOpen, FileText, CheckCircle } from "lucide-react";

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

const ResourceTypeBadge = ({ type }: { type: string }) => {
  let bgColor = "";
  
  switch (type.toLowerCase()) {
    case 'video':
      bgColor = "bg-blue-50 border-blue-200 text-blue-600";
      break;
    case 'article':
      bgColor = "bg-purple-50 border-purple-200 text-purple-600";
      break;
    case 'guide':
      bgColor = "bg-green-50 border-green-200 text-green-600";
      break;
    case 'hands-on':
      bgColor = "bg-orange-50 border-orange-200 text-orange-600";
      break;
    default:
      bgColor = "bg-gray-50 border-gray-200 text-gray-600";
  }
  
  return (
    <Badge className={`py-0.5 px-2 ${bgColor} border rounded-full flex items-center gap-1.5 font-normal`}>
      <ResourceTypeIcon type={type} />
      <span className="text-xs">{type}</span>
    </Badge>
  );
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
  const hoverScale = { scale: 1.01, transition: { type: "spring", stiffness: 300 } };
  
  const badgeColors = [
    "bg-blue-100 text-blue-700",
    "bg-purple-100 text-purple-700",
    "bg-green-100 text-green-700"
  ];
  
  const badgeColor = badgeColors[(dayNumber - 1) % badgeColors.length];
  
  return (
    <motion.div whileHover={hoverScale} className="will-change-transform">
      <Card className={`border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm transition-all duration-300 ${
        completed ? "shadow-md ring-1 ring-custom-blue/10" : ""
      }`}>
        <CardHeader className="p-6 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-full flex items-center justify-center ${
                completed 
                ? "bg-custom-light-blue/10 text-custom-blue" 
                : `${badgeColor}`
              } text-lg font-semibold`}>
                {completed ? <CheckCircle className="h-6 w-6" /> : dayNumber}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                <p className="text-xs text-gray-500">Estimated time: 1-2 hours</p>
              </div>
            </div>
            {completed && (
              <Badge variant="outline" className="bg-green-50 text-green-600 border-green-100 flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                Completed
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="px-6 space-y-5">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <span className="w-1 h-5 bg-blue-500 rounded-full"></span>
              Objectives
            </h4>
            <ul className="space-y-2.5">
              {objectives.map((objective, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-0.5 text-custom-light-blue bg-blue-50 p-0.5 rounded-full">
                    <Check className="h-3 w-3" />
                  </span>
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <span className="w-1 h-5 bg-purple-500 rounded-full"></span>
              Resources
            </h4>
            <ul className="space-y-2">
              {resources.map((resource, index) => (
                <li key={index} className="p-3 rounded-lg border border-gray-100 bg-gray-50 hover:bg-white hover:border-gray-200 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <ResourceTypeBadge type={resource.type} />
                    <a 
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm text-gray-700 hover:text-custom-blue transition-colors flex-1"
                    >
                      {resource.title}
                    </a>
                    <div className="text-gray-400 hover:text-gray-700 transition-colors cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <span className="w-1 h-5 bg-green-500 rounded-full"></span>
              Assignment
            </h4>
            <div className="text-sm text-gray-700 p-4 bg-green-50 rounded-lg border border-green-100">
              {assignment}
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-2">
          <Button 
            onClick={() => onMarkComplete(dayNumber)}
            variant={completed ? "outline" : "default"}
            size="sm"
            className={completed 
              ? "w-full border-green-200 text-green-600 hover:bg-green-50 rounded-xl py-5" 
              : "w-full bg-gradient-to-r from-custom-blue to-custom-light-blue hover:opacity-90 text-white shadow-md rounded-xl py-5"
            }
          >
            {completed ? (
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Completed
              </span>
            ) : "Mark as Complete"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default DayCard;
