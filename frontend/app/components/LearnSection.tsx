// app/components/LearnSection.tsx
"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons/faVolumeUp";
import axios from "axios";
import Image from "next/image";

type Shape = {
  id: number;
  shape: string;
  title: string;
  color: string;
  formulaArea: string;
  formulaPerimeter: string;
  content: string;
};

export default function LearnSection() {
  const [show, setShow] = useState(false);

  const [shapes, setShapes] = useState<Shape[]>([]);

  const fetchShapes = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/bangun-datar`);
      setShapes(res.data);
    } catch (err) {
      console.error("Gagal ambil data shapes:", err);
    }
  };

  // useEffect(() => {
  // Function to play audio with alert
  useEffect(() => {
    fetchShapes();

    // Play audio dan alert
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
    setTimeout(() => setShow(true), 100); // delay kecil agar transisi smooth
  }, []);
  // })


  return (
    <section
      id="learn"
      className={`py-16 px-4 bg-blue-50 transition-all duration-1000 ease-out transform ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-x-8"
      }`}
    >
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center title-font text-blue-800">
          Meet the Shapes!
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {shapes.map((s, i) => (
            <ShapeCardTest
              key={i}
              shape={s.shape}
              title={s.title}
              color={s.color}
              formulaArea={s.formulaArea}
              formulaPerimeter={s.formulaPerimeter}
              content={s.content}
            />
          ))}
        </div>

        {/* Real World Examples */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-6 text-blue-800">
            Real World Examples
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {examples.map(({ src, label }) => (
              <div key={label} className="bg-white p-4 rounded-lg shadow">
                <img src={src} alt={label} className="w-20 h-20 mx-auto mb-2" />
                <p>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Audio Elements */}

        <audio
          id="squareAudio"
          src="/sounds/test.mp3"
        ></audio>
        <audio
          id="triangleAudio"
          src="/sounds/test.mp3"
        ></audio>
        <audio
          id="circleAudio"
          src="/sounds/test.mp3"
        ></audio>
        <audio
          id="rectangleAudio"
          src="/sounds/test.mp3"
        ></audio>
      </div>
    </section>
  );
}

function ShapeCard({
  shape,
  title,
  color,
  formulaArea,
  formulaPerimeter,
  content,
}: {
  shape: string;
  title: string;
  color: string;
  formulaArea: string;
  formulaPerimeter: string;
  content: React.ReactNode;
}) {
  return (
    <div className="shape-card bg-white p-6 rounded-xl shadow-md text-center">
      <div
        className={`w-32 h-32 bg-${color}-100 mx-auto mb-4 flex items-center justify-center rounded-lg`}
      >
        {content}
      </div>
      <h3 className={`text-2xl font-bold mb-2 text-${color}-600`}>{title}</h3>
      <p className="text-gray-700 mb-3">{getDescription(title)}</p>
      <div className="text-sm bg-gray-100 p-2 rounded">
        <p>
          <span className="font-bold">Area:</span> {formulaArea}
        </p>
        <p>
          <span className="font-bold">Perimeter:</span> {formulaPerimeter}
        </p>
      </div>
      <button
        className={`mt-4 bg-${color}-500 hover:bg-${color}-600 text-white py-2 px-4 rounded-full text-sm transition-all`}
        onClick={() => (window as any).playAudio(shape)}
      >
        <FontAwesomeIcon icon={faVolumeUp} className="w-6" /> Hear About {title}
      </button>
    </div>
  );
}

function ShapeCardTest({
  shape,
  title,
  color,
  formulaArea,
  formulaPerimeter,
  content,
}: {
  shape: string;
  title: string;
  color: string;
  formulaArea: string;
  formulaPerimeter: string;
  content: string;
}) {
  return (
    <div className="shape-card bg-white p-6 rounded-xl shadow-md text-center">
      <div
        className={`w-32 h-32 bg-${color}-100 mx-auto mb-4 flex items-center justify-center rounded-lg`}
      >
        <Image
          src={content}
          height={300}
          width={300}
          alt={title}
          className="object-fill"
        />
      </div>
      <h3 className={`text-2xl font-bold mb-2 text-${color}-600`}>{title}</h3>
      <p className="text-gray-700 mb-3">{getDescription(title)}</p>
      <div className="text-sm bg-gray-100 p-2 rounded">
        <p>
          <span className="font-bold">Area:</span> {formulaArea}
        </p>
        <p>
          <span className="font-bold">Perimeter:</span> {formulaPerimeter}
        </p>
      </div>
      {/* <p>wefasdfas</p> */}
      <button
        className={
          `mt-4 bg-${color}-500
           hover:bg-${color}-600 text-white py-2 px-4 rounded-full text-sm transition-all`
        }
        onClick={() => (window as any).playAudio(shape)}
      >
        <FontAwesomeIcon icon={faVolumeUp} className="w-6" /> Hear About {title}
      </button>
    </div>
  );
}

function getDescription(shape: string) {
  switch (shape.toLowerCase()) {
    case "square":
      return "4 equal sides, 4 right angles";
    case "triangle":
      return "3 sides, 3 angles";
    case "circle":
      return "Perfectly round, no corners";
    case "rectangle":
      return "4 sides, 4 right angles";
    default:
      return "";
  }
}

const examples = [
  {
    src: "/windows.png",
    label: "Windows",
  },
  {
    src: "/pizza-slice.png",
    label: "Pizza Slices",
  },
  {
    src: "/clock.png",
    label: "Clocks",
  },
  {
    src: "/door.png",
    label: "Doors",
  },
];
