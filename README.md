# Panduan Setup & Testing Project NestJS dengan Sequelize

Dokumen ini menjelaskan langkah-langkah untuk menyiapkan database, menambahkan seed data, dan menjalankan test pada project NestJS dengan Sequelize.

---

## 1. Install Dependencies

Pastikan Node.js/Bun sudah terinstall. Lalu jalankan:

```bash
npm install
```

## 2. Konfigurasi Database

File konfigurasi database ada di config/config.js

```js
module.exports = {
  development: {
    username: 'postgres',
    password: 'password',
    database: 'nest_race_condition_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    timezone: '+07:00',
  },
  test: { ... },
  production: { ... },
};

```

## 3. Buat Database

Gunakan Sequelize CLI atau secara manual di PostgreSQL:

```bash
npx sequelize-cli db:create
```

## 4. Jalankan Migration

```bash
npx sequelize-cli db:migrate
```

## 5. Seed Data

```bash
npx sequelize-cli seed --seed 20251117022249-seed-account.js
```

## 6. Jalankan Aplikasi (Optional)

Untuk menjalankan server:

```bash
npm run dev
```

## 7. Jalankan Test

Test sudah menggunakan Jest + Supertest untuk endpoint withdraw dengan simulasi race condition:

```bash
npm run test
```

Pastikan semua test pass.
