import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { PixelButton } from "@/components/ui/pixel-button";
import { PixelCard } from "@/components/ui/pixel-card";
import { useToast } from "@/hooks/use-toast";

type SortAlgorithm = "bubble" | "quick" | "merge" | "insertion" | "selection" | "heap";

interface SortingState {
  array: number[];
  comparingIndices: number[];
  swappingIndices: number[];
  sortedIndices: number[];
}

export default function Visualizer() {
  const [array, setArray] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState(30);
  const [sortSpeed, setSortSpeed] = useState(50); // Higher is faster
  const [algorithm, setAlgorithm] = useState<SortAlgorithm>("bubble");
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [stateHistory, setStateHistory] = useState<SortingState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [showCode, setShowCode] = useState(false);
  const { toast } = useToast();
  
  // Refs for animation control
  const sortingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pausedStateRef = useRef<boolean>(false);
  
  // Initialize array on component mount and when size changes
  useEffect(() => {
    resetArray();
  }, [arraySize]);
  
  // Update page title
  useEffect(() => {
    document.title = "Algorithm Visualizer - AlgoQuest";
  }, []);
  
  // Track paused state in ref for animation logic
  useEffect(() => {
    pausedStateRef.current = isPaused;
  }, [isPaused]);
  
  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (sortingTimeoutRef.current) {
        clearTimeout(sortingTimeoutRef.current);
      }
    };
  }, []);
  
  // Generate random array
  const resetArray = () => {
    if (isSorting) return;
    
    const newArray = [];
    const min = 5;
    const max = 100;
    
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    
    setArray(newArray);
    setStateHistory([{ 
      array: newArray, 
      comparingIndices: [], 
      swappingIndices: [], 
      sortedIndices: [] 
    }]);
    setHistoryIndex(0);
  };
  
  // Start sorting visualization
  const startSorting = async () => {
    if (isSorting || array.length === 0) return;
    
    setIsSorting(true);
    setIsPaused(false);
    const states: SortingState[] = [];
    
    // Generate all sorting states based on selected algorithm
    switch (algorithm) {
      case "bubble":
        await bubbleSort([...array], states);
        break;
      case "quick":
        await quickSort([...array], 0, array.length - 1, states);
        break;
      case "merge":
        await mergeSort([...array], 0, array.length - 1, states);
        break;
      case "insertion":
        await insertionSort([...array], states);
        break;
      case "selection":
        await selectionSort([...array], states);
        break;
      case "heap":
        await heapSort([...array], states);
        break;
    }
    
    // Add final state with all indices marked as sorted
    states.push({
      array: states[states.length - 1].array,
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices: Array.from({ length: array.length }, (_, i) => i)
    });
    
    setStateHistory(states);
    
    // Start visualization
    animateStates(states, 0);
  };
  
  // Animation function to step through states
  const animateStates = (states: SortingState[], index: number) => {
    if (index >= states.length) {
      setIsSorting(false);
      toast({
        title: "Sorting Complete!",
        description: `${algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} sort finished in ${states.length} steps.`,
        className: "bg-retro-green border-retro-white text-white"
      });
      return;
    }
    
    setHistoryIndex(index);
    
    // Schedule next animation frame
    sortingTimeoutRef.current = setTimeout(() => {
      // Check if paused before proceeding
      if (!pausedStateRef.current) {
        animateStates(states, index + 1);
      } else {
        // Store current position for resuming later
        sortingTimeoutRef.current = null;
      }
    }, 1000 / sortSpeed);
  };
  
  // Toggle pause/resume of animation
  const togglePause = () => {
    if (!isSorting) return;
    
    const newPausedState = !isPaused;
    setIsPaused(newPausedState);
    
    // If resuming and we have a stored position, continue from there
    if (!newPausedState && !sortingTimeoutRef.current && historyIndex < stateHistory.length - 1) {
      animateStates(stateHistory, historyIndex + 1);
    }
  };
  
  // Stop sorting and reset
  const stopSorting = () => {
    if (sortingTimeoutRef.current) {
      clearTimeout(sortingTimeoutRef.current);
      sortingTimeoutRef.current = null;
    }
    
    setIsSorting(false);
    setIsPaused(false);
    resetArray();
  };
  
  // Bubble Sort implementation with state tracking
  const bubbleSort = async (arr: number[], states: SortingState[]) => {
    const n = arr.length;
    
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // Comparing j and j+1
        states.push({
          array: [...arr],
          comparingIndices: [j, j + 1],
          swappingIndices: [],
          sortedIndices: Array(i).fill(0).map((_, idx) => n - 1 - idx)
        });
        
        if (arr[j] > arr[j + 1]) {
          // Swapping j and j+1
          states.push({
            array: [...arr],
            comparingIndices: [],
            swappingIndices: [j, j + 1],
            sortedIndices: Array(i).fill(0).map((_, idx) => n - 1 - idx)
          });
          
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          
          // After swap
          states.push({
            array: [...arr],
            comparingIndices: [],
            swappingIndices: [],
            sortedIndices: Array(i).fill(0).map((_, idx) => n - 1 - idx)
          });
        }
      }
      
      // Mark the largest element as sorted
      states.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: Array(i + 1).fill(0).map((_, idx) => n - 1 - idx)
      });
    }
    
    return arr;
  };
  
  // Quick Sort implementation with state tracking
  const quickSort = async (arr: number[], low: number, high: number, states: SortingState[], sortedIndices: number[] = []) => {
    if (low < high) {
      const pi = await partition(arr, low, high, states, sortedIndices);
      
      // Mark pivot as sorted
      const newSortedIndices = [...sortedIndices, pi];
      states.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: newSortedIndices
      });
      
      await quickSort(arr, low, pi - 1, states, newSortedIndices);
      await quickSort(arr, pi + 1, high, states, newSortedIndices);
    }
    return arr;
  };
  
  const partition = async (arr: number[], low: number, high: number, states: SortingState[], sortedIndices: number[]) => {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j <= high - 1; j++) {
      // Compare current element with pivot
      states.push({
        array: [...arr],
        comparingIndices: [j, high],
        swappingIndices: [],
        sortedIndices
      });
      
      if (arr[j] < pivot) {
        i++;
        
        // Swap arr[i] and arr[j]
        states.push({
          array: [...arr],
          comparingIndices: [],
          swappingIndices: [i, j],
          sortedIndices
        });
        
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        
        states.push({
          array: [...arr],
          comparingIndices: [],
          swappingIndices: [],
          sortedIndices
        });
      }
    }
    
    // Swap arr[i+1] and arr[high] (pivot)
    states.push({
      array: [...arr],
      comparingIndices: [],
      swappingIndices: [i + 1, high],
      sortedIndices
    });
    
    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    
    states.push({
      array: [...arr],
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices
    });
    
    return i + 1;
  };
  
  // Merge Sort implementation with state tracking
  const mergeSort = async (arr: number[], start: number, end: number, states: SortingState[], sortedIndices: number[] = []) => {
    if (start >= end) {
      return;
    }
    
    const mid = Math.floor((start + end) / 2);
    
    // Visualize the division
    states.push({
      array: [...arr],
      comparingIndices: [start, end],
      swappingIndices: [],
      sortedIndices
    });
    
    await mergeSort(arr, start, mid, states, sortedIndices);
    await mergeSort(arr, mid + 1, end, states, sortedIndices);
    
    await merge(arr, start, mid, end, states, sortedIndices);
    
    // Mark the merged subarray as sorted
    const rangeSize = end - start + 1;
    const newSortedIndices: number[] = [];
    for (let i = 0; i < rangeSize; i++) {
      newSortedIndices.push(i + start);
    }
    states.push({
      array: [...arr],
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices: [...sortedIndices, ...newSortedIndices]
    });
  };
  
  const merge = async (arr: number[], start: number, mid: number, end: number, states: SortingState[], sortedIndices: number[]) => {
    const n1 = mid - start + 1;
    const n2 = end - mid;
    
    // Create temp arrays
    const L = arr.slice(start, mid + 1);
    const R = arr.slice(mid + 1, end + 1);
    
    let i = 0, j = 0, k = start;
    
    // Merge the temp arrays back into arr
    while (i < n1 && j < n2) {
      // Compare elements from both subarrays
      states.push({
        array: [...arr],
        comparingIndices: [start + i, mid + 1 + j],
        swappingIndices: [],
        sortedIndices
      });
      
      if (L[i] <= R[j]) {
        // Place L[i] at the correct position
        arr[k] = L[i];
        i++;
      } else {
        // Place R[j] at the correct position
        arr[k] = R[j];
        j++;
      }
      
      // Visualize the placement
      states.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [k],
        sortedIndices
      });
      
      k++;
    }
    
    // Copy remaining elements of L
    while (i < n1) {
      arr[k] = L[i];
      
      states.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [k],
        sortedIndices
      });
      
      i++;
      k++;
    }
    
    // Copy remaining elements of R
    while (j < n2) {
      arr[k] = R[j];
      
      states.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [k],
        sortedIndices
      });
      
      j++;
      k++;
    }
  };
  
  // Insertion Sort implementation with state tracking
  const insertionSort = async (arr: number[], states: SortingState[]) => {
    const n = arr.length;
    
    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;
      
      // Compare key with previous elements
      states.push({
        array: [...arr],
        comparingIndices: [i, j],
        swappingIndices: [],
        sortedIndices: Array(i).fill(0).map((_, idx) => idx)
      });
      
      while (j >= 0 && arr[j] > key) {
        // Move elements greater than key to one position ahead
        states.push({
          array: [...arr],
          comparingIndices: [],
          swappingIndices: [j, j + 1],
          sortedIndices: Array(i).fill(0).map((_, idx) => idx)
        });
        
        arr[j + 1] = arr[j];
        j = j - 1;
        
        states.push({
          array: [...arr],
          comparingIndices: j >= 0 ? [j, i] : [],
          swappingIndices: [],
          sortedIndices: Array(i).fill(0).map((_, idx) => idx)
        });
      }
      
      // Place key at its correct position
      arr[j + 1] = key;
      
      states.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: Array(i + 1).fill(0).map((_, idx) => idx)
      });
    }
    
    return arr;
  };
  
  // Selection Sort implementation with state tracking
  const selectionSort = async (arr: number[], states: SortingState[]) => {
    const n = arr.length;
    const sortedIndices: number[] = [];
    
    for (let i = 0; i < n; i++) {
      let minIdx = i;
      
      // Find the minimum element in the unsorted array
      for (let j = i + 1; j < n; j++) {
        // Comparing current element with minimum
        states.push({
          array: [...arr],
          comparingIndices: [minIdx, j],
          swappingIndices: [],
          sortedIndices: [...sortedIndices]
        });
        
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      
      // Swap the found minimum element with the first element
      if (minIdx !== i) {
        states.push({
          array: [...arr],
          comparingIndices: [],
          swappingIndices: [i, minIdx],
          sortedIndices: [...sortedIndices]
        });
        
        const temp = arr[minIdx];
        arr[minIdx] = arr[i];
        arr[i] = temp;
      }
      
      // Add current index to sorted indices
      sortedIndices.push(i);
      
      states.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: [...sortedIndices]
      });
    }
    
    return arr;
  };
  
  // Heap Sort implementation with state tracking
  const heapSort = async (arr: number[], states: SortingState[]) => {
    const n = arr.length;
    const sortedIndices: number[] = [];
    
    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i, states, sortedIndices);
    }
    
    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
      // Move current root to end
      states.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [0, i],
        sortedIndices: [...sortedIndices]
      });
      
      const temp = arr[0];
      arr[0] = arr[i];
      arr[i] = temp;
      
      // Add current index to sorted indices
      sortedIndices.push(i);
      
      states.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: [...sortedIndices]
      });
      
      // Call heapify on the reduced heap
      await heapify(arr, i, 0, states, sortedIndices);
    }
    
    // Add the last element to sorted indices
    sortedIndices.push(0);
    
    states.push({
      array: [...arr],
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices: [...sortedIndices]
    });
    
    return arr;
  };
  
  const heapify = async (arr: number[], n: number, i: number, states: SortingState[], sortedIndices: number[]) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    // Compare with left child
    if (left < n) {
      states.push({
        array: [...arr],
        comparingIndices: [largest, left],
        swappingIndices: [],
        sortedIndices: [...sortedIndices]
      });
      
      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }
    
    // Compare with right child
    if (right < n) {
      states.push({
        array: [...arr],
        comparingIndices: [largest, right],
        swappingIndices: [],
        sortedIndices: [...sortedIndices]
      });
      
      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }
    
    // If largest is not root
    if (largest !== i) {
      states.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [i, largest],
        sortedIndices: [...sortedIndices]
      });
      
      const temp = arr[i];
      arr[i] = arr[largest];
      arr[largest] = temp;
      
      states.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: [...sortedIndices]
      });
      
      // Recursively heapify the affected sub-tree
      await heapify(arr, n, largest, states, sortedIndices);
    }
  };
  
  // Get algorithm description
  const getAlgorithmDescription = () => {
    switch (algorithm) {
      case "bubble":
        return "Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they're in the wrong order. Time complexity: O(n²)";
      case "quick":
        return "Quick Sort selects a 'pivot' element and partitions the array around it, recursively sorting the sub-arrays. Average time complexity: O(n log n)";
      case "merge":
        return "Merge Sort divides the array into halves, sorts each half, then merges them. Stable sort with O(n log n) time complexity";
      case "insertion":
        return "Insertion Sort builds the sorted array one item at a time by shifting elements as necessary. Good for small datasets with O(n²) time complexity";
      case "selection":
        return "Selection Sort repeatedly finds the minimum element from the unsorted part and puts it at the beginning. Time complexity: O(n²)";
      case "heap":
        return "Heap Sort creates a max heap from the array and then extracts elements one by one. Time complexity: O(n log n)";
      default:
        return "";
    }
  };
  
  // Get algorithm code
  const getAlgorithmCode = () => {
    switch (algorithm) {
      case "bubble":
        return `function bubbleSort(arr) {
  let n = arr.length;
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  
  return arr;
}`;
      case "quick":
        return `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`;
      case "merge":
        return `function mergeSort(arr, left = 0, right = arr.length - 1) {
  if (left >= right) return;
  
  const mid = Math.floor((left + right) / 2);
  mergeSort(arr, left, mid);
  mergeSort(arr, mid + 1, right);
  merge(arr, left, mid, right);
  
  return arr;
}

function merge(arr, left, mid, right) {
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);
  
  let i = 0, j = 0, k = left;
  
  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i] <= rightArr[j]) {
      arr[k] = leftArr[i++];
    } else {
      arr[k] = rightArr[j++];
    }
    k++;
  }
  
  while (i < leftArr.length) arr[k++] = leftArr[i++];
  while (j < rightArr.length) arr[k++] = rightArr[j++];
}`;
      case "insertion":
        return `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    arr[j + 1] = key;
  }
  
  return arr;
}`;
      case "selection":
        return `function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  
  return arr;
}`;
      case "heap":
        return `function heapSort(arr) {
  const n = arr.length;
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  
  // Extract elements one by one
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`;
      default:
        return "";
    }
  };
  
  // Get time and space complexity
  const getComplexity = () => {
    switch (algorithm) {
      case "bubble":
        return { time: "O(n²)", space: "O(1)" };
      case "quick":
        return { time: "O(n log n)", space: "O(log n)" };
      case "merge":
        return { time: "O(n log n)", space: "O(n)" };
      case "insertion":
        return { time: "O(n²)", space: "O(1)" };
      case "selection":
        return { time: "O(n²)", space: "O(1)" };
      case "heap":
        return { time: "O(n log n)", space: "O(1)" };
      default:
        return { time: "", space: "" };
    }
  };
  
  // Get color for bar based on its state
  const getBarColor = (index: number) => {
    if (!stateHistory[historyIndex]) return "bg-retro-teal";
    
    const { comparingIndices, swappingIndices, sortedIndices } = stateHistory[historyIndex];
    
    if (sortedIndices.includes(index)) return "bg-retro-green";
    if (swappingIndices.includes(index)) return "bg-retro-red";
    if (comparingIndices.includes(index)) return "bg-retro-yellow";
    
    return "bg-retro-teal";
  };
  
  return (
    <div className="py-16 bg-retro-black min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl md:text-4xl mb-4 text-retro-pink"
          >
            SORTING ALGORITHM VISUALIZER
          </motion.h1>
          <p className="font-code text-xl">Watch sorting algorithms in action with step-by-step visualization</p>
        </div>
        
        {/* Algorithm selection and controls */}
        <PixelCard className="bg-retro-navy p-6 border-2 border-retro-white shadow-pixel mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-retro-yellow mb-2 font-code">SELECT ALGORITHM</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <PixelButton
                  className={`${algorithm === 'bubble' ? 'bg-retro-pink' : 'bg-retro-navy'} text-xs`}
                  onClick={() => setAlgorithm('bubble')}
                  disabled={isSorting}
                >
                  Bubble
                </PixelButton>
                <PixelButton
                  className={`${algorithm === 'quick' ? 'bg-retro-pink' : 'bg-retro-navy'} text-xs`}
                  onClick={() => setAlgorithm('quick')}
                  disabled={isSorting}
                >
                  Quick
                </PixelButton>
                <PixelButton
                  className={`${algorithm === 'merge' ? 'bg-retro-pink' : 'bg-retro-navy'} text-xs`}
                  onClick={() => setAlgorithm('merge')}
                  disabled={isSorting}
                >
                  Merge
                </PixelButton>
                <PixelButton
                  className={`${algorithm === 'insertion' ? 'bg-retro-pink' : 'bg-retro-navy'} text-xs`}
                  onClick={() => setAlgorithm('insertion')}
                  disabled={isSorting}
                >
                  Insertion
                </PixelButton>
                <PixelButton
                  className={`${algorithm === 'selection' ? 'bg-retro-pink' : 'bg-retro-navy'} text-xs`}
                  onClick={() => setAlgorithm('selection')}
                  disabled={isSorting}
                >
                  Selection
                </PixelButton>
                <PixelButton
                  className={`${algorithm === 'heap' ? 'bg-retro-pink' : 'bg-retro-navy'} text-xs`}
                  onClick={() => setAlgorithm('heap')}
                  disabled={isSorting}
                >
                  Heap
                </PixelButton>
              </div>
            </div>
            
            <div>
              <h3 className="text-retro-yellow mb-2 font-code">ARRAY SIZE</h3>
              <div className="flex items-center">
                <span className="font-code text-xs mr-2 w-5">5</span>
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={arraySize}
                  onChange={(e) => setArraySize(parseInt(e.target.value))}
                  disabled={isSorting}
                  className="w-full h-4 bg-retro-black rounded-lg cursor-pointer"
                />
                <span className="font-code text-xs ml-2 w-5">50</span>
              </div>
              
              <h3 className="text-retro-yellow mb-2 font-code mt-4">SPEED</h3>
              <div className="flex items-center">
                <span className="font-code text-xs mr-2 w-5">1x</span>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={sortSpeed}
                  onChange={(e) => setSortSpeed(parseInt(e.target.value))}
                  className="w-full h-4 bg-retro-black rounded-lg cursor-pointer"
                />
                <span className="font-code text-xs ml-2 w-5">100x</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-retro-yellow mb-2 font-code">CONTROLS</h3>
              <div className="grid grid-cols-2 gap-2">
                <PixelButton
                  className="bg-retro-cyan"
                  onClick={resetArray}
                  disabled={isSorting && !isPaused}
                >
                  New Array
                </PixelButton>
                <PixelButton
                  className="bg-retro-green"
                  onClick={startSorting}
                  disabled={isSorting}
                >
                  Start
                </PixelButton>
                <PixelButton
                  className={isPaused ? "bg-retro-yellow" : "bg-retro-orange"}
                  onClick={togglePause}
                  disabled={!isSorting}
                >
                  {isPaused ? "Resume" : "Pause"}
                </PixelButton>
                <PixelButton
                  className="bg-retro-red"
                  onClick={stopSorting}
                  disabled={!isSorting}
                >
                  Stop
                </PixelButton>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="font-code">{getAlgorithmDescription()}</p>
          </div>
          
          <div className="flex justify-end mt-2">
            <PixelButton 
              className="bg-retro-navy"
              onClick={() => setShowCode(!showCode)}
            >
              {showCode ? "Hide Code" : "Show Code"}
            </PixelButton>
          </div>
        </PixelCard>
        
        {/* Code section */}
        {showCode && (
          <PixelCard className="bg-retro-navy p-6 border-2 border-retro-white shadow-pixel mb-8">
            <h3 className="text-retro-yellow mb-4 font-code">ALGORITHM CODE</h3>
            <div className="bg-retro-black p-4 border-2 border-retro-white overflow-x-auto">
              <pre className="font-code text-retro-green text-sm whitespace-pre-wrap">
                {getAlgorithmCode()}
              </pre>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-retro-black p-4 border-2 border-retro-white">
                <h4 className="text-retro-teal font-code mb-2">TIME COMPLEXITY</h4>
                <p className="font-code">{getComplexity().time}</p>
              </div>
              <div className="bg-retro-black p-4 border-2 border-retro-white">
                <h4 className="text-retro-teal font-code mb-2">SPACE COMPLEXITY</h4>
                <p className="font-code">{getComplexity().space}</p>
              </div>
            </div>
          </PixelCard>
        )}
        
        {/* Visualization area */}
        <PixelCard className="bg-retro-navy p-6 border-2 border-retro-white shadow-pixel mb-8">
          <div className="bg-retro-black p-4 border-2 border-retro-white relative h-80">
            {/* Render array bars */}
            <div className="flex h-full items-end justify-center gap-1">
              {stateHistory[historyIndex]?.array.map((value, index) => (
                <div
                  key={index}
                  className={`${getBarColor(index)} w-4 transition-all`}
                  style={{ height: `${(value / 100) * 100}%` }}
                ></div>
              ))}
            </div>
            
            {/* Display step counter */}
            <div className="absolute top-2 right-2 bg-retro-black p-2 border-2 border-retro-white text-xs font-code">
              <span className="text-retro-cyan">STEP:</span> {historyIndex} / {stateHistory.length - 1}
            </div>
          </div>
          
          {/* Legend */}
          <div className="mt-4 flex flex-wrap justify-center gap-6">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-retro-teal mr-2"></div>
              <span className="font-code text-xs">Unsorted</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-retro-yellow mr-2"></div>
              <span className="font-code text-xs">Comparing</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-retro-red mr-2"></div>
              <span className="font-code text-xs">Swapping</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-retro-green mr-2"></div>
              <span className="font-code text-xs">Sorted</span>
            </div>
          </div>
        </PixelCard>
        
        {/* Information cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-retro-navy p-4 border-2 border-retro-white shadow-pixel">
            <h3 className="text-retro-yellow mb-2 font-code">BEST FOR</h3>
            <ul className="space-y-2 font-code text-sm">
              {algorithm === 'bubble' && (
                <>
                  <li>• Teaching/learning purposes</li>
                  <li>• Small datasets</li>
                  <li>• Nearly sorted arrays</li>
                  <li>• Simple implementation</li>
                </>
              )}
              {algorithm === 'quick' && (
                <>
                  <li>• General-purpose sorting</li>
                  <li>• Large datasets</li>
                  <li>• When space is limited</li>
                  <li>• When average performance matters</li>
                </>
              )}
              {algorithm === 'merge' && (
                <>
                  <li>• Stable sorting required</li>
                  <li>• Guaranteed O(n log n) performance</li>
                  <li>• External sorting</li>
                  <li>• Linked lists</li>
                </>
              )}
              {algorithm === 'insertion' && (
                <>
                  <li>• Small datasets</li>
                  <li>• Nearly sorted arrays</li>
                  <li>• Online sorting (sorting as items arrive)</li>
                  <li>• Simple implementation</li>
                </>
              )}
              {algorithm === 'selection' && (
                <>
                  <li>• Small datasets</li>
                  <li>• Minimizing write operations</li>
                  <li>• Simple implementation</li>
                  <li>• Memory constraints</li>
                </>
              )}
              {algorithm === 'heap' && (
                <>
                  <li>• Guaranteed O(n log n) performance</li>
                  <li>• Priority queue implementation</li>
                  <li>• When space is limited</li>
                  <li>• Finding k largest/smallest elements</li>
                </>
              )}
            </ul>
          </div>
          
          <div className="bg-retro-navy p-4 border-2 border-retro-white shadow-pixel">
            <h3 className="text-retro-yellow mb-2 font-code">PROS AND CONS</h3>
            <div className="space-y-2 font-code text-sm">
              <div>
                <span className="text-retro-green">Pros:</span>
                <ul className="ml-4">
                  {algorithm === 'bubble' && (
                    <>
                      <li>+ Simple to understand</li>
                      <li>+ Stable sort</li>
                      <li>+ In-place sorting</li>
                    </>
                  )}
                  {algorithm === 'quick' && (
                    <>
                      <li>+ Fast on average</li>
                      <li>+ In-place sorting</li>
                      <li>+ Cache-friendly</li>
                    </>
                  )}
                  {algorithm === 'merge' && (
                    <>
                      <li>+ Stable sort</li>
                      <li>+ Predictable performance</li>
                      <li>+ Parallelizable</li>
                    </>
                  )}
                  {algorithm === 'insertion' && (
                    <>
                      <li>+ Simple implementation</li>
                      <li>+ Stable sort</li>
                      <li>+ Adaptive (efficient for partially sorted)</li>
                    </>
                  )}
                  {algorithm === 'selection' && (
                    <>
                      <li>+ Simple implementation</li>
                      <li>+ Minimal memory writes</li>
                      <li>+ Predictable performance</li>
                    </>
                  )}
                  {algorithm === 'heap' && (
                    <>
                      <li>+ In-place sorting</li>
                      <li>+ No worst-case O(n²) scenario</li>
                      <li>+ Efficient for finding extremes</li>
                    </>
                  )}
                </ul>
              </div>
              <div>
                <span className="text-retro-red">Cons:</span>
                <ul className="ml-4">
                  {algorithm === 'bubble' && (
                    <>
                      <li>- Poor performance O(n²)</li>
                      <li>- Not suitable for large datasets</li>
                    </>
                  )}
                  {algorithm === 'quick' && (
                    <>
                      <li>- Worst case O(n²) performance</li>
                      <li>- Not stable</li>
                      <li>- Choosing a good pivot is crucial</li>
                    </>
                  )}
                  {algorithm === 'merge' && (
                    <>
                      <li>- Extra space required O(n)</li>
                      <li>- More complex implementation</li>
                    </>
                  )}
                  {algorithm === 'insertion' && (
                    <>
                      <li>- Poor performance O(n²) on large datasets</li>
                      <li>- Many element shifts required</li>
                    </>
                  )}
                  {algorithm === 'selection' && (
                    <>
                      <li>- Poor performance O(n²) on all inputs</li>
                      <li>- Not adaptive</li>
                      <li>- Not stable</li>
                    </>
                  )}
                  {algorithm === 'heap' && (
                    <>
                      <li>- Not stable</li>
                      <li>- Poor cache performance</li>
                      <li>- More complex than insertion/selection</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-retro-navy p-4 border-2 border-retro-white shadow-pixel">
            <h3 className="text-retro-yellow mb-2 font-code">FUN FACTS</h3>
            <ul className="space-y-2 font-code text-sm">
              {algorithm === 'bubble' && (
                <>
                  <li>• Also known as "sinking sort"</li>
                  <li>• One of the simplest sorting algorithms</li>
                  <li>• Used in computer graphics for polygon filling</li>
                  <li>• Early computers with limited memory used it</li>
                </>
              )}
              {algorithm === 'quick' && (
                <>
                  <li>• Invented by Tony Hoare in 1959</li>
                  <li>• Default sort in many programming languages</li>
                  <li>• Can be 2-3x faster than merge sort in practice</li>
                  <li>• Has many variants like dual-pivot quicksort</li>
                </>
              )}
              {algorithm === 'merge' && (
                <>
                  <li>• Invented by John von Neumann in 1945</li>
                  <li>• Used in external sorting for databases</li>
                  <li>• Powers the Linux sort command</li>
                  <li>• Used in Java's Arrays.sort() for objects</li>
                </>
              )}
              {algorithm === 'insertion' && (
                <>
                  <li>• Similar to how people sort playing cards</li>
                  <li>• Used in many hybrid sorting algorithms</li>
                  <li>• Often faster than bubble sort in practice</li>
                  <li>• Used to sort small arrays in quicksort implementations</li>
                </>
              )}
              {algorithm === 'selection' && (
                <>
                  <li>• Always makes exactly n swaps</li>
                  <li>• Performance is independent of input arrangement</li>
                  <li>• One of the simplest sorting algorithms</li>
                  <li>• Useful when memory writes are expensive</li>
                </>
              )}
              {algorithm === 'heap' && (
                <>
                  <li>• Invented by J. W. J. Williams in 1964</li>
                  <li>• Uses a binary heap data structure</li>
                  <li>• Part of the "in-place" sorting family</li>
                  <li>• Used in priority queue implementations</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}