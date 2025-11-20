export default function NotesList({ notes, onDelete, onEdit }) {
  return (
    <div className="all-notes-container">
      {notes.length === 0 && <p>No notes yet 📘</p>}
      {notes.map((note) => (
        <div key={note.id} className="single-note-card">
          <h3>{note.title}</h3>
          <p><strong>{note.subject}</strong> — {note.date}</p>
          <p>{note.content}</p>
          <div style={{ display: "flex", gap: "5px" }}>
            <button className="edit-note-btn" onClick={() => onEdit(note)}>✏️ Edit</button>
            <button className="delete-note-btn" onClick={() => onDelete(note.id)}>🗑️ Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
