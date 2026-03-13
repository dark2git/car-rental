# Car Rental Skeleton

> A Next.js + TypeScript skeleton project — a ready-to-extend foundation for a car rental web application with catalog browsing, filtering, favorites, and booking.

## Features

- Browse a vehicle catalog with server-side filtering by brand, price range, and mileage
- Save favorite vehicles (persisted via Zustand store)
- Load more pagination on the catalog page
- Vehicle detail page with a booking form
- Success notification on booking submission
- Backend API routes built into Next.js (`/api/vehicles`, `/api/bookings`)

## Tech Stack

| Layer            | Technology                                   |
| ---------------- | -------------------------------------------- |
| Framework        | Next.js 15+ (App Router)                     |
| Language         | TypeScript                                   |
| HTTP Client      | Axios                                        |
| State Management | Zustand (global store + persisted favorites) |
| Styles           | CSS Modules                                  |

## Routes

| Path           | Description                                      |
| -------------- | ------------------------------------------------ |
| `/`            | Home page with CTA "View Catalog"                |
| `/catalog`     | Catalog with filtering, favorites, and load more |
| `/catalog/:id` | Vehicle details page + booking form              |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Run in development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

## API

| Endpoint               | Method | Description                                                                                                        |
| ---------------------- | ------ | ------------------------------------------------------------------------------------------------------------------ |
| `/api/vehicles`        | GET    | List vehicles with optional filters (`brand`, `priceMin`, `priceMax`, `mileageFrom`, `mileageTo`, `page`, `limit`) |
| `/api/vehicles/brands` | GET    | List all available brands                                                                                          |
| `/api/vehicles/:id`    | GET    | Get vehicle details by ID                                                                                          |
| `/api/bookings`        | POST   | Submit a booking request                                                                                           |

## Author

**Vadym Samardak** — Junior Frontend Developer

Frontend developer with practical experience in building responsive interfaces, working with React, and managing development environments on Linux and Docker.

**Tech Stack:** JavaScript · React · TypeScript · Next.js · Zustand · HTML5 · CSS3 · Git · Docker · Linux · REST API

- 💼 [LinkedIn](https://www.linkedin.com/in/vadym-samardak)
- ✈️ [Telegram](https://t.me/dark2care)
- 🐙 [GitHub](https://github.com/dark2git)
