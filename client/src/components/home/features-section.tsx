import { motion } from "framer-motion";
import { PixelButton } from "@/components/ui/pixel-button";
import { Link } from "wouter";

export default function FeaturesSection() {
  const features = [
    {
      title: "INTERACTIVE VISUALIZATIONS",
      description: "Watch algorithms come to life with step-by-step animations",
      icon: "🔍",
      color: "bg-retro-teal",
      link: "/visualizer"
    },
    {
      title: "ALGORITHM ENCYCLOPEDIA",
      description: "Comprehensive library of algorithms from basic to advanced",
      icon: "📚",
      color: "bg-retro-pink",
      link: "/categories/1"
    },
    {
      title: "KNOWLEDGE QUIZZES",
      description: "Test your understanding with interactive quizzes",
      icon: "❓",
      color: "bg-retro-purple",
      link: "/quiz"
    },
    {
      title: "CODING CHEATSHEETS",
      description: "Quick references for algorithm implementations",
      icon: "📝",
      color: "bg-retro-yellow",
      link: "/cheatsheets"
    },
    {
      title: "DIFFICULTY PROGRESSION",
      description: "Learn at your own pace from beginner to expert",
      icon: "📈",
      color: "bg-retro-green",
      link: "/advanced"
    },
    {
      title: "CODING COMPETITIONS",
      description: "Challenge yourself against others in coding battles",
      icon: "🏆",
      color: "bg-retro-red",
      link: "/competitions"
    }
  ];

  return (
    <section className="py-16 bg-retro-navy">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl mb-4 text-retro-cyan font-pixel">FEATURES</h2>
          <p className="font-code">Discover the power of algorithms with these awesome features</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border-2 border-retro-white bg-retro-black shadow-pixel p-6 flex flex-col h-full"
            >
              <div className={`${feature.color} w-12 h-12 rounded-full flex items-center justify-center text-xl mb-4 mx-auto shadow-pixel`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-pixel text-center mb-2 text-retro-white">{feature.title}</h3>
              <p className="text-center text-retro-white mb-4 font-code text-sm flex-grow">{feature.description}</p>
              <div className="mt-auto text-center">
                <Link href={feature.link}>
                  <PixelButton className="bg-retro-blue text-xs">
                    EXPLORE
                  </PixelButton>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/visualizer">
            <PixelButton className="bg-retro-cyan mx-2">
              TRY ALGORITHM VISUALIZER
            </PixelButton>
          </Link>
          <Link href="/quiz">
            <PixelButton className="bg-retro-green mx-2 mt-4 md:mt-0">
              TEST YOUR KNOWLEDGE
            </PixelButton>
          </Link>
        </div>
      </div>
    </section>
  );
}