import React, { useState, useEffect } from "react";

interface WorkoutCameraProps {
  selectedExercise: string;
}

export function WorkoutCamera({ selectedExercise }: WorkoutCameraProps) {
  const [isStarted, setIsStarted] = useState(false);
  const [videoFeedUrl, setVideoFeedUrl] = useState<string | null>(null);

  useEffect(() => {
    const stopTracking = async () => {
      // Stop tracking for the previous exercise
      if (videoFeedUrl) {
        try {
          const stopUrl = videoFeedUrl.replace("video_feed", "stop_tracking");
          await fetch(stopUrl);
          console.log(`Stopped tracking for ${selectedExercise}`);
        } catch (error) {
          console.error("Error stopping tracking:", error);
        }
      }
    };

    const startTracking = async () => {
      if (isStarted) {
        // Determine the new video feed URL based on the selected exercise
        let newVideoFeedUrl = null;
        if (selectedExercise.toLowerCase() === "bicep curls") {
          newVideoFeedUrl = "http://localhost:5002/video_feed";
        } else if (selectedExercise.toLowerCase() === "side stretch warmup") {
          newVideoFeedUrl = "http://localhost:5005/video_feed";
        } else if (selectedExercise.toLowerCase() === "crunches") {
          newVideoFeedUrl = "http://localhost:5006/video_feed";
        }
        else if (selectedExercise.toLowerCase() === "squats") {
          newVideoFeedUrl = "http://localhost:5004/video_feed";
        }
        else if (selectedExercise.toLowerCase() === "push-ups") {
          newVideoFeedUrl = "http://localhost:5003/video_feed";
        }

        if (newVideoFeedUrl) {
          setVideoFeedUrl(newVideoFeedUrl);
          console.log(`Started tracking for ${selectedExercise}`);
        }
      } else {
        setVideoFeedUrl(null);
      }
    };

    // Stop the previous tracking and start the new one
    stopTracking().then(startTracking);

    // Cleanup function to stop tracking when the component unmounts
    return () => {
      stopTracking();
    };
  }, [selectedExercise, isStarted]);

  return (
    <div className="relative w-full">
      <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900">
        {isStarted && videoFeedUrl ? (
          <img
            key={videoFeedUrl} // Use videoFeedUrl as the key to force re-render
            src={videoFeedUrl}
            alt={`${selectedExercise} Counter`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-white text-lg">
            Click "Start Tracking" to begin AI-powered workout
          </div>
        )}

        <div className="absolute top-4 right-4">
          <button
            onClick={() => setIsStarted(!isStarted)}
            className={`px-4 py-2 rounded-full ${
              isStarted
                ? "bg-red-600 hover:bg-red-700"
                : "bg-indigo-600 hover:bg-indigo-700"
            } text-white font-medium transition-colors`}
          >
            {isStarted ? "Stop Tracking" : "Start Tracking"}
          </button>
        </div>
      </div>
    </div>
  );
}