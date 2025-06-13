import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

type Qr = {
  id: string;
  shape: string;
  image: string;
};

function QrScanner() {
  const [selectedShape, setSelectedShape] = useState<Qr | null>(null);
  const [showScanner, setShowScanner] = useState(false);

  const [qr, setQr] = useState<Qr[]>([]);

  const fetchQrAr = async () => {
    const path = "qr-ar";
    try {
      const res = await axios.get(`http://localhost:3001/api/${path}`);
      setQr(res.data.data);
    } catch (error: unknown) {
      console.error("Gagal ambil data qr:", error);
    }
  };

  useEffect(() => {
    fetchQrAr();

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
    };
  }, []);

  const handleSelectShapeFromQr = (qr: Qr) => {
    setSelectedShape(qr);
    setShowScanner(true);
  };

  // Fungsi untuk kembali ke pemilihan bentuk
  const handleBackToShapeSelection = () => {
    setShowScanner(false);
    setSelectedShape(null);
  };

  return (
    <section>
      <h2 className="text-3xl font-bold mb-4">📱 AR Shape Scanner for Learn</h2>

      {!showScanner ? (
        <div>
          <p className="mb-4 text-lg">Pilih bentuk yang ingin Anda pindai:</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {qr.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg cursor-pointer transition-shadow p-4 flex flex-col items-center text-center"
                onClick={() => handleSelectShapeFromQr(s)}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {s.shape}
                </h3>
                <div className="text-sm text-blue-700 font-medium">
                  Klik untuk memindai
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : selectedShape ? (
        <div>
          <button
            onClick={handleBackToShapeSelection}
            className="mb-4 text-blue-600 underline flex items-center cursor-pointer"
          >
            <span className="mr-1">←</span> Kembali ke Pilihan Bentuk
          </button>

          <h3 className="text-2xl font-bold mb-2">
            Memindai Bentuk: {selectedShape.shape}
          </h3>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="aspect-video bg-gray-50 rounded-lg mb-4 flex items-center flex-col justify-center">
              <Image
                src={selectedShape.image}
                alt={selectedShape.shape}
                height={500}
                width={500}
                className="object-fill mb-4 h-80 w-80"
              />
              <p className="text-2xl bg-yellow-400 rounded-2xl px-4 py-2 mt-3">
                Ayo Scan Disini
              </p>
            </div>

            <h4 className="text-xl font-bold mt-6 mb-3">
              Petunjuk Penggunaan:
            </h4>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Buka pemindai QR di device Lain</li>
              <li>Pastikan marker QR terlihat jelas di kamera</li>
              <li>Pegang perangkat Anda stabil menghadap marker</li>
              <li>Nyalakan Icon Audio Untuk Play Musik</li>
              <li>Ketuk layar untuk berinteraksi dengan objek 3D</li>
              <li>Gunakan dua jari untuk memperbesar/mengecilkan</li>
            </ol>

            <div className="mt-6">
              <Link
                href={""}
                className="inline-block bg-yellow-300 hover:bg-yellow-400 text-blue-900 font-bold py-2 px-4 rounded-full"
              >
                📎 Unduh QR Marker untuk {selectedShape.shape}
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-yellow-700 mb-2">Bentuk belum dipilih</p>
          <button
            onClick={handleBackToShapeSelection}
            className="text-blue-600 underline"
          >
            ← Kembali ke pemilihan bentuk
          </button>
        </div>
      )}
    </section>
  );
}

export default QrScanner;
