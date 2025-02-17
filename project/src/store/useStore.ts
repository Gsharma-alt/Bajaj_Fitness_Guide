import { create } from 'zustand';
import { User, Exercise, Challenge } from '../types';

interface Store {
  currentUser: User | null;
  exercises: Exercise[];
  challenges: Challenge[];
  setCurrentUser: (user: User) => void;
  addExerciseCount: (exerciseId: string, count: number) => void;
  joinChallenge: (challengeId: string) => void;
}

const defaultExercises: Exercise[] = [
  {
    id: '1',
    name: 'Side Stretch WarmUp',
    count: 0,
    points: 12,
    description: 'Start strecthing to the side',
    tutorial: 'https://www.youtube.com/watch?v=I2wQjK1cgYE'
  },
  {
    id: '2',
    name: 'Bicep Curls',
    count: 0,
    points: 12,
    description: 'Stand with dumbbells, curl weights toward shoulders while keeping elbows fixed',
    tutorial: 'https://www.youtube.com/watch?v=I2wQjK1cgYE'
  },
  {
    id: '3',
    name: 'Squats',
    count: 0,
    points: 10,
    description: 'Stand with feet shoulder-width apart, lower your body as if sitting back into a chair',
    tutorial: 'https://www.youtube.com/watch?v=example'
  },
  {
    id: '4',
    name: 'Push-ups',
    count: 0,
    points: 15,
    description: 'Start in plank position, lower chest to ground, push back up',
    tutorial: 'https://www.youtube.com/watch?v=example'
  },
  {
    id: '5',
    name: 'Crunches',
    count: 0,
    points: 8,
    description: 'Lie on back, knees bent, lift shoulders off ground',
    tutorial: 'https://www.youtube.com/watch?v=example'
  },
  
  
];

export const useStore = create<Store>((set) => ({
  currentUser: null,
  exercises: defaultExercises,
  challenges: [],
  setCurrentUser: (user) => set({ currentUser: user }),
  addExerciseCount: (exerciseId, count) =>
    set((state) => ({
      exercises: state.exercises.map((ex) =>
        ex.id === exerciseId ? { ...ex, count: ex.count + count } : ex
      ),
    })),
  joinChallenge: (challengeId) =>
    set((state) => ({
      challenges: state.challenges.map((challenge) =>
        challenge.id === challengeId && state.currentUser
          ? {
              ...challenge,
              participants: [...challenge.participants, state.currentUser],
            }
          : challenge
      ),
    })),
}));