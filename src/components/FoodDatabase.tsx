import React, { useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Star,
  Thermometer,
  Wind,
  Droplets,
  Leaf
} from 'lucide-react';

interface Food {
  id: number;
  name: string;
  category: string;
  rasa: string[];
  virya: 'Hot' | 'Cold';
  vipaka: string;
  doshaEffect: {
    vata: 'Increase' | 'Decrease' | 'Neutral';
    pitta: 'Increase' | 'Decrease' | 'Neutral';
    kapha: 'Increase' | 'Decrease' | 'Neutral';
  };
  nutrients: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  properties: string[];
  season: string[];
  image: string;
  description: string;
}

const FoodDatabase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  const foods: Food[] = [
    {
      id: 1,
      name: 'Basmati Rice',
      category: 'Grains',
      rasa: ['Sweet'],
      virya: 'Cold',
      vipaka: 'Sweet',
      doshaEffect: {
        vata: 'Decrease',
        pitta: 'Decrease',
        kapha: 'Increase'
      },
      nutrients: {
        calories: 205,
        protein: 4.3,
        carbs: 45,
        fat: 0.4,
        fiber: 0.6
      },
      properties: ['Light', 'Soft', 'Easy to digest'],
      season: ['All seasons'],
      image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg',
      description: 'Aromatic long-grain rice, excellent for balancing Vata and Pitta doshas.'
    },
    {
      id: 2,
      name: 'Ginger',
      category: 'Spices',
      rasa: ['Pungent'],
      virya: 'Hot',
      vipaka: 'Sweet',
      doshaEffect: {
        vata: 'Decrease',
        pitta: 'Increase',
        kapha: 'Decrease'
      },
      nutrients: {
        calories: 80,
        protein: 1.8,
        carbs: 18,
        fat: 0.8,
        fiber: 2.0
      },
      properties: ['Stimulating', 'Warming', 'Digestive'],
      season: ['Winter', 'Monsoon'],
      image: 'https://images.pexels.com/photos/161556/ginger-plant-asia-rhizome-161556.jpeg',
      description: 'Universal medicine and digestive aid, particularly beneficial for Vata and Kapha.'
    },
    {
      id: 3,
      name: 'Almonds',
      category: 'Nuts',
      rasa: ['Sweet'],
      virya: 'Hot',
      vipaka: 'Sweet',
      doshaEffect: {
        vata: 'Decrease',
        pitta: 'Increase',
        kapha: 'Increase'
      },
      nutrients: {
        calories: 579,
        protein: 21.2,
        carbs: 22,
        fat: 50,
        fiber: 12.5
      },
      properties: ['Nourishing', 'Strengthening', 'Brain tonic'],
      season: ['Winter'],
      image: 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg',
      description: 'Highly nutritious nuts that nourish the brain and nervous system.'
    },
    {
      id: 4,
      name: 'Cucumber',
      category: 'Vegetables',
      rasa: ['Sweet', 'Astringent'],
      virya: 'Cold',
      vipaka: 'Sweet',
      doshaEffect: {
        vata: 'Increase',
        pitta: 'Decrease',
        kapha: 'Neutral'
      },
      nutrients: {
        calories: 16,
        protein: 0.7,
        carbs: 4,
        fat: 0.1,
        fiber: 0.5
      },
      properties: ['Cooling', 'Hydrating', 'Diuretic'],
      season: ['Summer'],
      image: 'https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg',
      description: 'Cooling vegetable perfect for hot weather and Pitta pacification.'
    },
    {
      id: 5,
      name: 'Turmeric',
      category: 'Spices',
      rasa: ['Bitter', 'Pungent'],
      virya: 'Hot',
      vipaka: 'Pungent',
      doshaEffect: {
        vata: 'Neutral',
        pitta: 'Decrease',
        kapha: 'Decrease'
      },
      nutrients: {
        calories: 354,
        protein: 7.8,
        carbs: 65,
        fat: 10,
        fiber: 21
      },
      properties: ['Anti-inflammatory', 'Purifying', 'Healing'],
      season: ['All seasons'],
      image: 'https://images.pexels.com/photos/1340116/pexels-photo-1340116.jpeg',
      description: 'Golden spice with powerful healing and anti-inflammatory properties.'
    },
    {
      id: 6,
      name: 'Mango',
      category: 'Fruits',
      rasa: ['Sweet'],
      virya: 'Hot',
      vipaka: 'Sweet',
      doshaEffect: {
        vata: 'Decrease',
        pitta: 'Increase',
        kapha: 'Increase'
      },
      nutrients: {
        calories: 60,
        protein: 0.8,
        carbs: 15,
        fat: 0.4,
        fiber: 1.6
      },
      properties: ['Nourishing', 'Strengthening', 'Aphrodisiac'],
      season: ['Summer'],
      image: 'src/components/mango.jpg',
      description: 'King of fruits, highly nourishing but should be consumed in moderation by Pitta types.'
    }
  ];

  const categories = ['All', 'Grains', 'Vegetables', 'Fruits', 'Spices', 'Nuts', 'Legumes', 'Dairy'];

  const filteredFoods = foods.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         food.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         food.rasa.some(r => r.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDoshaIcon = (dosha: string) => {
    switch (dosha) {
      case 'vata': return <Wind className="w-4 h-4" />;
      case 'pitta': return <Thermometer className="w-4 h-4" />;
      case 'kapha': return <Droplets className="w-4 h-4" />;
      default: return null;
    }
  };

  const getDoshaColor = (effect: string) => {
    switch (effect) {
      case 'Increase': return 'text-red-600';
      case 'Decrease': return 'text-green-600';
      case 'Neutral': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getRasaColor = (rasa: string) => {
    const colors: { [key: string]: string } = {
      'Sweet': 'bg-yellow-100 text-yellow-800',
      'Sour': 'bg-orange-100 text-orange-800',
      'Salty': 'bg-gray-100 text-gray-800',
      'Pungent': 'bg-red-100 text-red-800',
      'Bitter': 'bg-green-100 text-green-800',
      'Astringent': 'bg-purple-100 text-purple-800'
    };
    return colors[rasa] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Food Database</h2>
          <p className="text-gray-600 mt-1">Comprehensive Ayurvedic food properties and nutritional data</p>
        </div>
        <button className="mt-4 sm:mt-0 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add New Food</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search foods by name, category, or taste..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFoods.map((food) => (
          <div key={food.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-w-16 aspect-h-9">
              <img 
                src={food.image} 
                alt={food.name}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{food.name}</h3>
                <span className="text-sm text-gray-500">{food.category}</span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{food.description}</p>
              
              {/* Rasa Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {food.rasa.map((rasa, index) => (
                  <span key={index} className={`px-2 py-1 text-xs rounded-full ${getRasaColor(rasa)}`}>
                    {rasa}
                  </span>
                ))}
              </div>
              
              {/* Dosha Effects */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {Object.entries(food.doshaEffect).map(([dosha, effect]) => (
                  <div key={dosha} className="flex items-center space-x-1">
                    {getDoshaIcon(dosha)}
                    <span className="text-xs capitalize">{dosha}</span>
                    <span className={`text-xs font-medium ${getDoshaColor(effect)}`}>
                      {effect === 'Increase' ? '↑' : effect === 'Decrease' ? '↓' : '○'}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Virya */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">Virya:</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    food.virya === 'Hot' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {food.virya}
                  </span>
                </div>
                <button 
                  onClick={() => setSelectedFood(food)}
                  className="text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors"
                >
                  View Details
                </button>
              </div>
              
              {/* Nutrition Quick View */}
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>Calories: {food.nutrients.calories}</div>
                  <div>Protein: {food.nutrients.protein}g</div>
                  <div>Carbs: {food.nutrients.carbs}g</div>
                  <div>Fat: {food.nutrients.fat}g</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Food Details Modal */}
      {selectedFood && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">{selectedFood.name}</h3>
                <button 
                  onClick={() => setSelectedFood(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <img 
                      src={selectedFood.image} 
                      alt={selectedFood.name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-600">{selectedFood.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Ayurvedic Properties</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-700">Rasa (Taste):</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedFood.rasa.map((rasa, index) => (
                            <span key={index} className={`px-2 py-1 text-xs rounded-full ${getRasaColor(rasa)}`}>
                              {rasa}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Virya (Energy):</span>
                        <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                          selectedFood.virya === 'Hot' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {selectedFood.virya}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Vipaka (Post-digestive effect):</span>
                        <span className="ml-2 text-sm text-gray-600">{selectedFood.vipaka}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Dosha Effects</h4>
                    <div className="space-y-2">
                      {Object.entries(selectedFood.doshaEffect).map(([dosha, effect]) => (
                        <div key={dosha} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            {getDoshaIcon(dosha)}
                            <span className="capitalize font-medium">{dosha}</span>
                          </div>
                          <span className={`font-medium ${getDoshaColor(effect)}`}>
                            {effect}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Nutritional Information (per 100g)</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Calories:</span>
                          <span className="font-medium">{selectedFood.nutrients.calories}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Protein:</span>
                          <span className="font-medium">{selectedFood.nutrients.protein}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Carbohydrates:</span>
                          <span className="font-medium">{selectedFood.nutrients.carbs}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Fat:</span>
                          <span className="font-medium">{selectedFood.nutrients.fat}g</span>
                        </div>
                        <div className="flex justify-between col-span-2">
                          <span className="text-sm text-gray-600">Fiber:</span>
                          <span className="font-medium">{selectedFood.nutrients.fiber}g</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Properties</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedFood.properties.map((property, index) => (
                        <span key={index} className="px-2 py-1 text-xs bg-emerald-100 text-emerald-800 rounded-full">
                          {property}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Best Seasons</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedFood.season.map((season, index) => (
                        <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                          {season}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex space-x-3">
                <button className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2">
                  <Edit className="w-4 h-4" />
                  <span>Edit Food Item</span>
                </button>
                <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add to Diet Chart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Database Statistics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-emerald-50 rounded-lg">
            <div className="text-2xl font-bold text-emerald-600">{foods.length.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Foods</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{categories.length - 1}</div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
          <div className="text-center p-4 bg-amber-50 rounded-lg">
            <div className="text-2xl font-bold text-amber-600">6</div>
            <div className="text-sm text-gray-600">Taste Profiles</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">100%</div>
            <div className="text-sm text-gray-600">Ayurvedic Analysis</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDatabase;