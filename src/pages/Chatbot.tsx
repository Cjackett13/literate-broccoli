import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User, Heart, BookOpen, Brain, Lightbulb } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const conversationStarters = [
    {
      icon: BookOpen,
      text: "Help me study better",
      prompt: "I'm looking for study techniques and strategies to improve my learning. Can you give me some effective methods?"
    },
    {
      icon: Heart,
      text: "Dealing with stress",
      prompt: "I'm feeling overwhelmed and stressed. Can you help me with some coping strategies and relaxation techniques?"
    },
    {
      icon: Brain,
      text: "Academic motivation",
      prompt: "I'm struggling with motivation for my studies. Can you help me find ways to stay motivated and focused?"
    },
    {
      icon: Lightbulb,
      text: "Building confidence",
      prompt: "I want to work on building my self-confidence and self-esteem. What are some practical steps I can take?"
    }
  ];

  // Simulate AI response - In a real app, this would call an API
  const simulateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Simple response logic based on keywords
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("stress") || lowerMessage.includes("overwhelm")) {
      return "I understand that stress can feel overwhelming. Here are some gentle techniques that might help:\n\n• **Deep breathing**: Try the 4-7-8 technique - breathe in for 4, hold for 7, exhale for 8\n• **Mindfulness**: Take a moment to notice 5 things you can see, 4 you can hear, 3 you can touch\n• **Journal writing**: Sometimes putting thoughts on paper helps clear your mind\n• **Gentle movement**: A short walk or light stretching can release tension\n\nRemember, it's okay to feel stressed sometimes. You're doing your best, and that's enough. 💙";
    }
    
    if (lowerMessage.includes("study") || lowerMessage.includes("learn")) {
      return "Great question about studying! Here are some effective techniques:\n\n• **Pomodoro Technique**: Study for 25 minutes, then take a 5-minute break\n• **Active recall**: Test yourself instead of just re-reading notes\n• **Spaced repetition**: Review material at increasing intervals\n• **Find your peak hours**: Study during times when you feel most alert\n• **Create a dedicated space**: Having a specific study area can improve focus\n\nWhat subject are you working on? I'd love to help you create a personalized study plan! 📚";
    }
    
    if (lowerMessage.includes("motivat") || lowerMessage.includes("focus")) {
      return "Motivation can be challenging, especially when things feel difficult. Here's what can help:\n\n• **Set small, achievable goals**: Break big tasks into smaller wins\n• **Celebrate progress**: Acknowledge every step forward, no matter how small\n• **Connect with your 'why'**: Remember the deeper reasons behind your goals\n• **Create a reward system**: Give yourself something to look forward to\n• **Find an accountability partner**: Share your goals with someone who supports you\n\nYou've already taken a positive step by reaching out for help. That shows strength and self-awareness! ✨";
    }
    
    if (lowerMessage.includes("confiden") || lowerMessage.includes("self-esteem")) {
      return "Building confidence is a beautiful journey of self-discovery. Here are some nurturing approaches:\n\n• **Practice self-compassion**: Speak to yourself as you would a dear friend\n• **Keep a success journal**: Write down 3 things you did well each day\n• **Challenge negative self-talk**: Ask 'Is this thought helpful or true?'\n• **Take on small challenges**: Each success builds confidence for bigger ones\n• **Surround yourself with positivity**: Spend time with people who lift you up\n\nRemember, confidence isn't about being perfect - it's about being comfortable with who you are, including your growth areas. You're worthy of love and respect, especially from yourself. 🌱";
    }
    
    // Default supportive response
    return "Thank you for sharing that with me. I'm here to listen and support you on your wellness journey. Whether you're dealing with academic challenges, stress, or just need someone to talk to, remember that seeking help is a sign of strength.\n\nEvery small step you take toward better mental health matters. You're not alone in this, and it's okay to take things one day at a time.\n\nIs there something specific you'd like to explore together today? I'm here to help in whatever way I can. 💙";
  };

  const sendMessage = async (messageText: string = input) => {
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await simulateAIResponse(messageText);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "I'm having trouble responding right now. Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickStart = (prompt: string) => {
    sendMessage(prompt);
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-times text-4xl md:text-5xl font-bold text-foreground mb-4 italic">
            Your AI Study Companion
          </h1>
          <p className="text-lg text-muted-foreground">
            A supportive friend to help with studies, stress, and personal growth
          </p>
        </div>

        {/* Quick Conversation Starters */}
        {messages.length === 0 && (
          <Card className="card-gradient p-6 mb-6 border-0 shadow-lg">
            <h3 className="font-semibold text-lg text-foreground mb-4">Quick conversation starters:</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {conversationStarters.map((starter, index) => {
                const Icon = starter.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start p-4 h-auto hover-lift bg-background/50 hover:bg-accent/50"
                    onClick={() => handleQuickStart(starter.prompt)}
                  >
                    <Icon className="w-5 h-5 mr-3 text-primary" />
                    <span className="text-left">{starter.text}</span>
                  </Button>
                );
              })}
            </div>
          </Card>
        )}

        {/* Chat Interface */}
        <Card className="card-gradient border-0 shadow-lg overflow-hidden">
          {/* Messages */}
          <ScrollArea className="h-96 p-6" ref={scrollAreaRef}>
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">
                <Bot className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Hello! I'm here to support you.</p>
                <p className="text-sm mt-2">Start a conversation or choose a quick starter above.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <Avatar className="w-8 h-8 bg-primary">
                        <AvatarFallback>
                          <Bot className="w-4 h-4 text-primary-foreground" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground ml-auto"
                          : "bg-muted/50 text-foreground"
                      }`}
                    >
                      <p className="whitespace-pre-wrap leading-relaxed">
                        {message.content}
                      </p>
                      <span className="text-xs opacity-70 mt-2 block">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>

                    {message.role === "user" && (
                      <Avatar className="w-8 h-8 bg-accent">
                        <AvatarFallback>
                          <User className="w-4 h-4 text-accent-foreground" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex gap-3">
                    <Avatar className="w-8 h-8 bg-primary">
                      <AvatarFallback>
                        <Bot className="w-4 h-4 text-primary-foreground" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          {/* Input */}
          <div className="border-t border-border/50 p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !isLoading && sendMessage()}
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                onClick={() => sendMessage()}
                disabled={!input.trim() || isLoading}
                className="hover-lift"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Chatbot;