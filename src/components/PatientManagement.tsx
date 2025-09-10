import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Eye,
  Calendar,
  Phone,
  Mail,
  MapPin,
  User,
  Activity
} from 'lucide-react';

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  constitution: string;
  phone: string;
  email: string;
  address: string;
  lastVisit: string;
  nextAppointment: string;
  status: 'Active' | 'Inactive' | 'Follow-up';
  conditions: string[];
  progress: number;
}

const PatientManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showAddPatient, setShowAddPatient] = useState(false);

  const patients: Patient[] = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      age: 45,
      gender: 'Male',
      constitution: 'Vata-Pitta',
      phone: '+91 9876543210',
      email: 'rajesh@email.com',
      address: 'Mumbai, Maharashtra',
      lastVisit: '2025-01-08',
      nextAppointment: '2025-01-15',
      status: 'Active',
      conditions: ['Diabetes', 'Hypertension'],
      progress: 78
    },
    {
      id: 2,
      name: 'Anita Singh',
      age: 32,
      gender: 'Female',
      constitution: 'Kapha-Vata',
      phone: '+91 9876543211',
      email: 'anita@email.com',
      address: 'Delhi, Delhi',
      lastVisit: '2025-01-07',
      nextAppointment: '2025-01-14',
      status: 'Follow-up',
      conditions: ['PCOD', 'Obesity'],
      progress: 92
    },
    {
      id: 3,
      name: 'Vikram Patel',
      age: 28,
      gender: 'Male',
      constitution: 'Pitta',
      phone: '+91 9876543212',
      email: 'vikram@email.com',
      address: 'Bangalore, Karnataka',
      lastVisit: '2025-01-06',
      nextAppointment: '2025-01-13',
      status: 'Active',
      conditions: ['Acidity', 'Stress'],
      progress: 65
    },
    {
      id: 4,
      name: 'Meera Sharma',
      age: 56,
      gender: 'Female',
      constitution: 'Vata',
      phone: '+91 9876543213',
      email: 'meera@email.com',
      address: 'Pune, Maharashtra',
      lastVisit: '2025-01-05',
      nextAppointment: '2025-01-12',
      status: 'Active',
      conditions: ['Arthritis', 'Insomnia'],
      progress: 95
    }
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.constitution.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.conditions.some(condition => 
      condition.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Follow-up': return 'bg-amber-100 text-amber-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const constitutionColors: { [key: string]: string } = {
    'Vata': 'bg-purple-100 text-purple-800',
    'Pitta': 'bg-red-100 text-red-800',
    'Kapha': 'bg-blue-100 text-blue-800',
    'Vata-Pitta': 'bg-gradient-to-r from-purple-100 to-red-100 text-purple-800',
    'Kapha-Vata': 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800',
    'Pitta-Kapha': 'bg-gradient-to-r from-red-100 to-blue-100 text-red-800'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Patient Management</h2>
          <p className="text-gray-600 mt-1">Manage your patients and their Ayurvedic profiles</p>
        </div>
        <button 
          onClick={() => setShowAddPatient(true)}
          className="mt-4 sm:mt-0 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Patient</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search patients by name, constitution, or condition..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Patient List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Patients ({filteredPatients.length})
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredPatients.map((patient) => (
            <div key={patient.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{patient.name}</h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-600">{patient.age} years, {patient.gender}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${constitutionColors[patient.constitution] || 'bg-gray-100 text-gray-800'}`}>
                        {patient.constitution}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(patient.status)}`}>
                        {patient.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right hidden md:block">
                    <div className="text-sm text-gray-600">Progress</div>
                    <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-emerald-600 h-2 rounded-full transition-all"
                        style={{ width: `${patient.progress}%` }}
                      />
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedPatient(patient)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{patient.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{patient.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Next: {patient.nextAppointment}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4" />
                  <span>{patient.conditions.join(', ')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Patient Details Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Patient Details</h3>
                <button 
                  onClick={() => setSelectedPatient(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-xl font-medium text-gray-900">{selectedPatient.name}</h4>
                  <p className="text-gray-600">{selectedPatient.age} years, {selectedPatient.gender}</p>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${constitutionColors[selectedPatient.constitution]}`}>
                    {selectedPatient.constitution}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-900 mb-3">Contact Information</h5>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{selectedPatient.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{selectedPatient.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{selectedPatient.address}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium text-gray-900 mb-3">Medical Information</h5>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Conditions:</span>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {selectedPatient.conditions.map((condition, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                            {condition}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Last Visit:</span> {selectedPatient.lastVisit}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Next Appointment:</span> {selectedPatient.nextAppointment}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-900 mb-3">Treatment Progress</h5>
                <div className="bg-gray-100 rounded-full h-4">
                  <div 
                    className="bg-emerald-600 h-4 rounded-full transition-all"
                    style={{ width: `${selectedPatient.progress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-1">{selectedPatient.progress}% progress</p>
              </div>
              
              <div className="flex space-x-3">
                <button className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2">
                  <Edit className="w-4 h-4" />
                  <span>Edit Patient</span>
                </button>
                <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Visit</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Patient Modal */}
      {showAddPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Add New Patient</h3>
                <button 
                  onClick={() => setShowAddPatient(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Constitution (Prakriti)</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                      <option>Vata</option>
                      <option>Pitta</option>
                      <option>Kapha</option>
                      <option>Vata-Pitta</option>
                      <option>Kapha-Vata</option>
                      <option>Pitta-Kapha</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" rows={3}></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Medical Conditions</label>
                  <input type="text" placeholder="Comma-separated conditions" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                </div>
                
                <div className="flex space-x-3">
                  <button 
                    type="button"
                    onClick={() => setShowAddPatient(false)}
                    className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Add Patient
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientManagement;