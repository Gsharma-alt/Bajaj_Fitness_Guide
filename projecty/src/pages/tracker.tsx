import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sun } from "lucide-react";

const Tracker = () => {
  const [age, setAge] = useState("");
  const [bmi, setBmi] = useState("");
  const [cycleNumber, setCycleNumber] = useState("");
  const [lengthOfCycle, setLengthOfCycle] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");
  const [height, setHeight] = useState(""); // New state for height
  const [weight, setWeight] = useState(""); // New state for weight
  const [calculatedBmi, setCalculatedBmi] = useState(null);
  const handleBmiCalculate = (e) => {
    e.preventDefault();
    const heightInMeters = parseFloat(height) / 100; // Convert height from cm to meters
    const weightInKg = parseFloat(weight);
    if (heightInMeters > 0 && weightInKg > 0) {
      const bmiValue = weightInKg / (heightInMeters * heightInMeters);
      setCalculatedBmi(bmiValue.toFixed(2)); // Set calculated BMI
    } else {
      setCalculatedBmi(null);
      setError("Please enter valid height and weight.");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    const userData = {
      Age: parseFloat(age),
      BMI: parseFloat(bmi),
      CycleNumber: parseInt(cycleNumber),
      LengthofCycle: parseFloat(lengthOfCycle),
    };

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const data = await response.json();
      setPrediction(data.Predicted_Next_Cycle_Length);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white py-12 px-4">
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
            Period Cycle Predictor
          </motion.h1>
          <p className="text-gray-600">Enter your details to predict your next cycle length</p>
        </div>
             {/* BMI Calculator Section */}
             <form onSubmit={handleBmiCalculate} className="bg-white rounded-2xl shadow-lg p-6 space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
          >
            Calculate BMI
          </button>
        </form>

        {calculatedBmi && (
          <div className="mt-4 text-center">
            <p className="text-lg font-medium text-gray-700">
              Your BMI: <span className="font-bold">{calculatedBmi}</span>
            </p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">BMI</label>
            <input
              type="number"
              value={bmi}
              onChange={(e) => setBmi(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cycle Number</label>
            <input
              type="number"
              value={cycleNumber}
              onChange={(e) => setCycleNumber(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Length of Cycle (days)</label>
            <input
              type="number"
              value={lengthOfCycle}
              onChange={(e) => setLengthOfCycle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
          >
            Predict Next Cycle Length
          </button>
        </form>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {prediction && (
          <div className="mt-6 text-center">
            <p className="text-lg font-medium text-gray-700">
              Predicted Next Cycle Length: <span className="font-bold">{prediction} days</span>
            </p>
          </div>
        )}

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
                Stay informed about your cycle! 💖
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Tracker;