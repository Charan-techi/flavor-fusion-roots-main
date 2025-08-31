import { useState, useEffect, useCallback, useRef } from 'react';
import { translationService } from '@/services/translationService';

interface TranslationCache {
  [key: string]: {
    [lang: string]: string;
  };
}

interface UseTranslationProps {
  currentLanguage: 'en' | 'te';
}

export const useTranslation = ({ currentLanguage }: UseTranslationProps) => {
  const [isTranslating, setIsTranslating] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const cacheRef = useRef<TranslationCache>({});

  // Initialize translation service
  useEffect(() => {
    const initService = async () => {
      await translationService.initialize();
      setIsInitialized(true);
    };
    initService();
  }, []);

  // Get cached translation or return original text
  const getCachedTranslation = useCallback((text: string, targetLang: 'en' | 'te'): string | null => {
    const cache = cacheRef.current[text];
    return cache?.[targetLang] || null;
  }, []);

  // Store translation in cache
  const setCachedTranslation = useCallback((text: string, targetLang: 'en' | 'te', translation: string) => {
    if (!cacheRef.current[text]) {
      cacheRef.current[text] = {};
    }
    cacheRef.current[text][targetLang] = translation;
  }, []);

  // Translate single text
  const t = useCallback(async (text: string, options?: { skipCache?: boolean }): Promise<string> => {
    if (!text || currentLanguage === 'en') {
      return text;
    }

    // Check cache first
    if (!options?.skipCache) {
      const cached = getCachedTranslation(text, currentLanguage);
      if (cached) {
        return cached;
      }
    }

    if (!isInitialized) {
      return text;
    }

    try {
      setIsTranslating(true);
      const translation = await translationService.translateText(text, 'en', currentLanguage);
      setCachedTranslation(text, currentLanguage, translation);
      return translation;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    } finally {
      setIsTranslating(false);
    }
  }, [currentLanguage, isInitialized, getCachedTranslation, setCachedTranslation]);

  // Translate multiple texts at once
  const translateBatch = useCallback(async (texts: string[]): Promise<string[]> => {
    if (currentLanguage === 'en') {
      return texts;
    }

    if (!isInitialized) {
      return texts;
    }

    try {
      setIsTranslating(true);
      const uncachedTexts: string[] = [];
      const cachedResults: { [index: number]: string } = {};

      // Separate cached and uncached texts
      texts.forEach((text, index) => {
        const cached = getCachedTranslation(text, currentLanguage);
        if (cached) {
          cachedResults[index] = cached;
        } else {
          uncachedTexts.push(text);
        }
      });

      // Translate uncached texts
      const translations = uncachedTexts.length > 0 
        ? await translationService.translateTexts(uncachedTexts, 'en', currentLanguage)
        : [];

      // Merge results
      const results: string[] = [];
      let uncachedIndex = 0;

      texts.forEach((text, index) => {
        if (cachedResults[index]) {
          results[index] = cachedResults[index];
        } else {
          const translation = translations[uncachedIndex] || text;
          results[index] = translation;
          setCachedTranslation(text, currentLanguage, translation);
          uncachedIndex++;
        }
      });

      return results;
    } catch (error) {
      console.error('Batch translation error:', error);
      return texts;
    } finally {
      setIsTranslating(false);
    }
  }, [currentLanguage, isInitialized, getCachedTranslation, setCachedTranslation]);

  // Pre-defined translations for better UX
  const staticTranslations = {
    en: {
      'Smart Nutrition': 'Smart Nutrition',
      'Eat Smart, Stay Fit, Stay Rooted': 'Eat Smart, Stay Fit, Stay Rooted',
      'Discover personalized nutrition insights': 'Discover personalized nutrition insights, authentic recipes, and cultural secrets for every dish. Your journey to mindful eating starts here.',
      'Search dishes...': 'Search dishes...',
      'Recipes': 'Recipes',
      'Languages': 'Languages',
      'Authentic': 'Authentic',
      'Explore by Category': 'Explore by Category',
      'Trending Dishes': 'Trending Dishes',
    },
    te: {
      'Smart Nutrition': 'స్మార్ట్ న్యూట్రిషన్',
      'Eat Smart, Stay Fit, Stay Rooted': 'తెలివిగా తింటూ, ఫిట్‌గా ఉండండి, మూలాలను విస్మరించకండి',
      'Discover personalized nutrition insights': 'వ్యక్తిగత పోషణ అంతర్దృష్టులు, నిజమైన వంటకాలు మరియు ప్రతి వంటకం యొక్క సాంస్కృతిక రహస్యాలను కనుగొనండి. మీ స్పృహతో తినే ప్రయాణం ఇక్కడ ప్రారంభమవుతుంది.',
      'Search dishes...': 'వంటకాలను వెతకండి...',
      'Recipes': 'వంటకాలు',
      'Languages': 'భాషలు',
      'Authentic': 'నిజమైన',
      'Explore by Category': 'వర్గం ద్వారా అన్వేషించండి',
      'Trending Dishes': 'ట్రెండింగ్ వంటకాలు',
    }
  };

  // Get static translation or use dynamic translation
  const ts = useCallback((key: string): string => {
    return staticTranslations[currentLanguage][key as keyof typeof staticTranslations['en']] || key;
  }, [currentLanguage]);

  return {
    t,
    ts,
    translateBatch,
    isTranslating,
    isInitialized,
    currentLanguage,
  };
};