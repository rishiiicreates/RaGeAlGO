import { Category } from "@/types";

// This file contains mock category data for development and testing
// In production, this data would come from the server API

export const mockCategories: Category[] = [
  {
    id: 1,
    name: "Sorting Algorithms",
    description: "Master the art of ordering elements efficiently",
    level: 1,
    icon: "🔄"
  },
  {
    id: 2,
    name: "Search Algorithms",
    description: "Find elements quickly in various data structures",
    level: 2,
    icon: "🔍"
  },
  {
    id: 3,
    name: "Graph Algorithms",
    description: "Navigate complex relationships between nodes",
    level: 3,
    icon: "🕸️"
  },
  {
    id: 4,
    name: "Dynamic Programming",
    description: "Solve complex problems by breaking them down",
    level: 4,
    icon: "📊"
  },
  {
    id: 5,
    name: "Data Structures",
    description: "Master essential structures for efficient algorithms",
    level: 5,
    icon: "🧮"
  },
  {
    id: 6,
    name: "Advanced Algorithms",
    description: "Conquer the most challenging coding problems",
    level: 6,
    icon: "⚡"
  }
];
