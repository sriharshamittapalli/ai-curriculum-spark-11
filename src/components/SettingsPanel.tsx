
import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { BookOpen, Video, FileText } from "lucide-react";

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

  return (
    <div className="glass-card p-6 h-full flex flex-col border border-white/10 shadow-xl">
      <h2 className="text-2xl font-semibold mb-8 text-white bg-gradient-to-r from-custom-light-blue to-custom-purple bg-clip-text text-transparent">AI Curriculum Builder</h2>
      
      <div className="space-y-6 flex-grow">
        {/* Topic Selection */}
        <div className="space-y-2">
          <Label htmlFor="topic" className="text-white/80">Topic</Label>
          <Select>
            <SelectTrigger className="w-full glass-card text-white border-custom-blue/30 focus:ring-custom-light-blue/50">
              <SelectValue placeholder="Select a topic" />
            </SelectTrigger>
            <SelectContent className="bg-custom-dark-blue border border-custom-blue/30">
              {topics.map((topic) => (
                <SelectItem key={topic} value={topic.toLowerCase().replace(/\s+/g, '-')}>
                  {topic}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Learning Pace */}
        <div className="space-y-2">
          <Label htmlFor="pace" className="text-white/80">Learning Pace</Label>
          <Select>
            <SelectTrigger className="w-full glass-card text-white border-custom-blue/30 focus:ring-custom-light-blue/50">
              <SelectValue placeholder="Select pace" />
            </SelectTrigger>
            <SelectContent className="bg-custom-dark-blue border border-custom-blue/30">
              <SelectItem value="slow">Slow</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="fast">Fast</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Preferred Style */}
        <div className="space-y-3">
          <Label className="text-white/80">Preferred Style</Label>
          <ToggleGroup type="multiple" className="justify-start">
            <ToggleGroupItem value="videos" className="data-[state=on]:bg-custom-blue/30 data-[state=on]:text-white data-[state=on]:border-custom-blue">
              <Video className="h-4 w-4 mr-1" />
              Videos
            </ToggleGroupItem>
            <ToggleGroupItem value="articles" className="data-[state=on]:bg-custom-blue/30 data-[state=on]:text-white data-[state=on]:border-custom-blue">
              <FileText className="h-4 w-4 mr-1" />
              Articles
            </ToggleGroupItem>
            <ToggleGroupItem value="hands-on" className="data-[state=on]:bg-custom-blue/30 data-[state=on]:text-white data-[state=on]:border-custom-blue">
              <BookOpen className="h-4 w-4 mr-1" />
              Hands-on
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Learning Depth */}
        <div className="space-y-3">
          <Label className="text-white/80">Learning Depth</Label>
          <RadioGroup defaultValue="beginner" className="space-y-3">
            <div className="flex items-center space-x-3 p-2 hover:bg-white/5 rounded-md transition-colors cursor-pointer">
              <RadioGroupItem value="beginner" id="beginner" className="border-custom-blue text-custom-blue" />
              <Label htmlFor="beginner" className="text-sm font-normal cursor-pointer">Beginner</Label>
            </div>
            <div className="flex items-center space-x-3 p-2 hover:bg-white/5 rounded-md transition-colors cursor-pointer">
              <RadioGroupItem value="intermediate" id="intermediate" className="border-custom-blue text-custom-blue" />
              <Label htmlFor="intermediate" className="text-sm font-normal cursor-pointer">Intermediate</Label>
            </div>
            <div className="flex items-center space-x-3 p-2 hover:bg-white/5 rounded-md transition-colors cursor-pointer">
              <RadioGroupItem value="advanced" id="advanced" className="border-custom-blue text-custom-blue" />
              <Label htmlFor="advanced" className="text-sm font-normal cursor-pointer">Advanced</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      
      <Button 
        onClick={onGenerateCurriculum}
        className="mt-8 w-full bg-gradient-to-r from-custom-blue to-custom-purple hover:opacity-90 text-white shadow-lg py-6"
      >
        Generate Curriculum
      </Button>
    </div>
  );
};

export default SettingsPanel;
