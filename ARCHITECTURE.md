# Architecture — Secure User Profile 

**Goal:** Provide a secure, scalable backend for user profiles with audit logging and a React frontend.

**Stack**
- Backend: Node.js (TypeScript) + Express + TypeORM + MySQL/MariaDB + Knex migrations
- Frontend: React (TypeScript) + CRA + Axios
- Auth: JWT stored in HTTP-only cookie for secure browser usage
- Passwords: bcrypt hashing

**Data flow**
1. Registration (`POST /api/auth/register`): client → backend validates input → hash using bcrypt → store `users` table (id, email, password, firstName, lastName).
2. Login (`POST /api/auth/login`): backend verifies credentials → sign JWT with `id` and `email` → store JWT in httpOnly cookie & insert `audit_logs` record with action `LOGIN_SUCCESS`.
3. Authenticated requests: client sends cookie automatically; `authMiddleware` verifies JWT and attaches `req.user`.
4. Profile update: `PUT /api/profile` runs inside DB transaction — updates `users` row and inserts `audit_logs` record in the same transaction to ensure atomicity.

**DB schema**
- `users` (id PK, email unique, password (hashed), firstName, lastName, createdAt, updatedAt)
- `audit_logs` (id PK, userId FK, action, createdAt)

**Security choices rationale**
- **bcrypt**: proven, slow hashing prevents brute force from easy success.
- **JWT in httpOnly cookie**: balances stateless sessions with protection from XSS . Use `sameSite` and `secure` attributes.
- **Audit logs**: writing minimal information (userId, action, timestamp).
- **Transactions**: ensuring updates and audit log writes are atomic.

**Performance & operations**
- Using DB indexes on `users.email` and `audit_logs(userId, createdAt)`.
- Using migrations for schema changes.

