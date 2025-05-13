import { Link } from "wouter";
import { PixelCard } from "@/components/ui/pixel-card";
import { PixelButton } from "@/components/ui/pixel-button";
import { useProgress } from "@/context/progress-context";
import { Algorithm } from "@/types";

interface AlgorithmCardProps {
  algorithm: Algorithm;
}

export default function AlgorithmCard({ algorithm }: AlgorithmCardProps) {
  const { isViewed, isCompleted } = useProgress();
  
  // Determine status for visual indicators
  const viewed = isViewed(algorithm.id);
  const completed = isCompleted(algorithm.id);
  
  // Get status badge color
  const getStatusColor = () => {
    if (completed) return "bg-retro-green";
    if (viewed) return "bg-retro-yellow";
    return "bg-retro-blue";
  };
  
  // Get status text
  const getStatusText = () => {
    if (completed) return "COMPLETED";
    if (viewed) return "IN PROGRESS";
    return "NEW";
  };
  
  return (
    <PixelCard className="bg-retro-navy p-6 border-2 border-retro-white shadow-pixel relative overflow-hidden">
      <div className={`absolute top-0 left-0 ${getStatusColor()} px-3 py-1 text-xs`}>
        {getStatusText()}
      </div>
      
      <div className="pt-6">
        <h3 className="text-xl mb-4 text-retro-yellow">{algorithm.name.toUpperCase()}</h3>
        <p className="font-code mb-4">{algorithm.description}</p>
        
        <div className="bg-retro-black p-3 border-2 border-retro-white mb-4">
          <ul className="font-code space-y-2 text-sm">
            <li className="flex justify-between">
              <span>Time:</span>
              <span className={algorithm.complexity.time.includes('n²') ? 'text-retro-red' : 'text-retro-green'}>
                {algorithm.complexity.time}
              </span>
            </li>
            <li className="flex justify-between">
              <span>Space:</span>
              <span className={algorithm.complexity.space === 'O(1)' ? 'text-retro-green' : 'text-retro-yellow'}>
                {algorithm.complexity.space}
              </span>
            </li>
            <li className="flex justify-between">
              <span>Difficulty:</span>
              <span className={
                algorithm.difficulty === 'Easy' ? 'text-retro-green' : 
                algorithm.difficulty === 'Medium' ? 'text-retro-yellow' : 
                'text-retro-red'
              }>
                {algorithm.difficulty}
              </span>
            </li>
          </ul>
        </div>
        
        <div className="text-right">
          <Link href={`/algorithms/${algorithm.id}`}>
            <PixelButton className="bg-retro-teal border-2 border-retro-white shadow-pixel">
              START
            </PixelButton>
          </Link>
        </div>
      </div>
    </PixelCard>
  );
}
