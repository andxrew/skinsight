# Skinsight (Synoptic Project)

Skinsight is a cross-platform mobile application designed to help users analyze skin lesions using a deep learning model (MobileNetV2).
## 📱 Features

- **📷 Image Capture & Upload**: Scan skin lesions using your device’s camera or select from gallery.
- **🧠 AI-Powered Diagnosis**: Sends images to a Flask backend for binary classification (Benign vs Malignant) using a fine-tuned MobileNetV2 model.
- **📊 Confidence Score**: Displays model confidence percentage.
- **📝 Scan History**: Save and manage past scan results.
- **🏷️ Tagging**: Add and manage tags for your scans.
- **🌓 Theme Switching**: Toggle between light and dark themes.
- **♿ Accessibility Focus: Designed with accessibility in mind, following WCAG guidelines for color contrast, readable text sizes, and meaningful iconography.
- **📆 Scan Reminders**: Reminds users to scan every 30 days based on the last scan.
- **📚 Education Page**: Learn about early signs of skin cancer with interactive accordions.
- **📬 Feedback Button**: Contact form via email.

## 🧠 Machine Learning Model

- **Model Used**: MobileNetV2
- **Framework**: TensorFlow
- **Dataset**: ISIC 2020 (Preprocessed and trained externally)
- **Output**: Binary classification (Malignant vs Benign)
- **Deployment**: The model is saved as `mobilenetv2_skin_lesion.h5` and loaded in a local Flask server.

---

## 🔧 Setup Instructions (Use IOS device if possible, app has been fine tuned for this platform)

### 1. 📦 Clone the Repository
```
git clone https://github.com/yourusername/skinsight.git
cd skinsight
```
2. 📱 Mobile App Setup (React Native + Expo)
Install dependencies:
```
npm install
```
or
```
npm install --legacy-peer-deps
```
> 🛠️ If prompted with version conflicts or dependency issues, use the --legacy-peer-deps flag to bypass strict version resolutions. This is due to Expo Go releasing a new version (SDK 53) right before the submission deadline.

Start the Expo development server:
```
npx expo start
```
Install Expo Go App, Sign in and Connect to application.
Make sure to test on a physical device or emulator with camera access.

3. 🔧 Backend (Flask API) Setup
Navigate to the backend folder:
```
cd backend
```
(Optional) Create a virtual environment:
```
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```
Install dependencies:
```
pip install -r requirements.txt
```
Start the Flask server:
```
python app.py
```
You should see an output like:
```
Running on http://127.0.0.1:5000
```
Update IP Address in Mobile App
To connect the React Native app to the backend server, update the IP address in your app where the fetch request is made.

> In analyzing.tsx replace the ip address to your machines ip address in the fetch call
``` 
// Send image to backend API
			const response = await fetch("http://192.168.0.33:5000/predict", { // ⚠️ Replace with your local IPv4 address
				
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ image: base64Image }),
			})

```
Ensure Your Mobile Device Is on the Same Network
> ⚠️ Keep this Flask server running while using the app. It handles image analysis requests via an HTTP API, (Local Server in which the ML is hosted 
 and the app uses and API call to fetch from it.

📁 Project Structure
```
skinsight/
├── app/                    # React Native frontend, App routing
│   ├── (tabs)/             # Main screen routes (index, scan, history, etc.)
├── backend/                # Flask server and ML model
│   ├── app.py              # Flask API
│   ├── mobilenetv2_skin_lesion.h5  # Pretrained model
├── utils/              # Helpers (Database, Model integration)
├── components/         # React Reusable components 
├── Config Files etc
```

📌 Future Improvements
- Add user authentication

- Add user accounts
  
- Add user onboarding
  
- Cloud sync of scan history

- Integration with calendar reminders

