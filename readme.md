BiblePing

BiblePing is an application that delivers daily or random Bible verses,
paired with inspirational background images.

The project has two main entry points:
- Telegram Bot
- Web Interface (Next.js)

The goal is to provide a simple, visual, and accessible way to receive
biblical inspiration.

==================================================

FEATURES

- Daily Bible verse (deterministic per day)
- Random Bible verse
- Inspirational background images
- Share verse as an image
- Telegram bot with simple commands
- Modern web interface
- Clean separation between Bot, API, and Frontend

==================================================

TECH STACK

- Frontend: Next.js
- Serverless API: Netlify Functions
- Telegram Bot: Grammy (Telegram Bot API)
- Runtime: Node.js
- Package Manager: npm

==================================================

REQUIREMENTS

- Node.js v16 or higher
- npm v7 or higher

==================================================

PROJECT STRUCTURE

telegram-bibleping/

frontend/
  - Next.js app (Netlify build)

backend/
  - Telegram bot and shared logic
  - services/
  - data/
  - utils/
  - bot.js (Telegram bot entry point, NO HTTP server)

netlify/
  - functions/
    - verse-daily.js
    - verse-random.js
    - image-random.js

netlify.toml
README.txt

==================================================

LOCAL DEVELOPMENT

Frontend (Web App)

1) Go to frontend folder
   cd frontend

2) Install dependencies
   npm install

   

Open in browser:
http://localhost:3000

==================================================

TELEGRAM BOT (IMPORTANT)

The Telegram bot ONLY works while this command is running:

npm run bot

If the process stops, the bot stops responding.

Important notes:
- Netlify CANNOT run Telegram bots
- The bot must run on an always-on service
  such as Railway, Render, or Fly.io

==================================================

CREATE THE TELEGRAM BOT

1) Open Telegram
2) Use @BotFather
3) Copy your TELEGRAM_BOT_TOKEN

==================================================

ENVIRONMENT VARIABLES

Create a .env file inside the backend folder:

TELEGRAM_BOT_TOKEN=your_token_here

==================================================

RUN THE BOT (LOCAL OR PRODUCTION)

cd backend
npm install
npm run bot

You should see:
BiblePing Telegram bot is running...

 cd frontend 
 npm run dev
 

==================================================

TELEGRAM COMMANDS

/start   -> Welcome message
/verse   -> Get a Bible verse
/app     -> Open the BiblePing web app

==================================================

PRODUCTION DEPLOYMENT (IMPORTANT)

Frontend + API:
- Deployed on Netlify
- The API is implemented using Netlify Functions (/api/*)
- There is NO traditional backend HTTP server in production

Telegram Bot:
- Runs as a standalone Node.js process
- Deployed separately on Railway (recommended)
- Uses shared logic from the backend folder
- Start command:
  npm run bot

Important:
- Do NOT run the bot locally and in production at the same time
- The bot must be running 24/7 in production

==================================================

CONFIGURATION

Backend:
- backend/src/data/verses.js  -> Bible verses dataset
- backend/src/services/       -> Verse and image logic

Frontend:
- frontend/src/app/page.tsx   -> UI and data fetching

==================================================

ROADMAP

┌───────────────┐
│ Telegram User │
└───────┬───────┘
        │
        ▼
┌────────────────────┐
│ Railway             │ THE BOT HAVE TO RUN (24/7) npm run dev or Railway ejecutar aplicaciones backend 24/7
│ backend/src/bot.js  │  ← npm run bot (24/7)
└────────┬───────────┘
         │ fetch
         ▼
┌────────────────────┐
│ Netlify Functions   │
│ /api/verse/*       │
│ /api/image         │
└────────┬───────────┘
         │
         ▼
┌────────────────────┐
│ Netlify Next.js     │
│ Frontend UI         │
└────────────────────┘


==================================================

LICENSE

MIT License

==================================================

BiblePing — Daily inspiration in one message.
