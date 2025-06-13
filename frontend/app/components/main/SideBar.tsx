"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import ShapesContent from "./content/ShapesContent";
import QrScanner from "./content/QrScanner";
import QuisChallange from "./content/QuisChallange";
import Link from "next/link";

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState("shapes");
  const router = useRouter();

  useEffect(() => {
    (window as any).playAudio = (shape: string) => {
      const audio = document.getElementById(
        `${shape}Audio`
      ) as HTMLAudioElement;
      if (audio) {
        audio.currentTime = 0;
        audio.play();
      }

      const messages: Record<string, string> = {
        square: "Square: 4 equal sides, 4 right angles!",
        triangle: "Triangle: 3 sides, 3 angles!",
        circle: "Circle: Round and smooth, no corners!",
        rectangle: "Rectangle: 4 sides, opposite sides equal!",
      };
    };
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; path=/; max-age=0";
    router.push("/");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-blue-100 text-blue-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 shadow-md space-y-6 h-screen overflow-hidden">
        <h1 className="text-2xl font-bold text-blue-800">Shape Explorer</h1>
        <nav className="space-y-4 sticky">
          <button
            onClick={() => setActiveTab("shapes")}
            className={`block w-full text-left font-semibold px-4 py-2 rounded-md hover:bg-blue-200 ${
              activeTab === "shapes" ? "bg-blue-300" : ""
            }`}
          >
            📚 Meet the Shapes!
          </button>

          <button
            onClick={() => setActiveTab("scanner")}
            className={`block w-full text-left font-semibold px-4 py-2 rounded-md hover:bg-blue-200 ${
              activeTab === "scanner" ? "bg-blue-300" : ""
            }`}
          >
            📱 AR Shape Scanner
          </button>

          <button
            onClick={() => setActiveTab("quiz")}
            className={`block w-full text-left font-semibold px-4 py-2 rounded-md hover:bg-blue-200 ${
              activeTab === "quiz" ? "bg-blue-300" : ""
            }`}
          >
            🧠 Shape Challenge!
          </button>

          <button
            onClick={handleLogout}
            className="block w-full text-left font-semibold px-4 py-2 rounded-md hover:bg-blue-200"
          >
            🚪 Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6 overflow-auto">
        {activeTab === "shapes" && <ShapesContent />}
        {activeTab === "scanner" && <QrScanner />}
        {activeTab === "quiz" && <QuisChallange />}
      </main>
    </div>
  );
}
