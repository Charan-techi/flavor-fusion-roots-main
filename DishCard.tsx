import { motion } from 'framer-motion';
import { Leaf, Timer, Flame } from 'lucide-react';
import { Dish } from '@/data/dishes';

interface DishCardProps {
  dish: Dish;
  onClick: (dish: Dish) => void;
  index?: number;
}

export const DishCard = ({ dish, onClick, index = 0 }: DishCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100 
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(dish)}
      className="food-card-hover glass-card rounded-3xl overflow-hidden cursor-pointer group"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={dish.imageUrl}
          alt={dish.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Veg/Non-Veg Badge */}
        <div className="absolute top-3 left-3">
          <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
            dish.isVeg 
              ? 'bg-accent/90 text-accent-foreground' 
              : 'bg-destructive/90 text-destructive-foreground'
          }`}>
            <Leaf className="h-3 w-3" />
            {dish.isVeg ? 'VEG' : 'NON-VEG'}
          </div>
        </div>

        {/* Calories Badge */}
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium">
            <Flame className="h-3 w-3" />
            {dish.nutrition.calories} cal
          </div>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white text-xl font-bold mb-1">
            {dish.name}
          </h3>
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Timer className="h-4 w-4" />
            <span>Ready in 45 mins</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Nutrition Preview */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-primary">
              {dish.nutrition.protein}g
            </div>
            <div className="text-xs text-muted-foreground">Protein</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-accent">
              {dish.nutrition.carbs}g
            </div>
            <div className="text-xs text-muted-foreground">Carbs</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-orange-500">
              {dish.nutrition.fat}g
            </div>
            <div className="text-xs text-muted-foreground">Fat</div>
          </div>
        </div>

        {/* Cultural Secret Preview */}
        <div className="bg-muted/50 rounded-xl p-3">
          <p className="text-sm text-muted-foreground line-clamp-2">
            💡 {dish.culturalSecret}
          </p>
        </div>

        {/* Action Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4"
        >
          <div className="w-full py-3 px-4 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground rounded-xl text-center font-medium shadow-soft">
            View Recipe & Nutrition
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};