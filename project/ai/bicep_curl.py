from flask import Flask, render_template, Response, request, jsonify
import cv2
import mediapipe as mp
import pandas as pd

app = Flask(__name__)

# Load the CSV file
df = pd.read_csv("exercises.csv")

# Filter Bicep Curl Data (Ensure dataset has 'bicep curl' in the name)
bicep_curl_data = df[df["name"].str.contains("bicep curl", case=False, na=False)].iloc[0]

# Extract Required Information
equipment = bicep_curl_data["equipment"]

# Initialize Pose Detection
mp_pose = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils
pose = mp_pose.Pose()

# Variables
cap = None
curl_counter = 0
curl_position = None
movement_complete = False  # Track full rep completion
stability_check = []  # Track stability of the wrist position

# Set Threshold Based on Equipment
up_threshold = 0.05  # Adjusted for Bicep Curl
stability_threshold = 5  # Number of stable frames required before counting a rep

def generate_frames():
    global cap, curl_counter, curl_position, movement_complete, stability_check
    
    if cap is not None:
        cap.release()
    cap = cv2.VideoCapture(0)
    
    while cap.isOpened():
        success, frame = cap.read()
        if not success:
            break

        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(image)
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

        if results.pose_landmarks:
            landmarks = results.pose_landmarks.landmark
            elbow_y = landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y
            wrist_y = landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y

            # Stability check: ensure wrist position is stable over multiple frames
            stability_check.append(wrist_y)
            if len(stability_check) > stability_threshold:
                stability_check.pop(0)

            if max(stability_check) - min(stability_check) < 0.02:  # Ignore shaky movements
                # Track full rep (down + up movement = 1 rep)
                if wrist_y > elbow_y + up_threshold and curl_position != "down":
                    curl_position = "down"
                    movement_complete = False  # Rep not completed yet
                elif wrist_y < elbow_y - (up_threshold / 2) and curl_position == "down":
                    curl_position = "up"
                    if not movement_complete:  # Only count if full movement cycle
                        curl_counter += 1
                        movement_complete = True  # Mark rep as counted

            cv2.putText(image, f"Bicep Curls: {curl_counter}", (20, 100),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (250, 0, 0), 2, cv2.LINE_AA)
            mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)
        
        ret, buffer = cv2.imencode('.jpg', image)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
    
    cap.release()

@app.route('/')
def index():
    return render_template('crunch1.html')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/stop_tracking')
def stop_tracking():
    global cap
    if cap is not None:
        cap.release()
        cap = None
    return jsonify({"message": "Tracking stopped"})

if __name__ == '__main__':
     app.run(host='0.0.0.0', port=5002, debug=True)
