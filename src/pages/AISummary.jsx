import React, { useState } from "react";
import { fetchAISummary } from "../AIHelpers";

export default function AISummary() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const apiKey = import.meta.env.VITE_OPENAI_KEY;

  async function handleSummarize() {
    setLoading(true);
    setSummary("");
    setSaved(false);
    try {
      const result = await fetchAISummary(apiKey, text);
      setSummary(result);
    } catch {
      setSummary("⚠️ Error getting summary");
    } finally {
      setLoading(false);
    }
  }

  function handleSaveSummary() {
    if (!summary) return;

    // Save only for SearchNotes storage key
    const savedSummaries = JSON.parse(localStorage.getItem("aiSummaries")) || [];
    const newSummary = {
      id: savedSummaries.length ? savedSummaries[savedSummaries.length - 1].id + 1 : 1,
      title: text.slice(0, 50) || "AI Summary", 
      content: summary,
    };
    savedSummaries.push(newSummary);
    localStorage.setItem("aiSummaries", JSON.stringify(savedSummaries));

    setSaved(true);

    window.dispatchEvent(new Event("storage"));

    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000); 
  }

  function handleEditSummary() {
    setText(summary);
    setSummary("");
    setSaved(false);
  }

  return (
    <div className="summary-page">
      <h2>🧠 AI Summaries</h2>
      <textarea
        placeholder="Paste your notes here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="summary-textarea"
      />
      <button 
        onClick={handleSummarize} 
        disabled={loading} 
        className="action-btn"
      >
        {loading ? "Summarizing..." : "Summarize"}
      </button>

      {summary && (
        <div className="summary-output">
          <h3>Summary</h3>
          <pre style={{ whiteSpace: "pre-wrap" }}>{summary}</pre>

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button className="openbutton" onClick={handleSaveSummary}>
              Save Summary
            </button>
            <button className="openbutton" onClick={handleEditSummary}>
              Edit Summary
            </button>
          </div>
        </div>
      )}

      {/* Glass popup at top */}
      {showPopup && (
        <div className="glass-popup-overlay">
          <div className="glass-popup-content">
            ✅ Summary Saved!
          </div>
        </div>
      )}
    </div>
  );
}
