import React, { useState, useEffect } from "react";
import SettingsPanel from "@/components/SettingsPanel";
import CurriculumPanel from "@/components/CurriculumPanel";
import { toast } from "@/components/ui/sonner";
import { motion, AnimatePresence } from "framer-motion";
import LoadingOverlay from "@/components/LoadingOverlay";
import { FormValues } from "@/lib/schema";
import { useCurriculumState } from "@/hooks/useCurriculumState";

const Index: React.FC = () => {
  const {
    curriculumData,
    completedDays,
    isLoading,
    isGenerated,
    currentTopic,
    handleMarkComplete,
    handleRestart,
    generateCurriculumFromForm
  } = useCurriculumState();
  
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSettings, setShowMobileSettings] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // Check for mobile viewport
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  // Effect to handle mobile view switching
  useEffect(() => {
    // When curriculum is generated, switch to curriculum view on mobile
    if (isGenerated && isMobile) {
      setShowMobileSettings(false);
      setShowContent(true);
    }
  }, [isGenerated, isMobile]);

  const handleGenerateCurriculum = (formData: FormValues) => {
    generateCurriculumFromForm(formData);
  };

  // Variants for main container animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.5,
        ease: "easeInOut"
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        staggerChildren: 0.05,
        staggerDirection: -1,
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };
  
  // Variants for individual items
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: { 
      y: -20, 
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };
  
  // Variants for content sections
  const contentVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      x: -50,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };
  
  // Variants for mobile tab buttons
  const mobileTabVariants = {
    active: { 
      color: "var(--custom-blue)",
      fontWeight: 600,
      transition: { duration: 0.2 }
    },
    inactive: { 
      color: "var(--gray-500)",
      fontWeight: 400,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-white to-gray-50 overflow-hidden">
      <AnimatePresence>
        {isLoading && <LoadingOverlay />}
      </AnimatePresence>
      
      {/* Fixed Sidebar (Left) */}
      <motion.div 
        className={`
          ${isMobile ? 
            'fixed inset-0 z-30 bg-white' : 
            'w-[400px] min-h-screen sticky top-0 border-r border-gray-100 bg-white'
          }
          ${isMobile && !showMobileSettings ? 'translate-x-[-100%]' : 'translate-x-0'}
          transition-transform duration-300 ease-in-out
        `}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <SettingsPanel 
          onGenerateCurriculum={handleGenerateCurriculum}
          isMobile={isMobile}
          onClose={() => setShowMobileSettings(false)}
        />
      </motion.div>
      
      {/* Mobile Menu Button - Only show when settings are hidden */}
      {isMobile && !showMobileSettings && (
        <motion.div 
          className="fixed bottom-6 left-6 z-30 bg-white rounded-full p-3 shadow-lg"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          onClick={() => setShowMobileSettings(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><line x1="9" x2="15" y1="9" y2="9"></line><line x1="9" x2="15" y1="15" y2="15"></line></svg>
        </motion.div>
      )}
      
      {/* Mobile Tab Buttons - Only show when curriculum is generated */}
      {isMobile && isGenerated && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex z-20">
          <motion.button
            className={`flex-1 py-4 font-medium text-sm flex items-center justify-center gap-2 ${showMobileSettings ? 'text-custom-blue' : 'text-gray-500'}`}
            onClick={() => setShowMobileSettings(true)}
            variants={mobileTabVariants}
            animate={showMobileSettings ? "active" : "inactive"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            Settings
          </motion.button>
          <motion.button
            className={`flex-1 py-4 font-medium text-sm flex items-center justify-center gap-2 ${!showMobileSettings ? 'text-custom-blue' : 'text-gray-500'}`}
            onClick={() => setShowMobileSettings(false)}
            variants={mobileTabVariants}
            animate={!showMobileSettings ? "active" : "inactive"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path></svg>
            Curriculum
          </motion.button>
        </div>
      )}
      
      {/* Main Content (Right) */}
      <motion.div 
        className={`flex-1 ${!isMobile ? 'lg:ml-[400px]' : ''} p-5`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.5 }}
      >
        {/* Main content container */}
        <div className="max-w-4xl mx-auto pt-5 pb-20 min-h-[calc(100vh-40px)]">
          {/* Empty state when no curriculum is generated */}
          {(!isGenerated || !curriculumData) && !isMobile && (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-5">
              <motion.img 
                src="/images/empty-state.svg" 
                alt="No curriculum generated yet" 
                className="w-64 h-64 mb-6 opacity-90"
                variants={itemVariants}
              />
              <motion.h2 
                className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
                variants={itemVariants}
              >
                No Curriculum Generated Yet
              </motion.h2>
              <motion.p 
                className="text-gray-500 max-w-lg mb-8"
                variants={itemVariants}
              >
                Use the settings panel on the left to configure your learning preferences and generate a personalized curriculum.
              </motion.p>
            </div>
          )}
          
          {/* Generated curriculum */}
          {isGenerated && (!isMobile || (isMobile && !showMobileSettings)) && (
            <AnimatePresence mode="wait">
              <motion.div
                key="curriculum-content"
                className="h-full flex flex-col overflow-auto"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={contentVariants}
              >
                <CurriculumPanel 
                  data={curriculumData}
                  completedDays={completedDays}
                  onMarkComplete={handleMarkComplete}
                  onRestart={handleRestart}
                  isGenerated={isGenerated}
                  currentTopic={currentTopic}
                />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
