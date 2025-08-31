import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChefHat, TrendingUp, Leaf, Dumbbell, Sparkles, Award, Users } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { DishCard } from './DishCard';
import { LanguageToggle } from './LanguageToggle';
import { VibrancyAd } from './VibrancyAd';
import { useTranslation } from '@/hooks/useTranslation';
import { dishesData, Dish } from '@/data/dishes';
import heroFoodImg from '@/assets/hero-food.jpg';

interface HomepageProps {
  onDishSelect: (dish: Dish) => void;
}

export const Homepage = ({ onDishSelect }: HomepageProps) => {
  const [searchResults, setSearchResults] = useState<Dish[]>(dishesData);
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'te'>('en');
  const { ts, isTranslating, isInitialized } = useTranslation({ currentLanguage });

  const handleSearch = (query: string) => {
    const filtered = dishesData.filter(dish =>
      dish.name.toLowerCase().includes(query.toLowerCase()) ||
      dish.ingredients.some(ingredient => 
        ingredient.toLowerCase().includes(query.toLowerCase())
      )
    );
    setSearchResults(filtered);
  };

  const categories = [
    {
      title: currentLanguage === 'te' ? 'శాకాహారం అన్వేషించండి' : 'Explore Vegetarian',
      description: currentLanguage === 'te' ? 'మొక్కల ఆధారిత రుచికరమైన వంటకాలు' : 'Plant-based delicious recipes',
      icon: Leaf,
      color: 'from-accent to-accent-soft',
      dishes: dishesData.filter(d => d.isVeg),
    },
    {
      title: currentLanguage === 'te' ? 'మాంసాహారం అన్వేషించండి' : 'Explore Non-Vegetarian',
      description: currentLanguage === 'te' ? 'ప్రోటీన్ అధికంగా ఉండే మాంసం వంటకాలు' : 'Protein-rich meat dishes',
      icon: ChefHat,
      color: 'from-destructive to-red-400',
      dishes: dishesData.filter(d => !d.isVeg),
    },
    {
      title: currentLanguage === 'te' ? 'అధిక ప్రోటీన్' : 'High Protein',
      description: currentLanguage === 'te' ? 'కండరాలు & బలం పెంచండి' : 'Build muscle & strength',
      icon: Dumbbell,
      color: 'from-primary to-primary-glow',
      dishes: dishesData.filter(d => d.nutrition.protein > 15),
    },
    {
      title: currentLanguage === 'te' ? 'తక్కువ కార్బోహైడ్రేట్' : 'Low Carb',
      description: currentLanguage === 'te' ? 'బరువు నిర్వహణకు అనుకూలం' : 'Weight management friendly',
      icon: TrendingUp,
      color: 'from-orange-500 to-yellow-500',
      dishes: dishesData.filter(d => d.nutrition.carbs < 40),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Navigation */}
      <nav className="relative z-50 backdrop-blur-xl bg-background/80 border-b border-border/50 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary-glow shadow-soft"
              >
                <ChefHat className="h-6 w-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">
                  {ts('Smart Nutrition')}
                </h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  {currentLanguage === 'te' ? 'ఆరోగ్యకరమైన జీవనశైలికి మార్గం' : 'Your path to healthy living'}
                </p>
              </div>
            </motion.div>
            
            <div className="flex items-center gap-4">
              {/* Status indicator */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20"
              >
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-medium text-accent">
                  {currentLanguage === 'te' ? 'లైవ్' : 'Live'}
                </span>
              </motion.div>

              <LanguageToggle
                currentLanguage={currentLanguage}
                onLanguageChange={setCurrentLanguage}
                isTranslating={isTranslating}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
          <img
            src={heroFoodImg}
            alt={currentLanguage === 'te' ? 'రుచికరమైన భారతీయ వంటకాలు' : 'Delicious Indian cuisine'}
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80" />
          
          {/* Animated overlay patterns */}
          <motion.div
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [1.2, 1, 1.2],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-accent/20 rounded-full blur-3xl"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-6 py-3 mb-8"
          >
            <Sparkles className="h-5 w-5 text-accent" />
            <span className="text-white font-medium">
              {currentLanguage === 'te' ? 'AI ఆధారిత పోషణ సలహాదారు' : 'AI-Powered Nutrition Advisor'}
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl sm:text-6xl lg:text-8xl font-bold text-white mb-8 leading-tight"
          >
            <motion.span
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="bg-gradient-to-r from-white via-primary-glow to-accent bg-clip-text text-transparent bg-[length:200%_100%]"
            >
              {ts('Eat Smart, Stay Fit, Stay Rooted').split(',')[0]}
            </motion.span>
            <br />
            <span className="text-white/90 text-3xl sm:text-4xl lg:text-6xl">
              {currentLanguage === 'te' ? 'ఫిట్‌గా ఉండండి, మూలాలను విస్మరించకండి' : 'Stay Fit, Stay Rooted'}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            {ts('Discover personalized nutrition insights')}
          </motion.p>

          {/* Enhanced Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12"
          >
            <SearchBar
              onSearch={handleSearch}
              className="mx-auto transform scale-110"
              placeholder={currentLanguage === 'te' ? 'వంటకాలను వెతకండి...' : 'Search dishes...'}
            />
          </motion.div>

          {/* Enhanced Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { 
                value: `${dishesData.length}+`, 
                label: ts('Recipes'),
                icon: ChefHat,
                color: 'text-primary-glow' 
              },
              { 
                value: '2', 
                label: ts('Languages'),
                icon: Users,
                color: 'text-accent' 
              },
              { 
                value: '100%', 
                label: ts('Authentic'),
                icon: Award,
                color: 'text-orange-400' 
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300"
              >
                <stat.icon className="h-8 w-8 mx-auto mb-3 text-white/60 group-hover:text-white transition-colors" />
                <div className={`text-3xl font-bold ${stat.color} mb-2 group-hover:scale-110 transition-transform`}>
                  {stat.value}
                </div>
                <div className="text-white/70 text-sm font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Categories Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h3 className="text-5xl font-bold mb-4 gradient-text">
              {ts('Explore by Category')}
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {currentLanguage === 'te' 
                ? 'మీ రుచికి మరియు ఆరోగ్య లక్ష్యాలకు అనుగుణంగా పరిపూర్ణ వంటకాలను కనుగొనండి'
                : 'Discover perfect dishes tailored to your taste and health goals'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
                whileHover={{ y: -12, scale: 1.03 }}
                className="group relative overflow-hidden"
              >
                <div className="glass-card rounded-3xl p-8 cursor-pointer h-full relative overflow-hidden transition-all duration-500 group-hover:shadow-glow">
                  {/* Animated background gradient */}
                  <motion.div
                    animate={{
                      opacity: [0, 0.1, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />
                  
                  <div className="relative z-10">
                    <motion.div 
                      whileHover={{ rotate: 15, scale: 1.1 }}
                      className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6 shadow-soft group-hover:shadow-glow transition-shadow duration-300`}
                    >
                      <category.icon className="h-10 w-10 text-white" />
                    </motion.div>
                    
                    <h4 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                      {category.title}
                    </h4>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {category.description}
                    </p>
                    
                    <motion.div 
                      className="flex items-center justify-between"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-sm text-primary font-semibold">
                        {category.dishes.length} {currentLanguage === 'te' ? 'వంటకాలు' : 'recipes'}
                      </span>
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="text-primary text-xl"
                      >
                        →
                      </motion.span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vibrant Advertisement Section */}
      <section className="mb-0">
        <VibrancyAd />
      </section>

      {/* Featured Dishes Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-16 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-5xl font-bold gradient-text mb-2">
                {ts('Trending Dishes')}
              </h3>
              <p className="text-muted-foreground text-lg">
                {currentLanguage === 'te' 
                  ? 'ఈ వారం అత్యధికంగా వెతికిన వంటకాలు'
                  : 'Most searched dishes this week'
                }
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 bg-muted/50 backdrop-blur-sm rounded-2xl px-6 py-3 border border-border/50"
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              </div>
              <span className="text-sm font-medium text-foreground">
                {currentLanguage === 'te' ? 'లైవ్ ట్రెండ్స్' : 'Live Trends'}
              </span>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.map((dish, index) => (
              <DishCard
                key={dish.id}
                dish={dish}
                onClick={onDishSelect}
                index={index}
              />
            ))}
          </div>

          {searchResults.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h4 className="text-2xl font-bold mb-2">No dishes found</h4>
              <p className="text-muted-foreground">
                Try searching for something else or explore our categories above
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};