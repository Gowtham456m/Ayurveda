import React, { useState } from 'react';
import {
  User,
  Calendar,
  Clock,
  Target,
  Download,
  Save,
  RefreshCw,
  Plus,
  Minus,
  Eye,
  Edit
} from 'lucide-react';

interface MealItem {
  id: number;
  name: string;
  quantity: string;
  calories: number;
  time: string;
  doshaEffect: string;
}

interface DietChart {
  id: number;
  patientName: string;
  constitution: string;
  duration: string;
  objective: string;
  createdDate: string;
  meals: {
    [key: string]: MealItem[];
  };
}

const DietChartGenerator: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState('');
  const [chartDuration, setChartDuration] = useState('7');
  const [objective, setObjective] = useState('');
  const [generatedChart, setGeneratedChart] = useState<DietChart | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const patients = [
    { id: 1, name: 'Rajesh Kumar', constitution: 'Vata-Pitta' },
    { id: 2, name: 'Anita Singh', constitution: 'Kapha-Vata' },
    { id: 3, name: 'Vikram Patel', constitution: 'Pitta' },
    { id: 4, name: 'Meera Sharma', constitution: 'Vata' }
  ];

  const objectives = [
    'Weight Management',
    'Digestive Health',
    'Energy Enhancement',
    'Stress Management',
    'Immunity Boost',
    'Detoxification',
    'Hormonal Balance',
    'Joint Health'
  ];

  const mealTimes = ['Early Morning', 'Breakfast', 'Mid-Morning', 'Lunch', 'Evening', 'Dinner', 'Before Sleep'];

  const sampleMeals: { [key: string]: MealItem[] } = {
    'Early Morning': [
      {
        id: 1,
        name: 'Warm Water with Lemon & Honey',
        quantity: '1 glass',
        calories: 25,
        time: '6:00 AM',
        doshaEffect: 'Balances all doshas'
      }
    ],
    'Breakfast': [
      {
        id: 2,
        name: 'Oats Porridge with Almonds',
        quantity: '1 bowl',
        calories: 320,
        time: '8:00 AM',
        doshaEffect: 'Reduces Vata'
      },
      {
        id: 3,
        name: 'Fresh Fruit (Seasonal)',
        quantity: '1 medium',
        calories: 80,
        time: '8:00 AM',
        doshaEffect: 'Balances Pitta'
      }
    ],
    'Mid-Morning': [
      {
        id: 4,
        name: 'Coconut Water',
        quantity: '1 glass',
        calories: 45,
        time: '10:30 AM',
        doshaEffect: 'Cools Pitta'
      }
    ],
    'Lunch': [
      {
        id: 5,
        name: 'Brown Rice',
        quantity: '1 cup',
        calories: 220,
        time: '12:30 PM',
        doshaEffect: 'Neutral for all doshas'
      },
      {
        id: 6,
        name: 'Dal (Lentils)',
        quantity: '1 cup',
        calories: 180,
        time: '12:30 PM',
        doshaEffect: 'Reduces Vata'
      },
      {
        id: 7,
        name: 'Mixed Vegetables',
        quantity: '1 cup',
        calories: 100,
        time: '12:30 PM',
        doshaEffect: 'Balances all doshas'
      },
      {
        id: 8,
        name: 'Buttermilk',
        quantity: '1 glass',
        calories: 60,
        time: '12:30 PM',
        doshaEffect: 'Enhances digestion'
      }
    ],
    'Evening': [
      {
        id: 9,
        name: 'Herbal Tea (Ginger-Cardamom)',
        quantity: '1 cup',
        calories: 15,
        time: '5:00 PM',
        doshaEffect: 'Stimulates Agni'
      },
      {
        id: 10,
        name: 'Nuts & Dates',
        quantity: '4-5 pieces',
        calories: 150,
        time: '5:00 PM',
        doshaEffect: 'Nourishes Vata'
      }
    ],
    'Dinner': [
      {
        id: 11,
        name: 'Vegetable Soup',
        quantity: '1 bowl',
        calories: 120,
        time: '7:30 PM',
        doshaEffect: 'Light & easy to digest'
      },
      {
        id: 12,
        name: 'Chapati (Whole Wheat)',
        quantity: '2 pieces',
        calories: 160,
        time: '7:30 PM',
        doshaEffect: 'Grounding for Vata'
      },
      {
        id: 13,
        name: 'Steamed Vegetables',
        quantity: '1 cup',
        calories: 80,
        time: '7:30 PM',
        doshaEffect: 'Balances Kapha'
      }
    ],
    'Before Sleep': [
      {
        id: 14,
        name: 'Warm Milk with Turmeric',
        quantity: '1 glass',
        calories: 150,
        time: '9:30 PM',
        doshaEffect: 'Promotes restful sleep'
      }
    ]
  };

  const generateDietChart = () => {
    if (!selectedPatient || !objective) {
      alert('Please select a patient and objective');
      return;
    }

    const patient = patients.find(p => p.name === selectedPatient);
    if (!patient) return;

    const newChart: DietChart = {
      id: Date.now(),
      patientName: patient.name,
      constitution: patient.constitution,
      duration: chartDuration,
      objective,
      createdDate: new Date().toLocaleDateString(),
      meals: sampleMeals
    };

    setGeneratedChart(newChart);
    setShowPreview(true);
  };

  const calculateTotalCalories = () => {
    if (!generatedChart) return 0;
    return Object.values(generatedChart.meals).flat().reduce((total, meal) => total + meal.calories, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Diet Chart Generator</h2>
          <p className="text-gray-600 mt-1">Create personalized Ayurvedic diet plans for your patients</p>
        </div>
      </div>

      {/* Chart Generation Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate New Diet Chart</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Patient</label>
            <select 
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="">Choose Patient</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.name}>
                  {patient.name} ({patient.constitution})
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Duration (Days)</label>
            <select 
              value={chartDuration}
              onChange={(e) => setChartDuration(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="7">7 Days</option>
              <option value="14">14 Days</option>
              <option value="21">21 Days</option>
              <option value="30">30 Days</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Treatment Objective</label>
            <select 
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="">Select Objective</option>
              {objectives.map((obj) => (
                <option key={obj} value={obj}>{obj}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-end">
            <button 
              onClick={generateDietChart}
              className="w-full bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Generate</span>
            </button>
          </div>
        </div>
      </div>

      {/* Generated Chart Preview */}
      {showPreview && generatedChart && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Chart Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Diet Chart Preview</h3>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{generatedChart.patientName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4" />
                    <span>{generatedChart.constitution}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{generatedChart.duration} days</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{calculateTotalCalories()} calories/day</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2 mt-4 sm:mt-0">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>

          {/* Meal Schedule */}
          <div className="p-6">
            <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <h4 className="font-medium text-emerald-900 mb-1">Treatment Objective</h4>
              <p className="text-emerald-700">{generatedChart.objective}</p>
            </div>

            <div className="space-y-6">
              {mealTimes.map((mealTime) => (
                generatedChart.meals[mealTime] && (
                  <div key={mealTime} className="border border-gray-200 rounded-lg">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <h4 className="font-medium text-gray-900">{mealTime}</h4>
                      <p className="text-sm text-gray-600">
                        {generatedChart.meals[mealTime].reduce((total, meal) => total + meal.calories, 0)} calories
                      </p>
                    </div>
                    <div className="p-4">
                      <div className="space-y-3">
                        {generatedChart.meals[mealTime].map((meal) => (
                          <div key={meal.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                              <h5 className="font-medium text-gray-900">{meal.name}</h5>
                              <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                                <span>Qty: {meal.quantity}</span>
                                <span>Time: {meal.time}</span>
                                <span className="text-emerald-600">Calories: {meal.calories}</span>
                              </div>
                              <p className="text-xs text-blue-600 mt-1">{meal.doshaEffect}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-red-400 hover:text-red-600 transition-colors">
                                <Minus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                        <button className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-emerald-300 hover:text-emerald-600 transition-colors flex items-center justify-center space-x-2">
                          <Plus className="w-4 h-4" />
                          <span>Add Item</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>

            {/* Nutrition Summary */}
            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Daily Nutrition Summary</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-3 rounded-lg text-center">
                  <div className="text-lg font-bold text-emerald-600">{calculateTotalCalories()}</div>
                  <div className="text-sm text-gray-600">Total Calories</div>
                </div>
                <div className="bg-white p-3 rounded-lg text-center">
                  <div className="text-lg font-bold text-blue-600">85g</div>
                  <div className="text-sm text-gray-600">Protein</div>
                </div>
                <div className="bg-white p-3 rounded-lg text-center">
                  <div className="text-lg font-bold text-amber-600">320g</div>
                  <div className="text-sm text-gray-600">Carbs</div>
                </div>
                <div className="bg-white p-3 rounded-lg text-center">
                  <div className="text-lg font-bold text-purple-600">45g</div>
                  <div className="text-sm text-gray-600">Fats</div>
                </div>
              </div>
            </div>

            {/* Ayurvedic Guidelines */}
            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="font-medium text-amber-900 mb-2">Ayurvedic Guidelines for {generatedChart.constitution}</h4>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>• Eat meals at regular times to maintain digestive fire (Agni)</li>
                <li>• Consume the largest meal during midday when digestion is strongest</li>
                <li>• Avoid cold drinks during meals; prefer room temperature or warm water</li>
                <li>• Chew food thoroughly and eat in a calm, peaceful environment</li>
                <li>• Include all six tastes (sweet, sour, salty, pungent, bitter, astringent) daily</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Recent Charts */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Diet Charts</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { id: 1, patient: 'Rajesh Kumar', date: '2025-01-07', objective: 'Weight Management', status: 'Active' },
              { id: 2, patient: 'Anita Singh', date: '2025-01-05', objective: 'PCOD Management', status: 'Completed' },
              { id: 3, patient: 'Vikram Patel', date: '2025-01-03', objective: 'Digestive Health', status: 'Active' }
            ].map((chart) => (
              <div key={chart.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div>
                  <h4 className="font-medium text-gray-900">{chart.patient}</h4>
                  <p className="text-sm text-gray-600">Objective: {chart.objective}</p>
                  <p className="text-xs text-gray-500">Created: {chart.date}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    chart.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {chart.status}
                  </span>
                  <button className="text-emerald-600 hover:text-emerald-700 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietChartGenerator;