import React from 'react';

const tutorials = [
  {
    id: 1,
    name: 'Squat',
    video: '/assets/squat.gif.mp4', // Replace with actual video path
    steps: [
      'Stand with feet shoulder-width apart.',
      'Lower your body by bending your knees and pushing your hips back.',
      'Keep your chest up and back straight.',
      'Return to the starting position by pushing through your heels.',
      'Repeat for the desired number of reps.'
    ]
  },
  {
    id: 2,
    name: 'Push-Up',
    video: '/assets/pushup.gif.mp4', // Replace with actual video path
    steps: [
      'Start in a plank position with your hands shoulder-width apart.',
      'Lower your body until your chest nearly touches the floor.',
      'Keep your elbows at a 45-degree angle.',
      'Push back up to the starting position.',
      'Repeat while maintaining a straight body.'
    ]
  },
  {
    id: 3,
    name: 'Crunches',
    video: '/assets/crunches.gif.mp4', // Replace with actual video path
    steps: [
      'Lie down with knees bent, feet flat, and hands behind your head.',
      'Engage your core by pulling your belly button toward your spine.',
      'Lift your upper body towards your knees, exhaling as you crunch.',
      'Pause at the top and squeeze your core.',
      'Lower slowly back to the start, inhaling as you go down.'
    ]
  },
  {
    id: 4,
    name: 'Bicep Curls',
    video: '/assets/bicepcurl.gif.mp4', // Replace with actual video path
    steps: [
      'Stand straight, hold dumbbells with palms facing forward.',
      'Curl the weights up to shoulder level, keeping elbows stationary.',
      'Lower the dumbbells slowly to the starting position.',
      'Maintain control and avoid dropping the weights too fast.',
      'Repeat for 10-15 reps with controlled movement.'
    ]
  },
  {
    id: 4,
    name: 'Forward bend',
    video: '/assets/forward.gif.mp4', // Replace with actual video path
    steps: [
      'Stand tall with feet hip-width apart and arms by your sides.',
      'Inhale and lengthen your spine.',
      'Exhale and hinge forward at your hips, keeping your back straight.',
      'Reach your hands toward the floor or your feet, allowing your head and neck to relax',
      'Hold the position, breathing deeply, then slowly rise back to standing.'
    ]
  }
];

export function Tutorials() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Exercise Tutorials</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((tutorial) => (
          <div key={tutorial.id} className="bg-white p-6 shadow-lg rounded-lg">
            {/* Replaced <img> with <video> */}
            <video 
              src={tutorial.video} 
              style={{ width: "400px", height: "300px", borderRadius: "10px" }}
              autoPlay 
              loop 
              muted
            />
            <h2 className="text-xl font-semibold mb-2">{tutorial.name}</h2>
            <ul className="list-disc list-inside text-gray-600">
              {tutorial.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
