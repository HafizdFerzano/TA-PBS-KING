// app/components/ScanSection.tsx

export default function ScanSection() {
  return (
    <section id="scan" className="py-16 px-4 bg-gradient-to-b from-blue-50 to-indigo-50">
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
              {/* <a-scene
                embedded
                arjs="sourceType: webcam; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
              >
                <a-marker preset="hiro">
                  <a-entity
                    position="0 0 0"
                    rotation="0 0 0"
                    scale="0.5 0.5 0.5"
                    geometry="primitive: box"
                    material="color: #3B82F6; opacity: 0.8;"
                  ></a-entity>
                </a-marker>
                <a-entity camera></a-entity>
              </a-scene> */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4 text-center">
                <p>Scan the Hiro marker to see a 3D shape appear!</p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-blue-800">How to Use AR Scanner</h3>
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
                    href="https://jeromeetienne.github.io/AR.js/data/images/HIRO.jpg"
                    download
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Hiro Marker
                  </a>
                  <a
                    href="https://jeromeetienne.github.io/AR.js/data/images/kanji.jpg"
                    download
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Kanji Marker
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
                  <li key={idx} className="flex items-center">
                    <i className={`${item.icon} text-blue-500 mr-2`}></i>
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

const steps = [
  'Print out or display the Hiro marker on another device',
  "Point your camera at the marker (make sure it's well lit)",
  'Watch as the shape appears in 3D on your screen!',
  'Try rotating the marker to see the shape from different angles',
];

const features = [
  {
    title: 'Interactive Features',
    items: [
      { icon: 'fas fa-hand-pointer', text: 'Tap to hear shape name' },
      { icon: 'fas fa-rotate-right', text: 'Rotate marker to see all sides' },
      { icon: 'fas fa-expand', text: 'Move closer to zoom in' },
    ],
  },
  {
    title: 'Supported Shapes',
    items: [
      { icon: '', text: 'Square' },
      { icon: '', text: 'Triangle' },
      { icon: '', text: 'Circle' },
      { icon: '', text: 'Rectangle' },
    ],
  },
  {
    title: 'Device Compatibility',
    items: [
      { icon: 'fab fa-android text-green-500', text: 'Android phones & tablets' },
      { icon: 'fab fa-apple text-gray-500', text: 'iPhones & iPads' },
      { icon: 'fas fa-laptop text-blue-500', text: 'Computers with webcam' },
    ],
  },
];