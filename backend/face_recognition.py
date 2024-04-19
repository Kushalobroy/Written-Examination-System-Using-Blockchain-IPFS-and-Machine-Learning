# Install required libraries

from flask import Flask, request, jsonify
import cv2
import numpy as np

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


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000)
