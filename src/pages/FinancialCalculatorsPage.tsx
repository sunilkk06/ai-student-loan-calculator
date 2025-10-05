import React from 'react';
import { DollarSign, Wallet, Calculator, PiggyBank, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const FinancialCalculatorsPage: React.FC = () => {
  const calculators = [
    {
      title: 'Student Loan Calculator',
      description: 'Calculate monthly payments, total interest, and create a repayment plan for your student loans.',
      icon: DollarSign,
      link: '/calculators/student-loan',
      color: 'from-green-500 to-teal-500',
      courses: ['Financial Planning', 'Personal Finance']
    },
    {
      title: 'Student Budget Planner',
      description: 'Helps manage money day-to-day, a critical need for students juggling bills. Simple input for Income (job, aid) vs. Expenses (rent, tuition, books, food, transport) with a net monthly total.',
      icon: Wallet,
      link: '/calculators/budget-planner',
      color: 'from-blue-500 to-purple-500',
      courses: ['Budgeting', 'Financial Planning', 'Money Management']
    },
    {
      title: 'Time Value of Money (TVM)',
      description: 'The backbone of finance. Calculate Future Value, Present Value, Interest Rate, Number of Periods, and Payment amounts. Essential for investment decisions.',
      icon: TrendingUp,
      link: '/calculators/tvm',
      color: 'from-indigo-500 to-purple-500',
      courses: ['Finance', 'Investment', 'Economics', 'Business']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Financial Calculators
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Free online calculators designed specifically for college students to manage their finances. 
            Calculate loans, create repayment plans, and make informed financial decisions.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {calculators.map((calc, index) => {
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
                    <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
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
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold"
                      >
                        {course}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                    Use Calculator →
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Why Use Our Calculators Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Why Use Our Financial Calculators?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Calculator className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Accurate Calculations</h3>
              <p className="text-gray-600">
                Get precise loan payment calculations and budget tracking with our advanced algorithms.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <PiggyBank className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Save Money</h3>
              <p className="text-gray-600">
                Make informed decisions that can save you thousands in interest and help you budget better.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Plan Ahead</h3>
              <p className="text-gray-600">
                Visualize your financial future and create strategies to achieve your goals faster.
              </p>
            </div>
          </div>
        </div>

        {/* More Tools Section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Looking for More Tools?
          </h2>
          <p className="text-gray-600 mb-6">
            Explore our complete collection of calculators for academics and student finance planning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/academic"
              className="inline-flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <Calculator className="w-5 h-5" />
              <span>Academic Calculators</span>
            </Link>
            <Link
              to="/student-finance"
              className="inline-flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              <PiggyBank className="w-5 h-5" />
              <span>Student Finance & Planning</span>
            </Link>
            <Link
              to="/calculators"
              className="inline-flex items-center justify-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              <Calculator className="w-5 h-5" />
              <span>View All Calculators</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialCalculatorsPage;
