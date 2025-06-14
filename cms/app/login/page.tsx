"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ArrowLeft } from "lucide-react";
import axios from "axios";

const MySwal = withReactContent(Swal);

export default function AdminLoginPage() {
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const loginButtonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleLogin = async () => {
      const nama = nameRef.current?.value;
      const password = passwordRef.current?.value;

      if (!nama || !password) {
        MySwal.fire({
          title: "Oops!",
          text: "Masukkan nama dan kata sandi admin!",
          icon: "warning",
          confirmButtonColor: "#f87171",
          confirmButtonText: "Oke!",
        });
        return;
      }

      try {
        const response = await axios.post(
          "https://backend-shape-explorer.vercel.app/api/auth/login",
          {
            nama,
            password,
          }
        );

        const { token, role } = response.data.data;

        // Optional: Cek role admin
        if (role !== "admin") {
          return MySwal.fire({
            title: "Akses Ditolak",
            text: "Akun ini bukan akun admin.",
            icon: "error",
          });
        }

        console.log("Current cookies: ", document.cookie);
        document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax;`;

        MySwal.fire({
          title: `Selamat Datang, Admin!`,
          text: "Anda berhasil login ke CMS 🎉",
          icon: "success",
          confirmButtonColor: "#38bdf8",
          confirmButtonText: "Masuk Dashboard",
        }).then(() => {
          setTimeout(() => {
            router.replace("/admin/dashboard");
          }, 100); // delay 100ms agar cookie tersimpan
        });
      } catch (error: any) {
        const message =
          error?.response?.data?.metadata?.message ||
          "Nama atau kata sandi salah, coba lagi.";

        MySwal.fire({
          title: "Login Gagal",
          text: message,
          icon: "error",
          confirmButtonColor: "#f87171",
          confirmButtonText: "Coba Lagi",
        });
      }
    };

    const button = loginButtonRef.current;
    button?.addEventListener("click", handleLogin);

    return () => {
      button?.removeEventListener("click", handleLogin);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative px-4">
      <div className="bg-gray-100 rounded-xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl title-font text-center text-yellow-500 mb-6">
          Admin CMS Login
        </h1>
        <p className="text-center text-gray-700 mb-4 text-lg">
          Masukkan kredensial Anda untuk mengakses panel admin
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-yellow-800 font-semibold mb-1">
              Nama Admin
            </label>
            <input
              ref={nameRef}
              type="text"
              className="w-full p-3 rounded-lg text-gray-500 border-2 border-yellow-300 focus:outline-none focus:border-blue-300"
              placeholder="Masukkan nama admin"
            />
          </div>
          <div>
            <label className="block text-yellow-800 font-semibold mb-1">
              Kata Sandi
            </label>
            <input
              ref={passwordRef}
              type="password"
              className="w-full p-3 rounded-lg text-gray-500 border-2 border-yellow-300 focus:outline-none focus:border-blue-300"
              placeholder="Kata sandi rahasia"
            />
          </div>
          <button
            ref={loginButtonRef}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 px-6 rounded-full transition-all"
          >
            Masuk sebagai Admin
          </button>
        </div>
      </div>
    </div>
  );
}
