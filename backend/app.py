# Install required libraries

from flask import Flask, request, jsonify , render_template, Response
import cv2
import numpy as np
import tkinter as tk
from tkinter import messagebox
import threading
import base64
app = Flask(__name__)

# Load the pre-trained Haar Cascade face detection model
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# Function to preprocess and extract face embeddings
def extract_face_embeddings(image):
    # Detect faces
    faces = face_cascade.detectMultiScale(image, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
    
    if len(faces) == 0:
        raise ValueError("No face detected")
    
    # Take the first detected face
    x, y, w, h = faces[0]
    face = image[y:y+h, x:x+w]
    
    # Preprocess face (resize, convert to grayscale, etc.)
    face = cv2.resize(face, (160, 160))
    face_gray = cv2.cvtColor(face, cv2.COLOR_BGR2GRAY)
    
    # Convert face to tensor and normalize
    face_tensor = np.expand_dims(face_gray, axis=0).astype(np.float32) / 255.0
    
    return face_tensor

# Define endpoint for face recognitionp
@app.route('/recognize-face', methods=['POST'])
def recognize_face():
    try:
        # Get data from request
        data = request.get_json()
        captured_image = data.get('capturedImage')
        photo_path = data.get('photoPath')
        image1 = cv2.imread(captured_image)
        image2 = cv2.imread(photo_path)
        # Extract embeddings for both images
        embeddings1 = extract_face_embeddings(image1)
        embeddings2 = extract_face_embeddings(image2)

       # Calculate Euclidean distance between the embeddings
        euclidean_distance = np.linalg.norm(embeddings1 - embeddings2)

        # Normalize the distance to a similarity score (values closer to 0 indicate higher similarity)
        similarity_score = 1 / (1 + euclidean_distance)


        # Define a threshold (you may need to adjust this based on your requirements)
        threshold = 0.9

        # Determine whether the faces belong to the same person
        if similarity_score > threshold:
            return jsonify({'message': 'Verification Successfull.', 'similarity_score': similarity_score})
        else:
            return jsonify({'message': 'The faces belong to different persons.', 'similarity_score': similarity_score})

    except Exception as e:
        return jsonify({'error': str(e)}), 400


# Function to display alert message
def show_alert():
    root = tk.Tk()
    root.withdraw()  # Hide main window

    messagebox.showinfo("Motion Detected", "Motion has been detected!")

# Initialize background subtractor
bg_subtractor = cv2.createBackgroundSubtractorMOG2()

# Function to perform motion detection on received frames
def motion_detection(frame):
    # Decode base64 frame
    frame_data = base64.b64decode(frame)
    nparr = np.frombuffer(frame_data, np.uint8)
    frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    # Your motion detection logic here
    # Preprocessing: Convert frame to grayscale
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Background subtraction
    fg_mask = bg_subtractor.apply(gray)

    # Thresholding
    threshold = 254.9
    _, motion_mask = cv2.threshold(fg_mask, threshold, 255, cv2.THRESH_BINARY)

    # Blob detection
    count = 0
    contours, _ = cv2.findContours(motion_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    for contour in contours:
        area = cv2.contourArea(contour)
        if area > 200:  # Filter out small blobs
            x, y, w, h = cv2.boundingRect(contour)
            count += 1  # Increment count by 1
            if count == 30:
          # Show toast message for motion detection
                toast_message = "Motion detected!"
                return jsonify({"message": toast_message})
    
    # If no motion detected, return an empty response
    return jsonify({}) # Reset count to 0 after alert is triggered
    # Display frames
    # cv2.imshow('Motion Detection', frame)
    # cv2.imshow('Motion Mask', motion_mask)
    
    # Convert frame to JPEG format
    # _, jpeg = cv2.imencode('.jpg', frame)
    # frame_bytes = jpeg.tobytes()

    # return frame_bytes

# Route to accept frames and perform motion detection
@app.route('/liveProctoring', methods=['POST'])
def motion_detection_video():
    try:
        frame = request.json.get('frame')
        if frame:
            frame_bytes = motion_detection(frame)
            return Response(b'--frame\r\nContent-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n', mimetype='multipart/x-mixed-replace; boundary=frame')
        else:
            return Response("No frame received", status=400)
    except Exception as e:
        return Response("Error processing frame: {}".format(str(e)), status=500)



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000)
