import React from 'react';
import { Calculator, TrendingUp, DollarSign, PieChart, Wallet, GraduationCap, BarChart, FunctionSquare, Zap, BookOpen, FileText, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const CalculatorsPage: React.FC = () => {
  const calculatorCategories = [
    {
      category: 'Financial Calculators',
      description: 'Manage your student finances and plan for the future',
      calculators: [
        {
          title: 'Student Loan Calculator',
          description: 'Calculate monthly payments, total interest, and create a repayment plan for your student loans.',
          icon: DollarSign,
          link: '/calculators/student-loan',
          color: 'from-green-500 to-teal-500',
          tags: ['Financial Planning', 'Personal Finance']
        },
        {
          title: 'Student Budget Planner',
          description: 'Helps manage money day-to-day. Track income vs expenses with a net monthly total.',
          icon: Wallet,
          link: '/calculators/budget-planner',
          color: 'from-blue-500 to-purple-500',
          tags: ['Budgeting', 'Money Management']
        },
        {
          title: 'Time Value of Money (TVM)',
          description: 'Calculate FV, PV, Interest Rate, and Periods. The backbone of finance courses.',
          icon: TrendingUp,
          link: '/calculators/tvm',
          color: 'from-indigo-500 to-purple-500',
          tags: ['Finance', 'Investment']
        },
        {
          title: 'Tuition Cost Projector',
          description: 'Estimate future tuition costs factoring in annual increases. Plan ahead for total education investment.',
          icon: GraduationCap,
          link: '/calculators/tuition-projector',
          color: 'from-purple-500 to-pink-500',
          tags: ['College Planning', 'Budgeting']
        }
      ]
    },
    {
      category: 'Academic Calculators',
      description: 'Tools for coursework, research, and academic success',
      calculators: [
        {
          title: 'Scientific Calculator',
          description: 'Advanced calculator with trigonometry, logarithms, and scientific functions.',
          icon: Calculator,
          link: '/calculators/scientific',
          color: 'from-blue-500 to-purple-500',
          tags: ['Math', 'Science', 'Engineering']
        },
        {
          title: 'Statistics Calculator',
          description: 'Calculate mean, median, mode, standard deviation, and more for your data.',
          icon: BarChart,
          link: '/academic/statistics',
          color: 'from-purple-500 to-pink-500',
          tags: ['Statistics', 'Data Analysis']
        },
        {
          title: 'Graphing Calculator',
          description: 'Plot functions, find roots, and analyze mathematical relationships visually.',
          icon: FunctionSquare,
          link: '/academic/graphing',
          color: 'from-blue-500 to-teal-500',
          tags: ['Calculus', 'Math']
        },
        {
          title: 'Physics/Engineering Solver',
          description: 'Pre-built templates for common equations: quadratic, energy, Ohm\'s Law, and more.',
          icon: Zap,
          link: '/academic/physics-solver',
          color: 'from-orange-500 to-red-500',
          tags: ['Physics', 'Engineering']
        },
        {
          title: 'Citation Formatter',
          description: 'Format citations in MLA, APA, or Chicago style for research papers.',
          icon: BookOpen,
          link: '/academic/citation-formatter',
          color: 'from-indigo-500 to-purple-500',
          tags: ['Writing', 'Research']
        },
        {
          title: 'Grade/GPA Calculator',
          description: 'Calculate required grades to achieve target GPA. Essential for scholarships.',
          icon: Award,
          link: '/academic/grade-calculator',
          color: 'from-green-500 to-teal-500',
          tags: ['GPA', 'Academic Planning']
        }
      ]
    },
    {
      category: 'Student Finance & Planning',
      description: 'Budget, save, and plan your financial future',
      calculators: [
        {
          title: 'IDR Estimator',
          description: 'Estimate Income-Driven Repayment plan payments based on income and family size.',
          icon: FileText,
          link: '/student-finance/idr-estimator',
          color: 'from-green-500 to-teal-500',
          tags: ['Loan Repayment', 'Planning']
        },
        {
          title: 'Roommate Expense Splitter',
          description: 'Split rent, utilities, and bills fairly with roommates.',
          icon: Users,
          link: '/student-finance/roommate-expense-splitter',
          color: 'from-blue-500 to-purple-500',
          tags: ['Budgeting', 'Shared Living']
        },
        {
          title: 'College Savings Plan',
          description: 'Calculate monthly savings needed to reach college cost goals with compound interest.',
          icon: GraduationCap,
          link: '/student-finance/college-savings',
          color: 'from-purple-500 to-pink-500',
          tags: ['Savings', 'Planning']
        },
        {
          title: 'Financial Aid Estimator (SAI)',
          description: 'Estimate Student Aid Index and Pell Grant eligibility before filing FAFSA.',
          icon: Award,
          link: '/student-finance/financial-aid-estimator',
          color: 'from-indigo-500 to-blue-500',
          tags: ['Financial Aid', 'FAFSA']
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            All Calculators
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Free online calculators designed specifically for college students. From financial planning 
            to academic tools - everything you need in one place.
          </p>
        </div>

        {/* Calculator Categories */}
        {calculatorCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{category.category}</h2>
              <p className="text-gray-600">{category.description}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {category.calculators.map((calc, index) => {
                const Icon = calc.icon;
                return (
                  <Link
                    key={index}
                    to={calc.link}
                    className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                  >
                    <div className={`h-3 bg-gradient-to-r ${calc.color}`}></div>
                    <div className="p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${calc.color}`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {calc.title}
                        </h3>
                      </div>
                      
                      <p className="text-gray-600 mb-4 text-sm">
                        {calc.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {calc.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-2 transition-transform">
                        Use Calculator →
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

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
