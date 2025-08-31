import { motion } from 'framer-motion';
import { Sparkles, Zap, Star, Heart, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const VibrancyAd = () => {
  const floatingIcons = [
    { icon: Sparkles, delay: 0, x: 20, y: 30 },
    { icon: Zap, delay: 0.5, x: -30, y: 20 },
    { icon: Star, delay: 1, x: 40, y: -20 },
    { icon: Heart, delay: 1.5, x: -20, y: -30 },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-electric-blue via-sunset-orange to-fresh-green min-h-screen flex items-center justify-center p-6">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-lemon-yellow/30 to-fresh-green/30 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            rotate: -360,
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-br from-sunset-orange/40 to-electric-blue/40 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-lemon-yellow/20 to-electric-blue/20 rounded-full blur-2xl"
        />
      </div>

      {/* Floating Icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.3, 0.7, 0.3],
            scale: [0.8, 1.2, 0.8],
            y: [0, -10, 0],
          }}
          transition={{
            delay: item.delay,
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute text-white/60 z-10`}
          style={{
            left: `${20 + item.x}%`,
            top: `${30 + item.y}%`,
          }}
        >
          <item.icon size={32} />
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-lg border border-white/30 rounded-full px-6 py-3 mb-8"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="h-5 w-5 text-lemon-yellow" />
          </motion.div>
          <span className="text-white font-semibold text-lg">New & Revolutionary</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight"
        >
          <motion.span
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="bg-gradient-to-r from-lemon-yellow via-white to-fresh-green bg-clip-text text-transparent bg-[length:200%_100%]"
          >
            Transform
          </motion.span>
          <br />
          <span className="text-white drop-shadow-2xl">Your Experience</span>
        </motion.h1>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-2xl mx-auto font-light"
        >
          Discover the power of innovation with our groundbreaking solution that revolutionizes the way you work, play, and connect.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
        >
          {/* Primary CTA */}
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="bg-white text-electric-blue hover:bg-lemon-yellow hover:text-black transition-all duration-300 text-xl px-12 py-6 rounded-full shadow-2xl font-bold group relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-lemon-yellow to-fresh-green opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ borderRadius: 'inherit' }}
              />
              <span className="relative z-10 flex items-center gap-3">
                Get Started Now
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="h-6 w-6" />
                </motion.div>
              </span>
            </Button>
          </motion.div>

          {/* Secondary CTA */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-electric-blue transition-all duration-300 text-xl px-10 py-6 rounded-full backdrop-blur-lg bg-white/10 font-semibold"
            >
              <Play className="h-5 w-5 mr-3" />
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Animated Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white"
        >
          {[
            { number: "10M+", label: "Happy Users", color: "text-lemon-yellow" },
            { number: "99%", label: "Success Rate", color: "text-fresh-green" },
            { number: "#1", label: "Market Leader", color: "text-white" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
                className={`text-4xl md:text-5xl font-bold mb-2 ${stat.color} drop-shadow-lg`}
              >
                {stat.number}
              </motion.div>
              <div className="text-white/80 text-lg font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pulsing Accent Element */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-lemon-yellow to-fresh-green rounded-full"
        />
      </div>

      {/* Corner Decorations */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-8 right-8 w-16 h-16 border-4 border-white/30 rounded-full"
      />
      
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-8 left-8 w-12 h-12 bg-lemon-yellow/40 rounded-lg backdrop-blur-sm"
      />
    </div>
  );
};