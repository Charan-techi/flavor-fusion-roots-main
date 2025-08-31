import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  currentLanguage: 'en' | 'te';
  onLanguageChange: (language: 'en' | 'te') => void;
  isTranslating?: boolean;
}

export const LanguageToggle = ({ currentLanguage, onLanguageChange, isTranslating }: LanguageToggleProps) => {
  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'te', label: 'తెలుగు', flag: '🇮🇳' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-2 glass-card rounded-2xl p-1"
    >
      <Globe className="h-4 w-4 text-muted-foreground ml-2" />
      {languages.map((lang) => (
        <motion.button
          key={lang.code}
          onClick={() => onLanguageChange(lang.code as 'en' | 'te')}
          disabled={isTranslating}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all disabled:opacity-50 ${
            currentLanguage === lang.code
              ? 'bg-primary text-primary-foreground shadow-soft'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          <span className="text-sm">{lang.flag}</span>
          <span className="text-sm font-medium">{lang.label}</span>
        </motion.button>
      ))}
    </motion.div>
  );
};