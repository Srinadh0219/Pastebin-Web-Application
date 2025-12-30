import { useState } from "react";

const CreatePaste = () => {
  const [content, setContent] = useState("");
  const [maxViews, setMaxViews] = useState("");
  const [expiryMinutes, setExpiryMinutes] = useState("");
  const [loading, setLoading] = useState(false);
  const [pasteLink, setPasteLink] = useState("");

  const handleCreate = async () => {
    if (!content.trim()) {
      alert("Paste content required");
      return;
    }

    setLoading(true);
    setPasteLink("");

    try {
      const res = await fetch("https://pastebin-backend-0rbg.onrender.com/api/paste", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          maxViews: maxViews ? Number(maxViews) : null,
          expiryMinutes: expiryMinutes ? Number(expiryMinutes) : null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create paste");
      }

      // ✅ CREATE LINK
      const link = `${window.location.origin}/paste/${data._id}`;
      setPasteLink(link);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(pasteLink);
    alert("Link copied!");
  };

  return (
    <div className="container">
      <h2>Create Paste</h2>

      <textarea
        placeholder="Enter your paste content..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={8}
      />

      <div className="row">
        <input
          type="number"
          placeholder="Max Views"
          value={maxViews}
          onChange={(e) => setMaxViews(e.target.value)}
        />
        <input
          type="number"
          placeholder="Expiry (minutes)"
          value={expiryMinutes}
          onChange={(e) => setExpiryMinutes(e.target.value)}
        />
      </div>

      <button onClick={handleCreate} disabled={loading}>
        {loading ? "Creating..." : "Create Paste"}
      </button>

      {/* ✅ LINK SECTION */}
      {pasteLink && (
        <div className="link-box">
          <input value={pasteLink} readOnly />
          <button onClick={copyLink}>Copy</button>
        </div>
      )}
    </div>
  );
};

export default CreatePaste;
