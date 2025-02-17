from flask import Flask, render_template, Response, request, jsonify
import cv2
import mediapipe as mp
import pandas as pd

app = Flask(__name__)

# Load the CSV file
df = pd.read_csv("exercises.csv")

# Filter Squat Data (Ensure dataset has 'squat' in the name)
squat_data = df[df["name"].str.contains("squat", case=False, na=False)].iloc[0]

# Extract Required Information
equipment = squat_data["equipment"]

# Initialize Pose Detection
mp_pose = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils
pose = mp_pose.Pose()

# Variables
cap = None
squat_counter = 0
squat_position = None
movement_complete = False  # Track full rep completion
warning_message = ""  # Warning for improper form

# Set Threshold Based on Equipment
down_threshold = 0.3 if "body weight" in equipment.lower() else 0.4
up_threshold = 0.15  # Adjusted for a natural squat movement

def generate_frames():
    global cap, squat_counter, squat_position, movement_complete, warning_message
    
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
            hip_y = landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y
            knee_y = landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].y

            warning_message = ""  # Reset warning message
            if hip_y < knee_y - 0.1:  # Ensure proper squat depth
                warning_message = "Go lower!"
            elif knee_y > hip_y + down_threshold and squat_position != "down":
                squat_position = "down"
                movement_complete = False  # Rep not completed yet
            elif knee_y < hip_y + up_threshold and squat_position == "down":
                squat_position = "up"
                if not movement_complete:  # Only count if full movement cycle
                    squat_counter += 1
                    movement_complete = True  # Mark rep as counted

            # Display squat count
            cv2.putText(image, f"Squats: {squat_counter}", (20, 50),
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
     app.run(host='0.0.0.0', port=5004, debug=True)
