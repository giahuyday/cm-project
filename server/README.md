# Class managements APIs with NestJS

## 🚀 Tech Stack

-   **Framework**: NestJS
-   **API**: GraphQL
-   **State Management**: Apollo server (GraphQL)

---

## Features

The migration includes:

1. **DTO Validation**: validate input data using `class-validator`, `class-transformers`.
2. **Error Handling**: build up custom exception filters to manage error response.
3. **Role-Based Access Control**: use `guards` authorize users with `bearer token` with 3 roles `admin`, `principal`, `teacher`

---

## **Running the Project**

### 1. Clone the Repository

```bash
git clone git@github.com:giahuyday/cm-nestjs-be.git
cd cm-nestjs-be
```

### 3. Install dependencies

```bash
cp .env.example .env
npm install
```

### 4. Compile and run the project

```bash
npm run start
npm run start:dev
npm run start:prod
```

## Incase

-   You dont want to run client

```bash
docker run -d --name cm_client -p 3000:3000 giahuyday/cm_nextjs:v4
```

-   You dont have local postgres db

```bash
docker run -d --name postgres_db -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=root -e POSTGRES_DB=cm_nest postgres:15
```
## Access services:

-   Backend (GraphQL Playground): http://localhost:3001/graphql
-   Frontend: http://localhost:3000/
-   Postgres: http://localhost:54321/


### 5. API Role Permissions

| Role      | Permissions                                    |
| --------- | ---------------------------------------------- |
| Admin     | Full access to all APIs.                       |
| Principal | CRUD operations on Classes, view student list. |
| Teacher   | CRUD operations on Students, view class list.  |