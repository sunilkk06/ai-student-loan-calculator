import React, { useState } from 'react';
import { BarChart, Plus, Trash2, RotateCcw, TrendingUp, Activity } from 'lucide-react';

interface StatResult {
  mean: number;
  median: number;
  mode: number[];
  variance: number;
  stdDev: number;
  min: number;
  max: number;
  range: number;
  sum: number;
  count: number;
  q1: number;
  q3: number;
  iqr: number;
}

const StatisticsCalculatorPage: React.FC = () => {
  const [dataInput, setDataInput] = useState('');
  const [dataPoints, setDataPoints] = useState<number[]>([]);
  const [results, setResults] = useState<StatResult | null>(null);
  const [error, setError] = useState('');

  // Calculate statistics
  const calculateStats = () => {
    setError('');
    
    if (dataPoints.length === 0) {
      setError('Please add data points to calculate statistics');
      return;
    }

    const sorted = [...dataPoints].sort((a, b) => a - b);
    const n = sorted.length;
    const sum = sorted.reduce((acc, val) => acc + val, 0);
    const mean = sum / n;

    // Median
    const median = n % 2 === 0
      ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2
      : sorted[Math.floor(n / 2)];

    // Mode
    const frequency: { [key: number]: number } = {};
    sorted.forEach(val => {
      frequency[val] = (frequency[val] || 0) + 1;
    });
    const maxFreq = Math.max(...Object.values(frequency));
    const mode = Object.keys(frequency)
      .filter(key => frequency[Number(key)] === maxFreq)
      .map(Number);

    // Variance and Standard Deviation
    const variance = sorted.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / n;
    const stdDev = Math.sqrt(variance);

    // Quartiles
    const q1Index = Math.floor(n / 4);
    const q3Index = Math.floor(3 * n / 4);
    const q1 = sorted[q1Index];
    const q3 = sorted[q3Index];
    const iqr = q3 - q1;

    setResults({
      mean,
      median,
      mode: maxFreq > 1 ? mode : [],
      variance,
      stdDev,
      min: sorted[0],
      max: sorted[n - 1],
      range: sorted[n - 1] - sorted[0],
      sum,
      count: n,
      q1,
      q3,
      iqr
    });
  };

  // Add data point
  const addDataPoint = () => {
    const value = parseFloat(dataInput);
    if (isNaN(value)) {
      setError('Please enter a valid number');
      return;
    }
    setDataPoints([...dataPoints, value]);
    setDataInput('');
    setError('');
  };

  // Add multiple data points (comma or space separated)
  const addMultipleDataPoints = () => {
    const values = dataInput
      .split(/[,\s]+/)
      .map(v => v.trim())
      .filter(v => v !== '')
      .map(v => parseFloat(v));

    if (values.some(isNaN)) {
      setError('Please enter valid numbers separated by commas or spaces');
      return;
    }

    setDataPoints([...dataPoints, ...values]);
    setDataInput('');
    setError('');
  };

  // Remove data point
  const removeDataPoint = (index: number) => {
    setDataPoints(dataPoints.filter((_, i) => i !== index));
  };

  // Clear all data
  const clearAll = () => {
    setDataPoints([]);
    setDataInput('');
    setResults(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
            <BarChart className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Statistics Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Calculate mean, median, mode, standard deviation, variance, and other descriptive statistics for your data sets.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Input</h2>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Data Points
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={dataInput}
                      onChange={(e) => setDataInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          if (dataInput.includes(',') || dataInput.includes(' ')) {
                            addMultipleDataPoints();
                          } else {
                            addDataPoint();
                          }
                        }
                      }}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Enter numbers (e.g., 5, 10, 15 or just 5)"
                    />
                    <button
                      onClick={() => {
                        if (dataInput.includes(',') || dataInput.includes(' ')) {
                          addMultipleDataPoints();
                        } else {
                          addDataPoint();
                        }
                      }}
                      className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Enter a single number or multiple numbers separated by commas or spaces
                  </p>
                </div>

                {/* Data Points Display */}
                {dataPoints.length > 0 && (
                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold text-gray-900">
                        Data Points ({dataPoints.length})
                      </h3>
                      <button
                        onClick={clearAll}
                        className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Clear All
                      </button>
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 max-h-64 overflow-y-auto p-4 bg-gray-50 rounded-lg">
                      {dataPoints.map((point, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-gray-200 group"
                        >
                          <span className="text-sm font-medium">{point}</span>
                          <button
                            onClick={() => removeDataPoint(index)}
                            className="ml-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={calculateStats}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all mt-6"
                >
                  Calculate Statistics
                </button>
              </div>
            </div>

            {/* Information Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About Descriptive Statistics</h2>
              <div className="space-y-3 text-gray-600">
                <p>
                  <strong className="text-gray-900">Mean:</strong> The average of all data points.
                </p>
                <p>
                  <strong className="text-gray-900">Median:</strong> The middle value when data is sorted.
                </p>
                <p>
                  <strong className="text-gray-900">Mode:</strong> The most frequently occurring value(s).
                </p>
                <p>
                  <strong className="text-gray-900">Standard Deviation:</strong> Measures the spread of data around the mean.
                </p>
                <p>
                  <strong className="text-gray-900">Variance:</strong> The average of squared differences from the mean.
                </p>
                <p>
                  <strong className="text-gray-900">IQR:</strong> Interquartile range, the spread of the middle 50% of data.
                </p>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Results</h2>

              {results ? (
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                      <h3 className="font-semibold text-gray-900">Central Tendency</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mean:</span>
                        <span className="font-bold text-purple-600">{results.mean.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Median:</span>
                        <span className="font-bold">{results.median.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mode:</span>
                        <span className="font-bold">
                          {results.mode.length > 0 ? results.mode.join(', ') : 'None'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-5 h-5 text-blue-600" />
                      <h3 className="font-semibold text-gray-900">Dispersion</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Std Dev:</span>
                        <span className="font-bold text-blue-600">{results.stdDev.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Variance:</span>
                        <span className="font-bold">{results.variance.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Range:</span>
                        <span className="font-bold">{results.range.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">IQR:</span>
                        <span className="font-bold">{results.iqr.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h3 className="font-semibold text-gray-900 mb-2">Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Count:</span>
                        <span className="font-bold">{results.count}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sum:</span>
                        <span className="font-bold">{results.sum.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Min:</span>
                        <span className="font-bold">{results.min.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Max:</span>
                        <span className="font-bold">{results.max.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Q1:</span>
                        <span className="font-bold">{results.q1.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Q3:</span>
                        <span className="font-bold">{results.q3.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <BarChart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Enter Data</h3>
                  <p className="text-gray-500">
                    Add data points and click "Calculate Statistics" to see the results.
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

export default StatisticsCalculatorPage;
