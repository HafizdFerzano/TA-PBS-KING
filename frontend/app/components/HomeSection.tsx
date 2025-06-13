"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function HomeSection() {
  const [target, setTarget] = useState("/login");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasToken = document.cookie.includes("token=");
    if (hasToken) {
      setTarget("/dashboard");
    }

    // Trigger animasi saat komponen mount
    setTimeout(() => setShow(true), 100); // delay kecil agar transisi smooth
  }, []);

  return (
    <section
      id="home"
      className={`py-16 px-4 h-90vh transition-all duration-1000 ease-out transform ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-x-8"
      }`}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 title-font text-blue-800">
            Discover <span className="text-yellow-500">Shapes</span> with AR!
          </h1>
          <p className="text-xl mb-8 text-blue-700">
            A fun, interactive way to learn about 2D shapes through augmented
            reality. Perfect for young explorers!
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href={target}
              className="bg-yellow-500 flex gap-x-2 items-center hover:bg-yellow-600 text-blue-900 font-bold py-3 px-6 rounded-full text-center transition-all transform hover:scale-105 shadow-lg"
            >
              {/* <FontAwesomeIcon icon={`fa-solid fa-camera`}/> */}
              <FontAwesomeIcon icon={faGraduationCap} className="w-8" />
              Start Learning
            </Link>
            <Link
              href="#scan"
              className="bg-blue-500 flex gap-x-2 items-center hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-center transition-all transform hover:scale-105 shadow-lg"
            >
              <FontAwesomeIcon icon={faCamera} className="w-7" />
              Scan Marker
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 relative">
          <Image
            src="/1.png"
            alt="Kids learning shapes"
            width={500}
            height={500}
            className="w-full max-w-lg mx-auto "
          />
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-300 rounded-full opacity-20 -z-10"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-300 rounded-full opacity-20 -z-10"></div>
        </div>
      </div>
    </section>
  );
}
