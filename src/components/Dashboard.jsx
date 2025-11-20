import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import FeatureSection from "./FeatureSection";
import AISummary from "../pages/AISummary";
import QuizGenerator from "../pages/QuizGenerator";
import NotePage from "../pages/NotePage";

export default function Dashboard() {
  const [activeTool, setActiveTool] = useState(null); 

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main">
        <Header />

        {/* 🔹 Feature Cards on Top */}
        <FeatureSection onOpen={setActiveTool} />

        <Footer />

        {/* 🔹 Modal Popup for AI Tools */}
        {activeTool && (
          <div className="modal">
            <div className="modal-content">
              <button className="close-btn" onClick={() => setActiveTool(null)}>
                ✖
              </button>
              {activeTool === "summary" && <AISummary />}
              {activeTool === "quiz" && <QuizGenerator />}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
