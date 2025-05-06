
import React, { useState } from "react";
import SettingsPanel from "@/components/SettingsPanel";
import CurriculumPanel from "@/components/CurriculumPanel";
import { toast } from "@/components/ui/sonner";

const Index: React.FC = () => {
  const [curriculumGenerated, setCurriculumGenerated] = useState(false);

  const handleGenerateCurriculum = () => {
    toast.success("Curriculum generated successfully!");
    setCurriculumGenerated(true);
  };

  return (
    <div className="min-h-screen bg-gradient-dark py-8 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
          {/* Settings Panel (Left) */}
          <div className="w-full lg:w-2/5">
            <SettingsPanel onGenerateCurriculum={handleGenerateCurriculum} />
          </div>
          
          {/* Curriculum Panel (Right) */}
          <div className="w-full lg:w-3/5">
            <CurriculumPanel />
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-12 text-center text-white/50 text-sm">
          <p>AI Curriculum Builder — Personalized learning paths created just for you.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
