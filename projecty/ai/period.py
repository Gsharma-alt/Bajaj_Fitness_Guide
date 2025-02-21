from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np


app = Flask(__name__)
CORS(app)
# Load dataset
csv_path = "period.csv"  # Ensure the file is in the same directory
df = pd.read_csv(csv_path)

# Handling missing values
df.fillna(df.mean(numeric_only=True), inplace=True)

@app.route("/")
def home():
    return "Cycle Predictor API is running!"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Get JSON input
        data = request.get_json()

        # Extract relevant input fields
        required_columns = ['Age', 'BMI', 'CycleNumber', 'LengthofCycle']
        user_data = {col: float(data.get(col, np.nan)) for col in required_columns}

        # Check if required fields are provided
        if any(np.isnan(list(user_data.values()))):
            return jsonify({"error": "Missing values in input"}), 400

        # Compute basic predictions
        avg_cycle_length = df['LengthofCycle'].mean()
        next_cycle_length = (user_data['LengthofCycle'] + avg_cycle_length) / 2

        response = {
            "Predicted_Next_Cycle_Length": round(next_cycle_length, 1),
            "User_Data": user_data
        }

        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
