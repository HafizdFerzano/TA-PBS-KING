// app/components/Navbar.tsx
"use client";

import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-2xl font-bold title-font">
          Shape Explorer
        </a>
        <div className="hidden md:flex space-x-6">
          <a href="#home" className="hover:text-yellow-200">
            Home
          </a>
          <a href="#learn" className="hover:text-yellow-200">
            Learn
          </a>
          <a href="#scan" className="hover:text-yellow-200">
            AR Scan
          </a>
          <a href="#quiz" className="hover:text-yellow-200">
            Quiz
          </a>
          <a href="#about" className="hover:text-yellow-200">
            About
          </a>
        </div>
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars />
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-blue-700 mt-2 p-2 rounded-lg">
          <a href="#home" className="block py-2 hover:text-yellow-200">
            Home
          </a>
          <a href="#learn" className="block py-2 hover:text-yellow-200">
            Learn
          </a>
          <a href="#scan" className="block py-2 hover:text-yellow-200">
            AR Scan
          </a>
          <a href="#quiz" className="block py-2 hover:text-yellow-200">
            Quiz
          </a>
          <a href="#about" className="block py-2 hover:text-yellow-200">
            About
          </a>
        </div>
      )}
    </nav>
  );
}
