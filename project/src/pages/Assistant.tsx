import React, { useState } from 'react';
import { Scale, Target, Dumbbell, MessageCircle } from 'lucide-react';
import PersonalizedTraining from './PersonalizedTraining';

interface FitnessGoal {
  currentWeight: number;
  targetWeight: number;
  timeframe: number; // in weeks
}

interface ExercisePlan {
  name: string;
  reps: number;
  sets: number;
  frequency: string;
  caloriesBurned: number;
}

export function Assistant() {
  const [goal, setGoal] = useState<FitnessGoal>({
    currentWeight: 80,
    targetWeight: 70,
    timeframe: 12
  });

  const [showPlan, setShowPlan] = useState(false);
  const [showPersonalizedTraining, setShowPersonalizedTraining] = useState(false);

  const generatePlan = (): ExercisePlan[] => {
    const weightDiff = Math.abs(goal.currentWeight - goal.targetWeight);
    const isWeightLoss = goal.currentWeight > goal.targetWeight;
    const isWeightGain = goal.currentWeight < goal.targetWeight;
    
    let plan: ExercisePlan[] = [];

    if (isWeightLoss) {
      plan = [
        {
          name: 'Push-ups',
          reps: 15,
          sets: 3,
          frequency: '4 times per week',
          caloriesBurned: 100
        },
        {
          name: 'Squats',
          reps: 20,
          sets: 4,
          frequency: '4 times per week',
          caloriesBurned: 150
        },
        {
          name: 'Crunches',
          reps: 20,
          sets: 3,
          frequency: '3 times per week',
          caloriesBurned: 80
        },
        {
          name: 'Bicep Curls',
          reps: 12,
          sets: 3,
          frequency: '3 times per week',
          caloriesBurned: 90
        },
        {
          name: 'Stretch WarmUp',
          reps: 10,
          sets: 4,
          frequency: '3 times per week',
          caloriesBurned: 40
        }
      ];
    } else if (isWeightGain) {
      plan = [
        {
          name: 'Push-ups',
          reps: 8,
          sets: 4,
          frequency: '3 times per week',
          caloriesBurned: 80
        },
        {
          name: 'Squats',
          reps: 12,
          sets: 4,
          frequency: '3 times per week',
          caloriesBurned: 120
        },
        {
          name: 'Bicep Curls',
          reps: 10,
          sets: 4,
          frequency: '4 times per week',
          caloriesBurned: 70
        },
        {
          name: 'Crunches',
          reps: 15,
          sets: 3,
          frequency: '2 times per week',
          caloriesBurned: 60
        }
      ];
    }

    return plan;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPlan(true);
  };

  const weeklyCalorieDeficit = Math.round(
    ((goal.currentWeight - goal.targetWeight) * 7700) / goal.timeframe
  );

  const getDietRecommendations = () => {
    const isWeightLoss = goal.currentWeight > goal.targetWeight;
    if (isWeightLoss) {
      return [
        'Focus on lean proteins like chicken, fish, and tofu',
        'Increase fiber intake through vegetables and whole grains',
        'Limit processed foods and sugary drinks',
        'Consider protein shakes post-workout',
        'Eat smaller portions but more frequently'
      ];
    } else {
      return [
        'Increase protein intake for muscle growth',
        'Add healthy fats like nuts, avocados, and olive oil',
        'Consume complex carbohydrates for energy',
        'Consider mass gainer shakes',
        'Eat larger portions with focus on nutrient-dense foods'
      ];
    }
  };

  return (
    <div className="min-h-screen bg-white py-12">
      {/* Personalized Training Modal */}
      {showPersonalizedTraining && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-blue-100 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-blue-600">AI Fitness Assistant</h2>
              <button
                onClick={() => setShowPersonalizedTraining(false)}
                className="text-blue-400 hover:text-blue-600 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <PersonalizedTraining />
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-blue-600 mb-2">Fitness Assistant</h1>
          <p className="text-blue-500">Let's create your personalized fitness plan</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg border border-blue-100 p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-2">
                  Current Weight (kg)
                </label>
                <input
                  type="number"
                  value={goal.currentWeight}
                  onChange={(e) => setGoal({ ...goal, currentWeight: Number(e.target.value) })}
                  className="w-full rounded-md border border-blue-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  min="30"
                  max="200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-2">
                  Target Weight (kg)
                </label>
                <input
                  type="number"
                  value={goal.targetWeight}
                  onChange={(e) => setGoal({ ...goal, targetWeight: Number(e.target.value) })}
                  className="w-full rounded-md border border-blue-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  min="30"
                  max="200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-2">
                  Timeframe (weeks)
                </label>
                <input
                  type="number"
                  value={goal.timeframe}
                  onChange={(e) => setGoal({ ...goal, timeframe: Number(e.target.value) })}
                  className="w-full rounded-md border border-blue-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  min="4"
                  max="52"
                  required
                />
              </div>
            </div>
            <div className="space-y-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition"
              >
                Generate Plan
              </button>
              
              <button
                type="button"
                onClick={() => setShowPersonalizedTraining(true)}
                className="w-full bg-white text-blue-600 py-3 px-4 rounded-md border-2 border-blue-600 hover:bg-blue-50 transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Start AI Chat
              </button>
            </div>
          </form>
        </div>

        {showPlan && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg border border-blue-100 p-6">
              <h2 className="text-xl font-semibold text-blue-600 mb-4">Your Fitness Journey</h2>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <Scale className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-blue-500">Weight Change</p>
                  <p className="text-lg font-semibold text-blue-600">
                    {Math.abs(goal.currentWeight - goal.targetWeight)} kg
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-blue-500">Weekly Goal</p>
                  <p className="text-lg font-semibold text-blue-600">
                    {(Math.abs(goal.currentWeight - goal.targetWeight) / goal.timeframe).toFixed(1)} kg
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <Dumbbell className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-blue-500">Daily Calorie Adjustment</p>
                  <p className="text-lg font-semibold text-blue-600">
                    {Math.abs(weeklyCalorieDeficit / 7)} kcal
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg border border-blue-100 p-6">
              <h2 className="text-xl font-semibold text-blue-600 mb-4">Recommended Exercises</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {generatePlan().map((exercise, index) => (
                  <div key={index} className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-600 mb-2">{exercise.name}</h3>
                    <ul className="space-y-1 text-blue-500">
                      <li>{exercise.sets} sets of {exercise.reps} reps</li>
                      <li>{exercise.frequency}</li>
                      <li>~{exercise.caloriesBurned} kcal/session</li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg border border-blue-100 p-6">
              <h2 className="text-xl font-semibold text-blue-600 mb-4">Nutrition Recommendations</h2>
              <ul className="list-disc list-inside space-y-2 text-blue-500">
                {getDietRecommendations().map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg border border-blue-100 p-6">
              <h2 className="text-xl font-semibold text-blue-600 mb-4">Additional Tips</h2>
              <ul className="list-disc list-inside space-y-2 text-blue-500">
                <li>Stay hydrated - drink at least 8 glasses of water daily</li>
                <li>Get 7-8 hours of sleep each night</li>
                <li>Track your progress using our workout tracking features</li>
                <li>Join our challenges to earn brownie points</li>
                <li>Consider adding cardio exercises like walking or jogging</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}