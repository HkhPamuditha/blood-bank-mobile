Blood Bank Management System

Deployment Details:
	Backend(Render) - https://bloodbankmobile.onrender.com
	Frontend(Vercel) - https://bloodbankmobile.vercel.app

A comprehensive, full-stack Blood Bank Management System built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This application streamlines the process of managing blood donations, tracking blood stock, scheduling appointments, and organizing blood camps.

Features

- User Roles & Authentication: Secure JWT-based authentication with role-based access control (SuperAdmin, Admin, User).
- Donor Management: Register, view, update, and manage blood donors.
- Hospital Management: Register hospitals and track their specific blood requests and updates.
- Blood Stock Tracking: Real-time tracking of available blood inventory by blood groups.
- Appointment Scheduling: Donors can schedule appointments which can be approved, rejected, or completed by the administration.
- Blood Camp Organization: Manage and track upcoming blood donation camps.
- Responsive Dashboard: A centralized, aesthetically pleasing dashboard built with Tailwind CSS for administrators to view statistics and manage records.

Tech Stack

Frontend:
- React 19
- Vite
- Tailwind CSS v4
- React Router DOM
- Lucide React (for Icons)
- Axios

Backend:
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JSON Web Tokens (JWT) for authentication
- Bcrypt.js for password hashing
- dotenv for environment variables

Project Structure

The project is structured as a monorepo containing both the frontend and backend code:

Blood Mobile/
├── backend/          Express backend application
│   ├── config/       Database configuration
│   ├── controllers/  Route controllers (auth, users, donors, etc.)
│   ├── middleware/   Custom middlewares (auth, error handling)
│   ├── models/       Mongoose schemas
│   ├── routes/        Express routes
│   └── server.js     Entry point for the backend
│
├── frontend/         React frontend application
│   ├── public/       Static assets
│   ├── src/          React source code
│   │   ├── components/  Reusable UI components
│   │   ├── pages/      Application pages (Dashboard, Appointments, etc.)
│   │   ├── App.jsx     Main React component
│   │   └── index.css   Global Tailwind styles
│   └── vite.config.js
│
└── package.json      Root package.json

Installation & Setup

Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine
- [MongoDB](https://www.mongodb.com/) running locally or a MongoDB Atlas URI

1. Clone the repository

bash
git clone https://github.com/HkhPamuditha/Bloodbankmobile.git
cd Bloodbankmobile

2. Backend Setup

Open a terminal and navigate to the backend directory:

bash
cd backend
npm install

Create a .env file in the backend/ directory and add the following variables:

.env
PORT=5001
MONGO_URL=mongodb+srv://bloodbankmobile:blood59@bloodbankmobile.xj2q6kj.mongodb.net/?appName=Bloodbankmobile
JWT_SECRET=supersecretjwtkey

Start the backend server:

bash
For development with nodemon:
npm run dev

For production:
npm start

3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

bash:
cd frontend
npm install

Start the Vite development server:

bash:
npm run dev

The frontend will usually be accessible at "https://bloodbankmobile.vercel.app/" and the backend at "https://bloodbankmobile.onrender.com".

Default Access Details

Because creating a SuperAdmin requires another SuperAdmin, the first SuperAdmin must be manually seeded into the database, or temporarily created via a database client like MongoDB Compass with a properly hashed password.
