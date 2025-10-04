import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  suggestions?: string[];
}

interface KnowledgeBase {
  [key: string]: {
    response: string;
    suggestions?: string[];
    action?: {
      type: 'navigate';
      path: string;
    };
  };
}

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Knowledge base with responses
  const knowledgeBase: KnowledgeBase = {
    // Greetings
    'hello|hi|hey': {
      response: "Hi! I'm your AI Student Finance Assistant. I can help you with student loans, budgeting, and financial planning. What would you like to know?",
      suggestions: [
        "How do I calculate my loan payments?",
        "What is an IDR plan?",
        "Help me split expenses with roommates"
      ]
    },
    
    // Student Loans
    'student loan|loan payment|loan calculator': {
      response: "I can help you calculate your student loan payments! Our Student Loan Calculator shows monthly payments, total interest, and amortization schedules. Would you like me to take you there?",
      suggestions: [
        "Yes, take me to the calculator",
        "Tell me about IDR plans",
        "What's the difference between federal and private loans?"
      ],
      action: { type: 'navigate', path: '/calculators/student-loan' }
    },

    // IDR Plans
    'idr|income driven|income-driven|repayment plan|save|paye|repaye': {
      response: "Income-Driven Repayment (IDR) plans set your monthly payment based on your income and family size. The SAVE plan offers the lowest payments at 5% of discretionary income. I can help you estimate your payment!",
      suggestions: [
        "Calculate my IDR payment",
        "Which IDR plan is best for me?",
        "What is discretionary income?"
      ],
      action: { type: 'navigate', path: '/student-finance/idr-estimator' }
    },

    // Roommate Expenses
    'roommate|split|expense|rent|utilities|bills': {
      response: "Need to split expenses with roommates? Our Roommate Expense Splitter handles equal and custom splits for rent, utilities, groceries, and more. It shows you exactly who owes what!",
      suggestions: [
        "Open the expense splitter",
        "How do I split rent by room size?",
        "What expenses should be shared?"
      ],
      action: { type: 'navigate', path: '/student-finance/roommate-expense-splitter' }
    },

    // Scientific Calculator
    'scientific|calculator|math|calculus|trigonometry|sin|cos|tan': {
      response: "Our Scientific Calculator handles trigonometry, logarithms, exponents, and more. Perfect for calculus, physics, and engineering courses. It supports both radians and degrees!",
      suggestions: [
        "Open scientific calculator",
        "How do I use trigonometric functions?",
        "What's the difference between radians and degrees?"
      ],
      action: { type: 'navigate', path: '/calculators/scientific' }
    },

    // Statistics
    'statistics|stats|mean|median|standard deviation|variance': {
      response: "Need to calculate statistics? Our Statistics Calculator computes mean, median, mode, standard deviation, variance, and more. Great for research projects and data analysis!",
      suggestions: [
        "Open statistics calculator",
        "When should I use mean vs median?",
        "What is standard deviation?"
      ],
      action: { type: 'navigate', path: '/academic/statistics' }
    },

    // Graphing
    'graph|graphing|plot|function|parabola|equation': {
      response: "Our Graphing Calculator plots functions, finds roots, and shows tables of values. Perfect for calculus, physics, and engineering. You can zoom, pan, and analyze functions visually!",
      suggestions: [
        "Open graphing calculator",
        "How do I graph a parabola?",
        "What functions are supported?"
      ],
      action: { type: 'navigate', path: '/academic/graphing' }
    },

    // Refinancing
    'refinance|refinancing|lower interest|consolidate': {
      response: "Refinancing can lower your interest rate and monthly payment, but you'll lose federal benefits like IDR and forgiveness. It's best for high-income borrowers with good credit and private loans.",
      suggestions: [
        "Learn about refinancing",
        "Should I refinance federal loans?",
        "What are the risks?"
      ],
      action: { type: 'navigate', path: '/refinancing' }
    },

    // Loan Comparison
    'compare|comparison|which loan|best loan': {
      response: "Use our Loan Comparison tool to compare different loan offers side-by-side. You can see monthly payments, total interest, and total cost to make the best decision.",
      suggestions: [
        "Open loan comparison",
        "Federal vs private loans?",
        "What should I compare?"
      ],
      action: { type: 'navigate', path: '/comparison' }
    },

    // Budgeting
    'budget|budgeting|save money|expenses|spending|income|planner': {
      response: "Smart budgeting is key to managing student finances! Our Student Budget Planner helps you track income vs expenses and see your net monthly total. Perfect for managing day-to-day money!",
      suggestions: [
        "Open budget planner",
        "Help me split expenses",
        "Tips for saving money"
      ],
      action: { type: 'navigate', path: '/calculators/budget-planner' }
    },

    // Financial Advice
    'should i|advice|recommend|help me decide': {
      response: "I can provide guidance on financial decisions! Tell me more about your situation:\n\n• Are you comparing loan options?\n• Considering refinancing?\n• Planning your repayment strategy?\n• Budgeting for college expenses?",
      suggestions: [
        "Should I refinance my loans?",
        "Which IDR plan is best?",
        "How much can I afford to borrow?"
      ]
    },

    // Federal vs Private
    'federal|private|difference|which loan': {
      response: "Federal loans offer benefits like IDR plans, forgiveness options, and flexible repayment. Private loans may have lower rates but fewer protections. Always max out federal loans before considering private loans!",
      suggestions: [
        "Calculate federal loan payment",
        "Learn about IDR plans",
        "Compare loan options"
      ]
    },

    // Forgiveness
    'forgiveness|pslf|public service': {
      response: "Public Service Loan Forgiveness (PSLF) forgives federal loans after 10 years of qualifying payments while working for government or non-profit. IDR plans offer forgiveness after 20-25 years. Both require staying on qualifying repayment plans!",
      suggestions: [
        "Calculate my IDR payment",
        "Am I eligible for PSLF?",
        "What counts as public service?"
      ]
    },

    // Interest Rates
    'interest|interest rate|apr': {
      response: "Interest rates significantly impact your total loan cost. Federal rates are fixed and set by Congress. Private rates vary by lender and credit score. Even a 1% difference can save thousands over the loan term!",
      suggestions: [
        "Calculate my loan with interest",
        "Should I refinance for lower rate?",
        "Compare loan offers"
      ]
    },

    // Default/Fallback
    'default': {
      response: "I'm not sure I understand. I can help you with:\n\n• Student loan calculations\n• IDR payment estimates\n• Roommate expense splitting\n• Scientific, statistics, and graphing calculators\n• Loan refinancing advice\n\nWhat would you like help with?",
      suggestions: [
        "Calculate loan payments",
        "Estimate IDR payment",
        "Split roommate expenses"
      ]
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Welcome message when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: "Hi! I'm your AI Student Finance Assistant. I can help you with student loans, calculators, and financial planning. What can I help you with today?",
        sender: 'ai',
        timestamp: new Date(),
        suggestions: [
          "Calculate my student loan payment",
          "What is an IDR plan?",
          "Help me split expenses with roommates",
          "I need a scientific calculator"
        ]
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  // Find matching response from knowledge base
  const findResponse = (userInput: string): typeof knowledgeBase[string] => {
    const input = userInput.toLowerCase();
    
    for (const [pattern, response] of Object.entries(knowledgeBase)) {
      if (pattern === 'default') continue;
      
      const keywords = pattern.split('|');
      if (keywords.some(keyword => input.includes(keyword))) {
        return response;
      }
    }
    
    return knowledgeBase['default'];
  };

  // Handle sending message
  const handleSend = () => {
    if (!inputValue.trim()) return;

    const currentInput = inputValue;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: currentInput,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const response = findResponse(currentInput);
      
      // Check if user wants to navigate
      if (response.action && (currentInput.toLowerCase().includes('yes') || currentInput.toLowerCase().includes('open') || currentInput.toLowerCase().includes('take me'))) {
        navigate(response.action.path);
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: `Great! Taking you to the ${response.action.path.split('/').pop()?.replace(/-/g, ' ')} now...`,
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
        setTimeout(() => setIsOpen(false), 1000);
        return;
      }
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.response,
        sender: 'ai',
        timestamp: new Date(),
        suggestions: response.suggestions
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 800);
  };

  // Handle suggestion click
  const handleSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 z-50 group"
          aria-label="Open AI Assistant"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Ask AI Assistant
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">AI Assistant</h3>
                <p className="text-xs text-white/80">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id}>
                <div className={`flex items-start gap-2 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'ai' 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {message.sender === 'ai' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                  </div>
                  <div className={`max-w-[75%] ${message.sender === 'user' ? 'text-right' : ''}`}>
                    <div className={`inline-block p-3 rounded-2xl ${
                      message.sender === 'ai'
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                {/* Suggestions */}
                {message.suggestions && message.sender === 'ai' && (
                  <div className="ml-10 mt-2 flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestion(suggestion)}
                        className="text-xs px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="bg-gray-100 p-3 rounded-2xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
