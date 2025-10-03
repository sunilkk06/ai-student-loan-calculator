import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  Brain, 
  BarChart3, 
  DollarSign, 
  TrendingUp, 
  Sparkles, 
  ArrowRight,
  CheckCircle,
  Users,
  Award,
  Zap,
  Shield,
  Search
} from 'lucide-react';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const featuredCalculators = [
    {
      title: 'Student Loan Calculator',
      description: 'Calculate monthly payments, total interest, and create a personalized repayment strategy.',
      icon: DollarSign,
      link: '/calculators/student-loan',
      color: 'from-green-500 to-teal-500',
      category: 'Financial'
    },
    {
      title: 'Scientific Calculator',
      description: 'Essential for college-level math and science courses with trigonometric functions and more.',
      icon: Calculator,
      link: '/calculators/scientific',
      color: 'from-blue-500 to-purple-500',
      category: 'Academic'
    },
    {
      title: 'AI Insights',
      description: 'Get personalized AI-powered recommendations to optimize your loan repayment strategy.',
      icon: Brain,
      link: '/insights',
      color: 'from-purple-500 to-pink-500',
      category: 'Smart Tools'
    },
    {
      title: 'Loan Comparison',
      description: 'Compare multiple loan options side-by-side to make informed borrowing decisions.',
      icon: BarChart3,
      link: '/comparison',
      color: 'from-orange-500 to-red-500',
      category: 'Financial'
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Instant calculations with real-time results as you type'
    },
    {
      icon: Shield,
      title: '100% Free',
      description: 'No registration, no hidden fees, completely free forever'
    },
    {
      icon: Brain,
      title: 'AI-Powered',
      description: 'Smart insights and personalized recommendations'
    },
    {
      icon: Users,
      title: 'Student-Focused',
      description: 'Designed specifically for college students and graduates'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Students Helped' },
    { number: '$2M+', label: 'Interest Saved' },
    { number: '4.9/5', label: 'User Rating' },
    { number: '100%', label: 'Free Tools' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20 md:py-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">AI-Powered Financial Tools for Students</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Smart Calculators for
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Smarter Students
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Free online calculators designed specifically for college students. Calculate loans, 
              get AI insights, and make informed financial decisions.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search calculators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-white/50 shadow-2xl"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/calculators"
                className="inline-flex items-center justify-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
              >
                <Calculator className="w-5 h-5" />
                <span>Explore Calculators</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/calculators/student-loan"
                className="inline-flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
              >
                <DollarSign className="w-5 h-5" />
                <span>Calculate Loan</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Calculators */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured Calculators
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful tools to help you manage your finances and succeed in your studies
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {featuredCalculators.map((calc, index) => {
              const Icon = calc.icon;
              return (
                <Link
                  key={index}
                  to={calc.link}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <div className={`h-2 bg-gradient-to-r ${calc.color}`}></div>
                  <div className="p-8">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className={`p-4 rounded-xl bg-gradient-to-r ${calc.color} flex-shrink-0`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-500 mb-1">
                          {calc.category}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                          {calc.title}
                        </h3>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">
                      {calc.description}
                    </p>

                    <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                      Try it now <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/calculators"
              className="inline-flex items-center space-x-2 text-blue-600 font-bold text-lg hover:text-blue-700"
            >
              <span>View All Calculators</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Students Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built by students, for students. Everything you need to succeed financially.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Choose Your Calculator
              </h3>
              <p className="text-gray-600">
                Select from our range of financial and academic calculators
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 text-white rounded-full text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Enter Your Details
              </h3>
              <p className="text-gray-600">
                Input your loan amount, interest rate, or calculation parameters
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-600 text-white rounded-full text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Get Instant Results
              </h3>
              <p className="text-gray-600">
                Receive detailed calculations and AI-powered insights immediately
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Trusted by Students Nationwide
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what students are saying about our calculators
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Award key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "This calculator helped me save over $5,000 in interest by showing me the impact of extra payments. Game changer!"
              </p>
              <div className="font-semibold text-gray-900">Sarah M.</div>
              <div className="text-sm text-gray-600">University of California</div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Award key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "The AI insights are incredibly helpful. It recommended a refinancing option that cut my rate by 2%!"
              </p>
              <div className="font-semibold text-gray-900">James T.</div>
              <div className="text-sm text-gray-600">MIT</div>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Award key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Perfect for comparing loan options. Made my decision so much easier. Highly recommend!"
              </p>
              <div className="font-semibold text-gray-900">Emily R.</div>
              <div className="text-sm text-gray-600">Stanford University</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of students who are making smarter financial decisions with our free tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/calculators/student-loan"
              className="inline-flex items-center justify-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
            >
              <Calculator className="w-5 h-5" />
              <span>Start Calculating</span>
            </Link>
            <Link
              to="/insights"
              className="inline-flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
            >
              <Brain className="w-5 h-5" />
              <span>Get AI Insights</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
