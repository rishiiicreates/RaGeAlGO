import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Algorithm } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { PixelCard } from "@/components/ui/pixel-card";
import { PixelButton } from "@/components/ui/pixel-button";
import CodeBlock from "@/components/algorithms/code-block";
import { motion } from "framer-motion";

// Advanced algorithms data
const advancedAlgorithms = [
  {
    id: 101,
    name: "A* Pathfinding",
    description: "A* (pronounced 'A-star') is a graph traversal and path search algorithm that efficiently plots a traversable path between multiple nodes. It combines the benefits of Dijkstra's algorithm and Greedy Best-First-Search.",
    complexity: { time: "O(E log V)", space: "O(V)" },
    code: `function aStar(graph, start, goal) {
  // The set of nodes already evaluated
  const closedSet = new Set();
  
  // The set of currently discovered nodes that are not evaluated yet
  // Initially, only the start node is known
  const openSet = new Set([start]);
  
  // For each node, which node it can most efficiently be reached from
  // If a node can be reached from many nodes, cameFrom will eventually contain the
  // most efficient previous step
  const cameFrom = new Map();
  
  // For each node, the cost of getting from the start node to that node
  const gScore = new Map();
  gScore.set(start, 0);
  
  // For each node, the total cost of getting from the start node to the goal
  // by passing by that node. That value is partly known, partly heuristic
  const fScore = new Map();
  fScore.set(start, heuristic(start, goal));
  
  while (openSet.size > 0) {
    // Current is the node in openSet with the lowest fScore value
    const current = getLowestFScore(openSet, fScore);
    
    if (current === goal) {
      return reconstructPath(cameFrom, current);
    }
    
    openSet.delete(current);
    closedSet.add(current);
    
    for (const neighbor of graph.neighbors(current)) {
      if (closedSet.has(neighbor)) {
        continue; // Ignore the neighbor which is already evaluated
      }
      
      // The distance from start to a neighbor
      const tentativeGScore = gScore.get(current) + graph.distance(current, neighbor);
      
      if (!openSet.has(neighbor)) { // Discover a new node
        openSet.add(neighbor);
      } else if (tentativeGScore >= gScore.get(neighbor)) {
        continue; // This is not a better path
      }
      
      // This path is the best until now. Record it!
      cameFrom.set(neighbor, current);
      gScore.set(neighbor, tentativeGScore);
      fScore.set(neighbor, gScore.get(neighbor) + heuristic(neighbor, goal));
    }
  }
  
  return []; // No path found
}

function getLowestFScore(openSet, fScore) {
  let lowest = null;
  let lowestScore = Infinity;
  
  for (const node of openSet) {
    const score = fScore.get(node) || Infinity;
    if (score < lowestScore) {
      lowestScore = score;
      lowest = node;
    }
  }
  
  return lowest;
}

function heuristic(node, goal) {
  // This is the Manhattan distance heuristic
  return Math.abs(node.x - goal.x) + Math.abs(node.y - goal.y);
}

function reconstructPath(cameFrom, current) {
  const totalPath = [current];
  
  while (cameFrom.has(current)) {
    current = cameFrom.get(current);
    totalPath.unshift(current);
  }
  
  return totalPath;
}`,
    category: "Graph Algorithms",
    difficulty: "Hard",
    steps: [
      "Initialize open and closed sets",
      "Add starting node to open set",
      "Find the node in open set with lowest f-score",
      "If current node is target, reconstruct path",
      "Add current node to closed set",
      "Check all neighbors",
      "Calculate tentative g-score for each neighbor",
      "Update path and scores if better path found",
      "Repeat until target found or no path exists"
    ]
  },
  {
    id: 102,
    name: "Red-Black Tree",
    description: "A red-black tree is a self-balancing binary search tree where each node has an extra attribute - the color, which can be either red or black. The tree maintains balance during insertions and deletions to guarantee O(log n) operations.",
    complexity: { time: "O(log n)", space: "O(n)" },
    code: `class Node {
  constructor(value, color = 'RED') {
    this.value = value;
    this.color = color; // 'RED' or 'BLACK'
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

class RedBlackTree {
  constructor() {
    this.NIL = new Node(null, 'BLACK');
    this.root = this.NIL;
  }
  
  insert(value) {
    const newNode = new Node(value);
    newNode.left = this.NIL;
    newNode.right = this.NIL;
    
    let y = null;
    let x = this.root;
    
    // Find position for new node
    while (x !== this.NIL) {
      y = x;
      if (newNode.value < x.value) {
        x = x.left;
      } else {
        x = x.right;
      }
    }
    
    newNode.parent = y;
    
    // Insert new node
    if (y === null) {
      this.root = newNode; // Tree was empty
    } else if (newNode.value < y.value) {
      y.left = newNode;
    } else {
      y.right = newNode;
    }
    
    // Fix Red-Black properties
    this.fixInsert(newNode);
  }
  
  fixInsert(node) {
    let uncle;
    
    // If the parent is red, we have a violation
    while (node.parent && node.parent.color === 'RED') {
      // Parent is left child of grandparent
      if (node.parent === node.parent.parent.left) {
        uncle = node.parent.parent.right;
        
        // Case 1: Uncle is red
        if (uncle.color === 'RED') {
          node.parent.color = 'BLACK';
          uncle.color = 'BLACK';
          node.parent.parent.color = 'RED';
          node = node.parent.parent;
        } else {
          // Case 2: Node is right child
          if (node === node.parent.right) {
            node = node.parent;
            this.leftRotate(node);
          }
          
          // Case 3: Node is left child
          node.parent.color = 'BLACK';
          node.parent.parent.color = 'RED';
          this.rightRotate(node.parent.parent);
        }
      } else { // Parent is right child of grandparent
        uncle = node.parent.parent.left;
        
        // Case 1: Uncle is red
        if (uncle.color === 'RED') {
          node.parent.color = 'BLACK';
          uncle.color = 'BLACK';
          node.parent.parent.color = 'RED';
          node = node.parent.parent;
        } else {
          // Case 2: Node is left child
          if (node === node.parent.left) {
            node = node.parent;
            this.rightRotate(node);
          }
          
          // Case 3: Node is right child
          node.parent.color = 'BLACK';
          node.parent.parent.color = 'RED';
          this.leftRotate(node.parent.parent);
        }
      }
    }
    
    // Root is always black
    this.root.color = 'BLACK';
  }
  
  leftRotate(x) {
    const y = x.right;
    x.right = y.left;
    
    if (y.left !== this.NIL) {
      y.left.parent = x;
    }
    
    y.parent = x.parent;
    
    if (x.parent === null) {
      this.root = y;
    } else if (x === x.parent.left) {
      x.parent.left = y;
    } else {
      x.parent.right = y;
    }
    
    y.left = x;
    x.parent = y;
  }
  
  rightRotate(y) {
    const x = y.left;
    y.left = x.right;
    
    if (x.right !== this.NIL) {
      x.right.parent = y;
    }
    
    x.parent = y.parent;
    
    if (y.parent === null) {
      this.root = x;
    } else if (y === y.parent.left) {
      y.parent.left = x;
    } else {
      y.parent.right = x;
    }
    
    x.right = y;
    y.parent = x;
  }
}`,
    category: "Data Structures",
    difficulty: "Hard",
    steps: [
      "Create new red node",
      "Insert like a regular BST",
      "Fix violations of red-black properties",
      "Case 1: Uncle is red - Recolor",
      "Case 2: Uncle is black (triangle) - Rotate",
      "Case 3: Uncle is black (line) - Rotate and recolor",
      "Ensure root is black"
    ]
  },
  {
    id: 103,
    name: "Dijkstra's Algorithm",
    description: "Dijkstra's algorithm is a graph search algorithm that solves the single-source shortest path problem for a graph with non-negative edge weights, producing a shortest path tree.",
    complexity: { time: "O(V² + E) with array, O(E + V log V) with heap", space: "O(V)" },
    code: `function dijkstra(graph, start) {
  // Create a map for distances
  const distances = new Map();
  // Create a set for visited nodes
  const visited = new Set();
  // Create a map for previous nodes (to reconstruct paths)
  const previous = new Map();
  
  // Initialize distances with Infinity for all nodes except start
  for (const vertex of graph.getVertices()) {
    distances.set(vertex, Infinity);
  }
  distances.set(start, 0);
  
  // Process all vertices
  while (visited.size < graph.getVertices().length) {
    // Find vertex with minimum distance
    const current = getMinDistanceVertex(distances, visited);
    
    // If current is undefined, we've visited all reachable vertices
    if (current === undefined) break;
    
    // Mark current as visited
    visited.add(current);
    
    // Update distances to neighbors
    for (const neighbor of graph.getNeighbors(current)) {
      if (visited.has(neighbor)) continue;
      
      const edgeWeight = graph.getEdgeWeight(current, neighbor);
      const distance = distances.get(current) + edgeWeight;
      
      if (distance < distances.get(neighbor)) {
        distances.set(neighbor, distance);
        previous.set(neighbor, current);
      }
    }
  }
  
  return {
    distances,
    previous
  };
}

function getMinDistanceVertex(distances, visited) {
  let minDistance = Infinity;
  let minVertex;
  
  for (const [vertex, distance] of distances.entries()) {
    if (!visited.has(vertex) && distance < minDistance) {
      minDistance = distance;
      minVertex = vertex;
    }
  }
  
  return minVertex;
}

function getShortestPath(previous, to) {
  const path = [];
  let current = to;
  
  while (current !== undefined) {
    path.unshift(current);
    current = previous.get(current);
  }
  
  return path;
}`,
    category: "Graph Algorithms",
    difficulty: "Medium",
    steps: [
      "Initialize distances (infinite for all vertices except start)",
      "Create empty set for visited vertices",
      "While there are unvisited vertices:",
      "Select vertex with minimum distance",
      "Mark it as visited",
      "Update distances to all neighbors",
      "If new path is shorter, update distance",
      "Repeat until all vertices visited or unreachable"
    ]
  },
  {
    id: 104,
    name: "Fast Fourier Transform",
    description: "The Fast Fourier Transform (FFT) is an algorithm that computes the Discrete Fourier Transform (DFT) of a sequence, converting a signal from its time domain to its frequency domain representation.",
    complexity: { time: "O(n log n)", space: "O(n)" },
    code: `function fft(x) {
  const n = x.length;
  
  // Base case
  if (n === 1) {
    return x;
  }
  
  // Check if n is a power of 2
  if (n % 2 !== 0) {
    throw new Error('Input size must be a power of 2');
  }
  
  // Split even and odd elements
  const even = new Array(n/2);
  const odd = new Array(n/2);
  
  for (let i = 0; i < n/2; i++) {
    even[i] = x[2*i];
    odd[i] = x[2*i + 1];
  }
  
  // Recursively compute FFT
  const evenFFT = fft(even);
  const oddFFT = fft(odd);
  
  // Combine results
  const result = new Array(n);
  
  for (let k = 0; k < n/2; k++) {
    // Complex exponential part
    const angle = -2 * Math.PI * k / n;
    const twiddle = {
      real: Math.cos(angle),
      imag: Math.sin(angle)
    };
    
    // Complex multiplication with oddFFT[k]
    const oddTimesExp = {
      real: oddFFT[k].real * twiddle.real - oddFFT[k].imag * twiddle.imag,
      imag: oddFFT[k].real * twiddle.imag + oddFFT[k].imag * twiddle.real
    };
    
    // First half
    result[k] = {
      real: evenFFT[k].real + oddTimesExp.real,
      imag: evenFFT[k].imag + oddTimesExp.imag
    };
    
    // Second half
    result[k + n/2] = {
      real: evenFFT[k].real - oddTimesExp.real,
      imag: evenFFT[k].imag - oddTimesExp.imag
    };
  }
  
  return result;
}

// Helper function to prepare input data
function prepareComplexArray(realArray) {
  return realArray.map(x => ({ real: x, imag: 0 }));
}

// Example usage:
// const signal = [1, 2, 3, 4, 5, 6, 7, 8]; // Must be power of 2
// const complexSignal = prepareComplexArray(signal);
// const frequencyDomain = fft(complexSignal);`,
    category: "Advanced Algorithms",
    difficulty: "Hard",
    steps: [
      "Check if input length is power of 2",
      "Base case: return if length is 1",
      "Divide input into even and odd indexed elements",
      "Recursively compute FFT of even and odd parts",
      "Combine results using the butterfly operation",
      "Multiply odd part by twiddle factors",
      "Sum even and odd parts for first half",
      "Subtract for second half"
    ]
  }
];

export default function Advanced() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(advancedAlgorithms[0]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  // Update page title
  useEffect(() => {
    document.title = "Advanced Algorithms - AlgoQuest";
  }, []);
  
  // Handle next step button click
  const handleNextStep = () => {
    if (currentStepIndex < selectedAlgorithm.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      setCurrentStepIndex(0); // Loop back to start
    }
  };
  
  return (
    <div className="py-16 bg-retro-black min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl mb-4 text-retro-cyan">ADVANCED ALGORITHMS</h1>
          <p className="font-code text-xl">Master complex algorithms and level up your problem-solving skills</p>
        </div>
        
        {/* Algorithm selection tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {advancedAlgorithms.map(algo => (
            <button
              key={algo.id}
              className={`tab ${selectedAlgorithm.id === algo.id ? 'active' : ''} pixel-button ${
                selectedAlgorithm.id === algo.id ? 'bg-retro-cyan' : 'bg-retro-navy'
              } border-2 border-retro-white shadow-pixel px-3 py-2`}
              onClick={() => {
                setSelectedAlgorithm(algo);
                setCurrentStepIndex(0);
              }}
            >
              {algo.name}
            </button>
          ))}
        </div>
        
        {/* Algorithm visualization */}
        <div className="bg-retro-navy p-6 border-2 border-retro-white shadow-pixel mb-8">
          <div className="visualization-area bg-retro-black p-4 border-2 border-retro-white min-h-[300px] mb-6 relative overflow-hidden">
            <motion.div
              key={currentStepIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full flex flex-col items-center justify-center"
            >
              <h3 className="text-xl text-retro-cyan mb-6">
                STEP {currentStepIndex + 1}: {selectedAlgorithm.steps[currentStepIndex]}
              </h3>
              
              <div className="border-2 border-retro-cyan p-4 rounded-md mt-4">
                <p className="font-code text-retro-white">
                  {selectedAlgorithm.steps[currentStepIndex]}
                </p>
              </div>
            </motion.div>
          </div>
          
          <div className="flex flex-wrap md:flex-nowrap gap-6">
            <div className="w-full md:w-2/3">
              <h3 className="text-lg mb-4 text-retro-yellow">HOW {selectedAlgorithm.name.toUpperCase()} WORKS</h3>
              <p className="font-code mb-4">{selectedAlgorithm.description}</p>
              <div className="bg-retro-black p-4 border-2 border-retro-white">
                <CodeBlock code={selectedAlgorithm.code} language="javascript" />
              </div>
            </div>
            
            <div className="w-full md:w-1/3 bg-retro-black p-4 border-2 border-retro-white">
              <h3 className="text-lg mb-4 text-retro-cyan">STATS</h3>
              <ul className="font-code space-y-3">
                <li className="flex justify-between">
                  <span>Time Complexity:</span>
                  <span className={`text-retro-cyan`}>
                    {selectedAlgorithm.complexity.time}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Space Complexity:</span>
                  <span className={`text-retro-yellow`}>
                    {selectedAlgorithm.complexity.space}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Category:</span>
                  <span className="text-retro-purple">
                    {selectedAlgorithm.category}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Difficulty:</span>
                  <span className={`
                    ${selectedAlgorithm.difficulty === 'Easy' ? 'text-retro-green' : ''}
                    ${selectedAlgorithm.difficulty === 'Medium' ? 'text-retro-yellow' : ''}
                    ${selectedAlgorithm.difficulty === 'Hard' ? 'text-retro-red' : ''}
                  `}>
                    {selectedAlgorithm.difficulty}
                  </span>
                </li>
              </ul>
              
              <div className="mt-6">
                <PixelButton 
                  className="bg-retro-cyan w-full text-black" 
                  onClick={handleNextStep}
                >
                  {currentStepIndex === selectedAlgorithm.steps.length - 1 ? 'RESTART' : 'NEXT STEP'}
                </PixelButton>
              </div>
            </div>
          </div>
        </div>
        
        {/* Algorithm cards */}
        <div className="mt-12">
          <h2 className="text-2xl text-center mb-8 text-retro-purple">MORE ADVANCED ALGORITHMS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advancedAlgorithms.map(algo => (
              <PixelCard key={algo.id} className="bg-retro-navy p-6 border-2 border-retro-white shadow-pixel relative overflow-hidden">
                <div className="absolute top-0 left-0 bg-retro-pink px-3 py-1 text-xs">
                  {algo.category}
                </div>
                <div className="pt-6">
                  <h3 className="text-xl mb-4 text-retro-cyan">{algo.name.toUpperCase()}</h3>
                  <p className="font-code mb-4">{algo.description.substring(0, 100)}...</p>
                  <div className="bg-retro-black p-3 border-2 border-retro-white mb-4">
                    <ul className="font-code space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>Time:</span>
                        <span className="text-retro-cyan">
                          {algo.complexity.time}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Difficulty:</span>
                        <span className={`
                          ${algo.difficulty === 'Easy' ? 'text-retro-green' : ''}
                          ${algo.difficulty === 'Medium' ? 'text-retro-yellow' : ''}
                          ${algo.difficulty === 'Hard' ? 'text-retro-red' : ''}
                        `}>
                          {algo.difficulty}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="text-right">
                    <PixelButton 
                      className="bg-retro-blue border-2 border-retro-white shadow-pixel"
                      onClick={() => {
                        setSelectedAlgorithm(algo);
                        setCurrentStepIndex(0);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      EXPLORE
                    </PixelButton>
                  </div>
                </div>
              </PixelCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}