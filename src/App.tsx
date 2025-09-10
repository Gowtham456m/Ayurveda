import React, { useState } from 'react';
import { 
  Users, 
  Database, 
  FileText, 
  BarChart3, 
  Settings, 
  Home,
  Search,
  Bell,
  User,
  Menu,
  X,
  Plus,
  TrendingUp,
  Calendar,
  Leaf,
  Activity
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import PatientManagement from './components/PatientManagement';
import FoodDatabase from './components/FoodDatabase';
import DietChartGenerator from './components/DietChartGenerator';
import NutrientAnalysis from './components/NutrientAnalysis';
import SettingsPanel from './components/SettingsPanel';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5" />, component: <Dashboard /> },
    { id: 'patients', label: 'Patient Management', icon: <Users className="w-5 h-5" />, component: <PatientManagement /> },
    { id: 'database', label: 'Food Database', icon: <Database className="w-5 h-5" />, component: <FoodDatabase /> },
    { id: 'dietchart', label: 'Diet Chart Generator', icon: <FileText className="w-5 h-5" />, component: <DietChartGenerator /> },
    { id: 'analysis', label: 'Nutrient Analysis', icon: <BarChart3 className="w-5 h-5" />, component: <NutrientAnalysis /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" />, component: <SettingsPanel /> },
  ];

  const activeMenuItem = menuItems.find(item => item.id === activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="flex items-center space-x-2">
              <Leaf className="w-8 h-8 text-emerald-600" />
              <h1 className="text-xl font-bold text-gray-900">AyurvedaCloud</h1>
            </div>
          </div>
          
          <div className="flex-1 max-w-md mx-8 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search patients, foods, or charts..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700">Dr. Priya Sharma</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 pt-16 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:inset-0`}>
          <nav className="px-4 py-6">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-emerald-50 text-emerald-700 border-r-2 border-emerald-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-0">
          <div className="p-6">
            {activeMenuItem?.component}
          </div>
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;