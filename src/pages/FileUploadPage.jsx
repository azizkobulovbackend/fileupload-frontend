import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FileUploadPage = () => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [myUploads, setMyUploads] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchMyUploads();
  }, [token]);

  const fetchMyUploads = async () => {
    try {
      const response = await axios.get("http://109.73.195.198:3000/auth/my-uploads", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMyUploads(response.data);
    } catch (error) {
      console.error("Error fetching uploads", error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://109.73.195.198:3000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setFileUrl(`http://109.73.195.198:3000/uploads/${response.data.shortCode}`);
      fetchMyUploads();
    } catch (error) {
      console.error("File upload failed", error);
      alert("Upload failed. Make sure you're logged in.");
    }
  };

  return (
    <div className="container">
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

      {myUploads.length > 0 && (
        <div style={{ marginTop: "30px", textAlign: "left" }}>
          <h2>My Uploads</h2>
          <ul>
            {myUploads.map((file) => (
              <li key={file.id}>
                <a href={file.url} target="_blank" rel="noopener noreferrer">
                  {file.originalName}
                </a>{" "}
                — expires at: {new Date(file.expiresAt).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUploadPage;
