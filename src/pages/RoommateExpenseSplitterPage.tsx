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
      </div>
    </div>
  );
};

export default RoommateExpenseSplitterPage;
