from flask import Flask, render_template, Response, request, jsonify
import cv2
import mediapipe as mp
import pandas as pd

app = Flask(__name__)

# Load the CSV file
df = pd.read_csv("exercises.csv")

# Filter Crunches Data (Ensure dataset has 'crunch' in the name)
crunch_data = df[df["name"].str.contains("crunch", case=False, na=False)].iloc[0]

# Extract Required Information
equipment = crunch_data["equipment"]

# Initialize Pose Detection
mp_pose = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils
pose = mp_pose.Pose()

# Variables
cap = None
crunch_counter = 0
crunch_position = None
movement_complete = False  # Track full rep completion
warning_message = ""  # Warning for improper form

# Set Threshold Based on Equipment
down_threshold = 0.3  # Movement range for crunch detection
up_threshold = 0.15  # Adjusted for a natural crunch movement

def generate_frames():
    global cap, crunch_counter, crunch_position, movement_complete, warning_message
    
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
            head_y = landmarks[mp_pose.PoseLandmark.NOSE.value].y
            chest_y = landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y

            warning_message = ""  # Reset warning message
            if head_y > chest_y + 0.1:  # Ensure proper crunch movement
                warning_message = "Go lower!"
            elif head_y < chest_y - up_threshold and crunch_position != "up":
                crunch_position = "up"
                movement_complete = False  # Rep not completed yet
            elif head_y > chest_y + down_threshold and crunch_position == "up":
                crunch_position = "down"
                if not movement_complete:  # Only count if full movement cycle
                    crunch_counter += 1
                    movement_complete = True  # Mark rep as counted

            # Display crunch count
            cv2.putText(image, f"Crunches: {crunch_counter}", (25, 100),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2)
            
            
            
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
     app.run(host='0.0.0.0', port=5006, debug=True)
