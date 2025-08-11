import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, TrendingUp, Calendar, Smile, Gauge } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

interface MoodData {
  date: string;
  mood: string;
  moodScore: number;
}

const Wellness = () => {
  const [moodData, setMoodData] = useState<MoodData[]>([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [averageMoodScore, setAverageMoodScore] = useState(0);
  const [positiveEntries, setPositiveEntries] = useState(0);
  const [weeklyData, setWeeklyData] = useState<any[]>([]);

  const moodScores = {
    happy: 90,
    excited: 95,
    peaceful: 80,
    inspired: 85,
    grateful: 88,
    anxious: 30,
    worried: 25,
    sad: 20,
  };

  const moodEmojis = {
    happy: "😊",
    excited: "🎉", 
    peaceful: "😌",
    inspired: "✨",
    grateful: "🙏",
    anxious: "😰",
    worried: "😟",
    sad: "😔",
  };

  useEffect(() => {
    const savedEntries = localStorage.getItem("journalEntries");
    if (savedEntries) {
      const entries = JSON.parse(savedEntries);
      setTotalEntries(entries.length);
      
      // Process mood data
      const moodEntries = entries
        .filter((entry: any) => entry.mood)
        .map((entry: any) => ({
          date: entry.date,
          mood: entry.mood,
          moodScore: moodScores[entry.mood as keyof typeof moodScores] || 50,
        }));
      
      setMoodData(moodEntries);
      
      // Calculate averages
      if (moodEntries.length > 0) {
        const avgScore = moodEntries.reduce((sum, entry) => sum + entry.moodScore, 0) / moodEntries.length;
        setAverageMoodScore(Math.round(avgScore));
        
        const positive = moodEntries.filter(entry => entry.moodScore >= 70).length;
        setPositiveEntries(positive);
        
        // Generate weekly data
        const weeklyMoodData = generateWeeklyData(moodEntries);
        setWeeklyData(weeklyMoodData);
      }
    }
  }, []);

  const generateWeeklyData = (entries: MoodData[]) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weekData = days.map(day => ({ day, score: 0, count: 0 }));
    
    entries.forEach(entry => {
      const date = new Date(entry.date);
      const dayIndex = (date.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0
      if (weekData[dayIndex]) {
        weekData[dayIndex].score += entry.moodScore;
        weekData[dayIndex].count += 1;
      }
    });
    
    return weekData.map(day => ({
      day: day.day,
      score: day.count > 0 ? Math.round(day.score / day.count) : 0
    }));
  };

  const getStressLevel = () => {
    if (averageMoodScore >= 80) return { level: "Low", color: "text-secondary-foreground", description: "You're doing great!" };
    if (averageMoodScore >= 60) return { level: "Moderate", color: "text-yellow-600", description: "Consider self-care activities" };
    if (averageMoodScore >= 40) return { level: "High", color: "text-orange-600", description: "Focus on stress reduction" };
    return { level: "Very High", color: "text-destructive", description: "Consider seeking support" };
  };

  const recentMoodData = moodData.slice(-7).map((entry, index) => ({
    ...entry,
    day: new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' })
  }));

  const stressInfo = getStressLevel();

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-times text-4xl md:text-5xl font-bold text-foreground mb-4 italic">
            Track Your Mental Wellness Journey
          </h1>
          <p className="text-lg text-muted-foreground">
            Visualize your emotional patterns and celebrate your progress
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="card-gradient p-6 text-center border-0 shadow-lg hover-lift">
            <Gauge className="w-12 h-12 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-lg text-foreground mb-2">Average Mood</h3>
            <p className="text-3xl font-bold text-primary">{averageMoodScore}</p>
            <div className="mt-2">
              <Progress value={averageMoodScore} className="h-2" />
            </div>
          </Card>

          <Card className="card-gradient p-6 text-center border-0 shadow-lg hover-lift">
            <Smile className="w-12 h-12 text-secondary-foreground mx-auto mb-3" />
            <h3 className="font-semibold text-lg text-foreground mb-2">Positive Entries</h3>
            <p className="text-3xl font-bold text-secondary-foreground">{positiveEntries}</p>
            <p className="text-sm text-muted-foreground">
              {totalEntries > 0 ? Math.round((positiveEntries / totalEntries) * 100) : 0}% of total
            </p>
          </Card>

          <Card className="card-gradient p-6 text-center border-0 shadow-lg hover-lift">
            <TrendingUp className="w-12 h-12 text-accent-foreground mx-auto mb-3" />
            <h3 className="font-semibold text-lg text-foreground mb-2">Stress Level</h3>
            <p className={`text-2xl font-bold ${stressInfo.color}`}>{stressInfo.level}</p>
            <p className="text-sm text-muted-foreground">{stressInfo.description}</p>
          </Card>

          <Card className="card-gradient p-6 text-center border-0 shadow-lg hover-lift">
            <Calendar className="w-12 h-12 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-lg text-foreground mb-2">Total Entries</h3>
            <p className="text-3xl font-bold text-primary">{totalEntries}</p>
            <p className="text-sm text-muted-foreground">Keep journaling!</p>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Weekly Mood Tracker */}
          <Card className="card-gradient p-6 border-0 shadow-lg">
            <h3 className="font-times text-2xl font-bold text-foreground mb-6 italic flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              Weekly Mood Tracker
            </h3>
            
            {weeklyData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="day" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Mood Score']}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No mood data yet</p>
                <p className="text-sm">Start journaling with mood tracking to see patterns!</p>
              </div>
            )}
          </Card>

          {/* Mood Trend */}
          <Card className="card-gradient p-6 border-0 shadow-lg">
            <h3 className="font-times text-2xl font-bold text-foreground mb-6 italic flex items-center gap-2">
              <Heart className="w-6 h-6 text-primary" />
              Recent Mood Trend
            </h3>
            
            {recentMoodData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={recentMoodData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="day" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Mood Score']}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="moodScore" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Heart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No recent mood data</p>
                <p className="text-sm">Add mood tracking to your journal entries!</p>
              </div>
            )}
          </Card>
        </div>

        {/* Recent Mood Entries */}
        {moodData.length > 0 && (
          <Card className="card-gradient p-6 border-0 shadow-lg">
            <h3 className="font-times text-2xl font-bold text-foreground mb-6 italic">
              Recent Mood Entries
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {moodData.slice(-6).reverse().map((entry, index) => (
                <div key={index} className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">
                      {moodEmojis[entry.mood as keyof typeof moodEmojis] || "😌"}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(entry.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="font-medium text-foreground capitalize">{entry.mood}</p>
                  <div className="mt-2">
                    <Progress value={entry.moodScore} className="h-1.5" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Wellness Tips */}
        <Card className="card-gradient p-8 border-0 shadow-lg mt-12">
          <h3 className="font-times text-2xl font-bold text-foreground mb-6 italic text-center">
            Wellness Tips for You
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Daily Reflection</h4>
              <p className="text-sm text-muted-foreground">
                Take 5 minutes each day to reflect on your emotions and experiences
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smile className="w-6 h-6 text-secondary-foreground" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Gratitude Practice</h4>
              <p className="text-sm text-muted-foreground">
                Write down three things you're grateful for each week
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-accent-foreground" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Progress Tracking</h4>
              <p className="text-sm text-muted-foreground">
                Celebrate small wins and notice patterns in your wellness journey
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Wellness;