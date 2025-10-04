import React, { useState } from 'react';
import { GraduationCap, TrendingUp, Calendar, DollarSign, PiggyBank, RotateCcw } from 'lucide-react';

interface SavingsResult {
  monthlyPayment: number;
  annualPayment: number;
  totalContributions: number;
  totalInterest: number;
  finalAmount: number;
}

const CollegeSavingsPage: React.FC = () => {
  const [collegeCost, setCollegeCost] = useState('');
  const [yearsUntilCollege, setYearsUntilCollege] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [interestRate, setInterestRate] = useState('5');
  const [paymentFrequency, setPaymentFrequency] = useState<'monthly' | 'annual'>('monthly');
  const [result, setResult] = useState<SavingsResult | null>(null);
  const [error, setError] = useState('');

  const calculateSavings = () => {
    setError('');

    const cost = parseFloat(collegeCost);
    const years = parseFloat(yearsUntilCollege);
    const current = parseFloat(currentSavings) || 0;
    const rate = parseFloat(interestRate) / 100;

    if (!collegeCost || !yearsUntilCollege) {
      setError('Please enter college cost and years until college');
      return;
    }

    if (cost <= 0 || years <= 0) {
      setError('Values must be greater than zero');
      return;
    }

    if (current >= cost) {
      setError('Current savings already meet or exceed college cost goal');
      return;
    }

    // Calculate future value of current savings
    const futureValueOfCurrentSavings = current * Math.pow(1 + rate, years);
    
    // Amount still needed after current savings grow
    const amountNeeded = cost - futureValueOfCurrentSavings;

    if (amountNeeded <= 0) {
      setError('Your current savings will grow to meet your goal with compound interest!');
      setResult({
        monthlyPayment: 0,
        annualPayment: 0,
        totalContributions: 0,
        totalInterest: cost - current,
        finalAmount: cost
      });
      return;
    }

    // Calculate required payment using future value of annuity formula
    // FV = PMT * [((1 + r)^n - 1) / r]
    // PMT = FV / [((1 + r)^n - 1) / r]
    
    let payment: number;
    let periods: number;
    let periodicRate: number;

    if (paymentFrequency === 'monthly') {
      periods = years * 12;
      periodicRate = rate / 12;
      
      if (periodicRate === 0) {
        payment = amountNeeded / periods;
      } else {
        payment = amountNeeded / (((Math.pow(1 + periodicRate, periods) - 1) / periodicRate));
      }
    } else {
      periods = years;
      periodicRate = rate;
      
      if (periodicRate === 0) {
        payment = amountNeeded / periods;
      } else {
        payment = amountNeeded / (((Math.pow(1 + periodicRate, periods) - 1) / periodicRate));
      }
    }

    const totalContributions = payment * periods;
    const totalInterest = amountNeeded - totalContributions;

    setResult({
      monthlyPayment: paymentFrequency === 'monthly' ? payment : payment / 12,
      annualPayment: paymentFrequency === 'annual' ? payment : payment * 12,
      totalContributions: totalContributions + current,
      totalInterest: totalInterest + (futureValueOfCurrentSavings - current),
      finalAmount: cost
    });
  };

  const resetCalculator = () => {
    setCollegeCost('');
    setYearsUntilCollege('');
    setCurrentSavings('');
    setInterestRate('5');
    setPaymentFrequency('monthly');
    setResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
            <GraduationCap className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            College Savings Plan Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Calculate how much you need to save per month or year to reach your college cost goal. See the power of compound interest over time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Savings Details</h2>

              {error && (
                <div className={`mb-6 p-4 rounded-lg ${
                  error.includes('grow to meet') 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <p className={error.includes('grow to meet') ? 'text-green-700' : 'text-red-700'}>
                    {error}
                  </p>
                </div>
              )}

              <div className="space-y-6">
                {/* College Cost Goal */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Total College Cost Goal <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      value={collegeCost}
                      onChange={(e) => setCollegeCost(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="100000"
                      step="1000"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Total cost for 4 years (tuition, room & board, books, etc.)
                  </p>
                </div>

                {/* Years Until College */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Years Until College Starts <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      value={yearsUntilCollege}
                      onChange={(e) => setYearsUntilCollege(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="10"
                      step="1"
                      min="1"
                      max="18"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Child's age: {yearsUntilCollege ? 18 - parseFloat(yearsUntilCollege) : '?'} years old
                  </p>
                </div>

                {/* Current Savings */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Current College Savings (Optional)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <PiggyBank className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      value={currentSavings}
                      onChange={(e) => setCurrentSavings(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="0"
                      step="1000"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Amount already saved in 529 plan, savings account, etc.
                  </p>
                </div>

                {/* Expected Interest Rate */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Expected Annual Return (%)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <TrendingUp className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="5"
                      step="0.1"
                      min="0"
                      max="15"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Typical: 5-7% for 529 plans, 3-4% for savings accounts
                  </p>
                </div>

                {/* Payment Frequency */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Payment Frequency
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setPaymentFrequency('monthly')}
                      className={`py-3 px-4 rounded-lg font-semibold transition-colors ${
                        paymentFrequency === 'monthly'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => setPaymentFrequency('annual')}
                      className={`py-3 px-4 rounded-lg font-semibold transition-colors ${
                        paymentFrequency === 'annual'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Annual
                    </button>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={calculateSavings}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Calculate Savings Plan
                  </button>
                  <button
                    onClick={resetCalculator}
                    className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Savings Plan</h2>

              {result ? (
                <div className="space-y-6">
                  {/* Required Payment */}
                  <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Required {paymentFrequency === 'monthly' ? 'Monthly' : 'Annual'} Payment</h3>
                    <div className="text-4xl font-bold text-purple-600">
                      ${(paymentFrequency === 'monthly' ? result.monthlyPayment : result.annualPayment).toFixed(2)}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">per {paymentFrequency === 'monthly' ? 'month' : 'year'}</p>
                  </div>

                  {/* Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-600">Total Contributions</span>
                      <span className="font-semibold text-gray-900">${result.totalContributions.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-600">Interest Earned</span>
                      <span className="font-semibold text-green-600">${result.totalInterest.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-600">Final Amount</span>
                      <span className="font-semibold text-purple-600">${result.finalAmount.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Visual Breakdown */}
                  <div className="pt-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Savings Breakdown</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div 
                          className="h-8 bg-purple-500 rounded"
                          style={{ width: `${(result.totalContributions / result.finalAmount) * 100}%` }}
                        ></div>
                        <span className="text-xs text-gray-600 whitespace-nowrap">
                          {((result.totalContributions / result.finalAmount) * 100).toFixed(0)}% Contributions
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div 
                          className="h-8 bg-green-500 rounded"
                          style={{ width: `${(result.totalInterest / result.finalAmount) * 100}%` }}
                        ></div>
                        <span className="text-xs text-gray-600 whitespace-nowrap">
                          {((result.totalInterest / result.finalAmount) * 100).toFixed(0)}% Interest
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Insights */}
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">💡 Insights</h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Start early to maximize compound interest</li>
                      <li>• Consider a 529 plan for tax benefits</li>
                      <li>• Review and adjust annually</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Plan Your Savings</h3>
                  <p className="text-gray-500">
                    Enter your college cost goal and timeline to calculate your required savings.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Use the College Savings Calculator</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Step 1: Set Your Goal</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Estimate total 4-year college cost</li>
                <li>Include tuition, room & board, books, fees</li>
                <li>Research current costs and add 3-5% annual inflation</li>
                <li>Public in-state: $40k-80k, Private: $150k-300k</li>
              </ol>
            </div>

            <div className="bg-pink-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Step 2: Enter Timeline</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Calculate years until college (18 - child's age)</li>
                <li>Enter any current savings you have</li>
                <li>Choose expected investment return rate</li>
                <li>Select monthly or annual payment frequency</li>
              </ol>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Step 3: Calculate & Plan</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Click "Calculate Savings Plan"</li>
                <li>Review required monthly/annual payment</li>
                <li>See how contributions and interest add up</li>
                <li>Adjust inputs to find affordable plan</li>
              </ol>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pro Tips</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Start saving as early as possible</li>
                <li>Use 529 plans for tax advantages</li>
                <li>Automate monthly contributions</li>
                <li>Reassess plan annually</li>
              </ul>
            </div>
          </div>
        </div>

        {/* College Savings Options */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">College Savings Options</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">529 College Savings Plan</h3>
              <p className="text-gray-700 mb-3">
                <strong>Best for:</strong> Most families planning for college
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Tax-free growth and withdrawals</li>
                <li>✓ State tax deductions (varies by state)</li>
                <li>✓ High contribution limits</li>
                <li>✓ Can change beneficiary</li>
                <li>✗ Penalties for non-education use</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Coverdell ESA</h3>
              <p className="text-gray-700 mb-3">
                <strong>Best for:</strong> K-12 and college expenses
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Tax-free growth</li>
                <li>✓ Can use for K-12 expenses</li>
                <li>✓ More investment options</li>
                <li>✗ $2,000 annual contribution limit</li>
                <li>✗ Income restrictions apply</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Custodial Account (UGMA/UTMA)</h3>
              <p className="text-gray-700 mb-3">
                <strong>Best for:</strong> Flexibility beyond education
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ No contribution limits</li>
                <li>✓ Can use for any purpose</li>
                <li>✓ Child owns at age 18/21</li>
                <li>✗ No tax advantages</li>
                <li>✗ Impacts financial aid more</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How much does college really cost?</h3>
              <p className="text-gray-700">
                For 2024-25, average costs for 4 years: <strong>Public in-state: $40,000-80,000</strong> (tuition, room, board), 
                <strong> Public out-of-state: $100,000-150,000</strong>, <strong>Private: $150,000-300,000</strong>. 
                These costs increase 3-5% annually due to inflation. Use college net price calculators for specific schools.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">When should I start saving for college?</h3>
              <p className="text-gray-700">
                <strong>As early as possible!</strong> Starting when your child is born gives you 18 years of compound growth. 
                Even saving $200/month from birth at 6% return = $77,000 by age 18. Starting at age 10 requires $550/month 
                for the same result. The earlier you start, the less you need to save monthly.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">What's a realistic investment return rate?</h3>
              <p className="text-gray-700">
                <strong>529 plans:</strong> 5-7% average annual return (age-based portfolios adjust risk over time). 
                <strong>High-yield savings:</strong> 3-4% (safe but lower growth). <strong>Stock market:</strong> 
                7-10% historically (higher risk). Use conservative estimates (5-6%) for planning. Returns vary and aren't guaranteed.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Should I save for college or pay off debt?</h3>
              <p className="text-gray-700">
                Generally: (1) <strong>Build emergency fund</strong> (3-6 months expenses), (2) <strong>Get employer 401(k) match</strong> 
                (free money), (3) <strong>Pay off high-interest debt</strong> (&gt;6-7%), (4) <strong>Then save for college</strong>. 
                Your child can borrow for college, but you can't borrow for retirement. Balance is key - even small college savings help.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">What if I can't save the full amount?</h3>
              <p className="text-gray-700">
                <strong>Any savings help!</strong> Most families don't save the full cost. Options: (1) <strong>Partial savings</strong> 
                reduces loan burden, (2) <strong>Scholarships and grants</strong> (apply for many), (3) <strong>Work-study programs</strong>, 
                (4) <strong>Community college</strong> for first 2 years, (5) <strong>Student loans</strong> (federal first). 
                Saving even 25-50% makes a huge difference.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How do college savings affect financial aid?</h3>
              <p className="text-gray-700">
                <strong>529 plans owned by parents:</strong> Count as parent assets (max 5.64% affects aid). 
                <strong>Custodial accounts (UGMA/UTMA):</strong> Count as student assets (20% affects aid - bigger impact). 
                <strong>Grandparent 529s:</strong> Don't count as assets but distributions count as student income (50% impact). 
                Parent-owned 529s are usually best for financial aid.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeSavingsPage;
