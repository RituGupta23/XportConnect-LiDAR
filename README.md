
# **LiDAR: Simplifying Cross-Border Exports Between Carriers and Sellers**

### **Overview**
LiDAR is an AI-driven platform designed to streamline communication and processes for Indian SMBs engaged in cross-border exports. By leveraging advanced machine learning models, the platform simplifies damage detection, accelerates claim resolution, and provides actionable insights into logistics and customer feedback. LiDAR empowers sellers to optimize operations and reduce disputes, ensuring a seamless export experience.

---

## **Features**
1. **Automated Damage Detection**:
   - Uses image comparison and classification models to detect damaged products and attribute faults to logistics or sellers.

2. **One-Click Claim Submission**:
   - Simplifies the claims process with pre-filled forms offering multiple claim options (full refund, partial refund, replacement).

3. **Smart Packaging Recommendations**:
   - AI-driven packaging suggestions based on product fragility, shipping conditions, and environmental factors.

4. **Claim Analytics Dashboard**:
   - Provides sellers with insights into claim trends and logistics performance.

5. **Customer Feedback Analysis**:
   - Natural Language Processing (NLP) analyzes customer reviews and historical data for recurring issues and claims support.

---

## **Technology Stack**

### **Frontend**
- **React** and **TailwindCSS**: For a simple, customizable and intuitive user interface.
- **Chart.js**: For visualizing analytics and performance trends.

### **Backend**
- **Flask Framework**: Lightweight architecture to integrate and serve AI models as an API.
- **MongoDB**: Handles structured claim data and analytics for quick retrieval.
- **TensorFlow** and **Scikit-Learn**: Runs locally for image recognition and NLP-based sentiment analysis.

### **AI Models**
1. **Image Comparison Model**: Detects differences between seller-provided and customer-provided images.
2. **Review Analysis Model**: Classifies text reviews into logistic or seller-related issues.
3. **Image Classification Model**: Identifies damage types in product images.

### **File Management**
- Temporarily stores uploaded files in organized local directories for processing.
- Deletes files post-prediction to maintain disk space and user privacy.

---

## **Folder Structure**
```
project/
├── app.py                         # Main Flask application
├── models/                        # Directory for storing pre-trained models
│   ├── image_model.h5             # Image classification model
│   ├── text_model.pkl             # Review analysis model
│   ├── comparison_model.h5        # Image comparison model
├── static/                        # Static files
│   └── uploads/                   # Uploaded images directory
│       ├── seller/                # Seller's images
│       ├── customer/              # Customer's images
│       └── product/               # Product images
├── templates/                     # HTML templates
│   └── index.html                 # Upload and analysis form
└── requirements.txt               # Python dependencies
```

---

## **How to Run**
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/lidar
   cd lidar
   ```

2. **Set Up Environment**:
   - Install Python 3.8+.
   - Create and activate a virtual environment:
     ```bash
     python -m venv venv
     source venv/bin/activate  # On Windows: venv\Scripts\activate
     ```

3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Application**:
   ```bash
   python app.py
   ```
   The application will be available at `http://127.0.0.1:5000`.

5. **Upload Files and Analyze**:
   - Open the URL in your browser.
   - Upload seller, customer, and product images, and provide the review text.
   - View results and final conclusions.

---

## **Success Metrics**
- **User Adoption Rate**: Number of active sellers using the platform.
- **Reduction in Dispute Rates**: Fewer disputes due to accurate fault attribution.
- **Customer Satisfaction**: Improved feedback and reduced return rates.
- **Operational Efficiency**: Time saved on manual claim submissions and analysis.

---

## **Future Enhancements**
1. **Predictive Analytics**:
   - Implement machine learning models to predict potential issues based on historical trends.
2. **Expanded Data Sources**:
   - Incorporate data from social media reviews and third-party feedback platforms.
3. **Real-Time Alerts**:
   - Notify sellers and logistics partners of detected issues for faster resolutions.
4. **Scalability**:
   - Enhance the platform to handle larger data volumes and user requests.

---

## **Contributors**
- **Ritu Gupta**
- **Dhananjay Aggarwal**
- **Sripriya Agarwal**
- **Aarushi Sahu**
