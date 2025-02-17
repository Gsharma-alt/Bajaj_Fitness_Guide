import React, { useState } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Wellness() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [mood, setMood] = useState<number | null>(null);
  const [advice, setAdvice] = useState<string[]>([]);

  // Advice for each mood level
  const moodAdvice: Record<number, string[]> = {
    1: [
      "Take deep breaths and meditate for 5 minutes.",
      "Reach out to a friend or family member for support.",
      "Listen to soothing music or go for a short walk.",
    ],
    2: [
      "Engage in a hobby you enjoy like reading or painting.",
      "Try journaling your thoughts to clear your mind.",
      "Practice gratitude—write down three good things about today.",
    ],
    3: [
      "Do light stretching or yoga for relaxation.",
      "Limit screen time and take short breaks from devices.",
      "Drink water and eat a balanced meal for energy.",
    ],
    4: [
      "Stay active—go for a walk or do some exercise.",
      "Help someone or do a small act of kindness.",
      "Plan something fun for the weekend to look forward to.",
    ],
    5: [
      "Spread positivity—share your happiness with others!",
      "Try a new challenge or skill to keep growing.",
      "Enjoy the moment and celebrate your progress!",
    ],
  };

  // Handle date selection
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setMood(null); // Reset mood selection when changing the date
    setAdvice([]);
  };

  // Handle mood selection
  const handleMoodChange = (level: number) => {
    setMood(level);
    setAdvice(moodAdvice[level]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white py-10">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Daily Mood Tracker</h1>

      {/* Calendar */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <Calendar onClickDay={handleDateChange} />
      </div>

      {/* Mood Selection */}
      {selectedDate && (
        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold text-gray-700">How do you feel today?</h2>
          <div className="flex gap-3 justify-center mt-3">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                className={`px-4 py-2 rounded-lg shadow-md transition ${
                  mood === level
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => handleMoodChange(level)}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Advice Section */}
      {mood && (
        <div className="bg-blue-100 p-4 rounded-lg shadow-md w-80 text-center">
          <h2 className="text-lg font-semibold text-blue-600 mb-2">Wellness Tips</h2>
          <ul className="list-disc list-inside text-gray-700">
            {advice.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Encouraging Message */}
      <p className="text-lg font-bold text-gray-600 mt-6">Remember, every day is a new beginning! 💙</p>
    </div>
  );
}
