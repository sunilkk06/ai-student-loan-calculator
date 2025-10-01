import React from 'react';
import { Brain, Target, Shield, TrendingUp, Users, Award, CheckCircle } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              About AI Student Loan Calculator
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Empowering students with intelligent financial tools to make informed decisions about their educational future
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
                <Brain className="w-8 h-8 mr-3 text-blue-600" />
                Our Mission
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                At AI Student Loan Calculator, we believe that every student deserves access to powerful,
                easy-to-use financial planning tools. Our mission is to demystify student loans and empower
                students to make confident, data-driven decisions about financing their education.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Using cutting-edge artificial intelligence and machine learning algorithms, we provide
                personalized insights, accurate loan calculations, and strategic repayment planning that
                adapts to your unique financial situation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Precision & Accuracy</h3>
                <p className="text-gray-600">
                  Our advanced algorithms ensure precise loan calculations, taking into account interest
                  rates, payment schedules, and various repayment strategies to give you accurate projections.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start mb-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Privacy & Security</h3>
                <p className="text-gray-600">
                  Your financial data is protected with bank-level encryption. We never sell your information
                  and maintain strict privacy standards to keep your data secure.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Insights</h3>
                <p className="text-gray-600">
                  Get AI-powered recommendations tailored to your financial goals, helping you optimize
                  repayment strategies and potentially save thousands of dollars over the life of your loan.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start mb-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Users className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Student-Focused</h3>
                <p className="text-gray-600">
                  Built by education finance experts and technologists who understand the challenges students
                  face. Our tools are designed with your success in mind.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white mb-12">
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <Award className="w-8 h-8 mr-3" />
                Why Choose Us
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                  <p>100% free to use - no hidden fees or subscriptions</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                  <p>AI-powered personalized recommendations</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                  <p>Comprehensive loan comparison tools</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                  <p>Real-time calculations and projections</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                  <p>Educational resources and expert guidance</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                  <p>Mobile-friendly interface for on-the-go access</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Founded by former students who struggled with understanding and managing their own student
                loans, AI Student Loan Calculator was born from a simple idea: financial planning tools
                should be accessible, transparent, and easy to understand.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                We combined expertise in artificial intelligence, financial modeling, and user experience
                design to create a platform that not only calculates loan payments but also educates and
                empowers users to take control of their financial futures.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Today, we're proud to serve thousands of students across the country, helping them make
                smarter decisions about student loans and achieve their educational dreams without unnecessary
                financial burden.
              </p>
            </div>
          </div>

          <div className="text-center bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
            <p className="text-gray-600 mb-6">
              Join thousands of students who are taking control of their financial future
            </p>
            <a
              href="#calculator"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all text-lg font-semibold cursor-pointer"
            >
              <span>Try Our Calculator</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
