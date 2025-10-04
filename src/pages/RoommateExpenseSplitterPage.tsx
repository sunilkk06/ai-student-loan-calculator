import React, { useState } from 'react';
import { Users, Plus, Trash2, DollarSign, RotateCcw } from 'lucide-react';

interface Roommate {
  id: string;
  name: string;
}

interface Expense {
  id: string;
  description: string;
  amount: string;
  paidBy: string;
  splitType: 'equal' | 'custom';
  customShares: { [key: string]: string };
}

interface Balance {
  roommateName: string;
  owes: number;
  owedBy: number;
  net: number;
}

const RoommateExpenseSplitterPage: React.FC = () => {
  const [roommates, setRoommates] = useState<Roommate[]>([
    { id: '1', name: 'Roommate 1' },
    { id: '2', name: 'Roommate 2' }
  ]);
  
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: '1',
      description: 'Rent',
      amount: '',
      paidBy: '1',
      splitType: 'equal',
      customShares: {}
    }
  ]);
  
  const [balances, setBalances] = useState<Balance[]>([]);
  const [error, setError] = useState('');
  
  // Add roommate
  const addRoommate = () => {
    if (roommates.length >= 6) {
      setError('Maximum 6 roommates allowed');
      return;
    }
    const newId = Date.now().toString();
    setRoommates([...roommates, { id: newId, name: `Roommate ${roommates.length + 1}` }]);
  };
  
  // Remove roommate
  const removeRoommate = (id: string) => {
    if (roommates.length <= 1) {
      setError('At least one roommate is required');
      return;
    }
    setRoommates(roommates.filter(r => r.id !== id));
    // Update expenses to remove this roommate
    setExpenses(expenses.map(exp => {
      const newShares = { ...exp.customShares };
      delete newShares[id];
      return {
        ...exp,
        paidBy: exp.paidBy === id ? roommates[0].id : exp.paidBy,
        customShares: newShares
      };
    }));
  };
  
  // Update roommate name
  const updateRoommateName = (id: string, name: string) => {
    setRoommates(roommates.map(r => r.id === id ? { ...r, name } : r));
  };
  
  // Add expense
  const addExpense = () => {
    const newId = Date.now().toString();
    setExpenses([...expenses, {
      id: newId,
      description: '',
      amount: '',
      paidBy: roommates[0].id,
      splitType: 'equal',
      customShares: {}
    }]);
  };
  
  // Remove expense
  const removeExpense = (id: string) => {
    if (expenses.length <= 1) {
      setError('At least one expense is required');
      return;
    }
    setExpenses(expenses.filter(e => e.id !== id));
  };
  
  // Update expense
  const updateExpense = (id: string, field: keyof Expense, value: any) => {
    setExpenses(expenses.map(exp => {
      if (exp.id === id) {
        return { ...exp, [field]: value };
      }
      return exp;
    }));
  };
  
  // Update custom share
  const updateCustomShare = (expenseId: string, roommateId: string, share: string) => {
    setExpenses(expenses.map(exp => {
      if (exp.id === expenseId) {
        return {
          ...exp,
          customShares: { ...exp.customShares, [roommateId]: share }
        };
      }
      return exp;
    }));
  };
  
  // Calculate balances
  const calculateBalances = () => {
    setError('');
    
    // Validate inputs
    if (roommates.some(r => !r.name.trim())) {
      setError('Please enter names for all roommates');
      return;
    }
    
    if (expenses.some(e => !e.description.trim() || !e.amount)) {
      setError('Please enter description and amount for all expenses');
      return;
    }
    
    // Initialize balances
    const balanceMap: { [key: string]: { owes: number; owedBy: number } } = {};
    roommates.forEach(r => {
      balanceMap[r.id] = { owes: 0, owedBy: 0 };
    });
    
    // Calculate each expense
    for (const expense of expenses) {
      const amount = parseFloat(expense.amount);
      if (isNaN(amount) || amount <= 0) {
        setError(`Invalid amount for expense: ${expense.description}`);
        return;
      }
      
      // Person who paid
      balanceMap[expense.paidBy].owedBy += amount;
      
      // Calculate shares
      if (expense.splitType === 'equal') {
        const sharePerPerson = amount / roommates.length;
        roommates.forEach(r => {
          balanceMap[r.id].owes += sharePerPerson;
        });
      } else {
        // Custom split
        const shares: { [key: string]: number } = {};
        let totalShares = 0;
        
        roommates.forEach(r => {
          const share = parseFloat(expense.customShares[r.id] || '1');
          if (isNaN(share) || share < 0) {
            setError(`Invalid share for ${r.name} in expense: ${expense.description}`);
            return;
          }
          shares[r.id] = share;
          totalShares += share;
        });
        
        if (totalShares === 0) {
          setError(`Total shares cannot be zero for expense: ${expense.description}`);
          return;
        }
        
        roommates.forEach(r => {
          const shareAmount = (amount * shares[r.id]) / totalShares;
          balanceMap[r.id].owes += shareAmount;
        });
      }
    }
    
    // Calculate net balances
    const calculatedBalances: Balance[] = roommates.map(r => ({
      roommateName: r.name,
      owes: balanceMap[r.id].owes,
      owedBy: balanceMap[r.id].owedBy,
      net: balanceMap[r.id].owedBy - balanceMap[r.id].owes
    }));
    
    setBalances(calculatedBalances);
  };
  
  // Reset form
  const resetForm = () => {
    setRoommates([
      { id: '1', name: 'Roommate 1' },
      { id: '2', name: 'Roommate 2' }
    ]);
    setExpenses([
      {
        id: '1',
        description: 'Rent',
        amount: '',
        paidBy: '1',
        splitType: 'equal',
        customShares: {}
      }
    ]);
    setBalances([]);
    setError('');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Users className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Roommate Expense Splitter
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Split shared expenses fairly with your roommates. Handle rent, utilities, groceries, and more with equal or custom splits.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2">
            {/* Roommates Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Roommates</h2>
                <button
                  onClick={addRoommate}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Roommate
                </button>
              </div>
              
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700">{error}</p>
                </div>
              )}
              
              <div className="space-y-4">
                {roommates.map((roommate, index) => (
                  <div key={roommate.id} className="flex items-center gap-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={roommate.name}
                        onChange={(e) => updateRoommateName(roommate.id, e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder={`Roommate ${index + 1} name`}
                      />
                    </div>
                    {roommates.length > 1 && (
                      <button
                        onClick={() => removeRoommate(roommate.id)}
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
                <h2 className="text-2xl font-bold text-gray-900">Shared Expenses</h2>
                <button
                  onClick={addExpense}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Expense
                </button>
              </div>
              
              <div className="space-y-6">
                {expenses.map((expense, index) => (
                  <div key={expense.id} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Expense #{index + 1}</h3>
                      {expenses.length > 1 && (
                        <button
                          onClick={() => removeExpense(expense.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <input
                          type="text"
                          value={expense.description}
                          onChange={(e) => updateExpense(expense.id, 'description', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          placeholder="e.g., Rent, Electricity, Groceries"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Amount ($)
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <DollarSign className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="number"
                              value={expense.amount}
                              onChange={(e) => updateExpense(expense.id, 'amount', e.target.value)}
                              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                              placeholder="0.00"
                              step="0.01"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Paid By
                          </label>
                          <select
                            value={expense.paidBy}
                            onChange={(e) => updateExpense(expense.id, 'paidBy', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          >
                            {roommates.map(r => (
                              <option key={r.id} value={r.id}>{r.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Split Type
                        </label>
                        <select
                          value={expense.splitType}
                          onChange={(e) => updateExpense(expense.id, 'splitType', e.target.value as 'equal' | 'custom')}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                          <option value="equal">Equal Split</option>
                          <option value="custom">Custom Shares</option>
                        </select>
                      </div>
                      
                      {expense.splitType === 'custom' && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <h4 className="text-sm font-medium text-gray-700 mb-3">Custom Shares</h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {roommates.map(r => (
                              <div key={r.id}>
                                <label className="block text-xs text-gray-500 mb-1">
                                  {r.name}
                                </label>
                                <input
                                  type="number"
                                  value={expense.customShares[r.id] || '1'}
                                  onChange={(e) => updateCustomShare(expense.id, r.id, e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                                  min="0"
                                  step="0.1"
                                />
                              </div>
                            ))}
                          </div>
                          <p className="mt-2 text-xs text-gray-500">
                            Enter share values (e.g., 1, 2, 1.5). The expense will be split proportionally.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4 mt-8">
                <button
                  onClick={calculateBalances}
                  className="flex-1 min-w-[150px] bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Calculate Splits
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
          
          {/* Results Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Expense Summary</h2>
              
              {balances.length > 0 ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Net Balances:</h3>
                    <div className="space-y-3">
                      {balances.map((balance, index) => (
                        <div key={index} className="p-4 rounded-lg bg-gray-50">
                          <div className="font-medium text-gray-900 mb-2">{balance.roommateName}</div>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Owes:</span>
                              <span className="font-semibold">${balance.owes.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Paid:</span>
                              <span className="font-semibold">${balance.owedBy.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-gray-200">
                              <span className="text-gray-600">Net:</span>
                              <span className={`font-bold ${balance.net > 0 ? 'text-green-600' : balance.net < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                                {balance.net > 0 ? '+' : ''} ${balance.net.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2">How to Settle:</h3>
                    <div className="text-sm text-gray-600 space-y-2">
                      {balances.filter(b => b.net < 0).map((debtor, i) => {
                        const creditor = balances.find(b => b.net > 0);
                        if (creditor) {
                          return (
                            <div key={i} className="p-3 bg-blue-50 rounded-lg">
                              <strong>{debtor.roommateName}</strong> pays{' '}
                              <strong>{creditor.roommateName}</strong>:{' '}
                              <span className="font-bold text-green-600">
                                ${Math.abs(debtor.net).toFixed(2)}
                              </span>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-900 mb-2">Tip</h3>
                    <p className="text-sm text-green-800">
                      Use a payment app like Venmo or Zelle to easily transfer money between roommates.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Calculate Splits</h3>
                  <p className="text-gray-500">
                    Add roommates and expenses, then click "Calculate Splits" to see who owes what.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Use the Roommate Expense Splitter</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Step 1: Add Roommates</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Enter names for each roommate (up to 6 people)</li>
                <li>Click "Add Roommate" to add more people</li>
                <li>Use real names or nicknames for easy identification</li>
                <li>Remove roommates by clicking the trash icon</li>
              </ol>
            </div>

            <div className="bg-teal-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Step 2: Add Expenses</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Enter expense description (e.g., "Rent", "Electricity")</li>
                <li>Enter the total amount paid</li>
                <li>Select who paid for this expense</li>
                <li>Choose equal or custom split</li>
              </ol>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Step 3: Choose Split Type</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Equal Split:</strong> Divides expense evenly among all roommates</li>
                <li><strong>Custom Shares:</strong> Set different shares for each person (e.g., 1, 2, 1.5)</li>
                <li>Custom shares are proportional (2 = double share)</li>
                <li>Use for unequal room sizes or usage</li>
              </ul>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Step 4: Calculate & Settle</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Click "Calculate Splits" to see results</li>
                <li>View who owes what in the summary panel</li>
                <li>See settlement instructions (who pays whom)</li>
                <li>Use Venmo, Zelle, or Cash App to transfer money</li>
              </ol>
            </div>
          </div>
        </div>

        {/* What is Expense Splitting Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Roommate Expense Splitting?</h2>

          <div className="prose max-w-none text-gray-700">
            <p className="text-lg mb-6">
              Roommate expense splitting is the process of fairly dividing shared costs among people living together. 
              This calculator helps you track who paid what, calculate fair shares, and determine who owes money to whom. 
              It's essential for maintaining financial transparency and avoiding conflicts in shared living situations.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Common Shared Expenses</h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Housing Costs</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Rent:</strong> Usually split equally, or by room size</li>
                  <li><strong>Security Deposit:</strong> Split equally at move-in</li>
                  <li><strong>Renters Insurance:</strong> Can be individual or shared</li>
                  <li><strong>Parking Fees:</strong> Split by number of cars</li>
                </ul>
              </div>

              <div className="bg-teal-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Utilities</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Electricity:</strong> Usually split equally</li>
                  <li><strong>Water/Sewer:</strong> Split equally or by usage</li>
                  <li><strong>Gas/Heat:</strong> Split equally</li>
                  <li><strong>Internet/Cable:</strong> Split equally among users</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Household Items</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Groceries:</strong> Can be individual or shared</li>
                  <li><strong>Cleaning Supplies:</strong> Split equally</li>
                  <li><strong>Toilet Paper/Paper Towels:</strong> Split equally</li>
                  <li><strong>Furniture:</strong> Discuss ownership before buying</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Other Expenses</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Streaming Services:</strong> Split among users</li>
                  <li><strong>Pest Control:</strong> Split equally</li>
                  <li><strong>Maintenance/Repairs:</strong> Depends on cause</li>
                  <li><strong>Moving Costs:</strong> Individual responsibility</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Split Methods Explained</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Equal Split</h4>
                <p className="mb-3">
                  Divides the expense evenly among all roommates. Best for utilities, cleaning supplies, and shared items 
                  where everyone benefits equally.
                </p>
                <p className="text-sm bg-white p-3 rounded">
                  <strong>Example:</strong> $1,200 rent ÷ 3 roommates = $400 each
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Custom Shares (Proportional)</h4>
                <p className="mb-3">
                  Splits expense based on different shares for each person. Use when rooms are different sizes, 
                  or usage varies significantly.
                </p>
                <p className="text-sm bg-white p-3 rounded">
                  <strong>Example:</strong> $1,200 rent, shares 2:1:1 (master bedroom gets 2 shares)<br/>
                  Total shares = 4, so $1,200 ÷ 4 = $300 per share<br/>
                  Master bedroom: $600, Others: $300 each
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Best Practices for Roommates</h3>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 text-xl">📝</span>
                  <div>
                    <strong className="text-gray-900">Document Everything:</strong> Keep receipts and track all shared expenses. 
                    Use this calculator monthly to stay organized and avoid disputes.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 text-xl">💬</span>
                  <div>
                    <strong className="text-gray-900">Communicate Clearly:</strong> Discuss and agree on split methods before 
                    expenses occur. Be transparent about financial situations.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 text-xl">⏰</span>
                  <div>
                    <strong className="text-gray-900">Set Payment Deadlines:</strong> Agree on when payments are due (e.g., 
                    within 3 days of calculation). Use payment apps for quick transfers.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 text-xl">🔄</span>
                  <div>
                    <strong className="text-gray-900">Rotate Responsibilities:</strong> Take turns paying bills to distribute 
                    the burden. Calculate and settle monthly to avoid large balances.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 text-xl">📱</span>
                  <div>
                    <strong className="text-gray-900">Use Digital Payments:</strong> Venmo, Zelle, Cash App, or PayPal make 
                    transfers instant and trackable. Keep payment confirmations.
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Should rent be split equally or by room size?</h3>
              <p className="text-gray-700">
                It depends on your agreement. <strong>Equal split</strong> is simpler and works well when rooms are similar. 
                <strong>Split by room size</strong> is fairer when one person has a master bedroom or significantly larger space. 
                Use custom shares (e.g., 1.5 for master, 1 for others) to account for size differences. Discuss and agree before 
                signing the lease.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How do we handle someone who uses more utilities?</h3>
              <p className="text-gray-700">
                For most utilities (electricity, water), equal split is standard since usage is hard to track individually. 
                If someone consistently uses significantly more (e.g., long showers, AC on 24/7), have a conversation about 
                conservation or consider custom shares. For internet, split equally among users. For streaming services, 
                only charge people who actually use them.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">What if someone can't pay their share on time?</h3>
              <p className="text-gray-700">
                Communicate early if you're having financial difficulties. Options: (1) Set up a payment plan, (2) Temporarily 
                adjust responsibilities (they do more chores), (3) Have them pay their share of rent/utilities directly to landlord/utility. 
                <strong>Important:</strong> If someone consistently can't pay, they may need to find a more affordable living situation. 
                Don't let unpaid balances accumulate - address issues immediately.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How often should we calculate and settle expenses?</h3>
              <p className="text-gray-700">
                <strong>Monthly</strong> is ideal for most roommate situations. Calculate all shared expenses at the end of each month 
                and settle within a week. This prevents large balances from building up and keeps finances transparent. For large 
                one-time expenses (furniture, security deposit), settle immediately. Use this calculator to track running totals 
                throughout the month.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Should groceries be shared or individual?</h3>
              <p className="text-gray-700">
                This varies by household. <strong>Shared groceries</strong> work well if you eat together and have similar diets - 
                split costs equally or rotate who shops. <strong>Individual groceries</strong> are clearer if you have different 
                schedules, diets, or eating habits - label your food and buy your own. Many roommates do a hybrid: share staples 
                (milk, bread, eggs) and keep special items individual.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">What about couples living with roommates?</h3>
              <p className="text-gray-700">
                Couples typically count as <strong>two people</strong> for most expenses. For rent, they might pay 1.5x a single 
                person's share if sharing one bedroom (since they use less space per person). For utilities and groceries, they 
                should pay double since they're two people using resources. Use custom shares to set this up: if 3 people total 
                (1 couple + 1 single), use shares like 1:1:0.5 for rent, or 2:1 for utilities.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How do we handle someone moving out mid-month?</h3>
              <p className="text-gray-700">
                Calculate their share <strong>pro-rated by days</strong>. For example, if they move out on the 15th of a 30-day month, 
                they pay 15/30 = 50% of that month's expenses. Settle all outstanding balances before they leave. For security deposit, 
                the new roommate typically pays the leaving roommate directly (not through the landlord). Document everything in writing 
                and get signatures.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoommateExpenseSplitterPage;
