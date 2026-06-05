# 🌺 Mulata Project

## Description

Mulata Project is a **Single Page Application (SPA)** built with vanilla JavaScript — no frameworks. It features a full authentication system, role-based access control, personal notes manager, and an admin panel for user management. Navigation happens without page reloads by injecting HTML dynamically into a single `<div id="app">`.

---

## 🚀 Technologies

| Technology | Purpose |
|---|---|
| Vite | Bundler and development server |
| JavaScript ES Modules | App logic (no frameworks) |
| Bootstrap 5 | UI components and styling |
| json-server | Simulated REST API / backend |
| localStorage | Session management |

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/BruhBx/mulata-project.git

# Navigate to the project folder
cd mulata-project

# Install dependencies
npm install
```

---

## ▶️ Running the Project

Open **two terminals** and run one command in each:

**Terminal 1 — Frontend**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

**Terminal 2 — JSON Server**
```bash
npx json-server --watch database/db.json --port 3000
```

> Both must be running at the same time for the app to work.

---

## 🗄️ Running JSON Server

json-server simulates a REST API using `database/db.json` as the data source.

Base URL: `http://localhost:3000`

| Method | Endpoint | Action |
|---|---|---|
| GET | `/users` | List all users |
| GET | `/users/:id` | Get one user |
| POST | `/users` | Create user |
| PATCH | `/users/:id` | Partially update user |
| DELETE | `/users/:id` | Delete user |
| GET | `/notes` | List all notes |
| POST | `/notes` | Create note |
| PATCH | `/notes/:id` | Update note |
| DELETE | `/notes/:id` | Delete note |

---

## 👤 Test Users

Add these to `database/db.json` before starting:

```json
{
  "users": [
    {
      "id": "1",
      "name": "Admin",
      "username": "admin@mail.com",
      "password": "admin123",
      "role": "admin"
    },
    {
      "id": "2",
      "name": "Juan",
      "username": "juan@mail.com",
      "password": "1234",
      "role": "user"
    }
  ],
  "notes": []
}
```

---

## 📁 Project Structure

```
src/
├── controllers/
│   ├── dashboard.controller.js   # User CRUD (admin only)
│   ├── home.controller.js        # Home events
│   ├── login.controller.js       # Authentication
│   ├── logout.controller.js      # Session cleanup
│   ├── profile.controller.js     # Edit own profile
│   └── project.controller.js     # Notes CRUD
├── router/
│   └── routes.js                 # SPA router with guards
├── Views/
│   ├── dashboardView.js          # Users table
│   ├── homeView.js               # Main screen
│   ├── importantView.js          # 🎵 Special view
│   ├── LoginView.js              # Login form
│   ├── notFound.js               # 404 page
│   ├── profileView.js            # Profile form
│   └── projectView.js            # Notes pad
├── main.js                       # Entry point
└── style.css                     # Global styles
database/
└── db.json                       # json-server database
```

---

## 🔐 Role Permissions

| Feature | `user` | `admin` |
|---|---|---|
| View personalized home | ✅ | ✅ |
| Edit own profile | ✅ | ✅ |
| Create, edit, delete own notes | ✅ | ✅ |
| View `/important` | ✅ | ✅ |
| Access dashboard | ❌ | ✅ |
| Create new users | ❌ | ✅ |
| Edit any user | ❌ | ✅ |
| Delete any user | ❌ | ✅ |

### Router Guards

- **Protected route without session** → redirects to `/login`
- **`/dashboard` without admin role** → redirects to `/`
- **`/login` with active session** → redirects to `/`
- **Unknown URL** → shows 404 page

---

## 🏗️ Technical Decisions

### SPA without a framework
Navigation is handled by a custom router in `routes.js`. It reads `window.location.pathname`, applies security guards, injects the view's HTML into `<div id="app">`, and runs the corresponding controller. No page reloads occur.

### View + Controller pattern
Each screen is split into two files: a **view** (returns HTML string, no logic) and a **controller** (attaches events after the view is in the DOM). This guarantees `getElementById` always finds the element it looks for.

### PATCH over PUT
All update operations use `PATCH` instead of `PUT`. This allows sending only the changed fields without accidentally overwriting fields that weren't included (e.g. updating a user's name without erasing their password).

### Frontend filtering for notes
Notes are filtered by `userId` on the frontend after fetching all notes. Each note stores the `userId` of its owner, so each user only sees their own notes.

### localStorage for session
The authenticated user object is stored in `localStorage` as a JSON string. The router reads it on every navigation to decide what to render. Logout removes it with `localStorage.removeItem("user")`.

### Global functions for dynamic HTML
Functions like `editUser()`, `deleteUser()`, `editNote()` and `deleteNote()` are attached to `window` because they are called from `onclick` attributes inside dynamically generated HTML strings, where module scope is not accessible.

---

## 🗺️ Available Routes

| Route | Description | Access |
|---|---|---|
| `/` | Personalized home | Logged in users |
| `/login` | Login form | Public |
| `/dashboard` | User management (CRUD) | Admin only |
| `/profile` | Edit name, username, password | Logged in users |
| `/project` | Personal notes pad | Logged in users |
| `/important` | 🎵 Very important message | Logged in users |
