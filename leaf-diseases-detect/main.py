
from flask import Flask, request, jsonify, send_from_directory
import os
import uuid
import cv2 as cv
import numpy as np
from keras.models import load_model
from PIL import Image
import io
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['UPLOAD_FOLDER'] = 'static/uploads'

label_name = ['Apple scab','Apple Black rot', 'Apple Cedar apple rust', 'Apple healthy', 'Cherry Powdery mildew',
'Cherry healthy','Corn Cercospora leaf spot Gray leaf spot', 'Corn Common rust', 'Corn Northern Leaf Blight','Corn healthy', 
'Grape Black rot', 'Grape Esca', 'Grape Leaf blight', 'Grape healthy','Peach Bacterial spot','Peach healthy', 'Pepper bell Bacterial spot', 
'Pepper bell healthy', 'Potato Early blight', 'Potato Late blight', 'Potato healthy', 'Strawberry Leaf scorch', 'Strawberry healthy',
'Tomato Bacterial spot', 'Tomato Early blight', 'Tomato Late blight', 'Tomato Leaf Mold', 'Tomato Septoria leaf spot',
'Tomato Spider mites', 'Tomato Target Spot', 'Tomato Yellow Leaf Curl Virus', 'Tomato mosaic virus', 'Tomato healthy']

model = load_model('model/Leaf Deases(96,88).h5')


@app.route('/')
def root():
    return "ML API is live"

@app.route('/predict', methods=['POST'])
def predict():
    file = request.files.get('file')
    if not file:
        return jsonify({'error': 'No file provided'}), 400

    try:
        # Save file to static/uploads with a unique name
        filename = f"{uuid.uuid4().hex}.jpg"
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        # Load and preprocess the image
        img = Image.open(file_path).convert('RGB')
        img_np = np.array(img)
        resized = cv.resize(img_np, (150, 150))
        normalized = np.expand_dims(resized, axis=0)

        predictions = model.predict(normalized)
        confidence = float(np.max(predictions)) * 100
        label = label_name[np.argmax(predictions)]

        if confidence < 80:
            return jsonify({'error': 'Low confidence. Try another image.'}), 400

        image_url = f"http://localhost:5050/static/uploads/{filename}"

        response = {
            'predicted_disease': label,
            'confidence_score': round(confidence),
            'is_healthy': 'healthy' in label.lower(),
            'risk_level': 'Low' if confidence < 85 else 'Medium' if confidence < 95 else 'High',
            'recommendations': [
                "Apply fungicide" if "rot" in label.lower() or "blight" in label.lower() else "Monitor regularly",
                "Avoid overhead watering",
                "Improve air circulation"
            ],
            'image_url': image_url  # ✅ send the URL to frontend
        }
        return jsonify(response)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Serve static images
@app.route('/static/uploads/<filename>')
def serve_image(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True, port=5050)
