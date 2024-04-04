
## Instalasi

1. Clone repositori ini.
2. Jalankan perintah `npm install` untuk menginstal dependensi.
3. Konfigurasi file `.env` dengan mengisi nilai-nilai yang diperlukan.
4. Jalankan perintah `npx prisma migrate dev --name init`
5. Jalankan perintah `npx prisma generate`
6. Jalankan perintah `npx nodemon --watch 'src/**/*.ts' --exec 'ts-node' src/server.ts` untuk menjalankan server.
