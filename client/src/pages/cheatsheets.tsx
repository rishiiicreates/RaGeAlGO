import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { PixelCard } from "@/components/ui/pixel-card";
import { useEffect } from "react";

export default function CheatSheets() {
  // Fetch algorithms
  const { data: algorithms, isLoading } = useQuery({
    queryKey: ['/api/algorithms'],
  });
  
  // Fetch categories
  const { data: categories, isLoading: loadingCategories } = useQuery({
    queryKey: ['/api/categories'],
  });
  
  // Update page title
  useEffect(() => {
    document.title = "Algorithm Cheat Sheets - AlgoQuest";
  }, []);
  
  // Group algorithms by category
  const algorithmsByCategory = algorithms?.reduce((acc, algorithm) => {
    if (!acc[algorithm.categoryId]) {
      acc[algorithm.categoryId] = [];
    }
    acc[algorithm.categoryId].push(algorithm);
    return acc;
  }, {} as Record<number, typeof algorithms>);
  
  // Get category name by id
  const getCategoryName = (id: number) => {
    return categories?.find(cat => cat.id === id)?.name || "Unknown Category";
  };
  
  return (
    <section id="cheatsheets" className="py-16 bg-retro-black relative">
      <div className="absolute inset-0 z-0 opacity-10" style={{ 
        backgroundImage: 'url("https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080")', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-2xl mb-4 text-retro-yellow">ALGORITHM CHEAT SHEETS</h1>
          <p className="font-code">Quick references to keep in your inventory</p>
        </div>
        
        {isLoading || loadingCategories ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-80 bg-retro-navy" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sorting Algorithms Cheat Sheet */}
            {algorithmsByCategory && Object.keys(algorithmsByCategory).map((categoryId) => {
              const categoryIdNum = parseInt(categoryId);
              const categoryAlgorithms = algorithmsByCategory[categoryIdNum];
              
              if (categoryIdNum === 1) {
                return (
                  <PixelCard key={categoryId} className="bg-retro-navy p-6 border-2 border-retro-white shadow-pixel">
                    <h3 className="text-xl mb-4 text-retro-teal">{getCategoryName(categoryIdNum)}</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse font-code">
                        <thead>
                          <tr className="bg-retro-black">
                            <th className="border-2 border-retro-white p-2 text-left">Algorithm</th>
                            <th className="border-2 border-retro-white p-2 text-left">Best</th>
                            <th className="border-2 border-retro-white p-2 text-left">Average</th>
                            <th className="border-2 border-retro-white p-2 text-left">Worst</th>
                            <th className="border-2 border-retro-white p-2 text-left">Space</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categoryAlgorithms.map(algorithm => (
                            <tr key={algorithm.id}>
                              <td className="border-2 border-retro-white p-2">{algorithm.name}</td>
                              <td className="border-2 border-retro-white p-2 text-retro-green">
                                {algorithm.name === "Bubble Sort" ? "O(n)" : 
                                 algorithm.name === "Quick Sort" ? "O(n log n)" :
                                 algorithm.name === "Merge Sort" ? "O(n log n)" :
                                 algorithm.name === "Heap Sort" ? "O(n log n)" : "O(?)"}
                              </td>
                              <td className="border-2 border-retro-white p-2 text-retro-yellow">
                                {algorithm.complexity?.time || "O(?)"}
                              </td>
                              <td className="border-2 border-retro-white p-2 text-retro-red">
                                {algorithm.name === "Bubble Sort" ? "O(n²)" : 
                                 algorithm.name === "Quick Sort" ? "O(n²)" :
                                 algorithm.name === "Merge Sort" ? "O(n log n)" :
                                 algorithm.name === "Heap Sort" ? "O(n log n)" : "O(?)"}
                              </td>
                              <td className="border-2 border-retro-white p-2 text-retro-green">
                                {algorithm.complexity?.space || "O(?)"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-6 text-right">
                      <a href={`/categories/${categoryId}`} className="pixel-button bg-retro-teal border-2 border-retro-white shadow-pixel inline-block px-4 py-2">DETAILS</a>
                    </div>
                  </PixelCard>
                );
              } else if (categoryIdNum === 2) {
                return (
                  <PixelCard key={categoryId} className="bg-retro-navy p-6 border-2 border-retro-white shadow-pixel">
                    <h3 className="text-xl mb-4 text-retro-teal">{getCategoryName(categoryIdNum)}</h3>
                    <div className="border-2 border-retro-white p-4 mb-4 bg-retro-black">
                      <p className="font-code text-center text-retro-teal">
                        [Search algorithms comparison flowchart]
                      </p>
                    </div>
                    <ul className="font-code space-y-3">
                      {categoryAlgorithms.map(algorithm => (
                        <li key={algorithm.id} className="flex items-start">
                          <span className={`inline-block w-4 h-4 mr-2 mt-1 ${
                            algorithm.difficulty === "Easy" ? "bg-retro-green" :
                            algorithm.difficulty === "Medium" ? "bg-retro-yellow" :
                            "bg-retro-red"
                          }`}></span>
                          <div>
                            <strong className="text-retro-yellow">{algorithm.name}:</strong> {algorithm.description.split('.')[0]}. {algorithm.complexity?.time} time complexity.
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 text-right">
                      <a href={`/categories/${categoryId}`} className="pixel-button bg-retro-teal border-2 border-retro-white shadow-pixel inline-block px-4 py-2">DETAILS</a>
                    </div>
                  </PixelCard>
                );
              } else {
                return (
                  <PixelCard key={categoryId} className="bg-retro-navy p-6 border-2 border-retro-white shadow-pixel">
                    <h3 className="text-xl mb-4 text-retro-teal">{getCategoryName(categoryIdNum)}</h3>
                    <div className="border-2 border-retro-white p-4 mb-4 bg-retro-black">
                      <p className="font-code text-center text-retro-teal">
                        [Visualization for {getCategoryName(categoryIdNum)}]
                      </p>
                    </div>
                    <ul className="font-code space-y-3">
                      {categoryAlgorithms.map(algorithm => (
                        <li key={algorithm.id} className="flex items-start">
                          <span className={`inline-block w-4 h-4 mr-2 mt-1 ${
                            algorithm.difficulty === "Easy" ? "bg-retro-green" :
                            algorithm.difficulty === "Medium" ? "bg-retro-yellow" :
                            "bg-retro-red"
                          }`}></span>
                          <div>
                            <strong className="text-retro-yellow">{algorithm.name}:</strong> {algorithm.description.split('.')[0]}.
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 text-right">
                      <a href={`/categories/${categoryId}`} className="pixel-button bg-retro-teal border-2 border-retro-white shadow-pixel inline-block px-4 py-2">DETAILS</a>
                    </div>
                  </PixelCard>
                );
              }
            })}
          </div>
        )}
      </div>
    </section>
  );
}
