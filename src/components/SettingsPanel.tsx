
import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
    <div className="glass-card p-6 h-full flex flex-col">
      <h2 className="text-2xl font-semibold mb-6 text-white">AI Curriculum Builder</h2>
      
      <div className="space-y-6 flex-grow">
        {/* Topic Selection */}
        <div className="space-y-2">
          <Label htmlFor="topic">Topic</Label>
          <Select>
            <SelectTrigger className="w-full bg-custom-dark-blue text-white border-custom-blue/30">
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
          <Label htmlFor="pace">Learning Pace</Label>
          <Select>
            <SelectTrigger className="w-full bg-custom-dark-blue text-white border-custom-blue/30">
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
          <Label>Preferred Style</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="videos" />
              <Label htmlFor="videos" className="text-sm font-normal">Videos</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="articles" />
              <Label htmlFor="articles" className="text-sm font-normal">Articles</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="hands-on" />
              <Label htmlFor="hands-on" className="text-sm font-normal">Hands-on</Label>
            </div>
          </div>
        </div>

        {/* Learning Depth */}
        <div className="space-y-3">
          <Label>Learning Depth</Label>
          <RadioGroup defaultValue="beginner">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="beginner" id="beginner" />
              <Label htmlFor="beginner" className="text-sm font-normal">Beginner</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="intermediate" id="intermediate" />
              <Label htmlFor="intermediate" className="text-sm font-normal">Intermediate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="advanced" id="advanced" />
              <Label htmlFor="advanced" className="text-sm font-normal">Advanced</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      
      <Button 
        onClick={onGenerateCurriculum}
        className="mt-6 w-full bg-custom-blue hover:bg-custom-light-blue text-white"
      >
        Generate Curriculum
      </Button>
    </div>
  );
};

export default SettingsPanel;
