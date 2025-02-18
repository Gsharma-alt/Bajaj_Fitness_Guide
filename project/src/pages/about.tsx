import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaBrain, 
  FaRobot, 
  FaChartLine, 
  FaDumbbell, 
  FaHeartbeat, 
  FaMobileAlt,
  FaLock,
  FaUserCircle
} from 'react-icons/fa';

const FeatureCard = ({ title, description, icon: Icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    className="bg-gradient-to-br from-indigo-900 to-indigo-800 p-6 rounded-2xl text-white hover:transform hover:scale-[1.02] transition-all duration-300"
  >
    <div className="flex items-start space-x-4">
      <div className="bg-indigo-700/50 p-3 rounded-lg">
        <Icon className="text-2xl text-indigo-300" />
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2 text-indigo-200">{title}</h3>
        <p className="text-indigo-100/90 leading-relaxed">{description}</p>
      </div>
    </div>
  </motion.div>
);

const About = () => {
  const features = [
    {
      icon: FaBrain,
      title: "AI-Powered Workout Analysis",
      description: "Our advanced AI algorithms analyze your form, track your progress, and provide real-time feedback to optimize your workout efficiency."
    },
    {
      icon: FaRobot,
      title: "Smart Training Assistant",
      description: "Meet FitAI, your 24/7 personal trainer that adapts to your fitness level, goals, and schedule to create perfect workout plans."
    },
    {
      icon: FaChartLine,
      title: "Predictive Performance",
      description: "Using machine learning, we predict your potential achievements and adjust your training program to help you reach your peak performance."
    },
    {
      icon: FaDumbbell,
      title: "Dynamic Exercise Library",
      description: "Access thousands of AI-analyzed exercises with form guidance, difficulty scaling, and alternative suggestions based on your equipment."
    },
    {
      icon: FaHeartbeat,
      title: "Health Pattern Recognition",
      description: "Our AI identifies patterns in your vital signs and workout data to prevent injuries and optimize recovery periods."
    },
    {
      icon: FaMobileAlt,
      title: "Smart Device Integration",
      description: "Seamlessly connect with your fitness devices while our AI aggregates data to provide comprehensive health insights."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-950 to-gray-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-white mb-6">
            The Future of <span className="text-indigo-400">AI-Powered</span> Fitness
          </h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
            Welcome to FitTech, where artificial intelligence meets personal fitness. 
            Our cutting-edge AI technology transforms your workout experience with 
            personalized guidance, real-time analysis, and predictive insights.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          <div className="bg-indigo-900/30 p-6 rounded-xl text-center">
            <div className="text-4xl font-bold text-indigo-400 mb-2">99.9%</div>
            <div className="text-indigo-100">Accuracy in Form Detection</div>
          </div>
          <div className="bg-indigo-900/30 p-6 rounded-xl text-center">
            <div className="text-4xl font-bold text-indigo-400 mb-2">50M+</div>
            <div className="text-indigo-100">AI-Analyzed Workouts</div>
          </div>
          <div className="bg-indigo-900/30 p-6 rounded-xl text-center">
            <div className="text-4xl font-bold text-indigo-400 mb-2">24/7</div>
            <div className="text-indigo-100">AI Training Assistant</div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              {...feature} 
              delay={index * 0.1}
            />
          ))}
        </div>

       
      </div>
    </div>
  );
};

export default About;