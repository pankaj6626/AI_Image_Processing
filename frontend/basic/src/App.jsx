/*import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [image, setImage] = useState(null);
  const [question, setQuestion] = useState("");
  const [model, setModel] = useState("gemini-1.5-flash"); // Default model
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleModelChange = (event) => {
    setModel(event.target.value);
  };

  const processImage = async () => {
    if (!image || !question.trim()) return;
    setLoading(true);
    setResponse(null);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("question", question);

    // Determine the correct API endpoint based on the selected model
    const endpoint =
      model === "gemini-1.5-flash"
        ? "http://127.0.0.1:8000/process-gemini/"
        : "http://127.0.0.1:8000/process-qwen/";

    try {
      const res = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data) {
        setResponse(res.data);
      } else {
        setResponse({ error: "Error processing image." });
      }
    } catch (error) {
      setResponse({ error: "Server error." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container min-vh-100 d-flex flex-column align-items-center justify-content-center bg-dark text-white">
      <h1 className="text-center fw-bold mb-4">AI Image Q&A</h1>

      <div className="card p-4 shadow-lg bg-secondary text-white" style={{ maxWidth: "500px", width: "100%" }}>
        <input
          type="file"
          accept="image/*"
          className="form-control mb-3"
          onChange={handleImageChange}
        />

        <textarea
          className="form-control mb-3"
          rows="4"
          placeholder="Enter your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        
        <select className="form-control mb-3" value={model} onChange={handleModelChange}>
          <option value="gemini-1.5-flash">Gemini-1.5-Flash</option>
          <option value="Qwen2-VL-7B-Instruct">Qwen2-VL-7B-Instruct</option>
        </select>

        <button
          onClick={processImage}
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Processing..." : "Get Answer"}
        </button>
      </div>

      {response && (
        <div className="card mt-4 p-3 bg-light text-dark shadow-lg" style={{ maxWidth: "600px", width: "100%" }}>
          <h2 className="text-center">Response</h2>
          <pre className="bg-dark text-white p-3 rounded">{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;*/

import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaChevronDown, FaUpload, FaRobot } from "react-icons/fa";

function App() {
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(""); // Stores the selected image name
  const [question, setQuestion] = useState("");
  const [model, setModel] = useState("Select Model");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImageName(file.name); // Update the image name
    }
  };

  const handleModelChange = (event) => {
    setModel(event.target.value);
  };

  const processImage = async () => {
    if (!image || !question.trim()) {
      alert("Please select an image and enter a question!");
      return;
    }

    setLoading(true);
    setResponse(null);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("question", question);

    const endpoint =
      model === "gemini-1.5-flash"
        ? "http://127.0.0.1:8000/process-gemini/"
        : "http://127.0.0.1:8000/process-qwen/";

    try {
      const res = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResponse(res.data || { error: "No response data received." });
    } catch (error) {
      console.error("API error:", error);
      setResponse({ error: "Server error. Check console for details." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        width: "100vw",
        padding: "20px",
        background: "linear-gradient(135deg, #1f4037, #99f2c8)",
      }}
    >
      <div
        className="card p-5 shadow-lg text-white"
        style={{
          width: "70%",
          maxWidth: "800px",
          textAlign: "center",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
          boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
        }}
      >
        <h1 className="fw-bold mb-4" style={{ color: "green" }}>
          AI Image Q&A
        </h1>

        {/* Image Upload */}
        <div className="mb-3 text-start">
          <h6 className="text-dark fw-bold">Choose Image</h6>
          <label
            className="form-control d-flex align-items-center justify-content-center"
            style={{
              cursor: "pointer",
              background: "#fff",
              padding: "10px",
              borderRadius: "8px",
              fontWeight: "bold",
              transition: "0.3s",
            }}
          >
            <FaUpload style={{ marginRight: "8px", color: "#007bff" }} />
            {imageName ? `Selected: ${imageName}` : "Choose an Image"}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </label>
        </div>

        {image && (
          <div className="mb-3">
            <img
              src={URL.createObjectURL(image)}
              alt="Selected"
              style={{
                width: "100%",
                maxWidth: "300px",
                borderRadius: "8px",
                boxShadow: "0px 3px 10px rgba(0,0,0,0.2)",
              }}
            />
          </div>
        )}

        {/* Question Input */}
        <div className="mb-3 text-start">
          <h6 className="text-dark fw-bold">Enter Your Question</h6>
          <textarea
            className="form-control"
            rows="4"
            placeholder="Enter your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            style={{
              borderRadius: "8px",
              border: "none",
              padding: "10px",
              background: "#fff",
              fontSize: "16px",
            }}
          />
        </div>

        {/* Model Selection */}
        <div className="mb-3 text-start">
          <h6 className="text-dark fw-bold">Select Model</h6>
          <div className="position-relative">
            <select
              className="form-control"
              value={model}
              onChange={handleModelChange}
              style={{
                borderRadius: "8px",
                border: "none",
                padding: "10px",
                background: "#fff",
                fontSize: "16px",
                appearance: "none",
                position: "relative",
              }}
            >
              <option>Select Model</option>
              <option value="gemini-1.5-flash">Gemini-1.5-Flash</option>
              <option value="Qwen2-VL-7B-Instruct">Qwen2-VL-7B-Instruct</option>
            </select>
            <FaChevronDown
              style={{
                position: "absolute",
                right: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#007bff",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>

        {/* Process Button */}
        <button
          onClick={processImage}
          className="btn btn-primary w-100"
          disabled={loading}
          style={{
            background: "#007bff",
            border: "none",
            padding: "12px",
            borderRadius: "8px",
            fontSize: "18px",
            fontWeight: "bold",
            transition: "0.3s",
          }}
        >
          {loading ? "Processing..." : <><FaRobot /> Get Answer</>}
        </button>

        {/* Response Section */}
        {response && (
          <div
            className="card mt-4 p-3 shadow-lg"
            style={{
              width: "100%",
              background: "linear-gradient(135deg, #fff, #d7f3e3)",
              borderRadius: "8px",
            }}
          >
            <h2 className="text-center" style={{ color: "#333" }}>
              Response
            </h2>
            <pre
              className="p-3 rounded"
              style={{
                background: "#222",
                color: "#fff",
                textAlign: "left",
                overflowX: "auto",
                borderRadius: "8px",
              }}
            >
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
