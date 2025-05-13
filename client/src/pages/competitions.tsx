import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PixelCard } from "@/components/ui/pixel-card";
import { PixelButton } from "@/components/ui/pixel-button";

// Mock data for competitions
const competitions = [
  {
    id: 1,
    title: "Algorithm Master Challenge",
    difficulty: "Hard",
    startDate: "June 15, 2025",
    endDate: "June 22, 2025",
    description: "Compete against the best algorithm solvers in this week-long challenge covering sorting, searching, and graph algorithms.",
    participants: 1289,
    prize: "5000 XP + Gold Trophy Badge",
    category: "All Categories",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
  },
  {
    id: 2,
    title: "Dynamic Programming Duel",
    difficulty: "Medium",
    startDate: "May 28, 2025",
    endDate: "May 30, 2025",
    description: "Test your DP skills in this weekend competition focused exclusively on dynamic programming challenges.",
    participants: 876,
    prize: "3000 XP + Silver Trophy Badge",
    category: "Dynamic Programming",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1589561253898-768105ca91a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
  },
  {
    id: 3,
    title: "Graph Theory Tournament",
    difficulty: "Hard",
    startDate: "May 5, 2025",
    endDate: "May 7, 2025",
    description: "Master complex graph algorithms and compete for the top spot in our specialized graph theory tournament.",
    participants: 652,
    prize: "4000 XP + Special Graph Master Badge",
    category: "Graph Algorithms",
    status: "active",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
  },
  {
    id: 4,
    title: "Sorting Speedrun",
    difficulty: "Easy",
    startDate: "April 20, 2025",
    endDate: "April 21, 2025",
    description: "How fast can you implement and optimize sorting algorithms? Join this rapid competition to find out!",
    participants: 2145,
    prize: "2000 XP + Speed Demon Badge",
    category: "Sorting Algorithms",
    status: "completed",
    image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
  },
  {
    id: 5,
    title: "Algorithmic Coding Cup",
    difficulty: "Medium",
    startDate: "March 15, 2025",
    endDate: "March 18, 2025",
    description: "A balanced mix of algorithm challenges from all categories. Perfect for well-rounded competitors!",
    participants: 1532,
    prize: "3500 XP + Gold Cup Badge",
    category: "All Categories",
    status: "completed",
    image: "https://images.unsplash.com/photo-1535350356005-fd52b3b524fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
  },
  {
    id: 6,
    title: "Data Structures Showdown",
    difficulty: "Medium",
    startDate: "February 10, 2025",
    endDate: "February 14, 2025",
    description: "Put your knowledge of advanced data structures to the test in this specialized competition.",
    participants: 945,
    prize: "3000 XP + Structure Specialist Badge",
    category: "Data Structures",
    status: "completed",
    image: "https://images.unsplash.com/photo-1502230831726-fe5549140034?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
  }
];

export default function Competitions() {
  const [filter, setFilter] = useState("all");
  const [selectedCompetition, setSelectedCompetition] = useState<null | typeof competitions[0]>(null);
  
  useEffect(() => {
    document.title = "Algorithm Competitions - AlgoQuest";
  }, []);
  
  const filteredCompetitions = filter === "all" 
    ? competitions 
    : competitions.filter(comp => comp.status === filter);
  
  return (
    <main className="py-16 bg-retro-black min-h-screen">
      <div className="container mx-auto px-4">
        {/* Hero section */}
        <section className="mb-16 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20" style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080")', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center' 
          }}></div>
          
          <div className="relative z-10 text-center p-8 border-4 border-retro-pink bg-retro-black bg-opacity-80">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl mb-4 text-retro-cyan">ALGORITHM COMPETITIONS</h1>
              <p className="font-code text-xl mb-8">Test your skills against other players and earn exclusive badges!</p>
              
              <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
                <div className="bg-retro-navy p-4 border-2 border-retro-purple">
                  <h3 className="text-retro-purple font-code text-lg">ACTIVE</h3>
                  <p className="text-4xl text-retro-white">1</p>
                </div>
                <div className="bg-retro-navy p-4 border-2 border-retro-cyan">
                  <h3 className="text-retro-cyan font-code text-lg">UPCOMING</h3>
                  <p className="text-4xl text-retro-white">2</p>
                </div>
                <div className="bg-retro-navy p-4 border-2 border-retro-yellow">
                  <h3 className="text-retro-yellow font-code text-lg">COMPLETED</h3>
                  <p className="text-4xl text-retro-white">3</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Filter buttons */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              className={`pixel-button ${filter === 'all' ? 'bg-retro-purple' : 'bg-retro-navy'} border-2 border-retro-white shadow-pixel px-4 py-2`}
              onClick={() => setFilter('all')}
            >
              ALL COMPETITIONS
            </button>
            <button 
              className={`pixel-button ${filter === 'active' ? 'bg-retro-purple' : 'bg-retro-navy'} border-2 border-retro-white shadow-pixel px-4 py-2`}
              onClick={() => setFilter('active')}
            >
              ACTIVE
            </button>
            <button 
              className={`pixel-button ${filter === 'upcoming' ? 'bg-retro-purple' : 'bg-retro-navy'} border-2 border-retro-white shadow-pixel px-4 py-2`}
              onClick={() => setFilter('upcoming')}
            >
              UPCOMING
            </button>
            <button 
              className={`pixel-button ${filter === 'completed' ? 'bg-retro-purple' : 'bg-retro-navy'} border-2 border-retro-white shadow-pixel px-4 py-2`}
              onClick={() => setFilter('completed')}
            >
              COMPLETED
            </button>
          </div>
        </section>
        
        {/* Competition Details Modal */}
        {selectedCompetition && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-retro-navy p-6 border-4 border-retro-cyan max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl text-retro-cyan">{selectedCompetition.title.toUpperCase()}</h2>
                <button 
                  onClick={() => setSelectedCompetition(null)}
                  className="text-retro-white hover:text-retro-red"
                >
                  [X]
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="bg-retro-black h-48 md:h-64 border-2 border-retro-white mb-4 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-60" style={{ 
                      backgroundImage: `url("${selectedCompetition.image}")`, 
                      backgroundSize: 'cover', 
                      backgroundPosition: 'center' 
                    }}></div>
                    <div className="absolute top-2 left-2 bg-retro-black px-2 py-1 border-2 border-retro-white text-xs font-code">
                      <span className={
                        selectedCompetition.difficulty === 'Easy' ? 'text-retro-green' :
                        selectedCompetition.difficulty === 'Medium' ? 'text-retro-yellow' :
                        'text-retro-red'
                      }>
                        {selectedCompetition.difficulty}
                      </span>
                    </div>
                  </div>
                  
                  <div className="font-code text-sm mb-4">
                    <p className="mb-2">{selectedCompetition.description}</p>
                  </div>
                  
                  <div className="bg-retro-black p-4 border-2 border-retro-white">
                    <h3 className="text-retro-cyan mb-2">PRIZE</h3>
                    <p className="text-retro-yellow font-code">{selectedCompetition.prize}</p>
                  </div>
                </div>
                
                <div>
                  <div className="bg-retro-black p-4 border-2 border-retro-white mb-4">
                    <h3 className="text-retro-cyan mb-2">DETAILS</h3>
                    <ul className="font-code space-y-2">
                      <li className="flex justify-between">
                        <span>Category:</span>
                        <span className="text-retro-purple">{selectedCompetition.category}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Start Date:</span>
                        <span>{selectedCompetition.startDate}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>End Date:</span>
                        <span>{selectedCompetition.endDate}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Participants:</span>
                        <span>{selectedCompetition.participants}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Status:</span>
                        <span className={
                          selectedCompetition.status === 'active' ? 'text-retro-green' :
                          selectedCompetition.status === 'upcoming' ? 'text-retro-cyan' :
                          'text-retro-yellow'
                        }>
                          {selectedCompetition.status.toUpperCase()}
                        </span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    {selectedCompetition.status === 'active' && (
                      <PixelButton className="w-full bg-retro-green">
                        JOIN COMPETITION
                      </PixelButton>
                    )}
                    
                    {selectedCompetition.status === 'upcoming' && (
                      <PixelButton className="w-full bg-retro-cyan">
                        REGISTER NOW
                      </PixelButton>
                    )}
                    
                    {selectedCompetition.status === 'completed' && (
                      <PixelButton className="w-full bg-retro-yellow">
                        VIEW RESULTS
                      </PixelButton>
                    )}
                    
                    <PixelButton className="w-full bg-retro-navy">
                      VIEW LEADERBOARD
                    </PixelButton>
                    
                    <PixelButton 
                      className="w-full bg-retro-red"
                      onClick={() => setSelectedCompetition(null)}
                    >
                      CLOSE
                    </PixelButton>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
        
        {/* Competitions grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCompetitions.map((competition) => (
              <motion.div 
                key={competition.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <PixelCard className="bg-retro-navy p-0 border-2 border-retro-white shadow-pixel overflow-hidden">
                  <div className="h-48 relative">
                    <div className="absolute inset-0" style={{ 
                      backgroundImage: `url("${competition.image}")`, 
                      backgroundSize: 'cover', 
                      backgroundPosition: 'center' 
                    }}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-retro-black to-transparent"></div>
                    
                    <div className="absolute top-2 left-2 bg-retro-black px-2 py-1 border-2 border-retro-white text-xs font-code">
                      <span className={
                        competition.difficulty === 'Easy' ? 'text-retro-green' :
                        competition.difficulty === 'Medium' ? 'text-retro-yellow' :
                        'text-retro-red'
                      }>
                        {competition.difficulty}
                      </span>
                    </div>
                    
                    <div className="absolute top-2 right-2 bg-retro-black px-2 py-1 border-2 border-retro-white text-xs font-code">
                      <span className={
                        competition.status === 'active' ? 'text-retro-green' :
                        competition.status === 'upcoming' ? 'text-retro-cyan' :
                        'text-retro-yellow'
                      }>
                        {competition.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-xl mb-2 text-retro-pink">{competition.title}</h3>
                    <p className="font-code text-sm mb-4">{competition.description.substring(0, 100)}...</p>
                    
                    <div className="flex justify-between items-center text-xs font-code mb-4">
                      <span>{competition.startDate}</span>
                      <span className="text-retro-purple">{competition.category}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div className="bg-retro-black px-2 py-1 text-xs font-code">
                        <span className="text-retro-cyan">{competition.participants} PLAYERS</span>
                      </div>
                      <PixelButton 
                        className="bg-retro-cyan"
                        onClick={() => setSelectedCompetition(competition)}
                      >
                        DETAILS
                      </PixelButton>
                    </div>
                  </div>
                </PixelCard>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Trophy Showcase */}
        <section className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl text-retro-yellow">YOUR TROPHY CABINET</h2>
            <p className="font-code">Compete to earn these exclusive badges and trophies</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`${i < 2 ? '' : 'opacity-40'} bg-retro-black p-4 border-2 ${i < 2 ? 'border-retro-yellow' : 'border-retro-gray'} text-center`}>
                <div className={`w-16 h-16 mx-auto mb-2 flex items-center justify-center ${
                  i === 0 ? 'bg-retro-yellow' : 
                  i === 1 ? 'bg-retro-cyan' : 
                  'bg-retro-gray'
                } border-2 border-white`}>
                  <span className="text-2xl">
                    {i === 0 ? '🏆' : 
                     i === 1 ? '🥇' : 
                     i === 2 ? '🥈' :
                     i === 3 ? '🥉' :
                     i === 4 ? '🎮' :
                     '🎯'}
                  </span>
                </div>
                <h3 className="text-xs font-code text-retro-white mb-1">
                  {i === 0 ? 'SORTING MASTER' : 
                   i === 1 ? 'DP CHAMPION' : 
                   i === 2 ? 'GRAPH GURU' :
                   i === 3 ? 'SEARCH EXPERT' :
                   i === 4 ? 'CODE WARRIOR' :
                   'ALGO LEGEND'}
                </h3>
                <p className="text-[10px] font-code text-retro-gray">
                  {i === 0 ? 'Earned May 2025' : 
                   i === 1 ? 'Earned March 2025' : 
                   'Locked'}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}