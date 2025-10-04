import React from 'react';
import { Calculator, TrendingUp, DollarSign, PieChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const CalculatorsPage: React.FC = () => {
  const calculators = [
    {
      title: 'Student Loan Calculator',
      description: 'Calculate monthly payments, total interest, and create a repayment plan for your student loans.',
      icon: DollarSign,
      link: '/calculators/student-loan',
      color: 'from-green-500 to-teal-500',
      courses: ['Financial Planning', 'Personal Finance']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
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
            Why Use Our Calculators?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Calculator className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Student-Focused</h3>
              <p className="text-gray-600">
                Designed specifically for college students with features relevant to your coursework and financial needs.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">100% Free</h3>
              <p className="text-gray-600">
                All calculators are completely free to use with no registration, ads, or hidden fees.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <PieChart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Accurate & Reliable</h3>
              <p className="text-gray-600">
                Built with precision and tested extensively to ensure accurate results for your calculations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorsPage;
