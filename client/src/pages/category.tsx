import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import AlgorithmCard from "@/components/algorithms/algorithm-card";
import { PixelButton } from "@/components/ui/pixel-button";
import { useEffect } from "react";

export default function Category() {
  const [, params] = useRoute("/categories/:id");
  const categoryId = parseInt(params?.id || "0");
  
  // Fetch category details
  const { data: category, isLoading: loadingCategory } = useQuery({
    queryKey: [`/api/categories/${categoryId}`],
  });
  
  // Fetch algorithms in this category
  const { data: algorithms, isLoading: loadingAlgorithms } = useQuery({
    queryKey: [`/api/categories/${categoryId}/algorithms`],
  });
  
  // Update page title
  useEffect(() => {
    if (category) {
      document.title = `${category.name} - AlgoQuest`;
    }
  }, [category]);
  
  const isLoading = loadingCategory || loadingAlgorithms;
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Skeleton className="h-16 w-3/4 mx-auto mb-8 bg-retro-navy" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-64 bg-retro-navy" />
          ))}
        </div>
      </div>
    );
  }
  
  if (!category) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl text-retro-red mb-4">CATEGORY NOT FOUND</h1>
        <p className="font-code mb-8">This category doesn't exist in our database.</p>
        <PixelButton href="/" className="bg-retro-teal">RETURN TO HOME</PixelButton>
      </div>
    );
  }
  
  return (
    <div className="py-16 bg-retro-black relative">
      <div className="absolute inset-0 z-0 opacity-10" style={{ 
        backgroundImage: 'url("https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080")', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block bg-retro-navy px-4 py-2 border-2 border-retro-white shadow-pixel mb-4">
            <span className="text-xl text-retro-yellow">LEVEL {category.level}</span>
          </div>
          <h1 className="text-3xl md:text-4xl mb-4 text-retro-yellow">{category.name.toUpperCase()}</h1>
          <p className="font-code text-xl max-w-3xl mx-auto">{category.description}</p>
        </div>
        
        {algorithms && algorithms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {algorithms.map(algorithm => (
              <AlgorithmCard key={algorithm.id} algorithm={algorithm} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="font-code text-xl mb-8">No algorithms available in this category yet.</p>
            <PixelButton href="/" className="bg-retro-teal">RETURN TO HOME</PixelButton>
          </div>
        )}
      </div>
    </div>
  );
}
