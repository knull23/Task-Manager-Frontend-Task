# Frontend Developer Task – Supabase + React + Vite

This project is a complete frontend application built using **React (Vite)** and **Supabase**.  
It includes:

- User authentication (Email/Password)
- Profile creation & update
- Secure database access with Row-Level Security (RLS)
- Task management (CRUD)
- Fully responsive UI
- Complete logging & debugging setup (provided in `logs/` folder)

This project was submitted as part of the **Frontend Developer Assignment**.

---

## 🚀 Live Demo (if deployed)

👉 **URL:** _Add your deployment link here_  
(Example: https://your-app.vercel.app)

---

## 📦 GitHub Repository

👉 **Repo Link:** _Add your GitHub repo link here_

---

# 📌 Features

### 🔐 Authentication
- Email/Password sign-up & login  
- Supports verified + unverified email flows  
- Automatic session handling  

### 👤 User Profile Management
- Create profile at registration
- Update profile (name, bio, avatar placeholder)
- Auto-create profile after email verification
- Auto-refresh user data

### 📋 Task Management
- Create tasks
- View tasks
- Edit & update tasks
- Task status & priority

### 🔒 Security
- Supabase Row-Level Security (RLS)
- Policies for SELECT, INSERT, UPDATE on both `profiles` and `tasks` tables
- Safe client-side access using `anon` key

### ⚛️ Modern Frontend Architecture
- Vite + React
- Context API for global authentication state
- Component-based design
- Clean folder structure

---

# 🛠️ Tech Stack

### **Frontend**
- React (Vite)
- TypeScript
- TailwindCSS / Custom Components
- Lucide Icons
- Context API for global state

### **Backend**
- Supabase (PostgreSQL)
- Supabase Auth
- Supabase Storage (optional)

---

project/
│── src/
│ ├── components/
│ ├── contexts/
│ │ └── AuthContext.tsx
│ ├── lib/
│ │ └── supabase.ts
│ ├── pages/
│ │ ├── Profile.tsx
│ │ └── Tasks.tsx
│ ├── App.tsx
│ └── main.tsx
│
│── logs/
│── public/
│── .env
│── package.json
│── vite.config.ts
│── README.md


---

# ⚙️ Installation & Setup

### 1️⃣ Clone repo
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

2️⃣ Install dependencies
```
npm install
```

3️⃣ Add environment variables

Create .env file in project root:
```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```
4️⃣ Run development server
```
npm run dev
```
5️⃣ Build for production
```
npm run build
```
🗄️ Supabase Setup
1. Create tables

Tables used in this project:

profiles
```
id uuid primary key references auth.users(id)
email text
full_name text
avatar_url text
bio text
created_at timestamp default now()
updated_at timestamp default now()
```

tasks
```
id uuid primary key default gen_random_uuid()
user_id uuid references auth.users(id)
title text not null
description text
status text
priority text
due_date date
created_at timestamp default now()
updated_at timestamp default now()
```

🔐 Row-Level Security Policies
Profiles
```
profile select policy

profile insert policy

profile update policy
```
Tasks
```
tasks select policy

tasks insert policy

tasks update policy
```
🔒 Policies ensure each user can only access their own data.

🧪 Logs Included

Inside the logs/ folder:

installation_logs.txt

dev_run_logs.txt

build_logs.txt

api_test_logs.txt

errors_fixed.txt

These logs document installation, development, builds, API tests, and all resolved errors.

🧰 Commands Summary
Action	Command
Install deps	npm install
Dev server	npm run dev
Build	npm run build
Preview prod build	npm run preview
📸 Screenshots (Optional)

Add screenshots inside /screenshots folder and reference them here:

![Login Page](screenshots/login.png)<img width="1383" height="900" alt="image" src="https://github.com/user-attachments/assets/97b1537f-ac83-4c85-8d1e-1742184e83a5" />
<img width="971" height="866" alt="image" src="https://github.com/user-attachments/assets/3224d701-3e2d-4b83-9af5-5e1ddd2522b9" />
![Profile Page](screenshots/profile.png)<img width="1697" height="898" alt="image" src="https://github.com/user-attachments/assets/067aca6e-57e7-4414-8a76-0ff806758476" />
![Tasks Page](screenshots/tasks.png)<img width="1848" height="764" alt="image" src="https://github.com/user-attachments/assets/882ff890-cdc2-4e95-bd06-7621bd38c7b3" />


📤 Deployment Instructions
Deploy on Vercel:

Import GitHub repo

Add environment variables

Select framework → Vite

Build & deploy

Deploy on Netlify:

Connect GitHub repo

Build command: npm run build

Publish directory: dist

Add env variables


📞 Contact

Developer: Saumil Upadhyay
Email: saumil.upadhyay

🎉 Thank You

This project was built and completed as part of the Frontend Developer Assignment.
Feel free to reach out for any additional information or clarification.


---


# 📁 Project Structure

