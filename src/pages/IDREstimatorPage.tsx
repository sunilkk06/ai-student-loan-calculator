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
      </div>
    </div>
  );
};

export default IDREstimatorPage;
