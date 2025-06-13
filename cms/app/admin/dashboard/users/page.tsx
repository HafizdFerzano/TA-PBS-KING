"use client";

import { useEffect, useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

import axios from "axios";

type User = {
  id: string;
  nama: string;
};

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const tableRef = useRef<HTMLTableSectionElement | null>(null);
  const handleDelete = async (id: string) => {
    const result = await MySwal.fire({
      title: "Apakah Anda yakin?",
      text: "User ini akan dihapus secara permanen.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3001/api/users/${id}`);
        setUsers((prev) => prev.filter((user) => user.id !== id));
        MySwal.fire("Berhasil!", "User telah dihapus.", "success");
      } catch (error) {
        console.error("Gagal menghapus user:", error);
        MySwal.fire("Gagal", "Terjadi kesalahan saat menghapus user.", "error");
      }
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/users");
      const userArray = response.data.data ?? []; // ✅ akses response.data.data
      setUsers(userArray);
    } catch (error) {
      console.error("Gagal mengambil data user:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedUsers = users.slice(startIndex, endIndex);

  function truncateId(id: string, length: number = 6): string {
    return id.length > length ? `${id.slice(0, length)}...` : id;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">
              User Management
            </h2>
          </div>

          {/* Table */}
          <div className="overflow-x-auto table-container">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex justify-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody
                ref={tableRef}
                className="bg-white divide-y divide-gray-200"
              >
                {paginatedUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className="table-row hover:bg-gray-50 transition-colors"
                    style={{
                      animation: `fadeIn 0.3s ease-out ${
                        index * 0.05
                      }s forwards`,
                    }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {truncateId(user.id)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.nama}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FontAwesomeIcon icon={faTrash} className="w-6" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t">
            <div className="text-sm text-gray-500">
              Showing <span>{startIndex + 1}</span> to{" "}
              <span>{Math.min(endIndex, users.length)}</span> of{" "}
              <span>{users.length}</span> entries
            </div>
            <div className="flex space-x-2">
              <button
                className="px-3 py-1 border rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className="px-3 py-1 border rounded-md text-gray-700 hover:bg-gray-50"
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={endIndex >= users.length}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .table-container::-webkit-scrollbar {
          height: 8px;
          width: 8px;
        }
        .table-container::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .table-container::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .table-container::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
}
