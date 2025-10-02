import React, { useState } from 'react';
import { TrendingDown, DollarSign, Calendar, CheckCircle, AlertCircle, Calculator, ArrowRight, Info } from 'lucide-react';

const RefinancingGuide: React.FC = () => {
  const [currentRate, setCurrentRate] = useState<string>('');
  const [newRate, setNewRate] = useState<string>('');
  const [loanBalance, setLoanBalance] = useState<string>('');
  const [remainingMonths, setRemainingMonths] = useState<string>('');
  const [showResults, setShowResults] = useState(false);

  const calculateSavings = () => {
    const current = parseFloat(currentRate);
    const newR = parseFloat(newRate);
    const balance = parseFloat(loanBalance);
    const months = parseInt(remainingMonths);

    if (current && newR && balance && months) {
      setShowResults(true);
    }
  };

  const getSavings = () => {
    const current = parseFloat(currentRate) / 100 / 12;
    const newR = parseFloat(newRate) / 100 / 12;
    const balance = parseFloat(loanBalance);
    const months = parseInt(remainingMonths);

    const currentPayment = balance * (current * Math.pow(1 + current, months)) / (Math.pow(1 + current, months) - 1);
    const newPayment = balance * (newR * Math.pow(1 + newR, months)) / (Math.pow(1 + newR, months) - 1);
    
    const totalCurrentCost = currentPayment * months;
    const totalNewCost = newPayment * months;
    const totalSavings = totalCurrentCost - totalNewCost;
    const monthlySavings = currentPayment - newPayment;

    return {
      monthlySavings: monthlySavings.toFixed(2),
      totalSavings: totalSavings.toFixed(2),
      currentPayment: currentPayment.toFixed(2),
      newPayment: newPayment.toFixed(2)
    };
  };

  const benefits = [
    {
      icon: <TrendingDown className="w-6 h-6 text-green-500" />,
      title: "Lower Interest Rate",
      description: "Reduce your interest rate and save thousands over the life of your loan"
    },
    {
      icon: <DollarSign className="w-6 h-6 text-blue-500" />,
      title: "Lower Monthly Payments",
      description: "Free up cash flow with reduced monthly payment obligations"
    },
    {
      icon: <Calendar className="w-6 h-6 text-purple-500" />,
      title: "Flexible Terms",
      description: "Choose a repayment term that fits your financial goals and timeline"
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-indigo-500" />,
      title: "Simplified Payments",
      description: "Consolidate multiple loans into one easy monthly payment"
    }
  ];

  const eligibilityFactors = [
    { factor: "Credit Score", requirement: "Generally 650+ for best rates", icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
    { factor: "Employment Status", requirement: "Stable income and employment history", icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
    { factor: "Debt-to-Income Ratio", requirement: "Typically below 50%", icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
    { factor: "Graduation Status", requirement: "Most lenders require degree completion", icon: <CheckCircle className="w-5 h-5 text-green-500" /> }
  ];

  const steps = [
    {
      step: 1,
      title: "Check Your Credit Score",
      description: "Review your credit report and score to understand your refinancing options"
    },
    {
      step: 2,
      title: "Compare Lenders",
      description: "Research and compare rates, terms, and benefits from multiple lenders"
    },
    {
      step: 3,
      title: "Get Pre-Qualified",
      description: "Submit applications for pre-qualification without affecting your credit score"
    },
    {
      step: 4,
      title: "Choose Your Offer",
      description: "Select the best offer based on rate, terms, and lender reputation"
    },
    {
      step: 5,
      title: "Complete Application",
      description: "Submit your full application with required documentation"
    },
    {
      step: 6,
      title: "Close Your Loan",
      description: "Review and sign your loan documents to complete the refinancing process"
    }
  ];

  const considerations = [
    {
      title: "Loss of Federal Benefits",
      description: "Refinancing federal loans with a private lender means losing access to federal protections like income-driven repayment plans and loan forgiveness programs.",
      type: "warning"
    },
    {
      title: "Extended Repayment Period",
      description: "While lower monthly payments are attractive, extending your loan term may result in paying more interest over time.",
      type: "info"
    },
    {
      title: "Variable vs Fixed Rates",
      description: "Variable rates may start lower but can increase over time. Fixed rates provide payment stability but may be higher initially.",
      type: "info"
    }
  ];

  return (
    <section id="refinancing" className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6">
            <TrendingDown className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Student Loan Refinancing Guide
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how refinancing can help you save money and simplify your student loan repayment
          </p>
        </div>

        {/* Savings Calculator */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <Calculator className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Refinancing Savings Calculator</h3>
            </div>
            <p className="text-gray-600 mb-6">
              See how much you could save by refinancing your student loans
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Interest Rate (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={currentRate}
                  onChange={(e) => setCurrentRate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 6.8"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Interest Rate (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={newRate}
                  onChange={(e) => setNewRate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 4.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Loan Balance ($)
                </label>
                <input
                  type="number"
                  value={loanBalance}
                  onChange={(e) => setLoanBalance(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 50000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Remaining Months
                </label>
                <input
                  type="number"
                  value={remainingMonths}
                  onChange={(e) => setRemainingMonths(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 120"
                />
              </div>
            </div>

            <button
              onClick={calculateSavings}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center"
            >
              Calculate Savings
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>

            {showResults && currentRate && newRate && loanBalance && remainingMonths && (
              <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border-2 border-green-200">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Your Potential Savings</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Monthly Savings</p>
                    <p className="text-3xl font-bold text-green-600">${getSavings().monthlySavings}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Total Savings</p>
                    <p className="text-3xl font-bold text-green-600">${getSavings().totalSavings}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Current Monthly Payment</p>
                    <p className="text-2xl font-bold text-gray-900">${getSavings().currentPayment}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">New Monthly Payment</p>
                    <p className="text-2xl font-bold text-blue-600">${getSavings().newPayment}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Benefits of Refinancing
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-4">{benefit.icon}</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Eligibility */}
        <div className="mb-16 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Eligibility Requirements</h3>
            <p className="text-gray-600 mb-8">
              While requirements vary by lender, here are common factors that affect your eligibility:
            </p>
            <div className="space-y-4">
              {eligibilityFactors.map((item, index) => (
                <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                  <div className="mr-4 mt-1">{item.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{item.factor}</h4>
                    <p className="text-gray-600 text-sm">{item.requirement}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            How to Refinance Your Student Loans
          </h3>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-6">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h4>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Important Considerations */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Important Considerations</h3>
            <p className="text-gray-600 mb-8">
              Before refinancing, make sure you understand these key factors:
            </p>
            <div className="space-y-4">
              {considerations.map((item, index) => (
                <div key={index} className={`p-6 rounded-lg border-l-4 ${
                  item.type === 'warning' 
                    ? 'bg-amber-50 border-amber-500' 
                    : 'bg-blue-50 border-blue-500'
                }`}>
                  <div className="flex items-start">
                    {item.type === 'warning' ? (
                      <AlertCircle className="w-6 h-6 text-amber-600 mr-3 flex-shrink-0 mt-1" />
                    ) : (
                      <Info className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                    )}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-700">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Start Saving?</h3>
            <p className="text-xl mb-8 opacity-90">
              Use our calculator to see how much you could save with refinancing
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all inline-flex items-center"
            >
              Calculate Your Savings
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RefinancingGuide;
