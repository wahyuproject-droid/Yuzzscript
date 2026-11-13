# YuuZ Scripts V19 — Aurora Polish

Penyempurnaan desain V18, tanpa menghapus fitur yang sudah ada.

## Yang baru

- Tema hitam kebiruan dengan aksen biru elektrik dan merah yang lebih terarah; konsistensi panel glass, border, dan font.
- Hero lebih padat dan rapi di HP, dengan ilustrasi kode di desktop.
- Panel statistik lebih seragam. Sistem jumlah ScriptBlox tetap menggunakan endpoint `/api/catalog-count`, label exact/estimated/cache, auto-refresh, dan refresh manual dari V18.
- Pencarian & filter menjadi alur visual yang lebih menyatu. Universal, game/map, tahun, tanggal tetap tersedia.
- Kartu hasil pencarian, trending, Executors, halaman Credits, dan detail script menggunakan bahasa desain seragam.
- Floating dock 5 menu memakai satu baris dengan area klik yang konsisten, termasuk layar HP kecil.
- Animasi singkat berbasis transform/opacity, hover desktop, interaksi tombol yang lembut; penghematan efek blur di HP dan dukungan `prefers-reduced-motion`.

## File

- `index.html` — struktur tampilan, mencantumkan kedua stylesheet.
- `yuuz-v18.css` — seluruh styling dasar V18 (dipertahankan).
- `v19-polish.css` — layer desain V19 (ubah/tambah gaya di sini).
- `app.js` — API script, filter, bookmark, detail, animasi scroll, penghitungan.
- `i18n.js` — 9 bahasa.
- `yuuz-script-logo.webp` — logo original.
- `api/catalog-count.js` — hitung total katalog menggunakan Vercel Function.
- `vercel.json` — konfigurasi Vercel.
- `LICENSE` — MIT.

## Deploy Vercel

1. Ekstrak ZIP (jangan buang direktori `api/`).
2. Unggah ke repositori GitHub, lalu import ke Vercel; atau jalankan `vercel --prod` dari direktori proyek.
3. Framework Preset **Other**, tanpa build command.
4. Pastikan endpoint `/api/catalog-count` mengembalikan JSON jika API pihak ketiga tersedia.

**Batasan:** total katalog bisa perkiraan bila API membatasi halaman terakhir; tidak ada angka palsu. Kegagalan API ScriptBlox, CORS, dan pemblokiran dari pihak ketiga tidak bisa dihilangkan melalui CSS. Website ini proyek independen, bukan situs resmi ScriptBlox.
