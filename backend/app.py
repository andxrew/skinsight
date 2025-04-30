from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import base64
import io

model = load_model("mobilenetv2_skin_lesion.h5")

app = Flask(__name__)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json["image"]
        image_data = base64.b64decode(data)
        image = Image.open(io.BytesIO(image_data)).resize((224, 224))
        input_array = np.expand_dims(np.array(image) / 255.0, axis=0)
        prediction = model.predict(input_array)[0][0]
        label = "Malignant" if prediction > 0.5 else "Benign"
        return jsonify({"result": label, "confidence": float(prediction)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

