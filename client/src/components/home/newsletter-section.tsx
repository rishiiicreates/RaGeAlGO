import { useState } from "react";
import { motion } from "framer-motion";
import { PixelButton } from "@/components/ui/pixel-button";
import { useToast } from "@/hooks/use-toast";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }
    
    // Show success message (In a real app, this would connect to a backend)
    toast({
      title: "Successfully Subscribed!",
      description: "You'll receive algorithm updates and new features",
      className: "bg-retro-green border-retro-white text-white"
    });
    
    // Reset form
    setEmail("");
  };

  return (
    <section className="py-16 bg-retro-navy relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-4 bg-retro-black"></div>
      <div className="absolute bottom-0 left-0 w-full h-4 bg-retro-black"></div>
      
      {/* Diagonal pixel decorations */}
      <div className="absolute top-8 left-8 w-8 h-8 bg-retro-pink rotate-45 hidden md:block"></div>
      <div className="absolute bottom-12 right-12 w-8 h-8 bg-retro-cyan rotate-45 hidden md:block"></div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-2xl mb-4 text-retro-yellow font-pixel">JOIN THE ALGORITHM GUILD</h2>
          <p className="font-code mb-8 text-retro-white">
            Subscribe to receive the latest algorithm tutorials, challenges, and exclusive content
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 justify-center">
            <div className="flex-grow max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 bg-retro-black border-2 border-retro-white text-retro-white font-code shadow-pixel focus:border-retro-cyan focus:outline-none"
              />
            </div>
            <PixelButton 
              className="bg-retro-green"
              type="submit"
            >
              SUBSCRIBE
            </PixelButton>
          </form>
          
          <div className="mt-8 text-retro-white text-sm font-code">
            <p>No spam, unsubscribe at any time. Your email is safe with us.</p>
          </div>
          
          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-retro-black p-4 border-2 border-retro-white shadow-pixel">
              <div className="text-retro-cyan text-xl mb-2">🎮</div>
              <h3 className="text-retro-white mb-2 font-pixel">Weekly Challenges</h3>
              <p className="text-retro-white text-sm font-code">Test your skills with fun algorithm puzzles</p>
            </div>
            <div className="bg-retro-black p-4 border-2 border-retro-white shadow-pixel">
              <div className="text-retro-pink text-xl mb-2">📚</div>
              <h3 className="text-retro-white mb-2 font-pixel">New Algorithms</h3>
              <p className="text-retro-white text-sm font-code">Be the first to learn about new additions</p>
            </div>
            <div className="bg-retro-black p-4 border-2 border-retro-white shadow-pixel">
              <div className="text-retro-green text-xl mb-2">🏆</div>
              <h3 className="text-retro-white mb-2 font-pixel">Exclusive Content</h3>
              <p className="text-retro-white text-sm font-code">Access special cheatsheets and guides</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}