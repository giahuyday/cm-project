# FrontEnd for Class Management System

## 🚀 Tech Stack

-   **Framework**: NextJS, Tailwind CSS
-   **Styling**: Tailwind CSS
-   **API**: GraphQL
-   **State Management**: Apollo Client (GraphQL)

---

## 🛠 How to Run Code

```bash
cp .env.example .env.local
npm install
npm run build
npm run start
```

## Incase

-   You dont want to run server

```bash
docker run -d --name cm_server -p 3001:3000 -e DB_HOST=host.docker.internal  -e DB_PORT=5432  -e DB_USERNAME=postgres  -e DB_PASSWORD=root  -e DB_DATABASE=cm_nest giahuyday/cm_nestjs:latest
```

-   You dont have local postgres db

```bash
docker run -d --name postgres_db -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=root -e POSTGRES_DB=cm_nest postgres:15
```

## Access services:

-   Backend (GraphQL Playground): http://localhost:3001/graphql
-   Frontend: http://localhost:3000/
-   Postgres: http://localhost:54321/
