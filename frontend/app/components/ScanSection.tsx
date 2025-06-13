"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandPointer,
  faRotateRight,
  faExpand,
  faLaptop,
  faSquare,
  faPlay,
  faCircle,
  faRectangleList,
} from "@fortawesome/free-solid-svg-icons";

import { faAndroid, faApple } from "@fortawesome/free-brands-svg-icons";

import Image from "next/image";

export default function ScanSection() {
  return (
    <section
      id="scan"
      className="py-16 px-4 bg-gradient-to-b from-blue-50 to-indigo-50"
    >
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-center title-font text-blue-800">
          AR Shape Scanner
        </h2>
        <p className="text-xl text-center mb-12 max-w-2xl mx-auto text-blue-700">
          Point your camera at a shape marker to see it come to life in 3D!
        </p>

        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="lg:w-1/2">
            <div className="relative w-full h-[70vh] overflow-hidden rounded-[20px] bg-white bg-opacity-20">
              <div className="flex justify-center items-center h-full">
                <Image
                  src={"/assets/qr-test.png"}
                  width={400}
                  height={400}
                  alt="qr"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black opacity-80 text-white p-4 text-center">
                <p>Scan the Hiro marker to see a shape appear!</p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-blue-800">
                How to Use AR Scanner
              </h3>
              <ol className="space-y-4">
                {steps.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      {index + 1}
                    </div>
                    <p>{step}</p>
                  </li>
                ))}
              </ol>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-bold mb-2">Download Markers:</h4>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="/assets/qr-test.png" // path ke file
                    download="qr-marker.png" // nama file saat didownload
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    QR Marker
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map(({ title, items }) => (
            <div key={title} className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-xl font-bold mb-3 text-blue-800">{title}</h3>
              <ul className="space-y-2">
                {items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    {item.icon && (
                      <FontAwesomeIcon
                        icon={item.icon}
                        className="text-blue-500 w-4 h-4"
                      />
                    )}
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Langkah-langkah pemindaian AR
const steps = [
  "Scan the QR Code using your phone camera scanner",
  "Click the link that appears to open the AR Studio page",
  "Allow camera access when prompted",
  "Point your camera at the same QR Code to trigger the AR view",
  "Watch the Triangle shape appear in 3D on your screen!",
  "Try rotating the QR Code to view the Triangle from different angles",
  "Please log in to scan and explore other 2D shapes",
];

// Fitur yang ditampilkan
const features = [
  {
    title: "Interactive Features",
    items: [
      { icon: faHandPointer, text: "Tap to hear shape name" },
      { icon: faRotateRight, text: "Rotate marker to see all sides" },
      { icon: faExpand, text: "Move closer to zoom in" },
    ],
  },
  {
    title: "Supported Shapes",
    items: [
      { icon: faSquare, text: "Square" },
      { icon: faPlay, text: "Triangle" },
      { icon: faCircle, text: "Circle" },
      { icon: faRectangleList, text: "Rectangle" },
    ],
  },
  {
    title: "Device Compatibility",
    items: [
      { icon: faAndroid, text: "Android phones & tablets" },
      { icon: faApple, text: "iPhones & iPads" },
      { icon: faLaptop, text: "Computers with webcam" },
    ],
  },
];
