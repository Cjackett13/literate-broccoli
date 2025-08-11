# Garden of Thought 🌱

A nurturing digital space for journaling, wellness tracking, and personal growth, powered by AI and beautiful UI. Garden of Thought helps you reflect, track your mental health, and watch your progress bloom into a magical garden.

---

## Table of Contents
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- **Personal Journal:** Write and save daily reflections in a safe, private space.
- **AI Companion:** Get supportive, context-aware responses for journaling, stress, and study help.
- **Mood & Wellness Tracker:** Visualize your emotional patterns and progress with charts and stats.
- **Enchanted Garden:** Unlock and grow magical plants as you journal and reflect.
- **Beautiful UI:** Modern, accessible design with shadcn-ui and Tailwind CSS.

---

## Tech Stack
- **Frontend:** React, TypeScript, Vite, shadcn-ui, Tailwind CSS, Radix UI, Recharts
- **Backend:** FastAPI (Python), OpenAI API, Pydantic
- **State & Data:** LocalStorage (for journal/garden), Supabase (optional, for future cloud sync)
- **Other:** dotenv, modern ESLint config, modular component structure

---

## Project Structure
```
garden-of-thought/
├── backend/           # FastAPI backend (AI endpoints)
│   ├── main.py
│   └── requirements.txt
├── src/
│   ├── components/    # UI and shared components
│   ├── pages/         # Main app pages (Home, Journal, Chatbot, Wellness, Garden)
│   ├── services/      # API and AI service logic
│   ├── config/        # Supabase and other config
│   └── assets/        # Images and static assets
├── public/            # Static files
├── package.json       # Frontend dependencies
├── README.md
└── ...
```

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Python 3.9+
- OpenAI API key (for AI features)

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/garden-of-thought.git
cd garden-of-thought
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 4. Set up Environment Variables
Create a `.env` file in the `backend/` directory:
```
OPENAI_API_KEY=your_openai_api_key_here
```

### 5. Run the Backend (API)
```bash
cd backend
uvicorn main:app --reload
```

### 6. Run the Frontend (Dev Server)
```bash
npm run dev
```

The frontend will be available at [http://localhost:5173](http://localhost:5173) (or as configured by Vite).

---

## Usage
- **Journal:** Write, save, and view your entries. Entries are stored locally for privacy.
- **Chatbot:** Get AI-powered support for journaling, stress, study, and more.
- **Wellness:** Track your mood and see visual stats and trends.
- **Garden:** Unlock and grow magical plants as you journal and progress.

---

## API Endpoints
- `POST /api/chat` — Main AI chat endpoint. Accepts a message and returns an AI-generated response.
- `GET /api/health` — Health check for the backend API.

See `backend/main.py` for more details.

---

## Contributing
1. Fork the repo and create your branch (`git checkout -b feature/your-feature`)
2. Commit your changes (`git commit -am 'Add new feature'`)
3. Push to the branch (`git push origin feature/your-feature`)
4. Open a Pull Request

All contributions, suggestions, and feedback are welcome!

---

## Credits
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [OpenAI](https://openai.com/)
- [Supabase](https://supabase.com/)
- [Recharts](https://recharts.org/)

---

> _Garden of Thought is a labor of love for your mental wellness journey. 🌸_    