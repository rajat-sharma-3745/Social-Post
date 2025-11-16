# 🧑‍💻 Social Post Application

A **full-stack social media application** built with the **MERN stack** (MongoDB, Express, React, Node.js), allowing users to create, view, and interact with posts. The app includes **authentication**, **image uploads**, and **pagination** (5 posts per request).

---

## 🚀 Features

### 🖥️ Frontend
- Built with **React + Vite**
- User **authentication and protected routes**
- Create and view posts with **images**
- **Pagination** in the feed (loads 5 posts per API call)
- Responsive and modern UI
- Context API for global state management

### ⚙️ Backend
- **Express.js** server with modular architecture
- **MongoDB** database connection using Mongoose
- **JWT authentication**
- **Multer** for file uploads
- **Cloudinary** integration for image storage
- **Pagination** implemented at the API level (returns 5 posts per request)
- Centralized **error handling** and **async utilities**

---

## 🧩 Pagination (Backend Implementation)

Pagination has been implemented in the **Post Controller**.

- Each API call returns **5 posts**.
- Supports query parameters for `page` and `limit`.


## 🛠️ Installation and Setup
### 1. Clone the repository
```bash 
git clone https://github.com/rajat-sharma-3745/social-post.git
cd social-post
```
### 2. Backend Setup
```bash 
cd Backend
npm install
```
Create a .env file in the Backend folder:
```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000
```
## 3. Frontend Setup
```bash
cd ../Frontend
npm install
npm run dev
```

