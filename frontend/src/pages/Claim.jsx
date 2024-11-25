import React, { useState } from 'react';
import axios from 'axios';

const BASE_URL_TEXT = import.meta.env.VITE_API_BASE_URL_TEXT;
const BASE_URL_IMAGE = import.meta.env.VITE_API_BASE_URL_IMAGE;

const CustomerFeedback = () => {
  const [review, setReview] = useState('');
  const [reviewResponse, setReviewResponse] = useState('');
  const [image, setImage] = useState(null);
  const [imageResponse, setImageResponse] = useState(null);
  const [finalPrediction, setFinalPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Hardcoded image confidence value
  const imageConfidence = 0.9984223246574402;

  // Handle text review submission
  const handleReviewSubmit = async () => {
    if (!review.trim()) {
      setError('Please enter a review');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${BASE_URL_TEXT}/predict`, { review });
      console.log('Text Prediction Response:', response);
      setReviewResponse(response.data.label);
      const textProb = response.data.text_prob; // Get the text prediction probability
      calculateFinalPrediction(textProb, imageConfidence); // Calculate average prediction with hardcoded image confidence
    } catch (err) {
      console.error('Error submitting review:', err);
      setError('Error submitting review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle image upload
  const handleImageUpload = async (event) => {
    const file = event.target.files ? event.target.files[0] : null; // Ensure files array exists

    if (!file) {
      setError('Please select an image.');
      return;
    }

    // Optional: Check file size and type here
    if (file.size > 5 * 1024 * 1024) { // Example: limit size to 5MB
      setError('File size is too large. Please select a file under 5MB.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file.');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(`${BASE_URL_IMAGE}/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Image Prediction Response:', response);
      setImageResponse(response.data);
      const imagePredictionConfidence = response.data.confidence; // Get the image prediction confidence
      calculateFinalPrediction(reviewResponse?.text_prob, imagePredictionConfidence); // Use both review and image predictions
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('Error uploading image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Calculate the final prediction by averaging the probabilities
  const calculateFinalPrediction = (textProb, imageConfidence) => {
    if (textProb !== undefined && imageConfidence !== undefined) {
      const averagePrediction = (textProb + imageConfidence) / 2;
      setFinalPrediction(averagePrediction.toFixed(2)); // Rounded to 2 decimal places
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl mb-6 font-bold text-darkGrey">Claim</h2>

      
      {/* Image Upload Section */}
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mb-4"
        />
        <button
          onClick={handleImageUpload}
          className="bg-yellow text-white py-2 px-4 rounded-md hover:bg-yellowHover"
        >
          Upload Image
        </button>
        {imageResponse && (
          <div className="mt-4">
            <div className="text-lg">Prediction: {imageResponse?.prediction}</div>
            <div className="text-sm text-gray-600">Confidence: {imageResponse?.confidence}</div>
          </div>
        )}
      </div>

      {/* Text Review Section */}
      <div className="mb-6">
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review..."
          className="w-full p-4 border rounded-md"
          rows="4"
        />
        <button
          onClick={handleReviewSubmit}
          className="mt-4 bg-yellow text-white py-2 px-4 rounded-md hover:bg-yellowHover"
        >
          Submit Review
        </button>
        {reviewResponse && (
          <div className="mt-4 text-lg font-semibold">Response: {reviewResponse}</div>
        )}
      </div>

      
      

      {/* Final Prediction */}
      {finalPrediction !== null && (
        <div className="mt-4">
          <div className="text-lg font-semibold">Final Prediction: {finalPrediction}</div>
        </div>
      )}

      {/* Loading and Error Messages */}
      {/* {loading && <div className="mt-4 text-center text-gray-700">Processing...</div>}
      {error && <div className="mt-4 text-center text-red-500">{error}</div>} */}
    </div>
  );
};

export default CustomerFeedback;
