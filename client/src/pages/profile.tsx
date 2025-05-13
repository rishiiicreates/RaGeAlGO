import { useQuery } from "@tanstack/react-query";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Skeleton } from "@/components/ui/skeleton";
import { useProgress } from "@/context/progress-context";
import { PixelCard } from "@/components/ui/pixel-card";
import { useEffect } from "react";
import { AchievementBadge } from "@/types";

export default function Profile() {
  const { viewedAlgorithms, completedAlgorithms } = useProgress();
  
  // Fetch all algorithms to calculate progress
  const { data: algorithms, isLoading: loadingAlgorithms } = useQuery({
    queryKey: ['/api/algorithms'],
  });
  
  // Fetch all categories
  const { data: categories, isLoading: loadingCategories } = useQuery({
    queryKey: ['/api/categories'],
  });
  
  // Update page title
  useEffect(() => {
    document.title = "Your Progress - AlgoQuest";
  }, []);
  
  // Mock achievements data
  const achievements: AchievementBadge[] = [
    {
      id: "search_master",
      name: "Search Master",
      icon: "🔍",
      description: "Complete all search algorithms",
      unlocked: true
    },
    {
      id: "sort_novice",
      name: "Sort Novice",
      icon: "🧮",
      description: "Complete 2 sorting algorithms",
      unlocked: true
    },
    {
      id: "graph_explorer",
      name: "Graph Explorer",
      icon: "🕸️",
      description: "Complete your first graph algorithm",
      unlocked: false
    },
    {
      id: "dynamic_programmer",
      name: "Dynamic Programmer",
      icon: "📊",
      description: "Complete all dynamic programming challenges",
      unlocked: false
    },
    {
      id: "data_structurer",
      name: "Data Structurer",
      icon: "🧱",
      description: "Master basic data structures",
      unlocked: false
    },
    {
      id: "algorithm_guru",
      name: "Algorithm Guru",
      icon: "🏆",
      description: "Complete 20 different algorithms",
      unlocked: false
    }
  ];
  
  // Mock recent activity data
  const recentActivity = [
    { type: "completed", name: "Binary Search", reward: "+100 XP" },
    { type: "achievement", name: "Earned Search Master Badge", reward: "Achievement" },
    { type: "failed", name: "Failed Quick Sort Challenge", reward: "Try Again" },
    { type: "completed", name: "Completed Linked List Basics", reward: "+75 XP" }
  ];
  
  // Calculate progress statistics
  const totalAlgorithms = algorithms?.length || 0;
  const viewedCount = viewedAlgorithms.length;
  const completedCount = completedAlgorithms.length;
  
  const xpEarned = completedCount * 100 + viewedCount * 25;
  const xpForNextLevel = 2000;
  const xpPercentage = Math.min(100, Math.round((xpEarned / xpForNextLevel) * 100));
  
  const algorithmsMasteredPercentage = Math.round((completedCount / (totalAlgorithms || 1)) * 100);
  const challengesCompletedPercentage = 40; // Mock value
  
  const isLoading = loadingAlgorithms || loadingCategories;
  
  return (
    <section id="profile" className="py-16 bg-retro-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-2xl mb-4 text-retro-yellow">YOUR PROGRESS</h1>
          <p className="font-code">Track your algorithm mastery journey</p>
        </div>
        
        <div className="bg-retro-black p-6 border-2 border-retro-white shadow-pixel">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Player Stats */}
            <div className="w-full md:w-1/3">
              <div className="bg-retro-navy p-4 border-2 border-retro-white mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-retro-red border-2 border-retro-white mr-4 flex items-center justify-center">
                    <span className="text-2xl">👾</span>
                  </div>
                  <div>
                    <h3 className="text-lg text-retro-yellow">PLAYER STATS</h3>
                    <p className="font-code">Level 3 Coder</p>
                  </div>
                </div>
                
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-16 bg-retro-black" />
                    <Skeleton className="h-16 bg-retro-black" />
                    <Skeleton className="h-16 bg-retro-black" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between font-code mb-1">
                        <span>XP</span>
                        <span>{xpEarned}/{xpForNextLevel}</span>
                      </div>
                      <ProgressBar value={xpPercentage} color="bg-retro-teal" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between font-code mb-1">
                        <span>Algorithms Mastered</span>
                        <span>{completedCount}/{totalAlgorithms}</span>
                      </div>
                      <ProgressBar value={algorithmsMasteredPercentage} color="bg-retro-yellow" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between font-code mb-1">
                        <span>Challenges Completed</span>
                        <span>12/30</span>
                      </div>
                      <ProgressBar value={challengesCompletedPercentage} color="bg-retro-red" />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="bg-retro-navy p-4 border-2 border-retro-white">
                <h3 className="text-lg mb-4 text-retro-yellow">ACHIEVEMENTS</h3>
                <div className="grid grid-cols-3 gap-2">
                  {achievements.map((badge) => (
                    <div key={badge.id} className={`flex flex-col items-center ${badge.unlocked ? '' : 'opacity-50'}`}>
                      <div className={`w-12 h-12 ${badge.unlocked ? badge.id.includes('search') ? 'bg-retro-green' : 'bg-retro-yellow' : 'bg-retro-gray'} border-2 border-retro-white flex items-center justify-center mb-1`}>
                        <span>{badge.unlocked ? badge.icon : '❓'}</span>
                      </div>
                      <span className="font-code text-xs text-center">{badge.unlocked ? badge.name : 'Locked'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Progress Map */}
            <div className="w-full md:w-2/3">
              <div className="bg-retro-navy p-4 border-2 border-retro-white mb-6">
                <h3 className="text-lg mb-4 text-retro-yellow">LEARNING MAP</h3>
                {isLoading ? (
                  <Skeleton className="h-64 bg-retro-black" />
                ) : (
                  <div className="border-2 border-retro-white p-4 bg-retro-black h-64 flex items-center justify-center">
                    <p className="font-code text-retro-teal text-center">
                      [Algorithm learning path map displaying your progress through different categories]
                    </p>
                  </div>
                )}
              </div>
              
              <div className="bg-retro-navy p-4 border-2 border-retro-white">
                <h3 className="text-lg mb-4 text-retro-yellow">RECENT ACTIVITY</h3>
                <div className="space-y-3 font-code">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between border-b border-retro-gray pb-2">
                      <div className="flex items-center">
                        <span className={`w-6 h-6 ${
                          activity.type === 'completed' ? 'bg-retro-green' :
                          activity.type === 'achievement' ? 'bg-retro-yellow' :
                          'bg-retro-red'
                        } flex items-center justify-center mr-2`}>
                          {activity.type === 'completed' ? '✓' :
                           activity.type === 'achievement' ? '🏆' :
                           '!'}
                        </span>
                        <span>{activity.name}</span>
                      </div>
                      <span className={`
                        ${activity.type === 'completed' ? 'text-retro-teal' :
                          activity.type === 'achievement' ? 'text-retro-yellow' :
                          'text-retro-red'}
                      `}>
                        {activity.reward}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
