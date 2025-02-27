
import uvicorn
from dotenv import load_dotenv
import os
import google.generativeai as genai
from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
from PIL import Image
import base64
import json
import re
from fastapi.responses import JSONResponse
from huggingface_hub import InferenceClient

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load API keys
load_dotenv()
genai.configure(api_key=os.getenv("YOUR_GEMINI_API_KEY"))
client = InferenceClient(
    provider="hyperbolic",
    api_key=os.getenv("YOUR_HUGGINGFACE_API_KEY")
)

# Gemini Model
gemini_model = genai.GenerativeModel("gemini-1.5-flash")

def encode_image(image_bytes):
    """Convert image bytes to a base64-encoded string."""
    return base64.b64encode(image_bytes).decode("utf-8")

@app.post("/process-gemini/")
async def process_gemini(image: UploadFile, question: str = Form(...)):
    try:
        image_bytes = await image.read()
        encoded_image = encode_image(image_bytes)

        system_prompt = """
        You are an AI that provides structured responses in JSON format based on image analysis.
        If the question is about invoices, include 'invoice_id', 'date', 'items', and 'total_amount'.
        For general image descriptions, provide 'description', 'objects_detected', and 'colors'.
        Ensure the response is valid JSON.
        """

        response = gemini_model.generate_content([
            {"mime_type": "image/jpeg", "data": encoded_image},
            {"text": system_prompt + "\nUser Question: " + question}
        ])

        clean_text = response.text.strip()
        json_match = re.search(r"\{.*\}", clean_text, re.DOTALL)
        json_text = json_match.group() if json_match else "{}"

        try:
            json_response = json.loads(json_text)
        except json.JSONDecodeError:
            json_response = {"error": "Invalid JSON response from AI."}

        return JSONResponse(content=json_response)

    except Exception as e:
        return JSONResponse(content={"error": str(e)})

@app.post("/process-qwen/")
async def process_qwen(image: UploadFile, question: str = Form(...)):
    try:
        image_bytes = await image.read()
        image_path = "temp_image.jpg"
        with open(image_path, "wb") as f:
            f.write(image_bytes)

        messages = [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": question},
                    {"type": "image_url", "image_url": {"url": f"file://{image_path}"}}
                ]
            }
        ]

        completion = client.chat.completions.create(
            model="Qwen/Qwen2-VL-7B-Instruct",
            messages=messages,
            max_tokens=500,
        )

        response_text = completion.choices[0].message.text
        return JSONResponse(content={"response": response_text})

    except Exception as e:
        return JSONResponse(content={"error": str(e)})

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
    