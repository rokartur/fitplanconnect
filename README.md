<div align='center'>
  <img src='assets/fitplan.png' width='256' alt=''>
</div>

## About

FitPlan Connect is a scheduling app that has earned recognition as one of the best on the market thanks to its array of advanced features and intuitive user interface. **This project is part of the Object-Oriented Programming subject at the University.**

## Features

- Fast create account and login with GitHub OAuth
- Planning and tracking meetings with personal trainers
- Choose your personal trainer
- Preview your plan along with your subscription end date

## Installation

1. Install the latest LTS version of [Node.js](https://nodejs.org/en/download/)
2. Install [yarn](https://yarnpkg.com/en/docs/install), run the following command:
    ```bash
    npm i -g yarn
     ```
3. Click `Code` button on the top right of this page and copy the link under `Clone` tab.
4. Open project in any IDE of your choice.
5. Install nginx and configure it with the
   following [config](https://github.com/rokartur/fitplanconnect/blob/main/nginx.conf)
6. **Frontend** Open terminal and run the following command:
    ```bash
    cd website
    yarn
    yarn dev
    ```
7. **Backend** Open another terminal and run the following command:
    ```bash
    cd backend
    bun install
    bun run --watch src/app.ts
    ```
8. Environment file should be created in the root of the backend folder with the following content:
    ```dotenv
    OAUTH_CLIENT_ID=""
    OAUTH_CLIENT_SECRET=""
    OAUTH_REDIRECT_URI="http://localhost/api/oauth/callback"
    DB_URL="postgresql://user:password@host:port/database"
    ```

## Database Schema

![Database Schema](https://raw.githubusercontent.com/rokartur/fitplanconnect/main/assets/db-uml.png)

## Technologies
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [ElysiaJS](https://elysiajs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Bun](https://bun.sh/)
- [Nginx](https://nginx.org/en/)
- [GitHub OAuth](https://docs.github.com/en/apps)

## License
[“Commons Clause” License Condition v1.0](https://github.com/rokartur/fitplanconnect/tree/main?tab=License-1-ov-file)

## Authors
- [Artur Rok](https://github.com/rokartur)
- [Paweł Polok](https://github.com/polokpawel)
