// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useStore } from '../store/useStore';

// export function Profile() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
//   const [age, setAge] = useState<string | number>('');
//   const [weight, setWeight] = useState<string | number>('');
//   const [goal, setGoal] = useState<string>('');
//   const [handles, setHandles] = useState<string>('');
  
//   const navigate = useNavigate();
//   const currentUser = useStore((state) => state.currentUser);

//   // Update profile with user data
//   useEffect(() => {
//     if (currentUser) {
//       setProfilePhoto(currentUser.profilePhoto || "https://via.placeholder.com/100");
//       setAge(currentUser.age || '');
//       setWeight(currentUser.weight || '');
//       setGoal(currentUser.goal || '');
//       setHandles(currentUser.handles || '');
//     }
//   }, [currentUser]);

//   // Handle saving the profile data
//   const handleSave = () => {
//     // Save profile data (could be through an API or state management)
//     setIsEditing(false);
//     alert('Profile updated!');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//       <div className="max-w-2xl w-full px-6 py-8 bg-white shadow-lg rounded-lg">
//         <div className="text-center mb-8">
//           <h2 className="text-2xl font-bold text-indigo-600">Your Profile</h2>
//           <p className="text-indigo-500">Update your fitness journey and personal details</p>
//         </div>

//         {/* Profile Picture Section */}
//         <div className="flex justify-center mb-6">
//           <div className="relative">
//             <img
//               src={profilePhoto || "https://via.placeholder.com/100"}
//               alt=""
//               className="w-32 h-32 rounded-full object-cover border-4 border-indigo-600"
//             />
//             <button
//               className="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-2"
//               onClick={() => alert('Profile photo change functionality goes here')}
//             >
//               ✏️
//             </button>
//           </div>
//         </div>

//         {/* User Info Display */}
//         <div className="space-y-6">
//           <div className="flex justify-between items-center">
//             <span className="text-lg font-medium text-indigo-600">Name:</span>
//             <span className="text-lg">{currentUser?.name}</span>
//           </div>

//           <div className="flex justify-between items-center">
//             <span className="text-lg font-medium text-indigo-600">Email:</span>
//             <span className="text-lg">{currentUser?.email}</span>
//           </div>

//           {/* Editable Fields */}
//           <div className="flex justify-between items-center">
//             <span className="text-lg font-medium text-indigo-600">Age:</span>
//             {isEditing ? (
//               <input
//                 type="number"
//                 value={age}
//                 onChange={(e) => setAge(e.target.value)}
//                 className="mt-1 block w-1/2 rounded-md border border-indigo-300 px-3 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//               />
//             ) : (
//               <span className="text-lg">{age || 'Not set'}</span>
//             )}
//           </div>

//           <div className="flex justify-between items-center">
//             <span className="text-lg font-medium text-indigo-600">Weight:</span>
//             {isEditing ? (
//               <input
//                 type="number"
//                 value={weight}
//                 onChange={(e) => setWeight(e.target.value)}
//                 className="mt-1 block w-1/2 rounded-md border border-indigo-300 px-3 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//               />
//             ) : (
//               <span className="text-lg">{weight || 'Not set'}</span>
//             )}
//           </div>

//           <div className="flex justify-between items-center">
//             <span className="text-lg font-medium text-indigo-600">Goal:</span>
//             {isEditing ? (
//               <input
//                 type="text"
//                 value={goal}
//                 onChange={(e) => setGoal(e.target.value)}
//                 className="mt-1 block w-1/2 rounded-md border border-indigo-300 px-3 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//               />
//             ) : (
//               <span className="text-lg">{goal || 'Not set'}</span>
//             )}
//           </div>

//           <div className="flex justify-between items-center">
//             <span className="text-lg font-medium text-indigo-600">Social Handles:</span>
//             {isEditing ? (
//               <input
//                 type="text"
//                 value={handles}
//                 onChange={(e) => setHandles(e.target.value)}
//                 className="mt-1 block w-1/2 rounded-md border border-indigo-300 px-3 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//               />
//             ) : (
//               <span className="text-lg">{handles || 'Not set'}</span>
//             )}
//           </div>
//         </div>

//         {/* Save or Edit Button */}
//         <div className="text-center mt-6">
//           {isEditing ? (
//             <button
//               onClick={handleSave}
//               className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
//             >
//               Save Changes
//             </button>
//           ) : (
//             <button
//               onClick={() => setIsEditing(true)}
//               className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
//             >
//               Edit Profile
//             </button>
//           )}
//         </div>

//         {/* Back to Home Button */}
//         <div className="text-center mt-4">
//           <button
//             onClick={() => navigate('/')}
//             className="text-sm text-indigo-600 hover:underline ml-1"
//           >
//             Back to Home
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [age, setAge] = useState<string | number>('');
  const [weight, setWeight] = useState<string | number>('');
  const [goal, setGoal] = useState<string>('');
  const [handles, setHandles] = useState<string>('');
  
  const navigate = useNavigate();
  const currentUser = useStore((state) => state.currentUser);

  // Update profile with user data
  useEffect(() => {
    if (currentUser) {
      setProfilePhoto(currentUser.profilePhoto || "https://via.placeholder.com/100");
      setAge(currentUser.age || '');
      setWeight(currentUser.weight || '');
      setGoal(currentUser.goal || '');
      setHandles(currentUser.handles || '');
    }
  }, [currentUser]);

  // Handle file selection for profile photo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string); // Set the image preview
      };
      reader.readAsDataURL(file); // Convert file to base64 for preview
    }
  };

  // Handle saving the profile data
  const handleSave = () => {
    // Simulate saving profile data (including the uploaded image)
    if (selectedFile) {
      // Here you would typically upload the file to a server
      console.log('Uploading file:', selectedFile);
    }
    setIsEditing(false);
    alert('Profile updated!');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl w-full px-6 py-8 bg-white shadow-lg rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-indigo-600">Your Profile</h2>
          <p className="text-indigo-500">Update your fitness journey and personal details</p>
        </div>

        {/* Profile Picture Section */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src={profilePhoto || "https://via.placeholder.com/100"}
              
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-600"
            />
            {isEditing && (
              <label
                htmlFor="profile-photo"
                className="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-2 cursor-pointer hover:bg-indigo-700 transition"
              >
                ✏️
                <input
                  id="profile-photo"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            )}
          </div>
        </div>

        {/* User Info Display */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-indigo-600">Name:</span>
            <span className="text-lg">{currentUser?.name}</span>
          </div>

          {/* Editable Fields */}
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-indigo-600">Age:</span>
            {isEditing ? (
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="mt-1 block w-1/2 rounded-md border border-indigo-300 px-3 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            ) : (
              <span className="text-lg">{age || 'Not set'}</span>
            )}
          </div>

          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-indigo-600">Weight:</span>
            {isEditing ? (
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="mt-1 block w-1/2 rounded-md border border-indigo-300 px-3 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            ) : (
              <span className="text-lg">{weight || 'Not set'}</span>
            )}
          </div>

          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-indigo-600">Goal:</span>
            {isEditing ? (
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="mt-1 block w-1/2 rounded-md border border-indigo-300 px-3 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            ) : (
              <span className="text-lg">{goal || 'Not set'}</span>
            )}
          </div>

          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-indigo-600">Social Handles:</span>
            {isEditing ? (
              <input
                type="text"
                value={handles}
                onChange={(e) => setHandles(e.target.value)}
                className="mt-1 block w-1/2 rounded-md border border-indigo-300 px-3 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            ) : (
              <span className="text-lg">{handles || 'Not set'}</span>
            )}
          </div>
        </div>

        {/* Save or Edit Button */}
        <div className="text-center mt-6">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Back to Home Button */}
        <div className="text-center mt-4">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-indigo-600 hover:underline ml-1"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}