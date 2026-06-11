# Dokumentasi Tugas: Implementasi Shadcn UI pada CRM React + Vite

## 1. Tujuan

- Mengimplementasikan komponen Shadcn UI `Dialog`, `Table`, dan `Tabs` dalam proyek CRM berbasis React + Vite + Tailwind CSS.
- Menggunakan `Tabs` sebagai navigasi antara data `Customer` dan `Loyalty`.
- Menampilkan daftar customer menggunakan `Table`.
- Menyediakan form tambah customer baru menggunakan `Dialog`.
- Menggunakan `useState` untuk state management.
- Menerapkan struktur file yang rapi dengan komponen `ui` terpisah.

## 2. Langkah Pengerjaan

1. Buat branch baru:
   ```bash
   git checkout -b fitur-shadcn-crm
   ```
2. Pasang dependensi Radix untuk Shadcn-style:
   ```bash
   npm install @radix-ui/react-dialog @radix-ui/react-tabs @radix-ui/react-slot
   ```
3. Buat folder `src/components/ui` dan tambahkan komponen wrapper:
   - `src/components/ui/dialog.jsx`
   - `src/components/ui/tabs.jsx`
   - `src/components/ui/table.jsx`
   - `src/components/ui/index.jsx`
4. Update halaman `src/pages/Member.jsx` untuk:
   - Menggunakan `Tabs` untuk navigasi antara `Customer` dan `Loyalty`.
   - Menampilkan daftar customer pada `Table`.
   - Menambahkan `Dialog` sebagai modal form tambah customer.
   - Menggunakan `useState` untuk mengelola data customer, tab aktif, dialog open state, dan form.
5. Tambahkan data dummy sebanyak minimal 5 customer.
6. Jalankan build untuk memverifikasi implementasi:
   ```bash
   npm run build
   ```
7. Commit perubahan ke Git.
8. Push branch dan merge ke `master`.

## 3. Screenshot Branch

- Branch yang dibuat: `fitur-shadcn-crm`
- Contoh screenshot: `screenshot-branch.png`

## 4. Screenshot Implementasi UI

- Tab navigasi Customer / Loyalty.
- Daftar customer menggunakan Table.
- Dialog modal tambah customer baru.
- Contoh screenshot: `screenshot-ui.png`

## 5. Screenshot Merge

- Merge feature branch ke `master`.
- Contoh screenshot: `screenshot-merge.png`

## 6. Kesimpulan

- Implementasi berhasil menggabungkan komponen Shadcn-style `Dialog`, `Table`, dan `Tabs` ke dalam proyek CRM.
- `Tabs` dipakai untuk menavigasi antara tampilan daftar customer dan ringkasan loyalty.
- `Table` menampilkan data customer dengan rapi dan responsif.
- `Dialog` menyediakan form interaktif untuk menambah customer baru.
- Perubahan telah berhasil diuji dengan build Vite dan disimpan pada branch terpisah sebelum di-merge ke `master`.
