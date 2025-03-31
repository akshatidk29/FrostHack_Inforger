# Xpensa - Real-Time Personal Finance Tracker

## 🚀 Overview
Xpensa is a cutting-edge **Real-Time Personal Finance Tracker** designed to provide users with **seamless expense management, AI-powered insights, and intuitive data visualization**. With its intelligent categorization and powerful analytics, Xpensa helps users take complete control of their financial health.

## 🎯 Key Features
- **🔒 Secure Authentication:** User authentication using JWT for secure access.
- **📊 Real-Time Transaction Tracking:** Instantly logs expenses and incomes with a streamlined interface.
- **🤖 AI-Powered Query Handling:** Get insights by simply asking questions like *"How much did I spend on food last month?"*
- **📈 Advanced Data Visualization:** Interactive charts and graphs for better financial insights.
- **🌎 Multi-Platform Support:** Fully responsive web app for desktops, tablets, and mobile devices.

## 🛠️ Tech Stack
### **Frontend:**
- **React (Vite)** – Fast and efficient UI development
- **Tailwind CSS** – Sleek and responsive design
- **Recharts** – Dynamic data visualizations

### **Backend:**
- **Node.js & Express.js** – Robust API development
- **MongoDB** – NoSQL database for storing user data
- **JWT Authentication** – Secure login and access control
- **Cloudinary** – Image and document storage
- **Pathway Vector Store** – Efficient processing of financial queries
- **Fetch AI Agents** – Efficient Api Calling

## 📂 Project Structure
```
Xpensa/
│── frontend/            # React frontend
│   ├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # App pages
│   ├─
│── backend/             # Express backend
│   ├── routes/          # API endpoints
│   ├── controllers/     # Business logic handlers
│   ├── models/          # Database schemas
│── 
│──               
│── README.md            # You're reading it now!
```

## 🚀 Installation & Setup
### **Prerequisites:**
- Node.js & npm installed
- MongoDB database setup
- Pathway vector store configured

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/akshatidk29/FrostHack_Inforger
cd FrostHack_Inforger
```

### **2️⃣ Install Dependencies**
```sh
cd backend
npm install
cd ../frontend
npm install
```

### **3️⃣ Setup Environment Variables**
Create a `.env` file in the backend directory and add:
```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

### **4️⃣ Start the Application**
```sh
# Start backend
cd backend
npm run dev

# Start frontend
cd ../frontend
npm run dev
```

## 📌 Future Enhancements
- **🔗 Open Banking API Integration** – Connect directly to bank accounts
- **💳 Budget Planning & Forecasting** – Smart predictions for savings goals
- **📱 Mobile App** – Native iOS & Android versions

## 🤝 Contributing
Pull requests are welcome! Feel free to open an issue for feature requests or bug reports.
