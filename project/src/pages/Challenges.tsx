import React from 'react';
import { Trophy, Award } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';

interface ChallengeCard {
  id: string;
  title: string;
  description: string;
  points: number;
  target: number;
  exercise: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const challenges: ChallengeCard[] = [
  {
    id: '1',
    title: '30 Push-ups Challenge',
    description: 'Complete 30 push-ups in one session',
    points: 100,
    target: 30,
    exercise: 'Push-ups',
    difficulty: 'Beginner'
  },
  {
    id: '2',
    title: '50 Squats Challenge',
    description: 'Complete 50 squats in one session',
    points: 150,
    target: 50,
    exercise: 'Squats',
    difficulty: 'Intermediate'
  },
  {
    id: '3',
    title: '100 Crunches Challenge',
    description: 'Complete 100 crunches in one session',
    points: 200,
    target: 100,
    exercise: 'Crunches',
    difficulty: 'Advanced'
  },
  {
    id: '4',
    title: '40 Bicep Curls Challenge',
    description: 'Complete 40 bicep curls in one session',
    points: 175,
    target: 40,
    exercise: 'Bicep Curls',
    difficulty: 'Intermediate'
  }
];

export function Challenges() {
  const joinChallenge = useStore((state) => state.joinChallenge);
  const navigate = useNavigate();

  const handleAcceptChallenge = (challenge: ChallengeCard) => {
    joinChallenge(challenge.id);
    // Redirect to workout page with challenge context
    navigate('/workout', { 
      state: { 
        challengeMode: true,
        challenge: challenge 
      }
    });
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Award className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-indigo-600 mb-2">Brownie Points Challenges</h1>
          <p className="text-indigo-500">Complete challenges to earn points and rewards</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="bg-white rounded-lg shadow-lg border border-indigo-100 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-indigo-600">{challenge.title}</h3>
                  <Trophy className="w-6 h-6 text-indigo-500" />
                </div>
                <p className="text-indigo-500 mb-4">{challenge.description}</p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-indigo-500">Target</span>
                    <span className="font-semibold text-indigo-600">{challenge.target} reps</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-indigo-500">Points</span>
                    <span className="font-semibold text-indigo-600">{challenge.points}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-indigo-500">Difficulty</span>
                    <span className="font-semibold text-indigo-600">{challenge.difficulty}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleAcceptChallenge(challenge)}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
                >
                  Accept Challenge
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}