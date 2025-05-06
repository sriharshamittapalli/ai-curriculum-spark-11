
import React, { useState } from "react";
import SettingsPanel from "@/components/SettingsPanel";
import CurriculumPanel from "@/components/CurriculumPanel";
import { toast } from "@/components/ui/sonner";
import { motion } from "framer-motion";

const Index: React.FC = () => {
  const [curriculumGenerated, setCurriculumGenerated] = useState(false);

  const handleGenerateCurriculum = () => {
    toast.success("Curriculum generated successfully!");
    setCurriculumGenerated(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-custom-darker-blue to-custom-dark-blue py-8 px-4 md:px-8 overflow-hidden"
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Settings Panel (Left) */}
          <motion.div 
            className="w-full lg:w-2/5"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <SettingsPanel onGenerateCurriculum={handleGenerateCurriculum} />
          </motion.div>
          
          {/* Curriculum Panel (Right) */}
          <motion.div 
            className="w-full lg:w-3/5"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <CurriculumPanel />
          </motion.div>
        </div>
        
        {/* Footer */}
        <motion.div 
          className="mt-12 text-center text-white/50 text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
        >
          <p>AI Curriculum Builder — Personalized learning paths created just for you.</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Index;
