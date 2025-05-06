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
    generateCurriculumFromForm,
    handleMarkComplete,
    handleRestart
  } = useCurriculumState();
  
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSettings, setShowMobileSettings] = useState(true);

  // Check for mobile viewport
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  useEffect(() => {
    // When curriculum is generated, switch to curriculum view on mobile
    if (isGenerated && isMobile) {
      setShowMobileSettings(false);
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
        duration: 0.5,
        staggerChildren: 0.05
      }
    }
  };

  // Variants for child elements
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  // Mobile tab switching animations
  const mobileTabVariants = {
    inactive: { scale: 1 },
    active: { scale: 1.05, transition: { type: "spring", stiffness: 500, damping: 15 } }
  };

  // Content switching animations
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    exit: {
      opacity: 0, 
      y: -20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-white to-gray-50 overflow-hidden">
      <AnimatePresence>
        {isLoading && <LoadingOverlay />}
      </AnimatePresence>
      
      {/* Fixed Sidebar (Left) */}
      <AnimatePresence mode="wait">
        {(!isMobile || (isMobile && showMobileSettings)) && (
          <motion.div 
            className={`${isMobile ? 'w-full fixed inset-0 z-20' : 'lg:w-[400px] lg:min-h-screen lg:fixed top-0 left-0 z-10'} border-r border-gray-200 bg-white shadow-sm sidebar-with-scrollbar`}
            key="settings"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
          >
            <SettingsPanel onGenerateCurriculum={handleGenerateCurriculum} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Mobile Toggle Button - Only visible when sidebar is hidden on mobile */}
      {isMobile && isGenerated && !showMobileSettings && (
        <motion.div 
          className="fixed top-4 left-4 z-20 bg-white rounded-full shadow-lg p-2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          onClick={() => setShowMobileSettings(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </motion.div>
      )}
      
      {/* Main Content Area (Right) - Pushed to the right when sidebar is visible */}
      <motion.div 
        className={`flex-1 min-h-screen ${(!isMobile || (isMobile && !showMobileSettings)) ? 'lg:ml-[400px]' : 'w-full'} py-6 px-4 md:px-6 lg:py-8 lg:px-10 bg-gray-50 hide-scrollbar`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto">
          {/* Mobile Toggle Button - For switching between Settings and Curriculum */}
          {isMobile && isGenerated && (
            <motion.div 
              className="flex justify-center mb-4 sticky top-0 z-10 bg-white/90 backdrop-blur-sm py-2"
              variants={itemVariants}
              layout
            >
              <motion.div 
                className="bg-white rounded-full shadow-md p-1 inline-flex border border-gray-100"
                layout
              >
                <motion.button 
                  className={`px-4 py-2 text-sm rounded-full transition-all relative ${showMobileSettings ? 'text-white' : 'text-gray-500'}`}
                  onClick={() => setShowMobileSettings(true)}
                  whileTap={{ scale: 0.95 }}
                  variants={mobileTabVariants}
                  animate={showMobileSettings ? "active" : "inactive"}
                  layout
                >
                  {showMobileSettings && (
                    <motion.div
                      className="absolute inset-0 bg-custom-blue rounded-full"
                      layoutId="activeMobileTab"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">Settings</span>
                </motion.button>
                <motion.button 
                  className={`px-4 py-2 text-sm rounded-full transition-all relative ${!showMobileSettings ? 'text-white' : 'text-gray-500'}`}
                  onClick={() => setShowMobileSettings(false)}
                  whileTap={{ scale: 0.95 }}
                  variants={mobileTabVariants}
                  animate={!showMobileSettings ? "active" : "inactive"}
                  layout
                >
                  {!showMobileSettings && (
                    <motion.div
                      className="absolute inset-0 bg-custom-blue rounded-full"
                      layoutId="activeMobileTab"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">Curriculum</span>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
          
          {/* Main Content */}
          {(!isMobile || (isMobile && !showMobileSettings)) && (
            <AnimatePresence mode="wait">
              <motion.div 
                className="w-full"
                key="curriculum"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
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

          {/* Footer */}
          <motion.div 
            className="mt-10 text-center text-gray-400 text-sm flex flex-col md:flex-row justify-center items-center gap-4"
            variants={itemVariants}
          >
            <p>AI Curriculum Builder — Personalized learning paths created just for you.</p>
            <div className="flex gap-3">
              <motion.a 
                href="#" 
                className="hover:text-custom-blue transition-colors p-2 hover:bg-blue-50 rounded-full"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </motion.a>
              <motion.a 
                href="#" 
                className="hover:text-custom-blue transition-colors p-2 hover:bg-blue-50 rounded-full"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
              </motion.a>
              <motion.a 
                href="#" 
                className="hover:text-custom-blue transition-colors p-2 hover:bg-blue-50 rounded-full"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
              </motion.a>
            </div>
          </motion.div>
        </div>
        
        {/* Mobile Bottom CTA - Only show when on settings panel and no curriculum is generated yet */}
        <AnimatePresence>
          {isMobile && showMobileSettings && !isGenerated && (
            <motion.div 
              className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-lg z-20"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <motion.button 
                onClick={() => {
                  toast.info("Please fill out the form above to generate a curriculum.");
                }}
                className="w-full bg-gradient-to-r from-custom-blue via-custom-light-blue to-custom-purple hover:opacity-90 text-white shadow-lg py-4 rounded-xl relative overflow-hidden flex items-center justify-center gap-2"
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.01 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                Generate Curriculum
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Index;
