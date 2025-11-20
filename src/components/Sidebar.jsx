import { useState } from "react";
import { Link } from "react-router-dom";
import { SiHomeadvisor, SiOpenai, SiBookstack, SiReadthedocs, SiGooglekeep } from "react-icons/si";
import { FaGem } from "react-icons/fa";

export default function Sidebar() {
  const [showUpgrade, setShowUpgrade] = useState(false);

  // Helper to wrap icon with pink-blue-purple gradient
  const GradientIcon = ({ IconComponent, id }) => (
    <svg width="30" height="28" viewBox="0 0 24 24">
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EC4899" />  {/* Pink */}
          <stop offset="50%" stopColor="#3B82F6" />  {/* Blue */}
          <stop offset="100%" stopColor="#8B5CF6" /> {/* Purple */}
        </linearGradient>
      </defs>
      <IconComponent fill={`url(#${id})`} width="28" height="28" />
    </svg>
  );

  return (
    <>
      <aside className="sidebar">
        <div>
          <div className="logo">Smart Study</div>
          <nav className="nav">
            <Link to="/" className="nav-item">
              <GradientIcon IconComponent={SiHomeadvisor} id="grad1" /> Dashboard
            </Link>
            <Link to="/summaries" className="nav-item">
              <GradientIcon IconComponent={SiOpenai} id="grad2" /> AI Summaries
            </Link>
            <Link to="/quiz" className="nav-item">
              <GradientIcon IconComponent={SiReadthedocs} id="grad3" /> Quizzes
            </Link>
            <Link to="/note-form" className="nav-item">
              <GradientIcon IconComponent={SiBookstack} id="grad4" /> Create Notes
            </Link>
            <Link to="/smart-search" className="nav-item">
              <GradientIcon IconComponent={SiGooglekeep} id="grad5" /> Smart Search
            </Link>
          </nav>
        </div>
         <button className="upgrade-btn" onClick={() => setShowUpgrade(true)}>
        💎 Upgrade Plan
      </button>
      </aside>

      {showUpgrade && (
        <div className="upgrade-pop-overlay" onClick={() => setShowUpgrade(false)}>
          <div className="upgrade-pop-box" onClick={(e) => e.stopPropagation()}>
            <div className="premium-glow"></div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1040/1040230.png"
              alt="Premium Crown"
              className="upgrade-pop-image"
            />
            <h3>✨ Unlock Premium Access</h3>
            <p>
              Enjoy unlimited AI tools, advanced note intelligence, and priority support.
              <br />
              Upgrade to <b>Smart Study Premium</b> today!
            </p>
            <button
              className="upgrade-pop-close"
              onClick={() => setShowUpgrade(false)}
            >
              Upgrade Now – $4.99/month 💰
            </button>
          </div>
        </div>
      )}
    </>
  );
}
