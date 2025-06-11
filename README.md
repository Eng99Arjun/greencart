# GreenCart

GreenCart is a full-stack e-commerce web application for grocery shopping, featuring user authentication, product management, cart, order placement (COD & Stripe), and seller/admin dashboard.

---

## Project Structure

```
greencart/
  client/    # React frontend (Vite)
  server/    # Node.js + Express backend
```

---

## Features

### User
- Browse products by category
- Product details & related products
- Add to cart, update quantity, remove items
- Address management
- Place orders (Cash on Delivery or Online via Stripe)
- View order history

### Seller/Admin
- Secure seller login
- Add new products (with images)
- Manage product list & stock
- View all orders

---

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Axios, React Router, React Hot Toast
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT Auth, Stripe, Cloudinary (for images)
- **Other:** dotenv, cookie-parser, multer

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB Atlas account (or local MongoDB)
- Stripe account (for online payments)
- Cloudinary account (for image uploads)

---

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd greencart
```

---

### 2. Setup the Server

```bash
cd server
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `server/` folder:

```
NODE_ENV=development
PORT=4000
JWT_SECRET=your_jwt_secret

SELLER_EMAIL=admin@dummy.com
SELLER_PASSWORD=admin@123

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SERCRET=your_stripe_webhook_secret

MONGODB_URI=your_mongodb_connection_string
```

#### Start the Server

```bash
npm start
```

---

### 3. Setup the Client

```bash
cd ../client
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `client/` folder:

```
VITE_CURRENCY=$
VITE_BACKEND_URL=http://localhost:4000
```

#### Start the Client

```bash
npm run dev
```

---

## Usage

- Visit `http://localhost:5173` to use the app.
- Register/login as a user to shop.
- Login as seller at `/seller` using the credentials from your `.env`.
- Add/manage products, view orders as seller.

---

## Folder Structure

### Client

- `src/pages/` - Main pages (Home, Cart, MyOrders, ProductDetails, Seller pages)
- `src/components/` - Reusable UI components (Navbar, ProductCard, etc.)
- `src/context/` - App-wide context and state management
- `src/assets/` - Images and static assets

### Server

- `controllers/` - Route controllers (user, seller, product, order, cart, address)
- `routes/` - Express route definitions
- `models/` - Mongoose models (User, Product, Order, Address, etc.)
- `middleware/` - Auth and other middleware
- `configs/` - DB, Cloudinary, Multer configs

---

## API Endpoints

### User
- `POST /api/user/register` - Register
- `POST /api/user/login` - Login
- `GET /api/user/is-auth` - Check auth
- `GET /api/user/logout` - Logout

### Product
- `GET /api/product/list` - List products
- `POST /api/product/add` - Add product (seller)
- `POST /api/product/stock` - Change stock (seller)

### Cart
- `POST /api/cart/update` - Update cart

### Address
- `POST /api/address/add` - Add address
- `GET /api/address/get` - Get addresses

### Order
- `POST /api/order/cod` - Place COD order
- `POST /api/order/stripe` - Place Stripe order
- `GET /api/order/user` - Get user orders
- `GET /api/order/seller` - Get all orders (seller)

---


## License

This project is for educational/demo purposes.  
Feel free to use and modify as needed.

---

**Happy Shopping! 🛒**
