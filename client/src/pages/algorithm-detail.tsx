import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import CodeBlock from "@/components/algorithms/code-block";
import { PixelButton } from "@/components/ui/pixel-button";
import { useProgress } from "@/context/progress-context";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function AlgorithmDetail() {
  const [, params] = useRoute("/algorithms/:id");
  const algorithmId = parseInt(params?.id || "0");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const { markViewed, isViewed } = useProgress();
  
  // Fetch algorithm details
  const { data: algorithm, isLoading } = useQuery({
    queryKey: [`/api/algorithms/${algorithmId}`],
  });
  
  // Update page title
  useEffect(() => {
    if (algorithm) {
      document.title = `${algorithm.name} - AlgoQuest`;
      if (!isViewed(algorithmId)) {
        markViewed(algorithmId);
      }
    }
  }, [algorithm, algorithmId, markViewed, isViewed]);
  
  // Handle next step button click
  const handleNextStep = () => {
    if (algorithm && currentStepIndex < algorithm.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      setCurrentStepIndex(0); // Loop back to start
    }
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Skeleton className="h-16 w-3/4 mx-auto mb-8 bg-retro-navy" />
        <div className="bg-retro-black p-6 border-2 border-retro-white shadow-pixel mb-8">
          <Skeleton className="h-96 bg-retro-navy" />
        </div>
      </div>
    );
  }
  
  if (!algorithm) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl text-retro-red mb-4">ALGORITHM NOT FOUND</h1>
        <p className="font-code mb-8">This algorithm doesn't exist in our database.</p>
        <PixelButton href="/" className="bg-retro-teal">RETURN TO HOME</PixelButton>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl mb-4 text-retro-yellow">{algorithm.name.toUpperCase()}</h1>
        <p className="font-code text-xl">{algorithm.description}</p>
      </div>
      
      <div className="bg-retro-black p-6 border-2 border-retro-white shadow-pixel mb-8">
        <div className="visualization-area bg-retro-navy p-4 border-2 border-retro-white min-h-[300px] mb-6 relative overflow-hidden">
          {/* Algorithm visualization */}
          <div className="flex items-center justify-center h-full">
            <motion.div
              key={currentStepIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center p-4"
            >
              <h3 className="text-xl text-retro-yellow mb-4">STEP {currentStepIndex + 1}: {algorithm.steps[currentStepIndex]}</h3>
              <p className="font-code text-lg mb-6">
                {algorithm.steps[currentStepIndex]}
              </p>
              <div className="h-24 flex items-center justify-center">
                {/* Visualization would go here */}
                <p className="font-code text-retro-teal">
                  [Algorithm visualization for step {currentStepIndex + 1}]
                </p>
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="flex flex-wrap md:flex-nowrap gap-6">
          <div className="w-full md:w-2/3">
            <h3 className="text-lg mb-4 text-retro-teal">HOW {algorithm.name.toUpperCase()} WORKS</h3>
            <p className="font-code mb-4">{algorithm.description}</p>
            <div className="bg-retro-navy p-4 border-2 border-retro-white">
              <CodeBlock code={algorithm.code} language="javascript" />
            </div>
          </div>
          
          <div className="w-full md:w-1/3 bg-retro-navy p-4 border-2 border-retro-white">
            <h3 className="text-lg mb-4 text-retro-yellow">STATS</h3>
            <ul className="font-code space-y-3">
              <li className="flex justify-between">
                <span>Time Complexity:</span>
                <span className={`${algorithm.complexity.time.includes('n²') ? 'text-retro-red' : 'text-retro-green'}`}>
                  {algorithm.complexity.time}
                </span>
              </li>
              <li className="flex justify-between">
                <span>Space Complexity:</span>
                <span className={`${algorithm.complexity.space === 'O(1)' ? 'text-retro-green' : 'text-retro-yellow'}`}>
                  {algorithm.complexity.space}
                </span>
              </li>
              <li className="flex justify-between">
                <span>Stability:</span>
                <span className={`${algorithm.isStable ? 'text-retro-green' : 'text-retro-red'}`}>
                  {algorithm.isStable ? 'Stable' : 'Unstable'}
                </span>
              </li>
              <li className="flex justify-between">
                <span>Difficulty:</span>
                <span className={`
                  ${algorithm.difficulty === 'Easy' ? 'text-retro-green' : ''}
                  ${algorithm.difficulty === 'Medium' ? 'text-retro-yellow' : ''}
                  ${algorithm.difficulty === 'Hard' ? 'text-retro-red' : ''}
                `}>
                  {algorithm.difficulty}
                </span>
              </li>
            </ul>
            
            <div className="mt-6">
              <PixelButton 
                className="bg-retro-yellow w-full text-black" 
                onClick={handleNextStep}
              >
                {currentStepIndex === algorithm.steps.length - 1 ? 'RESTART' : 'NEXT STEP'}
              </PixelButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
