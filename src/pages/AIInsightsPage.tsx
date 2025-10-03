import React from 'react';
import { Link } from 'react-router-dom';
import AIInsights from '../components/AIInsights';
import { Brain, BookOpen, Lightbulb } from 'lucide-react';

const AIInsightsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <span className="text-gray-800 font-semibold">AI Insights</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AI-Powered Student Loan Insights
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl">
            Get personalized, AI-driven recommendations to optimize your student loan repayment strategy. 
            Our intelligent analysis helps you make smarter financial decisions and save thousands in interest.
          </p>
        </div>

        {/* Main AI Insights Component */}
        <AIInsights />

        {/* Educational Content */}
        <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* How AI Insights Work */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Brain className="w-8 h-8 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">How AI Insights Work</h2>
            </div>
            
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                Our AI-powered analysis uses advanced algorithms to evaluate your student loan situation 
                and provide personalized recommendations based on:
              </p>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>Debt-to-Income Ratio:</strong> Analyzes your loan payments relative to your income</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>Interest Rate Analysis:</strong> Compares your rate to market averages</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>Repayment Timeline:</strong> Evaluates your loan term for optimization opportunities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>Financial Health Score:</strong> Provides an overall assessment of your loan strategy</span>
                </li>
              </ul>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>💡 Pro Tip:</strong> Run the analysis multiple times with different scenarios to find 
                  the optimal repayment strategy for your situation.
                </p>
              </div>
            </div>
          </div>

          {/* Understanding Your Results */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <BookOpen className="w-8 h-8 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Understanding Your Results</h2>
            </div>
            
            <div className="prose max-w-none text-gray-700">
              <h3 className="text-lg font-semibold mb-3">Financial Health Score</h3>
              <div className="space-y-2 mb-6">
                <div className="flex items-center">
                  <div className="w-20 h-3 bg-green-500 rounded mr-3"></div>
                  <span className="text-sm"><strong>80-100:</strong> Excellent - Strong financial position</span>
                </div>
                <div className="flex items-center">
                  <div className="w-20 h-3 bg-yellow-500 rounded mr-3"></div>
                  <span className="text-sm"><strong>60-79:</strong> Good - Room for improvement</span>
                </div>
                <div className="flex items-center">
                  <div className="w-20 h-3 bg-red-500 rounded mr-3"></div>
                  <span className="text-sm"><strong>Below 60:</strong> Needs attention - Consider changes</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-3">Key Recommendations</h3>
              <p className="mb-4">
                The AI analyzes your data and provides actionable recommendations such as:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Lightbulb className="w-4 h-4 text-yellow-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Refinancing opportunities to lower interest rates</span>
                </li>
                <li className="flex items-start">
                  <Lightbulb className="w-4 h-4 text-yellow-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Extra payment strategies to reduce total interest</span>
                </li>
                <li className="flex items-start">
                  <Lightbulb className="w-4 h-4 text-yellow-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Alternative repayment plans based on your income</span>
                </li>
                <li className="flex items-start">
                  <Lightbulb className="w-4 h-4 text-yellow-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Timeline optimization to pay off loans faster</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How accurate are the AI insights?</h3>
              <p className="text-gray-700">
                Our AI insights are based on proven financial principles and industry-standard calculations. 
                While they provide valuable guidance, we recommend consulting with a financial advisor for 
                personalized advice tailored to your complete financial situation.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">What is a good debt-to-income ratio for student loans?</h3>
              <p className="text-gray-700">
                Ideally, your student loan payments should be less than 10-15% of your gross monthly income. 
                Ratios above 20% may indicate financial stress and could benefit from income-driven repayment plans.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Can AI insights help me save money?</h3>
              <p className="text-gray-700">
                Yes! By identifying refinancing opportunities, optimal extra payment strategies, and better 
                repayment plans, our AI insights can help you save thousands of dollars in interest over the 
                life of your loans.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How often should I check my AI insights?</h3>
              <p className="text-gray-700">
                Review your insights whenever your financial situation changes - such as getting a raise, 
                changing jobs, or when interest rates fluctuate. We recommend checking at least quarterly 
                to ensure your repayment strategy remains optimal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsightsPage;
