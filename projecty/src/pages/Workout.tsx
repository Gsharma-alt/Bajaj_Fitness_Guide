import React, { useState } from 'react';
import { WorkoutCamera } from '../components/WorkoutCamera';
import { useStore } from '../store/useStore';

export function Workout() {
  const exercises = useStore((state) => state.exercises);
  const [selectedExercise, setSelectedExercise] = useState(exercises[0]?.name || "side stretch warmup"); 

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Workout Session</h1>
          
          <div className="flex space-x-4 mb-6">
            {exercises.map((exercise) => (
              <button
                key={exercise.id}
                onClick={() => setSelectedExercise(exercise.name)}  // ✅ Change exercise
                className={`px-4 py-2 rounded-full ${
                  selectedExercise === exercise.name
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {exercise.name}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg mb-8">
            <h2 className="text-xl font-semibold mb-2">{selectedExercise}</h2>
            <p className="text-gray-600 mb-4">
              {exercises.find((e) => e.name === selectedExercise)?.description}
            </p>
          </div>
        </div>

        {/* ✅ Pass selectedExercise to WorkoutCamera */}
        <WorkoutCamera selectedExercise={selectedExercise} />

        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Tips for Perfect Form</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Keep your back straight throughout the movement</li>
            <li>Breathe steadily and rhythmically</li>
            <li>Maintain proper form over speed</li>
            <li>Stay within the camera frame</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
