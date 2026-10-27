# ExamNotesAI 🚀

> **Turn a topic into exam-ready notes in seconds.**

ExamNotesAI is a full-stack AI-powered study companion that helps students generate structured study notes from a topic, review previously generated notes, visualize key concepts, and download notes as a PDF.

The project combines a modern React frontend with an Express/Node.js backend and integrates authentication, AI-powered note generation, persistent note history, PDF export, and a credit-based payment flow.

---

## ✨ Features

* 🤖 **AI-Powered Note Generation** — Generate structured notes for any subject or topic.
* 📝 **Exam-Focused Notes** — Get organized content designed for quick revision.
* 📚 **Notes History** — Access previously generated notes.
* 🔐 **Google Authentication** — Secure authentication using Firebase.
* 📄 **PDF Export** — Download generated notes as a PDF.
* 📊 **Visual Learning** — Supports charts and diagrams using Recharts and Mermaid.
* 💳 **Credit-Based System** — Purchase credits through the Stripe payment flow.
* 🌐 **Modern UI** — Built with React, Tailwind CSS, Redux, and Motion.
* 🔄 **Full-Stack Architecture** — Separate frontend and backend for scalable development and deployment.

---

## 🛠️ Tech Stack

### Frontend

* React 19
* Vite
* React Router
* Redux Toolkit
* Tailwind CSS
* Axios
* Firebase
* React Markdown
* Recharts
* Mermaid
* Motion
* React Icons

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Cookie Parser
* CORS
* Google Gemini API
* PDFKit
* Stripe
* dotenv

The frontend dependencies are defined in `client/package.json`, while the backend uses Express, Mongoose, JWT, PDFKit, Stripe, and other supporting packages.

---

## 📁 Project Structure

```text
ExamNotesAI/
│
├── client/                         # React + Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/                 # Images and branding
│   │   ├── components/             # Reusable UI components
│   │   ├── pages/                  # Application pages
│   │   ├── redux/                  # Redux store and user state
│   │   ├── services/               # API communication
│   │   └── utils/                  # Firebase and utilities
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── server/                         # Node.js + Express backend
│   ├── controllers/                # Business logic
│   ├── middleware/                 # Authentication middleware
│   ├── models/                     # MongoDB/Mongoose models
│   ├── routes/                     # API routes
│   ├── utils/                      # Backend utilities
│   ├── .env.example
│   ├── index.js
│   └── package.json
│
└── README.md
```

The backend is organized into separate authentication, user, notes, PDF, and credit routes.

---

## 🔄 How It Works

```text
                 ┌───────────────────┐
                 │   Student / User  │
                 └─────────┬─────────┘
                           │
                           ▼
                 ┌───────────────────┐
                 │   React Client    │
                 │                   │
                 │ Login / Dashboard │
                 │ Topic / Notes     │
                 │ History / Pricing │
                 └─────────┬─────────┘
                           │
                     Axios + Cookies
                           │
                           ▼
                 ┌───────────────────┐
                 │  Express Server   │
                 │                   │
                 │ Auth              │
                 │ Notes             │
                 │ PDF               │
                 │ Credits           │
                 └──────┬─────┬──────┘
                        │     │
             ┌──────────┘     └──────────┐
             ▼                           ▼
      ┌───────────────┐          ┌───────────────┐
      │    MongoDB    │          │   Gemini API  │
      │ Users + Notes │          │ AI Generation │
      └───────────────┘          └───────────────┘
                        │
                        ▼
                 ┌─────────────────┐
                 │ PDFKit / Stripe │
                 │ Export / Payment│
                 └─────────────────┘
```

---

## 📌 Application Pages

| Route              | Description                  |
| ------------------ | ---------------------------- |
| `/`                | Main authenticated dashboard |
| `/auth`            | Google authentication        |
| `/history`         | Previously generated notes   |
| `/notes`           | Generated notes              |
| `/pricing`         | Credit/payment options       |
| `/payment-success` | Successful payment page      |
| `/payment-failed`  | Failed payment page          |

The application protects authenticated routes using the Redux user state.

---

## 🔌 API Endpoints

### Authentication

```http
POST /api/auth/google
GET  /api/auth/logout
```

### User

```http
GET /api/user/currentuser
```

### Notes

```http
POST /api/notes/generate-notes
GET  /api/notes/getnotes
GET  /api/notes/:id
```

### PDF

```http
POST /api/pdf/generate-pdf
```

### Credits

```http
POST /api/credit/order
POST /api/credits/webhook
```

Notes, PDF generation, and credit-order operations use authentication middleware where required.

---

# ⚙️ Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/shivamrai539/ExamNotesAI.git

cd ExamNotesAI
```

---

## 2. Setup the Frontend

```bash
cd client

npm install
```

Create a `.env` file inside the `client` directory.

You can use `.env.example` as a reference:

```env
VITE_FIREBASE_APIKEY=your_firebase_api_key_here
```

The repository currently provides this Firebase environment variable in the example configuration.

Start the development server:

```bash
npm run dev
```

---

## 3. Setup the Backend

Open another terminal:

```bash
cd server

npm install
```

Create a `.env` file inside the `server` directory.

Use the following configuration:

```env
PORT=5000
MONGODB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
JWT_SECRET=replace_with_a_long_random_secret
GEMINI_API_KEY=your_gemini_api_key_here
```

These variables are provided by the repository's backend `.env.example`.

Start the backend:

```bash
npm run dev
```

The backend defaults to port `5000` and uses Nodemon during development.

---

# 🔐 Authentication

ExamNotesAI uses Firebase for authentication on the frontend and communicates with the backend using authenticated requests and cookies.

The backend provides:

```text
POST /api/auth/google
GET  /api/auth/logout
```

Google authentication is handled through the authentication route.

> **Security:** Never commit your `.env` files, API keys, database credentials, JWT secrets, or Stripe secrets to GitHub.

---

# 🤖 AI Note Generation

The main feature of ExamNotesAI is AI-powered note generation.

The user enters a topic through the frontend, and the client sends the request to:

```http
POST /api/notes/generate-notes
```

The backend processes the authenticated request and generates the notes using the configured AI service.

The generated result can then be viewed in the application, saved in history, and exported as a PDF.

---

# 📄 PDF Export

Users can download generated notes as a PDF.

The frontend sends the generated result to:

```http
POST /api/pdf/generate-pdf
```

The response is handled as a PDF blob and downloaded as:

```text
ExamNotesAI.pdf
```

The backend uses **PDFKit** for PDF generation.

---

# 💳 Credits & Payments

ExamNotesAI includes a credit-based usage system.

Authenticated users can create a credit order through:

```http
POST /api/credit/order
```

Stripe is used as part of the payment and webhook flow.

This architecture allows AI note generation to be connected to a usage-based credit system.

---

# 🚀 Build for Production

## Frontend

```bash
cd client

npm install

npm run build
```

The generated production build can then be deployed to a static hosting platform.

## Backend

```bash
cd server

npm install

node index.js
```

Before deployment, configure all required production environment variables.

The frontend currently contains a configured backend URL, so you should update it when deploying your own backend instance.

---

# 🧪 Development Checklist

Before deploying your own version:

* [ ] Configure Firebase authentication.
* [ ] Configure MongoDB.
* [ ] Set a secure `JWT_SECRET`.
* [ ] Add your Gemini API key.
* [ ] Configure Stripe if payments are enabled.
* [ ] Configure the frontend backend URL.
* [ ] Configure CORS for your frontend domain.
* [ ] Test authentication.
* [ ] Test note generation.
* [ ] Test note history.
* [ ] Test PDF generation.
* [ ] Test payment/webhook flow.
* [ ] Make sure no secrets are committed to Git.

---

# 🎯 Project Goals

ExamNotesAI aims to reduce the time students spend preparing notes so they can spend more time actually **learning and revising**.

The project brings together several real-world full-stack development concepts:

* Authentication
* Protected routes
* REST APIs
* MongoDB database persistence
* AI API integration
* Redux state management
* PDF generation
* Payment processing
* Credit systems
* Frontend/backend communication
* Environment configuration
* Deployment

---

# 🔮 Future Improvements

Some ideas for future versions:

* 📖 Subject-wise study plans
* 🧠 AI-generated flashcards
* ❓ AI-generated MCQs
* 📝 Practice tests
* 🎯 Personalized revision recommendations
* 📈 Advanced study analytics
* 🗂️ Note tagging and organization
* 🔗 Shareable notes
* 📱 Improved mobile experience
* 🌙 Theme customization

---

# 🤝 Contributing

Contributions and suggestions are welcome.

### Create a feature branch

```bash
git checkout -b feature/your-feature
```

### Make your changes

```bash
git add .
git commit -m "feat: add your feature"
```

### Push your branch

```bash
git push origin feature/your-feature
```

Then open a Pull Request and describe your changes.

---

# 📜 License

This project currently declares the **ISC** license in the backend package metadata.

---

# 👨‍💻 Author

**Shivam Rai**

GitHub: [@shivamrai539](https://github.com/shivamrai539)

Repository: [ExamNotesAI](https://github.com/shivamrai539/ExamNotesAI)

---

# ⭐ Support

If you find **ExamNotesAI** useful, consider giving the repository a ⭐ on GitHub.

It helps the project gain visibility and motivates further development.
