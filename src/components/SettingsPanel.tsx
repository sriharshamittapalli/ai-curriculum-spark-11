
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { motion } from "framer-motion";
import { BookOpen, Video, FileText, Sparkles } from "lucide-react";

interface SettingsPanelProps {
  onGenerateCurriculum: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  onGenerateCurriculum
}) => {
  const topics = [
    "Machine Learning",
    "Web Development",
    "Data Science",
    "Mobile Development",
    "Blockchain",
    "UI/UX Design"
  ];
  
  const [selectedTopicIndex, setSelectedTopicIndex] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleTopicSelect = (value: string) => {
    const index = topics.findIndex(topic => topic.toLowerCase().replace(/\s+/g, '-') === value);
    setSelectedTopicIndex(index);
  };
  
  const handleGenerate = () => {
    setIsGenerating(true);
    onGenerateCurriculum();
    
    // Reset state after animation completes
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="glass-card p-8 h-full flex flex-col border border-gray-100 rounded-3xl bg-white/95 backdrop-blur-sm shadow-xl">
      <div className="mb-8">
        <motion.div 
          className="flex items-center gap-2 mb-2"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              repeatDelay: 3
            }}
          >
            <Sparkles className="h-7 w-7 text-custom-blue" />
          </motion.div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-custom-blue via-custom-light-blue to-custom-purple bg-clip-text text-transparent">AI Curriculum Builder</h2>
        </motion.div>
        <p className="text-gray-500 text-sm">Design your perfect learning journey in seconds</p>
      </div>
      
      <div className="space-y-8 flex-grow">
        {/* Topic Selection */}
        <motion.div 
          className="space-y-3"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Label htmlFor="topic" className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
            Topic
            <span className="bg-blue-50 text-blue-700 text-xs px-1.5 py-0.5 rounded-full">Required</span>
          </Label>
          <Select onValueChange={handleTopicSelect}>
            <SelectTrigger className="w-full border-gray-200 bg-white rounded-full px-4 py-2 h-12 text-gray-700 hover:border-custom-blue/70 transition-all shadow-sm hover:shadow focus:ring-custom-light-blue/30 focus:border-custom-blue">
              <SelectValue placeholder="Select a topic" />
            </SelectTrigger>
            <SelectContent className="bg-white rounded-xl border border-gray-100 shadow-lg">
              {topics.map((topic, index) => (
                <SelectItem 
                  key={topic} 
                  value={topic.toLowerCase().replace(/\s+/g, '-')}
                  className="hover:bg-gray-50 cursor-pointer py-2 px-2 rounded-md focus:bg-gray-50"
                >
                  <div className="flex items-center gap-2">
                    <motion.div 
                      className={`w-2 h-2 rounded-full ${[
                        'bg-blue-500',
                        'bg-green-500',
                        'bg-purple-500',
                        'bg-orange-500',
                        'bg-pink-500',
                        'bg-teal-500',
                      ][index % 6]}`}
                      initial={false}
                      whileHover={{ scale: 1.5 }}
                    ></motion.div>
                    {topic}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* Learning Pace */}
        <motion.div 
          className="space-y-3"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Label htmlFor="pace" className="text-sm font-medium text-gray-700">Learning Pace</Label>
          <Select>
            <SelectTrigger className="w-full border-gray-200 bg-white rounded-full px-4 py-2 h-12 text-gray-700 hover:border-custom-blue/70 transition-all shadow-sm hover:shadow focus:ring-custom-light-blue/30 focus:border-custom-blue">
              <SelectValue placeholder="Select pace" />
            </SelectTrigger>
            <SelectContent className="bg-white rounded-xl border border-gray-100 shadow-lg">
              <SelectItem value="slow" className="hover:bg-gray-50 cursor-pointer py-2 px-2 rounded-md focus:bg-gray-50">
                <div className="flex items-center gap-2">
                  <div className="w-6 text-blue-500">🐢</div>
                  Slow & Steady
                </div>
              </SelectItem>
              <SelectItem value="normal" className="hover:bg-gray-50 cursor-pointer py-2 px-2 rounded-md focus:bg-gray-50">
                <div className="flex items-center gap-2">
                  <div className="w-6 text-purple-500">⚡</div>
                  Normal Pace
                </div>
              </SelectItem>
              <SelectItem value="fast" className="hover:bg-gray-50 cursor-pointer py-2 px-2 rounded-md focus:bg-gray-50">
                <div className="flex items-center gap-2">
                  <div className="w-6 text-orange-500">🚀</div>
                  Fast Track
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Preferred Style */}
        <motion.div 
          className="space-y-3"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Label className="text-sm font-medium text-gray-700">Preferred Style</Label>
          <ToggleGroup type="multiple" className="gap-3 justify-center">
            <ToggleGroupItem 
              value="videos" 
              className="py-3 px-5 flex flex-col gap-2 items-center justify-center rounded-xl border-gray-200 bg-white data-[state=on]:bg-blue-50 data-[state=on]:text-custom-blue data-[state=on]:border-custom-blue hover:bg-gray-50 shadow-sm transition-all hover:shadow"
            >
              <Video className="h-5 w-5" />
              <span className="text-xs font-medium">Videos</span>
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="articles" 
              className="py-3 px-5 flex flex-col gap-2 items-center justify-center rounded-xl border-gray-200 bg-white data-[state=on]:bg-blue-50 data-[state=on]:text-custom-blue data-[state=on]:border-custom-blue hover:bg-gray-50 shadow-sm transition-all hover:shadow"
            >
              <FileText className="h-5 w-5" />
              <span className="text-xs font-medium">Articles</span>
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="hands-on" 
              className="py-3 px-5 flex flex-col gap-2 items-center justify-center rounded-xl border-gray-200 bg-white data-[state=on]:bg-blue-50 data-[state=on]:text-custom-blue data-[state=on]:border-custom-blue hover:bg-gray-50 shadow-sm transition-all hover:shadow"
            >
              <BookOpen className="h-5 w-5" />
              <span className="text-xs font-medium">Hands-on</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </motion.div>

        {/* Learning Depth */}
        <motion.div 
          className="space-y-3"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Label className="text-sm font-medium text-gray-700">Learning Depth</Label>
          <RadioGroup defaultValue="beginner" className="space-y-2">
            <motion.div 
              className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl border border-gray-100 transition-colors cursor-pointer group hover:shadow-sm"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <RadioGroupItem value="beginner" id="beginner" className="border-gray-300 text-custom-blue" />
              <Label htmlFor="beginner" className="text-sm font-normal cursor-pointer flex-1">
                <span className="font-medium text-gray-800 group-hover:text-custom-blue transition-colors">Beginner</span>
                <p className="text-xs text-gray-500">Fundamentals and core concepts</p>
              </Label>
            </motion.div>
            <motion.div 
              className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl border border-gray-100 transition-colors cursor-pointer group hover:shadow-sm"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <RadioGroupItem value="intermediate" id="intermediate" className="border-gray-300 text-custom-blue" />
              <Label htmlFor="intermediate" className="text-sm font-normal cursor-pointer flex-1">
                <span className="font-medium text-gray-800 group-hover:text-custom-blue transition-colors">Intermediate</span>
                <p className="text-xs text-gray-500">Practical applications and techniques</p>
              </Label>
            </motion.div>
            <motion.div 
              className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl border border-gray-100 transition-colors cursor-pointer group hover:shadow-sm"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <RadioGroupItem value="advanced" id="advanced" className="border-gray-300 text-custom-blue" />
              <Label htmlFor="advanced" className="text-sm font-normal cursor-pointer flex-1">
                <span className="font-medium text-gray-800 group-hover:text-custom-blue transition-colors">Advanced</span>
                <p className="text-xs text-gray-500">Complex topics and expertise building</p>
              </Label>
            </motion.div>
          </RadioGroup>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="mt-8"
      >
        <Button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-custom-blue via-custom-light-blue to-custom-purple hover:opacity-90 text-white shadow-lg hover:shadow-xl py-6 rounded-xl relative overflow-hidden group h-14"
        >
          <div className="absolute inset-0 w-full h-full bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          
          {isGenerating ? (
            <div className="flex items-center gap-3">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </div>
          ) : (
            <span className="relative flex items-center gap-2 text-base group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="h-5 w-5" />
              Generate Curriculum
            </span>
          )}
        </Button>
        
        <motion.p 
          className="text-xs text-center text-gray-400 mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          We'll create a personalized learning path just for you
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SettingsPanel;
