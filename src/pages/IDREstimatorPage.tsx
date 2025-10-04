import React, { useState } from 'react';
import { Calculator, DollarSign, Users, MapPin, FileText, RotateCcw } from 'lucide-react';

const IDREstimatorPage: React.FC = () => {
  // State for form inputs
  const [loanBalance, setLoanBalance] = useState('');
  const [annualIncome, setAnnualIncome] = useState('');
  const [familySize, setFamilySize] = useState('1');
  const [state, setState] = useState('');
  const [idrPlan, setIdrPlan] = useState('SAVE');
  
  // State for results
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [error, setError] = useState('');
  
  // IDR Plan options
  const idrPlans = [
    { value: 'SAVE', label: 'SAVE (Saving on a Valuable Education)' },
    { value: 'PAYE', label: 'PAYE (Pay As You Earn)' },
    { value: 'REPAYE', label: 'REPAYE (Revised Pay As You Earn)' },
    { value: 'IBR', label: 'IBR (Income-Based Repayment)' },
    { value: 'ICR', label: 'ICR (Income-Contingent Repayment)' }
  ];
  
  // US States
  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];
  
  // Calculate IDR payment
  const calculatePayment = () => {
    setError('');
    
    // Validate inputs
    if (!loanBalance || !annualIncome || !state) {
      setError('Please fill in all required fields');
      return;
    }
    
    const balance = parseFloat(loanBalance);
    const income = parseFloat(annualIncome);
    const size = parseInt(familySize);
    
    if (isNaN(balance) || isNaN(income) || balance <= 0 || income < 0) {
      setError('Please enter valid numbers');
      return;
    }
    
    // Federal Poverty Guidelines (2024) - simplified calculation
    const povertyGuideline = 15060 + (size - 1) * 5380;
    
    // Calculate discretionary income (150% of poverty guideline)
    const discretionaryIncome = Math.max(0, income - (1.5 * povertyGuideline));
    
    // Calculate monthly payment based on IDR plan
    let payment = 0;
    
    switch (idrPlan) {
      case 'SAVE':
        // SAVE: 5% of discretionary income for undergraduate loans
        payment = (discretionaryIncome * 0.05) / 12;
        break;
      case 'PAYE':
        // PAYE: 10% of discretionary income
        payment = (discretionaryIncome * 0.10) / 12;
        break;
      case 'REPAYE':
        // REPAYE: 10% of discretionary income
        payment = (discretionaryIncome * 0.10) / 12;
        break;
      case 'IBR':
        // IBR: 10% or 15% of discretionary income (using 10% for new borrowers)
        payment = (discretionaryIncome * 0.10) / 12;
        break;
      case 'ICR':
        // ICR: Lesser of 20% of discretionary income or fixed payment over 12 years
        const icrPayment1 = (discretionaryIncome * 0.20) / 12;
        const icrPayment2 = balance / 144; // 12 years = 144 months
        payment = Math.min(icrPayment1, icrPayment2);
        break;
      default:
        payment = 0;
    }
    
    setMonthlyPayment(Math.max(0, payment));
  };
  
  // Reset form
  const resetForm = () => {
    setLoanBalance('');
    setAnnualIncome('');
    setFamilySize('1');
    setState('');
    setIdrPlan('SAVE');
    setMonthlyPayment(null);
    setError('');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Calculator className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Income-Driven Repayment (IDR) Estimator
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Estimate your monthly student loan payments under various IDR plans based on your income, family size, and state of residence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Loan & Income Information</h2>
              
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700">{error}</p>
                </div>
              )}
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="loanBalance" className="block text-sm font-medium text-gray-700 mb-2">
                    Total Federal Loan Balance *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="loanBalance"
                      value={loanBalance}
                      onChange={(e) => setLoanBalance(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="50000"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="annualIncome" className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Gross Income *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="annualIncome"
                      value={annualIncome}
                      onChange={(e) => setAnnualIncome(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="45000"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="familySize" className="block text-sm font-medium text-gray-700 mb-2">
                    Family Size
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Users className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="familySize"
                      value={familySize}
                      onChange={(e) => setFamilySize(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                    State of Residence *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Select a state</option>
                      {states.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="idrPlan" className="block text-sm font-medium text-gray-700 mb-2">
                    IDR Plan
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FileText className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="idrPlan"
                      value={idrPlan}
                      onChange={(e) => setIdrPlan(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      {idrPlans.map(plan => (
                        <option key={plan.value} value={plan.value}>{plan.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={calculatePayment}
                    className="flex-1 min-w-[150px] bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Calculate Payment
                  </button>
                  <button
                    onClick={resetForm}
                    className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                </div>
              </div>
            </div>
            
            {/* Information Section */}
            <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About IDR Plans</h2>
              <div className="prose max-w-none text-gray-600">
                <p className="mb-4">
                  Income-Driven Repayment (IDR) plans cap your monthly federal student loan payments at a percentage of your discretionary income.
                </p>
                
                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Available Plans:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>SAVE:</strong> 5% of discretionary income, most affordable option</li>
                  <li><strong>PAYE:</strong> 10% of discretionary income, 20-year forgiveness</li>
                  <li><strong>REPAYE:</strong> 10% of discretionary income, 20-25 year forgiveness</li>
                  <li><strong>IBR:</strong> 10-15% of discretionary income, 20-25 year forgiveness</li>
                  <li><strong>ICR:</strong> 20% of discretionary income or fixed 12-year payment</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Results Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Estimated Payment</h2>
              
              {monthlyPayment !== null ? (
                <div className="space-y-6">
                  <div className="text-center py-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl">
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      ${monthlyPayment.toFixed(2)}
                    </div>
                    <div className="text-gray-600">per month</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-600">Plan</span>
                      <span className="font-semibold">{idrPlans.find(p => p.value === idrPlan)?.label.split('(')[0]}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-600">Annual Payment</span>
                      <span className="font-semibold">${(monthlyPayment * 12).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-600">Family Size</span>
                      <span className="font-semibold">{familySize}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">State</span>
                      <span className="font-semibold">{state}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Next Steps</h3>
                    <p className="text-sm text-blue-800">
                      Contact your loan servicer to apply for an IDR plan. You'll need to recertify your income annually.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Enter Your Information</h3>
                  <p className="text-gray-500">
                    Fill in your loan and income details to calculate your estimated monthly payment.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Use the IDR Estimator</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Step 1: Enter Loan Information</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Enter your total federal student loan balance</li>
                <li>Include all federal loans (Direct, Stafford, PLUS)</li>
                <li>Don't include private loans (they don't qualify for IDR)</li>
                <li>Find your balance on studentaid.gov or loan servicer website</li>
              </ol>
            </div>

            <div className="bg-teal-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Step 2: Enter Income Details</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Enter your annual gross income (before taxes)</li>
                <li>Use your most recent tax return or pay stubs</li>
                <li>Include salary, wages, and other taxable income</li>
                <li>Don't include non-taxable income</li>
              </ol>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Step 3: Family & Location</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Select your family size (yourself + dependents)</li>
                <li>Choose your state of residence</li>
                <li>Select the IDR plan you're considering</li>
                <li>Click "Calculate Payment" to see results</li>
              </ol>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pro Tips</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>SAVE plan offers the lowest payments (5%)</li>
                <li>Compare all plans to find the best fit</li>
                <li>Consider forgiveness timeline (20-25 years)</li>
                <li>Recertify income annually to maintain IDR</li>
              </ul>
            </div>
          </div>
        </div>

        {/* What is IDR Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Income-Driven Repayment (IDR)?</h2>

          <div className="prose max-w-none text-gray-700">
            <p className="text-lg mb-6">
              Income-Driven Repayment (IDR) plans are federal student loan repayment options that set your monthly payment 
              based on your income and family size, rather than the amount you owe. These plans can make your payments more 
              affordable and offer loan forgiveness after 20-25 years of qualifying payments.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Available IDR Plans</h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">SAVE Plan (Newest & Best)</h4>
                <div className="space-y-2">
                  <p><strong className="text-green-900">Payment:</strong> 5% of discretionary income for undergraduate loans</p>
                  <p><strong className="text-green-900">Forgiveness:</strong> 20 years (undergraduate), 25 years (graduate)</p>
                  <p><strong className="text-green-900">Interest:</strong> No unpaid interest capitalization</p>
                  <p className="text-sm mt-3">
                    <strong>Best for:</strong> Most borrowers, especially those with lower incomes or undergraduate loans. 
                    Offers the lowest payments and best interest benefits.
                  </p>
                </div>
              </div>

              <div className="bg-teal-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">PAYE (Pay As You Earn)</h4>
                <div className="space-y-2">
                  <p><strong className="text-teal-900">Payment:</strong> 10% of discretionary income</p>
                  <p><strong className="text-teal-900">Forgiveness:</strong> 20 years</p>
                  <p><strong className="text-teal-900">Cap:</strong> Never more than standard 10-year payment</p>
                  <p className="text-sm mt-3">
                    <strong>Best for:</strong> New borrowers (first loan after Oct 1, 2007) with moderate to high debt. 
                    Good if you expect significant income growth.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">REPAYE (Revised PAYE)</h4>
                <div className="space-y-2">
                  <p><strong className="text-blue-900">Payment:</strong> 10% of discretionary income</p>
                  <p><strong className="text-blue-900">Forgiveness:</strong> 20 years (undergraduate), 25 years (graduate)</p>
                  <p><strong className="text-blue-900">Interest:</strong> Government pays 50% of unpaid interest</p>
                  <p className="text-sm mt-3">
                    <strong>Best for:</strong> All borrowers, especially those with graduate loans. No payment cap, 
                    so payments can exceed standard plan if income is very high.
                  </p>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">IBR (Income-Based Repayment)</h4>
                <div className="space-y-2">
                  <p><strong className="text-purple-900">Payment:</strong> 10% or 15% of discretionary income</p>
                  <p><strong className="text-purple-900">Forgiveness:</strong> 20 or 25 years (depends on when you borrowed)</p>
                  <p><strong className="text-purple-900">Cap:</strong> Never more than standard 10-year payment</p>
                  <p className="text-sm mt-3">
                    <strong>Best for:</strong> Older borrowers (first loan before July 1, 2014). Consider SAVE or PAYE 
                    if you're a newer borrower.
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">ICR (Income-Contingent Repayment)</h4>
                <div className="space-y-2">
                  <p><strong className="text-yellow-900">Payment:</strong> 20% of discretionary income OR fixed 12-year payment</p>
                  <p><strong className="text-yellow-900">Forgiveness:</strong> 25 years</p>
                  <p><strong className="text-yellow-900">Note:</strong> Generally highest payments among IDR plans</p>
                  <p className="text-sm mt-3">
                    <strong>Best for:</strong> Parent PLUS consolidation loans (only IDR option). Most other borrowers 
                    should choose a different plan.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Key Benefits of IDR Plans</h3>
            <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 text-xl">💰</span>
                  <div>
                    <strong className="text-gray-900">Lower Monthly Payments:</strong> Payments based on what you can afford, 
                    not what you owe. Can be as low as $0/month if income is very low.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 text-xl">🎓</span>
                  <div>
                    <strong className="text-gray-900">Loan Forgiveness:</strong> Remaining balance forgiven after 20-25 years 
                    of qualifying payments. Also eligible for Public Service Loan Forgiveness (PSLF) after 10 years.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 text-xl">📊</span>
                  <div>
                    <strong className="text-gray-900">Flexible Payments:</strong> Payments adjust as your income changes. 
                    If you lose your job or income drops, your payment can decrease.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 text-xl">🛡️</span>
                  <div>
                    <strong className="text-gray-900">Financial Protection:</strong> Prevents default and protects credit score. 
                    Easier to manage than standard repayment if you have high debt relative to income.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Which IDR plan should I choose?</h3>
              <p className="text-gray-700">
                For most borrowers, the <strong>SAVE plan</strong> is the best choice because it offers the lowest payments (5% vs 10%) 
                and best interest benefits. If you're not eligible for SAVE, choose <strong>PAYE</strong> if you're a newer borrower 
                (first loan after Oct 2007) or <strong>REPAYE</strong> if you have graduate loans. Use this calculator to compare 
                estimated payments across different plans.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Do private student loans qualify for IDR?</h3>
              <p className="text-gray-700">
                <strong>No.</strong> Income-Driven Repayment plans are only available for federal student loans (Direct Loans, 
                Federal Stafford Loans, Federal PLUS Loans, and Federal Consolidation Loans). Private student loans from banks 
                or credit unions do not qualify. If you have private loans, contact your lender about their hardship or 
                income-based options.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How is discretionary income calculated?</h3>
              <p className="text-gray-700">
                Discretionary income = Your annual income minus 150% of the federal poverty guideline for your family size and state. 
                For example, if the poverty guideline is $15,000 for a single person, 150% is $22,500. If you earn $40,000, your 
                discretionary income is $17,500 ($40,000 - $22,500). Your IDR payment is then a percentage of this amount.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Will I pay more in total with an IDR plan?</h3>
              <p className="text-gray-700">
                <strong>Possibly, but not always.</strong> Because IDR extends your repayment period to 20-25 years (vs 10 years standard), 
                you may pay more interest over time. However, if you qualify for loan forgiveness, you'll pay less overall. Also, 
                the SAVE plan's interest subsidy can significantly reduce total costs. The key benefit is <strong>affordability</strong> - 
                lower monthly payments that fit your budget.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">What happens if my income increases?</h3>
              <p className="text-gray-700">
                Your payment will increase proportionally when you recertify your income annually. However, PAYE and IBR have a 
                <strong> payment cap</strong> - your payment will never exceed what you would pay on the standard 10-year plan. 
                REPAYE and SAVE don't have this cap, so payments can continue to increase with income. You can always switch 
                to a different repayment plan if your financial situation changes significantly.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How do I apply for an IDR plan?</h3>
              <p className="text-gray-700">
                Apply online at <strong>studentaid.gov</strong> using the Income-Driven Repayment Plan Request form. You'll need 
                your FSA ID, income information (tax return or pay stubs), and family size. Your loan servicer will process the 
                application and notify you of approval. The process typically takes 2-4 weeks. You must recertify your income 
                and family size annually to stay on the plan.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Is forgiven debt taxable?</h3>
              <p className="text-gray-700">
                As of 2024, <strong>no</strong> - forgiven federal student loan debt under IDR plans is not taxable through 2025 
                (extended by the American Rescue Plan). After 2025, tax treatment is uncertain and may change. However, loans 
                forgiven through <strong>Public Service Loan Forgiveness (PSLF)</strong> are always tax-free. Monitor federal 
                legislation for updates on the tax treatment of forgiven student loans.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IDREstimatorPage;
