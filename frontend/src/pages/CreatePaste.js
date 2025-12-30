import React, { useState } from "react";

const CreatePaste = () => {
  const [content, setContent] = useState("");
  const [expiresIn, setExpiresIn] = useState("");
  const [maxViews, setMaxViews] = useState("");
  const [pasteId, setPasteId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreatePaste = async () => {
    if (!content) {
      setError("Paste content cannot be empty");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/paste", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          expiresIn: Number(expiresIn) || 0,
          maxViews: Number(maxViews) || 0,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create paste");
      } else {
        setPasteId(data._id); // store paste ID
        setContent(""); // reset input
        setExpiresIn("");
        setMaxViews("");
      }
    } catch (err) {
      setError("Failed to fetch paste");
      console.error(err);
    }

    setLoading(false);
  };

  const copyLink = () => {
    const link = `http://localhost:3000/paste/${pasteId}`;
    navigator.clipboard.writeText(link);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="container">
      <h2>Create Paste</h2>

      <textarea
        placeholder="Write your paste here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="input-group">
        <input
          type="number"
          placeholder="Expires in seconds (optional)"
          value={expiresIn}
          onChange={(e) => setExpiresIn(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max views (optional)"
          value={maxViews}
          onChange={(e) => setMaxViews(e.target.value)}
        />
      </div>

      <button onClick={handleCreatePaste} disabled={loading}>
        {loading ? "Creating..." : "Create Paste"}
      </button>

      {error && <p className="error">{error}</p>}

      {pasteId && (
        <div className="link-box">
          <input
            type="text"
            readOnly
            value={`http://localhost:3000/paste/${pasteId}`}
            onClick={(e) => e.target.select()}
          />
          <button className="copy-btn" onClick={copyLink}>
            Copy
          </button>
        </div>
      )}
    </div>
  );
};

export default CreatePaste;
