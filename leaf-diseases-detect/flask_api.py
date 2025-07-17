from flask import Flask, request, jsonify
import cv2 as cv
import numpy as np
import keras
from PIL import Image
import io

app = Flask(__name__)

label_name = ['Apple scab','Apple Black rot', 'Apple Cedar apple rust', 'Apple healthy', 'Cherry Powdery mildew',
'Cherry healthy','Corn Cercospora leaf spot Gray leaf spot', 'Corn Common rust', 'Corn Northern Leaf Blight','Corn healthy', 
'Grape Black rot', 'Grape Esca', 'Grape Leaf blight', 'Grape healthy','Peach Bacterial spot','Peach healthy', 'Pepper bell Bacterial spot', 
'Pepper bell healthy', 'Potato Early blight', 'Potato Late blight', 'Potato healthy', 'Strawberry Leaf scorch', 'Strawberry healthy',
'Tomato Bacterial spot', 'Tomato Early blight', 'Tomato Late blight', 'Tomato Leaf Mold', 'Tomato Septoria leaf spot',
'Tomato Spider mites', 'Tomato Target Spot', 'Tomato Yellow Leaf Curl Virus', 'Tomato mosaic virus', 'Tomato healthy']

model = keras.models.load_model('Training/model/Leaf Deases(96,88).h5')

@app.route('/predict', methods=['POST'])
def predict():
    file = request.files['file']
    img = Image.open(io.BytesIO(file.read())).convert('RGB')
    img = np.array(img)
    resized = cv.resize(img, (150, 150))
    normalized = np.expand_dims(resized, axis=0)

    predictions = model.predict(normalized)
    confidence = float(np.max(predictions)) * 100
    label = label_name[np.argmax(predictions)]

    if confidence >= 80:
        response = {
            'predicted_disease': label,
            'confidence_score': round(confidence),
            'is_healthy': 'healthy' in label.lower(),
            'risk_level': 'Low' if confidence < 85 else 'Medium' if confidence < 95 else 'High',
            'expected_date': '2025-07-15',
            'recommendations': ["Apply fungicide", "Avoid overhead watering", "Improve ventilation"]
        }
    else:
        response = {
            'error': 'Image confidence too low. Please upload another image.'
        }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=False, port=5000)
