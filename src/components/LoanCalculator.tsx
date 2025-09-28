import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, TrendingUp, Brain, AlertCircle, CheckCircle } from 'lucide-react';

interface LoanData {
  principal: number;
  interestRate: number;
  termYears: number;
  extraPayment: number;
  income: number;
  repaymentPlan: 'standard' | 'graduated' | 'income-driven';
}

interface CalculationResults {
  monthlyPayment: number;
  totalInterest: number;
  totalAmount: number;
  payoffTime: number;
  monthlyPaymentWithExtra: number;
  totalInterestWithExtra: number;
  timeSaved: number;
  interestSaved: number;
}

const LoanCalculator: React.FC = () => {
  const [loanData, setLoanData] = useState<LoanData>({
    principal: 30000,
    interestRate: 5.5,
    termYears: 10,
    extraPayment: 0,
    income: 50000,
    repaymentPlan: 'standard'
  });

  const [results, setResults] = useState<CalculationResults | null>(null);
  const [activeTab, setActiveTab] = useState<'calculator' | 'comparison' | 'insights'>('calculator');

  useEffect(() => {
    calculateLoan();
  }, [loanData]);

  const calculateLoan = () => {
    const { principal, interestRate, termYears, extraPayment } = loanData;
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = termYears * 12;

    // Standard monthly payment
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                          (Math.pow(1 + monthlyRate, totalPayments) - 1);
    
    const totalAmount = monthlyPayment * totalPayments;
    const totalInterest = totalAmount - principal;

    // With extra payment
    const monthlyPaymentWithExtra = monthlyPayment + extraPayment;
    let remainingBalance = principal;
    let totalInterestWithExtra = 0;
    let monthsToPayoff = 0;

    while (remainingBalance > 0.01 && monthsToPayoff < totalPayments) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = Math.min(monthlyPaymentWithExtra - interestPayment, remainingBalance);
      
      totalInterestWithExtra += interestPayment;
      remainingBalance -= principalPayment;
      monthsToPayoff++;
    }

    const timeSaved = totalPayments - monthsToPayoff;
    const interestSaved = totalInterest - totalInterestWithExtra;

    setResults({
      monthlyPayment,
      totalInterest,
      totalAmount,
      payoffTime: totalPayments,
      monthlyPaymentWithExtra,
      totalInterestWithExtra,
      timeSaved: timeSaved / 12,
      interestSaved
    });
  };

  const getAIInsights = () => {
    if (!results) return [];

    const insights = [];
    const debtToIncomeRatio = (results.monthlyPayment * 12) / loanData.income;

    if (debtToIncomeRatio > 0.1) {
      insights.push({
        type: 'warning',
        message: 'Your debt-to-income ratio is high. Consider income-driven repayment plans.',
        action: 'Switch to income-driven repayment'
      });
    }

    if (loanData.extraPayment === 0) {
      const suggestedExtra = Math.floor(loanData.income * 0.02 / 12);
      insights.push({
        type: 'suggestion',
        message: `Adding $${suggestedExtra}/month could save you $${Math.floor(results.interestSaved)} in interest.`,
        action: 'Consider extra payments'
      });
    }

    if (loanData.interestRate > 6) {
      insights.push({
        type: 'opportunity',
        message: 'Your interest rate is above average. Consider refinancing to potentially save money.',
        action: 'Explore refinancing options'
      });
    }

    return insights;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatYears = (years: number) => {
    const wholeYears = Math.floor(years);
    const months = Math.floor((years - wholeYears) * 12);
    return `${wholeYears}y ${months}m`;
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <img src="/Logo.png" alt="AI Student Loan Calculator" className="h-20 w-auto max-w-sm" />
            Get intelligent insights and optimize your student loan repayment strategy with AI-powered recommendations
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl p-1 shadow-lg">
            {(['calculator', 'comparison', 'insights'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-medium transition-all capitalize ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          {activeTab === 'calculator' && (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Panel */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/50">
                <div className="flex items-center mb-6">
                  <Calculator className="w-6 h-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-800">Loan Details</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Amount
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        value={loanData.principal}
                        onChange={(e) => setLoanData(prev => ({ ...prev, principal: Number(e.target.value) }))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="30000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interest Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={loanData.interestRate}
                      onChange={(e) => setLoanData(prev => ({ ...prev, interestRate: Number(e.target.value) }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="5.5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Term (Years)
                    </label>
                    <input
                      type="number"
                      value={loanData.termYears}
                      onChange={(e) => setLoanData(prev => ({ ...prev, termYears: Number(e.target.value) }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="10"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Extra Monthly Payment
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        value={loanData.extraPayment}
                        onChange={(e) => setLoanData(prev => ({ ...prev, extraPayment: Number(e.target.value) }))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Income
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        value={loanData.income}
                        onChange={(e) => setLoanData(prev => ({ ...prev, income: Number(e.target.value) }))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="50000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Repayment Plan
                    </label>
                    <select
                      value={loanData.repaymentPlan}
                      onChange={(e) => setLoanData(prev => ({ ...prev, repaymentPlan: e.target.value as any }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="standard">Standard</option>
                      <option value="graduated">Graduated</option>
                      <option value="income-driven">Income-Driven</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Results Panel */}
              {results && (
                <div className="space-y-6">
                  {/* Monthly Payment Card */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
                    <div className="flex items-center mb-4">
                      <TrendingUp className="w-6 h-6 mr-3" />
                      <h3 className="text-xl font-bold">Monthly Payment</h3>
                    </div>
                    <div className="text-4xl font-bold mb-2">
                      {formatCurrency(results.monthlyPayment)}
                    </div>
                    <p className="text-blue-100">Standard repayment</p>
                    {loanData.extraPayment > 0 && (
                      <div className="mt-4 pt-4 border-t border-white/20">
                        <p className="text-sm text-blue-100 mb-1">With extra payment:</p>
                        <p className="text-2xl font-bold">{formatCurrency(results.monthlyPaymentWithExtra)}</p>
                      </div>
                    )}
                  </div>

                  {/* Summary Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/50">
                      <h4 className="font-semibold text-gray-800 mb-2">Total Interest</h4>
                      <p className="text-2xl font-bold text-red-600">{formatCurrency(results.totalInterest)}</p>
                      {loanData.extraPayment > 0 && (
                        <p className="text-sm text-gray-600 mt-1">
                          With extra: {formatCurrency(results.totalInterestWithExtra)}
                        </p>
                      )}
                    </div>

                    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/50">
                      <h4 className="font-semibold text-gray-800 mb-2">Payoff Time</h4>
                      <p className="text-2xl font-bold text-blue-600">{formatYears(results.payoffTime / 12)}</p>
                      {loanData.extraPayment > 0 && (
                        <p className="text-sm text-gray-600 mt-1">
                          Save: {formatYears(results.timeSaved)}
                        </p>
                      )}
                    </div>
                  </div>

                  {loanData.extraPayment > 0 && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                      <div className="flex items-center mb-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        <h4 className="font-semibold text-green-800">Extra Payment Benefits</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <p className="text-sm text-green-600 mb-1">Interest Saved</p>
                          <p className="text-xl font-bold text-green-800">{formatCurrency(results.interestSaved)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-green-600 mb-1">Time Saved</p>
                          <p className="text-xl font-bold text-green-800">{formatYears(results.timeSaved)}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'insights' && results && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/50">
                <div className="flex items-center mb-8">
                  <Brain className="w-6 h-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-800">AI-Powered Insights</h2>
                </div>

                <div className="space-y-6">
                  {getAIInsights().map((insight, index) => (
                    <div
                      key={index}
                      className={`p-6 rounded-xl border-l-4 ${
                        insight.type === 'warning'
                          ? 'bg-yellow-50 border-yellow-400'
                          : insight.type === 'suggestion'
                          ? 'bg-blue-50 border-blue-400'
                          : 'bg-green-50 border-green-400'
                      }`}
                    >
                      <div className="flex items-start">
                        <AlertCircle className={`w-5 h-5 mt-1 mr-3 ${
                          insight.type === 'warning'
                            ? 'text-yellow-600'
                            : insight.type === 'suggestion'
                            ? 'text-blue-600'
                            : 'text-green-600'
                        }`} />
                        <div className="flex-1">
                          <p className="text-gray-800 mb-2">{insight.message}</p>
                          <button className={`text-sm font-medium hover:underline ${
                            insight.type === 'warning'
                              ? 'text-yellow-700'
                              : insight.type === 'suggestion'
                              ? 'text-blue-700'
                              : 'text-green-700'
                          }`}>
                            {insight.action} →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Financial Health Score */}
                  <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-6 text-white">
                    <h3 className="text-lg font-bold mb-4">Financial Health Score</h3>
                    <div className="flex items-center">
                      <div className="flex-1">
                        <div className="w-full bg-white/20 rounded-full h-3 mb-2">
                          <div
                            className="bg-white h-3 rounded-full transition-all duration-1000"
                            style={{ width: '75%' }}
                          ></div>
                        </div>
                        <p className="text-sm text-green-100">
                          Your loan management strategy is on track
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold">75</div>
                        <div className="text-sm text-green-100">out of 100</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;