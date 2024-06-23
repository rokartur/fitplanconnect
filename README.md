<div align='center'>
  <img src='assets/fitplan.png' width='256' alt=''>
</div>

## About

FitPlan Connect is a scheduling app that has earned recognition as one of the best on the market thanks to its array of advanced features and intuitive user interface. **This project is part of the Object-Oriented Programming subject at the University.**

## Features

- [x]  Fast create account and login with GitHub OAuth
- [x] Planning and tracking meetings with personal trainers
- [ ] Choose your personal trainer
- [x] Preview your plan along with your subscription end date

## Installation

1. Install the latest LTS version of [Node.js](https://nodejs.org/en/download/)
2. Install [yarn](https://yarnpkg.com/en/docs/install), run the following command:
    ```bash
    npm i -g yarn
     ```
3. Install [bun](https://bun.sh/), run the following command for Linux & macOS:
    ```bash
    curl -fsSL https://bun.sh/install | bash
    ```
    or for Windows:
    ```bash
    powershell -c "irm bun.sh/install.ps1 | iex"
    ```
4. Click `Code` button on the top right of this page and copy the link under `Clone` tab.
5. Open project in any IDE of your choice.
6. Install nginx and configure it with the
   following [config](https://github.com/rokartur/fitplanconnect/blob/main/nginx.conf)
7. **Frontend** Open terminal and run the following command:
    ```bash
    cd website
    yarn
    yarn dev
    ```
8. **Backend** Open another terminal and run the following command:
    ```bash
    cd backend
    bun install
    bun run dev
    ```
9. Environment file should be created in the root of the backend folder with the following content:
    ```dotenv
    OAUTH_CLIENT_ID=""
    OAUTH_CLIENT_SECRET=""
    OAUTH_REDIRECT_URI="http://localhost/api/oauth/callback"
    DB_URL="postgresql://user:password@host:port/database"
    STRIPE_PUBLISHABLE_KEY=""
    STRIPE_SECRET_KEY=""
    STRIPE_SUCCESS_KEY=""
    ```
10. Setup database with the following command:
    ```bash
    bun run db:generate
    bun run db:migrate
    ```
11. For the database preview you can use the following command:
    ```bash
    bun run db:studio
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

## 🇵🇱 Summary


## Resources
- [Website](https://fitplanconnect.site/)
- [API Documentation](https://docs.fitplanconnect.site/reference)
- [GitHub](https://github.com/rokartur/fitplanconnect)
- [Figma Design](https://www.figma.com/design/EDRxiPZHsJCeHKlrh08gsY/fitplanconnect?node-id=0-1&t=V9B6evOnen69xHga-1)
- [Figma Concept](https://www.figma.com/board/RMC8nNxTpV9zmUGCyHQcvy/fitplanconnect?node-id=0-1&t=5IN80e5pnA5W9Tyq-1)

## License
[“Commons Clause” License Condition v1.0](https://github.com/rokartur/fitplanconnect/?tab=License-1-ov-file)

## Authors
- [Artur Rok](https://github.com/rokartur)
- [Paweł Polok](https://github.com/polokpawel)
