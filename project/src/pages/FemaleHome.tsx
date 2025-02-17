import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Calendar, HeartPulse, Moon } from 'lucide-react';

export default function FemaleHome() {
  return (
    <div className="min-h-screen bg-pink-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-pink-600">
            Your Wellness Journey Starts Here
          </h1>
          <p className="text-xl text-pink-500 max-w-2xl mx-auto">
            Experience personalized fitness tracking that adapts to your cycle, 
            with tailored workouts and wellness insights for every phase.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <FeatureCard
            icon={<Calendar className="w-8 h-8" />}
            title="Cycle Tracking"
            description="Track your period and get phase-based workout recommendations"
            link="/cycle"
          />
          <FeatureCard
            icon={<Play className="w-8 h-8" />}
            title="Workout Library"
            description="Access workouts optimized for your current cycle phase"
            link="/workout"
          />
          <FeatureCard
            icon={<Moon className="w-8 h-8" />}
            title="Mood & Symptoms"
            description="Log your daily wellness and get personalized tips"
            link="/wellness"
          />
          <FeatureCard
            icon={<Moon className="w-8 h-8" />}
            title="Brownie Points"
            description="Complete challenges and earn rewards"
            link="/challenges"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-xl p-8 shadow-lg border border-pink-100">
            <h3 className="text-2xl font-semibold mb-4 text-pink-600">Cycle Phase Overview</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-pink-400"></div>
                <p className="text-pink-600">Menstrual Phase: Low-intensity workouts</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                <p className="text-pink-600">Follicular Phase: High-energy exercises</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-pink-600"></div>
                <p className="text-pink-600">Ovulatory Phase: Peak performance training</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-pink-700"></div>
                <p className="text-pink-600">Luteal Phase: Strength and stability focus</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg border border-pink-100">
            <h3 className="text-2xl font-semibold mb-4 text-pink-600">Today's Recommendations</h3>
            <div className="space-y-4 text-pink-600">
              <p>• Optimal workout time: Morning</p>
              <p>• Suggested activities: Yoga, Light Cardio</p>
              <p>• Nutrition focus: Iron-rich foods</p>
              <p>• Wellness tip: Practice mindful breathing</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/cycle"
            className="inline-block bg-pink-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-pink-700 transition"
          >
            Start Your Journey
          </Link>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description, link }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}) {
  return (
    <Link
      to={link}
      className="bg-white rounded-xl p-6 text-pink-600 shadow-lg hover:shadow-xl transition border border-pink-100"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-pink-500">{description}</p>
    </Link>
  );
}