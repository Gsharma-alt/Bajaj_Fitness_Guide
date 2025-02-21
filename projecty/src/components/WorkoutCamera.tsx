import React, { useState, useEffect } from "react";

interface WorkoutCameraProps {
  selectedExercise: string;
}

export function WorkoutCamera({ selectedExercise }: WorkoutCameraProps) {
  const [isStarted, setIsStarted] = useState(false);
  const [videoFeedUrl, setVideoFeedUrl] = useState<string | null>(null);

  useEffect(() => {
    const stopTracking = async () => {
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
        let newVideoFeedUrl = null;
        switch (selectedExercise.toLowerCase()) {
          case "bicep curls":
            newVideoFeedUrl = "http://localhost:5002/video_feed";
            break;
          case "stretch warmup":
            newVideoFeedUrl = "http://localhost:5005/video_feed";
            break;
          case "crunches":
            newVideoFeedUrl = "http://localhost:5006/video_feed";
            break;
          case "squats":
            newVideoFeedUrl = "http://localhost:5004/video_feed";
            break;
          case "push-ups":
            newVideoFeedUrl = "http://localhost:5003/video_feed";
            break;
          case "100 bicep curls":
            newVideoFeedUrl = "http://localhost:5002/video_feed";
            break;
            case "40 bicep curls":
            newVideoFeedUrl = "http://localhost:5002/video_feed";
            break;
          case "100 crunches":
            newVideoFeedUrl = "http://localhost:5006/video_feed";
            break;
          case "40 stretch":
            newVideoFeedUrl = "http://localhost:5005/video_feed";
            break;
          case "50 squats":
            newVideoFeedUrl = "http://localhost:5004/video_feed";
            break;
          case "30 pushups":
            newVideoFeedUrl = "http://localhost:5003/video_feed";
            break;
          default:
            break;
        }

        if (newVideoFeedUrl) {
          setVideoFeedUrl(newVideoFeedUrl);
          console.log(`Started tracking for ${selectedExercise}`);
        }
      } else {
        setVideoFeedUrl(null);
      }
    };

    stopTracking().then(startTracking);

    return () => {
      stopTracking();
    };
  }, [selectedExercise, isStarted]);

  return (
    <div className="relative w-full">
      <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900">
        {isStarted && videoFeedUrl ? (
          <img
            key={videoFeedUrl}
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
