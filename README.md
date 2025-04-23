```
# 🛍️ Extrobuy

Extrobuy is a full-stack e-commerce web application built using the **PERN stack** (PostgreSQL, Express.js, React, Node.js). This platform allows users to browse, search, and purchase a variety of **clothing products** online. It offers a clean UI, secure backend, and seamless user experience tailored for fashion enthusiasts.

---

## 🔗 Link  
👉 <a target="_blank" href="https://e-commerce-project-frontend-3h97.onrender.com/">Visit Extrobuy</a>

---

## ✨ Features

- 🛒 User-friendly product browsing and cart system  
- 🔐 User registration and login with authentication  
- 👕 Clothing product listings with images, prices, and details  
- 📦 Add to cart, remove from cart, and checkout functionality  
- 💳 Integrated Stripe Checkout for secure payments  
- 📈 Admin dashboard for managing products (CRUD operations)  
- 🗃️ PostgreSQL database integration for storing products and user data  
- 🧠 Session persistence using `express-session` with `pg-simple`  
- ⚙️ RESTful API built with Express.js and Node.js  
- 💡 Responsive frontend built with React and styled using **Tailwind CSS** and **DaisyUI**

---

## 🧱 Tech Stack

### 🖥️ Frontend

- **React.js**
- **React Router**
- **Axios**
- **Tailwind CSS**
- **DaisyUI**

### ⚙️ Backend

- **Node.js**
- **Express.js**
- **bcrypt** for password hashing
- **jsonwebtoken (JWT)** for authentication
- **express-session** with **pg-simple** for session storage

### 🗃️ Database

- **PostgreSQL**
- **pg** (PostgreSQL client for Node.js)

### 💳 Payment

- **Stripe API** for checkout and secure payments

---

## 📁 Project Structure

```
EXTROBUY/
├── Backend/
│   ├── Config/
│   ├── Controller/
│   ├── Middlewares/
│   ├── Routes/
│   ├── Services/
│   ├── Stripe/
│   ├── Utils/
│   ├── temp/
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── Admin/
│   │   ├── AppLayout/
│   │   ├── assets/
│   │   ├── Authentication/
│   │   ├── Authentications/
│   │   ├── Cart/
│   │   ├── Contexts/
│   │   ├── Layouts/
│   │   ├── Orders/
│   │   ├── Pages/
│   │   ├── utils/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── index.html
│   │   └── main.jsx
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
│
├── .gitignore
├── README.md
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
npm install
```

- Create a `.env` file with the following variables:

```env
PORT=5000
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_key
SESSION_SECRET=your_session_secret
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

- Create test users and log in  
- Add clothing products to the cart  
- Proceed to checkout using Stripe test cards  
- Use the admin dashboard to add or manage products and view orders  

---

## 💡 Future Improvements

- 🤖 **AI Chatbot**: Integrate xAI’s **Grok API** for real-time support, recommendations, and tracking  
- 🔍 Advanced product search filters  
- 💰 Add more payment gateway options  
- ❤️ Wishlist feature  
- 📱 Enhanced responsiveness for mobile devices  

---

## 📸 Screenshots

### Admin Dashboard  
![Admin Dashboard](https://res.cloudinary.com/sunnysingh78376/image/upload/v1745381392/Screenshot_2025-04-23_093405_a0eeho.png)

### Add Items (Admin)  
![Add Items](https://res.cloudinary.com/sunnysingh78376/image/upload/v1745381391/Screenshot_2025-04-23_093417_cbutnp.png)

### Orders (Admin)  
![Orders](https://res.cloudinary.com/sunnysingh78376/image/upload/v1745381390/Screenshot_2025-04-23_093441_fiu49k.png)

### List Items  
![All Collections](https://res.cloudinary.com/sunnysingh78376/image/upload/v1745381391/Screenshot_2025-04-23_093427_hfx9c6.png)

### Latest Arrivals  
![Latest Arrivals](https://res.cloudinary.com/sunnysingh78376/image/upload/v1745381391/Screenshot_2025-04-23_093112_su4ptp.png)

### Collections  
![Collections](https://res.cloudinary.com/sunnysingh78376/image/upload/v1745381391/Screenshot_2025-04-23_093237_u5zax7.png)

### About Us  
![About Us](https://res.cloudinary.com/sunnysingh78376/image/upload/v1745381390/Screenshot_2025-04-23_093251_j7wqk6.png)

### Contact Us  
![Contact Us](https://res.cloudinary.com/sunnysingh78376/image/upload/v1745381390/Screenshot_2025-04-23_093304_vdmr9g.png)

### Product Cards  
![Product Cards](https://res.cloudinary.com/sunnysingh78376/image/upload/v1745381390/Screenshot_2025-04-23_093222_adjtqc.png)

---

## 🧑‍💻 Author

**Sahibjeet Singh**  
BCA Graduate, GNDU  
Aspiring Software Engineer  
[LinkedIn](#) | [Portfolio](#)

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
```
