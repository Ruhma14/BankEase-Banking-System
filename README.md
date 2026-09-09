# 🏦 Bank Account Management System

A full-stack **Bank Account Management System** built with HTML, CSS, JavaScript, Node.js, Express.js, MongoDB, and Mongoose.

The application allows users to create bank accounts, deposit money, withdraw money, track balances, and view transaction history through a responsive web dashboard.

---

## 🚀 Features

- Create bank account
- View account balance
- Deposit money
- Withdraw money
- Balance validation
- Insufficient balance protection
- Transaction history
- Total deposits
- Total withdrawals
- Success and error notifications
- Loading states
- Responsive dashboard
- REST API integration
- MongoDB database
- Mongoose data management
- Persistent database storage

---

## 🛠️ Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript (ES6)
- Fetch API
- Font Awesome
- Google Fonts

### Backend

- Node.js
- Express.js
- REST API
- CORS
- dotenv

### Database

- MongoDB
- Mongoose

---

## 📁 Project Structure

```text
Bank Management system/
│
├── frontend/
│   ├── assets/
│   ├── css/
│   │   └── styles.css
│   │
│   ├── js/
│   │   └── script.js
│   │
│   └── index.html
│
├── backend/
│   ├── models/
│   │   ├── Account.js
│   │   └── Transaction.js
│   │
│   ├── routes/
│   │   └── accountRoutes.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
└── README.md

API Endpoints
Create Account
POST /api/account
Get All Accounts
GET /api/account
Get Single Account
GET /api/account/:id
Deposit
POST /api/account/:id/deposit
Withdraw
POST /api/account/:id/withdraw
Transaction History
GET /api/account/:id/transactions
⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Ruhma14/BankEase-Banking-System
2. Open the project
cd Bank-Account-Management-System
3. Install backend dependencies
cd backend
npm install
4. Configure environment variables

Create a .env file inside the backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
5. Start the backend
npm run dev

The server will run on:

http://localhost:5000
6. Open the frontend

Open:

frontend/index.html

in your browser.
🔄 Application Flow
User
  ↓
Frontend
  ↓
JavaScript Fetch API
  ↓
Express REST API
  ↓
Mongoose
  ↓
MongoDB
🧪 Testing

The application was tested for:

Account creation
Account retrieval
Deposit
Withdrawal
Insufficient balance
Transaction history
MongoDB persistence
Frontend API integration
Page refresh persistence
Error handling


🔐 Security

Sensitive environment variables such as the MongoDB connection string are stored in .env and excluded from Git using .gitignore.

Never commit your .env file to GitHub.