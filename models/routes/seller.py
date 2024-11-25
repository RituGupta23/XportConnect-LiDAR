from flask import Blueprint, request, jsonify
import os

# Initialize Blueprint
seller_blueprint = Blueprint('seller', __name__)

# Route: Upload Pre-shipment Product Image
@seller_blueprint.route('/seller/upload_image', methods=['POST'])
def upload_seller_image():
    seller_image_file = request.files['seller_image']
    if not seller_image_file:
        return jsonify({'error': 'No image file provided'}), 400

    # Save seller image
    seller_image_path = os.path.join('temp', 'seller_image.jpg')
    seller_image_file.save(seller_image_path)

    return jsonify({'message': 'Seller image uploaded successfully', 'image_path': seller_image_path})
