import React from 'react';
import {
  Users,
  FileText,
  TrendingUp,
  Calendar,
  Activity,
  Plus,
  ArrowUp,
  ArrowDown,
  Clock
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Patients',
      value: '1,247',
      change: '+12%',
      isPositive: true,
      icon: <Users className="w-6 h-6" />
    },
    {
      title: 'Diet Charts Created',
      value: '3,456',
      change: '+8%',
      isPositive: true,
      icon: <FileText className="w-6 h-6" />
    },
    {
      title: 'Consultations This Month',
      value: '89',
      change: '+15%',
      isPositive: true,
      icon: <Calendar className="w-6 h-6" />
    },
    {
      title: 'Avg. Patient Progress',
      value: '87%',
      change: '+5%',
      isPositive: true,
      icon: <TrendingUp className="w-6 h-6" />
    }
  ];

  const recentPatients = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      constitution: 'Vata-Pitta',
      lastVisit: '2025-01-08',
      status: 'Active',
      progress: 78
    },
    {
      id: 2,
      name: 'Anita Singh',
      constitution: 'Kapha-Vata',
      lastVisit: '2025-01-07',
      status: 'Follow-up',
      progress: 92
    },
    {
      id: 3,
      name: 'Vikram Patel',
      constitution: 'Pitta',
      lastVisit: '2025-01-06',
      status: 'Active',
      progress: 65
    },
    {
      id: 4,
      name: 'Meera Sharma',
      constitution: 'Vata',
      lastVisit: '2025-01-05',
      status: 'Completed',
      progress: 95
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      patient: 'Arjun Reddy',
      time: '10:00 AM',
      type: 'Follow-up Consultation'
    },
    {
      id: 2,
      patient: 'Kavya Nair',
      time: '11:30 AM',
      type: 'Initial Assessment'
    },
    {
      id: 3,
      patient: 'Ravi Gupta',
      time: '2:00 PM',
      type: 'Diet Review'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600 mt-1">Welcome back, Dr. Priya Sharma</p>
        </div>
        <button className="mt-4 sm:mt-0 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Consultation</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="text-emerald-600">{stat.icon}</div>
              <div className={`flex items-center text-sm ${
                stat.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                <span className="ml-1">{stat.change}</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-600 text-sm mt-1">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Patients */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Patients</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentPatients.map((patient) => (
                <div key={patient.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{patient.name}</h4>
                    <p className="text-sm text-gray-600">Constitution: {patient.constitution}</p>
                    <p className="text-xs text-gray-500">Last visit: {patient.lastVisit}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      patient.status === 'Active' ? 'bg-green-100 text-green-800' :
                      patient.status === 'Follow-up' ? 'bg-amber-100 text-amber-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {patient.status}
                    </span>
                    <div className="mt-2">
                      <div className="text-xs text-gray-500">Progress</div>
                      <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-emerald-600 h-2 rounded-full transition-all"
                          style={{ width: `${patient.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
              <Clock className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center space-x-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{appointment.patient}</h4>
                    <p className="text-sm text-gray-600">{appointment.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-emerald-700">{appointment.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors">
              View full schedule →
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg hover:from-emerald-100 hover:to-emerald-200 transition-colors group">
            <Users className="w-8 h-8 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-medium text-gray-900">Add New Patient</h4>
            <p className="text-sm text-gray-600">Register a new patient profile</p>
          </button>
          <button className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg hover:from-amber-100 hover:to-amber-200 transition-colors group">
            <FileText className="w-8 h-8 text-amber-600 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-medium text-gray-900">Create Diet Chart</h4>
            <p className="text-sm text-gray-600">Generate personalized diet plan</p>
          </button>
          <button className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-colors group">
            <Activity className="w-8 h-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-medium text-gray-900">Nutrient Analysis</h4>
            <p className="text-sm text-gray-600">Analyze nutritional content</p>
          </button>
          <button className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg hover:from-purple-100 hover:to-purple-200 transition-colors group">
            <Calendar className="w-8 h-8 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-medium text-gray-900">Schedule Follow-up</h4>
            <p className="text-sm text-gray-600">Book next consultation</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;