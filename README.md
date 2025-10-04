# 🚀 Task Management Application

This is a **Task Management Application** built using **Go (Golang)** for the backend and **Next.js (React v18)** for the frontend.

---

## 📝 Description

This application is designed to help users effectively manage their tasks. The backend, written in Go, handles API logic, database interactions, and core business processing. The frontend, built with Next.js and React v18, provides a responsive and intuitive user interface for managing tasks (creation, viewing, updating, and deletion).

---

## 🛠️ Local Setup

Follow these steps to set up and run both the backend and the frontend on your local machine.

### 📥 Clone the Repository

Start by cloning the project repository:

```bash
git clone https://github.com/ivan-adi-saputra/task-management-app-dunia-coding.git
cd task-management-app-dunia-coding
```

### ⚙️ Setup Backend (Golang)
**1. Navigate to Backend Folder**

Change your current directory into the backend project folder:

```bash
cd be-task-management
```

**2. Environment Configuration**

Create a file named `.env` in the root directory of the project and define your configuration variables.

```bash
DB_USERNAME=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_NAME=

APP_PORT=
```

**3. Database Creation**

You must create a database in your MySQL instance that matches the name specified in the DB_NAME variable in your .env file (e.g., task_management_db).

**4. Install Dependencies**

Install all required Go packages (libraries) by navigating to the project's root directory and running:

```bash
go mod tidy
```

**5. Run the Project**

Execute the Go application to start the backend server:

```bash
go run cmd/main.go
```

The backend API should now be running, typically accessible at http://localhost:8080 (or the port specified in SERVER_PORT).

### 🖥️ Setup Frontend (Next.js With React v18)

**1. Navigate to Frontend Folder**

Change your current directory into the frontend project folder:

```bash
cd fe-task-management
```

**2. Environment Configuration**

Create a file named `.env` inside the frontend folder and define the variables needed, particularly the link to the running backend API.

```bash
NEXT_PUBLIC_API_BASE_URL=
```

**3. Install Dependencies**

Install the Next.js and React v18 dependencies using your preferred package manager:

```bash
npm install
```

**4. Run the Project**

Start the Next.js development server:

```bash
npm run dev
```

The frontend application will now be running and should be accessible in your web browser, typically at http://localhost:3000.


