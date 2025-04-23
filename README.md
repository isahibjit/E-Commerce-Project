# 🛍️ Extrobuy

Extrobuy is a full-stack e-commerce web application built using the **PERN stack** (PostgreSQL, Express.js, React, Node.js). This platform allows users to browse, search, and purchase a variety of **clothing products** online. It offers a clean UI, secure backend, and seamless user experience tailored for fashion enthusiasts.

---
## Link -> <a target="_blank" href="https://e-commerce-project-frontend-3h97.onrender.com/">Visit Extrobuy </a>

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
EXTROBUY/
├── Backend/                    # Express.js backend
│   ├── Config/                 # Configuration files (DB, etc.)
│   ├── Controller/             # Route controllers
│   ├── Middlewares/           # Express middlewares
│   ├── Routes/                 # API route definitions
│   ├── Services/               # Business logic layer
│   ├── Stripe/                 # Stripe payment integration
│   ├── Utils/                  # Utility/helper functions
│   ├── temp/                   # Make sure you have a temp folder inside public !!!!
│   ├── .env                    # Environment variables for backend
│   ├── package.json
│   ├── package-lock.json
│   └── server.js               # Entry point of backend server
│
├── Frontend/                   # React frontend
│   ├── public/
│   ├── src/
│   │   ├── Admin/              # Admin panel components
│   │   ├── AppLayout/          # Layout components for pages
│   │   ├── assets/             # Static assets (images, etc.)
│   │   ├── Authentication/     # Login, Signup etc.
│   │   ├── Authentications/    # Possibly advanced auth utils
│   │   ├── Cart/               # Cart features
│   │   ├── Contexts/           # React contexts for state management
│   │   ├── Layouts/            # Shared layout components
│   │   ├── Orders/             # Orders management
│   │   ├── Pages/              # Different page components
│   │   ├── utils/              # Frontend utility functions
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── index.html
│   │   └── main.jsx            # React root render
│   ├── .env                    # Environment variables for frontend
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
│
├── .gitignore
├── README.md                   # Project documentation

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
-AI Chatbot: Integrate an AI-powered chatbot using xAI’s Grok API to provide real-time customer support, product recommendations, and order tracking. Features include conversational commerce, multilingual support, and admin assistance for managing queries.
- Implement advanced search filters for faster product discovery.
- Add support for multiple payment gateways beyond Stripe.
- Introduce a wishlist feature for users to save favorite products.
- Enhance mobile responsiveness for a better user experience on smaller screens.


---

## 📸 Screenshots

### Admin Dashboard
![Home Page](https://res.cloudinary.com/sunnysingh78376/image/upload/v1745381392/Screenshot_2025-04-23_093405_a0eeho.png)
*The landing page of Extrobuy showcasing the latest arrivals and bestsellers.*

### Add Items (Admin)
![Latest Arrivals](https://res.cloudinary.com/sunnysingh78376/image/upload/v1745381391/Screenshot_2025-04-23_093417_cbutnp.png)
*Highlighting the newest clothing items available for purchase.*

### Orders (Admin)
![Orders](https://res.cloudinary.com/sunnysingh78376/image/upload/v1745381390/Screenshot_2025-04-23_093441_fiu49k.png)
*Admin view of customer orders and their status.*


### List Items
![All Collections](https://res.cloudinary.com/sunnysingh78376/image/upload/v1745381391/Screenshot_2025-04-23_093427_hfx9c6.png)
*Browse through all clothing collections with filtering options.*

### Latest Arrivals
![About Us](https://res.cloudinary.com/sunnysingh78376/image/upload/v1745381391/Screenshot_2025-04-23_093112_su4ptp.png)
*Learn more about Extrobuy and what we offer.*

### Collections
![Contact Us](https://res.cloudinary.com/sunnysingh78376/image/upload/v1745381391/Screenshot_2025-04-23_093237_u5zax7.png)
*Get in touch with us through various contact methods.*

### About us
![Admin Dashboard](https://res.cloudinary.com/sunnysingh78376/image/upload/v1745381390/Screenshot_2025-04-23_093251_j7wqk6.png)
*Admin panel for managing products, orders, and customers.*

### Contact us
![Add Items](https://res.cloudinary.com/sunnysingh78376/image/upload/v1745381390/Screenshot_2025-04-23_093304_vdmr9g.png)
*Interface for admins to add new clothing products.*

### Product Cards
![List Items](https://res.cloudinary.com/sunnysingh78376/image/upload/v1745381390/Screenshot_2025-04-23_093222_adjtqc.png)
*View and manage the list of all products.*


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

