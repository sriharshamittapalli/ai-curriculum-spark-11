
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Video, BookOpen, FileText, CheckCircle, ArrowUpRight } from "lucide-react";
import { Resource } from "@/types/curriculum";

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
      return <FileText className="h-3.5 w-3.5" />;
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
  const [isCheckmarkAnimating, setIsCheckmarkAnimating] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const handleMarkComplete = () => {
    if (!completed) {
      setIsCheckmarkAnimating(true);
      // Small delay to allow animation to play before state changes
      setTimeout(() => {
        onMarkComplete(dayNumber);
      }, 300);
    } else {
      onMarkComplete(dayNumber);
    }
  };
  
  const badgeColors = [
    "bg-blue-100 text-blue-700",
    "bg-purple-100 text-purple-700",
    "bg-green-100 text-green-700"
  ];
  
  const badgeColor = badgeColors[(dayNumber - 1) % badgeColors.length];
  
  return (
    <motion.div 
      whileHover={{ scale: 1.01, y: -4 }} 
      transition={{ type: "spring", stiffness: 300 }} 
      className="will-change-transform"
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
    >
      <Card className={`premium-card overflow-hidden ${
        completed ? "ring-1 ring-custom-blue/20 shadow-lg border-custom-blue/10" : "border-gray-200 shadow"
      }`}>
        <CardHeader className="p-6 pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
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
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring" }}
              >
                <Badge variant="outline" className="badge-completed flex items-center gap-1 font-medium text-green-600 border-green-200 bg-green-50">
                  <CheckCircle className="h-3 w-3" />
                  Completed
                </Badge>
              </motion.div>
            )}
          </div>
        </CardHeader>
        <CardContent className="px-6 space-y-5">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full" style={{background: "linear-gradient(to bottom, #3b82f6, #60a5fa)"}}></span>
              Objectives
            </h4>
            <ul className="space-y-2.5">
              {objectives.map((objective, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start gap-2 text-sm text-gray-700"
                  initial={false}
                  animate={isHovering ? { x: 3 } : { x: 0 }}
                  transition={{ type: "spring", stiffness: 300, delay: index * 0.05 }}
                >
                  <span className="mt-0.5 text-custom-light-blue bg-blue-50 p-0.5 rounded-full">
                    <Check className="h-3 w-3" />
                  </span>
                  <span>{objective}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          
          <div className="h-px bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100"></div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full" style={{background: "linear-gradient(to bottom, #8b5cf6, #a78bfa)"}}></span>
              Resources
            </h4>
            <ul className="space-y-2">
              {resources.map((resource, index) => (
                <motion.li 
                  key={index} 
                  className="p-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:border-gray-200 transition-all hover:shadow-md"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
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
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
          
          <div className="h-px bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100"></div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full" style={{background: "linear-gradient(to bottom, #22c55e, #4ade80)"}}></span>
              Assignment
            </h4>
            <motion.div 
              className="text-sm text-gray-700 p-4 bg-green-50 rounded-xl border border-green-100"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {assignment}
            </motion.div>
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-2">
          <Button 
            onClick={handleMarkComplete}
            variant={completed ? "outline" : "default"}
            size="sm"
            className={completed 
              ? "w-full border-green-200 text-green-600 hover:bg-green-50 rounded-xl py-5" 
              : "w-full bg-gradient-to-r from-custom-blue to-custom-light-blue hover:opacity-90 text-white shadow-md hover:shadow-lg rounded-xl py-5 group"
            }
          >
            <AnimatePresence mode="wait">
              {isCheckmarkAnimating && !completed ? (
                <motion.span 
                  key="checking"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1.2 }}
                  exit={{ scale: 0 }}
                  className="flex items-center justify-center"
                >
                  <CheckCircle className="h-5 w-5 mx-auto" />
                </motion.span>
              ) : completed ? (
                <motion.span 
                  key="completed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  Completed
                </motion.span>
              ) : (
                <motion.span 
                  key="mark-complete"
                  className="group-hover:scale-105 transition-transform"
                >
                  Mark as Complete
                </motion.span>
              )}
            </AnimatePresence>
            
            {!completed && (
              <span className="absolute inset-0 rounded-xl overflow-hidden">
                <span className="absolute inset-0 bg-white/20 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </span>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default DayCard;
