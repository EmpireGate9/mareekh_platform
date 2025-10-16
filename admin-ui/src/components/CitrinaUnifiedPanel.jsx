import React, { useState } from "react";
import { motion } from "framer-motion";

export default function CitrinaUnifiedPanel() {
  const [lang, setLang] = useState("EN");
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [role, setRole] = useState("user");

  const platforms = ["AlMareekh", "AutoVision", "Hikma", "VisionMonitor"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white flex flex-col">
      {!selectedPlatform && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8 }}
          className="flex-1 flex flex-col items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            className="text-6xl font-bold text-amber-400 select-none"
          >
            🍊 Citrina
          </motion.div>
          <p className="text-gray-400 mt-4 text-sm tracking-wide">
            Unified Intelligent Panel
          </p>

          <div className="mt-8">
            <select
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="bg-gray-800 border border-gray-700 px-4 py-2 rounded-md text-sm"
            >
              <option value="">Select Platform</option>
              {platforms.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={() =>
                setRole((prev) => (prev === "admin" ? "user" : "admin"))
              }
              className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-lg"
            >
              Switch to {role === "admin" ? "User" : "Admin"} Mode
            </button>
          </div>
        </motion.div>
      )}

      {selectedPlatform && (
        <div className="flex flex-col flex-1">
          <div className="flex items-center justify-between p-4 bg-gray-800/80 backdrop-blur-md border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="text-2xl font-bold text-amber-400">🍊 Citrina</div>
              <span className="text-sm text-gray-400">
                {role === "admin" ? "Admin" : "User"}
              </span>
              <span className="text-xs text-gray-500">
                ({selectedPlatform})
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setLang(lang === "EN" ? "AR" : "EN")}
                className="border border-gray-600 px-3 py-1 rounded-md hover:bg-gray-700"
              >
                {lang}
              </button>
              <button
                onClick={() => setSelectedPlatform(null)}
                className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded-md"
              >
                Exit
              </button>
            </div>
          </div>

          <div className="flex flex-1">
            <div className="w-20 bg-gray-800 flex flex-col items-center py-6 space-y-4 border-r border-gray-700">
              <button>📊</button>
              <button>📁</button>
              <button>🧠</button>
              <button>⚙️</button>
            </div>

            <div className="flex-1 p-6">
              <div className="bg-gray-900/50 border border-gray-700 shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold text-amber-400 mb-4">
                  {role === "admin" ? "Admin Dashboard" : "User Panel"}
                </h2>
                <p className="text-gray-400 text-sm">
                  Welcome to{" "}
                  <span className="text-amber-400">{selectedPlatform}</span> platform.
                  Here you can manage data, view insights, and interact with intelligent tools.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
