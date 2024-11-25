from flask import Blueprint, request, jsonify

# Initialize Blueprint
customer_blueprint = Blueprint('customer', __name__)

# Route: Submit Review
@customer_blueprint.route('/customer/submit_review', methods=['POST'])
def submit_review():
    review_text = request.form.get('review')
    if not review_text:
        return jsonify({'error': 'No review provided'}), 400

    # Process or save review text (if needed)
    return jsonify({'message': 'Review submitted successfully', 'review': review_text})
