# 🚀 Ultimate Node.js API Boilerplate

An advanced, scalable REST API built with modern technologies and real-world caching strategy using Redis versioning.

---

## 📦 Tech Stack

| Tech           | Version     | Description          |                |
| -------------- | ----------- | -------------------- | -------------- |
|                | **Node.js** | 20.x                 | Server runtime |
| **Express**    | 5.1.0       | Web framework        |                |
| **TypeScript** | 5.8.3       | Typed JavaScript     |                |
| **PostgreSQL** | 13.x        | Relational Database  |                |
| **Prisma**     | 6.11.11     | Type-safe ORM        |                |
| **Redis**      | latest      | Caching & Versioning |                |

---

## 🧠 Redis Versioned Caching Strategy

To avoid stale cache while keeping blazing fast responses:

- `users:version` → global version counter
- `user:{id}:version` → per-record version
- Cached keys:
  - `users-v{version}`
  - `user:{id}-v{version}`

### ✅ Auto-invalidation by version increment:

| Action      | Redis Operation                    |
| ----------- | ---------------------------------- |
| Create User | `INCR users:version`               |
| Update User | `INCR users:version` + `user:{id}` |
| Delete User | `INCR users:version` + `user:{id}` |

This way, old cache becomes unreachable instead of being manually deleted.

---

## 📁 Project Structure

```
src/
├── modules/
│   └── user/
│       ├── user.controller.ts
│       ├── user.service.ts
│       ├── user.repository.ts
│       ├── user.entity.ts
│       └── user.dto.ts
│
├── config/
│   ├── redis.ts
│   └── database.ts
│
├── app.ts
└── main.ts
```

---

## ⚙️ Getting Started

```bash
# Clone the repo
git clone https://github.com/your-org/your-repo.git
cd your-repo

# Install dependencies
npm install

# Setup Prisma
npx prisma generate
npx prisma migrate dev --name init

# Create env file
cp .env.example .env

# Start server
npm run dev
```

---

## 🥪 API Testing (with curl)

### ➕ Create a new user

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

### 📅 Get all users

```bash
curl http://localhost:3000/users
```

### 🔍 Get user by ID

```bash
curl http://localhost:3000/users/1
```

### ✏️ Update a user

```bash
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"John Updated"}'
```

### ❌ Delete a user

```bash
curl -X DELETE http://localhost:3000/users/1
```

---

## 📊 Redis Key Examples

```text
users:version            → 5
users-v5                 → [user1, user2, ...]
user:3:version           → 7
user:3-v7                → { id: 3, name: ... }
```

---

## 🔒 Environment Variables

`.env` should contain:

```
DATABASE_URL=postgresql://user:password@localhost:5432/db
REDIS_URL=redis://localhost:6379
PORT=3000
```

---

## ✅ Scripts

```bash
npm run dev           # Start dev server
npm run build         # Build TS to JS
npm run start         # Start production
```

---

## 🧹 Linting & Formatting

```bash
npm run lint
npm run format
```

---

## 📬 Contribution Guide

1. Fork this repo
2. Create your feature branch: `git checkout -b feat/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feat/amazing-feature`
5. Create a Pull Request

---

## 📄 License

Licensed under the MIT License.\
Feel free to use, modify, and distribute 🚀

---

## 👨‍💼 Author

Made with ❤️ by [Your Name](https://github.com/your-username)

