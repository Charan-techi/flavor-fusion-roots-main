import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Homepage } from "./components/Homepage";
import { DishPage } from "./components/DishPage";
import { Dish } from "./data/dishes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'dish'>('home');

  const handleDishSelect = (dish: Dish) => {
    setSelectedDish(dish);
    setCurrentView('dish');
  };

  const handleBackToHome = () => {
    setSelectedDish(null);
    setCurrentView('home');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              currentView === 'home' ? (
                <Homepage onDishSelect={handleDishSelect} />
              ) : selectedDish ? (
                <DishPage dish={selectedDish} onBack={handleBackToHome} />
              ) : (
                <Homepage onDishSelect={handleDishSelect} />
              )
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
