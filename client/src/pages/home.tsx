import HeroSection from "@/components/home/hero-section";
import FeaturesSection from "@/components/home/features-section";
import AlgorithmCategories from "@/components/home/algorithm-categories";
import AlgorithmVisualizer from "@/components/algorithms/algorithm-visualizer";
import NewsletterSection from "@/components/home/newsletter-section";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";

export default function Home() {
  // Fetch categories for the "levels" section
  const { data: categories, isLoading: loadingCategories } = useQuery({
    queryKey: ['/api/categories'],
  });
  
  // Fetch a featured algorithm for the visualizer section
  const { data: algorithms, isLoading: loadingAlgorithms } = useQuery({
    queryKey: ['/api/algorithms'],
  });
  
  // Set page title
  useEffect(() => {
    document.title = "AlgoQuest - Retro Gaming Algorithm Academy";
  }, []);
  
  // Get a featured algorithm (first sorting algorithm)
  const featuredAlgorithm = algorithms?.find(algo => algo.categoryId === 1);

  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      
      {/* Algorithm Categories (Levels) Section */}
      <section id="levels" className="py-16 bg-retro-black relative">
        <div className="absolute inset-0 z-0 opacity-10" style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1563225409-127c18758bd5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080")', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl mb-4 text-retro-yellow">SELECT YOUR LEVEL</h2>
            <p className="font-code text-retro-white">Choose a category to begin your algorithm adventure</p>
          </div>
          
          {loadingCategories ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-80 bg-retro-navy border-2 border-retro-white" />
              ))}
            </div>
          ) : (
            <AlgorithmCategories categories={categories || []} />
          )}
        </div>
      </section>
      
      {/* Algorithm Visualization Section */}
      <section id="algorithms" className="py-16 bg-retro-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl mb-4 text-retro-yellow">ALGORITHM VISUALIZER</h2>
            <p className="font-code">Watch algorithms in action with step-by-step animations</p>
          </div>
          
          {loadingAlgorithms || !featuredAlgorithm ? (
            <div className="bg-retro-black p-6 border-2 border-retro-white shadow-pixel mb-8">
              <Skeleton className="h-96 bg-retro-navy" />
            </div>
          ) : (
            <AlgorithmVisualizer algorithm={featuredAlgorithm} />
          )}
        </div>
      </section>
      
      <NewsletterSection />
    </main>
  );
}
