import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Award, HeartPulse, BookOpen } from 'lucide-react';

export function MaleHome() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-indigo-600">
            Transform Your Fitness Journey
          </h1>
          <p className="text-xl text-indigo-500 max-w-2xl mx-auto">
            Join the future of fitness with AI-powered workout tracking, real-time feedback,
            and a supportive community to keep you motivated.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <FeatureCard
            icon={<Play className="w-8 h-8" />}
            title="Start Working Out"
            description="Begin your fitness journey with AI-guided exercises"
            link="/workout"
          />
          <FeatureCard
            icon={<Award className="w-8 h-8" />}
            title="Brownie Points"
            description="Complete challenges and earn rewards"
            link="/challenges"
          />
          <FeatureCard
            icon={<HeartPulse className="w-8 h-8" />}
            title="Assistant"
            description="Get personalized fitness recommendations"
            link="/assistant"
          />
          <FeatureCard
            icon={<BookOpen className="w-8 h-8" />}
            title="Tutorials"
            description="Learn proper form with detailed guides"
            link="/tutorials"
          />
        </div>

        <div className="text-center">
          <Link
            to="/workout"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-indigo-700 transition"
          >
            Start Now
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
      className="bg-white rounded-xl p-6 text-indigo-600 shadow-lg hover:shadow-xl transition border border-indigo-100"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-indigo-500">{description}</p>
    </Link>
  );
}