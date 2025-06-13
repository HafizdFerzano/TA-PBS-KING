export function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            Selamat Datang di <span className="text-indigo-600">Dashboard Admin</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kelola data bangun datar, QR Code, dan pengguna dengan antarmuka intuitif
          </p>
        </header>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Bangun Datar Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-indigo-100">
            <div className="p-6">
              <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Bangun Datar</h3>
              <p className="text-gray-600 mb-4">
                Kelola berbagai jenis bangun datar dan propertinya secara visual
              </p>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                Kelola Geometri
              </button>
            </div>
          </div>

          {/* QR Code Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-green-100">
            <div className="p-6">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Generator QR Code</h3>
              <p className="text-gray-600 mb-4">
                Buat dan kelola kode QR untuk berbagai keperluan sistem
              </p>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                Kelola QR
              </button>
            </div>
          </div>

          {/* Pengguna Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-amber-100">
            <div className="p-6">
              <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Manajemen Pengguna</h3>
              <p className="text-gray-600 mb-4">
                Kelola akses pengguna, peran, dan aktivitas sistem
              </p>
              <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium">
                Kelola Pengguna
              </button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="mt-12 bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ringkasan Sistem</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-indigo-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-indigo-700">24</p>
              <p className="text-gray-600">Bangun Datar</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-green-700">128</p>
              <p className="text-gray-600">QR Code</p>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-amber-700">42</p>
              <p className="text-gray-600">Pengguna</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-purple-700">98%</p>
              <p className="text-gray-600">Kepuasan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;