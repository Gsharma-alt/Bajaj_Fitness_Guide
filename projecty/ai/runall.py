import subprocess

# List of the Python scripts to run
scripts = [
    "bicep_curl.py",
    "crunches.py",
    "pushups.py",
    "side.py",
    "squat.py",
    "period.py"
]

# Running each script in a separate subprocess
processes = []
for script in scripts:
    process = subprocess.Popen(["python", script])
    processes.append(process)

# Wait for all processes to finish
for process in processes:
    process.communicate()
