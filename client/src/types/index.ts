export interface Algorithm {
  id: number;
  name: string;
  categoryId: number;
  description: string;
  complexity: {
    time: string;
    space: string;
  };
  code: string;
  difficulty: string;
  isStable: boolean;
  steps: string[];
}

export interface Category {
  id: number;
  name: string;
  description: string;
  level: number;
  icon: string;
}

export interface Progress {
  id: number;
  userId: number;
  algorithmId: number;
  completed: boolean;
  viewedAt: Date;
}

export interface User {
  id: number;
  username: string;
  progress: Record<string, any>;
}

export enum Difficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard"
}

export interface AchievementBadge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlocked: boolean;
}

export type AlgorithmStatus = "completed" | "in-progress" | "locked" | "available";
