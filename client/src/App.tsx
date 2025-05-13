import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import AlgorithmDetail from "@/pages/algorithm-detail";
import Category from "@/pages/category";
import Profile from "@/pages/profile";
import CheatSheets from "@/pages/cheatsheets";
import Advanced from "@/pages/advanced";
import Competitions from "@/pages/competitions";
import Quiz from "@/pages/quiz";
import Visualizer from "@/pages/visualizer";
import { ProgressProvider } from "@/context/progress-context";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Scanlines } from "@/components/ui/scanlines";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/algorithms/:id" component={AlgorithmDetail} />
          <Route path="/categories/:id" component={Category} />
          <Route path="/profile" component={Profile} />
          <Route path="/cheatsheets" component={CheatSheets} />
          <Route path="/advanced" component={Advanced} />
          <Route path="/competitions" component={Competitions} />
          <Route path="/quiz" component={Quiz} />
          <Route path="/visualizer" component={Visualizer} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ProgressProvider>
          <Scanlines />
          <Toaster />
          <Router />
        </ProgressProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
