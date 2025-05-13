import { motion } from "framer-motion";
import { Link } from "wouter";
import { PixelCard } from "@/components/ui/pixel-card";
import { PixelButton } from "@/components/ui/pixel-button";
import { Category } from "@/types";

interface AlgorithmCategoriesProps {
  categories: Category[];
}

export default function AlgorithmCategories({ categories }: AlgorithmCategoriesProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Colors for different levels
  const levelColors = [
    "border-retro-green bg-retro-black",
    "border-retro-teal bg-retro-black",
    "border-retro-cyan bg-retro-black",
    "border-retro-yellow bg-retro-black",
    "border-retro-orange bg-retro-black",
    "border-retro-red bg-retro-black",
  ];

  // Get icon component based on category name
  const getCategoryIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "sorting algorithms":
        return "⏫";
      case "search algorithms":
        return "🔍";
      case "graph algorithms":
        return "🕸️";
      case "dynamic programming":
        return "🧩";
      case "data structures":
        return "🏗️";
      case "advanced algorithms":
        return "🔥";
      default:
        return "📊";
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {categories.map((category, index) => (
        <motion.div key={category.id} variants={itemVariants}>
          <Link href={`/categories/${category.id}`}>
            <PixelCard className={`cursor-pointer hover:translate-y-[-5px] transition-transform ${levelColors[index % levelColors.length]} hover:shadow-lg`}>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-3xl">{getCategoryIcon(category.name)}</div>
                  <div className="px-2 py-1 bg-retro-navy rounded-sm text-xs font-code text-retro-white">
                    LEVEL {category.level}
                  </div>
                </div>
                
                <h3 className="text-xl mb-3 text-retro-white font-pixel">{category.name}</h3>
                <p className="text-sm text-retro-white font-code mb-5">{category.description}</p>
                
                <div className="flex justify-between items-center">
                  <div className="text-xs font-code text-retro-white opacity-75">
                    {category.id === 1 ? "6 Algorithms" : 
                     category.id === 2 ? "5 Algorithms" : 
                     category.id === 3 ? "7 Algorithms" : 
                     category.id === 4 ? "6 Algorithms" : 
                     category.id === 5 ? "4 Algorithms" : 
                     "3 Algorithms"}
                  </div>
                  <PixelButton className="bg-retro-blue text-xs">EXPLORE</PixelButton>
                </div>
              </div>
            </PixelCard>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}