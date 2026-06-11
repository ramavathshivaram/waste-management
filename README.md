# 🗺️ GeoTrack – Smart Geographic Information & Asset Management System

A full-stack Geographic Information System (GIS) and asset management platform built using **React, Vite, Express, MongoDB, and Leaflet**. The application enables users to visualize, manage, and analyze geospatial data with an intuitive dashboard, interactive maps, authentication, and administrative controls.

---

## ✨ Features

### 🔐 Authentication & Authorization

- Secure JWT-based authentication
- Role-based access control
- Admin and user dashboards
- Password hashing using bcrypt

### 👨‍💼 Admin Management

- Seeded administrator account
- Manage users and permissions
- Monitor application activities

Default Admin Credentials:

```env
ADMIN_NAME=Shiva Ram
ADMIN_EMAIL=admin@text.com
ADMIN_PASSWORD=123456789
```

> ⚠️ Change these credentials before deploying to production.

---

### 🗺️ Interactive GIS Dashboard

- Interactive maps powered by Leaflet
- Marker clustering
- Routing and navigation
- Asset visualization
- Geospatial analysis tools

### 📍 Asset Management

- Create, update, and delete assets
- View asset details on maps
- Categorize and filter records
- Search functionality

### 📊 Analytics Dashboard

- Data visualizations using Recharts
- Summary statistics
- Interactive charts and reports

### 📁 File Uploads

- Upload images and documents
- Cloudinary integration for cloud storage
- Secure media management

### 📅 Scheduling & Automation

- Background jobs using Agenda
- Automated task execution
- Scheduled notifications

### 🛡️ Security Features

- Helmet security headers
- CORS protection
- Rate limiting
- Cookie parsing
- Compression middleware
- Request logging with Morgan

### 🎨 Modern UI

- Responsive design
- Dark mode support
- Radix UI components
- Tailwind CSS styling
- Smooth animations using Motion
- Accessible interfaces

---

# 🛠️ Technologies Used

## Frontend

- React 19
- Vite
- React Router DOM
- Tailwind CSS
- Radix UI
- Zustand
- React Query
- React Hook Form
- Zod
- Motion
- Recharts
- Sonner

## Maps & GIS

- Leaflet
- React Leaflet
- Leaflet Routing Machine
- Leaflet Marker Cluster
- React Leaflet Draw
- Turf.js

## Backend

- Node.js
- Express 5
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

## Security

- Helmet
- CORS
- Express Rate Limit
- Cookie Parser
- Compression
- Morgan

## Cloud & Automation

- Cloudinary
- Agenda Scheduler
- Axios

---

# 📂 Project Structure

```text
project/
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── server.js
│   ├── seed.js
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── controllers/
│   └── package.json
│
├── README.md
└── .env
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone <repository-url>
cd project
```

---

## Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=
JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

ADMIN_NAME=Shiva Ram
ADMIN_EMAIL=admin@text.com
ADMIN_PASSWORD=123456789
```

Start backend:

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

---

## Seed Default Admin

```bash
npm run seed
```

This creates the default administrator account.

---

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

# 🔐 API Features

- Authentication
- User Management
- Asset Management
- File Uploads
- Dashboard Analytics
- GIS Operations
- Scheduling Tasks

---

# 📚 What I Learned

Through this project, I gained experience in:

- Building scalable MERN applications
- Integrating GIS technologies into web applications
- Designing secure REST APIs
- Implementing JWT authentication
- Using MongoDB with Mongoose
- Managing global and server state
- Building interactive maps
- Performing geospatial operations
- Creating responsive dashboards
- Implementing role-based access control

---

# 💡 About This Project

GeoTrack was developed to explore how modern web technologies can be combined with Geographic Information Systems to build intelligent asset management solutions. The project demonstrates full-stack development skills, geospatial visualization, secure authentication, and interactive data analysis.

---

## 👨‍💻 Author

**Shiva Ram**

GitHub:
https://github.com/ramavathshivaram

---

## 📄 License

This project is intended for educational and learning purposes.
