import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User, Heart, BookOpen, Brain, Lightbulb } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { AIService } from "@/services/aiService";

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

  // AI response using the actual AI service
  const getAIResponse = async (userMessage: string): Promise<string> => {
    try {
      // Convert messages to conversation history format
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await AIService.sendMessage(userMessage, conversationHistory);
      return response.response;
    } catch (error) {
      console.error('AI Response Error:', error);
      throw new Error('Failed to get AI response');
    }
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
      const response = await getAIResponse(messageText);
      
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