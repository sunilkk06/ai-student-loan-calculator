import React, { useState } from 'react';
import { Wallet, Plus, Trash2, DollarSign, TrendingUp, TrendingDown, RotateCcw } from 'lucide-react';

interface IncomeItem {
  id: string;
  source: string;
  amount: string;
}

interface ExpenseItem {
  id: string;
  category: string;
  amount: string;
}

const BudgetPlannerPage: React.FC = () => {
  const [incomes, setIncomes] = useState<IncomeItem[]>([
    { id: '1', source: '', amount: '' }
  ]);
  
  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    { id: '1', category: '', amount: '' }
  ]);
  
  const [calculated, setCalculated] = useState(false);
  const [error, setError] = useState('');

  // Common income sources
  const incomeSources = [
    'Part-time Job',
    'Full-time Job',
    'Federal Work-Study',
    'Scholarships',
    'Grants',
    'Financial Aid',
    'Family Support',
    'Freelance Work',
    'Internship',
    'Other'
  ];

  // Common expense categories
  const expenseCategories = [
    'Rent/Housing',
    'Tuition & Fees',
    'Textbooks & Supplies',
    'Food & Groceries',
    'Transportation',
    'Utilities',
    'Internet & Phone',
    'Health Insurance',
    'Entertainment',
    'Personal Care',
    'Clothing',
    'Savings',
    'Other'
  ];

  // Add income
  const addIncome = () => {
    setIncomes([...incomes, { id: Date.now().toString(), source: '', amount: '' }]);
  };

  // Remove income
  const removeIncome = (id: string) => {
    if (incomes.length > 1) {
      setIncomes(incomes.filter(i => i.id !== id));
    }
  };

  // Update income
  const updateIncome = (id: string, field: 'source' | 'amount', value: string) => {
    setIncomes(incomes.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  // Add expense
  const addExpense = () => {
    setExpenses([...expenses, { id: Date.now().toString(), category: '', amount: '' }]);
  };

  // Remove expense
  const removeExpense = (id: string) => {
    if (expenses.length > 1) {
      setExpenses(expenses.filter(e => e.id !== id));
    }
  };

  // Update expense
  const updateExpense = (id: string, field: 'category' | 'amount', value: string) => {
    setExpenses(expenses.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  // Calculate totals
  const calculateBudget = () => {
    setError('');
    
    // Validate incomes
    if (incomes.some(i => !i.source || !i.amount)) {
      setError('Please fill in all income sources and amounts');
      return;
    }
    
    // Validate expenses
    if (expenses.some(e => !e.category || !e.amount)) {
      setError('Please fill in all expense categories and amounts');
      return;
    }
    
    setCalculated(true);
  };

  // Reset
  const resetBudget = () => {
    setIncomes([{ id: '1', source: '', amount: '' }]);
    setExpenses([{ id: '1', category: '', amount: '' }]);
    setCalculated(false);
    setError('');
  };

  // Calculate totals
  const totalIncome = incomes.reduce((sum, i) => sum + (parseFloat(i.amount) || 0), 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
  const netAmount = totalIncome - totalExpenses;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Wallet className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Student Budget Planner
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Manage your money day-to-day by tracking income and expenses. See your net monthly total and stay on top of your finances.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Income Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Monthly Income</h2>
                <button
                  onClick={addIncome}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Income
                </button>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              <div className="space-y-4">
                {incomes.map((income) => (
                  <div key={income.id} className="flex gap-3">
                    <select
                      value={income.source}
                      onChange={(e) => updateIncome(income.id, 'source', e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Select income source</option>
                      {incomeSources.map(source => (
                        <option key={source} value={source}>{source}</option>
                      ))}
                    </select>
                    <div className="relative w-40">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        value={income.amount}
                        onChange={(e) => updateIncome(income.id, 'amount', e.target.value)}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="0.00"
                        step="0.01"
                      />
                    </div>
                    {incomes.length > 1 && (
                      <button
                        onClick={() => removeIncome(income.id)}
                        className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Expenses Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Monthly Expenses</h2>
                <button
                  onClick={addExpense}
                  className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Expense
                </button>
              </div>

              <div className="space-y-4">
                {expenses.map((expense) => (
                  <div key={expense.id} className="flex gap-3">
                    <select
                      value={expense.category}
                      onChange={(e) => updateExpense(expense.id, 'category', e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="">Select expense category</option>
                      {expenseCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    <div className="relative w-40">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        value={expense.amount}
                        onChange={(e) => updateExpense(expense.id, 'amount', e.target.value)}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="0.00"
                        step="0.01"
                      />
                    </div>
                    {expenses.length > 1 && (
                      <button
                        onClick={() => removeExpense(expense.id)}
                        className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <button
                  onClick={calculateBudget}
                  className="flex-1 min-w-[150px] bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Calculate Budget
                </button>
                <button
                  onClick={resetBudget}
                  className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Budget Summary</h2>

              {calculated ? (
                <div className="space-y-6">
                  <div className="p-4 bg-green-50 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <h3 className="font-semibold text-gray-900">Total Income</h3>
                    </div>
                    <div className="text-3xl font-bold text-green-600">
                      ${totalIncome.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">per month</div>
                  </div>

                  <div className="p-4 bg-red-50 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingDown className="w-5 h-5 text-red-600" />
                      <h3 className="font-semibold text-gray-900">Total Expenses</h3>
                    </div>
                    <div className="text-3xl font-bold text-red-600">
                      ${totalExpenses.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">per month</div>
                  </div>

                  <div className={`p-6 rounded-xl ${netAmount >= 0 ? 'bg-gradient-to-r from-green-50 to-teal-50' : 'bg-gradient-to-r from-red-50 to-orange-50'}`}>
                    <h3 className="font-semibold text-gray-900 mb-2">Net Monthly Total</h3>
                    <div className={`text-4xl font-bold ${netAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {netAmount >= 0 ? '+' : ''}${netAmount.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                      {netAmount >= 0 ? 'Surplus' : 'Deficit'}
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-3">Income Breakdown</h3>
                    <div className="space-y-2">
                      {incomes.filter(i => i.source && i.amount).map(income => {
                        const amount = parseFloat(income.amount) || 0;
                        const percentage = totalIncome > 0 ? (amount / totalIncome * 100) : 0;
                        return (
                          <div key={income.id} className="flex justify-between text-sm">
                            <span className="text-gray-600">{income.source}:</span>
                            <span className="font-semibold">${amount.toFixed(2)} ({percentage.toFixed(0)}%)</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-3">Expense Breakdown</h3>
                    <div className="space-y-2">
                      {expenses.filter(e => e.category && e.amount).map(expense => {
                        const amount = parseFloat(expense.amount) || 0;
                        const percentage = totalIncome > 0 ? (amount / totalIncome * 100) : 0;
                        return (
                          <div key={expense.id} className="flex justify-between text-sm">
                            <span className="text-gray-600">{expense.category}:</span>
                            <span className="font-semibold">${amount.toFixed(2)} ({percentage.toFixed(0)}%)</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Advice */}
                  {netAmount < 0 && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <h3 className="font-semibold text-red-900 mb-2">⚠️ Budget Deficit</h3>
                      <p className="text-sm text-red-800">
                        Your expenses exceed your income by ${Math.abs(netAmount).toFixed(2)}. 
                        Consider reducing expenses or finding additional income sources.
                      </p>
                    </div>
                  )}

                  {netAmount >= 0 && netAmount < totalIncome * 0.1 && (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h3 className="font-semibold text-yellow-900 mb-2">💡 Tight Budget</h3>
                      <p className="text-sm text-yellow-800">
                        You have little buffer. Try to save at least 10-20% of income for emergencies.
                      </p>
                    </div>
                  )}

                  {netAmount >= totalIncome * 0.1 && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h3 className="font-semibold text-green-900 mb-2">✅ Healthy Budget</h3>
                      <p className="text-sm text-green-800">
                        Great job! You're saving ${netAmount.toFixed(2)}/month. Consider building an emergency fund.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Wallet className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Enter Your Budget</h3>
                  <p className="text-gray-500">
                    Add your income sources and expenses, then click "Calculate Budget" to see your financial summary.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Use the Budget Planner</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Step 1: Add Income Sources</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Select your income source (job, financial aid, etc.)</li>
                <li>Enter the monthly amount you receive</li>
                <li>Click "Add Income" for multiple sources</li>
                <li>Include all regular monthly income</li>
              </ol>
            </div>

            <div className="bg-red-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Step 2: Add Expenses</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Select expense category (rent, food, etc.)</li>
                <li>Enter the monthly amount you spend</li>
                <li>Click "Add Expense" for more categories</li>
                <li>Be honest about all spending</li>
              </ol>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Step 3: Calculate</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Click "Calculate Budget" to see results</li>
                <li>Review your net monthly total</li>
                <li>Check income and expense breakdowns</li>
                <li>Read personalized budget advice</li>
              </ol>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pro Tips</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Update your budget monthly</li>
                <li>Track actual spending vs planned</li>
                <li>Aim to save 10-20% of income</li>
                <li>Build a 3-6 month emergency fund</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Budgeting Tips Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Student Budgeting Tips</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">50/30/20 Rule</h3>
              <p className="text-gray-700 mb-3">
                A popular budgeting framework for students:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li><strong>50% Needs:</strong> Rent, food, utilities, tuition</li>
                <li><strong>30% Wants:</strong> Entertainment, dining out, hobbies</li>
                <li><strong>20% Savings:</strong> Emergency fund, debt repayment</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Money-Saving Strategies</h3>
              <ul className="space-y-2 text-gray-700">
                <li>🍜 <strong>Cook at home:</strong> Save $200-400/month vs eating out</li>
                <li>📚 <strong>Buy used textbooks:</strong> Save 50-70% on books</li>
                <li>🚌 <strong>Use student discounts:</strong> Transit, software, entertainment</li>
                <li>💳 <strong>Avoid credit card debt:</strong> High interest hurts budget</li>
                <li>🏠 <strong>Live with roommates:</strong> Split rent and utilities</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How much should I budget for food as a student?</h3>
              <p className="text-gray-700">
                Most students spend <strong>$200-400/month</strong> on food. With a meal plan, budget $100-200 for extras. 
                Cooking at home can keep costs under $250/month. Track your spending for a month to find your baseline, 
                then look for ways to reduce costs without sacrificing nutrition.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">What if my expenses exceed my income?</h3>
              <p className="text-gray-700">
                You have several options: (1) <strong>Reduce expenses</strong> - cut non-essentials, find cheaper alternatives, 
                (2) <strong>Increase income</strong> - part-time job, work-study, freelancing, (3) <strong>Apply for aid</strong> - 
                scholarships, grants, emergency funds, (4) <strong>Use student loans wisely</strong> - only borrow what you need. 
                Don't ignore a deficit - it leads to debt accumulation.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Should I include student loan payments in my budget?</h3>
              <p className="text-gray-700">
                <strong>Yes, if you're in repayment.</strong> If you're still in school with deferred loans, you don't need to 
                include payments yet, but it's smart to plan ahead. Use our Student Loan Calculator or IDR Estimator to see 
                what your future payments will be, then start saving now if possible.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How much should I save each month?</h3>
              <p className="text-gray-700">
                Aim for <strong>10-20% of your income</strong> if possible. Start with an emergency fund of $500-1,000, then 
                build to 3-6 months of expenses. Even saving $25-50/month adds up! Prioritize: (1) Emergency fund, 
                (2) High-interest debt, (3) Long-term savings. Use automatic transfers to make saving effortless.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">What expenses do students often forget?</h3>
              <p className="text-gray-700">
                Common forgotten expenses: <strong>Textbooks</strong> ($300-500/semester), <strong>health insurance</strong> 
                (if not on parent's plan), <strong>technology</strong> (laptop repairs, software), <strong>personal care</strong> 
                (haircuts, toiletries), <strong>laundry</strong>, <strong>parking permits</strong>, <strong>club dues</strong>, 
                and <strong>travel home</strong> for breaks. Track everything for a month to catch hidden costs.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How do I stick to my budget?</h3>
              <p className="text-gray-700">
                Tips for success: (1) <strong>Track spending</strong> - use apps or spreadsheets, (2) <strong>Use cash envelopes</strong> - 
                physical limits for discretionary spending, (3) <strong>Review weekly</strong> - catch overspending early, 
                (4) <strong>Plan meals</strong> - reduces food waste and impulse buys, (5) <strong>Find free activities</strong> - 
                campus events, student discounts. Be realistic - allow some fun money to avoid burnout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetPlannerPage;
