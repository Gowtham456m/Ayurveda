import React, { useState } from 'react';
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Target,
  Calendar,
  Download,
  Filter,
  Plus,
  Activity,
  Wind,
  Thermometer,
  Droplets
} from 'lucide-react';

interface NutrientData {
  name: string;
  amount: number;
  unit: string;
  rda: number;
  percentage: number;
  doshaEffect: {
    vata: string;
    pitta: string;
    kapha: string;
  };
}

interface AnalysisResult {
  patientName: string;
  analysisDate: string;
  totalCalories: number;
  nutrients: NutrientData[];
  macroDistribution: {
    protein: number;
    carbs: number;
    fats: number;
  };
  doshaBalance: {
    vata: number;
    pitta: number;
    kapha: number;
  };
  ayurvedicScore: number;
  recommendations: string[];
}

const NutrientAnalysis: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState('');
  const [analysisType, setAnalysisType] = useState('daily');
  const [showAnalysis, setShowAnalysis] = useState(false);

  const patients = [
    'Rajesh Kumar',
    'Anita Singh', 
    'Vikram Patel',
    'Meera Sharma'
  ];

  const sampleAnalysis: AnalysisResult = {
    patientName: 'Rajesh Kumar',
    analysisDate: '2025-01-08',
    totalCalories: 1850,
    nutrients: [
      {
        name: 'Protein',
        amount: 85,
        unit: 'g',
        rda: 75,
        percentage: 113,
        doshaEffect: { vata: 'Stabilizing', pitta: 'Neutral', kapha: 'Reducing' }
      },
      {
        name: 'Carbohydrates',
        amount: 245,
        unit: 'g',
        rda: 250,
        percentage: 98,
        doshaEffect: { vata: 'Nourishing', pitta: 'Cooling', kapha: 'Increasing' }
      },
      {
        name: 'Total Fat',
        amount: 62,
        unit: 'g',
        rda: 65,
        percentage: 95,
        doshaEffect: { vata: 'Lubricating', pitta: 'Moderate', kapha: 'Increasing' }
      },
      {
        name: 'Fiber',
        amount: 28,
        unit: 'g',
        rda: 30,
        percentage: 93,
        doshaEffect: { vata: 'Regulating', pitta: 'Cleansing', kapha: 'Reducing' }
      },
      {
        name: 'Vitamin C',
        amount: 78,
        unit: 'mg',
        rda: 90,
        percentage: 87,
        doshaEffect: { vata: 'Antioxidant', pitta: 'Cooling', kapha: 'Stimulating' }
      },
      {
        name: 'Iron',
        amount: 14,
        unit: 'mg',
        rda: 18,
        percentage: 78,
        doshaEffect: { vata: 'Energizing', pitta: 'Heating', kapha: 'Activating' }
      },
      {
        name: 'Calcium',
        amount: 920,
        unit: 'mg',
        rda: 1000,
        percentage: 92,
        doshaEffect: { vata: 'Grounding', pitta: 'Cooling', kapha: 'Strengthening' }
      }
    ],
    macroDistribution: {
      protein: 18,
      carbs: 53,
      fats: 29
    },
    doshaBalance: {
      vata: 35,
      pitta: 28,
      kapha: 37
    },
    ayurvedicScore: 82,
    recommendations: [
      'Increase iron-rich foods like spinach and lentils',
      'Add more citrus fruits for Vitamin C absorption',
      'Consider reducing Kapha-increasing foods in the evening',
      'Include warming spices to balance Vata constitution',
      'Maintain current protein intake for optimal muscle health'
    ]
  };

  const generateAnalysis = () => {
    if (!selectedPatient) {
      alert('Please select a patient');
      return;
    }
    setShowAnalysis(true);
  };

  const getDoshaIcon = (dosha: string) => {
    switch (dosha) {
      case 'vata': return <Wind className="w-4 h-4" />;
      case 'pitta': return <Thermometer className="w-4 h-4" />;
      case 'kapha': return <Droplets className="w-4 h-4" />;
      default: return null;
    }
  };

  const getDoshaColor = (dosha: string) => {
    switch (dosha) {
      case 'vata': return 'text-purple-600';
      case 'pitta': return 'text-red-600';
      case 'kapha': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getNutrientStatus = (percentage: number) => {
    if (percentage >= 100) return { color: 'bg-green-500', status: 'Optimal' };
    if (percentage >= 80) return { color: 'bg-amber-500', status: 'Good' };
    return { color: 'bg-red-500', status: 'Low' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Nutrient Analysis</h2>
          <p className="text-gray-600 mt-1">Comprehensive nutritional assessment with Ayurvedic insights</p>
        </div>
      </div>

      {/* Analysis Generator */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate Nutrient Analysis</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Patient</label>
            <select 
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="">Choose Patient</option>
              {patients.map((patient) => (
                <option key={patient} value={patient}>{patient}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Analysis Period</label>
            <select 
              value={analysisType}
              onChange={(e) => setAnalysisType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="daily">Daily Analysis</option>
              <option value="weekly">Weekly Average</option>
              <option value="monthly">Monthly Summary</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button 
              onClick={generateAnalysis}
              className="w-full bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Analyze</span>
            </button>
          </div>
        </div>
      </div>

      {/* Analysis Results */}
      {showAnalysis && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="text-emerald-600">
                  <Activity className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{sampleAnalysis.totalCalories}</div>
                  <div className="text-sm text-gray-600">Total Calories</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="text-blue-600">
                  <Target className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getScoreColor(sampleAnalysis.ayurvedicScore)}`}>
                    {sampleAnalysis.ayurvedicScore}%
                  </div>
                  <div className="text-sm text-gray-600">Ayurvedic Score</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="text-amber-600">
                  <PieChart className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {sampleAnalysis.macroDistribution.protein}%
                  </div>
                  <div className="text-sm text-gray-600">Protein Ratio</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="text-purple-600">
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">Daily</div>
                  <div className="text-sm text-gray-600">Analysis Type</div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Nutrient Breakdown */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Nutrient Breakdown</h3>
                  <button className="text-emerald-600 hover:text-emerald-700 transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {sampleAnalysis.nutrients.map((nutrient, index) => {
                    const status = getNutrientStatus(nutrient.percentage);
                    return (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{nutrient.name}</h4>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              status.color === 'bg-green-500' ? 'bg-green-100 text-green-800' :
                              status.color === 'bg-amber-500' ? 'bg-amber-100 text-amber-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {status.status}
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              {nutrient.percentage}%
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                          <span>{nutrient.amount} {nutrient.unit} / {nutrient.rda} {nutrient.unit} RDA</span>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                          <div 
                            className={`h-2 rounded-full ${status.color}`}
                            style={{ width: `${Math.min(nutrient.percentage, 100)}%` }}
                          />
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          {Object.entries(nutrient.doshaEffect).map(([dosha, effect]) => (
                            <div key={dosha} className="flex items-center space-x-1">
                              <div className={getDoshaColor(dosha)}>
                                {getDoshaIcon(dosha)}
                              </div>
                              <span className="capitalize text-gray-600">{dosha}:</span>
                              <span className="font-medium">{effect}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Dosha Balance & Recommendations */}
            <div className="space-y-6">
              {/* Dosha Balance */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Dosha Balance</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {Object.entries(sampleAnalysis.doshaBalance).map(([dosha, percentage]) => (
                      <div key={dosha}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center space-x-2">
                            <div className={getDoshaColor(dosha)}>
                              {getDoshaIcon(dosha)}
                            </div>
                            <span className="capitalize font-medium">{dosha}</span>
                          </div>
                          <span className="text-sm font-medium">{percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              dosha === 'vata' ? 'bg-purple-500' :
                              dosha === 'pitta' ? 'bg-red-500' : 'bg-blue-500'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Macro Distribution */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Macro Distribution</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Protein</span>
                      <span className="font-medium">{sampleAnalysis.macroDistribution.protein}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${sampleAnalysis.macroDistribution.protein}%` }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Carbohydrates</span>
                      <span className="font-medium">{sampleAnalysis.macroDistribution.carbs}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${sampleAnalysis.macroDistribution.carbs}%` }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Fats</span>
                      <span className="font-medium">{sampleAnalysis.macroDistribution.fats}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-amber-500 h-2 rounded-full"
                        style={{ width: `${sampleAnalysis.macroDistribution.fats}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Ayurvedic Recommendations</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sampleAnalysis.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-emerald-800">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Analysis History */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent Analysis</h3>
                <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors">
                  View All
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { date: '2025-01-07', patient: 'Rajesh Kumar', score: 78, calories: 1920 },
                  { date: '2025-01-06', patient: 'Anita Singh', score: 85, calories: 1650 },
                  { date: '2025-01-05', patient: 'Vikram Patel', score: 72, calories: 2100 }
                ].map((analysis, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{analysis.patient}</h4>
                      <p className="text-sm text-gray-600">{analysis.date}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${getScoreColor(analysis.score)}`}>
                        Score: {analysis.score}%
                      </div>
                      <div className="text-xs text-gray-500">{analysis.calories} cal</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NutrientAnalysis;