import { useNavigate } from "react-router-dom";

export default function FeatureSection() {
  const navigate = useNavigate();

  return (
    <section className="feature-section">
      <h3>✨ Explore Smart Features</h3>
      <div className="feature-grid">

        {/* AI Summaries */}
        <div 
          className="feature-card purple"
          onClick={() => navigate("/summaries")} 
          style={{ cursor: "pointer" }}
        >
          <img src="https://cdn-icons-png.flaticon.com/512/1903/1903162.png" alt="Summaries" />
          <h4>AI Summaries</h4>
          <p>Generate smart summaries from your notes using AI.</p>
          <button className="explore-btn">Explore</button>
        </div>

        {/* Quiz Generator */}
        <div 
          className="feature-card blue"
          onClick={() => navigate("/quiz")}    
          style={{ cursor: "pointer" }}
        >
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Quizzes" />
          <h4>Quiz Generator</h4>
          <p>Create interactive quiz questions to test your knowledge.</p>
          <button className="explore-btn">Explore</button>
        </div>

        {/* New Note */}
        <div className="feature-card pink">
          <img src="https://cdn-icons-png.flaticon.com/512/1048/1048953.png" alt="New Note" />
          <h4>New Note</h4>
          <p>Click below to create a new smart note and boost your productivity.</p>
          <button 
            className="explore-btn"
            onClick={() => navigate("/note-form")}
          >
            Explore
          </button>
        </div>

      </div>
    </section>
  );
}
