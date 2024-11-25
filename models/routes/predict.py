import os
from flask import Blueprint, request, jsonify
from tensorflow.keras.models import load_model
import pickle
import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from tensorflow.keras.models import load_model
from tensorflow.keras.optimizers import Adam

# Blueprint for prediction routes
predict_bp = Blueprint('predict', __name__)

text_model = pickle.load(open('saved_models/text_model.pkl', 'rb'))  # Path to your text classification model
tfidf_vectorizer = pickle.load(open('saved_models/tfidf_vectorizer.pkl', 'rb'))  # Path to TF-IDF vectorizer


# Helper: Predict using Text Classification Model (Model 2)
def predict_review_classification(review_text):
    review_vector = tfidf_vectorizer.transform([review_text])  # Transform text using TF-IDF vectorizer
    prob = text_model.predict_proba(review_vector)[0][1]  # Probability for Logistic vs. Seller Fault
    return prob

# Prediction route
@predict_bp.route('/analyze', methods=['POST'])
def analyze():
    # Validate reques
    # Get uploaded files and review text
    review_text = request.form['review']

    text_prob = predict_review_classification(review_text)

    # # Combine predictions with weights
    # final_prob = 0.3 * image_prob + 0.3 * text_prob + 0.4 * comparison_prob
    # final_prediction = 'Logistic Damage' if final_prob >= 0.5 else 'Seller Fault'

    text_score = 0.3 * text_prob

    return jsonify({
        'text_model_score': text_score,
    })