import React from 'react';
import { Calculator, PiggyBank, TrendingUp, FileText, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentFinancePage: React.FC = () => {
  const financeCalculators = [
    {
      title: 'Income-Driven Repayment (IDR) Estimator',
      description: 'Essential for graduates with Federal loans who need to manage payments relative to their starting income. Simulates payments for various IDR plans (e.g., SAVE, PAYE) based on estimated salary, family size, and state of residence.',
      icon: FileText,
      link: '/student-finance/idr-estimator',
      color: 'from-green-500 to-teal-500',
      courses: ['Loan Repayment', 'Financial Planning', 'Budgeting']
    },
    {
      title: 'Roommate Expense Splitter',
      description: 'Highly practical for students living off-campus and sharing bills. Allows users to input shared expenses (rent, utilities, groceries) and calculates the fair split per person, handling cases where shares are unequal.',
      icon: Users,
      link: '/student-finance/roommate-expense-splitter',
      color: 'from-blue-500 to-purple-500',
      courses: ['Budgeting', 'Shared Living', 'Expense Management']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Student Finance & Planning Calculators
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tools to help you budget, save, and plan your financial future as a student.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {financeCalculators.map((calc, index) => {
            const Icon = calc.icon;
            return (
              <Link
                key={index}
                to={calc.link}
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className={`h-3 bg-gradient-to-r ${calc.color}`}></div>
                <div className="p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`p-4 rounded-xl bg-gradient-to-r ${calc.color}`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                      {calc.title}
                    </h2>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-lg">
                    {calc.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {calc.courses.map((course, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-semibold"
                      >
                        {course}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center text-green-600 font-semibold group-hover:translate-x-2 transition-transform">
                    Use Calculator →
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Information Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Financial Planning for Students
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Calculator className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Budget Planning</h3>
              <p className="text-gray-600">
                Create and manage your student budget with tools designed for college life.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
                <PiggyBank className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Savings Goals</h3>
              <p className="text-gray-600">
                Set and track savings goals to build financial security during and after college.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Financial Growth</h3>
              <p className="text-gray-600">
                Plan for your financial future with investment and growth calculators.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentFinancePage;
