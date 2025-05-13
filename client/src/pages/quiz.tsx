import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PixelCard } from "@/components/ui/pixel-card";
import { PixelButton } from "@/components/ui/pixel-button";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

// Quiz questions data
const quizQuestions: Question[] = [
  {
    id: 1,
    text: "What is the time complexity of Bubble Sort in the worst case?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(1)"],
    correctAnswer: 2,
    explanation: "Bubble Sort has a worst-case time complexity of O(n²) because in the worst case, it needs to make n passes through an array of n elements, comparing adjacent elements.",
    category: "Sorting Algorithms",
    difficulty: "Easy"
  },
  {
    id: 2,
    text: "Which data structure uses LIFO (Last In, First Out) principle?",
    options: ["Queue", "Stack", "Linked List", "Tree"],
    correctAnswer: 1,
    explanation: "A Stack follows the Last In, First Out (LIFO) principle, where the last element added to the stack is the first one to be removed.",
    category: "Data Structures",
    difficulty: "Easy"
  },
  {
    id: 3,
    text: "What is the time complexity of Binary Search?",
    options: ["O(n)", "O(n log n)", "O(log n)", "O(n²)"],
    correctAnswer: 2,
    explanation: "Binary Search has a time complexity of O(log n) because it divides the search interval in half with each comparison.",
    category: "Search Algorithms",
    difficulty: "Easy"
  },
  {
    id: 4,
    text: "In a min-heap, which element is always at the root?",
    options: ["The largest element", "The smallest element", "A random element", "The median element"],
    correctAnswer: 1,
    explanation: "In a min-heap, the smallest element is always at the root. This is the defining property of a min-heap.",
    category: "Data Structures",
    difficulty: "Medium"
  },
  {
    id: 5,
    text: "Which algorithm is commonly used to find the shortest path in a weighted graph?",
    options: ["Depth-First Search", "Breadth-First Search", "Dijkstra's Algorithm", "Bubble Sort"],
    correctAnswer: 2,
    explanation: "Dijkstra's Algorithm is commonly used to find the shortest path in a weighted graph from a single source to all other vertices.",
    category: "Graph Algorithms",
    difficulty: "Medium"
  },
  {
    id: 6,
    text: "What is the purpose of memoization in dynamic programming?",
    options: ["To reduce memory usage", "To increase code readability", "To avoid recalculating results of subproblems", "To improve algorithm stability"],
    correctAnswer: 2,
    explanation: "Memoization is used in dynamic programming to store the results of expensive function calls and return the cached result when the same inputs occur again, avoiding redundant calculations.",
    category: "Dynamic Programming",
    difficulty: "Medium"
  },
  {
    id: 7,
    text: "Which of these sorting algorithms is stable?",
    options: ["Quick Sort", "Heap Sort", "Merge Sort", "Selection Sort"],
    correctAnswer: 2,
    explanation: "Merge Sort is a stable sorting algorithm, meaning that it preserves the relative order of equal elements in the sorted output as they appeared in the input.",
    category: "Sorting Algorithms",
    difficulty: "Medium"
  },
  {
    id: 8,
    text: "What is the average case time complexity of Quicksort?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
    correctAnswer: 1,
    explanation: "Quicksort has an average case time complexity of O(n log n), which makes it efficient for sorting large data sets.",
    category: "Sorting Algorithms",
    difficulty: "Medium"
  },
  {
    id: 9,
    text: "In a Red-Black tree, what color is the root node?",
    options: ["Always Red", "Always Black", "Either Red or Black", "No specific color constraint"],
    correctAnswer: 1,
    explanation: "In a Red-Black tree, the root node is always colored black. This is one of the properties that ensures the tree remains balanced.",
    category: "Data Structures",
    difficulty: "Hard"
  },
  {
    id: 10,
    text: "What is the space complexity of the Floyd-Warshall algorithm?",
    options: ["O(V)", "O(E)", "O(V + E)", "O(V²)"],
    correctAnswer: 3,
    explanation: "The Floyd-Warshall algorithm typically uses a distance matrix of size V×V, resulting in a space complexity of O(V²), where V is the number of vertices in the graph.",
    category: "Graph Algorithms",
    difficulty: "Hard"
  },
  {
    id: 11,
    text: "Which of these problems can be solved using dynamic programming?",
    options: ["Finding all prime numbers up to n", "Determining if a number is prime", "The knapsack problem", "Finding a cycle in a graph"],
    correctAnswer: 2,
    explanation: "The knapsack problem is a classic example of a problem that can be efficiently solved using dynamic programming, as it exhibits both optimal substructure and overlapping subproblems.",
    category: "Dynamic Programming",
    difficulty: "Hard"
  },
  {
    id: 12,
    text: "What is the time complexity of finding an element in a balanced binary search tree?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctAnswer: 1,
    explanation: "Finding an element in a balanced binary search tree has a time complexity of O(log n) because the height of a balanced binary search tree with n nodes is O(log n).",
    category: "Data Structures",
    difficulty: "Medium"
  }
];

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>(quizQuestions);
  const { toast } = useToast();
  
  useEffect(() => {
    document.title = "Algorithm Quiz - AlgoQuest";
  }, []);
  
  useEffect(() => {
    let questions = [...quizQuestions];
    
    if (categoryFilter) {
      questions = questions.filter(q => q.category === categoryFilter);
    }
    
    if (difficultyFilter) {
      questions = questions.filter(q => q.difficulty === difficultyFilter);
    }
    
    setFilteredQuestions(questions);
    resetQuiz(questions);
  }, [categoryFilter, difficultyFilter]);
  
  const resetQuiz = (questions = filteredQuestions) => {
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setScore(0);
    setShowAnswer(false);
    setQuizCompleted(false);
    
    // Shuffle the questions
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    setFilteredQuestions(shuffled.slice(0, 10)); // Take first 10 questions
  };
  
  const handleSelectAnswer = (index: number) => {
    if (showAnswer) return; // Prevent changing answer after submitting
    
    setSelectedAnswerIndex(index);
  };
  
  const handleSubmitAnswer = () => {
    if (selectedAnswerIndex === null) {
      toast({
        title: "Select an answer",
        description: "You need to select an answer before submitting",
        variant: "destructive"
      });
      return;
    }
    
    setShowAnswer(true);
    
    if (selectedAnswerIndex === filteredQuestions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
      toast({
        title: "Correct!",
        description: "You got it right! +1 point",
        className: "bg-retro-green border-retro-white text-white"
      });
    } else {
      toast({
        title: "Incorrect!",
        description: "That's not the right answer",
        className: "bg-retro-red border-retro-white text-white"
      });
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswerIndex(null);
      setShowAnswer(false);
    } else {
      setQuizCompleted(true);
    }
  };
  
  // Get all unique categories
  const uniqueCategories = new Set<string>();
  quizQuestions.forEach(q => uniqueCategories.add(q.category));
  const categories = Array.from(uniqueCategories);
  
  // Get all unique difficulties
  const uniqueDifficulties = new Set<string>();
  quizQuestions.forEach(q => uniqueDifficulties.add(q.difficulty));
  const difficulties = Array.from(uniqueDifficulties);
  
  // Calculate grade
  const getGrade = () => {
    const percentage = (score / filteredQuestions.length) * 100;
    if (percentage >= 90) return { grade: "A+", text: "Algorithm Master", color: "text-retro-green" };
    if (percentage >= 80) return { grade: "A", text: "Algorithm Expert", color: "text-retro-green" };
    if (percentage >= 70) return { grade: "B", text: "Algorithm Pro", color: "text-retro-yellow" };
    if (percentage >= 60) return { grade: "C", text: "Algorithm Apprentice", color: "text-retro-yellow" };
    if (percentage >= 50) return { grade: "D", text: "Algorithm Novice", color: "text-retro-orange" };
    return { grade: "F", text: "Keep Practicing", color: "text-retro-red" };
  };
  
  return (
    <div className="py-16 bg-retro-black min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl md:text-4xl mb-4 text-retro-purple"
          >
            ALGORITHM QUIZ CHALLENGE
          </motion.h1>
          <p className="font-code text-xl">Test your knowledge of algorithms and data structures</p>
        </div>
        
        {/* Filter controls */}
        {!quizCompleted && (
          <div className="mb-8 bg-retro-navy p-6 border-2 border-retro-white shadow-pixel">
            <h2 className="text-xl mb-4 text-retro-cyan">CUSTOMIZE YOUR QUIZ</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm mb-2 text-retro-yellow font-code">CATEGORY</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    className={`pixel-button ${categoryFilter === null ? 'bg-retro-purple' : 'bg-retro-navy'} border-2 border-retro-white shadow-pixel-sm text-xs px-2 py-1`}
                    onClick={() => setCategoryFilter(null)}
                  >
                    All
                  </button>
                  {categories.map(category => (
                    <button
                      key={category}
                      className={`pixel-button ${categoryFilter === category ? 'bg-retro-purple' : 'bg-retro-navy'} border-2 border-retro-white shadow-pixel-sm text-xs px-2 py-1`}
                      onClick={() => setCategoryFilter(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm mb-2 text-retro-yellow font-code">DIFFICULTY</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    className={`pixel-button ${difficultyFilter === null ? 'bg-retro-purple' : 'bg-retro-navy'} border-2 border-retro-white shadow-pixel-sm text-xs px-2 py-1`}
                    onClick={() => setDifficultyFilter(null)}
                  >
                    All
                  </button>
                  {difficulties.map(difficulty => (
                    <button
                      key={difficulty}
                      className={`pixel-button ${difficultyFilter === difficulty ? (
                        difficulty === 'Easy' ? 'bg-retro-green' :
                        difficulty === 'Medium' ? 'bg-retro-yellow' :
                        'bg-retro-red'
                      ) : 'bg-retro-navy'} border-2 border-retro-white shadow-pixel-sm text-xs px-2 py-1`}
                      onClick={() => setDifficultyFilter(difficulty)}
                    >
                      {difficulty}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-right">
              <PixelButton
                className="bg-retro-green"
                onClick={() => resetQuiz()}
              >
                RESET QUIZ
              </PixelButton>
            </div>
          </div>
        )}
        
        {/* Results screen */}
        {quizCompleted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-retro-navy p-8 border-4 border-retro-purple shadow-pixel text-center"
          >
            <h2 className="text-2xl mb-6 text-retro-cyan">QUIZ COMPLETED!</h2>
            
            <div className="mb-6">
              <div className="text-6xl font-pixel mb-4">
                <span className={getGrade().color}>{getGrade().grade}</span>
              </div>
              <p className="text-2xl font-code mb-2">{getGrade().text}</p>
              <p className="text-xl font-code">Your score: <span className="text-retro-yellow">{score}/{filteredQuestions.length}</span></p>
            </div>
            
            <div className="w-full h-8 bg-retro-black border-2 border-retro-white mb-8 relative">
              <div 
                className="h-full bg-retro-cyan" 
                style={{ width: `${(score / filteredQuestions.length) * 100}%` }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center font-code">
                {Math.round((score / filteredQuestions.length) * 100)}%
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-retro-black p-4 border-2 border-retro-white">
                <h3 className="text-retro-yellow mb-2 font-code">ACHIEVEMENTS</h3>
                <ul className="text-left font-code">
                  {score >= filteredQuestions.length * 0.7 && (
                    <li className="flex items-center">
                      <span className="text-retro-green mr-2">✓</span>
                      <span>Algorithmic Thinking</span>
                    </li>
                  )}
                  {score >= filteredQuestions.length * 0.9 && (
                    <li className="flex items-center">
                      <span className="text-retro-green mr-2">✓</span>
                      <span>Algorithm Mastery</span>
                    </li>
                  )}
                  {score <= filteredQuestions.length * 0.3 && (
                    <li className="flex items-center">
                      <span className="text-retro-red mr-2">!</span>
                      <span>More Practice Needed</span>
                    </li>
                  )}
                </ul>
              </div>
              <div className="bg-retro-black p-4 border-2 border-retro-white">
                <h3 className="text-retro-yellow mb-2 font-code">RECOMMENDATIONS</h3>
                <ul className="text-left font-code">
                  <li className="flex items-center">
                    <span className="text-retro-cyan mr-2">→</span>
                    <span>Review {score >= filteredQuestions.length * 0.8 ? 'advanced' : 'basic'} algorithms</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-retro-cyan mr-2">→</span>
                    <span>Try {categoryFilter || 'another'} quiz next</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <PixelButton
                className="bg-retro-green"
                onClick={() => resetQuiz()}
              >
                TRY AGAIN
              </PixelButton>
              <PixelButton
                className="bg-retro-cyan"
                href="/cheatsheets"
              >
                STUDY CHEATSHEETS
              </PixelButton>
            </div>
          </motion.div>
        ) : (
          <PixelCard className="bg-retro-navy p-6 border-2 border-retro-white shadow-pixel">
            {/* Quiz header */}
            <div className="flex justify-between items-center mb-6">
              <div className="bg-retro-black p-2 border-2 border-retro-white font-code">
                <span className="text-retro-cyan">QUESTION</span> <span className="text-retro-white">{currentQuestionIndex + 1}/{filteredQuestions.length}</span>
              </div>
              
              <div className="bg-retro-black p-2 border-2 border-retro-white font-code">
                <span className="text-retro-yellow">SCORE:</span> <span className="text-retro-white">{score}</span>
              </div>
              
              <div className="bg-retro-black p-2 border-2 border-retro-white font-code">
                <span className={
                  filteredQuestions[currentQuestionIndex]?.difficulty === 'Easy' ? 'text-retro-green' :
                  filteredQuestions[currentQuestionIndex]?.difficulty === 'Medium' ? 'text-retro-yellow' :
                  'text-retro-red'
                }>
                  {filteredQuestions[currentQuestionIndex]?.difficulty}
                </span>
              </div>
            </div>
            
            {/* Question */}
            <div className="mb-6">
              <h2 className="text-xl mb-4 text-retro-purple">{filteredQuestions[currentQuestionIndex]?.text}</h2>
              <p className="text-xs mb-2 font-code text-retro-teal">Category: {filteredQuestions[currentQuestionIndex]?.category}</p>
            </div>
            
            {/* Options */}
            <div className="space-y-4 mb-8">
              {filteredQuestions[currentQuestionIndex]?.options.map((option, index) => (
                <button
                  key={index}
                  className={`w-full text-left p-4 border-2 ${
                    selectedAnswerIndex === index 
                      ? 'border-retro-purple bg-retro-black'
                      : 'border-retro-white bg-retro-black'
                  } ${
                    showAnswer && index === filteredQuestions[currentQuestionIndex]?.correctAnswer
                      ? 'bg-retro-green !border-retro-green'
                      : showAnswer && index === selectedAnswerIndex
                        ? 'bg-retro-red !border-retro-red'
                        : ''
                  }`}
                  onClick={() => handleSelectAnswer(index)}
                  disabled={showAnswer}
                >
                  <div className="flex items-start">
                    <div className={`w-6 h-6 mr-3 flex-shrink-0 flex items-center justify-center ${
                      selectedAnswerIndex === index 
                        ? 'bg-retro-purple border-2 border-retro-white'
                        : 'bg-retro-navy border-2 border-retro-white'
                    } ${
                      showAnswer && index === filteredQuestions[currentQuestionIndex]?.correctAnswer
                        ? '!bg-retro-green !border-retro-white'
                        : showAnswer && index === selectedAnswerIndex
                          ? '!bg-retro-red !border-retro-white'
                          : ''
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="font-code">{option}</span>
                  </div>
                </button>
              ))}
            </div>
            
            {/* Answer explanation */}
            {showAnswer && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-retro-black p-4 border-2 border-retro-white mb-6"
              >
                <h3 className="text-retro-yellow mb-2 font-code">EXPLANATION</h3>
                <p className="font-code">{filteredQuestions[currentQuestionIndex]?.explanation}</p>
              </motion.div>
            )}
            
            {/* Action buttons */}
            <div className="flex justify-between">
              {!showAnswer ? (
                <PixelButton
                  className="bg-retro-cyan"
                  onClick={handleSubmitAnswer}
                >
                  SUBMIT ANSWER
                </PixelButton>
              ) : (
                <PixelButton
                  className="bg-retro-yellow"
                  onClick={handleNextQuestion}
                >
                  {currentQuestionIndex < filteredQuestions.length - 1 ? 'NEXT QUESTION' : 'SEE RESULTS'}
                </PixelButton>
              )}
            </div>
          </PixelCard>
        )}
        
        {/* Tips section */}
        <div className="mt-12">
          <div className="text-center mb-6">
            <h2 className="text-xl text-retro-cyan">QUIZ TIPS</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-retro-navy p-4 border-2 border-retro-white">
              <h3 className="text-retro-yellow mb-2 font-code">STRATEGY</h3>
              <ul className="space-y-2 font-code text-sm">
                <li>• Read each question carefully</li>
                <li>• Eliminate obviously wrong answers</li>
                <li>• Look for algorithm complexity clues</li>
                <li>• Review algorithm properties</li>
              </ul>
            </div>
            
            <div className="bg-retro-navy p-4 border-2 border-retro-white">
              <h3 className="text-retro-yellow mb-2 font-code">PREPARATION</h3>
              <ul className="space-y-2 font-code text-sm">
                <li>• Study algorithm cheatsheets</li>
                <li>• Practice implementing algorithms</li>
                <li>• Understand time complexity</li>
                <li>• Learn data structure fundamentals</li>
              </ul>
            </div>
            
            <div className="bg-retro-navy p-4 border-2 border-retro-white">
              <h3 className="text-retro-yellow mb-2 font-code">REWARDS</h3>
              <ul className="space-y-2 font-code text-sm">
                <li>• Earn badges for high scores</li>
                <li>• Gain XP to level up</li>
                <li>• Unlock advanced quizzes</li>
                <li>• Track your learning progress</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}