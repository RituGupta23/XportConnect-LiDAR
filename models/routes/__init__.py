# routes/_init_.py

# Import the blueprints from their respective modules
from .customer import customer_blueprint
from .seller import seller_blueprint
from .predict import predict_bp

# Make the blueprints available for import when the package is imported
_all_ = ['customer_blueprint', 'seller_blueprint', 'predict_bp']