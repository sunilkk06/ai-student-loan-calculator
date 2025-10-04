import React from 'react';
import { Users } from 'lucide-react';

const RoommateExpenseSplitterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Users className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Roommate Expense Splitter</h1>
          <p className="text-xl text-gray-600">
            Split shared expenses fairly with your roommates
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <p className="text-gray-600">Roommate expense splitter coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default RoommateExpenseSplitterPage;
