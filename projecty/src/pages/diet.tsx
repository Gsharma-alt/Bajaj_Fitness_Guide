import React, { useState } from 'react';
import { Apple, Coffee, Droplet, Sun, Moon, ChevronDown, Dumbbell, Scale } from 'lucide-react';

interface Meal {
  time: string;
  icon: React.ReactNode;
  title: string;
  bulking: {
    recommendations: string[];
    macros?: {
      protein: string;
      carbs: string;
      fats: string;
      calories: string;
    };
  };
  cutting: {
    recommendations: string[];
    macros?: {
      protein: string;
      carbs: string;
      fats: string;
      calories: string;
    };
  };
  supplements?: string[];
}

export default function Diet() {
  const [activeTab, setActiveTab] = useState<'bulking' | 'cutting'>('bulking');
  const [activeMeal, setActiveMeal] = useState<number | null>(null);

  const meals: Meal[] = [
    {
      time: "7:00 AM",
      icon: <Sun className="w-6 h-6" />,
      title: "Breakfast",
      bulking: {
        recommendations: [
          "Oatmeal with banana, peanut butter, and protein powder",
          "6 whole eggs with cheese, avocado, and whole grain toast",
          "Mass gainer smoothie with oats, banana, and protein",
          "Protein pancakes with maple syrup and mixed berries",
          "Bagel with cream cheese, smoked salmon, and scrambled eggs",
          "Overnight oats with protein powder, chia seeds, and nuts",
          "French toast with whey protein, banana, and honey"
        ],
        macros: {
          protein: "40g",
          carbs: "80g",
          fats: "30g",
          calories: "750"
        }
      },
      cutting: {
        recommendations: [
          "Egg white omelet with spinach and mushrooms",
          "Greek yogurt with berries and sugar-free granola",
          "Protein pancakes with sugar-free syrup",
          "Turkey bacon with egg whites and low-fat cheese",
          "Cottage cheese with sliced almonds and cinnamon",
          "Protein smoothie bowl with low-fat granola",
          "Tofu scramble with bell peppers and onions"
        ],
        macros: {
          protein: "35g",
          carbs: "30g",
          fats: "10g",
          calories: "350"
        }
      },
      supplements: [
        "Multivitamin",
        "Omega-3",
        "Creatine Monohydrate",
        "Vitamin D3",
        "Zinc"
      ]
    },
    {
      time: "10:30 AM",
      icon: <Coffee className="w-6 h-6" />,
      title: "Mid-Morning",
      bulking: {
        recommendations: [
          "Protein shake with whole milk",
          "Trail mix with nuts and dried fruits",
          "Peanut butter and banana sandwich",
          "Greek yogurt with granola and honey",
          "Protein bar with almonds",
          "Tuna salad on whole grain crackers",
          "Ham and cheese wrap with avocado",
          "Smoothie with protein, oats, and peanut butter"
        ]
      },
      cutting: {
        recommendations: [
          "Protein shake with water",
          "Apple with cinnamon",
          "Rice cake with low-fat cottage cheese",
          "Celery sticks with sugar-free peanut butter",
          "Hard-boiled eggs",
          "Turkey slices with cucumber",
          "Greek yogurt with sugar-free jelly",
          "Protein coffee with almond milk"
        ]
      }
    },
    {
      time: "1:00 PM",
      icon: <Apple className="w-6 h-6" />,
      title: "Lunch",
      bulking: {
        recommendations: [
          "Double chicken breast with sweet potato and olive oil",
          "Beef stir-fry with rice and vegetables",
          "Salmon with quinoa and avocado",
          "Turkey burger with sweet potato fries",
          "Chicken wrap with hummus and vegetables",
          "Tuna pasta with olive oil and cheese",
          "Rice bowl with ground beef and vegetables",
          "Steak sandwich with cheese and avocado"
        ],
        macros: {
          protein: "50g",
          carbs: "70g",
          fats: "25g",
          calories: "700"
        }
      },
      cutting: {
        recommendations: [
          "Grilled chicken breast with green vegetables",
          "Tuna salad with light dressing",
          "Turkey and vegetable soup",
          "Shrimp stir-fry with cauliflower rice",
          "Chicken and quinoa bowl",
          "Tofu and vegetable skewers",
          "Turkey lettuce wraps",
          "Salmon with asparagus"
        ],
        macros: {
          protein: "40g",
          carbs: "20g",
          fats: "10g",
          calories: "330"
        }
      },
      supplements: [
        "BCAAs",
        "Digestive enzymes",
        "Green tea extract",
        "L-Carnitine"
      ]
    },
    {
      time: "4:00 PM",
      icon: <Droplet className="w-6 h-6" />,
      title: "Pre-Workout",
      bulking: {
        recommendations: [
          "Protein bar and banana",
          "Rice cakes with peanut butter",
          "Sweet potato and chicken",
          "Oatmeal with protein powder",
          "Whole grain toast with eggs",
          "Protein smoothie with fruit",
          "Turkey and cheese sandwich",
          "Greek yogurt with granola"
        ]
      },
      cutting: {
        recommendations: [
          "Rice cake with protein spread",
          "Celery with sugar-free peanut butter",
          "Low-fat Greek yogurt",
          "Apple with protein shake",
          "Rice cakes with tuna",
          "Protein coffee",
          "Cucumber slices with hummus",
          "Sugar-free protein jelly"
        ]
      },
      supplements: [
        "Pre-workout",
        "Beta-alanine",
        "Citrulline malate",
        "Caffeine"
      ]
    },
    {
      time: "7:00 PM",
      icon: <Moon className="w-6 h-6" />,
      title: "Dinner",
      bulking: {
        recommendations: [
          "Steak with baked potato and butter",
          "Ground beef pasta with cheese",
          "Chicken thighs with rice and vegetables",
          "Salmon with sweet potato mash",
          "Pork chops with roasted potatoes",
          "Beef burrito bowl with extra rice",
          "Lamb curry with naan bread",
          "Chicken alfredo pasta"
        ],
        macros: {
          protein: "45g",
          carbs: "65g",
          fats: "30g",
          calories: "710"
        }
      },
      cutting: {
        recommendations: [
          "White fish with asparagus",
          "Turkey breast with cauliflower rice",
          "Chicken breast with zucchini noodles",
          "Shrimp and vegetable stir-fry",
          "Lean beef with broccoli",
          "Cod with roasted vegetables",
          "Turkey meatballs with spaghetti squash",
          "Tofu and vegetable curry"
        ],
        macros: {
          protein: "35g",
          carbs: "15g",
          fats: "10g",
          calories: "290"
        }
      },
      supplements: [
        "Casein protein",
        "ZMA",
        "Magnesium",
        "Fish oil"
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-blue-600 mb-4">Nutrition Guide</h1>
        <p className="text-xl text-blue-400">Optimize your gains with targeted nutrition</p>
      </div>

      <div className="flex justify-center mb-12">
        <div className="bg-blue-50 p-1.5 rounded-xl">
          {[
            { id: 'bulking', icon: <Dumbbell className="w-5 h-5" />, label: 'Bulking' },
            { id: 'cutting', icon: <Scale className="w-5 h-5" />, label: 'Cutting' }
          ].map((tab) => (
            <button
              key={tab.id}
              className={`px-6 py-3 rounded-lg font-medium transition-all inline-flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-md scale-105'
                  : 'text-blue-400 hover:text-blue-600'
              }`}
              onClick={() => setActiveTab(tab.id as 'bulking' | 'cutting')}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {meals.map((meal, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300"
          >
            <button
              className="w-full p-6 flex items-center justify-between hover:bg-blue-50 transition-colors"
              onClick={() => setActiveMeal(activeMeal === index ? null : index)}
            >
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-xl text-blue-600 mr-4">
                  {meal.icon}
                </div>
                <div>
                  <p className="text-blue-400 text-sm">{meal.time}</p>
                  <h3 className="text-xl font-semibold text-blue-600">{meal.title}</h3>
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-blue-400 transition-transform duration-300 ${
                  activeMeal === index ? 'rotate-180' : ''
                }`}
              />
            </button>

            <div
              className={`transition-all duration-300 overflow-hidden ${
                activeMeal === index ? 'max-h-[800px]' : 'max-h-0'
              }`}
            >
              <div className="p-6 pt-0">
                <div className="ml-16">
                  <div className="mb-4">
                    <h4 className="text-blue-500 font-medium mb-2">Recommended Foods:</h4>
                    <ul className="space-y-2">
                      {meal[activeTab].recommendations.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="inline-block w-2 h-2 mt-2 mr-2 bg-blue-400 rounded-full"></span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {meal[activeTab].macros && (
                    <div className="mb-4">
                      <h4 className="text-blue-500 font-medium mb-2">Macros:</h4>
                      <div className="grid grid-cols-4 gap-4">
                        {Object.entries(meal[activeTab].macros!).map(([key, value]) => (
                          <div key={key} className="bg-blue-50 p-3 rounded-lg text-center">
                            <div className="text-blue-600 font-semibold">{value}</div>
                            <div className="text-blue-400 text-sm capitalize">{key}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {meal.supplements && (
                    <div>
                      <h4 className="text-blue-500 font-medium mb-2">Supplements:</h4>
                      <ul className="space-y-2">
                        {meal.supplements.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="inline-block w-2 h-2 mt-2 mr-2 bg-blue-400 rounded-full"></span>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-xl font-bold text-blue-600">
          Consistency is key to achieving your goals! 💪
        </p>
      </div>
    </div>
  );
}