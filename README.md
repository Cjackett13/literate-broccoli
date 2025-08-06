## 🧠 AI Journaling Assistant
This notebook provides a journaling experience enhanced by AI. It uses GPT-3.5 to respond to users with thoughtful, compassionate feedback.

### 💻 How to Use
1. Open the notebook.
2. Run the first cell and enter your OpenAI API key securely when prompted.
3. Enter a journal entry (e.g., "I'm feeling anxious today").
4. Get a supportive and personalized response from the AI.

### 🔐 Important
- Your API key is not stored anywhere.
- Do not share or commit your key to GitHub.

### ✨ Features
- Secure input via `getpass`
- Customizable assistant tone (edit the `role` parameter)
- Easy-to-use function: `ask_gpt()`

### 📌 Requirements
- Python 3.x
- `openai` Python package

---
## 🧠 AI Journaling Assistant Features

This project includes an AI-powered journaling assistant that:

- Provides gentle, supportive GPT-based responses to journal entries
- Accepts user input through a text box (with optional widget-based input)
- Can be extended to support advanced features such as:

  - 🧠 Sentiment Analysis (e.g., TextBlob or Hugging Face)
  - 🧘 Mindfulness Coach Mode
  - 🎯 Daily Prompt Generator
  - 🧾 Topic Tracker (extracts recurring themes/topics)

The current assistant is designed with a supportive tone to encourage mental wellness through journaling.
