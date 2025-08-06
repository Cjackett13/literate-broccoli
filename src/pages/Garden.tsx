import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Flower, Sparkles, Droplets, Sprout } from "lucide-react";
import gardenImage from "@/assets/enchanted-garden.jpg";

interface Plant {
  id: string;
  name: string;
  type: string;
  growth: number;
  emoji: string;
  description: string;
}

const Garden = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [plantFood, setPlantFood] = useState(0);
  const [totalEntries, setTotalEntries] = useState(0);

  const plantTypes = [
    {
      name: "Mindfulness Bloom",
      emoji: "🌸",
      description: "A delicate flower that represents inner peace and mindfulness",
      requiredEntries: 1,
    },
    {
      name: "Confidence Tree",
      emoji: "🌳",
      description: "A strong tree symbolizing growing self-confidence",
      requiredEntries: 3,
    },
    {
      name: "Joy Sunflower",
      emoji: "🌻",
      description: "A bright sunflower that celebrates moments of happiness",
      requiredEntries: 5,
    },
    {
      name: "Wisdom Lily",
      emoji: "🪷",
      description: "An elegant lily representing personal growth and wisdom",
      requiredEntries: 7,
    },
    {
      name: "Serenity Lavender",
      emoji: "💜",
      description: "Calming lavender for peace and relaxation",
      requiredEntries: 10,
    },
    {
      name: "Magical Rainbow Rose",
      emoji: "🌈",
      description: "A mystical rose that appears when you've made great progress",
      requiredEntries: 15,
    },
  ];

  // Load data from localStorage
  useEffect(() => {
    const savedPlants = localStorage.getItem("gardenPlants");
    const savedEntries = localStorage.getItem("journalEntries");
    
    if (savedPlants) {
      setPlants(JSON.parse(savedPlants));
    }
    
    if (savedEntries) {
      const entries = JSON.parse(savedEntries);
      setTotalEntries(entries.length);
      setPlantFood(entries.length * 3); // 3 plant food per journal entry
    }
  }, []);

  // Check for new plants to unlock
  useEffect(() => {
    plantTypes.forEach((plantType) => {
      if (totalEntries >= plantType.requiredEntries) {
        const existingPlant = plants.find(p => p.name === plantType.name);
        if (!existingPlant) {
          const newPlant: Plant = {
            id: Date.now().toString() + plantType.name,
            name: plantType.name,
            type: plantType.emoji,
            growth: 0,
            emoji: plantType.emoji,
            description: plantType.description,
          };
          
          setPlants(prev => {
            const updated = [...prev, newPlant];
            localStorage.setItem("gardenPlants", JSON.stringify(updated));
            return updated;
          });
        }
      }
    });
  }, [totalEntries, plants]);

  const waterPlant = (plantId: string) => {
    if (plantFood < 1) return;

    setPlants(prev => {
      const updated = prev.map(plant => {
        if (plant.id === plantId && plant.growth < 100) {
          return { ...plant, growth: Math.min(100, plant.growth + 25) };
        }
        return plant;
      });
      localStorage.setItem("gardenPlants", JSON.stringify(updated));
      return updated;
    });

    setPlantFood(prev => prev - 1);
  };

  const getAvailablePlants = () => {
    return plantTypes.filter(plantType => totalEntries >= plantType.requiredEntries);
  };

  const getNextPlantToUnlock = () => {
    return plantTypes.find(plantType => totalEntries < plantType.requiredEntries);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${gardenImage})` }}
        />
        <div className="garden-gradient absolute inset-0 opacity-90" />
        
        <div className="relative container mx-auto px-6 py-16 text-center">
          <h1 className="font-times text-4xl md:text-6xl font-bold text-white mb-4 italic">
            Enchanted Garden
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Watch your wellness journey bloom into beautiful, magical plants as you write and reflect
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="card-gradient p-6 text-center border-0 shadow-lg">
            <Droplets className="w-12 h-12 text-accent-foreground mx-auto mb-3" />
            <h3 className="font-semibold text-lg text-foreground mb-2">Plant Food</h3>
            <p className="text-3xl font-bold text-primary">{plantFood}</p>
            <p className="text-sm text-muted-foreground">Earned from journal entries</p>
          </Card>
          
          <Card className="card-gradient p-6 text-center border-0 shadow-lg">
            <Flower className="w-12 h-12 text-secondary-foreground mx-auto mb-3" />
            <h3 className="font-semibold text-lg text-foreground mb-2">Plants</h3>
            <p className="text-3xl font-bold text-primary">{plants.length}</p>
            <p className="text-sm text-muted-foreground">Growing in your garden</p>
          </Card>
          
          <Card className="card-gradient p-6 text-center border-0 shadow-lg">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-lg text-foreground mb-2">Journal Entries</h3>
            <p className="text-3xl font-bold text-primary">{totalEntries}</p>
            <p className="text-sm text-muted-foreground">Thoughts shared</p>
          </Card>
        </div>

        {/* Garden Display */}
        <div className="mb-12">
          <h2 className="font-times text-3xl font-bold text-foreground mb-8 italic text-center">
            Your Magical Garden
          </h2>
          
          {plants.length === 0 ? (
            <Card className="card-gradient p-12 text-center border-0 shadow-lg">
              <Sprout className="w-16 h-16 mx-auto mb-4 opacity-50 text-muted-foreground" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Your garden is waiting to bloom
              </h3>
              <p className="text-muted-foreground mb-4">
                Start writing journal entries to unlock your first magical plant!
              </p>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plants.map((plant) => (
                <Card key={plant.id} className="card-gradient p-6 hover-lift border-0 shadow-lg">
                  <div className="text-center">
                    <div className="text-6xl mb-4 animate-float">
                      {plant.emoji}
                    </div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">
                      {plant.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {plant.description}
                    </p>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Growth</span>
                        <span className="text-foreground font-medium">{plant.growth}%</span>
                      </div>
                      <Progress value={plant.growth} className="h-2" />
                    </div>
                    
                    {plant.growth < 100 && (
                      <Button
                        onClick={() => waterPlant(plant.id)}
                        disabled={plantFood < 1}
                        className="w-full hover-lift"
                        variant={plantFood < 1 ? "outline" : "default"}
                      >
                        <Droplets className="w-4 h-4 mr-2" />
                        Water Plant {plantFood < 1 && "(Need more food)"}
                      </Button>
                    )}
                    
                    {plant.growth === 100 && (
                      <div className="bg-secondary/20 text-secondary-foreground px-3 py-2 rounded-lg text-sm font-medium">
                        ✨ Fully Grown! ✨
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Plant Unlock Progress */}
        <Card className="card-gradient p-8 border-0 shadow-lg">
          <h3 className="font-times text-2xl font-bold text-foreground mb-6 italic text-center">
            Plant Collection Progress
          </h3>
          
          <div className="space-y-4">
            {plantTypes.map((plantType, index) => {
              const isUnlocked = totalEntries >= plantType.requiredEntries;
              const progress = Math.min(100, (totalEntries / plantType.requiredEntries) * 100);
              
              return (
                <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-muted/30">
                  <div className={`text-3xl ${isUnlocked ? '' : 'grayscale opacity-50'}`}>
                    {plantType.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className={`font-medium ${isUnlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {plantType.name}
                      </h4>
                      <span className="text-sm text-muted-foreground">
                        {totalEntries}/{plantType.requiredEntries} entries
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  {isUnlocked && (
                    <div className="text-primary">
                      <Sparkles className="w-5 h-5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {getNextPlantToUnlock() && (
            <div className="mt-6 p-4 bg-accent/20 rounded-lg text-center">
              <p className="text-accent-foreground">
                <strong>Next unlock:</strong> {getNextPlantToUnlock()!.name} in{" "}
                {getNextPlantToUnlock()!.requiredEntries - totalEntries} more journal entries!
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Garden;