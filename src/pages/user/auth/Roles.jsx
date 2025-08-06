import { useState } from 'react';
import { User, Building } from 'lucide-react';

const Roles = () => {
  const [selectedRole, setSelectedRole] = useState('');

  const roles = [
    {
      id: 'job-seeker',
      title: 'Find a Job',
      description: 'Looking for new opportunities and career growth',
      icon: User,
      features: ['Browse job listings', 'Apply to positions', 'Track applications', 'Build your profile']
    },
    {
      id: 'employer',
      title: 'Post a Job',
      description: 'Hire talented professionals for your organization',
      icon: Building,
      features: ['Post job listings', 'Review applications', 'Manage candidates', 'Company dashboard']
    }
  ];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
  };

  const handleContinue = () => {
    if (selectedRole) {
      console.log('Selected role:', selectedRole);
      // Handle navigation or form submission here
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to JobPortal</h1>
          <p className="text-gray-600">How would you like to get started?</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {roles.map((role) => {
            const IconComponent = role.icon;
            const isSelected = selectedRole === role.id;
            
            return (
              <div
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                className={`relative bg-white rounded-xl border-2 p-8 cursor-pointer transition-all duration-200 hover:shadow-xl ${
                  isSelected 
                    ? 'border-[#164b7d] shadow-lg transform scale-105' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-6 right-6 w-6 h-6 bg-[#164b7d] rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                )}
                
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto ${
                  isSelected ? 'bg-[#164b7d]' : 'bg-gray-100'
                }`}>
                  <IconComponent className={`w-8 h-8 ${
                    isSelected ? 'text-white' : 'text-gray-600'
                  }`} />
                </div>
                
                <h3 className={`text-2xl font-bold mb-3 text-center ${
                  isSelected ? 'text-[#164b7d]' : 'text-gray-900'
                }`}>
                  {role.title}
                </h3>
                
                <p className="text-gray-600 mb-6 text-center">
                  {role.description}
                </p>
                
                <ul className="space-y-3">
                  {role.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-[#8c3035] rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button
            onClick={handleContinue}
            disabled={!selectedRole}
            className={`px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
              selectedRole
                ? 'bg-[#164b7d] text-white hover:bg-[#123a63] shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Get Started
          </button>
          
          {selectedRole && (
            <p className="mt-4 text-gray-600">
              Ready to <span className="font-semibold text-[#8c3035]">
                {selectedRole === 'job-seeker' ? 'find your dream job' : 'hire top talent'}
              </span>?
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Roles;