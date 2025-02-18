import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { useStore } from "../store/useStore";

const SOCKET_SERVER_URL = "http://localhost:5003"; // Ensure this matches your backend server running push-up detection
const TARGET_REPS = 30;
const POINTS_AWARDED = 100;

export default function PushupsChallenge() {
  const [reps, setReps] = useState(0);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();
  const addPoints = useStore((state) => state.addPoints);

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);

    socket.on("rep_count", (count) => {
      console.log("Reps received:", count); // Debugging check
      if (count <= TARGET_REPS) {
        setReps(count);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (reps === TARGET_REPS) {
      addPoints(POINTS_AWARDED);
      setShowMessage(true);  // Show brownie points message
      alert(`Challenge Complete! You earned ${POINTS_AWARDED} brownie points!`);
      navigate("/challenges");
    }
  }, [reps, addPoints, navigate]);

  const toggleCamera = () => {
    setIsCameraOn((prev) => !prev); // Toggle camera on/off
  };

  useEffect(() => {
    if (reps === TARGET_REPS) {
      setIsCameraOn(false); // Stop the camera feed after 30 reps
    }
  }, [reps]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-indigo-600 p-6">
      <h1 className="text-3xl font-bold mb-4">30 Pushups Challenge</h1>

      {/* Tutorial Message */}
      <p className="text-lg text-gray-700 mb-6 max-w-lg text-center">
        Perform push-ups by lowering your body and then lifting it back up while keeping your arms and back straight. 
        Ensure your movements are visible and clear for the camera to detect.
      </p>

      {/* Reps Counter */}
      <p className="text-xl font-semibold mb-4">Reps Completed: {reps} / {TARGET_REPS}</p>

      {/* Camera Box */}
      <div className="w-3/4 max-w-md h-64 border-4 border-indigo-600 rounded-lg flex items-center justify-center bg-white shadow-lg">
        {isCameraOn ? (
          <img
            id="webcam"
            className="w-full h-full object-cover"
            alt="Pushups Camera Feed"
            src="http://localhost:5003/video_feed"
          />
        ) : (
          <p className="text-gray-500">Camera is off. Press Start to begin.</p>
        )}
      </div>

      {/* Start/Stop Button */}
      <button
        onClick={toggleCamera}
        className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        {isCameraOn ? "Stop Camera" : "Start Camera"}
      </button>

      {/* Message after Completing 30 Reps */}
      {showMessage && (
        <div className="mt-6 p-4 bg-green-500 text-white rounded-lg">
          <p className="font-semibold text-lg">Congratulations!</p>
          <p>You have earned {POINTS_AWARDED} brownie points!</p>
        </div>
      )}

      {/* Debugging Info */}
      <p className="text-sm text-gray-500 mt-4">Ensure your webcam is enabled and tracking correctly.</p>
    </div>
  );
}
