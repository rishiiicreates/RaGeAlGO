import { Algorithm } from "@/types";

// This file contains mock algorithm data for development and testing
// In production, this data would come from the server API

export const mockAlgorithms: Algorithm[] = [
  {
    id: 1,
    name: "Bubble Sort",
    categoryId: 1,
    description: "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
    complexity: { time: "O(n²)", space: "O(1)" },
    code: `function bubbleSort(arr) {
  let n = arr.length;
  let swapped;
  
  do {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        // Swap elements
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
    n--;
  } while (swapped);
  
  return arr;
}`,
    difficulty: "Easy",
    isStable: true,
    steps: [
      "Compare adjacent elements",
      "Swap if they are in wrong order",
      "Repeat until no swaps are needed",
      "The largest element bubbles to the end"
    ]
  },
  {
    id: 2,
    name: "Quick Sort",
    categoryId: 1,
    description: "Quick Sort is a divide and conquer algorithm that picks an element as a pivot and partitions the array around the picked pivot.",
    complexity: { time: "O(n log n)", space: "O(log n)" },
    code: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    // Find the partition index
    const pi = partition(arr, low, high);
    
    // Sort the elements before and after partition
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  // Pick the rightmost element as pivot
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j <= high - 1; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
    difficulty: "Medium",
    isStable: false,
    steps: [
      "Choose a pivot element",
      "Partition array around pivot",
      "Recursively sort sub-arrays",
      "Combine the results"
    ]
  },
  {
    id: 3,
    name: "Linear Search",
    categoryId: 2,
    description: "Linear Search is the simplest search algorithm that checks each element of the list until it finds the target value or reaches the end.",
    complexity: { time: "O(n)", space: "O(1)" },
    code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Return the index of the found element
    }
  }
  return -1; // Element not found
}`,
    difficulty: "Easy",
    isStable: true,
    steps: [
      "Start from the leftmost element",
      "Check each element one by one",
      "Return index if element found",
      "Return -1 if element not found"
    ]
  },
  {
    id: 4,
    name: "Binary Search",
    categoryId: 2,
    description: "Binary Search is a divide and conquer algorithm that works on sorted arrays by repeatedly dividing the search interval in half.",
    complexity: { time: "O(log n)", space: "O(1)" },
    code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid; // Target found
    }
    
    if (arr[mid] < target) {
      left = mid + 1; // Search in the right half
    } else {
      right = mid - 1; // Search in the left half
    }
  }
  
  return -1; // Target not found
}`,
    difficulty: "Medium",
    isStable: true,
    steps: [
      "Find the middle element",
      "If target equals middle element, return index",
      "If target greater, search right half",
      "If target smaller, search left half",
      "Repeat until found or subarray empty"
    ]
  }
];
