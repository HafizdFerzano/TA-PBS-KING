// app/components/AboutSection.tsx
import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center title-font text-blue-800">
          About Shape Explorer
        </h2>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <Image
              src="/assets/kids.png"
              alt="Kids learning"
              width={400}
              height={300}
              className="w-full max-w-md mx-auto rounded-xl shadow-lg"
            />
          </div>

          <div className="lg:w-1/2">
            <h3 className="text-2xl font-bold mb-4 text-blue-700">
              Our Mission
            </h3>
            <p className="text-lg mb-6 text-gray-700">
              Shape Explorer was created to make learning geometry fun and
              interactive for elementary school students. By combining augmented
              reality with playful design, we help children understand
              fundamental 2D shapes in an engaging way.
            </p>

            <h3 className="text-2xl font-bold mb-4 text-blue-700">
              How It Works
            </h3>
            <p className="mb-6 text-gray-700">
              Using your device's camera, Shape Explorer recognizes special
              markers and displays interactive 3D models of shapes. Kids can
              rotate, zoom, and explore each shape while learning important
              concepts like sides, angles, area, and perimeter.
            </p>

            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-3 text-blue-800">FAQs</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-blue-700">
                    What devices are supported?
                  </h4>
                  <p className="text-gray-700">
                    Shape Explorer works on smartphones, tablets, and computers
                    with webcams running Chrome, Firefox, or Safari.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-blue-700">
                    Do I need special markers?
                  </h4>
                  <p className="text-gray-700">
                    Yes, you'll need to print or display the Hiro marker
                    (available for download above) for the AR features.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-blue-700">
                    Is this free to use?
                  </h4>
                  <p className="text-gray-700">
                    Absolutely! Shape Explorer is completely free with no hidden
                    costs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-6 text-blue-800">
            Meet the Team
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="bg-blue-50 p-6 rounded-xl">
                <div className="w-24 h-24 bg-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-blue-800">
                  {member.initials}
                </div>
                <h4 className="font-bold text-lg">{member.name}</h4>
                <p className="text-blue-600">{member.role}</p>
                <p className="mt-2 text-sm text-gray-600">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const team = [
  {
    initials: "HF",
    name: "Hafidz",
    role: "Frontend",
    description: "Creating Display Website",
  },
  {
    initials: "RV",
    name: "rhivo9",
    role: "Backend",
    description: "Creating Of API",
  },
  {
    initials: "RY",
    name: "ryandika",
    role: "CMS",
    description: "Dashboard management",
  },
];
