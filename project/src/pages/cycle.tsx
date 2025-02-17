import React, { useState } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function PeriodTracker() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [painTips, setPainTips] = useState<string[]>([]);
  const [exerciseTips, setExerciseTips] = useState<string[]>([]);

  // List of tips
  const painReliefTips = [
    "Apply a heating pad to ease cramps.",
    "Drink chamomile or ginger tea for relief.",
    "Stay hydrated; dehydration can worsen pain.",
    "Take magnesium-rich foods like bananas and nuts.",
    "Try deep breathing exercises to relax your muscles.",
    "Get enough sleep to reduce stress-related cramps.",
  ];

  const exerciseReliefTips = [
    "Try light yoga poses like Child's Pose.",
    "Take a 15-minute walk for better circulation.",
    "Do gentle stretching to relax muscles.",
    "Practice deep breathing with meditation.",
    "Avoid intense workouts; focus on relaxation.",
    "Try swimming—it helps with cramps and bloating.",
  ];

  // Function to pick random tips
  const getRandomTips = (tips: string[], count: number) => {
    const shuffled = [...tips].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Handle date changes
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    setStartDate(date);
    setPainTips(getRandomTips(painReliefTips, 3));
    setExerciseTips(getRandomTips(exerciseReliefTips, 3));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    setEndDate(date);
    setPainTips(getRandomTips(painReliefTips, 3));
    setExerciseTips(getRandomTips(exerciseReliefTips, 3));
  };

  // Highlight period days
  const tileClassName = ({ date }: { date: Date }) => {
    if (startDate && endDate && date >= startDate && date <= endDate) {
      return "bg-pink-300 text-white rounded-lg";
    }
    return "";
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white py-10">
      <h1 className="text-2xl font-bold text-pink-600 mb-6">Period Tracker</h1>

      {/* Calendar */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <Calendar tileClassName={tileClassName} />
      </div>

      {/* Date Input Fields */}
      <div className="flex gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
            onChange={handleStartDateChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="date"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
            onChange={handleEndDateChange}
          />
        </div>
      </div>

      {/* Tips Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Pain Relief Tips */}
        <div className="bg-pink-100 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-pink-600 mb-2">
            Pain Relief Tips
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            {painTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>

        {/* Exercise Tips */}
        <div className="bg-blue-100 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-blue-600 mb-2">
            Exercise Tips
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            {exerciseTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Encouraging Message */}
      <p className="text-lg font-bold text-gray-600">Relax, it's gonna end soon! 💖</p>
    </div>
  );
}
