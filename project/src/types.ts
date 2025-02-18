export interface User {
  id: string;
  name: string;
  score: number;
  gender: string;
  avatar: string;
  email:string;
  profilePhoto:string;
  age:number;
  weight:number;
  goal:number;
  handles:string;
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
export interface Post {
  id: string;
  content: string;
  likes: number;
  date: string;
  pinned: boolean;
}

export interface Community {
  id: number;
  name: string;
  members: number;
  category: string;
  adminName: string;
  description: string;
  image: string;
  posts: Post[];
}
