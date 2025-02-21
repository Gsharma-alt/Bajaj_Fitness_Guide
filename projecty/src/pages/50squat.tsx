import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { useStore } from "../store/useStore";

const SOCKET_SERVER_URL = "http://localhost:5004"; // Ensure this matches your backend server
const VIDEO_FEED_URL = "http://localhost:5004/video_feed";
const STOP_TRACKING_URL = "http://localhost:5004/stop_tracking";
const TARGET_REPS = 50;
const POINTS_AWARDED = 150;

export default function SquatsChallenge() {
  const [reps, setReps] = useState(0);
  const [tracking, setTracking] = useState(false);
  const navigate = useNavigate();
  const addPoints = useStore((state) => state.addPoints);

  useEffect(() => {
    if (tracking) {
      const socket = io(SOCKET_SERVER_URL);

      socket.on("rep_count", (count) => {
        console.log("Reps received:", count);
        if (count <= TARGET_REPS) {
          setReps(count);
        }
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [tracking]);

  useEffect(() => {
    if (reps === TARGET_REPS) {
      addPoints(POINTS_AWARDED);
      alert(`Challenge Complete! You earned ${POINTS_AWARDED} points!`);
      navigate("/challenges");
    }
  }, [reps, addPoints, navigate]);

  const handleStartTracking = () => {
    setTracking(true);
  };

  const handleStopTracking = async () => {
    try {
      await fetch(STOP_TRACKING_URL);
      setTracking(false);
    } catch (error) {
      console.error("Error stopping tracking:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-indigo-600 p-6">
      <h1 className="text-3xl font-bold mb-4">50 Squats Challenge</h1>
      
      <p className="text-lg text-gray-700 mb-6 max-w-lg text-center">
        Perform squats by bending your knees and lowering your body while keeping your back straight. 
        Ensure your movements are visible and clear for the camera to detect.
      </p>

      <p className="text-xl font-semibold mb-4">Reps Completed: {reps} / {TARGET_REPS}</p>

      <div className="w-3/4 max-w-md h-64 border-4 border-indigo-600 rounded-lg flex items-center justify-center bg-white shadow-lg">
        {tracking ? (
          <img src={VIDEO_FEED_URL} alt="Squat Tracking" className="w-full h-full object-cover" />
        ) : (
          <p className="text-gray-500">Camera off</p>
        )}
      </div>

      <div className="mt-4">
        {!tracking ? (
          <button onClick={handleStartTracking} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Start Camera</button>
        ) : (
          <button onClick={handleStopTracking} className="px-4 py-2 bg-red-600 text-white rounded-lg">Stop Camera</button>
        )}
      </div>
    </div>
  );
}
