# Car Rental Skeleton (Next.js + TS)

Каркас порожнього проєкту під ТЗ:

- Next.js App Router
- TypeScript
- Axios
- Zustand (global store + persisted favorites)
- CSS Modules

## Routes

- `/` - home with CTA "View Catalog"
- `/catalog` - catalog with backend filtering (brand, price, mileage from/to) + favorites + load more
- `/catalog/:id` - details page + booking form

## Run

```bash
npm install
npm run dev
```

## Notes

- Backend filtering and pagination are implemented in Next API routes (`/api/vehicles`).
- Booking submit goes to `/api/bookings` and returns success notification.
