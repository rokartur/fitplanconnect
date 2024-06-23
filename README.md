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

## 🇵🇱 Podsumowanie
### Koncept

Założenia projektu były ogromne, udało nam się zrealizować cześć z nich. Aplikacja posiada podstawowe funkcjonalności, takie jak logowanie, wybór trenera, planowanie treningu personalnego z wybranym trenerem oraz jego podgląd. Aplikacja jest w pełni responsywna, co pozwala na korzystanie z niej na każdym urządzeniu.

Mieliśmy w planach rozbudowanie jej o dodatkowe funkcjonalności, aplikacja miała być podzielona na dwa moduły panel dla trenerów personalnych oraz główna aplikacja dla ich podopiecznych. Panel dla trenerów miał posiadać:
- Przegląd gdzie byłyby widoczne wszystkie statystyki sprzedaży usługi, statystyki treningowe oraz użytkowników.
- Zakładkę wszystkich użytkowników z możliwością sortowania oraz filtrowania po najważniejszych danych, oraz informacje o konkretnym użytkowniku, gdzie byłyby wyświetlane wszystkie dostępne dane za wyjątkiem hasła.
- Kalendarz dla zalogowanego trenera, gdzie byłyby widoczne wszystkie treningi z przypisanymi podopiecznymi oraz możliwość zmiany harmonogramy dostępności dla trenera, kiedy można z nim ćwiczyć, a kiedy nie.
- Zakładkę do zarządzania wszystkimi trenerami, byłby jeden główny trener z rolą "ADMIN", który miałby dostęp i mógłby zarządzać trenerami. Dostępne byłyby 3 role ADMIN, EDITOR, VIEWER. Editor mógłby przesyłać plany treningowe oraz diety, dla podopiecznego. Viewer mógłby tylko wyświetlać dane o konkretnym użytkowniku.
- Ostatnią zakładką byłyby kody promocyjne oraz cały system do zarządzania nimi. Wyświetlana byłaby lista wszystkich kodów z opcją filtrowania po statusie czy jest aktywny, czy nie oraz po typie kodu, czy jest on procentowy lub stały. Możliwość sortowania byłaby przypisana dla wartości nazwy kodu, wartości, czasu wygaśnięcia, pozostałej liczbie użyć, ilości zamówieniach z danym kodem. Opcja byłaby przypisana danego kodu rabatowego dla konkretnej lub wszystkich usług oraz można byłoby je usuwać, lub dezaktywować.

Natomiast aplikacja dla użytkowników została zrealizowana w części. Posiada ona teraz:
- Kalendarz, poprzez który podopieczni mogą umawiać się w określonych dniach o określonej godzinie na trening z wybranym trenerem.
- Podstronę z wyborem dostępnych trenerów personalnych, użytkownik może ich sobie zmieniać w dowolnym momencie.
- Opcję płatności, gdzie przydzielany jest dostęp do aplikacji po pozytywnie zrealizowanym zakupie rocznego pakietu.
- Ustawienia, gdzie użytkownik może zobaczyć, jak wyglądają jego dane tzn. nazwa użytkownika oraz email, które są powiązane z kontem GitHub, poprzez które można się zalogować. Aplikacja głównie została stworzona dla siedzących programistów 😉

Są jeszcze anulowane plany dla głównej aplikacji użytkowników. Było kilka systemów:
- System raportów użytkownika, gdzie przesyłałby swoje raporty sylwetki co określony czas.
- System diet oraz planów treningowych, gdzie użytkownik miałby dostęp do przesłanych materiałów przez trenera.

Z mniejszych ogólnych rzeczy, miało być więcej zbieranych danych o użytkownikach w celu wystawienia automatycznej faktury elektronicznej na maila, po pozytywnie zrealizowanej płatności. Temat z logowaniem oraz rejestracją miał wyglądać kompletnie inaczej, niż jest obecnie. Przeszło przez nasze głowy bardzo dużo opcji zaczęło się od standardowej metody za pomocą maila i hasła oraz późniejsza weryfikacja za pomocą JWT (JSON Web Token) poprzez link na maila. Zaczęliśmy minimalizować ilość interakcji, jaką użytkownik musi wykonać, aby korzystać z naszej aplikacji, więc chcieliśmy przejść do metody za pomocą OTP (One-Time Password), ale nie za pomocą 6 cyfrowego kodu tylko passphrase, a później za pomocą samego linku weryfikacyjnego z JWT przesyłanego na maila. Jesteśmy w miejscu i sytuacji, gdzie można się zalogować za pomocą 2 kliknięć, autoryzując się za pomocą zewnętrznego dostawcy w tym przypadku GitHuba przy użyciu biblioteki "arctic", która obsługuje 47 różnych popularnych dostawców takich jak Google, Facebook, Apple, Microsoft kończąc po osu!, MyAnimeList, Keycloak czy Roblox. Pozwala to na elastyczne skalowanie i szybkie dodawanie kolejnych dostawców autoryzacji, co pozwoli dotrzeć do większej ilości użytkowników i się do nich dostosować.

Całość projektu była dokładnie planowana podczas pierwszych spotkań oraz ewentualnie korygowana i kwestionowana wraz z rozwojem projektu. Wszystkie plany koncepcyjne oraz makietę projektową, zostały wykonane we Figmie oraz FigJamie, do których linki są w sekcji [Resources](https://github.com/rokartur/fitplanconnect?tab=readme-ov-file#resources).

Jednak z powodu ograniczeń czasowych nie udało nam się zrealizować w pełni naszych założeń. Mimo to jesteśmy zadowoleni z tego, co udało nam się zrobić.

### Technologie

... do uzupełnienia

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
