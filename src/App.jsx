import React, { useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:3000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFileUrl(`http://localhost:3000/${response.data.filename}`);
    } catch (error) {
      console.error("File upload failed", error);
    }
  };

  return (
    <div>
      <h1>SafeDrop: File Upload</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>

      {fileUrl && (
        <div>
          <p>File uploaded successfully!</p>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            Access File
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
