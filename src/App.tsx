import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Discover from "./pages/Discover";
import Matches from "./pages/Matches";
import Negotiations from "./pages/Negotiations";
import Wellness from "./pages/Wellness";
import Profile from "./pages/Profile";
import Onboarding from "./pages/Onboarding";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/athlete/onboarding" element={<Onboarding />} />
          
          {/* App Routes */}
          <Route path="/app" element={<Dashboard />} />
          <Route path="/app/discover" element={<Discover />} />
          <Route path="/app/matches" element={<Matches />} />
          <Route path="/app/negotiations/:matchId" element={<Negotiations />} />
          <Route path="/app/wellness" element={<Wellness />} />
          <Route path="/app/profile" element={<Profile />} />
          
          {/* Legacy routes - redirect to /app */}
          <Route path="/discover" element={<Discover />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/wellness" element={<Wellness />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/onboarding" element={<Onboarding />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
