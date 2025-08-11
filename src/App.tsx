import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import EasterEggBunny from "./components/EasterEggBunny";
import Home from "./pages/Home";
import Journal from "./pages/Journal";
import Chatbot from "./pages/Chatbot";
import Garden from "./pages/Garden";
import Wellness from "./pages/Wellness";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/garden" element={<Garden />} />
            <Route path="/wellness" element={<Wellness />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <EasterEggBunny />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
