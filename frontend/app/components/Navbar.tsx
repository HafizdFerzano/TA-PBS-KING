"use client";

import { useEffect, useState } from "react";
import { FaBars, FaUser } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      // Jika token ditemukan, redirect ke /dashboard
      router.push("/dashboard");
    }
  }, []);

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg ">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="#" className="text-2xl font-bold title-font">
          Shape Explorer
        </Link>
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/login" className="hover:text-yellow-200 text-xl">
            <FaUser />
          </Link>
        </div>
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-blue-700 mt-2 p-2 rounded-lg space-y-2">
          <Link href="#home" className="block py-2 hover:text-yellow-200">
            Home
          </Link>
          <Link href="#learn" className="block py-2 hover:text-yellow-200">
            Learn
          </Link>
          <Link href="#scan" className="block py-2 hover:text-yellow-200">
            AR Scan
          </Link>
          <Link href="#quiz" className="block py-2 hover:text-yellow-200">
            Quiz
          </Link>
          <Link href="#about" className="block py-2 hover:text-yellow-200">
            About
          </Link>
          <Link href="/login" className="block py-2 hover:text-yellow-200">
            <div className="flex items-center space-x-2">
              <FaUser />
              <span>Login</span>
            </div>
          </Link>
        </div>
      )}
    </nav>
  );
}
