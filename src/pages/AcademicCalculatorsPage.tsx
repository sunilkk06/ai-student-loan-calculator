import React from 'react';
import { Book } from 'lucide-react';

const AcademicCalculatorsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Book className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Academic Calculators</h1>
          <p className="text-xl text-gray-600">
            Calculators for your academic coursework
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <p className="text-gray-600">Academic calculators coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default AcademicCalculatorsPage;
