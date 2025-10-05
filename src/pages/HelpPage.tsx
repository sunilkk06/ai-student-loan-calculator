import React from 'react';
import { HelpCircle, Book, MessageCircle, Mail, GraduationCap, DollarSign, TrendingUp, Shield, Lightbulb, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const HelpPage: React.FC = () => {
  const faqs = [
    {
      question: 'How do I use the AI Assistant?',
      answer: 'Click the floating chat button in the bottom-right corner of any page. Ask questions in natural language like "What is an IDR plan?" or "Help me calculate my loan payment" and the AI will guide you to the right calculator or provide answers.'
    },
    {
      question: 'Are my calculations accurate?',
      answer: 'Yes! Our calculators use standard financial formulas and up-to-date federal guidelines. However, they provide estimates for planning purposes. Always verify with your loan servicer or financial advisor for official numbers.'
    },
    {
      question: 'Do I need to create an account?',
      answer: 'No account needed! All calculators are free to use without registration. Your data stays in your browser and is never stored on our servers.'
    },
    {
      question: 'Can I save my calculations?',
      answer: 'Currently, calculations are session-based. We recommend taking screenshots or writing down important results. Account features with saved calculations are coming soon!'
    },
    {
      question: 'Which calculator should I use for student loans?',
      answer: 'Use the Student Loan Calculator for basic payment calculations. If you have federal loans and lower income, use the IDR Estimator to see income-based payment options. Use Loan Comparison to compare multiple offers side-by-side.'
    },
    {
      question: 'What is the difference between federal and private student loans?',
      answer: 'Federal loans offer fixed rates, income-driven repayment plans, forgiveness options, and flexible deferment. Private loans may have lower rates for borrowers with good credit but lack federal protections. Always exhaust federal options first.'
    },
    {
      question: 'How do IDR plans work?',
      answer: 'Income-Driven Repayment plans cap your monthly federal loan payment at 5-20% of your discretionary income (income above 150% of poverty level). After 20-25 years of payments, remaining balance is forgiven. Use our IDR Estimator to calculate your payment.'
    },
    {
      question: 'Can I use these calculators on my phone?',
      answer: 'Yes! All calculators are fully responsive and work great on mobile devices, tablets, and desktops. The interface adapts to your screen size for the best experience.'
    },
    {
      question: 'What is the best student loan repayment strategy?',
      answer: 'The best strategy depends on your situation: (1) Avalanche method: Pay off highest interest rate loans first to save money. (2) Snowball method: Pay off smallest balances first for psychological wins. (3) Income-Driven Repayment: If you have federal loans and low income, IDR plans cap payments at 5-20% of discretionary income. (4) Refinancing: If you have good credit and stable income, refinancing can lower your rate. Use our calculators to compare options.'
    },
    {
      question: 'Should I pay off student loans or save for retirement?',
      answer: 'Do both if possible! Prioritize: (1) Get employer 401(k) match (free money), (2) Pay minimums on all loans, (3) Pay off high-interest debt (>6-7%), (4) Build emergency fund (3-6 months), (5) Max retirement contributions, (6) Extra loan payments. If your loan rate is low (<4%), investing may yield better returns. Balance is key - use our calculators to model different scenarios.'
    },
    {
      question: 'How can I reduce my student loan interest?',
      answer: 'Several strategies: (1) Make extra payments toward principal, (2) Pay biweekly instead of monthly (13 payments/year), (3) Refinance to lower rate if you qualify, (4) Set up autopay for 0.25% rate discount, (5) Pay more than minimum each month, (6) Make payments while in school if possible. Even $50 extra per month can save thousands in interest. Use our Student Loan Calculator to see the impact.'
    },
    {
      question: 'What GPA do I need to maintain my scholarship?',
      answer: 'Most scholarships require 3.0-3.5 GPA (B to B+ average). Check your specific scholarship requirements. Use our Grade/GPA Calculator to: (1) Calculate what grades you need on finals, (2) Project your semester GPA, (3) Plan to maintain your cumulative GPA. If you\'re at risk, consider: lighter course load, tutoring, office hours, or speaking with your academic advisor early.'
    },
    {
      question: 'How much should I save for college?',
      answer: 'Average 4-year costs: Public in-state: $40k-80k, Public out-of-state: $100k-150k, Private: $150k-300k. Start saving early! $200/month from birth at 6% = $77,000 by age 18. Use our College Savings Calculator to: (1) Calculate monthly savings needed, (2) See compound interest impact, (3) Compare 529 plans vs other options. Even partial savings significantly reduces loan burden.'
    },
    {
      question: 'What are the best free calculators for students?',
      answer: 'Our platform offers 12 free calculators: Financial (Student Loan, Budget Planner, TVM), Academic (Scientific, Statistics, Graphing, Physics Solver, Citation Formatter, Grade/GPA), Student Finance (IDR Estimator, Roommate Splitter, College Savings). All are free, no registration required, mobile-friendly, and include educational content. Perfect for managing finances, coursework, and academic planning.'
    },
    {
      question: 'How do I calculate my monthly student loan payment?',
      answer: 'Use our Student Loan Calculator! Enter: (1) Total loan amount, (2) Interest rate (check your loan documents), (3) Repayment term (typically 10 years = 120 months). The calculator shows: monthly payment, total interest paid, amortization schedule. For federal loans with income-based options, use our IDR Estimator. Most graduates pay $200-400/month depending on loan amount and rate.'
    },
    {
      question: 'What is compound interest and why does it matter?',
      answer: 'Compound interest is "interest on interest" - you earn returns on your initial investment plus accumulated interest. Example: $10,000 at 7% for 30 years = $76,123 (vs $31,000 with simple interest). For loans, it works against you - interest accrues on unpaid interest. For savings/investments, it works for you. Start early! Use our TVM Calculator to see compound interest in action. The earlier you start, the more you benefit.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <HelpCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Student Financial Planning Help Center
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your complete guide to student loans, budgeting, academic planning, and financial success. Free calculators, expert advice, and comprehensive resources for college students.
          </p>
        </div>

        {/* Why Choose Our Platform */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Students Trust Our Platform</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">100% Free</h3>
              <p className="text-gray-600">
                All 12 calculators are completely free. No hidden fees, no registration required, no credit card needed. Your data stays private in your browser.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Accurate & Reliable</h3>
              <p className="text-gray-600">
                Built using standard financial formulas and up-to-date federal guidelines. Trusted by thousands of students for financial planning and academic success.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <Lightbulb className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">AI-Powered Help</h3>
              <p className="text-gray-600">
                24/7 AI Assistant answers your questions instantly. Get personalized guidance on calculators, student loans, budgeting, and academic planning.
              </p>
            </div>
          </div>
        </div>

        {/* Popular Topics */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Popular Student Finance Topics</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <DollarSign className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-bold text-gray-900">Student Loan Management</h3>
              </div>
              <p className="text-gray-700 mb-3">
                Learn how to calculate monthly payments, understand interest rates, compare repayment plans, and save thousands with extra payments.
              </p>
              <Link to="/calculators/student-loan" className="text-blue-600 hover:text-blue-700 font-semibold">
                Use Student Loan Calculator →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl font-bold text-gray-900">Income-Driven Repayment</h3>
              </div>
              <p className="text-gray-700 mb-3">
                Federal IDR plans cap payments at 5-20% of discretionary income. Perfect for graduates with lower starting salaries or pursuing public service.
              </p>
              <Link to="/student-finance/idr-estimator" className="text-blue-600 hover:text-blue-700 font-semibold">
                Calculate IDR Payment →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <GraduationCap className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">GPA & Grade Planning</h3>
              </div>
              <p className="text-gray-700 mb-3">
                Calculate what grades you need on finals to achieve your target GPA. Essential for maintaining scholarships and academic standing.
              </p>
              <Link to="/academic/grade-calculator" className="text-blue-600 hover:text-blue-700 font-semibold">
                Use Grade Calculator →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <DollarSign className="w-6 h-6 text-teal-600" />
                <h3 className="text-xl font-bold text-gray-900">College Savings Planning</h3>
              </div>
              <p className="text-gray-700 mb-3">
                Calculate monthly savings needed to reach college cost goals. See the power of compound interest and compare 529 plans vs other options.
              </p>
              <Link to="/student-finance/college-savings" className="text-blue-600 hover:text-blue-700 font-semibold">
                Plan College Savings →
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Support */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">AI Assistant</h2>
            </div>
            <p className="text-gray-700 mb-4">
              Get instant answers to your questions! Our AI Assistant is available 24/7 to help you navigate calculators 
              and understand student finance concepts.
            </p>
            <button
              onClick={() => {
                const event = new CustomEvent('openAIAssistant');
                window.dispatchEvent(event);
              }}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Chat with AI Assistant
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Book className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Explore All Calculators</h2>
            </div>
            <p className="text-gray-700 mb-4">
              Browse our complete collection of 12 free calculators. Each includes detailed guides, examples, and comprehensive FAQs to help you succeed.
            </p>
            <Link
              to="/calculators"
              className="block w-full bg-gradient-to-r from-green-600 to-teal-600 text-white text-center py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              View All Calculators
            </Link>
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <div>✓ 3 Financial Calculators</div>
              <div>✓ 6 Academic Calculators</div>
              <div>✓ 3 Student Finance Tools</div>
            </div>
          </div>
        </div>

        {/* Additional Help */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-xl p-8 text-center">
          <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Still Need Help?</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            If you can't find what you're looking for, try asking our AI Assistant or check the detailed guides 
            on each calculator page. We're constantly improving our tools based on student feedback!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/about"
              className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              About Us
            </Link>
            <Link
              to="/insights"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              AI Insights
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
