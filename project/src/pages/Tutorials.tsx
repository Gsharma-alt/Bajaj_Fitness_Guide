import React from 'react';

const tutorials = [
  {
    id: 1,
    name: 'Squat',
    image: '/images/squat.jpg', // Replace with actual image path
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
    image: '/images/pushup.jpg', // Replace with actual image path
    steps: [
      'Start in a plank position with your hands shoulder-width apart.',
      'Lower your body until your chest nearly touches the floor.',
      'Keep your elbows at a 45-degree angle.',
      'Push back up to the starting position.',
      'Repeat while maintaining a straight body.'
    ],
    imgStyle: { width: '150px', height: '200px' }
  },
  {
    id: 3,
    name: 'Lunges',
    image: '/images/crunches.jpg', // Replace with actual image path
    steps: [
      'Stand tall with feet together.',
      'Step forward with one leg and lower your hips until both knees are bent at a 90-degree angle.',
      'Keep your front knee aligned with your ankle.',
      'Push back up to the starting position.',
      'Alternate legs and repeat.'
    ],
    imgStyle: { width: '150px', height: '200px' }
  },
  {
    id: 4,
    name: 'Bicep Curls',
    image: '/images/crunches.jpg', // Replace with actual image path
    steps: [
      'Stand straight, hold dumbbells with palms facing forward.',
      'Curl the weights up to shoulder level, keeping elbows stationary.',
      ' Lower the dumbbells slowly to the starting position',
      'Maintain control and avoid dropping the weights too fast.',
      'Repeat for 10-15 reps with controlled movement.'
      
    ],
    imgStyle: { width: '150px', height: '200px' }
  }
];

export function Tutorials() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Exercise Tutorials</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((tutorial) => (
          <div key={tutorial.id} className="bg-white p-6 shadow-lg rounded-lg">
            <img src={tutorial.image} alt={tutorial.name} className="w-full h-48 object-cover rounded-md mb-4" />
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
