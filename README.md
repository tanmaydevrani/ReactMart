# ReactMart

A single-page e-commerce app built with React and Redux Toolkit. Users can browse products, filter and search, manage a cart, and go through a full checkout flow — all with persistent auth via localStorage.

---

## Features

- **Product listing** — fetches products from FakeStore API with category filter, text search, and sort (price / rating)
- **Cart** — slide-in sidebar with live quantity management, GST calculation, and running total
- **Checkout flow** — address form → payment page with order summary and confirmation
- **Auth** — signup / login with form validation (React Hook Form + Zod), persisted to localStorage
- **Protected routes** — unauthenticated users are redirected to login

---

## Tech Stack

| Layer | Library |
|---|---|
| UI | React 18 |
| State | Redux Toolkit |
| Routing | React Router v6 |
| Forms | React Hook Form + Zod |
| Styling | Tailwind CSS v4 |
| Data | FakeStore API |
| Build | Vite |

---

## Getting Started

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`

**Demo account** (pre-seeded on first load):
```
Email:    demo@reactmart.com
Password: demo123
```

Or create your own account from the signup page.

---

## Project Structure

```
src/
├── components/
│   ├── AddAddress.jsx   # address form rendered inside cart sidebar
│   ├── Cards.jsx        # single product card with add/remove controls
│   ├── Cart.jsx         # cart sidebar — items, bill summary, checkout trigger
│   └── Logo.jsx
├── features/
│   ├── authSlice.js     # signup, login, logout — persisted to localStorage
│   └── cartSlice.js     # add, remove, clear, finalBill
├── pages/
│   ├── auth/
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── Dashboard.jsx    # header + product listing
│   ├── Header.jsx
│   ├── Payment.jsx      # order summary + card form + success state
│   └── ProductsList.jsx # fetches products, handles filter/search/sort
├── store/
│   └── store.js
└── App.jsx              # route definitions + auth guards
```

---

## State Management

Redux Toolkit manages two slices:

**`authSlice`** — holds the users array, currentUser, and isLoggedIn flag. Both the users list and currentUser are written to localStorage so sessions survive a page refresh.

**`cartSlice`** — holds items, totalQuantity, totalPrice, gst, and grandTotal. The `finalBill` action is dispatched before navigating to payment so the payment page can read the calculated totals without re-computing them.

---

## Notes

- No backend — auth is simulated with localStorage. In a real app I'd replace this with a proper API + JWT.
- FakeStore API can be slow on first load; there's a spinner while products fetch.
- Cart state is not persisted across refreshes (intentional — keeping the scope focused).
