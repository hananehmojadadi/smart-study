import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Dashboard from "./components/Dashboard";
import AISummary from "./pages/AISummary";
import QuizGenerator from "./pages/QuizGenerator";
import NotePage from "./pages/NotePage";
import SmartSearchPage from "./pages/SmartSearchPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/summaries" element={<AISummary />} />
        <Route path="/quiz" element={<QuizGenerator />} />
        <Route path="/note-form" element={<NotePage />} /> {/* مسیر فرم و لیست */}
         <Route path="/smart-search" element={<SmartSearchPage />} />
      </Routes>
    </Router>
  );
}

