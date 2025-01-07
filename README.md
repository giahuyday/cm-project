# Fullstack CM Project

## 🚀 Tech Stack

-   **Database**: PostgreSQL
-   **Backend**: NestJS, TypeORM, GraphQL
-   **Frontend**: NextJS, TailwindCSS, GraphQL

---

## 🛠 How to Run Locally

### Frontend

```bash
cd client
npm install
npm run build
npm start
```

### Backend

```bash
cd server
npm install
npm run build
npm start
```

📂 GitHub Repositories

-   Backend: [cm-nestjs-be](https://github.com/giahuyday/cm-nestjs-be)
-   Frontend: [cm-next-fe](https://github.com/giahuyday/cm-next-fe)
-   Both projects use GraphQL instead of REST API.

## 🐳 Build & Run with Docker

Build and start all services:

```bash
docker compose up -d
```

Access services:

-   Backend (GraphQL Playground): http://localhost:3001/graphql
-   Frontend: http://localhost:3000/
-   Postgres: http://localhost:54321/
