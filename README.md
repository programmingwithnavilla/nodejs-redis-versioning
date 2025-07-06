# 🚀 Advanced REST API Boilerplate

A high-performance REST API built with:

- 🧠 Node.js **v20.x**
- ⚡ Express **v5.1.0**
- 🟦 TypeScript **v5.8.3**
- 🗄 PostgreSQL **v13**
- 🔁 Prisma ORM **v6.11.11**
- 🧠 Redis for **smart cache versioning**

---

## 📁 Project Structure

src/
│
├── modules/
│ └── user/
│ ├── user.controller.ts
│ ├── user.service.ts
│ ├── user.repository.ts
│ ├── user.entity.ts
│ └── user.dto.ts
│
├── config/
│ ├── database.ts
│ └── redis.ts
│
├── app.ts
└── main.ts


---

## ⚙️ Setup & Installation

```bash
# Clone repository
git clone https://github.com/programmingwithnavilla/nodejs-redis-versioning.git
cd nodejs-redis-versioning

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Create .env file
cp .env.example .env

# Start development server
npm run dev

---
# 🧪 API Testing via curl

## ➕ Create user

curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com"}'

## 📥 Get all users
curl http://localhost:3000/users

## 🛠 Update user
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Updated"}'

## ❌ Delete user
curl -X DELETE http://localhost:3000/users/1

🧠 Redis Caching & Versioning

 Concept:
To ensure data freshness while caching:

Global versioning for list cache:
users:version → 4
Cached as: users-v4

Per-user versioning for individual cache:
user:1:version → 3
Cached as: user:1-v3

How it works:
When GET /users is called:

Checks users:version

If cache users-v{version} exists → return

Else fetch from DB → set cache for that version

When POST/PUT/DELETE is called:

Increments users:version (and user:{id}:version if applicable)

Ensures subsequent reads fetch fresh data

No need to manually invalidate old keys — versioning handles it automatically.
