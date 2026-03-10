# DayQuest - Habits Tracker

## What Is This App
A habit tracking app with gamification (XP + levels). Users register, log in, and track their habits. The app is called **DayQuest**.

---

## Tech Stack

### Backend
| Thing | What |
|---|---|
| Framework | NestJS (Node.js) |
| Language | TypeScript |
| Database | MySQL |
| ORM | TypeORM |
| Auth | JWT (Passport.js) |
| Password Hashing | bcrypt |
| Validation | class-validator |
| Config | @nestjs/config (loads .env) |

### Frontend
| Thing | What |
|---|---|
| Framework | React + Vite |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Icons | Lucide React |
| Forms | React Hook Form + Yup validation |
| HTTP Client | Axios |

---xfv                        v

## Folder Structure

```
Habits-Tracker/
├── backend/
│   └── src/
│       ├── app.module.ts               # Root module — DB config, global config
│       ├── main.ts                     # Entry point
│       ├── auth/
│       │   ├── auth.module.ts          # Auth module
│       │   ├── controller/auth/
│       │   │   └── auth.controller.ts  # POST /auth/login
│       │   ├── service/auth/
│       │   │   └── auth.service.ts     # Login logic, JWT signing
│       │   ├── strategies/
│       │   │   └── jwt.strategy.ts     # Passport JWT strategy
│       │   └── guards/
│       │       └── jwt.guard.ts        # JwtAuthGuard to protect routes
│       ├── users/
│       │   ├── users.module.ts
│       │   ├── controller/users/
│       │   │   └── users.controller.ts # POST /users/register, GET /users/:id
│       │   ├── service/users/
│       │   │   └── users.service.ts    # Register logic, findById
│       │   └── dto/
│       │       ├── create-user.dto.ts  # name, email, password (validated)
│       │       └── login-user.dto.ts   # email, password
│       ├── repositories/
│       │   └── user.repository.ts      # Abstract class (interface for DB)
│       ├── mysql-repositories/
│       │   └── mysql-user.repository.ts # TypeORM implementation
│       ├── typeorm/entities/
│       │   └── user.entity.ts          # User table: id, name, email, password, xp, level, createdAt
│       └── entities/
│           └── user.entity.ts          # (duplicate — use typeorm/entities one)
│
└── Frontend/
    └── src/
        ├── App.tsx                     # Renders current page
        ├── index.css                   # Tailwind + shadcn CSS vars
        ├── main.tsx                    # React entry point
        ├── pages/
        │   └── RegisterPage.tsx        # Register form (done)
        ├── components/
        │   └── ui/                     # shadcn components
        │       ├── button.tsx
        │       ├── card.tsx
        │       ├── form.tsx
        │       ├── input.tsx
        │       └── label.tsx
        ├── services/
        │   └── api.ts                  # Axios instance (baseURL: http://localhost:3000)
        └── lib/
            └── utils.ts                # shadcn utility (cn function)
```

---

## Architecture Patterns

### Repository Pattern (Backend)
The backend uses the **Repository Pattern** to decouple business logic from the database.

- `UserRepository` (in `repositories/`) — abstract class defining the contract (create, findByEmail, findById)
- `MysqlUserRepository` (in `mysql-repositories/`) — concrete TypeORM implementation
- In `AuthModule` and `UsersModule`, we inject `MysqlUserRepository` as the implementation of `UserRepository` using NestJS DI:

```ts
{
  provide: UserRepository,
  useClass: MysqlUserRepository,
}
```

This means if we ever switch from MySQL to Postgres or MongoDB, we only change the implementation — not the service logic.

### DTOs + Validation (Backend)
All incoming request bodies are typed using **DTOs** (Data Transfer Objects) with `class-validator` decorators. NestJS validates them automatically via the global `ValidationPipe`.

### JWT Auth Flow
1. User registers → `POST /users/register` → password hashed with bcrypt → saved to DB
2. User logs in → `POST /auth/login` → password compared with bcrypt → JWT token returned
3. Protected routes use `@UseGuards(JwtGuard)` → `JwtStrategy` validates the Bearer token
4. JWT payload contains `{ id, email }`

### Form Handling (Frontend)
All forms use **React Hook Form** with **Yup** schema validation:
- Schema defined with `yup.object().shape({...})`
- Connected to form via `yupResolver(schema)`
- shadcn `Form`, `FormField`, `FormItem`, `FormLabel`, `FormMessage` components used for consistent UI

---

## Database - User Table
| Column | Type | Notes |
|---|---|---|
| id | int | Auto increment PK |
| name | varchar | |
| email | varchar | Unique |
| password | varchar | Bcrypt hashed |
| xp | int | Default 0 (gamification) |
| level | int | Default 1 (gamification) |
| createdAt | datetime | Auto set |

`synchronize: false` — DB schema is managed manually, not auto-synced by TypeORM.

---

## Environment Variables (backend/.env)
```
MYSQL_DB_HOST=
MYSQL_DB_PORT=
MYSQL_DB_USERNAME=
MYSQL_DB_PASSWORD=
MYSQL_DB_NAME=
JWT_SECRET=
JWT_TOKEN_LIFETIME=
```

---

## API Endpoints (Done So Far)
| Method | Route | Auth | Description |
|---|---|---|---|
| POST | /users/register | No | Create new user |
| POST | /auth/login | No | Login, returns JWT token |
| GET | /users/:id | Yes (JWT) | Get user by ID |

---

## Design / UI
- Color scheme: Dark navy (`#0A0F1E` background, `#1A1F2E` card)
- Accent: Purple to Cyan gradient (`from-purple-600 to-cyan-500`)
- App branding: Target icon + "DayQuest" gradient text

---

## What Is Done
- [x] Backend project setup (NestJS + TypeORM + MySQL)
- [x] User entity with XP/level fields
- [x] User registration with bcrypt password hashing
- [x] JWT login returning token
- [x] JWT guard protecting routes
- [x] Repository pattern abstraction
- [x] Frontend project setup (React + Vite + Tailwind + shadcn)
- [x] Register page UI with form validation

## What Is Next
- [ ] Connect RegisterPage to `POST /users/register` API
- [ ] Build Login page
- [ ] Add routing (React Router)
- [ ] Dashboard / habits list page
- [ ] Create habit feature
- [ ] XP / level up logic
