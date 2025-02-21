import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Award, Utensils, Dumbbell, Sparkles } from 'lucide-react';

export function MaleHome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 flex items-center justify-center -z-10">
            <div className="w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-60"></div>
          </div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
            Transform Your Fitness Journey
          </h1>
          <p className="text-xl text-blue-600 max-w-2xl mx-auto leading-relaxed">
            Elevate your training with AI-powered workouts, personalized nutrition,
            and a supportive community that drives you towards excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        <div className="text-center space-y-8">
          <Link
            to="/workout"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
          >
            <span className="mr-2">Start Your Journey</span>
            <Dumbbell className="w-5 h-5 transition-transform group-hover:rotate-12" />
          </Link>
          
          <div className="flex justify-center gap-4 text-blue-600">
            <div className="flex items-center">
              <Sparkles className="w-5 h-5 mr-2" />
              <span>AI-Powered Guidance</span>
            </div>
            <div className="flex items-center">
              <Sparkles className="w-5 h-5 mr-2" />
              <span>Real-Time Progress Tracking</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    icon: <Play className="w-8 h-8" />,
    title: "Start Working Out",
    description: "Begin your fitness journey with AI-guided exercises tailored to your goals",
    link: "/workout",
    gradient: "from-blue-500 to-blue-600"
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Brownie Points",
    description: "Complete challenges, earn rewards, and track your progress over time",
    link: "/challenges",
    gradient: "from-blue-600 to-blue-700"
  },
  {
    icon: <Utensils className="w-8 h-8" />,
    title: "Diet & Supplements",
    description: "Optimize your nutrition with personalized meal plans for bulking or cutting",
    link: "/diet",
    gradient: "from-blue-700 to-blue-800"
  }
];

function FeatureCard({ icon, title, description, link, gradient }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  gradient: string;
}) {
  return (
    <Link
      to={link}
      className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${gradient} text-white mb-4 shadow-lg`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3 text-blue-800">{title}</h3>
      <p className="text-blue-600 leading-relaxed">{description}</p>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </Link>
  );
}