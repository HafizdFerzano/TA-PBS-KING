"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons/faVolumeUp";
import Image from "next/image";

export interface ShapeCardProps {
  shape: string;
  title: string;
  color: string;
  formulaArea: string;
  formulaPerimeter: string;
  content: React.ReactNode;
}

export function ShapeCardTest({
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
  const colorMap: Record<string, string> = {
    red: "bg-red-500 hover:bg-red-600",
    blue: "bg-blue-500 hover:bg-blue-600",
    green: "bg-green-500 hover:bg-green-600",
    yellow: "bg-yellow-500 hover:bg-yellow-600",
    purple: "bg-purple-500 hover:bg-purple-600",
    pink: "bg-pink-500 hover:bg-pink-600",
    indigo: "bg-indigo-500 hover:bg-indigo-600",
    teal: "bg-teal-500 hover:bg-teal-600",
    orange: "bg-orange-500 hover:bg-orange-600",
    cyan: "bg-cyan-500 hover:bg-cyan-600",
    lime: "bg-lime-500 hover:bg-lime-600",
    emerald: "bg-emerald-500 hover:bg-emerald-600",
    amber: "bg-amber-500 hover:bg-amber-600",
    violet: "bg-violet-500 hover:bg-violet-600",
    rose: "bg-rose-500 hover:bg-rose-600",
    sky: "bg-sky-500 hover:bg-sky-600",
    fuchsia: "bg-fuchsia-500 hover:bg-fuchsia-600",
    slate: "bg-slate-500 hover:bg-slate-600",
    zinc: "bg-zinc-500 hover:bg-zinc-600",
    neutral: "bg-neutral-500 hover:bg-neutral-600",
    stone: "bg-stone-500 hover:bg-stone-600",
    gray: "bg-gray-500 hover:bg-gray-600",
  };

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
      <button
        className={`mt-4 ${
          colorMap[color] || "bg-gray-500 hover:bg-gray-600"
        } text-white py-2 px-4 rounded-full text-sm transition-all`}
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
