import { motion } from "framer-motion";
import { PixelButton } from "@/components/ui/pixel-button";
import { Link } from "wouter";
import { Scanlines } from "@/components/ui/scanlines";

export default function HeroSection() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center py-16 bg-retro-black overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 z-0">
        <div className="grid-pattern"></div>
      </div>
      
      {/* Scan lines effect */}
      <Scanlines className="absolute inset-0 z-10 opacity-15" />
      
      <div className="container mx-auto px-4 relative z-20">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-pixel mb-6 text-retro-cyan relative inline-block">
              <span className="text-shadow-neon">ALGO</span>
              <span className="text-retro-pink text-shadow-neon">QUEST</span>
            </h1>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <p className="text-xl md:text-2xl mb-8 font-code text-retro-white">
              Explore the fascinating world of algorithms through 
              <span className="text-retro-yellow"> interactive visualizations</span> and 
              <span className="text-retro-green"> retro gaming</span> experiences
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
            <Link href="/categories/1">
              <PixelButton className="bg-retro-pink text-lg px-6 py-3">
                START LEARNING
              </PixelButton>
            </Link>
            <Link href="/visualizer">
              <PixelButton className="bg-retro-cyan text-lg px-6 py-3">
                TRY VISUALIZER
              </PixelButton>
            </Link>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="mt-12 flex flex-col md:flex-row justify-center items-center gap-8"
          >
            <div className="bg-retro-navy p-4 border-2 border-retro-pink rounded-lg shadow-pixel">
              <p className="text-retro-white font-code text-sm">
                <span className="text-retro-pink font-bold">30+</span> Algorithms
              </p>
            </div>
            <div className="bg-retro-navy p-4 border-2 border-retro-green rounded-lg shadow-pixel">
              <p className="text-retro-white font-code text-sm">
                <span className="text-retro-green font-bold">6</span> Categories
              </p>
            </div>
            <div className="bg-retro-navy p-4 border-2 border-retro-yellow rounded-lg shadow-pixel">
              <p className="text-retro-white font-code text-sm">
                <span className="text-retro-yellow font-bold">100+</span> Quiz Questions
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Pixel art decorations */}
      <motion.div 
        className="absolute bottom-10 left-10 w-16 h-16 hidden md:block"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div className="w-full h-full border-2 border-retro-teal bg-retro-navy shadow-pixel"></div>
      </motion.div>
      
      <motion.div 
        className="absolute top-10 right-10 w-16 h-16 hidden md:block"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <div className="w-full h-full border-2 border-retro-pink bg-retro-navy shadow-pixel"></div>
      </motion.div>
    </section>
  );
}