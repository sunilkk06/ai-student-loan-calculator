import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, Mail, Phone, MessageCircle, Book, Calculator, CreditCard, FileText, AlertCircle, CheckCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const HelpCenter: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const faqs: FAQItem[] = [
    {
      category: 'Calculator',
      question: 'How accurate is the loan calculator?',
      answer: 'Our calculator uses standard financial formulas to provide accurate estimates. However, actual loan terms may vary based on your lender, credit score, and other factors. Always verify calculations with your loan servicer.'
    },
    {
      category: 'Calculator',
      question: 'What information do I need to use the calculator?',
      answer: 'You\'ll need your loan amount, interest rate, and loan term (in years). Optional information includes your expected graduation date and any additional monthly payments you plan to make.'
    },
    {
      category: 'Calculator',
      question: 'Can I calculate multiple loans at once?',
      answer: 'Yes! Use our Loan Comparison feature to compare up to three different loan scenarios side by side. This helps you make informed decisions about which loan option is best for you.'
    },
    {
      category: 'Loans',
      question: 'What\'s the difference between federal and private student loans?',
      answer: 'Federal loans are funded by the government and offer benefits like income-driven repayment plans, deferment options, and potential loan forgiveness. Private loans are offered by banks and credit unions, often with variable rates and fewer repayment options.'
    },
    {
      category: 'Loans',
      question: 'What is a good interest rate for a student loan?',
      answer: 'Federal student loan rates are set by Congress and typically range from 4-7%. Private loan rates vary based on your credit score and can range from 3-14%. Generally, rates below 6% are considered competitive.'
    },
    {
      category: 'Loans',
      question: 'Should I choose a fixed or variable interest rate?',
      answer: 'Fixed rates stay the same throughout your loan term, providing payment stability. Variable rates can change based on market conditions - they may start lower but could increase over time. Fixed rates are generally recommended for long-term loans.'
    },
    {
      category: 'Repayment',
      question: 'When do I start repaying my student loans?',
      answer: 'Most student loans have a grace period of 6 months after graduation before repayment begins. However, interest may accrue during school and the grace period, depending on your loan type.'
    },
    {
      category: 'Repayment',
      question: 'What happens if I can\'t make my monthly payment?',
      answer: 'Contact your loan servicer immediately. Options may include deferment, forbearance, or switching to an income-driven repayment plan. Never ignore missed payments as they can damage your credit score.'
    },
    {
      category: 'Repayment',
      question: 'Can I pay off my student loans early?',
      answer: 'Yes! Federal and most private student loans have no prepayment penalties. Paying extra toward your principal can save you thousands in interest over the life of the loan.'
    },
    {
      category: 'Refinancing',
      question: 'When should I consider refinancing my student loans?',
      answer: 'Consider refinancing if you have good credit, stable income, and can qualify for a lower interest rate. However, refinancing federal loans means losing federal benefits like income-driven repayment and loan forgiveness programs.'
    },
    {
      category: 'Refinancing',
      question: 'Will refinancing hurt my credit score?',
      answer: 'Checking rates typically involves a soft credit check that doesn\'t affect your score. Once you formally apply, a hard inquiry may temporarily lower your score by a few points. However, better loan terms can improve your score long-term.'
    },
    {
      category: 'Refinancing',
      question: 'How many times can I refinance my student loans?',
      answer: 'There\'s no limit to how many times you can refinance. Some borrowers refinance multiple times to take advantage of lower rates as their credit improves or market rates decrease.'
    },
    {
      category: 'AI Insights',
      question: 'How does the AI analysis work?',
      answer: 'Our AI analyzes your loan details, compares them to thousands of scenarios, and provides personalized recommendations based on your financial situation. It considers factors like interest rates, loan terms, and repayment strategies.'
    },
    {
      category: 'AI Insights',
      question: 'Is my financial information secure?',
      answer: 'Yes! We use bank-level encryption to protect your data. Your information is never sold to third parties, and all calculations are performed securely. We comply with industry-standard security protocols.'
    },
    {
      category: 'Account',
      question: 'Do I need to create an account to use the calculator?',
      answer: 'No, you can use our basic calculator without an account. However, creating an account allows you to save calculations, track multiple loans, and receive personalized recommendations.'
    },
    {
      category: 'Account',
      question: 'Is the service free?',
      answer: 'Yes! Our calculator and basic features are completely free to use. We may offer premium features in the future, but the core functionality will always remain free.'
    }
  ];

  const categories = ['All', 'Calculator', 'Loans', 'Repayment', 'Refinancing', 'AI Insights', 'Account'];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const contactOptions = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Support',
      description: 'Get help via email',
      contact: 'support@aistudentloancalculator.com',
      color: 'blue'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone Support',
      description: 'Mon-Fri, 9am-6pm EST',
      contact: '1-800-AI-LOANS',
      color: 'green'
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'Live Chat',
      description: 'Chat with our team',
      contact: 'Start Chat',
      color: 'purple'
    }
  ];

  const quickGuides = [
    {
      icon: <Calculator className="w-8 h-8 text-blue-500" />,
      title: 'Using the Calculator',
      description: 'Learn how to get accurate loan estimates',
      link: '#calculator'
    },
    {
      icon: <CreditCard className="w-8 h-8 text-green-500" />,
      title: 'Understanding Interest Rates',
      description: 'How rates affect your total loan cost',
      link: '#insights'
    },
    {
      icon: <FileText className="w-8 h-8 text-purple-500" />,
      title: 'Loan Comparison Guide',
      description: 'Compare multiple loan options effectively',
      link: '#comparison'
    },
    {
      icon: <Book className="w-8 h-8 text-indigo-500" />,
      title: 'Refinancing Basics',
      description: 'When and how to refinance your loans',
      link: '#refinancing'
    }
  ];

  return (
    <section id="help" className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Help Center
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions and get the support you need
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
          </div>
        </div>

        {/* Quick Guides */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Quick Guides</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickGuides.map((guide, index) => (
              <a
                key={index}
                href={guide.link}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="mb-4 group-hover:scale-110 transition-transform">{guide.icon}</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{guide.title}</h4>
                <p className="text-gray-600 text-sm">{guide.description}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="max-w-5xl mx-auto mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-2">
                        {faq.category}
                      </span>
                      <h4 className="text-lg font-semibold text-gray-900">{faq.question}</h4>
                    </div>
                    {openFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0 ml-4" />
                    )}
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 pb-5 text-gray-700 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No results found. Try a different search term.</p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Support */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-4">
              Still Need Help?
            </h3>
            <p className="text-gray-600 text-center mb-10">
              Our support team is here to assist you with any questions
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactOptions.map((option, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl border-2 border-${option.color}-200 hover:border-${option.color}-400 transition-all cursor-pointer group`}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-${option.color}-100 rounded-lg mb-4 group-hover:scale-110 transition-transform`}>
                    <div className={`text-${option.color}-600`}>{option.icon}</div>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{option.title}</h4>
                  <p className="text-gray-600 text-sm mb-3">{option.description}</p>
                  <p className={`text-${option.color}-600 font-semibold`}>{option.contact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
            <CheckCircle className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-4">Educational Resources</h3>
            <p className="text-xl mb-8 opacity-90">
              Explore our comprehensive guides and articles about student loans
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all inline-flex items-center">
              Browse Resources
              <Book className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpCenter;
