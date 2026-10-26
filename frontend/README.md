# Foodie frontend

A React/Vite food ordering demo with menu browsing, a shared in-memory cart, signup, checkout, and sample contact information in the footer.

## Run locally

```sh
npm install
npm run dev
```

The cart is client-side demo state and resets when the page is refreshed. Until an API URL is configured, signup and checkout show a clear demo-mode message and do not store or transmit form data.

## Connect a backend

Copy `.env.example` to `.env.local` and set `VITE_API_BASE_URL` to your backend origin (do not commit credentials):

```dotenv
VITE_API_BASE_URL=http://localhost:3000
```

Restart the Vite dev server after changing environment variables. The frontend expects these JSON endpoints:

### `POST /api/auth/signup`

Request:

```json
{ "name": "Sam Example", "email": "sam@example.com", "password": "at-least-8-characters" }
```

The API should return a success JSON response, or a non-2xx response with a useful `{ "message": "..." }`. Password storage and hashing belong on the backend; this frontend does not persist credentials.

### `POST /api/auth/forgot-password`

Request:

```json
{ "email": "sam@example.com" }
```

Return a generic success response whether or not that email is registered, to avoid revealing which accounts exist. The backend should generate a time-limited, single-use reset token and deliver the reset link through its configured email provider; never send the token in the response.

### `POST /api/orders`

Request body:

```json
{
  "customer": {
    "firstName": "Sam",
    "lastName": "Example",
    "email": "sam@example.com",
    "address": "123 Sample Street",
    "city": "Sample City",
    "postalCode": "12345",
    "phone": "555-0100",
    "notes": ""
  },
  "items": [
    { "productId": "1", "name": "Greek salad", "quantity": 2, "unitPrice": 12 }
  ],
  "subtotal": 24,
  "deliveryFee": 2.99,
  "total": 26.99,
  "paymentMethod": "cash_on_delivery"
}
```

The response may include an `orderId` for the confirmation message. The backend must validate product IDs, prices, quantities, totals, and delivery details itself; values sent by the browser are not trusted. Configure CORS on the backend to allow the frontend origin. The API client is in `src/services/api.js`; update its endpoint paths there if the backend uses a different route contract.
