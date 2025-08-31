import { motion } from 'framer-motion';
import { Nutrition } from '@/data/dishes';

interface NutritionChartProps {
  nutrition: Nutrition;
}

export const NutritionChart = ({ nutrition }: NutritionChartProps) => {
  const totalMacros = nutrition.protein + nutrition.carbs + nutrition.fat;
  
  const macros = [
    {
      name: 'Protein',
      value: nutrition.protein,
      percentage: (nutrition.protein / totalMacros) * 100,
      color: 'bg-primary',
      glow: 'shadow-[0_0_20px_hsl(var(--primary)/0.5)]'
    },
    {
      name: 'Carbs',
      value: nutrition.carbs,
      percentage: (nutrition.carbs / totalMacros) * 100,
      color: 'bg-accent',
      glow: 'shadow-[0_0_20px_hsl(var(--accent)/0.5)]'
    },
    {
      name: 'Fat',
      value: nutrition.fat,
      percentage: (nutrition.fat / totalMacros) * 100,
      color: 'bg-orange-500',
      glow: 'shadow-[0_0_20px_rgba(249,115,22,0.5)]'
    }
  ];

  return (
    <div className="glass-card rounded-3xl p-6">
      <h3 className="text-2xl font-bold mb-6 gradient-text">
        Nutrition Breakdown
      </h3>

      {/* Calories Display */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          className="relative inline-block"
        >
          <div className="w-32 h-32 rounded-full border-8 border-primary/20 flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 shadow-glow">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {nutrition.calories}
              </div>
              <div className="text-sm text-muted-foreground">
                Calories
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Macro Bars */}
      <div className="space-y-6">
        {macros.map((macro, index) => (
          <motion.div
            key={macro.name}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-foreground">
                {macro.name}
              </span>
              <span className="text-sm text-muted-foreground">
                {macro.value}g ({macro.percentage.toFixed(1)}%)
              </span>
            </div>
            
            <div className="nutrition-bar bg-muted/50">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${macro.percentage}%` }}
                transition={{ 
                  duration: 1.5, 
                  delay: 0.5 + index * 0.2,
                  type: "spring",
                  stiffness: 50
                }}
                className={`nutrition-fill ${macro.color} ${macro.glow}`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Nutrients */}
      <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-border/50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center p-3 bg-muted/30 rounded-xl"
        >
          <div className="text-lg font-bold text-accent">
            {nutrition.fiber}g
          </div>
          <div className="text-sm text-muted-foreground">
            Fiber
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-center p-3 bg-muted/30 rounded-xl"
        >
          <div className="text-lg font-bold text-blue-500">
            💧
          </div>
          <div className="text-xs text-muted-foreground">
            Hydration
          </div>
        </motion.div>
      </div>

      {/* Water Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-800/30"
      >
        <p className="text-sm text-blue-700 dark:text-blue-300">
          💧 {nutrition.waterNote}
        </p>
      </motion.div>
    </div>
  );
};