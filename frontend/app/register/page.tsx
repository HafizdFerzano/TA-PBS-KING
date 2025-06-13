"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

const MySwal = withReactContent(Swal);

export default function RegisterPage() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const registerButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleRegister = async () => {
      const nama = usernameRef.current?.value;
      const password = passwordRef.current?.value;
      const confirmPassword = confirmPasswordRef.current?.value;

      if (!nama || !password || !confirmPassword) {
        MySwal.fire({
          title: "Ups!",
          text: "Semua kolom harus diisi ya! 😊",
          icon: "warning",
          confirmButtonColor: "#f87171",
          confirmButtonText: "Oke!",
        });
        return;
      }

      if (password !== confirmPassword) {
        MySwal.fire({
          title: "Hmm...",
          text: "Kata sandinya harus sama ya 😅",
          icon: "error",
          confirmButtonColor: "#f87171",
          confirmButtonText: "Coba lagi!",
        });
        return;
      }

      try {
        await axios.post("http://localhost:3001/api/auth/register", {
          nama,
          password,
        });

        MySwal.fire({
          title: `Yay, ${nama}! 🎉`,
          text: "Kamu berhasil daftar. Sebentar ya, akan diarahkan ke halaman login...",
          icon: "success",
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
          willClose: () => {
            window.location.href = "/login";
          },
        });
      } catch (error: any) {
        const message =
          error?.response?.data?.metadata?.message ||
          "Pendaftaran gagal. Coba lagi nanti ya 😊";

        MySwal.fire({
          title: "Gagal 😢",
          text: message,
          icon: "error",
          confirmButtonColor: "#f87171",
          confirmButtonText: "Coba Lagi",
        });
      }
    };

    const button = registerButtonRef.current;
    button?.addEventListener("click", handleRegister);

    return () => {
      button?.removeEventListener("click", handleRegister);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl title-font text-center text-blue-800 mb-6">
          Daftar Akun
        </h1>
        <p className="text-center text-blue-700 mb-4 text-lg">
          Yuk, daftar dulu untuk mulai belajar bangun datar!
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-blue-800 font-semibold mb-1">
              Nama
            </label>
            <input
              ref={usernameRef}
              type="text"
              className="w-full p-3 rounded-lg border-2 border-blue-300 focus:outline-none focus:border-yellow-300"
              placeholder="Masukkan nama kamu"
            />
          </div>
          <div>
            <label className="block text-blue-800 font-semibold mb-1">
              Kata Sandi
            </label>
            <input
              ref={passwordRef}
              type="password"
              className="w-full p-3 rounded-lg border-2 border-blue-300 focus:outline-none focus:border-yellow-300"
              placeholder="Rahasia kamu..."
            />
          </div>
          <div>
            <label className="block text-blue-800 font-semibold mb-1">
              Ulangi Kata Sandi
            </label>
            <input
              ref={confirmPasswordRef}
              type="password"
              className="w-full p-3 rounded-lg border-2 border-blue-300 focus:outline-none focus:border-yellow-300"
              placeholder="Ulangi lagi ya..."
            />
          </div>
          <button
            ref={registerButtonRef}
            className="w-full bg-yellow-300 hover:bg-yellow-400 text-blue-900 font-bold py-3 px-6 rounded-full transition-all"
          >
            Daftar Sekarang
          </button>
          <p className="text-center mt-4 text-sm text-blue-700">
            Sudah punya akun?{" "}
            <Link href="/login" className="underline hover:text-yellow-400">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
