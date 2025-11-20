import { useState, useEffect } from "react";

export default function NoteForm({
  onSave,
  initialTitle = "",
  initialContent = "",
  initialSubject = "Note Massage",
  noteId,
  onEdit 
}) {
  const [note, setNote] = useState({ title: initialTitle, subject: initialSubject, content: initialContent });

  useEffect(() => {
    setNote({ title: initialTitle, subject: initialSubject, content: initialContent });
  }, [initialTitle, initialContent, initialSubject]);

  function handleChange(e) {
    setNote({ ...note, [e.target.name]: e.target.value });
  }

  function handleSave(e) {
    e.preventDefault();
    if (!note.content.trim()) return;

    onSave({ ...note, id: noteId || Date.now(), date: new Date().toLocaleDateString() });


    if (!noteId) setNote({ title: "", subject: "Note Massage", content: "" });
  }

  function handleEdit() {
    if (onEdit && noteId) {
      onEdit(note); 
    }
  }

  return (
    <form className="personal-note-form" onSubmit={handleSave}>
      <h2>📝 Note Form</h2>
      <input
        type="text"
        name="title"
        placeholder="Note title..."
        value={note.title}
        onChange={handleChange}
        required
      />
      <select name="subject" value={note.subject} onChange={handleChange} required>
        <option value="">Select subject</option>
        <option value="Science">Science</option>
        <option value="Chemistry">Chemistry</option>
        <option value="Biology">Biology</option>
        <option value="Python">Python</option>
        <option value="Math">Math</option>
        <option value="AI">AI</option>
      </select>
      <textarea
        name="content"
        placeholder="Write your note here..."
        value={note.content}
        onChange={handleChange}
        required
      />
      <div className="form-buttons" style={{ display: "flex", gap: "10px" }}>
        <button type="submit" className="save-btn">
          {noteId ? "Update Note" : "Save Note"}
        </button>
         <button type="submit" className="save-btn">
          {noteId ? "Update Note" : "Edit Note"}
        </button>
      </div>
    </form>
  );
}
