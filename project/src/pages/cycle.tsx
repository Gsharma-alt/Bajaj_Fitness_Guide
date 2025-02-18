import React, { useState } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { motion } from "framer-motion";
import { Heart, Activity, Sun } from "lucide-react";

export default function PeriodTracker() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [painTips, setPainTips] = useState<string[]>([]);
  const [exerciseTips, setExerciseTips] = useState<string[]>([]);

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

  const getRandomTips = (tips: string[], count: number) => {
    const shuffled = [...tips].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

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

  const tileClassName = ({ date }: { date: Date }) => {
    if (startDate && endDate && date >= startDate && date <= endDate) {
      return "period-day";
    }
    return "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold text-pink-600 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Period Tracker
          </motion.h1>
          <p className="text-gray-600">Track your cycle and get personalized tips</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Calendar Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 overflow-hidden">
              <Calendar 
                tileClassName={tileClassName}
                className="border-none shadow-none w-full"
              />
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    onChange={handleStartDateChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    onChange={handleEndDateChange}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Tips Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <motion.div 
              className="bg-gradient-to-r from-pink-100 to-pink-50 p-6 rounded-2xl shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-6 h-6 text-pink-500" />
                <h2 className="text-xl font-semibold text-pink-600">Pain Relief Tips</h2>
              </div>
              <ul className="space-y-3">
                {painTips.map((tip, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2 text-gray-700"
                  >
                    <span className="w-6 h-6 rounded-full bg-pink-200 flex items-center justify-center text-sm font-medium text-pink-600 flex-shrink-0">
                      {index + 1}
                    </span>
                    {tip}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-r from-blue-100 to-blue-50 p-6 rounded-2xl shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-6 h-6 text-blue-500" />
                <h2 className="text-xl font-semibold text-blue-600">Exercise Tips</h2>
              </div>
              <ul className="space-y-3">
                {exerciseTips.map((tip, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2 text-gray-700"
                  >
                    <span className="w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center text-sm font-medium text-blue-600 flex-shrink-0">
                      {index + 1}
                    </span>
                    {tip}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-block bg-white px-6 py-3 rounded-full shadow-lg">
            <div className="flex items-center gap-2">
              <Sun className="w-5 h-5 text-yellow-500" />
              <p className="text-lg font-medium text-gray-700">
                Stay strong, this too shall pass! 💖
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .period-day {
          background: linear-gradient(135deg, #f9a8d4 0%, #f472b6 100%);
          color: white;
          border-radius: 8px;
        }
        
        .react-calendar {
          border: none;
          width: 100%;
        }
        
        .react-calendar__tile {
          padding: 1em 0.5em;
          transition: all 0.2s;
        }
        
        .react-calendar__tile:hover {
          background-color: #fce7f3;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}