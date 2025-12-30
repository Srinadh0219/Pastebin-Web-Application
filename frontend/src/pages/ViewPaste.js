import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();
  const [paste, setPaste] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPaste = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/paste/${id}`);
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Paste not found");
        } else {
          setPaste(data);
        }
      } catch (err) {
        setError("Failed to fetch paste");
      }
    };
    fetchPaste();
  }, [id]);

  return (
    <div className="container">
      <h2>View Paste</h2>

      {error && <p className="error">{error}</p>}

      {paste && (
        <div className="paste-box">
          <textarea readOnly value={paste.content} />
          <p>Views: {paste.views}</p>
        </div>
      )}
    </div>
  );
};

export default ViewPaste;
