
import React, { useState } from "react";
import SettingsPanel from "@/components/SettingsPanel";
import CurriculumPanel from "@/components/CurriculumPanel";
import { toast } from "@/components/ui/sonner";
import { motion } from "framer-motion";
import LoadingOverlay from "@/components/LoadingOverlay";

const Index: React.FC = () => {
  const [curriculumGenerated, setCurriculumGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateCurriculum = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Curriculum generated successfully!");
      setCurriculumGenerated(true);
      setIsLoading(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 py-8 px-4 md:px-8 overflow-hidden relative">
      {isLoading && <LoadingOverlay />}
      
      <motion.div 
        className="container mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
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
          className="mt-12 text-center text-gray-400 text-sm flex justify-center items-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
        >
          <p>AI Curriculum Builder — Personalized learning paths created just for you.</p>
          <div className="flex gap-3">
            <a href="#" className="hover:text-custom-blue transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
            <a href="#" className="hover:text-custom-blue transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
            </a>
            <a href="#" className="hover:text-custom-blue transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
