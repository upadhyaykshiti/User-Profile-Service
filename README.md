# User Profile 

This archive contains a full-stack starter project (backend + frontend) using your selected options:
- Database: **MySQL**
- ORM: **TypeORM** (for ORM) + **Knex** (for migrations)
- Frontend: **React + Create React App (CRA)**

## What is included
- `/backend` — TypeScript Express backend with authentication, JWT, bcrypt, TypeORM entities, Knex migrations, and a sample audit route.
- `/frontend` — CRA React TypeScript app with Login/Register/Profile components and Axios client.
- `/migrations` — Knex migration to create `users` and `audit_logs` tables and indexes.
- `ARCHITECTURE.md` — 1-page architecture doc explaining security choices and DB schema.

## Quick start (backend)
1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Create `.env` with DB credentials :
   
3. Run migrations:
   ```bash
   npx knex migrate:latest --knexfile knexfile.ts
   npm run migrate
   ```
4. Start server (dev):
   ```bash
   npm run dev
   ```
5. Run Tests:
   ```bash
   npm test
   ```

## Quick start (frontend)
1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start app:
   ```bash
   npm start
   ```
3. Open `http://localhost:3000` and ensure the backend is at `http://localhost:4000`.

