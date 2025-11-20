import { useState } from "react";
import NoteForm from "../components/NoteForm";

export default function NotePage() {
  const [selectedNote, setSelectedNote] = useState(null);
  const [showPopup, setShowPopup] = useState(false);


  const handleSave = (note) => {
    if (!note.content.trim()) return;

    const newNote = {
      id: note.id || Date.now(),
      title: note.title || "Untitled",
      content: note.content,
      subject: note.subject || "Note Saved",
      date: new Date().toLocaleDateString(),
    };

    // Save to localStorage
    const saved = JSON.parse(localStorage.getItem("aiQuizzes")) || [];
    localStorage.setItem("aiQuizzes", JSON.stringify([newNote, ...saved]));

 
    setSelectedNote(null);

   
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);


    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="dashboard-container">
      <div className="left-panel">
        <NoteForm
          onSave={handleSave}
          initialTitle={selectedNote?.title || ""}
          initialContent={selectedNote?.content || ""}
          initialSubject={selectedNote?.subject || "Note Saved"}
          noteId={selectedNote?.id}
        />

        {/* Glass popup at top */}
        {showPopup && (
          <div className="glass-popup-overlay">
            <div className="glass-popup-content">✅ Note Saved!</div>
          </div>
        )}
      </div>

      <div className="right-panel">
        {/* No list here */}
      </div>
    </div>
  );
}
