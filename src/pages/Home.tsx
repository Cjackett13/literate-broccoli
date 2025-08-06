import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Sparkles, BookOpen, MessageCircle, Flower, Activity } from "lucide-react";
import heroImage from "@/assets/hero-wellness.jpg";

const Home = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Personal Journal",
      description: "Express your thoughts in a safe, nurturing space",
      link: "/journal",
      color: "text-primary",
    },
    {
      icon: MessageCircle,
      title: "AI Companion",
      description: "Get personalized support and study guidance",
      link: "/chatbot",
      color: "text-accent-foreground",
    },
    {
      icon: Flower,
      title: "Enchanted Garden",
      description: "Watch your wellness journey bloom into beautiful plants",
      link: "/garden",
      color: "text-secondary-foreground",
    },
    {
      icon: Activity,
      title: "Wellness Tracker",
      description: "Visualize your mental health progress over time",
      link: "/wellness",
      color: "text-primary",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="hero-gradient absolute inset-0 opacity-80" />
        
        <div className="relative container mx-auto px-6 py-20 text-center">
          <div className="animate-fade-up">
            <h1 className="font-times text-5xl md:text-7xl font-bold text-white mb-6 italic">
              Everything You Need to Thrive
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto font-light">
              A nurturing digital space where your thoughts, feelings, and wellness journey come together. 
              Start your path to mental clarity and emotional growth today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="hover-lift wellness-glow font-semibold text-lg px-8 py-3">
                <Link to="/journal">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Start Your First Entry
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="hover-lift bg-white/10 text-white border-white/30 hover:bg-white/20 font-semibold text-lg px-8 py-3"
              >
                <Link to="/chatbot">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-times text-4xl md:text-5xl font-bold text-foreground mb-4 italic">
              Your Wellness Companion
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover tools designed to support your mental health journey with warmth, understanding, and care.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="card-gradient p-6 hover-lift border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Link to={feature.link} className="block h-full">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <Icon className={`w-8 h-8 ${feature.color}`} />
                      </div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <Heart className="w-12 h-12 text-primary mx-auto mb-6" />
            <h3 className="font-times text-3xl font-bold text-foreground mb-4 italic">
              Begin Your Journey Today
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              Take the first step towards better mental wellness. Your future self will thank you.
            </p>
            <Button asChild size="lg" className="hover-lift wellness-glow font-semibold">
              <Link to="/journal">
                Start Journaling Now
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;