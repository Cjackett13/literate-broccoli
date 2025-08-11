import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import bunnyImage from "@/assets/bunny-easter-egg.png";

const EasterEggBunny = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  const messages = [
    "You saved a bunny! 🐰✨",
    "Bunny transported back to the garden! 🌸",
    "You found a magical friend! 🪄",
    "Bunny says thank you! 💕",
  ];

  const handleBunnyClick = (e: React.MouseEvent) => {
    if (isClicked) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const newSparkles = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: rect.left + Math.random() * rect.width,
      y: rect.top + Math.random() * rect.height,
    }));
    
    setSparkles(newSparkles);
    setIsClicked(true);
    
    toast({
      title: messages[Math.floor(Math.random() * messages.length)],
      description: "Your kindness makes the world brighter ✨",
      duration: 3000,
    });
    
    // Reset after animation
    setTimeout(() => {
      setIsClicked(false);
      setSparkles([]);
    }, 1000);
  };

  return (
    <>
      <div
        className={`fixed bottom-8 right-8 cursor-pointer transition-all duration-300 hover:scale-110 z-40 ${
          isClicked ? "bunny-hop opacity-0" : "opacity-100"
        }`}
        onClick={handleBunnyClick}
      >
        <img
          src={bunnyImage}
          alt="Easter egg bunny"
          className="w-16 h-16 drop-shadow-lg animate-float"
        />
      </div>
      
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="fixed w-3 h-3 bg-yellow-300 rounded-full sparkle pointer-events-none z-50"
          style={{
            left: sparkle.x,
            top: sparkle.y,
          }}
        />
      ))}
    </>
  );
};

export default EasterEggBunny;