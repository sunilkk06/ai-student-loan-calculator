import React from 'react';
import { Link } from 'react-router-dom';
import RefinancingGuide from '../components/RefinancingGuide';
import { TrendingDown, BookOpen, Lightbulb } from 'lucide-react';

const RefinancingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <span className="text-gray-800 font-semibold">Refinancing Guide</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Student Loan Refinancing Guide
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl">
            Learn how refinancing can help you save money, lower your monthly payments, and pay off 
            your student loans faster. Calculate your potential savings and discover if refinancing 
            is right for you.
          </p>
        </div>

        {/* Main Refinancing Component */}
        <RefinancingGuide />

        {/* Educational Content */}
        <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* What is Refinancing */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <TrendingDown className="w-8 h-8 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">What is Student Loan Refinancing?</h2>
            </div>
            
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                Student loan refinancing is the process of taking out a new loan to pay off one or more 
                existing student loans. The new loan typically comes with a lower interest rate, different 
                repayment terms, or both.
              </p>
              
              <h3 className="text-lg font-semibold mb-3 text-gray-900">How It Works:</h3>
              <ol className="space-y-2 mb-4 list-decimal list-inside">
                <li>Apply with a private lender for a new loan</li>
                <li>Lender pays off your existing loans</li>
                <li>You make payments on the new loan at the new rate</li>
                <li>Save money through lower interest or better terms</li>
              </ol>

              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>💡 Key Benefit:</strong> If you have good credit and stable income, refinancing 
                  can significantly reduce the total amount you pay over the life of your loans.
                </p>
              </div>
            </div>
          </div>

          {/* When to Refinance */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Lightbulb className="w-8 h-8 text-yellow-600" />
              <h2 className="text-2xl font-bold text-gray-900">When Should You Refinance?</h2>
            </div>
            
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                Refinancing isn't right for everyone. Consider refinancing if you:
              </p>

              <div className="space-y-3 mb-4">
                <div className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">✓</span>
                  <div>
                    <strong>Have improved credit:</strong> Score of 650+ qualifies for better rates
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">✓</span>
                  <div>
                    <strong>Have stable income:</strong> Steady employment history increases approval chances
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">✓</span>
                  <div>
                    <strong>Have high interest rates:</strong> Current rates above 6-7% are good candidates
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">✓</span>
                  <div>
                    <strong>Don't need federal protections:</strong> Won't need income-driven plans or forgiveness
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>⚠️ Warning:</strong> Refinancing federal loans means losing federal benefits like 
                  income-driven repayment, loan forgiveness, and deferment options. Consider carefully!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pros and Cons */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8 max-w-7xl mx-auto">
          <div className="flex items-center space-x-3 mb-6">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Pros & Cons of Refinancing</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Pros */}
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-2xl font-bold text-green-700 mb-4">Advantages</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1 text-xl">+</span>
                  <div>
                    <strong>Lower Interest Rates:</strong> Save thousands with reduced rates
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1 text-xl">+</span>
                  <div>
                    <strong>Lower Monthly Payments:</strong> Extend term to reduce payment amount
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1 text-xl">+</span>
                  <div>
                    <strong>Simplified Payments:</strong> Consolidate multiple loans into one
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1 text-xl">+</span>
                  <div>
                    <strong>Release Cosigner:</strong> Remove cosigner from original loan
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1 text-xl">+</span>
                  <div>
                    <strong>Flexible Terms:</strong> Choose 5, 10, 15, or 20-year terms
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1 text-xl">+</span>
                  <div>
                    <strong>Pay Off Faster:</strong> Shorten term to become debt-free sooner
                  </div>
                </li>
              </ul>
            </div>

            {/* Cons */}
            <div className="border-l-4 border-red-500 pl-6">
              <h3 className="text-2xl font-bold text-red-700 mb-4">Disadvantages</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 mt-1 text-xl">−</span>
                  <div>
                    <strong>Lose Federal Benefits:</strong> No more income-driven repayment plans
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 mt-1 text-xl">−</span>
                  <div>
                    <strong>No Loan Forgiveness:</strong> Ineligible for PSLF and other forgiveness programs
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 mt-1 text-xl">−</span>
                  <div>
                    <strong>Credit Check Required:</strong> Need good credit for best rates
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 mt-1 text-xl">−</span>
                  <div>
                    <strong>Variable Rates Risk:</strong> Rates can increase over time
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 mt-1 text-xl">−</span>
                  <div>
                    <strong>Fewer Deferment Options:</strong> Limited hardship protections
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 mt-1 text-xl">−</span>
                  <div>
                    <strong>May Pay More Overall:</strong> Extending term increases total interest
                  </div>
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">What credit score do I need to refinance?</h3>
              <p className="text-gray-700">
                Most lenders require a minimum credit score of 650-680, but the best rates typically go to 
                borrowers with scores of 720 or higher. Some lenders may work with scores as low as 620, 
                but expect higher interest rates.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Can I refinance federal and private loans together?</h3>
              <p className="text-gray-700">
                Yes, you can refinance both federal and private loans into one new private loan. However, 
                remember that refinancing federal loans means losing all federal benefits and protections 
                permanently.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How many times can I refinance?</h3>
              <p className="text-gray-700">
                There's no limit to how many times you can refinance. If rates drop or your credit improves, 
                you can refinance again to get better terms. However, each application involves a hard credit 
                inquiry, so space them out appropriately.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Does refinancing hurt my credit score?</h3>
              <p className="text-gray-700">
                Refinancing may cause a small, temporary dip in your credit score due to the hard inquiry. 
                However, making on-time payments on your new loan can improve your score over time. The 
                impact is usually minimal and short-lived.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Should I choose a fixed or variable rate?</h3>
              <p className="text-gray-700">
                <strong>Fixed rates</strong> stay the same for the life of the loan, providing predictable 
                payments. <strong>Variable rates</strong> start lower but can increase based on market 
                conditions. Choose fixed if you want stability, variable if you plan to pay off quickly or 
                expect rates to stay low.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">What documents do I need to refinance?</h3>
              <p className="text-gray-700">
                Typically, you'll need: proof of income (pay stubs, tax returns), proof of employment, 
                identification (driver's license, SSN), loan statements showing current balances, and 
                proof of graduation (diploma or transcript). Requirements vary by lender.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefinancingPage;
