import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { motion } from "framer-motion";
import { BookOpen, Video, FileText, Sparkles, PlusCircle, Code } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { formSchema, FormValues } from "@/lib/schema";

interface SettingsPanelProps {
  onGenerateCurriculum: (formData: FormValues) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  onGenerateCurriculum
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCustomTopicInput, setShowCustomTopicInput] = useState(false);
  
  // Initialize form with validation schema
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      learningPace: "",
      preferredStyles: [],
      learningDepth: "beginner",
    },
  });

  // Pre-defined topics
  const topics = [
    "Machine Learning",
    "Web Development",
    "Data Science",
    "Mobile Development",
    "Blockchain",
    "UI/UX Design",
    "JavaScript",
    "Python",
    "Cloud Computing",
    "DevOps",
  ];
  
  const handleSubmit = (values: FormValues) => {
    setIsGenerating(true);
    
    // Call the parent handler with form values
    onGenerateCurriculum(values);
    
    // Reset state after animation completes
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  const handleCustomTopic = () => {
    setShowCustomTopicInput(true);
    // Clear any previous selection
    form.setValue("topic", "");
  };

  // For handling the custom topic input
  const handleCustomTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Convert input to kebab-case
    const value = e.target.value.toLowerCase().replace(/\s+/g, '-');
    form.setValue("topic", value);
  };

  return (
    <div className="h-full flex flex-col w-full bg-white shadow-md border-r border-gray-100" style={{ overflowY: 'auto', maxHeight: '100vh' }}>
      <div className="p-6 border-b border-gray-100">
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
      
      <div 
        className="w-full overflow-hidden px-8 pb-8 hide-scrollbar"
        style={{ overflowY: 'auto', maxHeight: '100vh' }}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Topic Selection */}
            <motion.div 
              className="space-y-3 mt-6"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="topic" className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                      Topic
                      <span className="bg-blue-50 text-blue-700 text-xs px-1.5 py-0.5 rounded-full">Required</span>
                    </Label>
                    
                    {showCustomTopicInput ? (
                      <div className="relative">
                        <FormControl>
                          <Input 
                            placeholder="Enter a custom topic"
                            className="w-full border-gray-200 bg-white rounded-lg px-4 py-2 h-12 text-gray-700 hover:border-blue-400 transition-all shadow-sm hover:shadow focus:ring-blue-200 focus:border-blue-500"
                            onChange={handleCustomTopicChange}
                          />
                        </FormControl>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500"
                          onClick={() => setShowCustomTopicInput(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full border-gray-200 bg-white rounded-lg px-4 py-2 h-12 text-gray-700 hover:border-blue-400 transition-all shadow-sm hover:shadow focus:ring-blue-200 focus:border-blue-500">
                              <SelectValue placeholder="Select a topic" className="text-gray-500" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white rounded-xl border border-gray-100 shadow-lg max-h-[300px]">
                            {topics.map((topic, index) => (
                              <SelectItem 
                                key={topic} 
                                value={topic.toLowerCase().replace(/\s+/g, '-')}
                                className="hover:bg-gray-50 cursor-pointer py-2 px-2 rounded-md focus:bg-gray-50 text-gray-700"
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
                            <div 
                              className="mt-1 px-2 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2 border-t border-gray-100 text-custom-blue"
                              onClick={handleCustomTopic}
                            >
                              <PlusCircle className="h-4 w-4" />
                              <span>Add custom topic</span>
                            </div>
                          </SelectContent>
                        </Select>
                      </>
                    )}
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />
            </motion.div>

            {/* Learning Pace */}
            <motion.div 
              className="space-y-3"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <FormField
                control={form.control}
                name="learningPace"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="pace" className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                      Learning Pace
                      <span className="bg-blue-50 text-blue-700 text-xs px-1.5 py-0.5 rounded-full">Required</span>
                    </Label>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full border-gray-200 bg-white rounded-lg px-4 py-2 h-12 text-gray-700 hover:border-blue-400 transition-all shadow-sm hover:shadow focus:ring-blue-200 focus:border-blue-500">
                          <SelectValue placeholder="Select pace" className="text-gray-500" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white rounded-xl border border-gray-100 shadow-lg">
                        <SelectItem value="slow" className="hover:bg-gray-50 cursor-pointer py-2 px-2 rounded-md focus:bg-gray-50 text-gray-700">
                          <div className="flex items-center gap-2">
                            <div className="w-6 text-blue-500">🐢</div>
                            Slow & Steady (7 days)
                          </div>
                        </SelectItem>
                        <SelectItem value="normal" className="hover:bg-gray-50 cursor-pointer py-2 px-2 rounded-md focus:bg-gray-50 text-gray-700">
                          <div className="flex items-center gap-2">
                            <div className="w-6 text-purple-500">⚡</div>
                            Normal Pace (5 days)
                          </div>
                        </SelectItem>
                        <SelectItem value="fast" className="hover:bg-gray-50 cursor-pointer py-2 px-2 rounded-md focus:bg-gray-50 text-gray-700">
                          <div className="flex items-center gap-2">
                            <div className="w-6 text-orange-500">🚀</div>
                            Fast Track (3 days)
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />
            </motion.div>

            {/* Preferred Style */}
            <motion.div 
              className="space-y-3"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <FormField
                control={form.control}
                name="preferredStyles"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                      Preferred Style
                      <span className="bg-blue-50 text-blue-700 text-xs px-1.5 py-0.5 rounded-full">Required</span>
                    </Label>
                    <FormControl>
                      <ToggleGroup 
                        type="multiple" 
                        className="flex justify-start w-full gap-2"
                        value={field.value}
                        onValueChange={(value) => {
                          if (value.length > 0) {
                            field.onChange(value);
                          }
                        }}
                      >
                        <ToggleGroupItem 
                          value="videos" 
                          className="flex-1 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 shadow-sm transition-all hover:shadow data-[state=on]:bg-blue-50 data-[state=on]:text-blue-600 data-[state=on]:border-blue-300 h-auto p-0"
                        >
                          <div className="w-full py-3 flex flex-col items-center justify-center">
                            <Video className="h-5 w-5 mb-1.5" />
                            <span className="text-xs font-medium">Videos</span>
                          </div>
                        </ToggleGroupItem>
                        <ToggleGroupItem 
                          value="articles" 
                          className="flex-1 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 shadow-sm transition-all hover:shadow data-[state=on]:bg-blue-50 data-[state=on]:text-blue-600 data-[state=on]:border-blue-300 h-auto p-0"
                        >
                          <div className="w-full py-3 flex flex-col items-center justify-center">
                            <FileText className="h-5 w-5 mb-1.5" />
                            <span className="text-xs font-medium">Articles</span>
                          </div>
                        </ToggleGroupItem>
                        <ToggleGroupItem 
                          value="hands-on" 
                          className="flex-1 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 shadow-sm transition-all hover:shadow data-[state=on]:bg-blue-50 data-[state=on]:text-blue-600 data-[state=on]:border-blue-300 h-auto p-0"
                        >
                          <div className="w-full py-3 flex flex-col items-center justify-center">
                            <Code className="h-5 w-5 mb-1.5" />
                            <span className="text-xs font-medium">Hands-on</span>
                          </div>
                        </ToggleGroupItem>
                      </ToggleGroup>
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />
            </motion.div>

            {/* Learning Depth */}
            <motion.div 
              className="space-y-3"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <FormField
                control={form.control}
                name="learningDepth"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                      Learning Depth
                      <span className="bg-blue-50 text-blue-700 text-xs px-1.5 py-0.5 rounded-full">Required</span>
                    </Label>
                    <FormControl>
                      <RadioGroup 
                        onValueChange={field.onChange} 
                        value={field.value} 
                        className="space-y-2"
                      >
                        <motion.div 
                          className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg border border-gray-100 transition-colors cursor-pointer group hover:shadow-sm"
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
                          className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg border border-gray-100 transition-colors cursor-pointer group hover:shadow-sm"
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
                          className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg border border-gray-100 transition-colors cursor-pointer group hover:shadow-sm"
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
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="mt-8"
            >
              <Button 
                type="submit"
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:opacity-90 text-white shadow-lg hover:shadow-xl py-6 rounded-lg relative overflow-hidden group h-14 mb-8"
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
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SettingsPanel;
