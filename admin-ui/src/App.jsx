import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CitrinaUnifiedPanel from "./components/CitrinaUnifiedPanel";
import HealthCheck from "./HealthCheck";

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white">
      <h1 className="text-3xl font-bold mb-4">🚀 منصة الإمبراطورية</h1>
      <p className="text-gray-400 mb-8">مرحبًا بك في مركز المشاريع المتكامل</p>

      <div className="flex space-x-4">
        <Link
          to="/health"
          className="px-5 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg"
        >
          🔍 فحص الاتصال
        </Link>

        <Link
          to="/citrina"
          className="px-5 py-3 bg-amber-400 text-black font-semibold rounded-lg hover:bg-amber-300"
        >
          🍊 لوحة Citrina الذكية
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/health" element={<HealthCheck />} />
        <Route path="/citrina" element={<CitrinaUnifiedPanel />} />
      </Routes>
    </Router>
  );
}
