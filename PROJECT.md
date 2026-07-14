# Product Requirements Document (PRD)
# KEMBARA (Kembara Nusantara)

**Versi:** 1.0 (Frontend-First Development)
**Tanggal:** 14 Juli 2026
**Tech Stack:** MERN (MongoDB, Express.js, React.js, Node.js) — fase awal fokus pada **Frontend (React)** dengan data dummy/mock, database menyusul di fase berikutnya.

---

## 1. Ringkasan Produk

KEMBARA adalah platform pariwisata digital dua sisi (two-sided platform) yang menghubungkan wisatawan dengan destinasi wisata sesuai kebutuhan rombongan mereka, sekaligus memberi ruang tampil bagi UMKM dan desa wisata pelosok agar dapat diakses langsung oleh wisatawan nasional.

Dua fitur inti:
1. **Laras Yatra** — pencarian & rekomendasi destinasi wisata yang dipersonalisasi berdasarkan profil rombongan, lokasi, radius, budget, dan vibe/suasana.
2. **Jejak Punya** — direktori UMKM mitra per destinasi + sistem validasi kunjungan via QR code, visualisasi dampak sosial, dan poin penghargaan.

---

## 2. Tujuan Produk

- Mendigitalisasi ekonomi akar rumput dengan menghubungkan UMKM/desa wisata pelosok ke ekosistem digital nasional.
- Menghadirkan pengalaman berwisata yang personal & aman untuk berbagai jenis rombongan.
- Membangun kesadaran dampak sosial dari aktivitas wisata melalui gamifikasi.
- Mendorong pemerataan ekonomi pariwisata di luar kota-kota besar.

## 3. Tujuan Fase Frontend (Scope Dokumen Ini)

Karena pengembangan difokuskan ke frontend terlebih dahulu, tujuan fase ini adalah:
- Membangun seluruh antarmuka (UI/UX) dan alur navigasi aplikasi menggunakan **React**.
- Menggunakan **data dummy (mock data/JSON lokal)** untuk mensimulasikan hasil pencarian destinasi, profil UMKM, dan sistem poin — tanpa backend/database nyata.
- Menyiapkan struktur kode yang **backend-ready**, sehingga saat Express + MongoDB diintegrasikan nanti, perubahan cukup di layer service/API tanpa merombak UI.
- Menghasilkan prototipe yang bisa digunakan untuk user testing dan presentasi ke stakeholder.

---

## 4. Target Pengguna (User Personas)

| Persona | Deskripsi | Kebutuhan Utama |
|---|---|---|
| Wisatawan Keluarga | Bepergian dengan anak kecil/lansia | Destinasi aman, akses mudah, fasilitas ramah anak/lansia |
| Solo Traveler | Bepergian sendiri, fleksibel | Eksplorasi cepat, budget terkontrol |
| Pasangan | Liburan berdua | Suasana romantis/tenang, kenyamanan |
| Pelaku UMKM/Desa Wisata | Warung, homestay, kriya, dsb | Eksposur ke wisatawan, transparansi dampak |
| Admin Lokal (BUMDes/Karang Taruna) | Membantu pendaftaran UMKM | Kemudahan input data mitra |

---

## 5. Fitur & Ruang Lingkup Frontend

### 5.1 Modul Autentikasi (Mock)
- Halaman Login & Register (UI saja, validasi form di sisi client, simulasi state login via Context/local state).
- Role: Wisatawan vs Mitra UMKM (menentukan tampilan dashboard).

### 5.2 Modul Laras Yatra (Pencarian Destinasi)
**Alur pengguna:**
1. Input lokasi keberangkatan (text/autocomplete dummy).
2. Input radius jarak (slider).
3. Input perkiraan budget (range input).
4. Pilih profil rombongan: Solo / Keluarga dengan anak kecil / Bersama lansia / Pasangan.
5. Pilih vibe/suasana (multi-select chip): "dekat gunung", "cafe rumahan", "wisata air", "ramah anak", dll.
6. Submit → tampilkan **daftar hasil (card list)** berisi: foto, nama destinasi, info akses jalan, fasilitas, tingkat kenyamanan.
7. Klik destinasi → halaman detail destinasi.
8. Tombol "Mulai Perjalanan" → membuka Google Maps (deep link) ke koordinat lokasi.

**Komponen React yang dibutuhkan:**
- `SearchForm` (multi-step atau single form)
- `ProfileSelector`, `VibeChipSelector`
- `DestinationCard`, `DestinationList`
- `DestinationDetailPage`
- `FilterSidebar` (opsional, untuk refine hasil)

### 5.3 Modul Jejak Punya (UMKM & Dampak)
**Halaman Detail Destinasi menampilkan:**
- Tab/section "UMKM Mitra di Sekitar Sini": daftar warung, homestay, sewa transportasi, kriya lokal (card grid).
- Setiap UMKM: nama, jenis usaha, foto, deskripsi singkat, badge "terverifikasi".

**Alur Validasi Kunjungan (disimulasikan di frontend):**
1. Tombol "Scan QR" pada halaman UMKM → membuka simulasi scanner (dummy, misal input manual kode untuk simulasi tanpa backend).
2. Setelah "berhasil scan" → tampilkan modal sukses + animasi dampak (misal: "Kontribusimu membantu 3 warga hari ini").
3. Tambahkan poin penghargaan ke state pengguna (disimpan sementara di local state/localStorage sebagai simulasi, **catatan: localStorage tidak didukung di lingkungan artifact Claude, tapi valid untuk implementasi aplikasi nyata di luar Claude**).

**Komponen React yang dibutuhkan:**
- `UMKMCard`, `UMKMList`
- `QRScanSimulator` / `QRScanModal`
- `ImpactVisualization` (chart/statistik sederhana — bisa pakai Recharts)
- `PointsBadge`, `RewardVoucherList`

### 5.4 Dashboard Wisatawan
- Riwayat kunjungan & poin terkumpul.
- Daftar voucer yang bisa ditukar.

### 5.5 Dashboard Mitra UMKM
- Statistik eksposur (jumlah dilihat wisatawan, jumlah transaksi tervalidasi — data dummy).
- Form pendaftaran/edit profil UMKM.

### 5.6 Halaman Umum
- Landing Page (hero, penjelasan fitur, CTA).
- Halaman "Tentang KEMBARA".
- Navigasi utama (Navbar) & Footer.
- 404 Page.

---

## 6. Arsitektur Teknis (Frontend)

### 6.1 Stack
- **React** (Create React App / Vite — disarankan **Vite** untuk build lebih cepat).
- **React Router** untuk navigasi antar halaman.
- **State Management:** Context API untuk skala awal (bisa upgrade ke Redux Toolkit/Zustand jika kompleksitas bertambah).
- **Styling:** Tailwind CSS (disarankan untuk kecepatan development & konsistensi desain).
- **HTTP Client (disiapkan untuk nanti):** Axios — dibungkus dalam layer `services/api.js` agar mudah diarahkan ke Express API saat backend siap.
- **Mock Data:** file JSON lokal di `src/mocks/` (mis. `destinations.json`, `umkm.json`, `users.json`) diakses lewat fungsi `services/` yang meniru bentuk response API (termasuk delay simulasi & struktur `{ data, status }`).
- **Charting (untuk visualisasi dampak):** Recharts.
- **Icon:** Lucide React.

### 6.2 Struktur Folder yang Disarankan
```
kembara-frontend/
├── src/
│   ├── components/         # komponen reusable (Button, Card, Modal, dll)
│   ├── features/
│   │   ├── laras-yatra/    # SearchForm, DestinationList, DestinationDetail
│   │   ├── jejak-punya/    # UMKMList, QRScan, ImpactViz
│   │   ├── auth/
│   │   └── dashboard/
│   ├── pages/               # halaman-halaman utama (routing level)
│   ├── services/            # layer API (mock sekarang, Express nanti)
│   ├── mocks/                # data dummy JSON
│   ├── context/              # AuthContext, UserContext
│   ├── hooks/                 # custom hooks (useDestinations, useUMKM, dll)
│   ├── utils/
│   ├── assets/
│   └── App.jsx
```

### 6.3 Prinsip Desain Kode (Backend-Ready)
- Semua pengambilan data **wajib** lewat fungsi di `services/`, bukan langsung import JSON di komponen. Contoh:
  ```js
  // services/destinationService.js
  export async function searchDestinations(params) {
    // Fase sekarang: baca dari mocks/destinations.json + filter lokal
    // Fase nanti: axios.get('/api/destinations', { params })
  }
  ```
- Gunakan `async/await` walaupun data dummy, agar pola pemanggilan sama persis dengan saat backend nyata terpasang.
- Definisikan bentuk data (shape) sejak awal agar konsisten dengan skema MongoDB yang akan dibuat nanti (mis. field `_id`, `createdAt` sudah disiapkan meski dummy).

---

## 7. Desain UI/UX — Prinsip Utama

- **Mobile-first**, karena target pengguna kemungkinan besar mengakses via smartphone saat bepergian.
- Palet warna & tone: hangat, membumi (earthy), mencerminkan nuansa Nusantara — hindari kesan generik/korporat.
- Personalisasi harus terasa di UI: form pencarian Laras Yatra sebaiknya multi-step yang ringan, bukan form panjang sekaligus.
- Elemen gamifikasi (poin, badge, progress dampak) ditampilkan dengan visual yang menyenangkan, bukan seperti laporan formal.
- Aksesibilitas: kontras warna cukup, ukuran tap-target ramah untuk pengguna lansia (persona penting dalam produk ini).

---

## 8. Data Dummy yang Perlu Disiapkan

| File | Isi Minimal |
|---|---|
| `destinations.json` | ±15-20 destinasi dengan field: id, nama, foto, koordinat, akses, fasilitas[], tingkat_kenyamanan, tags/vibe[], profil_cocok[] |
| `umkm.json` | ±20-30 UMKM dengan field: id, nama, jenis, destinasi_id (relasi), foto, deskripsi, terverifikasi |
| `users.json` | beberapa user dummy dengan poin, riwayat kunjungan |
| `vouchers.json` | daftar voucer & syarat penukaran poin |

---

## 9. Rencana Integrasi Backend (Fase Berikutnya — Tidak Dikerjakan Sekarang)

Disebutkan sebagai referensi agar struktur frontend kompatibel:
- **Express.js** akan menyediakan REST API: `/api/destinations`, `/api/umkm`, `/api/users`, `/api/visits` (validasi QR), `/api/vouchers`.
- **MongoDB** akan menyimpan koleksi: `Destinations`, `UMKM`, `Users`, `Visits`, `Vouchers`, dengan relasi via `ObjectId`.
- Autentikasi asli akan memakai JWT, menggantikan mock auth di Context.

---

## 10. Milestone Pengembangan Frontend

| Milestone | Output |
|---|---|
| M1 | Setup project (Vite + React Router + Tailwind), struktur folder, komponen dasar (Navbar, Footer, Button, Card) |
| M2 | Landing Page + halaman statis (Tentang) |
| M3 | Modul Laras Yatra: form pencarian + hasil pencarian + detail destinasi |
| M4 | Modul Jejak Punya: daftar UMKM + simulasi QR + visualisasi dampak + poin |
| M5 | Dashboard Wisatawan & Dashboard Mitra UMKM |
| M6 | Autentikasi mock (login/register) + proteksi rute |
| M7 | Polish UI/UX, responsive testing, siap demo/user testing |

---

## 11. Metrik Keberhasilan (Fase Frontend)

- Semua alur utama (pencarian destinasi → detail → simulasi transaksi UMKM → poin) bisa dijalankan end-to-end dengan data dummy tanpa error.
- Tampilan responsif di mobile & desktop.
- Waktu load antar halaman terasa instan (karena data lokal/mock).
- Kode siap diintegrasikan ke backend tanpa perlu menulis ulang komponen UI.

---

## 12. Batasan (Out of Scope untuk Fase Ini)

- Tidak ada backend/API nyata (Express baru sebagai rencana, belum diimplementasi).
- Tidak ada database sungguhan (MongoDB baru direncanakan strukturnya).
- Tidak ada pembayaran/transaksi finansial nyata.
- Tidak ada scan QR fisik (kamera) — disimulasikan lewat UI.