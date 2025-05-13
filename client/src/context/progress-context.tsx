import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface ProgressContextProps {
  viewedAlgorithms: number[];
  completedAlgorithms: number[];
  markViewed: (algorithmId: number) => void;
  markCompleted: (algorithmId: number) => void;
  isViewed: (algorithmId: number) => boolean;
  isCompleted: (algorithmId: number) => boolean;
}

const ProgressContext = createContext<ProgressContextProps>({
  viewedAlgorithms: [],
  completedAlgorithms: [],
  markViewed: () => {},
  markCompleted: () => {},
  isViewed: () => false,
  isCompleted: () => false
});

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewedAlgorithms, setViewedAlgorithms] = useState<number[]>([]);
  const [completedAlgorithms, setCompletedAlgorithms] = useState<number[]>([]);
  const { toast } = useToast();
  
  // Load saved progress from localStorage on initial render
  useEffect(() => {
    const savedViewed = localStorage.getItem("viewedAlgorithms");
    const savedCompleted = localStorage.getItem("completedAlgorithms");
    
    if (savedViewed) {
      try {
        setViewedAlgorithms(JSON.parse(savedViewed));
      } catch (error) {
        console.error("Failed to parse viewed algorithms from localStorage");
      }
    }
    
    if (savedCompleted) {
      try {
        setCompletedAlgorithms(JSON.parse(savedCompleted));
      } catch (error) {
        console.error("Failed to parse completed algorithms from localStorage");
      }
    }
  }, []);
  
  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("viewedAlgorithms", JSON.stringify(viewedAlgorithms));
  }, [viewedAlgorithms]);
  
  useEffect(() => {
    localStorage.setItem("completedAlgorithms", JSON.stringify(completedAlgorithms));
  }, [completedAlgorithms]);
  
  // Mark an algorithm as viewed
  const markViewed = (algorithmId: number) => {
    if (!viewedAlgorithms.includes(algorithmId)) {
      setViewedAlgorithms(prev => [...prev, algorithmId]);
      
      // In a real app, this would send the update to the server
      updateProgressOnServer(algorithmId, false);
    }
  };
  
  // Mark an algorithm as completed
  const markCompleted = (algorithmId: number) => {
    if (!completedAlgorithms.includes(algorithmId)) {
      setCompletedAlgorithms(prev => [...prev, algorithmId]);
      
      // Also mark as viewed if not already
      if (!viewedAlgorithms.includes(algorithmId)) {
        setViewedAlgorithms(prev => [...prev, algorithmId]);
      }
      
      // Show a completion toast
      toast({
        title: "Achievement Unlocked!",
        description: "You've completed an algorithm! +100 XP",
        className: "bg-retro-green border-retro-white text-white"
      });
      
      // In a real app, this would send the update to the server
      updateProgressOnServer(algorithmId, true);
    }
  };
  
  // Check if an algorithm has been viewed
  const isViewed = (algorithmId: number): boolean => {
    return viewedAlgorithms.includes(algorithmId);
  };
  
  // Check if an algorithm has been completed
  const isCompleted = (algorithmId: number): boolean => {
    return completedAlgorithms.includes(algorithmId);
  };
  
  // Update progress on the server (simplified for demo)
  const updateProgressOnServer = async (algorithmId: number, completed: boolean) => {
    try {
      // This is a simplified version - in a real app, you would use the user's ID
      await apiRequest('POST', '/api/progress', {
        userId: 1, // Mock user ID
        algorithmId,
        completed
      });
    } catch (error) {
      console.error("Failed to update progress on server:", error);
    }
  };
  
  const contextValue: ProgressContextProps = {
    viewedAlgorithms,
    completedAlgorithms,
    markViewed,
    markCompleted,
    isViewed,
    isCompleted
  };
  
  return (
    <ProgressContext.Provider value={contextValue}>
      {children}
    </ProgressContext.Provider>
  );
};

// Custom hook to use the progress context
export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
};
