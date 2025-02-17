export interface User {
  id: string;
  name: string;
  score: number;
  gender: string;
  avatar: string;
}

export interface Exercise {
  id: string;
  name: string;
  count: number;
  points: number;
  description: string;
  tutorial: string;
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  target: number;
 
  exercise: string;
  participants: User[];
}