import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGift, FaCoins, FaCrown, FaDumbbell, FaHeart, FaLock } from 'react-icons/fa';

const RewardCard = ({ title, points, description, image, isLocked, onRedeem }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-xl shadow-lg overflow-hidden ${isLocked ? 'opacity-75' : ''}`}
    >
      <div className="relative">
        <div
          className="w-full h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {points} Points
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        {isLocked ? (
          <div className="flex items-center text-gray-500">
            <FaLock className="mr-2" />
            <span>Not enough points</span>
          </div>
        ) : (
          <button
            onClick={onRedeem}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Redeem Now
          </button>
        )}
      </div>
    </motion.div>
  );
};

const Redeem = () => {
  const [userPoints, setUserPoints] = useState(1500);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);

  const rewards = [
    {
      id: 1,
      title: "Premium Membership",
      points: 1000,
      image: "/assets/memb.png",
      description: "1 month of premium membership with access to exclusive workouts and features.",
      icon: FaCrown,
    },
    {
      id: 2,
      title: "Personal Training Session",
      points: 800,
      image: "/assets/personal.jpg",
      description: "60-minute one-on-one session with a certified personal trainer.",
      icon: FaDumbbell,
    },
    {
      id: 3,
      title: "Health Supplements",
      points: 500,
      image: "/assets/health.webp",
      description: "Premium protein shake and vitamins package from our partner stores.",
      icon: FaHeart,
    },
    {
      id: 4,
      title: "Fitness Gear Discount",
      points: 300,
      image: "/assets/gear.avif",
      description: "25% off on selected fitness equipment and accessories.",
      icon: FaGift,
    }
  ];

  const handleRedeem = (reward) => {
    setSelectedReward(reward);
    setShowConfirmation(true);
  };

  const confirmRedeem = () => {
    setUserPoints(prevPoints => prevPoints - selectedReward.points);
    setShowConfirmation(false);
    // Here you would typically make an API call to process the redemption
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Redeem Your Brownie Points</h1>
          <div className="inline-flex items-center bg-white px-6 py-3 rounded-full shadow-md">
            <FaCoins className="text-yellow-500 text-xl mr-2" />
            <span className="text-2xl font-bold text-gray-800">{userPoints} Points Available</span>
          </div>
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {rewards.map((reward) => (
            <RewardCard
              key={reward.id}
              {...reward}
              isLocked={userPoints < reward.points}
              onRedeem={() => handleRedeem(reward)}
            />
          ))}
        </div>

        {/* Redemption History */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Redemptions</h2>
          <div className="text-gray-600">
            No recent redemptions to show.
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Confirm Redemption</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to redeem {selectedReward.title} for {selectedReward.points} points?
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={confirmRedeem}
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Redeem;
