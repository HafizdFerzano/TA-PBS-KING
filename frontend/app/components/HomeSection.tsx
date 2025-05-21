// app/components/HomeSection.tsx
import Image from "next/image";
import Link from "next/link";

export default function HomeSection() {
  return (
    <section id="home" className="py-16 px-4">
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
            <a
              href="#learn"
              className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold py-3 px-6 rounded-full text-center transition-all transform hover:scale-105 shadow-lg"
            >
              <i className="fas fa-graduation-cap mr-2"></i> Start Learning
            </a>
            <a
              href="#scan"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-center transition-all transform hover:scale-105 shadow-lg"
            >
              <i className="fas fa-camera mr-2"></i> Scan Marker
            </a>
          </div>
        </div>
        <div className="md:w-1/2 relative">
          <Image
            src="/1.png"
            alt="Kids learning shapes"
            width={500}
            height={500}
            className="w-full max-w-lg mx-auto animate-bounce"
          />
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-300 rounded-full opacity-20 -z-10"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-300 rounded-full opacity-20 -z-10"></div>
        </div>
      </div>
    </section>
  );
}
