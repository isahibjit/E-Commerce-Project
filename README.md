# 🛍️ Extrobuy

Extrobuy is a full-stack e-commerce web application built using the **PERN stack** (PostgreSQL, Express.js, React, Node.js). This platform allows users to browse, search, and purchase a variety of **clothing products** online. It offers a clean UI, secure backend, and seamless user experience tailored for fashion enthusiasts.

---

## ✨ Features

- 🛒 User-friendly product browsing and cart system  
- 🔐 User registration and login with authentication  
- 👕 Clothing product listings with images, prices, and details  
- 📦 Add to cart, remove from cart, and checkout functionality  
- 💳 Integrated Stripe Checkout for secure payments  
- 📈 Admin dashboard for managing products (CRUD operations)  
- 🗃️ PostgreSQL database integration for storing products and user data  
- ⚙️ RESTful API built with Express.js and Node.js  
- 💡 Responsive frontend built with React  

---

## 🧱 Tech Stack

### 🖥️ Frontend
- **React.js**
- **React Router**
- **Axios**
- **Tailwind CSS** (or any styling library you used)

### ⚙️ Backend
- **Node.js**
- **Express.js**
- **bcrypt** for password hashing
- **jsonwebtoken (JWT)** for authentication

### 🗃️ Database
- **PostgreSQL**
- **pg** (PostgreSQL client for Node)

### 💳 Payment
- **Stripe API** for checkout and payments

---

## 📁 Project Structure

```
extrobuy/
├── client/             # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── App.js
├── server/             # Express backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── index.js
├── database/           # SQL setup and config
│   └── schema.sql
├── README.md
└── package.json
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/isahibjit/E-Commerce-Project.git
cd extrobuy
```

### 2. Setup Backend

```bash
cd server
npm run dev
```

- Add a `.env` file with the following variables:

```
PORT=5000
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_key
```

- Start the backend server:
```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

---

## 🧪 Testing

- Create test users and login  
- Add clothing products to the cart  
- Try checkout with Stripe test card  
- Admin can manage products through backend API or dashboard (if available)

---

## 💡 Future Improvements

- Admin dashboard UI
- Email verification and order tracking
- Product filters and sorting
- Wishlist and reviews
- Mobile app version

---

## 📸 Screenshots

*Coming Soon...*

---

## 🧑‍💻 Author

**Sahibjeet Singh**  
BCA Graduate, GNDU  
Aspiring Software Engineer  
[LinkedIn](#) | [Portfolio](#) 

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---

