"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { name: "Users", path: "/admin/dashboard/users" },
  { name: "QR-AR", path: "/admin/dashboard/qr-ar" },
  { name: "Shapes", path: "/admin/dashboard/shapes" },
];

export default function Sidebar({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-screen bg-gray-800 text-white p-4 flex flex-col justify-between transition-all duration-300 z-40 ${
          isOpen ? "w-64" : "w-0 overflow-hidden"
        }`}
      >
        {isOpen && (
          <>
            <div>
              <h1 className="text-2xl font-bold mb-6 ml-8 flex-nowrap">
                CMS Dashboard
              </h1>
              <ul className="space-y-2">
                {menu.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className={`block px-4 py-2 rounded hover:bg-gray-700 ${
                        pathname === item.path ? "bg-gray-700" : ""
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => {
                document.cookie = "token=; path=/; max-age=0";
                window.location.href = "/";
              }}
              className="mt-4 px-4 py-2 bg-yellow-600 rounded hover:bg-yellow-500"
            >
              Logout
            </button>
          </>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 bg-gray-800 text-white px-2 py-1 rounded hover:bg-gray-700 transition"
      >
        {isOpen ? "⮜" : "⮞"}
      </button>
    </>
  );
}
