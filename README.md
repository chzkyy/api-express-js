
## Instalasi

1. Clone repositori ini.
2. Jalankan perintah `npm install` untuk menginstal dependensi.
3. Buat file `.env` lalu konfigurasikan seperti contoh di bawah ini

        JWT_SECRET=your-secret-key
        DATABASE_URL="mysql://root:@localhost:3306/db_express_api"
        
4. Konfigurasi file `.env` dengan mengisi nilai-nilai yang diperlukan.
5. Jalankan perintah `npx prisma migrate dev --name init`
6. Jalankan perintah `npx prisma generate`
7. Jalankan perintah `npx nodemon --watch 'src/**/*.ts' --exec 'ts-node' src/server.ts` untuk menjalankan server.
