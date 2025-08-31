import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  Leaf, 
  Share2, 
  Download,
  Lightbulb,
  Target,
  ChefHat
} from 'lucide-react';
import { NutritionChart } from './NutritionChart';
import { LanguageToggle } from './LanguageToggle';
import { useTranslation } from '@/hooks/useTranslation';
import { Dish } from '@/data/dishes';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface DishPageProps {
  dish: Dish;
  onBack: () => void;
}

export const DishPage = ({ dish, onBack }: DishPageProps) => {
  const [activeTab, setActiveTab] = useState<'ingredients' | 'procedure' | 'nutrition' | 'secret' | 'advice'>('ingredients');
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'te'>('en');
  const { t, ts, isTranslating } = useTranslation({ currentLanguage });

  const tabs = [
    { id: 'ingredients', label: 'Ingredients', icon: ChefHat },
    { id: 'procedure', label: 'Procedure', icon: Clock },
    { id: 'nutrition', label: 'Nutrition', icon: Target },
    { id: 'secret', label: 'Cultural Secret', icon: Lightbulb },
    { id: 'advice', label: 'Health Advice', icon: Users },
  ];

  const handleExportPDF = async () => {
    const element = document.getElementById('dish-content');
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF();
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    
    let position = 0;
    
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    pdf.save(`${dish.name}-recipe.pdf`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: dish.name,
        text: `Check out this amazing recipe for ${dish.name}!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast here
    }
  };

  return (
    <div className="min-h-screen bg-background" id="dish-content">
      {/* Header */}
      <header className="relative z-50 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="flex items-center gap-2 glass-card rounded-2xl px-4 py-2 text-foreground hover:bg-muted/50 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Search</span>
          </motion.button>

          <div className="flex items-center gap-4">
            <LanguageToggle
              currentLanguage={currentLanguage}
              onLanguageChange={setCurrentLanguage}
              isTranslating={isTranslating}
            />
            
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="glass-card rounded-xl p-2 hover:bg-muted/50 transition-colors"
              >
                <Share2 className="h-5 w-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleExportPDF}
                className="glass-card rounded-xl p-2 hover:bg-muted/50 transition-colors"
              >
                <Download className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-card">
                <img
                  src={dish.imageUrl}
                  alt={dish.name}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                
                {/* Floating Badges */}
                <div className="absolute top-4 left-4">
                  <div className={`flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium ${
                    dish.isVeg 
                      ? 'bg-accent text-accent-foreground' 
                      : 'bg-destructive text-destructive-foreground'
                  }`}>
                    <Leaf className="h-4 w-4" />
                    {dish.isVeg ? 'VEGETARIAN' : 'NON-VEGETARIAN'}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-5xl font-bold mb-4 gradient-text">
                  {dish.name}
                </h1>
                
                <div className="flex items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>45 mins</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span>Serves 4</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    <span>{dish.nutrition.calories} cal/serving</span>
                  </div>
                </div>
              </div>

              {/* Quick Nutrition */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Nutrition</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {dish.nutrition.calories}
                    </div>
                    <div className="text-sm text-muted-foreground">Calories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-glow">
                      {dish.nutrition.protein}g
                    </div>
                    <div className="text-sm text-muted-foreground">Protein</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">
                      {dish.nutrition.carbs}g
                    </div>
                    <div className="text-sm text-muted-foreground">Carbs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500">
                      {dish.nutrition.fat}g
                    </div>
                    <div className="text-sm text-muted-foreground">Fat</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="px-6 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'glass-card hover:bg-muted/50'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span className="font-medium">{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'ingredients' && (
                <div className="glass-card rounded-3xl p-8">
                  <h2 className="text-3xl font-bold mb-6 gradient-text">
                    Ingredients
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {dish.ingredients.map((ingredient, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-foreground">{ingredient}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'procedure' && (
                <div className="glass-card rounded-3xl p-8">
                  <h2 className="text-3xl font-bold mb-6 gradient-text">
                    Cooking Procedure
                  </h2>
                  <div className="space-y-4">
                    {dish.procedure.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-4 p-4 bg-muted/30 rounded-xl"
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <p className="text-foreground leading-relaxed">{step}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'nutrition' && <NutritionChart nutrition={dish.nutrition} />}

              {activeTab === 'secret' && (
                <div className="glass-card rounded-3xl p-8">
                  <h2 className="text-3xl font-bold mb-6 gradient-text">
                    Cultural Secret
                  </h2>
                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 border border-primary/20">
                    <div className="flex items-start gap-4">
                      <Lightbulb className="h-8 w-8 text-primary mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold mb-3 text-primary">
                          Traditional Wisdom
                        </h3>
                        <p className="text-foreground leading-relaxed text-lg">
                          {dish.culturalSecret}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'advice' && (
                <div className="space-y-6">
                  <div className="glass-card rounded-3xl p-8">
                    <h2 className="text-3xl font-bold mb-6 gradient-text">
                      Personalized Health Advice
                    </h2>
                    
                    <div className="grid lg:grid-cols-3 gap-6">
                      <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 rounded-2xl p-6 border border-red-200 dark:border-red-800/30">
                        <h3 className="text-xl font-semibold mb-3 text-red-700 dark:text-red-300">
                          💪 Weight Loss
                        </h3>
                        <p className="text-red-600 dark:text-red-400 leading-relaxed">
                          {dish.healthAdvice.weightLoss}
                        </p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800/30">
                        <h3 className="text-xl font-semibold mb-3 text-green-700 dark:text-green-300">
                          🎯 Weight Gain
                        </h3>
                        <p className="text-green-600 dark:text-green-400 leading-relaxed">
                          {dish.healthAdvice.weightGain}
                        </p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800/30">
                        <h3 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-300">
                          ⚖️ Maintenance
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 leading-relaxed">
                          {dish.healthAdvice.maintenance}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};