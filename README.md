# SidesSocial API

NestJS GraphQL API for user, auth, survey, comments, likes, replies, and role management.

## Tech Stack

- NestJS
- GraphQL
- TypeORM
- MySQL
- Socket.IO

## Prerequisites

- Node.js 18+ recommended
- npm
- MySQL server

## Project Setup

Install dependencies:

```bash
npm install
```

## Database Configuration

This project loads configuration from [`config/configuration.ts`](/home/pooja/Desktop/client Project/Vivek Sir/sidessocial_API/config/configuration.ts).

Current application settings include:

- Port: `3001`
- Database type: `MySQL`
- TypeORM `synchronize`: `true`

Important:

- The app will automatically create or update tables from the entity files when the server starts successfully.
- The MySQL database itself must already exist before starting the project.
- If the database connection fails, tables will not be created.

## Run the Project

Start the development server:

```bash
npm run start
```

The API will run at:

```text
http://localhost:3001/graphql
```

## Database and Table Creation

When you run the project, NestJS starts TypeORM with `synchronize: true` in [`src/app.module.ts`]. Because of that:

- If the MySQL connection is successful, TypeORM will create the required tables automatically.
- If tables already exist, TypeORM will update them based on the current entity definitions.
- This confirms that table creation happens during application startup.

Main entities used for table creation:

- `User`
- `Role`
- `Survey`
- `SurveyQuestions`
- `SurveyQuestionAnswers`
- `SurveyComments`
- `SurveyCommentLikes`
- `SurveyCommentReplies`

## Available Scripts

```bash
npm run build
npm run start
npm run start:debug
npm run test
npm run test:e2e
```

## Notes

- GraphQL schema is generated automatically.
- Uploaded files are served from `/uploads`.
- CORS is enabled.
