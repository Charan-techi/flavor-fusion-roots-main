import chickenBiryaniImg from '@/assets/chicken-biryani.jpg';
import paneerButterMasalaImg from '@/assets/paneer-butter-masala.jpg';
import vegPulaoImg from '@/assets/veg-pulao.jpg';
import masalaDosaImg from '@/assets/masala-dosa.jpg';

export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  waterNote: string;
}

export interface Dish {
  id: string;
  name: string;
  isVeg: boolean;
  imageUrl: string;
  ingredients: string[];
  procedure: string[];
  nutrition: Nutrition;
  culturalSecret: string;
  healthAdvice: {
    weightLoss: string;
    weightGain: string;
    maintenance: string;
  };
  teluguTranslation?: {
    name: string;
    ingredients: string[];
    procedure: string[];
    culturalSecret: string;
    healthAdvice: {
      weightLoss: string;
      weightGain: string;
      maintenance: string;
    };
  };
}

export const dishesData: Dish[] = [
  {
    id: 'chicken-biryani',
    name: 'Chicken Biryani',
    isVeg: false,
    imageUrl: chickenBiryaniImg,
    ingredients: [
      '2 cups basmati rice',
      '500g chicken (cut into pieces)',
      '2 large onions (sliced)',
      '4 tbsp ghee/oil',
      '1 cup yogurt',
      '2 tsp ginger-garlic paste',
      '1 tsp red chili powder',
      '1/2 tsp turmeric powder',
      '2 tsp biryani masala',
      'Whole spices (bay leaves, cardamom, cinnamon)',
      'Saffron soaked in warm milk',
      'Fresh mint and coriander leaves',
      'Salt to taste'
    ],
    procedure: [
      'Wash and soak basmati rice for 30 minutes',
      'Marinate chicken with yogurt, ginger-garlic paste, and spices for 1 hour',
      'Deep fry sliced onions until golden brown and crispy',
      'In the same oil, cook marinated chicken until 80% done',
      'Boil water with whole spices, add soaked rice and cook until 70% done',
      'Layer the partially cooked rice over chicken',
      'Sprinkle fried onions, mint, coriander, and saffron milk',
      'Cover with aluminum foil, then pot lid for dum cooking',
      'Cook on high heat for 3-4 minutes, then reduce to low heat',
      'Continue dum cooking for 45 minutes',
      'Let it rest for 10 minutes before opening',
      'Gently mix and serve hot with raita and shorba'
    ],
    nutrition: {
      calories: 420,
      protein: 18,
      carbs: 60,
      fat: 12,
      fiber: 3,
      waterNote: 'Drink 300-400ml water with this meal for better digestion'
    },
    culturalSecret: 'Traditionally slow-cooked on dum (steam) to lock in aromatic flavors and aid digestion. The layering technique ensures each grain absorbs the essence.',
    healthAdvice: {
      weightLoss: 'Use brown rice instead of basmati, reduce ghee, and add extra vegetables like carrots and peas. Pair with cucumber raita.',
      weightGain: 'Add extra ghee, fried cashews, and a boiled egg. Serve with mutton shorba for additional protein.',
      maintenance: 'Perfect as is! The balanced protein and carbs make it ideal for maintaining current weight. Add a side salad.'
    }
  },
  {
    id: 'paneer-butter-masala',
    name: 'Paneer Butter Masala',
    isVeg: true,
    imageUrl: paneerButterMasalaImg,
    ingredients: [
      '250g paneer (cubed)',
      '3 large tomatoes',
      '1 large onion',
      '2 tbsp butter',
      '1 tbsp oil',
      '1 tsp ginger-garlic paste',
      '1 tsp red chili powder',
      '1 tsp garam masala',
      '1/2 tsp turmeric powder',
      '3 tbsp fresh cream',
      '1 tbsp cashews',
      '1 tsp sugar',
      'Fresh coriander leaves',
      'Salt to taste'
    ],
    procedure: [
      'Blanch tomatoes in hot water, peel and roughly chop',
      'Sauté onions in butter and oil until translucent',
      'Add ginger-garlic paste and cook for 1 minute',
      'Add chopped tomatoes, cashews and all dry spices',
      'Cook until tomatoes are soft and oil separates',
      'Let the mixture cool, then blend to a smooth paste',
      'Strain the gravy for silky texture (optional)',
      'Heat the gravy, add sugar and adjust seasoning',
      'Gently add paneer cubes without breaking them',
      'Simmer for 2-3 minutes until paneer is heated through',
      'Finish with fresh cream and butter',
      'Garnish with coriander leaves and serve hot'
    ],
    nutrition: {
      calories: 380,
      protein: 14,
      carbs: 30,
      fat: 18,
      fiber: 2,
      waterNote: 'Pair with water and cucumber raita to balance the richness'
    },
    culturalSecret: 'Mughlai roots with slow simmering technique that balances spices and richness. The cream-butter finish was perfected in royal kitchens.',
    healthAdvice: {
      weightLoss: 'Replace cream with Greek yogurt, use less butter, and add bell peppers for extra nutrition. Serve with roti instead of naan.',
      weightGain: 'Add cashew paste for richness, extra butter, and serve with butter naan or jeera rice.',
      maintenance: 'Moderate the cream and butter. Perfect protein source for vegetarians when paired with whole grain roti.'
    }
  },
  {
    id: 'veg-pulao',
    name: 'Vegetable Pulao',
    isVeg: true,
    imageUrl: vegPulaoImg,
    ingredients: [
      '1 cup basmati rice',
      '1 cup mixed vegetables (carrots, peas, beans)',
      '1 large onion (sliced)',
      '2 tbsp ghee/oil',
      '1 tsp cumin seeds',
      '4-5 green cardamom',
      '1 bay leaf',
      '1 inch cinnamon stick',
      '1 tsp ginger-garlic paste',
      '1/2 tsp turmeric powder',
      '1 tsp biryani masala',
      '2 cups hot water',
      'Fresh mint leaves',
      'Salt to taste'
    ],
    procedure: [
      'Wash and soak basmati rice for 20 minutes',
      'Heat ghee in a heavy-bottomed pan',
      'Add cumin seeds and whole spices, let them splutter',
      'Add sliced onions and sauté until light golden',
      'Add ginger-garlic paste and cook for 1 minute',
      'Add mixed vegetables and sauté for 3-4 minutes',
      'Add turmeric and biryani masala, mix well',
      'Add soaked rice and gently mix with vegetables',
      'Add hot water and salt, bring to a boil',
      'Reduce heat to low, cover and cook for 15 minutes',
      'Let it rest for 5 minutes without opening the lid',
      'Gently mix and garnish with mint leaves'
    ],
    nutrition: {
      calories: 280,
      protein: 7,
      carbs: 50,
      fat: 5,
      fiber: 4,
      waterNote: 'Light and hydrating. Add 250ml water for optimal digestion'
    },
    culturalSecret: 'Festival favorite across India. The light spice blend keeps it gut-friendly while the vegetables add essential nutrients for celebrations.',
    healthAdvice: {
      weightLoss: 'Add extra vegetables, reduce ghee, and include protein-rich additions like green peas and paneer cubes.',
      weightGain: 'Increase ghee content, add cashews and raisins, serve with dal and pickle for a complete meal.',
      maintenance: 'Perfect as a light meal. Add a protein source like boiled eggs or grilled chicken for balanced nutrition.'
    }
  },
  {
    id: 'masala-dosa',
    name: 'Masala Dosa',
    isVeg: true,
    imageUrl: masalaDosaImg,
    ingredients: [
      '2 cups dosa batter (fermented)',
      '3 medium potatoes (boiled)',
      '1 large onion (chopped)',
      '2 green chilies',
      '1 tsp mustard seeds',
      '1 tsp urad dal',
      '10-12 curry leaves',
      '1/2 tsp turmeric powder',
      '1 tsp ginger (minced)',
      '2 tbsp oil',
      'Salt to taste',
      'Fresh coriander leaves',
      'Coconut chutney for serving',
      'Sambar for serving'
    ],
    procedure: [
      'Prepare the potato filling first',
      'Heat oil in a pan, add mustard seeds and urad dal',
      'When they splutter, add curry leaves and green chilies',
      'Add chopped onions and sauté until translucent',
      'Add minced ginger and cook for 1 minute',
      'Add boiled potatoes, turmeric, and salt',
      'Mash gently and cook for 3-4 minutes',
      'Garnish with coriander and keep aside',
      'Heat a non-stick tawa or griddle',
      'Pour a ladle of batter and spread in circular motion',
      'Drizzle oil around the edges and cook until golden',
      'Place potato filling on one side of the dosa',
      'Fold the dosa and serve hot with chutney and sambar'
    ],
    nutrition: {
      calories: 320,
      protein: 8,
      carbs: 58,
      fat: 6,
      fiber: 5,
      waterNote: 'Fermented food aids digestion. Drink water after 30 minutes of eating'
    },
    culturalSecret: 'Ancient South Indian fermentation technique creates probiotics that aid digestion. The crispy texture requires perfect batter consistency.',
    healthAdvice: {
      weightLoss: 'Use minimal oil for cooking, add extra vegetables to the filling, and pair with coconut chutney instead of ghee.',
      weightGain: 'Cook with ghee instead of oil, add cheese to the filling, and serve with extra sambar and sweet chutney.',
      maintenance: 'Perfect breakfast option with natural probiotics. The fermentation makes it easier to digest than regular pancakes.'
    }
  }
];

export const searchSuggestions = dishesData.map(dish => dish.name);