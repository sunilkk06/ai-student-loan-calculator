import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Calendar, Percent, RotateCcw } from 'lucide-react';

type CalculateMode = 'FV' | 'PV' | 'Rate' | 'N' | 'PMT';

const TVMCalculatorPage: React.FC = () => {
  const [calculateMode, setCalculateMode] = useState<CalculateMode>('FV');
  const [presentValue, setPresentValue] = useState('');
  const [futureValue, setFutureValue] = useState('');
  const [payment, setPayment] = useState('');
  const [rate, setRate] = useState('');
  const [periods, setPeriods] = useState('');
  const [periodsPerYear, setPeriodsPerYear] = useState('12');
  const [paymentTiming, setPaymentTiming] = useState<'end' | 'beginning'>('end');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  const calculateFV = () => {
    const PV = parseFloat(presentValue) || 0;
    const PMT = parseFloat(payment) || 0;
    const r = parseFloat(rate) / 100 / parseFloat(periodsPerYear);
    const n = parseFloat(periods);

    if (isNaN(r) || isNaN(n)) {
      setError('Please enter valid rate and number of periods');
      return;
    }

    const timing = paymentTiming === 'beginning' ? 1 : 0;
    
    let fv = -PV * Math.pow(1 + r, n);
    
    if (PMT !== 0) {
      fv -= PMT * (Math.pow(1 + r, n) - 1) / r * (1 + r * timing);
    }
    
    setResult(fv);
  };

  const calculatePV = () => {
    const FV = parseFloat(futureValue) || 0;
    const PMT = parseFloat(payment) || 0;
    const r = parseFloat(rate) / 100 / parseFloat(periodsPerYear);
    const n = parseFloat(periods);

    if (isNaN(r) || isNaN(n)) {
      setError('Please enter valid rate and number of periods');
      return;
    }

    const timing = paymentTiming === 'beginning' ? 1 : 0;
    
    let pv = -FV / Math.pow(1 + r, n);
    
    if (PMT !== 0) {
      pv -= PMT * (1 - Math.pow(1 + r, -n)) / r * (1 + r * timing);
    }
    
    setResult(pv);
  };

  const calculateRate = () => {
    const PV = parseFloat(presentValue) || 0;
    const FV = parseFloat(futureValue) || 0;
    const PMT = parseFloat(payment) || 0;
    const n = parseFloat(periods);

    if (isNaN(n) || n <= 0) {
      setError('Please enter valid number of periods');
      return;
    }

    // Simple case: no payments
    if (PMT === 0 && PV !== 0 && FV !== 0) {
      const r = Math.pow(-FV / PV, 1 / n) - 1;
      setResult(r * parseFloat(periodsPerYear) * 100);
      return;
    }

    // Newton-Raphson method for complex cases
    let guess = 0.1;
    const maxIterations = 100;
    const tolerance = 0.000001;

    for (let i = 0; i < maxIterations; i++) {
      const timing = paymentTiming === 'beginning' ? 1 : 0;
      const fv = -PV * Math.pow(1 + guess, n) - PMT * (Math.pow(1 + guess, n) - 1) / guess * (1 + guess * timing);
      const dfv = -PV * n * Math.pow(1 + guess, n - 1) - PMT * ((n * Math.pow(1 + guess, n - 1) * guess - (Math.pow(1 + guess, n) - 1)) / (guess * guess)) * (1 + guess * timing);
      
      const newGuess = guess - (fv - FV) / dfv;
      
      if (Math.abs(newGuess - guess) < tolerance) {
        setResult(newGuess * parseFloat(periodsPerYear) * 100);
        return;
      }
      
      guess = newGuess;
    }

    setError('Could not converge to a solution');
  };

  const calculateN = () => {
    const PV = parseFloat(presentValue) || 0;
    const FV = parseFloat(futureValue) || 0;
    const PMT = parseFloat(payment) || 0;
    const r = parseFloat(rate) / 100 / parseFloat(periodsPerYear);

    if (isNaN(r)) {
      setError('Please enter valid interest rate');
      return;
    }

    // Simple case: no payments
    if (PMT === 0 && PV !== 0 && FV !== 0) {
      const n = Math.log(-FV / PV) / Math.log(1 + r);
      setResult(n);
      return;
    }

    // Complex case with payments
    const timing = paymentTiming === 'beginning' ? 1 : 0;
    const n = Math.log((PMT * (1 + r * timing) - FV * r) / (PMT * (1 + r * timing) + PV * r)) / Math.log(1 + r);
    
    if (isNaN(n)) {
      setError('Cannot calculate periods with given values');
      return;
    }
    
    setResult(n);
  };

  const calculatePMT = () => {
    const PV = parseFloat(presentValue) || 0;
    const FV = parseFloat(futureValue) || 0;
    const r = parseFloat(rate) / 100 / parseFloat(periodsPerYear);
    const n = parseFloat(periods);

    if (isNaN(r) || isNaN(n)) {
      setError('Please enter valid rate and number of periods');
      return;
    }

    const timing = paymentTiming === 'beginning' ? 1 : 0;
    
    const pmt = -(PV * Math.pow(1 + r, n) + FV) / ((Math.pow(1 + r, n) - 1) / r * (1 + r * timing));
    
    setResult(pmt);
  };

  const handleCalculate = () => {
    setError('');
    setResult(null);

    try {
      switch (calculateMode) {
        case 'FV':
          calculateFV();
          break;
        case 'PV':
          calculatePV();
          break;
        case 'Rate':
          calculateRate();
          break;
        case 'N':
          calculateN();
          break;
        case 'PMT':
          calculatePMT();
          break;
      }
    } catch (err) {
      setError('Calculation error. Please check your inputs.');
    }
  };

  const handleReset = () => {
    setPresentValue('');
    setFutureValue('');
    setPayment('');
    setRate('');
    setPeriods('');
    setPeriodsPerYear('12');
    setPaymentTiming('end');
    setResult(null);
    setError('');
  };

  const getResultLabel = () => {
    switch (calculateMode) {
      case 'FV': return 'Future Value';
      case 'PV': return 'Present Value';
      case 'Rate': return 'Annual Interest Rate';
      case 'N': return 'Number of Periods';
      case 'PMT': return 'Payment Amount';
    }
  };

  const getResultUnit = () => {
    switch (calculateMode) {
      case 'Rate': return '%';
      case 'N': return 'periods';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Time Value of Money (TVM) Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The backbone of finance. Calculate Future Value, Present Value, Interest Rate, Number of Periods, and Payment amounts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">TVM Inputs</h2>

              {/* Calculate Mode Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  What do you want to calculate?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {(['FV', 'PV', 'Rate', 'N', 'PMT'] as CalculateMode[]).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setCalculateMode(mode)}
                      className={`py-2 px-3 rounded-lg font-semibold text-sm transition-colors ${
                        calculateMode === mode
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {mode === 'Rate' ? 'I/Y' : mode}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              <div className="space-y-4">
                {/* Present Value */}
                {calculateMode !== 'PV' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Present Value (PV)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        value={presentValue}
                        onChange={(e) => setPresentValue(e.target.value)}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="10000"
                        step="any"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Current value or initial investment</p>
                  </div>
                )}

                {/* Future Value */}
                {calculateMode !== 'FV' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Future Value (FV)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        value={futureValue}
                        onChange={(e) => setFutureValue(e.target.value)}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="15000"
                        step="any"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Value at end of period</p>
                  </div>
                )}

                {/* Payment */}
                {calculateMode !== 'PMT' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Payment (PMT) - Optional
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        value={payment}
                        onChange={(e) => setPayment(e.target.value)}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0"
                        step="any"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Regular payment amount (leave 0 for lump sum)</p>
                  </div>
                )}

                {/* Interest Rate */}
                {calculateMode !== 'Rate' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Annual Interest Rate (I/Y)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Percent className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="5"
                        step="0.01"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Annual interest rate as percentage</p>
                  </div>
                )}

                {/* Number of Periods */}
                {calculateMode !== 'N' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Number of Periods (N)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        value={periods}
                        onChange={(e) => setPeriods(e.target.value)}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="60"
                        step="1"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Total number of payment periods</p>
                  </div>
                )}

                {/* Periods Per Year */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Compounding Frequency
                  </label>
                  <select
                    value={periodsPerYear}
                    onChange={(e) => setPeriodsPerYear(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="1">Annually</option>
                    <option value="2">Semi-annually</option>
                    <option value="4">Quarterly</option>
                    <option value="12">Monthly</option>
                    <option value="52">Weekly</option>
                    <option value="365">Daily</option>
                  </select>
                </div>

                {/* Payment Timing */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Payment Timing
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setPaymentTiming('end')}
                      className={`py-3 px-4 rounded-lg font-semibold transition-colors ${
                        paymentTiming === 'end'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      End of Period
                    </button>
                    <button
                      onClick={() => setPaymentTiming('beginning')}
                      className={`py-3 px-4 rounded-lg font-semibold transition-colors ${
                        paymentTiming === 'beginning'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Beginning of Period
                    </button>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleCalculate}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Calculate {calculateMode}
                  </button>
                  <button
                    onClick={handleReset}
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Result</h2>

              {result !== null ? (
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">{getResultLabel()}</h3>
                    <div className="text-4xl font-bold text-blue-600">
                      {calculateMode === 'Rate' || calculateMode === 'N' ? (
                        <>
                          {result.toFixed(2)}
                          <span className="text-2xl ml-1">{getResultUnit()}</span>
                        </>
                      ) : (
                        <>
                          ${Math.abs(result).toFixed(2)}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="font-semibold text-green-900 mb-2">💡 Interpretation</h3>
                    <p className="text-sm text-green-800">
                      {calculateMode === 'FV' && 'This is what your investment will be worth in the future.'}
                      {calculateMode === 'PV' && 'This is the current value needed to reach your future goal.'}
                      {calculateMode === 'Rate' && 'This is the annual interest rate required.'}
                      {calculateMode === 'N' && 'This is the number of periods needed to reach your goal.'}
                      {calculateMode === 'PMT' && 'This is the regular payment amount required.'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Result Yet</h3>
                  <p className="text-gray-500">
                    Enter your values and click Calculate to see the result.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Time Value of Money</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What is TVM?</h3>
              <p className="text-gray-700 mb-3">
                The Time Value of Money is a fundamental financial concept stating that money available now is worth more than the same amount in the future due to its earning potential.
              </p>
              <p className="text-gray-700">
                <strong>Key principle:</strong> A dollar today is worth more than a dollar tomorrow because you can invest it and earn interest.
              </p>
            </div>

            <div className="bg-indigo-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">The Five TVM Variables</h3>
              <ul className="text-gray-700 space-y-2">
                <li><strong>PV:</strong> Present Value - current worth</li>
                <li><strong>FV:</strong> Future Value - worth at future date</li>
                <li><strong>I/Y:</strong> Interest Rate - annual return rate</li>
                <li><strong>N:</strong> Number of Periods - time duration</li>
                <li><strong>PMT:</strong> Payment - regular cash flow</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Common Uses</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Retirement planning</li>
                <li>• Investment analysis</li>
                <li>• Loan calculations</li>
                <li>• Savings goals</li>
                <li>• Bond valuation</li>
                <li>• Capital budgeting</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Example Scenarios</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• How much to save monthly?</li>
                <li>• What will $10k be worth?</li>
                <li>• What rate do I need?</li>
                <li>• How long to reach goal?</li>
                <li>• Compare investment options</li>
                <li>• Calculate loan payments</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Pro Tips</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Higher frequency = more growth</li>
                <li>• Start early for compound effect</li>
                <li>• Consider inflation impact</li>
                <li>• Match periods to payments</li>
                <li>• Use realistic interest rates</li>
                <li>• Account for taxes/fees</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">What's the difference between PV and FV?</h3>
              <p className="text-gray-700">
                <strong>Present Value (PV)</strong> is what money is worth today, while <strong>Future Value (FV)</strong> is what it will be worth at a future date after earning interest. Example: $1,000 today (PV) might grow to $1,500 in 5 years (FV) at 8% interest.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How does compounding frequency affect results?</h3>
              <p className="text-gray-700">
                More frequent compounding means faster growth. $1,000 at 12% annual rate: <strong>Annual</strong> = $1,120, <strong>Monthly</strong> = $1,126.83, <strong>Daily</strong> = $1,127.47. The difference grows larger with time and higher rates.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">When should payments be at the beginning vs. end?</h3>
              <p className="text-gray-700">
                <strong>End of period</strong> (ordinary annuity): Most common - mortgage payments, loan payments. <strong>Beginning of period</strong> (annuity due): Rent, lease payments, insurance premiums. Beginning payments are worth slightly more due to extra compounding time.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Can I use this for retirement planning?</h3>
              <p className="text-gray-700">
                <strong>Absolutely!</strong> Calculate how much to save monthly (PMT) to reach your retirement goal (FV), or determine what your current savings (PV) will grow to. Use realistic rates (6-8% for stocks, 3-4% for bonds) and account for inflation (typically 2-3%).
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">What interest rate should I use?</h3>
              <p className="text-gray-700">
                Depends on investment type: <strong>Savings accounts:</strong> 0.5-4%, <strong>Bonds:</strong> 3-5%, <strong>Stock market:</strong> 7-10% (historical average), <strong>Real estate:</strong> 8-12%. Always use conservative estimates for planning and remember past performance doesn't guarantee future results.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How do I account for inflation?</h3>
              <p className="text-gray-700">
                Use the <strong>real interest rate</strong> = nominal rate - inflation rate. If your investment earns 8% and inflation is 3%, your real return is 5%. For long-term planning, this gives a more accurate picture of purchasing power growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVMCalculatorPage;
