import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Save, Calendar, Heart } from "lucide-react";

interface JournalEntry {
  id: string;
  title: string;
  category: string;
  mood: string;
  content: string;
  date: string;
}

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [mood, setMood] = useState("");
  const [content, setContent] = useState("");

  const moodOptions = [
    { emoji: "😊", label: "Happy", value: "happy" },
    { emoji: "🎉", label: "Excited", value: "excited" },
    { emoji: "😌", label: "Peaceful", value: "peaceful" },
    { emoji: "✨", label: "Inspired", value: "inspired" },
    { emoji: "😰", label: "Anxious", value: "anxious" },
    { emoji: "😟", label: "Worried", value: "worried" },
    { emoji: "😔", label: "Sad", value: "sad" },
    { emoji: "🙏", label: "Grateful", value: "grateful" },
  ];

  // Load entries from localStorage
  useEffect(() => {
    const savedEntries = localStorage.getItem("journalEntries");
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  const saveEntry = () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Please fill in all required fields",
        description: "Title and content are required to save your entry.",
        variant: "destructive",
      });
      return;
    }

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      title: title.trim(),
      category: category || "Personal",
      mood: mood || "peaceful",
      content: content.trim(),
      date: new Date().toISOString().split('T')[0],
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));

    // Reset form
    setTitle("");
    setCategory("");
    setMood("");
    setContent("");

    toast({
      title: "Entry saved! ✨",
      description: "Your thoughts have been safely captured.",
    });
  };

  const getMoodEmoji = (moodValue: string) => {
    const moodOption = moodOptions.find(m => m.value === moodValue);
    return moodOption ? moodOption.emoji : "😌";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-times text-4xl md:text-5xl font-bold text-foreground mb-4 italic">
            Your Personal Journal
          </h1>
          <p className="text-lg text-muted-foreground">
            A safe space to express your thoughts, feelings, and experiences
          </p>
        </div>

        {/* Journal Entry Form */}
        <Card className="card-gradient p-8 mb-12 border-0 shadow-lg">
          <div className="space-y-6">
            <div>
              <Label htmlFor="title" className="text-base font-medium">Entry Title *</Label>
              <Input
                id="title"
                placeholder="What's on your mind today?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="category" className="text-base font-medium">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Personal">Personal</SelectItem>
                    <SelectItem value="Academic">Academic</SelectItem>
                    <SelectItem value="Social">Social</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="mood" className="text-base font-medium">How are you feeling?</Label>
                <Select value={mood} onValueChange={setMood}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select your mood" />
                  </SelectTrigger>
                  <SelectContent>
                    {moodOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <span className="flex items-center gap-2">
                          <span className="text-lg">{option.emoji}</span>
                          {option.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="content" className="text-base font-medium">Your thoughts *</Label>
              <Textarea
                id="content"
                placeholder="Write about your day, feelings, goals, or anything that comes to mind..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-2 min-h-32 resize-none"
                rows={6}
              />
            </div>

            <Button 
              onClick={saveEntry} 
              className="w-full hover-lift wellness-glow font-semibold"
              size="lg"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Entry
            </Button>
          </div>
        </Card>

        {/* Entries Display */}
        <div>
          <h2 className="font-times text-3xl font-bold text-foreground mb-8 italic flex items-center gap-3">
            <Heart className="w-8 h-8 text-primary" />
            Your Entries
          </h2>

          {entries.length === 0 ? (
            <Card className="card-gradient p-12 text-center border-0 shadow-lg">
              <div className="text-muted-foreground">
                <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Empty so far</p>
                <p className="text-sm mt-2">Start writing your first entry to begin your wellness journey!</p>
              </div>
            </Card>
          ) : (
            <div className="space-y-6">
              {entries.map((entry) => (
                <Card key={entry.id} className="card-gradient p-6 hover-lift border-0 shadow-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {entry.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(entry.date)}
                        </span>
                        <span className="px-2 py-1 bg-accent/50 rounded-full text-xs font-medium">
                          {entry.category}
                        </span>
                      </div>
                    </div>
                    <div className="text-3xl">
                      {getMoodEmoji(entry.mood)}
                    </div>
                  </div>
                  <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                    {entry.content}
                  </p>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Journal;