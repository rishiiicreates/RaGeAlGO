import { 
  users, 
  type User, 
  type InsertUser, 
  categories, 
  type Category, 
  type InsertCategory, 
  algorithms, 
  type Algorithm, 
  type InsertAlgorithm,
  progress,
  type Progress,
  type InsertProgress
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Category methods
  getAllCategories(): Promise<Category[]>;
  getCategoryById(id: number): Promise<Category | undefined>;
  
  // Algorithm methods
  getAllAlgorithms(): Promise<Algorithm[]>;
  getAlgorithmById(id: number): Promise<Algorithm | undefined>;
  getAlgorithmsByCategoryId(categoryId: number): Promise<Algorithm[]>;
  
  // Progress methods
  updateProgress(progressData: InsertProgress): Promise<Progress>;
  getUserProgress(userId: number): Promise<Progress[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private algorithms: Map<number, Algorithm>;
  private progressRecords: Map<number, Progress>;
  
  private currentUserId: number;
  private currentCategoryId: number;
  private currentAlgorithmId: number;
  private currentProgressId: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.algorithms = new Map();
    this.progressRecords = new Map();
    
    this.currentUserId = 1;
    this.currentCategoryId = 1;
    this.currentAlgorithmId = 1;
    this.currentProgressId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Create categories
    const sortingCategory: InsertCategory = {
      name: "Sorting Algorithms",
      description: "Master the art of ordering elements efficiently",
      level: 1,
      icon: "🔄",
    };
    
    const searchCategory: InsertCategory = {
      name: "Search Algorithms",
      description: "Find elements quickly in various data structures",
      level: 2,
      icon: "🔍",
    };
    
    const graphCategory: InsertCategory = {
      name: "Graph Algorithms",
      description: "Navigate complex relationships between nodes",
      level: 3,
      icon: "🕸️",
    };
    
    const dpCategory: InsertCategory = {
      name: "Dynamic Programming",
      description: "Solve complex problems by breaking them down",
      level: 4,
      icon: "📊",
    };
    
    const dataStructuresCategory: InsertCategory = {
      name: "Data Structures",
      description: "Master essential structures for efficient algorithms",
      level: 5,
      icon: "🧮",
    };
    
    const advancedCategory: InsertCategory = {
      name: "Advanced Algorithms",
      description: "Conquer the most challenging coding problems",
      level: 6,
      icon: "⚡",
    };
    
    // Insert categories
    const cat1 = this.createCategory(sortingCategory);
    const cat2 = this.createCategory(searchCategory);
    const cat3 = this.createCategory(graphCategory);
    const cat4 = this.createCategory(dpCategory);
    const cat5 = this.createCategory(dataStructuresCategory);
    const cat6 = this.createCategory(advancedCategory);
    
    // Create algorithms
    // Sorting algorithms
    this.createAlgorithm({
      name: "Bubble Sort",
      categoryId: cat1.id,
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
    });
    
    this.createAlgorithm({
      name: "Quick Sort",
      categoryId: cat1.id,
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
    });
    
    // Search algorithms
    this.createAlgorithm({
      name: "Linear Search",
      categoryId: cat2.id,
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
    });
    
    this.createAlgorithm({
      name: "Binary Search",
      categoryId: cat2.id,
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
    });
    
    // Graph algorithms
    this.createAlgorithm({
      name: "Breadth-First Search",
      categoryId: cat3.id,
      description: "Breadth-First Search (BFS) is an algorithm for traversing or searching tree or graph data structures that explores all neighbor nodes at the present depth before moving to nodes at the next depth level.",
      complexity: { time: "O(V + E)", space: "O(V)" },
      code: `function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  visited.add(start);
  
  while (queue.length > 0) {
    const vertex = queue.shift();
    console.log(vertex); // Process the current vertex
    
    for (const neighbor of graph[vertex]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}`,
      difficulty: "Medium",
      isStable: true,
      steps: [
        "Start at the root node",
        "Explore all neighbors at current depth",
        "Move to next level",
        "Use a queue to track vertices to visit"
      ]
    });
    
    // Add Depth-First Search
    this.createAlgorithm({
      name: "Depth-First Search",
      categoryId: cat3.id,
      description: "Depth-First Search (DFS) is an algorithm for traversing or searching tree or graph data structures that explores as far as possible along each branch before backtracking.",
      complexity: { time: "O(V + E)", space: "O(V)" },
      code: `function dfs(graph, start, visited = new Set()) {
  visited.add(start);
  console.log(start); // Process the current vertex
  
  for (const neighbor of graph[start]) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited);
    }
  }
}`,
      difficulty: "Medium",
      isStable: true,
      steps: [
        "Start at the root node",
        "Explore current node's first neighbor completely",
        "Backtrack when no unvisited neighbors remain",
        "Use recursion or a stack to track vertices"
      ]
    });
    
    // Add Dijkstra's Algorithm
    this.createAlgorithm({
      name: "Dijkstra's Algorithm",
      categoryId: cat3.id,
      description: "Dijkstra's algorithm is a graph search algorithm that solves the single-source shortest path problem for a graph with non-negative edge weights, producing a shortest path tree.",
      complexity: { time: "O(E log V)", space: "O(V)" },
      code: `function dijkstra(graph, start) {
  const distances = new Map();
  const visited = new Set();
  const previous = new Map();
  
  // Initialize distances with Infinity for all nodes except start
  for (const vertex of graph.getVertices()) {
    distances.set(vertex, Infinity);
  }
  distances.set(start, 0);
  
  while (visited.size < graph.getVertices().length) {
    const current = getMinDistanceVertex(distances, visited);
    
    if (current === undefined) break;
    
    visited.add(current);
    
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
  
  return { distances, previous };
}`,
      difficulty: "Hard",
      isStable: true,
      steps: [
        "Initialize distances (infinite for all vertices except start)",
        "Select vertex with minimum distance",
        "Mark it as visited",
        "Update distances to all neighbors",
        "Repeat until all vertices visited"
      ]
    });
    
    // Dynamic Programming algorithms
    
    // Fibonacci with memoization
    this.createAlgorithm({
      name: "Fibonacci (DP)",
      categoryId: cat4.id,
      description: "A dynamic programming approach to calculate Fibonacci numbers efficiently by storing previously computed values to avoid redundant calculations.",
      complexity: { time: "O(n)", space: "O(n)" },
      code: `function fibonacci(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}`,
      difficulty: "Easy",
      isStable: true,
      steps: [
        "Check if value is in memo",
        "Return base case for n ≤ 1",
        "Calculate fib(n) using memoized results",
        "Store result in memo",
        "Return computed value"
      ]
    });
    
    // Knapsack problem
    this.createAlgorithm({
      name: "0/1 Knapsack",
      categoryId: cat4.id,
      description: "The knapsack problem is a problem in combinatorial optimization where given items with weights and values, we need to determine the items to include in a collection so that the total weight is less than or equal to a given limit and the total value is maximized.",
      complexity: { time: "O(n×W)", space: "O(n×W)" },
      code: `function knapsack(values, weights, capacity) {
  const n = values.length;
  const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));
  
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (weights[i-1] <= w) {
        dp[i][w] = Math.max(
          values[i-1] + dp[i-1][w - weights[i-1]], 
          dp[i-1][w]
        );
      } else {
        dp[i][w] = dp[i-1][w];
      }
    }
  }
  
  return dp[n][capacity];
}`,
      difficulty: "Medium",
      isStable: true,
      steps: [
        "Create a 2D array dp[n+1][capacity+1]",
        "Initialize first row and column to 0",
        "For each item and each possible weight:",
        "If item can fit, choose maximum of:",
        "- Value of current item + value of remaining capacity",
        "- Value without current item",
        "If item cannot fit, use value without current item",
        "Return dp[n][capacity]"
      ]
    });
    
    // Longest Common Subsequence
    this.createAlgorithm({
      name: "Longest Common Subsequence",
      categoryId: cat4.id,
      description: "The Longest Common Subsequence (LCS) is a classic dynamic programming problem that finds the longest subsequence common to two sequences.",
      complexity: { time: "O(m×n)", space: "O(m×n)" },
      code: `function longestCommonSubsequence(text1, text2) {
  const m = text1.length;
  const n = text2.length;
  const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i-1] === text2[j-1]) {
        dp[i][j] = dp[i-1][j-1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
      }
    }
  }
  
  return dp[m][n];
}`,
      difficulty: "Medium",
      isStable: true,
      steps: [
        "Create a 2D array dp[m+1][n+1]",
        "Initialize first row and column to 0",
        "For each character in both strings:",
        "If characters match, add 1 to diagonal value",
        "If characters don't match, take max of left and top",
        "Return dp[m][n] for length of LCS"
      ]
    });
    
    // Advanced Data Structures
    
    // Trie implementation
    this.createAlgorithm({
      name: "Trie (Prefix Tree)",
      categoryId: cat5.id,
      description: "A trie, also called a prefix tree, is a tree-like data structure used to efficiently store and retrieve keys in a dataset of strings. It is especially useful for implementing autocomplete and spell-checking features.",
      complexity: { time: "O(m) for operations", space: "O(n*m)" },
      code: `class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  
  insert(word) {
    let current = this.root;
    
    for (const char of word) {
      if (!current.children[char]) {
        current.children[char] = new TrieNode();
      }
      current = current.children[char];
    }
    
    current.isEndOfWord = true;
  }
  
  search(word) {
    let current = this.root;
    
    for (const char of word) {
      if (!current.children[char]) {
        return false;
      }
      current = current.children[char];
    }
    
    return current.isEndOfWord;
  }
  
  startsWith(prefix) {
    let current = this.root;
    
    for (const char of prefix) {
      if (!current.children[char]) {
        return false;
      }
      current = current.children[char];
    }
    
    return true;
  }
}`,
      difficulty: "Medium",
      isStable: true,
      steps: [
        "Create TrieNode with children map and isEndOfWord flag",
        "Insert: Iterate through word characters",
        "Create new nodes for missing characters",
        "Mark last node as end of word",
        "Search: Navigate through trie using characters",
        "Return true if found and is end of word",
        "StartsWith: Similar to search but doesn't check isEndOfWord"
      ]
    });
    
    // Union-Find (Disjoint Set)
    this.createAlgorithm({
      name: "Union-Find",
      categoryId: cat5.id,
      description: "Union-Find (Disjoint Set) is a data structure that keeps track of elements partitioned into non-overlapping subsets. It has near-constant-time operations for adding new sets, merging sets, and determining whether elements are in the same set.",
      complexity: { time: "O(α(n)) (nearly constant)", space: "O(n)" },
      code: `class UnionFind {
  constructor(size) {
    this.parent = Array(size).fill().map((_, i) => i);
    this.rank = Array(size).fill(0);
  }
  
  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // Path compression
    }
    return this.parent[x];
  }
  
  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);
    
    if (rootX === rootY) return;
    
    // Union by rank
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }
  }
  
  connected(x, y) {
    return this.find(x) === this.find(y);
  }
}`,
      difficulty: "Medium",
      isStable: true,
      steps: [
        "Initialize with each element in its own set",
        "Find: Determine which set an element belongs to",
        "Use path compression to flatten trees",
        "Union: Merge two sets",
        "Use union by rank to keep trees balanced",
        "Connected: Check if two elements are in same set"
      ]
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(userData: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...userData, 
      id, 
      progress: {},
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }
  
  private createCategory(categoryData: InsertCategory): Category {
    const id = this.currentCategoryId++;
    const category: Category = { ...categoryData, id };
    this.categories.set(id, category);
    return category;
  }
  
  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  async getCategoryById(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }
  
  private createAlgorithm(algorithmData: InsertAlgorithm): Algorithm {
    const id = this.currentAlgorithmId++;
    // Ensure required fields have default values if not provided
    const algorithm: Algorithm = { 
      ...algorithmData, 
      id,
      complexity: algorithmData.complexity || null,
      isStable: algorithmData.isStable || null,
      steps: Array.isArray(algorithmData.steps) ? algorithmData.steps : null 
    };
    this.algorithms.set(id, algorithm);
    return algorithm;
  }
  
  async getAllAlgorithms(): Promise<Algorithm[]> {
    return Array.from(this.algorithms.values());
  }
  
  async getAlgorithmById(id: number): Promise<Algorithm | undefined> {
    return this.algorithms.get(id);
  }
  
  async getAlgorithmsByCategoryId(categoryId: number): Promise<Algorithm[]> {
    return Array.from(this.algorithms.values()).filter(
      (algorithm) => algorithm.categoryId === categoryId
    );
  }
  
  async updateProgress(progressData: InsertProgress): Promise<Progress> {
    // Check if progress already exists
    const existingProgress = Array.from(this.progressRecords.values()).find(
      (p) => p.userId === progressData.userId && p.algorithmId === progressData.algorithmId
    );
    
    if (existingProgress) {
      const updatedProgress = { ...existingProgress, ...progressData, viewedAt: new Date() };
      this.progressRecords.set(existingProgress.id, updatedProgress);
      return updatedProgress;
    }
    
    // Create new progress record
    const id = this.currentProgressId++;
    const progress: Progress = { 
      ...progressData, 
      id, 
      completed: progressData.completed || false,
      viewedAt: new Date() 
    };
    this.progressRecords.set(id, progress);
    return progress;
  }
  
  async getUserProgress(userId: number): Promise<Progress[]> {
    return Array.from(this.progressRecords.values()).filter(
      (progress) => progress.userId === userId
    );
  }
}

export const storage = new MemStorage();
