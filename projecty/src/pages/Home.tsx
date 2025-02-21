import React, { useState } from 'react';
import { Heart, Flame, Shield, Zap, ChevronRight, Star, Trophy, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function Home() {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleMaleClick = () => {
    navigate('/male-home');
  };

  const handleFemaleClick = () => {
    navigate('/female-home');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const hoverScale = {
    scale: 1.03,
    transition: { type: 'spring', stiffness: 300 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/60 via-blue-900/60 to-purple-900/60" />
        <img 
          src="/api/placeholder/1920/1080" 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4">
          <motion.div
            className="max-w-4xl text-center space-y-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            <motion.h1
              className="text-6xl md:text-8xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-indigo-200"
              variants={fadeInUp}
            >
              Your Journey to a 
              <span className="block text-blue-200"> Stronger </span> 
              You
            </motion.h1>
            <motion.p
              className="text-xl md:text-3xl text-blue-100 font-light"
              variants={fadeInUp}
            >
              Experience the perfect blend of strength, wellness, and personal growth
            </motion.p>
            <motion.div
              className="flex gap-6 justify-center"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2 },
                },
              }}
            >
              <motion.button
                onClick={handleMaleClick}
                className="group relative px-8 py-4 rounded-full overflow-hidden bg-white bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20 transition-all duration-300"
                variants={fadeInUp}
                whileHover={hoverScale}
              >
                <span className="relative z-10 text-lg font-medium">Male</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </motion.button>
              <motion.button
                onClick={handleFemaleClick}
                className="group relative px-8 py-4 rounded-full overflow-hidden bg-white bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20 transition-all duration-300"
                variants={fadeInUp}
                whileHover={hoverScale}
              >
                <span className="relative z-10 text-lg font-medium">Female</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Heart Circle Dropdown Section */}
      <div className="absolute top-32 left-4">
        <button 
          onClick={toggleDropdown}
          className="w-16 h-16 rounded-full bg-white text-red-500 flex justify-center items-center text-3xl border-4 border-red-500"
        >
          <Heart />
        </button>
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              className="absolute top-20 left-0 bg-gray-200 rounded-lg shadow-lg py-4 w-48 text-center text-sm border hover:bg-gray-300"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <ul>
                <li className="border-b border-white last:border-b-0 pl-3">
                  <button onClick={() => navigate('/redeem')} className="block py-2 text-gray-500 hover:text-gray-800">Redeem Brownie Points</button>
                </li>
                <li className="border-b border-white last:border-b-0 pl-3">
                  <button onClick={() => navigate('/join')} className="block py-2 text-gray-500 hover:text-gray-800">Join Community</button>
                </li>
                <li>
                  <button onClick={() => navigate('/about')} className="block py-2 text-gray-500 hover:text-gray-800 pl-3">About Us</button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-32 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {[ 
            {
              icon: <Star className="w-10 h-10 text-amber-400" />,
              stat: "98%",
              title: "Success Rate",
              description: "Members achieving their fitness goals within 6 months"
            },
            {
              icon: <Trophy className="w-10 h-10 text-blue-400" />,
              stat: "10K+",
              title: "Active Members",
              description: "Join our thriving community of fitness enthusiasts"
            },
            {
              icon: <Flame className="w-10 h-10 text-orange-400" />,
              stat: "500+",
              title: "Workout Plans",
              description: "Customized programs for every fitness level"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-blue-50"
              variants={fadeInUp}
              whileHover={hoverScale}
            >
              <div className="flex items-center justify-between mb-6">
                {item.icon}
                <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {item.stat}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-32">
        <div className="text-center mb-20">
          <motion.h2
            className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            Transform Your Life
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            Experience a revolutionary approach to fitness that combines cutting-edge technology with personalized coaching
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {[ 
            {
              icon: <Heart className="w-14 h-14 text-rose-400" />,
              title: "Personalized Plans",
              description: "AI-powered workouts that adapt to your progress and preferences"
            },
            {
              icon: <Zap className="w-14 h-14 text-amber-400" />,
              title: "Real-Time Analytics",
              description: "Track your performance with advanced metrics and insights"
            },
            {
              icon: <Shield className="w-14 h-14 text-emerald-400" />,
              title: "Expert Guidance",
              description: "Access to certified trainers and nutrition specialists"
            },
            {
              icon: <Flame className="w-14 h-14 text-orange-400" />,
              title: "Goal Achievement",
              description: "Structured programs designed to help you reach your targets"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="group bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-50"
              variants={fadeInUp}
              whileHover={hoverScale}
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 mb-6">{feature.description}</p>
              <button className="text-blue-600 font-semibold flex items-center group-hover:text-indigo-600 transition-colors">
                Learn More <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600/90 via-indigo-600/90 to-purple-600/90 py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h2
            className="text-5xl font-bold text-white mb-8"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            Start Your Fitness Journey Today
          </motion.h2>
          <motion.p
            className="text-2xl text-blue-100 mb-12 max-w-2xl mx-auto font-light"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            Join thousands who have already transformed their lives through our comprehensive fitness platform
          </motion.p>
          <motion.button
            className="group relative px-10 py-5 rounded-full overflow-hidden bg-white text-lg font-semibold transition-all duration-300 hover:shadow-2xl"
            whileHover={{ scale: 1.05 }}
          >
            <span className="relative z-10 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Get Started Now
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default Home;