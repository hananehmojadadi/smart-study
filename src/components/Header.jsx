import { useState } from "react";

export default function Header() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <header className="header gradient">
      <div className="header-content">
        <div>
          <h2>👋 Hi, Learner!</h2>
          <p>
            Welcome back to your <b>Smart Study Journal</b>
          </p>
          <button className="learn-btn" onClick={() => setShowPopup(true)}>
            Continue Learning
          </button>
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/2232/2232688.png"
          alt="Books"
          className="header-image"
        />
      </div>

      {/* POPUP MODAL */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <h3>🎯 Keep Going!</h3>
            <p>
              Every small step you take brings you closer to your goals.  
              Keep learning, growing, and believing in yourself 🌱✨
            </p>
            <button
              className="popup-close"
              onClick={() => setShowPopup(false)}
            >
              Awesome!
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
