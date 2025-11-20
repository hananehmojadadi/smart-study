import React, { useState, useEffect } from "react";

export default function SearchNotes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [notes, setNotes] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  // Load saved summaries and quizzes
  useEffect(() => {
    const summaries = JSON.parse(localStorage.getItem("aiSummaries")) || [];
    const quizzes = JSON.parse(localStorage.getItem("aiQuizzes")) || [];
    const combined = [
      ...summaries.map(s => ({ ...s, type: "summary" })),
      ...quizzes.map(q => ({ ...q, type: "quiz" }))
    ];
    setNotes(combined);
  }, []);


  useEffect(() => {
    const handleStorageChange = () => {
      const summaries = JSON.parse(localStorage.getItem("aiSummaries")) || [];
      const quizzes = JSON.parse(localStorage.getItem("aiQuizzes")) || [];
      const combined = [
        ...summaries.map(s => ({ ...s, type: "summary" })),
        ...quizzes.map(q => ({ ...q, type: "quiz" }))
      ];
      setNotes(combined);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);


  const filteredNotes = notes.filter(
    note =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Delete summary or quiz
  const handleDelete = (item) => {
    if (item.type === "summary") {
      const saved = JSON.parse(localStorage.getItem("aiSummaries")) || [];
      const updated = saved.filter(s => s.id !== item.id);
      localStorage.setItem("aiSummaries", JSON.stringify(updated));
    } else if (item.type === "quiz") {
      const saved = JSON.parse(localStorage.getItem("aiQuizzes")) || [];
      const updated = saved.filter(q => q.id !== item.id);
      localStorage.setItem("aiQuizzes", JSON.stringify(updated));
    }
    setNotes(notes.filter(n => n.id !== item.id));
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="search-page">
      <h2 className="page-title">🔍 AI Store Message</h2>

      <input
        type="text"
        placeholder="Search summaries or quizzes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-box"
      />

      <div className="notes-list">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              className="note-card"
              style={{ cursor: "pointer", position: "relative" }}
              onClick={() => setSelectedItem(note)}
            >
              <h3>{note.title}</h3>
              {note.type === "quiz" && (
                <h5 style={{ color: "#666", marginTop: "2px" }}>AI Quiz</h5>
              )}
              <button
                className="openbutton"
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  padding: "5px 10px",
                  fontSize: "12px",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(note);
                }}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="no-notes">No results for "{searchTerm}".</p>
        )}
      </div>

      {/* Modal to show full content */}
      {selectedItem && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              maxWidth: "80%",
              maxHeight: "80%",
              overflowY: "auto",
              boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedItem.title}</h2>
            {selectedItem.type === "quiz" && (
              <h5 style={{ color: "#666", marginTop: "5px" }}>AI Quiz</h5>
            )}
            <pre style={{ whiteSpace: "pre-wrap", fontSize: "14px" }}>
              {selectedItem.content}
            </pre>
            <button
              className="openbutton"
              onClick={() => setSelectedItem(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
