import { pipeline } from '@huggingface/transformers';

class TranslationService {
  private translator: any = null;
  private isInitialized = false;

  async initialize() {
    if (this.isInitialized) return;
    
    try {
      // Use a multilingual model that supports English-Telugu translation
      this.translator = await pipeline(
        'translation',
        'facebook/nllb-200-distilled-600M',
        { device: 'webgpu' }
      );
      this.isInitialized = true;
    } catch (error) {
      console.warn('WebGPU not available, falling back to CPU');
      try {
        this.translator = await pipeline(
          'translation',
          'facebook/nllb-200-distilled-600M'
        );
        this.isInitialized = true;
      } catch (fallbackError) {
        console.error('Translation service initialization failed:', fallbackError);
      }
    }
  }

  async translateText(text: string, fromLang: 'en' | 'te', toLang: 'en' | 'te'): Promise<string> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    if (!this.translator || fromLang === toLang) {
      return text;
    }

    try {
      // Map language codes to NLLB format
      const langMap = {
        'en': 'eng_Latn',
        'te': 'tel_Telu'
      };

      const result = await this.translator(text, {
        src_lang: langMap[fromLang],
        tgt_lang: langMap[toLang],
      });

      return result[0]?.translation_text || text;
    } catch (error) {
      console.error('Translation failed:', error);
      return text; // Return original text if translation fails
    }
  }

  // Batch translation for better performance
  async translateTexts(texts: string[], fromLang: 'en' | 'te', toLang: 'en' | 'te'): Promise<string[]> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    if (!this.translator || fromLang === toLang) {
      return texts;
    }

    try {
      const langMap = {
        'en': 'eng_Latn',
        'te': 'tel_Telu'
      };

      const promises = texts.map(text => 
        this.translator(text, {
          src_lang: langMap[fromLang],
          tgt_lang: langMap[toLang],
        }).then((result: any) => result[0]?.translation_text || text)
      );

      return await Promise.all(promises);
    } catch (error) {
      console.error('Batch translation failed:', error);
      return texts;
    }
  }
}

export const translationService = new TranslationService();