import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  Calendar,
  Percent,
  ArrowRight,
  Check,
  X,
  Plus,
  Trash2,
  Copy,
  BarChart3,
  PieChart,
  AlertCircle,
  Crown,
  Sparkles,
  Calculator
} from 'lucide-react';

interface Loan {
  id: string;
  name: string;
  principal: number;
  interestRate: number;
  termYears: number;
  monthlyPayment: number;
  totalPaid: number;
  totalInterest: number;
}

const LoanComparison: React.FC = () => {
  const [loans, setLoans] = useState<Loan[]>([
    {
      id: '1',
      name: 'Federal Subsidized',
      principal: 25000,
      interestRate: 4.5,
      termYears: 10,
      monthlyPayment: 0,
      totalPaid: 0,
      totalInterest: 0,
    },
    {
      id: '2',
      name: 'Private Loan Option',
      principal: 25000,
      interestRate: 6.8,
      termYears: 10,
      monthlyPayment: 0,
      totalPaid: 0,
      totalInterest: 0,
    },
  ]);

  const [editingLoan, setEditingLoan] = useState<string | null>(null);

  const calculateLoan = (principal: number, rate: number, years: number) => {
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = years * 12;
    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    const totalPaid = monthlyPayment * numberOfPayments;
    const totalInterest = totalPaid - principal;

    return {
      monthlyPayment: isNaN(monthlyPayment) ? 0 : monthlyPayment,
      totalPaid: isNaN(totalPaid) ? 0 : totalPaid,
      totalInterest: isNaN(totalInterest) ? 0 : totalInterest,
    };
  };

  const updateLoanCalculations = () => {
    setLoans(
      loans.map((loan) => {
        const calculations = calculateLoan(loan.principal, loan.interestRate, loan.termYears);
        return { ...loan, ...calculations };
      })
    );
  };

  React.useEffect(() => {
    updateLoanCalculations();
  }, []);

  const updateLoan = (id: string, field: keyof Loan, value: number | string) => {
    setLoans(
      loans.map((loan) => {
        if (loan.id === id) {
          const updatedLoan = { ...loan, [field]: value };
          if (field === 'principal' || field === 'interestRate' || field === 'termYears') {
            const calculations = calculateLoan(
              updatedLoan.principal,
              updatedLoan.interestRate,
              updatedLoan.termYears
            );
            return { ...updatedLoan, ...calculations };
          }
          return updatedLoan;
        }
        return loan;
      })
    );
  };

  const addLoan = () => {
    const newLoan: Loan = {
      id: Date.now().toString(),
      name: `Loan Option ${loans.length + 1}`,
      principal: 20000,
      interestRate: 5.5,
      termYears: 10,
      monthlyPayment: 0,
      totalPaid: 0,
      totalInterest: 0,
    };
    const calculations = calculateLoan(newLoan.principal, newLoan.interestRate, newLoan.termYears);
    setLoans([...loans, { ...newLoan, ...calculations }]);
  };

  const removeLoan = (id: string) => {
    if (loans.length > 1) {
      setLoans(loans.filter((loan) => loan.id !== id));
    }
  };

  const duplicateLoan = (loan: Loan) => {
    const newLoan = {
      ...loan,
      id: Date.now().toString(),
      name: `${loan.name} (Copy)`,
    };
    setLoans([...loans, newLoan]);
  };

  const getBestLoan = () => {
    if (loans.length === 0) return null;
    return loans.reduce((best, current) =>
      current.totalPaid < best.totalPaid ? current : best
    );
  };

  const bestLoan = getBestLoan();

  return (
    <section id="comparison" className="bg-gradient-to-br from-white via-blue-50 to-purple-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full mb-4">
            <BarChart3 className="w-4 h-4" />
            <span className="text-sm font-semibold">Compare & Save</span>
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Loan Comparison Tool</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Compare multiple loan options side-by-side to find the best deal and save thousands
          </p>
        </div>

        {/* Add Loan Button */}
        <div className="max-w-7xl mx-auto mb-8 flex justify-end">
          <button
            onClick={addLoan}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all group"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            <span className="font-semibold">Add Loan Option</span>
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {loans.map((loan, index) => {
              const isBest = bestLoan?.id === loan.id && loans.length > 1;
              const isEditing = editingLoan === loan.id;

              return (
                <div
                  key={loan.id}
                  className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all hover:shadow-2xl ${
                    isBest ? 'ring-4 ring-yellow-400' : ''
                  }`}
                >
                  {isBest && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-2 px-4 flex items-center justify-center space-x-2 z-10">
                      <Crown className="w-4 h-4" />
                      <span className="text-sm font-bold">Best Value</span>
                      <Sparkles className="w-4 h-4" />
                    </div>
                  )}

                  <div className={`p-6 ${isBest ? 'pt-12' : ''}`}>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      {isEditing ? (
                        <input
                          type="text"
                          value={loan.name}
                          onChange={(e) => updateLoan(loan.id, 'name', e.target.value)}
                          onBlur={() => setEditingLoan(null)}
                          className="text-xl font-bold text-gray-900 border-b-2 border-blue-600 focus:outline-none"
                          autoFocus
                        />
                      ) : (
                        <h3
                          className="text-xl font-bold text-gray-900 cursor-pointer hover:text-blue-600"
                          onClick={() => setEditingLoan(loan.id)}
                        >
                          {loan.name}
                        </h3>
                      )}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => duplicateLoan(loan)}
                          className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Duplicate"
                        >
                          <Copy className="w-4 h-4 text-blue-600" />
                        </button>
                        {loans.length > 1 && (
                          <button
                            onClick={() => removeLoan(loan.id)}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Input Fields */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="flex items-center justify-between text-sm font-semibold text-gray-700 mb-2">
                          <span className="flex items-center space-x-2">
                            <DollarSign className="w-4 h-4" />
                            <span>Loan Amount</span>
                          </span>
                          <span className="text-blue-600">${loan.principal.toLocaleString()}</span>
                        </label>
                        <input
                          type="range"
                          min="1000"
                          max="150000"
                          step="1000"
                          value={loan.principal}
                          onChange={(e) => updateLoan(loan.id, 'principal', Number(e.target.value))}
                          className="w-full h-2 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="flex items-center justify-between text-sm font-semibold text-gray-700 mb-2">
                          <span className="flex items-center space-x-2">
                            <Percent className="w-4 h-4" />
                            <span>Interest Rate</span>
                          </span>
                          <span className="text-blue-600">{loan.interestRate.toFixed(2)}%</span>
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="15"
                          step="0.1"
                          value={loan.interestRate}
                          onChange={(e) =>
                            updateLoan(loan.id, 'interestRate', Number(e.target.value))
                          }
                          className="w-full h-2 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="flex items-center justify-between text-sm font-semibold text-gray-700 mb-2">
                          <span className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>Loan Term</span>
                          </span>
                          <span className="text-blue-600">{loan.termYears} years</span>
                        </label>
                        <input
                          type="range"
                          min="5"
                          max="30"
                          step="1"
                          value={loan.termYears}
                          onChange={(e) => updateLoan(loan.id, 'termYears', Number(e.target.value))}
                          className="w-full h-2 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Results */}
                    <div className="space-y-3 pt-6 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Monthly Payment</span>
                        <span className="text-lg font-bold text-gray-900">
                          ${loan.monthlyPayment.toFixed(0)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total Interest</span>
                        <span className="text-lg font-bold text-orange-600">
                          ${loan.totalInterest.toFixed(0)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                        <span className="text-sm font-semibold text-gray-700">Total Cost</span>
                        <span className="text-xl font-bold text-blue-600">
                          ${loan.totalPaid.toFixed(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Comparison Summary */}
          {loans.length > 1 && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                  <PieChart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Comparison Summary</h3>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-semibold text-gray-700">Lowest Monthly</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    ${Math.min(...loans.map((l) => l.monthlyPayment)).toFixed(0)}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {loans.find((l) => l.monthlyPayment === Math.min(...loans.map((x) => x.monthlyPayment)))?.name}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-semibold text-gray-700">Lowest Total Cost</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    ${Math.min(...loans.map((l) => l.totalPaid)).toFixed(0)}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {loans.find((l) => l.totalPaid === Math.min(...loans.map((x) => x.totalPaid)))?.name}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calculator className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-semibold text-gray-700">Potential Savings</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-600">
                    ${(Math.max(...loans.map((l) => l.totalPaid)) - Math.min(...loans.map((l) => l.totalPaid))).toFixed(0)}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    By choosing the best option
                  </div>
                </div>
              </div>

              {/* Key Insights */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                <div className="flex items-center space-x-2 mb-4">
                  <Sparkles className="w-5 h-5" />
                  <h4 className="font-bold text-lg">Key Insights</h4>
                </div>
                <div className="space-y-3">
                  {bestLoan && (
                    <div className="flex items-start space-x-3">
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-white/90">
                        <span className="font-semibold">{bestLoan.name}</span> offers the lowest total cost
                        at ${bestLoan.totalPaid.toFixed(0)}, saving you $
                        {(Math.max(...loans.map((l) => l.totalPaid)) - bestLoan.totalPaid).toFixed(0)} compared
                        to the most expensive option.
                      </p>
                    </div>
                  )}
                  {loans.some((l) => l.interestRate > 7) && (
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-white/90">
                        Some loans have interest rates above 7%. Consider refinancing options or federal
                        loans for potentially better rates.
                      </p>
                    </div>
                  )}
                  <div className="flex items-start space-x-3">
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-white/90">
                      A difference of just 1% in interest rate can save you thousands over the life of
                      your loan. Shop around for the best rates!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LoanComparison;
