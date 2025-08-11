
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
 
=======
# 🧠 AI Journaling Assistant

A friendly, intelligent journaling assistant that helps you reflect, grow, and understand yourself through GPT-powered insights, sentiment analysis, topic tracking, and mindfulness responses.

---

## ✨ Features

- 📝 **AI-Powered Reflection** — Get GPT-generated feedback on your journal entries.
- 😊 **Sentiment Analysis** — Understand the emotional tone and subjectivity of your thoughts.
- 🧘 **Mindfulness Coach Mode** — Receive gentle, compassionate suggestions for well-being.
- 🧾 **Topic Tracker** — Identify key themes you often journal about.
- 🎯 **Daily Prompt Generator** *(Coming Soon!)* — Get inspired to write with creative prompts.

---

## 🚀 Getting Started

> ✅ Recommended: Open and run in [Google Colab](https://colab.research.google.com/)

1. Open the notebook and run the first few cells.
2. When prompted, **enter your OpenAI API key** securely (via `getpass` — not saved or shared).
3. Interact with the journaling assistant through easy-to-use buttons and interfaces.

> 🔒 Your API key is never stored or shown in plain text, and outputs are cleared before upload to protect your privacy.

---

## 🧪 Usage Example

### ✍️ Journal Entry Prompt:
I’ve been feeling overwhelmed with school and unsure if I’m making the right choices.


### 📝 GPT Reflection:
> It sounds like you're navigating a period of uncertainty. That’s completely normal, especially with major life decisions. Take a moment to reflect on what feels meaningful to you. You're doing your best.

### 😊 Sentiment Analysis:
- **Polarity (positivity)**: -0.15  
- **Subjectivity**: 0.85

### 🧘 Mindfulness Response:
> Take a deep breath. You are not alone in feeling this way. Try grounding yourself with a short walk, journaling a gratitude list, or practicing deep breathing.

### 🧾 Topic Tracker:
> ["school", "decisions", "overwhelm"]

---

## 💻 Technologies Used

- Python (Jupyter Notebook / Google Colab)
- [OpenAI API](https://platform.openai.com/)
- [TextBlob](https://textblob.readthedocs.io/en/dev/) (for sentiment analysis)
- Optional: Hugging Face for future features

---

## 🛠 Advanced Features

We’re excited to add even more AI-powered capabilities:

- 🎯 Daily Prompt Generator
- 📈 Mood Trend Analyzer
- 🧠 Long-term Memory via Embeddings
- 🗂️ Journal Search & Filter Tools
- 🌱 Goal Tracker and Habit Reflection

Want to contribute or suggest a feature? Feel free to open an issue or pull request!

---

## 👥 Contributors

- Preethika Yetukuri (https://github.com/preethikayetukuri) – AI Engineer & Developer
- Joyce Zhu (https://github.com/maximorobbio) - Backend/API
- Christie Jackett (https://github.com/Cjackett13) - Frontend/UI
- Raana Forgah (https://github.com/RaanaF) - Infrastructure & Quality Assurance
- Special thanks to our mentors and reviewers at AI4ALL Ignite Accelerator!

---

## 📸 Screenshots

Here are some example outputs from our AI-powered journaling assistant, showcasing different features such as sentiment analysis, reflections, affirmations, and more.

![Screenshot 1](screenshots/Screenshot%202025-08-05%20at%2010.50.19%E2%80%AFPM.png)<br><br>
![Screenshot 2](screenshots/Screenshot%202025-08-05%20at%2010.50.51%E2%80%AFPM.png)<br><br>
![Screenshot 3](screenshots/Screenshot%202025-08-05%20at%2010.51.19%E2%80%AFPM.png)<br><br>
![Screenshot 4](screenshots/Screenshot%202025-08-05%20at%2010.51.34%E2%80%AFPM.png)<br><br>
![Screenshot 5](screenshots/Screenshot%202025-08-05%20at%2010.52.31%E2%80%AFPM.png)<br><br>
![Screenshot 6](screenshots/Screenshot%202025-08-05%20at%2010.54.01%E2%80%AFPM.png)<br><br>
![Screenshot 7](screenshots/Screenshot%202025-08-05%20at%2010.54.30%E2%80%AFPM.png)<br><br>
![Screenshot 8](screenshots/Screenshot%202025-08-05%20at%2010.54.54%E2%80%AFPM.png)<br><br>
![Screenshot 9](screenshots/Screenshot%202025-08-05%20at%2010.55.08%E2%80%AFPM.png)


---

## 📜 License

MIT License

Copyright (c) 2025 Preethika Yetukuri, Christie Jackett, Joyce Zhu, Raana Forgah - AI4ALL Ignite Accelerator Student Team 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## 🙌 Acknowledgements

This project was created as part of the AI4ALL Ignite program, which empowers high school and university students to explore artificial intelligence for social good.

We thank the AI4ALL team, mentors, and instructors for their guidance and support.

Special thanks to [OpenAI](https://openai.com/) for the GPT API and to the creators of open-source libraries such as [TextBlob](https://textblob.readthedocs.io/en/dev/) that helped power this journaling assistant.

Inspiration from journaling practices, mental health research, and human-centered AI design.

---

