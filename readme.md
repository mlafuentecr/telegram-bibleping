# 📖 BiblePing

BiblePing is an application that delivers **daily or random Bible verses**, paired with **inspirational background images**. The project supports two main entry points:

* 🤖 **Telegram Bot**
* 🌐 **Web Interface (Next.js)**

The goal is to provide a simple, visual, and accessible way to receive biblical inspiration.

---

## ✨ Features

* Daily Bible verse (deterministic per day)
* Random Bible verse
* Inspirational background images
* Telegram bot with simple commands
* Modern web interface
* Clean separation between **API**, **Bot**, and **Frontend**

---

## 🧱 Tech Stack

* **Backend API:** Node.js (native `http`)
* **Telegram Bot:** Grammy (Telegram Bot API)
* **Frontend:** Next.js
* **Package Manager:** npm

---

## 📦 Requirements

* Node.js **v16.0.0** or higher
* npm **v7.0.0** or higher

---

## 🗂 Project Structure (Important)

```
bibleping/
├── backend/            # Node.js backend
│   ├── src/
│   │   ├── index.js    # HTTP API entry point (port 3001)
│   │   ├── app.js      # Request handler
│   │   ├── router.js   # API routes
│   │   ├── bot.js      # Telegram bot (NO HTTP server)
│   │   └── services/
│   └── package.json
│
├── frontend/           # Next.js app (port 3000)
│   └── package.json
│
└── README.md
```

⚠️ **Important:**

* `bot.js` runs the Telegram bot (no port)
* `index.js` runs the HTTP API (port **3001**)
* Next.js runs on port **3000**

---

## 🚀 Installation & Local Development

### 1️⃣ Clone the repository

```bash
git clone https://github.com/tu-usuario/bibleping.git
cd bibleping
```

---

## 🔧 Backend (API)

### Install dependencies

```bash
cd backend
npm install
```

### Start the API server

```bash
npm run start
```

You should see:

```
BiblePing API running at http://localhost:3001
```

### Test API endpoints

```text
http://localhost:3001/api/health
http://localhost:3001/api/verse/daily
http://localhost:3001/api/verse/random?language=es
```

---

## 🤖 Telegram Bot

### 1️⃣ Create a Telegram bot

* Use **@BotFather** on Telegram
* Copy your **TELEGRAM_BOT_TOKEN**

### 2️⃣ Configure environment variables

Create a `.env` file inside `backend/`:

```env
TELEGRAM_BOT_TOKEN=your_token_here
```

### 3️⃣ Run the bot (separate terminal)

```bash
cd backend
npm run bot
```

The bot will connect to Telegram and start listening for commands.

---

## 🌐 Frontend (Web App)

### Install dependencies

```bash
cd frontend
npm install
```

### Start the frontend

```bash
npm run dev
```

The app will be available at:

👉 **[http://localhost:3000](http://localhost:3000)**

The frontend fetches data from the backend API running on **port 3001**.

---

## 🤖 Telegram Bot Commands

* `/start` → Welcome message
* `/verse` → Get a Bible verse
* `/app` → Open the BiblePing web app

---

## 🌐 Web App Features

* View today’s verse
* Get a random verse
* Change background image
* Clean and minimal UI

---

## ⚙️ Configuration

### Backend

* `backend/src/config.js`

  * Environment variables
  * Port configuration
  * Default language

* `backend/src/data/verses.js`

  * Bible verses dataset

### Frontend

* `frontend/src/app/page.tsx`

  * UI layout
  * Data fetching logic

---

## 🛣️ Roadmap

* Scheduled daily verse push
* Multi-language support
* Save favorite verses
* Export verse images
* Integrations (WhatsApp, Email)

---

## 📄 License

MIT License

---

🙏 *BiblePing — Daily inspiration in one message.*
