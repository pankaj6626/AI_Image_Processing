# AI Image Q&A Website

## Overview
The **AI Image Q&A Website** allows users to upload an image, ask questions related to the image, and receive responses using AI models. Users can select between **Gemini-1.5-Flash** and **Qwen2-VL-7B-Instruct** models to process their queries. The application is built with **React.js** for the frontend and **FastAPI** for the backend.

## Features
- 📷 **Upload an image** from your device.
- ❓ **Ask any question** related to the uploaded image.
- 🤖 **Select an AI model** (Gemini-1.5-Flash or Qwen2-VL-7B-Instruct).
- 🔍 **Receive AI-generated answers** in JSON format.
- 🖥️ **Modern UI** with smooth interactions and enhanced styling.

## Tech Stack
### Frontend:
- **React.js** (for user interface)
- **Bootstrap** (for styling)
- **Axios** (for API requests)

### Backend:
- **FastAPI** (for handling API requests)
- **Hugging Face Models** (for image processing & Q&A)

## Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/ai-image-qa.git
cd ai-image-qa
```

### 2️⃣ Install Dependencies
#### Frontend:
```bash
cd frontend
npm install
```
#### Backend:
```bash
cd backend
pip install -r requirements.txt
```

### 3️⃣ Start the Application
#### Run the FastAPI Backend:
```bash
uvicorn main:app --reload
```

#### Run the React Frontend:
```bash
cd frontend
npm start
```

## Usage
1. Open the application in your browser (`http://localhost:3000`).
2. Click **"Choose an Image"** and upload a file.
3. Enter a question related to the image.
4. Select an AI model (**Gemini-1.5-Flash** or **Qwen2-VL-7B-Instruct**).
5. Click **"Get Answer"** to receive the response.
6. View the response in JSON format on the frontend.

## API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| `POST` | `/process-gemini/` | Processes the image and question using Gemini-1.5-Flash model |
| `POST` | `/process-qwen/` | Processes the image and question using Qwen2-VL-7B-Instruct model |

## Screenshots
📌 Add relevant screenshots of your project here.

## Contributing
Feel free to fork the repository and submit pull requests.

## License
This project is licensed under the MIT License.

## Contact
For any queries, reach out via **your.email@example.com** or connect on **LinkedIn**.

---
🚀 **Enjoy AI-powered image Q&A!**

