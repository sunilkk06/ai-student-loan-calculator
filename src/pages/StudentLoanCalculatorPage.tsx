import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, TrendingUp, Brain, CheckCircle, BookOpen, Lightbulb, PieChart } from 'lucide-react';
import { Link } from 'react-router-dom';

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

const StudentLoanCalculatorPage: React.FC = () => {
  const [loanData, setLoanData] = useState<LoanData>({
    principal: 30000,
    interestRate: 5.5,
    termYears: 10,
    extraPayment: 0,
    income: 50000,
    repaymentPlan: 'standard'
  });

  const [results, setResults] = useState<CalculationResults | null>(null);

  useEffect(() => {
    calculateLoan();
  }, [loanData]);

  const calculateLoan = () => {
    const { principal, interestRate, termYears, extraPayment } = loanData;
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = termYears * 12;

    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                          (Math.pow(1 + monthlyRate, totalPayments) - 1);
    
    const totalAmount = monthlyPayment * totalPayments;
    const totalInterest = totalAmount - principal;

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link to="/calculators" className="hover:text-blue-600">Financial Calculators</Link>
          <span>/</span>
          <span className="text-gray-800 font-semibold">Student Loan Calculator</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Student Loan Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl">
            Calculate your monthly student loan payments, total interest, and create a personalized repayment 
            strategy. Get AI-powered insights to optimize your loan repayment and save thousands in interest.
          </p>
        </div>

        {/* Calculator Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Calculator - 2 columns */}
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Input Panel */}
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                <div className="flex items-center mb-6">
                  <Calculator className="w-6 h-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-800">Loan Details</h2>
                </div>

                <div className="space-y-5">
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
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
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
                    <div className="bg-white rounded-xl p-5 shadow-lg">
                      <h4 className="font-semibold text-gray-800 mb-2 text-sm">Total Interest</h4>
                      <p className="text-2xl font-bold text-red-600">{formatCurrency(results.totalInterest)}</p>
                      {loanData.extraPayment > 0 && (
                        <p className="text-xs text-gray-600 mt-1">
                          With extra: {formatCurrency(results.totalInterestWithExtra)}
                        </p>
                      )}
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-lg">
                      <h4 className="font-semibold text-gray-800 mb-2 text-sm">Payoff Time</h4>
                      <p className="text-2xl font-bold text-blue-600">{formatYears(results.payoffTime / 12)}</p>
                      {loanData.extraPayment > 0 && (
                        <p className="text-xs text-gray-600 mt-1">
                          Save: {formatYears(results.timeSaved)}
                        </p>
                      )}
                    </div>
                  </div>

                  {loanData.extraPayment > 0 && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-5">
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

                  {/* AI Insights */}
                  {results && getAIInsights().length > 0 && (
                    <div className="bg-white rounded-xl p-5 shadow-lg">
                      <div className="flex items-center mb-3">
                        <Brain className="w-5 h-5 text-purple-600 mr-2" />
                        <h4 className="font-semibold text-gray-800">AI Insights</h4>
                      </div>
                      <div className="space-y-3">
                        {getAIInsights().slice(0, 2).map((insight, index) => (
                          <div
                            key={index}
                            className={`p-3 rounded-lg text-sm ${
                              insight.type === 'warning'
                                ? 'bg-yellow-50 text-yellow-800'
                                : insight.type === 'suggestion'
                                ? 'bg-blue-50 text-blue-800'
                                : 'bg-green-50 text-green-800'
                            }`}
                          >
                            {insight.message}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Related Calculators */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Related Calculators</h3>
              <div className="space-y-3">
                <Link to="/calculators/scientific" className="block p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <div className="font-semibold text-purple-900">Scientific Calculator</div>
                  <div className="text-sm text-purple-700">For math & science courses</div>
                </Link>
                <Link to="/calculators" className="block p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <div className="font-semibold text-blue-900">All Calculators</div>
                  <div className="text-sm text-blue-700">View all available tools</div>
                </Link>
              </div>

              {/* Quick Tips */}
              <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <Lightbulb className="w-4 h-4 mr-2 text-yellow-600" />
                  Quick Tip
                </h4>
                <p className="text-sm text-gray-700">
                  Making extra payments early in your loan term has the biggest impact on reducing total interest paid.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">How to Use the Student Loan Calculator</h2>
          </div>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              This student loan calculator helps you understand your repayment obligations and explore strategies 
              to pay off your loans faster while saving money on interest.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Step 1: Enter Your Loan Details</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>Loan Amount:</strong> Total amount borrowed</li>
                  <li><strong>Interest Rate:</strong> Annual percentage rate (APR)</li>
                  <li><strong>Loan Term:</strong> Repayment period in years</li>
                  <li><strong>Extra Payment:</strong> Additional monthly amount (optional)</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Step 2: Review Your Results</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>See your monthly payment amount</li>
                  <li>View total interest over the loan term</li>
                  <li>Compare scenarios with extra payments</li>
                  <li>Get AI-powered recommendations</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">💡 Pro Tips for Paying Off Student Loans</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Pay More Than the Minimum:</strong> Even small extra payments can save thousands in interest</li>
                <li><strong>Make Biweekly Payments:</strong> Pay half your monthly payment every two weeks (equals 13 payments/year)</li>
                <li><strong>Apply Windfalls to Principal:</strong> Use tax refunds, bonuses, or gifts to make lump-sum payments</li>
                <li><strong>Consider Refinancing:</strong> If you have good credit, refinancing could lower your interest rate</li>
                <li><strong>Automate Payments:</strong> Many lenders offer a 0.25% rate reduction for auto-pay</li>
              </ul>
            </div>
          </div>
        </div>

        {/* What is a Student Loan Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <PieChart className="w-8 h-8 text-green-600" />
            <h2 className="text-3xl font-bold text-gray-900">Understanding Student Loans</h2>
          </div>

          <div className="prose max-w-none text-gray-700">
            <p className="text-lg mb-4">
              Student loans are borrowed money that must be repaid with interest, used to pay for college or career 
              school expenses. Understanding how they work is crucial for making informed financial decisions.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Types of Student Loans</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Federal Student Loans</h4>
                <p className="mb-2">
                  Loans funded by the U.S. Department of Education with fixed interest rates and flexible repayment options.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li><strong>Direct Subsidized:</strong> For undergrads with financial need (no interest while in school)</li>
                  <li><strong>Direct Unsubsidized:</strong> Available to all students (interest accrues immediately)</li>
                  <li><strong>Direct PLUS:</strong> For graduate students and parents</li>
                  <li><strong>Direct Consolidation:</strong> Combines multiple federal loans</li>
                </ul>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Private Student Loans</h4>
                <p className="mb-2">
                  Loans from banks, credit unions, or online lenders with variable or fixed rates based on creditworthiness.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Interest rates based on credit score</li>
                  <li>May require a co-signer</li>
                  <li>Fewer repayment options than federal loans</li>
                  <li>Not eligible for federal forgiveness programs</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Federal Repayment Plans</h3>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Standard Repayment (10 years)</h4>
                  <p className="text-gray-700">Fixed monthly payments over 10 years. Pays off loans fastest with least interest.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Graduated Repayment (10 years)</h4>
                  <p className="text-gray-700">Payments start low and increase every 2 years. Good for those expecting income growth.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Income-Driven Repayment (20-25 years)</h4>
                  <p className="text-gray-700">Payments based on income and family size. Remaining balance forgiven after 20-25 years.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Extended Repayment (25 years)</h4>
                  <p className="text-gray-700">Lower monthly payments over 25 years. More interest paid overall.</p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Key Terms to Know</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <strong className="text-gray-900">Principal:</strong>
                <p className="text-gray-700">The original amount borrowed, not including interest.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <strong className="text-gray-900">Interest Rate:</strong>
                <p className="text-gray-700">The percentage charged on the loan balance annually.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <strong className="text-gray-900">Capitalization:</strong>
                <p className="text-gray-700">When unpaid interest is added to your principal balance.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <strong className="text-gray-900">Forbearance/Deferment:</strong>
                <p className="text-gray-700">Temporary pause or reduction in payments during hardship.</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How much student loan debt is too much?</h3>
              <p className="text-gray-700">
                A common rule of thumb is that your total student loan debt should not exceed your expected first-year salary. 
                Ideally, your monthly loan payment should be less than 10-15% of your gross monthly income.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Should I pay off student loans or save for retirement?</h3>
              <p className="text-gray-700">
                Do both if possible! At minimum, contribute enough to your 401(k) to get the full employer match (free money), 
                then focus on high-interest debt. For loans under 5% interest, consider balancing payments with retirement savings.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">What is the average student loan interest rate?</h3>
              <p className="text-gray-700">
                Federal student loan rates for 2024-2025 range from 5.50% to 8.05% depending on loan type. Private loan rates 
                vary widely (3-14%) based on credit score and lender. Always compare federal options first.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Can I deduct student loan interest on my taxes?</h3>
              <p className="text-gray-700">
                Yes! You can deduct up to $2,500 in student loan interest paid per year if you meet income requirements. 
                This deduction is available even if you don't itemize deductions.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">What happens if I can't make my student loan payments?</h3>
              <p className="text-gray-700">
                Contact your loan servicer immediately! For federal loans, you may qualify for deferment, forbearance, or 
                income-driven repayment plans. Ignoring the problem can lead to default, damaged credit, and wage garnishment.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Is student loan forgiveness real?</h3>
              <p className="text-gray-700">
                Yes, several federal programs exist: Public Service Loan Forgiveness (PSLF) for government/nonprofit workers, 
                Teacher Loan Forgiveness, and forgiveness after 20-25 years on income-driven repayment plans. Private loans 
                are not eligible for federal forgiveness programs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLoanCalculatorPage;
