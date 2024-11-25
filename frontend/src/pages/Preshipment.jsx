import React, { useState } from 'react';

const Preshipment = () => {
  const [image, setImage] = useState(null); // State to store uploaded image
  const [message, setMessage] = useState(''); // State to store success/error messages

  // Handle the file change event
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Handle form submission (image upload)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setMessage('Please upload an image before submitting.');
      return;
    }

    // Here you can handle the image upload logic, e.g., using a service or API
    try {
      // Simulating upload process with a timeout
      // In a real case, you would send `image` to your backend API for storage
      setMessage('Uploading image...');
      setTimeout(() => {
        setMessage('Image uploaded successfully!');
      }, 1500);
    } catch (error) {
      setMessage('Failed to upload image.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-4 text-darkGrey">Preshipment Image Upload</h2>
      <form onSubmit={handleSubmit}>
        {/* File input for image */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-darkGrey">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* Displaying message */}
        {message && <p className="text-center text-green-600 mb-4">{message}</p>}

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-yellow text-white py-3 rounded-md"
        >
          Upload Image
        </button>
      </form>
    </div>
  );
};

export default Preshipment;
