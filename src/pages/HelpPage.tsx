import React from 'react';
import { HelpCircle, Calculator, DollarSign, Users, BarChart, FunctionSquare, FileText, Book, MessageCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const HelpPage: React.FC = () => {
  const calculatorHelp = [
    {
      title: 'Student Loan Calculator',
      icon: DollarSign,
      description: 'Calculate monthly payments, total interest, and view amortization schedules for your student loans.',
      link: '/calculators/student-loan',
      color: 'from-blue-500 to-purple-500'
    },
    {
      title: 'IDR Estimator',
      icon: FileText,
      description: 'Estimate payments under Income-Driven Repayment plans (SAVE, PAYE, REPAYE, IBR, ICR).',
      link: '/student-finance/idr-estimator',
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Roommate Expense Splitter',
      icon: Users,
      description: 'Split shared expenses fairly with equal or custom splits for rent, utilities, and more.',
      link: '/student-finance/roommate-expense-splitter',
      color: 'from-blue-500 to-purple-500'
    },
    {
      title: 'Scientific Calculator',
      icon: Calculator,
      description: 'Perform advanced calculations with trigonometry, logarithms, and scientific functions.',
      link: '/calculators/scientific',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Statistics Calculator',
      icon: BarChart,
      description: 'Calculate mean, median, mode, standard deviation, variance, and other statistics.',
      link: '/academic/statistics',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Graphing Calculator',
      icon: FunctionSquare,
      description: 'Plot functions, find roots, view tables of values, and analyze mathematical relationships.',
      link: '/academic/graphing',
      color: 'from-blue-500 to-teal-500'
    }
  ];

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
            Help Center
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get help with our calculators, learn about student loans, and find answers to common questions.
          </p>
        </div>

        {/* Quick Links to Calculators */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Calculator Guides</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calculatorHelp.map((calc, index) => {
              const Icon = calc.icon;
              return (
                <Link
                  key={index}
                  to={calc.link}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <div className={`h-2 bg-gradient-to-r ${calc.color}`}></div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${calc.color}`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {calc.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {calc.description}
                    </p>
                  </div>
                </Link>
              );
            })}
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
              <h2 className="text-2xl font-bold text-gray-900">Learning Resources</h2>
            </div>
            <p className="text-gray-700 mb-4">
              Each calculator includes detailed guides, examples, and FAQs. Scroll down on any calculator page to learn 
              more about how to use it and understand the concepts.
            </p>
            <div className="space-y-2">
              <Link to="/calculators" className="block text-blue-600 hover:text-blue-700 font-medium">
                → Financial Calculators
              </Link>
              <Link to="/academic" className="block text-blue-600 hover:text-blue-700 font-medium">
                → Academic Calculators
              </Link>
              <Link to="/student-finance" className="block text-blue-600 hover:text-blue-700 font-medium">
                → Student Finance & Planning
              </Link>
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
