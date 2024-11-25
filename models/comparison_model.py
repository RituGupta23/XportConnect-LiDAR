import os
import numpy as np
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, Conv2D, MaxPooling2D, Flatten, Dense, Lambda, Dropout
from tensorflow.keras.optimizers import Adam
from sklearn.model_selection import train_test_split
import tensorflow as tf


# Updated paths for seller and customer
seller_folder = r"C:\Users\HP\OneDrive\Desktop\Automated Damage Detection\app\datasets\customer- seller time pics\seller"
customer_folder = r"C:\Users\HP\OneDrive\Desktop\Automated Damage Detection\app\datasets\customer- seller time pics\customer"

# Function to preprocess an image
def preprocess_image(image_path, target_size=(224, 224)):
    img = load_img(image_path, target_size=target_size)
    img_array = img_to_array(img) / 255.0  # Normalize pixel values
    return img_array

# Function to create pairs and labels
def create_pairs(customer_folder, seller_folder, labels, target_size=(224, 224)):
    pairs = []
    targets = []

    customer_images = sorted(os.listdir(customer_folder))
    seller_images = sorted(os.listdir(seller_folder))

    if len(customer_images) != len(seller_images):
        raise ValueError("The number of customer and seller images must be the same for pairing.")

    for i, (cust_img, sell_img) in enumerate(zip(customer_images, seller_images)):
        cust_path = os.path.join(customer_folder, cust_img)
        sell_path = os.path.join(seller_folder, sell_img)

        # Preprocess images
        customer_image = preprocess_image(cust_path, target_size)
        seller_image = preprocess_image(sell_path, target_size)

        # Add pair and corresponding label
        pairs.append([customer_image, seller_image])
        targets.append(labels[i])

    return np.array(pairs), np.array(targets)

# Define the issue labels (0 for Logistic Issue, 1 for Seller Issue)
issues = [
    "Seller Issue", "Seller Issue", "Seller Issue", "Logistic Issue", "Logistic Issue",
    "Logistic Issue", "Logistic Issue", "Logistic Issue", "Logistic Issue", "Seller Issue",
    "Seller Issue", "Logistic Issue", "Logistic Issue", "Seller Issue", "Logistic Issue",
    "Seller Issue", "Seller Issue", "Seller Issue", "Seller Issue", "Seller Issue",
    "Seller Issue", "Seller Issue", "Seller Issue", "Logistic Issue", "Logistic Issue",
    "Seller Issue", "Seller Issue", "Logistic Issue", "Seller Issue", "Logistic Issue",
    "Seller Issue", "Logistic Issue", "Logistic Issue", "Logistic Issue", "Logistic Issue",
    "Seller Issue", "Logistic Issue", "Seller Issue", "Logistic Issue", "Logistic Issue",
    "Seller Issue", "Logistic Issue", "Logistic Issue", "Logistic Issue", "Logistic Issue",
    "Logistic Issue", "Seller Issue", "Seller Issue", "Seller Issue", "Logistic Issue",
    "Seller Issue", "Seller Issue", "Seller Issue", "Seller Issue", "Logistic Issue",
    "Seller Issue", "Seller Issue", "Seller Issue", "Seller Issue", "Seller Issue",
    "Seller Issue", "Logistic Issue", "Seller Issue", "Seller Issue", "Seller Issue",
    "Logistic Issue", "Seller Issue", "Seller Issue", "Seller Issue", "Seller Issue",
    "Seller Issue", "Logistic Issue", "Seller Issue", "Seller Issue", "Seller Issue",
    "Seller Issue", "Seller Issue", "Seller Issue", "Seller Issue", "Seller Issue",
    "Logistic Issue", "Logistic Issue", "Logistic Issue", "Seller Issue", "Logistic Issue",
    "Seller Issue", "Logistic Issue", "Logistic Issue", "Logistic Issue", "Logistic Issue",
    "Logistic Issue", "Logistic Issue", "Logistic Issue", "Logistic Issue", "Logistic Issue",
    "Seller Issue", "Logistic Issue"
]

labels = [1 if issue == "Seller Issue" else 0 for issue in issues]

# Create pairs and labels
pairs, targets = create_pairs(customer_folder, seller_folder, labels)

# Split data into training and validation sets
train_pairs, val_pairs, train_targets, val_targets = train_test_split(pairs, targets, test_size=0.2, random_state=42)

train_pairs_a = np.array([pair[0] for pair in train_pairs])
train_pairs_b = np.array([pair[1] for pair in train_pairs])
val_pairs_a = np.array([pair[0] for pair in val_pairs])
val_pairs_b = np.array([pair[1] for pair in val_pairs])

# Define the base model for feature extraction
def create_base_model(input_shape):
    input_layer = Input(shape=input_shape)
    x = Conv2D(64, (3, 3), activation='relu', padding='same')(input_layer)
    x = MaxPooling2D(pool_size=(2, 2))(x)
    x = Conv2D(128, (3, 3), activation='relu', padding='same')(x)
    x = MaxPooling2D(pool_size=(2, 2))(x)
    x = Conv2D(256, (3, 3), activation='relu', padding='same')(x)
    x = MaxPooling2D(pool_size=(2, 2))(x)
    x = Flatten()(x)
    x = Dense(512, activation='relu')(x)
    x = Dropout(0.5)(x)
    x = Dense(128, activation='relu')(x)
    return Model(input_layer, x)

# Define the Siamese network
def create_siamese_network(input_shape):
    base_model = create_base_model(input_shape)

    # Inputs for the two images
    input_a = Input(shape=input_shape)
    input_b = Input(shape=input_shape)

    # Feature extraction
    feature_a = base_model(input_a)
    feature_b = base_model(input_b)

    # Compute the absolute difference between the embeddings
    # Compute the absolute difference between the embeddings
    distance = Lambda(
    lambda tensors: tf.abs(tensors[0] - tensors[1]),
    output_shape=lambda input_shapes: input_shapes[0]  # Ensure output shape matches the input shape of feature_a
    )([feature_a, feature_b])


    # Add a classification layer
    output = Dense(1, activation='sigmoid')(distance)

    # Define the full model
    model = Model([input_a, input_b], output)
    return model

# Compile the model
input_shape = (224, 224, 3)
siamese_model = create_siamese_network(input_shape)
siamese_model.compile(optimizer=Adam(learning_rate=0.001), loss='binary_crossentropy', metrics=['accuracy'])

# Train the model
siamese_model.fit(
    [train_pairs_a, train_pairs_b], train_targets,
    validation_data=([val_pairs_a, val_pairs_b], val_targets),
    epochs=20,
    batch_size=16
)

# Save the trained model to a file
siamese_model.save('comparison_model.h5')

# Print confirmation message
print("Model saved to 'comparison_model.h5'")

