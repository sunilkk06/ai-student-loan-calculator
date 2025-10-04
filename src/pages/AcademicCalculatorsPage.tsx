import React from 'react';
import { Calculator, GraduationCap, Brain, BarChart, FunctionSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const AcademicCalculatorsPage: React.FC = () => {
  const academicCalculators = [
    {
      title: 'Scientific Calculator',
      description: 'Essential for all college-level math and science courses. Includes trigonometric functions, logarithms, powers/roots, and scientific notation.',
      icon: Calculator,
      link: '/calculators/scientific',
      color: 'from-blue-500 to-purple-500',
      courses: ['Calculus', 'Physics', 'Chemistry', 'Engineering']
    },
    {
      title: 'Statistics Calculator',
      description: 'Calculate mean, median, mode, standard deviation, variance, and other descriptive statistics for your data sets. Perfect for statistics courses and research projects.',
      icon: BarChart,
      link: '/academic/statistics',
      color: 'from-purple-500 to-pink-500',
      courses: ['Statistics', 'Data Science', 'Research Methods', 'Psychology', 'Economics']
    },
    {
      title: 'Graphing Calculator',
      description: 'Necessary for higher-level Calculus, Engineering, and Economics. Graph functions, find roots and intersections, and view tables of values.',
      icon: FunctionSquare,
      link: '/academic/graphing',
      color: 'from-blue-500 to-teal-500',
      courses: ['Calculus', 'Engineering', 'Economics', 'Advanced Mathematics']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Academic Calculators
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Specialized calculators designed to help with academic coursework, from basic calculations 
            to complex scientific computations.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {academicCalculators.map((calc, index) => {
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

        {/* Information Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Academic Tools for Student Success
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Calculator className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Course-Specific</h3>
              <p className="text-gray-600">
                Calculators tailored for specific academic subjects and coursework requirements.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <GraduationCap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Student-Focused</h3>
              <p className="text-gray-600">
                Designed with input from students to match real academic needs and workflows.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <Brain className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Learning Enhanced</h3>
              <p className="text-gray-600">
                Not just calculation tools but learning aids that help understand concepts better.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicCalculatorsPage;
