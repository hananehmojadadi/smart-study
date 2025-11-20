import React, { useState } from "react";
import { fetchAIQuiz } from "../AIHelpers";

export default function QuizGenerator() {
  const [text, setText] = useState("");
  const [quiz, setQuiz] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showPopup, setShowPopup] = useState(false); 
  const apiKey = import.meta.env.VITE_OPENAI_KEY;

  async function handleQuiz() {
    if (!apiKey) {
      setQuiz("⚠️ API key not found!");
      return;
    }
    if (!text.trim()) {
      setQuiz("⚠️ Please enter some text to generate a quiz.");
      return;
    }
    setLoading(true);
    setQuiz("");
    setSaved(false);
    try {
      const result = await fetchAIQuiz(apiKey, text);
      setQuiz(result);
    } catch (error) {
      setQuiz(`⚠️ Error creating quiz: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  function handleSaveQuiz() {
    if (!quiz) return;

    // Save only for SearchNotes
    const savedQuizzes = JSON.parse(localStorage.getItem("aiQuizzes")) || [];
    const newQuiz = {
      id: savedQuizzes.length ? savedQuizzes[savedQuizzes.length - 1].id + 1 : 1,
      title: text.slice(0, 50) || "AI Quiz",
      content: quiz,
    };
    savedQuizzes.push(newQuiz);
    localStorage.setItem("aiQuizzes", JSON.stringify(savedQuizzes));

    setSaved(true);


    window.dispatchEvent(new Event("storage"));

 
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000); 
  }

  function handleEditQuiz() {
    setText(quiz);
    setQuiz("");
    setSaved(false);
  }

  return (
    <div className="quiz-page">
      <h2 className="quiz-title">🗒️ Quiz Generator</h2>
      <p className="quiz-description">
        Paste your notes here. AI will create 3 short questions based on this text.
      </p>
      <textarea
        placeholder="Paste your notes here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        className="quiz-input"
      />
      <button
        onClick={handleQuiz}
        disabled={loading}
        className="quiz-button"
      >
        {loading ? "Generating..." : "Generate Quiz"}
      </button>

      {quiz && (
        <div className="quiz-output">
          <h3>Generated Quiz</h3>
          <pre>{quiz}</pre>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button className="openbutton" onClick={handleSaveQuiz}>
              Save Quiz
            </button>
            <button className="openbutton" onClick={handleEditQuiz}>
              Edit Quiz
            </button>
          </div>
        </div>
      )}

      {/* Glass toast popup at bottom-right corner */}
      {showPopup && (
        <div className="glass-popup-overlay">
          <div className="glass-popup-content">
            ✅ Quiz Saved!
          </div>
        </div>
      )}
    </div>
  );
}
