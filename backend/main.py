from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import openai
import os
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

app = FastAPI(title="AI Journaling Assistant API")

# CORS middleware for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:3000"],  # Add your frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OpenAI client
client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
print(os.getenv("OPENAI_API_KEY"))

class ChatRequest(BaseModel):
    message: str
    conversation_history: Optional[List[dict]] = []
    prompt_type: Optional[str] = "journal_reflection"

class ChatResponse(BaseModel):
    response: str
    timestamp: str

# AI Functions from your partner's notebook
def ask_gpt(user_input: str, role: str) -> str:
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": role},
                {"role": "user", "content": user_input}
            ]
        )
        return response.choices[0].message.content
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OpenAI API error: {str(e)}")

def journal_reflection(entry: str) -> str:
    role = "Act as a journaling companion. Respond supportively to the user's reflection, offering validation and gentle encouragement."
    return ask_gpt(entry, role)

def mood_summary(entry: str) -> str:
    role = "Read the following journal entry and briefly summarize it in 1–2 sentences. Then, classify the overall emotional tone (e.g., happy, sad, anxious, stressed, grateful, hopeful)."
    return ask_gpt(entry, role)

def affirmation_generator(mood: str) -> str:
    entry = f"I'm feeling {mood}."
    role = "Based on the user's mood (e.g., anxious, excited, tired), generate a short, positive affirmation to help them feel better."
    return ask_gpt(entry, role)

def emotional_vent(entry: str) -> str:
    role = "You are a caring, supportive AI journaling companion. If the user vents or rants emotionally, respond with empathy, validation, and gentle encouragement. Don't give generic advice—just be present."
    return ask_gpt(entry, role)

def clarify_emotions(entry: str) -> str:
    role = "Act as a curious, non-judgmental peer who helps the user reflect deeper on what's bothering them."
    return ask_gpt(entry, role)

def grounding_exercise(entry: str) -> str:
    role = "You are a trauma-informed, gentle AI companion guiding a user through a quick grounding or breathing technique to help them feel safe and re-centered."
    return ask_gpt(entry, role)

@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        # Determine response type based on message content
        message_lower = request.message.lower()
        
        if any(word in message_lower for word in ["stress", "overwhelm", "anxious", "panic"]):
            response = grounding_exercise(request.message)
        elif any(word in message_lower for word in ["vent", "frustrated", "angry", "ugh"]):
            response = emotional_vent(request.message)
        elif any(word in message_lower for word in ["confused", "don't know", "unsure"]):
            response = clarify_emotions(request.message)
        elif any(word in message_lower for word in ["mood", "feeling", "emotion"]):
            response = mood_summary(request.message)
        else:
            # Default to journal reflection for general conversation
            response = journal_reflection(request.message)
        
        return ChatResponse(
            response=response,
            timestamp=datetime.now().isoformat()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "message": "AI Journaling Assistant API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 