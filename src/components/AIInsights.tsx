import React, { useState } from 'react';
import {
  Brain,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Target,
  Lightbulb,
  AlertCircle,
  CheckCircle2,
  Zap,
  PiggyBank,
  Award,
  ArrowRight,
  Sparkles,
  BarChart3,
  Clock,
  Shield
} from 'lucide-react';

const AIInsights: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(35000);
  const [interestRate, setInterestRate] = useState(5.5);
  const [loanTerm, setLoanTerm] = useState(10);
  const [monthlyIncome, setMonthlyIncome] = useState(4000);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const calculateInsights = () => {
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const monthlyPayment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    const totalPaid = monthlyPayment * numberOfPayments;
    const totalInterest = totalPaid - loanAmount;
    const debtToIncomeRatio = (monthlyPayment / monthlyIncome) * 100;

    return {
      monthlyPayment,
      totalPaid,
      totalInterest,
      debtToIncomeRatio,
    };
  };

  const insights = calculateInsights();

  const getFinancialHealthScore = () => {
    let score = 100;
    if (insights.debtToIncomeRatio > 20) score -= 20;
    if (insights.debtToIncomeRatio > 30) score -= 20;
    if (interestRate > 6) score -= 15;
    if (loanTerm > 10) score -= 15;
    if (loanAmount > 40000) score -= 10;
    return Math.max(score, 0);
  };

  const healthScore = getFinancialHealthScore();

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <section id="insights" className="bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">Powered by AI</span>
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-4">AI-Powered Insights</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get personalized recommendations and deep analysis of your student loan strategy
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Input Panel */}
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Your Loan Details</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Total Loan Amount</span>
                  <span className="text-lg font-bold text-blue-600">${loanAmount.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min="5000"
                  max="150000"
                  step="1000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-3 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div>
                <label className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Interest Rate</span>
                  <span className="text-lg font-bold text-blue-600">{interestRate.toFixed(2)}%</span>
                </label>
                <input
                  type="range"
                  min="2"
                  max="12"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-3 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div>
                <label className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Loan Term (Years)</span>
                  <span className="text-lg font-bold text-blue-600">{loanTerm} years</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full h-3 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div>
                <label className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Monthly Income</span>
                  <span className="text-lg font-bold text-blue-600">${monthlyIncome.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min="1500"
                  max="15000"
                  step="100"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="w-full h-3 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <button
                onClick={() => setShowAnalysis(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all flex items-center justify-center space-x-2 group"
              >
                <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>Generate AI Analysis</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            {/* Financial Health Score */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Financial Health Score</h3>
                <Shield className="w-6 h-6 text-gray-400" />
              </div>
              <div className="relative">
                <div className="flex items-center justify-center mb-4">
                  <div className={`relative w-40 h-40 rounded-full ${getScoreBgColor(healthScore)} flex items-center justify-center`}>
                    <div className="text-center">
                      <div className={`text-5xl font-bold ${getScoreColor(healthScore)}`}>{healthScore}</div>
                      <div className="text-sm text-gray-600 font-medium">out of 100</div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-gray-600">
                    {healthScore >= 80 && "Excellent! Your loan strategy is strong."}
                    {healthScore >= 60 && healthScore < 80 && "Good, but there's room for improvement."}
                    {healthScore < 60 && "Consider adjusting your loan terms."}
                  </p>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-2">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-600">Monthly Payment</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  ${insights.monthlyPayment.toFixed(0)}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-2">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-gray-600">Debt-to-Income</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {insights.debtToIncomeRatio.toFixed(1)}%
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium text-gray-600">Total Interest</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  ${insights.totalInterest.toFixed(0)}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-2">
                  <PiggyBank className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-600">Total Paid</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  ${insights.totalPaid.toFixed(0)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        {showAnalysis && (
          <div className="mt-8 max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 text-white">
              <div className="flex items-center space-x-3 mb-6">
                <Sparkles className="w-8 h-8" />
                <h3 className="text-3xl font-bold">AI-Generated Recommendations</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Recommendation Cards */}
                {insights.debtToIncomeRatio > 25 && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-lg mb-2">High Debt-to-Income Ratio</h4>
                        <p className="text-white/90 text-sm leading-relaxed">
                          Your debt-to-income ratio of {insights.debtToIncomeRatio.toFixed(1)}% is above the recommended 20%.
                          Consider increasing your income or extending your loan term to reduce monthly payments.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {interestRate > 6 && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="flex items-start space-x-3">
                      <Lightbulb className="w-6 h-6 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-lg mb-2">Refinancing Opportunity</h4>
                        <p className="text-white/90 text-sm leading-relaxed">
                          Your interest rate of {interestRate.toFixed(2)}% is relatively high. Refinancing could
                          potentially save you ${(insights.totalInterest * 0.15).toFixed(0)} over the life of your loan.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {loanTerm > 15 && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="flex items-start space-x-3">
                      <Clock className="w-6 h-6 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-lg mb-2">Long Repayment Period</h4>
                        <p className="text-white/90 text-sm leading-relaxed">
                          Your {loanTerm}-year term means more interest. Shortening to 10 years could save you
                          approximately ${(insights.totalInterest * 0.3).toFixed(0)} in interest payments.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {insights.debtToIncomeRatio < 20 && healthScore >= 80 && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="flex items-start space-x-3">
                      <Award className="w-6 h-6 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-lg mb-2">Excellent Position</h4>
                        <p className="text-white/90 text-sm leading-relaxed">
                          Your loan strategy is well-balanced! Consider making extra payments to reduce interest
                          and pay off your loan faster while maintaining financial flexibility.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-start space-x-3">
                    <Target className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-lg mb-2">Accelerated Payment Strategy</h4>
                      <p className="text-white/90 text-sm leading-relaxed">
                        Adding just $100 extra per month could save you ${(insights.totalInterest * 0.12).toFixed(0)}
                        in interest and help you pay off your loan {Math.round(loanTerm * 0.2)} years earlier.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-lg mb-2">Emergency Fund Priority</h4>
                      <p className="text-white/90 text-sm leading-relaxed">
                        Build an emergency fund of ${(insights.monthlyPayment * 6).toFixed(0)} (6 months of payments)
                        before making aggressive extra payments to maintain financial security.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/20">
                <div className="flex items-start space-x-3">
                  <Brain className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-2">Personalized Action Plan</h4>
                    <ol className="text-white/90 text-sm leading-relaxed space-y-2 list-decimal list-inside">
                      <li>Review and optimize your budget to increase monthly payment capacity</li>
                      <li>Research refinancing options to secure a lower interest rate</li>
                      <li>Set up automatic payments to never miss a due date and potentially get rate discounts</li>
                      <li>Monitor your progress quarterly and adjust your strategy as your income grows</li>
                      <li>Consider income-driven repayment plans if experiencing financial hardship</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AIInsights;
