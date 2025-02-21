import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { useStore } from "../store/useStore";

const SOCKET_SERVER_URL = "http://localhost:5002"; // Socket URL for Bicep Curl challenge, ensure backend is running on this port
const TARGET_CURLS = 40;
const POINTS_AWARDED = 175;

export default function BicepCurlChallenge() {
  const [curlCount, setCurlCount] = useState(0);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();
  const addPoints = useStore((state) => state.addPoints);

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);

    socket.on("curl_count", (count) => {
      console.log("Curls received:", count); // Debugging check
      if (count <= TARGET_CURLS) {
        setCurlCount(count);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (curlCount === TARGET_CURLS) {
      addPoints(POINTS_AWARDED);
      setShowMessage(true);  // Show brownie points message
      alert(`Challenge Complete! You earned ${POINTS_AWARDED} brownie points!`);
      navigate("/challenges");
    }
  }, [curlCount, addPoints, navigate]);

  const toggleCamera = () => {
    setIsCameraOn((prev) => !prev); // Toggle camera on/off
  };

  useEffect(() => {
    if (curlCount === TARGET_CURLS) {
      setIsCameraOn(false); // Stop the camera feed after 5 curls
    }
  }, [curlCount]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-indigo-600 p-6">
      <h1 className="text-3xl font-bold mb-4">5 Bicep Curls Challenge</h1>

      {/* Tutorial Message */}
      <p className="text-lg text-gray-700 mb-6 max-w-lg text-center">
        Perform bicep curls by lifting the weights towards your shoulders and lowering them back down in a controlled manner. 
        Ensure your arm movements are visible and accurate for the camera to detect.
      </p>

      {/* Curl Count Display */}
      <p className="text-xl font-semibold mb-4">Curls Completed: {curlCount} / {TARGET_CURLS}</p>

      {/* Camera Box */}
      <div className="w-3/4 max-w-md h-64 border-4 border-indigo-600 rounded-lg flex items-center justify-center bg-white shadow-lg">
        {isCameraOn ? (
          <img
            id="webcam"
            className="w-full h-full object-cover"
            alt="Bicep Curl Camera Feed"
            src="http://localhost:5002/video_feed"
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

      {/* Message after Completing 5 Curls */}
      {showMessage && (
        <div className="mt-6 p-4 bg-green-500 text-white rounded-lg">
          <p className="font-semibold text-lg">Congratulations!</p>
          <p>You have earned {POINTS_AWARDED} brownie points!</p>
        </div>
      )}

      {/* Debugging Info */}
      <p className="text-sm text-gray-500 mt-4">Ensure your camera is enabled and detecting your bicep curls correctly.</p>
    </div>
  );
}
