"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ArrowLeft } from "lucide-react";
import axios from "axios";

const MySwal = withReactContent(Swal);

export default function LoginPage() {
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const loginButtonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter()

  useEffect(() => {
    const handleLogin = async () => {
      const nama = nameRef.current?.value;
      const password = passwordRef.current?.value;

      if (!nama || !password) {
        MySwal.fire({
          title: "Oops!",
          text: "Isi dulu ya name dan kata sandinya 😊",
          icon: "warning",
          confirmButtonColor: "#f87171",
          confirmButtonText: "Oke deh!",
        });
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:3001/api/auth/login",
          {
            nama: nama,
            password: password,
          }
        );
 
        const { token } = response.data;
        // document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax; Secure`;
        document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax`;


        MySwal.fire({
          title: `Halo, ${nama}!`,
          text: "Selamat datang di Shape Explorer 🎉",
          icon: "success",
          confirmButtonColor: "#facc15",
          confirmButtonText: "Ayo Belajar!",
        }).then(() => {
          router.replace('/dashboard')
        });
      } catch (error: any) {
        const message =
          error?.response?.data?.error ||
          "Login gagal. Pastikan nama dan kata sandi benar.";

        MySwal.fire({
          title: "Login Gagal 😢",
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
    <div className="min-h-screen flex items-center justify-center bg-blue-100 relative px-4">
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center bg-yellow-300 px-2 py-3 rounded-2xl text-blue-800 hover:text-yellow-500 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-1" />
        Kembali
      </Link>

      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl title-font text-center text-blue-800 mb-6">
          Selamat Datang!
        </h1>
        <p className="text-center text-blue-700 mb-4 text-lg">
          Yuk, login dulu sebelum belajar bangun datar!
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-blue-800 font-semibold mb-1">
              Nama
            </label>
            <input
              ref={nameRef}
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
          <button
            ref={loginButtonRef}
            className="w-full bg-yellow-300 hover:bg-yellow-400 text-blue-900 font-bold py-3 px-6 rounded-full transition-all"
          >
            Masuk
          </button>
          <p className="text-center mt-4 text-sm text-blue-700">
            Belum punya akun?{" "}
            <Link href="/register" className="underline hover:text-yellow-400">
              Daftar di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
