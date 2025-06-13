"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import QRCodeCard from "@/app/components/QRCodeCard";
import QRCodeModal from "@/app/components/QRCodeModal";
import EmptyState from "@/app/components/EmptyState";
import api from "@/lib/api";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export interface QRCode {
  id: string;
  shape: string;
  image: string;
}

export default function QrArScanner() {
  const [qrCodes, setQrCodes] = useState<QRCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQr, setSelectedQr] = useState<QRCode | null>(null);

  const fetchQRCodes = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/qr-ar");
      const { metadata, data } = response.data;
      if (metadata.error === 0) {
        setQrCodes(data);
      } else {
        MySwal.fire({
          icon: "error",
          title: "Gagal memuat data",
          text: metadata.message || "Terjadi kesalahan saat memuat data.",
        });
      }
    } catch (error: any) {
      const msg =
        error?.response?.data?.metadata?.message || "Gagal memuat data.";
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: msg,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQRCodes();
  }, []);

  const handleCreateOrUpdate = async (qrData: any) => {
    try {
      const formData = new FormData();
      formData.append("shape", qrData.shape);
      if (qrData.image) formData.append("image", qrData.image);

      let response;
      if (selectedQr) {
        response = await api.put(`/api/qr-ar/${selectedQr.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        response = await api.post("/api/qr-ar", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      const { metadata } = response.data;
      if (metadata.error === 0) {
        MySwal.fire({
          icon: "success",
          title: selectedQr ? "Berhasil diperbarui!" : "Berhasil ditambahkan!",
        });
        fetchQRCodes();
        closeModal();
      } else {
        MySwal.fire({
          icon: "error",
          title: "Gagal menyimpan",
          text: metadata.message,
        });
      }
    } catch (error: any) {
      const msg =
        error?.response?.data?.metadata?.message ||
        "Terjadi kesalahan saat menyimpan.";
      MySwal.fire({
        icon: "error",
        title: "Gagal menyimpan",
        text: msg,
      });
    }
  };

  const handleDelete = async (id: string) => {
    const confirm = await MySwal.fire({
      title: "Yakin ingin menghapus?",
      text: "Tindakan ini tidak dapat dibatalkan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (!confirm.isConfirmed) return;

    try {
      const response = await api.delete(`/api/qr-ar/${id}`);
      const { metadata } = response.data;
      if (metadata.error === 0) {
        MySwal.fire({
          icon: "success",
          title: metadata.message || "Berhasil dihapus!",
        });
        fetchQRCodes();
      } else {
        MySwal.fire({
          icon: "error",
          title: "Gagal menghapus",
          text: metadata.message,
        });
      }
    } catch (error: any) {
      const msg =
        error?.response?.data?.metadata?.message ||
        "Terjadi kesalahan saat menghapus.";
      MySwal.fire({
        icon: "error",
        title: "Gagal menghapus",
        text: msg,
      });
    }
  };

  const openModal = (qr: QRCode | null = null) => {
    setSelectedQr(qr);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQr(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="text-black">
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-indigo-700 mb-2">
          QR AR Code Manager
        </h1>
        <p className="text-gray-600">
          Create, manage and organize your QR AR codes
        </p>
        <button
          onClick={() => openModal()}
          className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg shadow-md transition duration-300"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Tambah QR AR Code
        </button>
      </header>

      {/* QR Code List */}
      {qrCodes.length === 0 ? (
        <EmptyState onAddClick={() => openModal()} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {qrCodes.map((qr) => (
            <QRCodeCard
              key={qr.id}
              qr={qr}
              onEdit={() => openModal(qr)}
              onDelete={() => handleDelete(qr.id)}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <QRCodeModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleCreateOrUpdate}
        initialData={selectedQr}
      />
    </div>
  );
}
