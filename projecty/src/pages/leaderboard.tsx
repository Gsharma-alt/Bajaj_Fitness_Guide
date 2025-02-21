import React, { useState, useEffect } from 'react';
import { BarChart2, ChevronDown } from 'lucide-react';
import { useStore } from '../store/useStore'; // Adjust the import based on your store setup

const Leaderboard = () => {
  const [selectedExercise, setSelectedExercise] = useState('squat');
  const [leaderboardData, setLeaderboardData] = useState([]);
  const exercises = ['squat', 'crunches', 'bicep curls', 'pushups'];

  // Fetch the logged-in user from the store
  const currentUser = useStore((state) => state.currentUser);

  // Dummy data for the leaderboard (replace with API call)
  const fetchLeaderboardData = () => {
    const exampleData = [
      { name: 'Alice', reps: 150 },
      { name: 'Bob', reps: 140 },
      { name: 'Charlie', reps: 130 },
      { name: 'Diana', reps: 120 },
      { name: 'Eve', reps: 110 },
    ];
    setLeaderboardData(exampleData);
  };

  // Fetch leaderboard data on component mount
  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent inline-block">
            Leaderboard
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Track your progress and compete with others!
          </p>
        </div>

        {/* Display the logged-in user's name */}
        {currentUser && (
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold text-indigo-600">
              Welcome, {currentUser.name}!
            </h2>
          </div>
        )}

        <div className="mb-8 flex justify-center">
          <div className="relative">
            <select
              value={selectedExercise}
              onChange={(e) => setSelectedExercise(e.target.value)}
              className="appearance-none bg-white border border-indigo-300 rounded-full py-2 pl-4 pr-10 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            >
              {exercises.map((exercise) => (
                <option key={exercise} value={exercise}>
                  {exercise.charAt(0).toUpperCase() + exercise.slice(1)}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-indigo-600">
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-indigo-100">
            <h2 className="text-xl font-semibold text-indigo-600">
              {selectedExercise.charAt(0).toUpperCase() + selectedExercise.slice(1)} Leaderboard
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-indigo-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">
                    Reps
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-100">
                {leaderboardData.map((entry, index) => (
                  <tr key={index} className="hover:bg-indigo-50 transition-colors duration-200">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {entry.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {entry.reps}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;