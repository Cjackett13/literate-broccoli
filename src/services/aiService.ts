interface ChatRequest {
    message: string;
    conversation_history?: Array<{
      role: "user" | "assistant";
      content: string;
    }>;
  }
  
  interface ChatResponse {
    response: string;
    timestamp: string;
  }
  
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
  
  export class AIService {
    private static async makeRequest(endpoint: string, data: any): Promise<any> {
      try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`);
        }
  
        return await response.json();
      } catch (error) {
        console.error('AI Service Error:', error);
        throw error;
      }
    }
  
    static async sendMessage(message: string, conversationHistory: Array<{role: "user" | "assistant", content: string}> = []): Promise<ChatResponse> {
      const request: ChatRequest = {
        message,
        conversation_history: conversationHistory,
      };
  
      return this.makeRequest('/api/chat', request);
    }
  
    static async healthCheck(): Promise<{status: string, message: string}> {
      try {
        const response = await fetch(`${API_BASE_URL}/api/health`);
        if (!response.ok) {
          throw new Error(`Health check failed: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('Health check error:', error);
        throw error;
      }
    }
  }