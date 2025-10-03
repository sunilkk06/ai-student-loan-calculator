import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Target, 
  Shield, 
  TrendingUp, 
  Users, 
  Award, 
  CheckCircle,
  Heart,
  Lightbulb,
  Rocket,
  Globe,
  BookOpen
} from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <span className="text-gray-800 font-semibold">About Us</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About AI Student Loan Calculator
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
            Empowering students with intelligent financial tools to make informed decisions 
            about their educational future and achieve financial freedom.
          </p>
        </div>

        {/* Mission Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl shadow-2xl p-8 md:p-12 text-white">
            <div className="flex items-center mb-6">
              <Brain className="w-12 h-12 mr-4" />
              <h2 className="text-4xl font-bold">Our Mission</h2>
            </div>
            <p className="text-xl leading-relaxed mb-6 text-blue-50">
              At AI Student Loan Calculator, we believe that every student deserves access to powerful,
              easy-to-use financial planning tools. Our mission is to demystify student loans and empower
              students to make confident, data-driven decisions about financing their education.
            </p>
            <p className="text-lg leading-relaxed text-blue-100">
              Using cutting-edge artificial intelligence and machine learning algorithms, we provide
              personalized insights, accurate loan calculations, and strategic repayment planning that
              adapts to your unique financial situation. We're committed to helping students save money,
              reduce stress, and achieve their educational goals without the burden of overwhelming debt.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-start mb-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Precision & Accuracy</h3>
              <p className="text-gray-600 leading-relaxed">
                Our advanced algorithms ensure precise loan calculations, taking into account interest
                rates, payment schedules, and various repayment strategies to give you accurate projections
                you can trust.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-start mb-4">
                <div className="p-3 bg-green-100 rounded-xl">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Privacy & Security</h3>
              <p className="text-gray-600 leading-relaxed">
                Your financial data is protected with bank-level encryption. We never sell your information
                and maintain strict privacy standards to keep your data secure and confidential.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-start mb-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Brain className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">AI-Powered Insights</h3>
              <p className="text-gray-600 leading-relaxed">
                Get personalized recommendations tailored to your financial goals, helping you optimize
                repayment strategies and potentially save thousands of dollars over the life of your loan.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-start mb-4">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <Users className="w-8 h-8 text-orange-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Student-Focused</h3>
              <p className="text-gray-600 leading-relaxed">
                Built by education finance experts and technologists who understand the challenges students
                face. Our tools are designed with your success and financial well-being in mind.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-start mb-4">
                <div className="p-3 bg-pink-100 rounded-xl">
                  <Heart className="w-8 h-8 text-pink-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Transparency</h3>
              <p className="text-gray-600 leading-relaxed">
                No hidden fees, no tricks, no fine print. We believe in complete transparency in all our
                calculations and recommendations. What you see is what you get - always free.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-start mb-4">
                <div className="p-3 bg-yellow-100 rounded-xl">
                  <Lightbulb className="w-8 h-8 text-yellow-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600 leading-relaxed">
                We continuously improve our tools with the latest technology and financial insights to
                provide you with the most advanced and user-friendly calculators available.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <div className="flex items-center mb-8">
              <Award className="w-10 h-10 text-blue-600 mr-4" />
              <h2 className="text-4xl font-bold text-gray-900">Why Choose Us</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">100% Free Forever</h4>
                  <p className="text-gray-600">No hidden fees, subscriptions, or premium tiers. All features are completely free.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">No Registration Required</h4>
                  <p className="text-gray-600">Start calculating immediately without creating an account or providing personal information.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">AI-Powered Recommendations</h4>
                  <p className="text-gray-600">Get personalized insights based on your unique financial situation and goals.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Multiple Calculators</h4>
                  <p className="text-gray-600">From student loans to scientific calculations - all the tools you need in one place.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Real-Time Calculations</h4>
                  <p className="text-gray-600">See results instantly as you adjust parameters - no waiting, no delays.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Mobile Friendly</h4>
                  <p className="text-gray-600">Access our calculators from any device - desktop, tablet, or smartphone.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Comparison Tools</h4>
                  <p className="text-gray-600">Compare multiple loan options side-by-side to make the best decision.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Educational Resources</h4>
                  <p className="text-gray-600">Learn about student loans, repayment strategies, and financial planning.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8 md:p-12">
            <div className="flex items-center mb-6">
              <BookOpen className="w-10 h-10 text-purple-600 mr-4" />
              <h2 className="text-4xl font-bold text-gray-900">Our Story</h2>
            </div>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                AI Student Loan Calculator was born from a simple observation: students needed better tools 
                to understand and manage their student loans. Traditional calculators were either too simple 
                to be useful or too complex to understand.
              </p>
              
              <p className="mb-4">
                We set out to create something different - a platform that combines the power of artificial 
                intelligence with user-friendly design to provide students with actionable insights they can 
                actually use. Our team of financial experts, data scientists, and developers worked together 
                to build tools that are both sophisticated and accessible.
              </p>
              
              <p className="mb-4">
                Today, we're proud to serve thousands of students across the country, helping them save money, 
                reduce stress, and make informed decisions about their financial future. But we're not stopping 
                here - we're constantly improving our tools and adding new features based on user feedback.
              </p>

              <p>
                Whether you're just starting to think about student loans or you're already in repayment, 
                we're here to help you every step of the way.
              </p>
            </div>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600">
              Making a real difference in students' financial lives
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50,000+</div>
              <div className="text-gray-600 font-medium">Students Helped</div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-4xl font-bold text-green-600 mb-2">$2M+</div>
              <div className="text-gray-600 font-medium">Interest Saved</div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl mb-4">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600 font-medium">Universities</div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-4">
                <Rocket className="w-8 h-8 text-orange-600" />
              </div>
              <div className="text-4xl font-bold text-orange-600 mb-2">4.9/5</div>
              <div className="text-gray-600 font-medium">User Rating</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Take Control of Your Student Loans?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of students who are making smarter financial decisions with our free tools.
            </p>
            <Link
              to="/calculators"
              className="inline-flex items-center justify-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
            >
              <span>Get Started Free</span>
              <Rocket className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
