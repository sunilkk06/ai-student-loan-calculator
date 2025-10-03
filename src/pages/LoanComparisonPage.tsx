import React from 'react';
import { Link } from 'react-router-dom';
import LoanComparison from '../components/LoanComparison';
import { BarChart3, BookOpen, Lightbulb, TrendingUp } from 'lucide-react';

const LoanComparisonPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <span className="text-gray-800 font-semibold">Loan Comparison</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Student Loan Comparison Tool
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl">
            Compare multiple student loan options side-by-side to make informed borrowing decisions. 
            Evaluate federal vs. private loans, different interest rates, and repayment terms to find 
            the best option for your financial situation.
          </p>
        </div>

        {/* Main Loan Comparison Component */}
        <LoanComparison />

        {/* Educational Content */}
        <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Why Compare Loans */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Why Compare Student Loans?</h2>
            </div>
            
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                Comparing student loans before borrowing can save you thousands of dollars over the life 
                of your loans. Here's what you should evaluate:
              </p>
              
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Interest Rates</h4>
                  <p className="text-sm">
                    Even a 1% difference in interest rate can mean thousands in savings. Federal loans 
                    typically have lower, fixed rates compared to private loans.
                  </p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Repayment Terms</h4>
                  <p className="text-sm">
                    Longer terms mean lower monthly payments but more interest paid overall. Shorter 
                    terms save money but require higher monthly payments.
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Total Cost</h4>
                  <p className="text-sm">
                    Look beyond monthly payments. The total amount paid (principal + interest) is the 
                    true cost of borrowing.
                  </p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Loan Features</h4>
                  <p className="text-sm">
                    Federal loans offer benefits like income-driven repayment, deferment, and forgiveness 
                    programs that private loans don't provide.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Tips */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Lightbulb className="w-8 h-8 text-yellow-600" />
              <h2 className="text-2xl font-bold text-gray-900">Smart Comparison Tips</h2>
            </div>
            
            <div className="prose max-w-none text-gray-700">
              <h3 className="text-lg font-semibold mb-3">Federal Loans First</h3>
              <p className="mb-4">
                Always max out federal student loan options before considering private loans. Federal 
                loans offer better protections and more flexible repayment options.
              </p>

              <h3 className="text-lg font-semibold mb-3">Compare Apples to Apples</h3>
              <p className="mb-4">
                When comparing loans, use the same loan amount and term length to get accurate comparisons. 
                Focus on:
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <TrendingUp className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Monthly payment amount</span>
                </li>
                <li className="flex items-start">
                  <TrendingUp className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Total interest paid over loan life</span>
                </li>
                <li className="flex items-start">
                  <TrendingUp className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Total amount repaid (principal + interest)</span>
                </li>
                <li className="flex items-start">
                  <TrendingUp className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Available repayment plans and flexibility</span>
                </li>
              </ul>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>💡 Pro Tip:</strong> Create multiple comparison scenarios - best case, worst case, 
                  and most likely case - to understand your options fully before committing to a loan.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Federal vs Private Loans */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8 max-w-7xl mx-auto">
          <div className="flex items-center space-x-3 mb-6">
            <BookOpen className="w-8 h-8 text-green-600" />
            <h2 className="text-3xl font-bold text-gray-900">Federal vs. Private Student Loans</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Federal Loans */}
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Federal Student Loans</h3>
              
              <div className="mb-6">
                <h4 className="font-semibold text-green-700 mb-2">✓ Advantages</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Fixed interest rates set by Congress</li>
                  <li>• No credit check required (except PLUS loans)</li>
                  <li>• Income-driven repayment plans available</li>
                  <li>• Loan forgiveness programs (PSLF, Teacher, etc.)</li>
                  <li>• Deferment and forbearance options</li>
                  <li>• Death and disability discharge</li>
                  <li>• 6-month grace period after graduation</li>
                  <li>• Subsidized options for undergrads with need</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-red-700 mb-2">✗ Disadvantages</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Annual and lifetime borrowing limits</li>
                  <li>• May have higher rates than private loans (for excellent credit)</li>
                  <li>• Origination fees (typically 1-4%)</li>
                </ul>
              </div>
            </div>

            {/* Private Loans */}
            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Private Student Loans</h3>
              
              <div className="mb-6">
                <h4 className="font-semibold text-green-700 mb-2">✓ Advantages</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Can borrow up to cost of attendance</li>
                  <li>• Potentially lower rates (with excellent credit)</li>
                  <li>• Choice of fixed or variable rates</li>
                  <li>• May offer rewards or rate discounts</li>
                  <li>• Faster application process</li>
                  <li>• Can refinance existing loans</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-red-700 mb-2">✗ Disadvantages</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Credit check required (or cosigner needed)</li>
                  <li>• Variable rates can increase over time</li>
                  <li>• Limited repayment flexibility</li>
                  <li>• No federal forgiveness programs</li>
                  <li>• Fewer deferment/forbearance options</li>
                  <li>• No income-driven repayment plans</li>
                  <li>• Rates vary widely by lender and credit score</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <h4 className="font-bold text-gray-900 mb-3">Recommendation:</h4>
            <p className="text-gray-700">
              <strong>Start with federal loans first.</strong> Only consider private loans after you've 
              exhausted federal options (Direct Subsidized, Direct Unsubsidized, and PLUS loans). Private 
              loans should be your last resort due to fewer protections and less flexibility.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Should I choose a shorter or longer loan term?</h3>
              <p className="text-gray-700">
                Shorter terms (5-10 years) mean higher monthly payments but less total interest paid. Longer 
                terms (15-25 years) offer lower monthly payments but cost significantly more in interest. 
                Choose based on your budget and financial goals - if you can afford higher payments, shorter 
                terms save money long-term.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">What's the difference between fixed and variable interest rates?</h3>
              <p className="text-gray-700">
                <strong>Fixed rates</strong> stay the same for the life of the loan, providing predictable 
                payments. <strong>Variable rates</strong> can change based on market conditions - they may 
                start lower but could increase significantly over time. Federal loans have fixed rates; 
                private loans offer both options.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How much can I save by getting a lower interest rate?</h3>
              <p className="text-gray-700">
                On a $30,000 loan over 10 years, reducing your rate from 6.8% to 4.5% saves you approximately 
                $3,600 in interest and lowers your monthly payment by about $30. Use our comparison tool to 
                see exact savings for your situation.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Can I mix federal and private loans?</h3>
              <p className="text-gray-700">
                Yes, many students use a combination of federal and private loans. The strategy is to borrow 
                the maximum from federal sources first (better protections and rates), then use private loans 
                only if needed to cover remaining costs.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">When should I consider refinancing?</h3>
              <p className="text-gray-700">
                Consider refinancing if you have good credit (700+), stable income, and high-interest private 
                loans. Be cautious about refinancing federal loans - you'll lose federal protections like 
                income-driven repayment and forgiveness programs. Only refinance federal loans if you're 
                certain you won't need these benefits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanComparisonPage;
