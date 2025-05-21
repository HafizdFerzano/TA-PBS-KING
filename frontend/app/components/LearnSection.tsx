// app/components/LearnSection.tsx
"use client";

import { useEffect } from "react";

export default function LearnSection() {
  useEffect(() => {
    // Function to play audio with alert
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

      alert(messages[shape]);
    };
  }, []);

  return (
    <section id="learn" className="py-16 px-4 bg-blue-50">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center title-font text-blue-800">
          Meet the Shapes!
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Square */}
          <ShapeCard
            shape="square"
            title="Square"
            color="red"
            formulaArea="side × side"
            formulaPerimeter="4 × side"
            content={<div className="w-24 h-24 bg-red-500"></div>}
          />

          {/* Triangle */}
          <ShapeCard
            shape="triangle"
            title="Triangle"
            color="blue"
            formulaArea="½ × base × height"
            formulaPerimeter="sum of all sides"
            content={
              <div
                className="w-24 h-24 bg-blue-500"
                style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
              ></div>
            }
          />

          {/* Circle */}
          <ShapeCard
            shape="circle"
            title="Circle"
            color="green"
            formulaArea="π × radius²"
            formulaPerimeter="2 × π × radius"
            content={
              <div className="w-24 h-24 bg-green-500 rounded-full"></div>
            }
          />

          {/* Rectangle */}
          <ShapeCard
            shape="rectangle"
            title="Rectangle"
            color="purple"
            formulaArea="length × width"
            formulaPerimeter="2 × (length + width)"
            content={<div className="w-28 h-20 bg-purple-500"></div>}
          />
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
          src="https://www.soundjay.com/buttons/sounds/button-09.mp3"
        ></audio>
        <audio
          id="triangleAudio"
          src="https://www.soundjay.com/buttons/sounds/button-09.mp3"
        ></audio>
        <audio
          id="circleAudio"
          src="https://www.soundjay.com/buttons/sounds/button-09.mp3"
        ></audio>
        <audio
          id="rectangleAudio"
          src="https://www.soundjay.com/buttons/sounds/button-09.mp3"
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
        <i className="fas fa-volume-up mr-1"></i> Hear About {title}
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
