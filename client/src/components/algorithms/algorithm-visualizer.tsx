import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CodeBlock from "@/components/algorithms/code-block";
import { PixelButton } from "@/components/ui/pixel-button";
import { Algorithm } from "@/types";
import { Link } from "wouter";

interface AlgorithmVisualizerProps {
  algorithm: Algorithm;
}

export default function AlgorithmVisualizer({ algorithm }: AlgorithmVisualizerProps) {
  const [currentAlgorithm, setCurrentAlgorithm] = useState(algorithm);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  // Handle tab click (this would fetch the selected algorithm in a real implementation)
  const handleTabClick = (algorithmName: string) => {
    // For demo purposes, we're just updating the tab state
    // In a real implementation, you would fetch the new algorithm data
    if (algorithmName === currentAlgorithm.name) return;
    
    // Reset step index when changing algorithms
    setCurrentStepIndex(0);
  };
  
  // Handle next step button click
  const handleNextStep = () => {
    if (currentStepIndex < (currentAlgorithm.steps?.length || 0) - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      setCurrentStepIndex(0); // Loop back to start
    }
  };
  
  // Animation variants for step transitions
  const stepVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };
  
  return (
    <div className="bg-retro-black p-6 border-2 border-retro-white shadow-pixel mb-8">
      <div className="flex flex-wrap gap-4 mb-6">
        <button 
          className={`tab ${currentAlgorithm.name === "Bubble Sort" ? "active" : ""} pixel-button ${currentAlgorithm.name === "Bubble Sort" ? "bg-retro-red" : "bg-retro-navy"} border-2 border-retro-white shadow-pixel px-3 py-2`}
          onClick={() => handleTabClick("Bubble Sort")}
        >
          Bubble Sort
        </button>
        <button 
          className={`tab ${currentAlgorithm.name === "Quick Sort" ? "active" : ""} pixel-button ${currentAlgorithm.name === "Quick Sort" ? "bg-retro-red" : "bg-retro-navy"} border-2 border-retro-white shadow-pixel px-3 py-2`}
          onClick={() => handleTabClick("Quick Sort")}
        >
          Quick Sort
        </button>
        <button 
          className={`tab ${currentAlgorithm.name === "Merge Sort" ? "active" : ""} pixel-button ${currentAlgorithm.name === "Merge Sort" ? "bg-retro-red" : "bg-retro-navy"} border-2 border-retro-white shadow-pixel px-3 py-2`}
          onClick={() => handleTabClick("Merge Sort")}
        >
          Merge Sort
        </button>
      </div>
      
      <div className="visualization-area bg-retro-navy p-4 border-2 border-retro-white min-h-[300px] mb-6 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStepIndex}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={stepVariants}
            transition={{ duration: 0.3 }}
            className="h-full flex flex-col items-center justify-center"
          >
            <h3 className="text-xl text-retro-yellow mb-6">
              {currentAlgorithm.steps && currentAlgorithm.steps[currentStepIndex]}
            </h3>
            
            <div className="flex items-end justify-center space-x-2 h-32">
              {[5, 2, 8, 1, 9, 3].map((value, index) => (
                <div 
                  key={index}
                  className={`w-12 bg-retro-red border-2 border-retro-white flex items-center justify-center ${
                    currentStepIndex === 1 && (index === 0 || index === 1) ? 'bg-retro-yellow' : 
                    currentStepIndex === 2 && (index === 0 || index === 1) ? 'bg-retro-green' : 
                    'bg-retro-red'
                  }`}
                  style={{ height: `${value * 20}px` }}
                >
                  <span className="font-code text-white">{value}</span>
                </div>
              ))}
            </div>
            
            <p className="mt-6 font-code text-retro-white">
              {currentStepIndex === 0 && "Initial array to be sorted"}
              {currentStepIndex === 1 && "Comparing adjacent elements"}
              {currentStepIndex === 2 && "Swapping elements if needed"}
              {currentStepIndex === 3 && "Moving to next pair"}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="flex flex-wrap md:flex-nowrap gap-6">
        <div className="w-full md:w-2/3">
          <h3 className="text-lg mb-4 text-retro-teal">HOW {currentAlgorithm.name.toUpperCase()} WORKS</h3>
          <p className="font-code mb-4">{currentAlgorithm.description}</p>
          <div className="bg-retro-navy p-4 border-2 border-retro-white">
            <CodeBlock code={currentAlgorithm.code} language="javascript" />
          </div>
        </div>
        
        <div className="w-full md:w-1/3 bg-retro-navy p-4 border-2 border-retro-white">
          <h3 className="text-lg mb-4 text-retro-yellow">STATS</h3>
          <ul className="font-code space-y-3">
            <li className="flex justify-between">
              <span>Time Complexity:</span>
              <span className={`${currentAlgorithm.complexity.time.includes('n²') ? 'text-retro-red' : 'text-retro-green'}`}>
                {currentAlgorithm.complexity.time}
              </span>
            </li>
            <li className="flex justify-between">
              <span>Space Complexity:</span>
              <span className={currentAlgorithm.complexity.space === 'O(1)' ? 'text-retro-green' : 'text-retro-yellow'}>
                {currentAlgorithm.complexity.space}
              </span>
            </li>
            <li className="flex justify-between">
              <span>Stability:</span>
              <span className={currentAlgorithm.isStable ? 'text-retro-green' : 'text-retro-red'}>
                {currentAlgorithm.isStable ? 'Stable' : 'Unstable'}
              </span>
            </li>
            <li className="flex justify-between">
              <span>Difficulty:</span>
              <span className={
                currentAlgorithm.difficulty === 'Easy' ? 'text-retro-green' : 
                currentAlgorithm.difficulty === 'Medium' ? 'text-retro-yellow' : 
                'text-retro-red'
              }>
                {currentAlgorithm.difficulty}
              </span>
            </li>
          </ul>
          
          <div className="mt-6 flex flex-col gap-3">
            <PixelButton className="bg-retro-yellow text-black w-full" onClick={handleNextStep}>
              NEXT STEP
            </PixelButton>
            
            <Link href={`/algorithms/${currentAlgorithm.id}`}>
              <PixelButton className="bg-retro-teal w-full">
                FULL DETAILS
              </PixelButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
