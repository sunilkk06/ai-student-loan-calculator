import React from 'react';
import { BarChart } from 'lucide-react';

const StatisticsCalculatorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <BarChart className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Statistics Calculator</h1>
          <p className="text-xl text-gray-600">
            Calculate descriptive statistics for your data
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <p className="text-gray-600">Statistics calculator coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCalculatorPage;
