import base64
import requests

# Load and encode image
with open("test.jpg", "rb") as img_file:

    base64_image = base64.b64encode(img_file.read()).decode("utf-8")


# Send POST request
response = requests.post("http://127.0.0.1:5000/predict", json={"image": base64_image})
print(response.json())
