# 📦 Shape Explorer - Installation Guide

## 🌐 Live URLs (Sudah Dideploy)

- **Frontend:** [https://shape-explorer-king.vercel.app](https://shape-explorer-king.vercel.app)
- **CMS (Admin):** [https://shape-explorer-cms.vercel.app](https://shape-explorer-cms.vercel.app)
- **Backend API:** [https://backend-shape-explorer.vercel.app](https://backend-shape-explorer.vercel.app)
- **Postman Dokumentasi:** [https://rhivo-2315898.postman.co/workspace/KING-PBS](https://rhivo-2315898.postman.co/workspace/KING-PBS~6a68ff5e-d1d5-4e20-8452-d97e15b08df3/collection/45884833-0e3a8c66-0057-4324-b908-b54b0eaf6c6b?action=share&creator=45884833)
- **Publish API Postman:** [https://documenter.getpostman.com/view/43261593/2sB2x6nCfP](https://documenter.getpostman.com/view/43261593/2sB2x6nCfP)

---

## 🚀 Cara Install Project di Lokal

### 1. Clone Repository

```bash
git clone https://github.com/HafizdFerzano/TA-PBS-KING.git
cd TA-PBS-KING
```

### 2. Setup Backend

Masuk ke folder backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install -g npm@latest && npm install
```

Buat file `.env` berdasarkan struktur berikut:

```env
JWT_SECRET=your_secret
DATABASE_PASSWORD=your_secret
DATABASE_URL=your_secret
DIRECT_URL=your_secret
SUPABASE_URL=your_secret
SUPABASE_KEY=your_secret
DATABASE_URL=your_database_url_here
JWT_SECRET=your_jwt_secret
```

Generate Prisma Client:

```bash
npx prisma generate
```

> Jika perlu, kamu juga bisa migrate atau seeding:

```bash
npx prisma migrate dev
```

### 3. Setup Frontend & CMS

Untuk **frontend**:

```bash
cd ../frontend
npm install
npm run dev
```

Untuk **CMS/admin panel**:

```bash
cd ../cms
npm install
npm run dev
```

---

## 📄 Struktur Folder

```
TA-PBS-KING/
├── backend/        → API dengan Next.js + Prisma
├── frontend/       → Halaman utama untuk user
└── cms/            → Halaman admin (CMS)
```

---

## ✅ Catatan

- Pastikan Node.js & npm sudah terinstall
- Jangan lupa isi variabel `.env` dengan benar di folder `backend`
- Gunakan terminal berbeda untuk menjalankan backend, frontend, dan CMS secara bersamaan saat development.
