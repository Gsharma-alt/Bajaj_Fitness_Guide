from flask import Flask, render_template, Response, request, jsonify
import cv2
import mediapipe as mp
import pandas as pd

app = Flask(__name__)

# Load the CSV file
df = pd.read_csv("exercises.csv")

# Filter Push-Up Data (Ensure dataset has 'push-up' in the name)
pushup_data = df[df["name"].str.contains("push-up", case=False, na=False)].iloc[0]

# Extract Required Information
equipment = pushup_data["equipment"]

# Initialize Pose Detection
mp_pose = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils
pose = mp_pose.Pose()

# Variables
cap = None
pushup_counter = 0
pushup_position = None
movement_complete = False  # Track full rep completion
stability_check = []  # Track stability of the body position
warning_message = ""  # Warning for improper form

# Set Thresholds
down_threshold = 0.2  # Depth requirement for a valid push-up
up_threshold = 0.1  # Ensure full extension at the top
stability_threshold = 7  # Number of stable frames required before counting a rep

def generate_frames():
    global cap, pushup_counter, pushup_position, movement_complete, stability_check, warning_message
    
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
            shoulder_y = landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y
            elbow_y = landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y
            wrist_y = landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y
            hip_y = landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y

            # Stability check: ensure body position is stable over multiple frames
            stability_check.append(elbow_y)
            if len(stability_check) > stability_threshold:
                stability_check.pop(0)

            warning_message = ""  # Reset warning message
            if hip_y > shoulder_y - 0.05:  # Ensure proper body alignment
                warning_message = "Keep your body straight!"
            elif elbow_y > shoulder_y + down_threshold and pushup_position != "down":
                pushup_position = "down"
                movement_complete = False  # Rep not completed yet
            elif elbow_y < shoulder_y - up_threshold and pushup_position == "down":
                pushup_position = "up"
                if not movement_complete:  # Only count if full movement cycle
                    pushup_counter += 1
                    movement_complete = True  # Mark rep as counted

            # Display push-up count
            cv2.putText(image, f"Push-Ups: {pushup_counter}", (20, 50),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2)
            # Display warning message
            if warning_message:
                cv2.putText(image, warning_message, (20, 100),
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
            
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
     app.run(host='0.0.0.0', port=5003, debug=True)
