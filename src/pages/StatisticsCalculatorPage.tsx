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

        {/* How to Use Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Use the Statistics Calculator</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Step 1: Enter Your Data</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Type a single number and click "Add" (e.g., 85)</li>
                <li>Or enter multiple numbers separated by commas (e.g., 85, 90, 78, 92)</li>
                <li>Or enter numbers separated by spaces (e.g., 85 90 78 92)</li>
                <li>Press Enter to quickly add data</li>
              </ol>
            </div>

            <div className="bg-pink-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Step 2: Manage Your Data</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>View all entered data points in the grid</li>
                <li>Hover over any data point to see the delete button</li>
                <li>Click the trash icon to remove individual points</li>
                <li>Use "Clear All" to start over</li>
              </ol>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Step 3: Calculate</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Click "Calculate Statistics" button</li>
                <li>View results in the right panel</li>
                <li>See Central Tendency (mean, median, mode)</li>
                <li>Review Dispersion measures (std dev, variance, IQR)</li>
              </ol>
            </div>

            <div className="bg-teal-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pro Tips</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Add at least 3 data points for meaningful results</li>
                <li>Use decimal numbers for precise calculations</li>
                <li>Check for outliers that might skew results</li>
                <li>Compare mean vs median to detect skewness</li>
              </ul>
            </div>
          </div>
        </div>

        {/* What is Statistics Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Descriptive Statistics?</h2>

          <div className="prose max-w-none text-gray-700">
            <p className="text-lg mb-6">
              Descriptive statistics are numerical and graphical methods used to summarize and describe the main 
              features of a dataset. They provide simple summaries about the sample and measures, forming the 
              basis of virtually every quantitative analysis of data.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Key Statistical Measures</h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Measures of Central Tendency</h4>
                <div className="space-y-3">
                  <div>
                    <strong className="text-purple-900">Mean (Average):</strong>
                    <p className="text-gray-700 mt-1">
                      The sum of all values divided by the number of values. Best for normally distributed data 
                      without outliers. Example: Test scores 85, 90, 88 → Mean = 87.67
                    </p>
                  </div>
                  <div>
                    <strong className="text-purple-900">Median:</strong>
                    <p className="text-gray-700 mt-1">
                      The middle value when data is ordered. Less affected by outliers than mean. 
                      Example: Salaries 40k, 45k, 50k, 200k → Median = 47.5k (more representative than mean of 83.75k)
                    </p>
                  </div>
                  <div>
                    <strong className="text-purple-900">Mode:</strong>
                    <p className="text-gray-700 mt-1">
                      The most frequently occurring value(s). Useful for categorical data. 
                      Example: Shoe sizes 7, 8, 8, 9, 8, 10 → Mode = 8
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Measures of Dispersion</h4>
                <div className="space-y-3">
                  <div>
                    <strong className="text-blue-900">Standard Deviation:</strong>
                    <p className="text-gray-700 mt-1">
                      Measures how spread out numbers are from the mean. Low SD = data clustered near mean. 
                      High SD = data widely spread. Essential for understanding data variability.
                    </p>
                  </div>
                  <div>
                    <strong className="text-blue-900">Variance:</strong>
                    <p className="text-gray-700 mt-1">
                      The average of squared deviations from the mean. Variance = (Standard Deviation)². 
                      Used in advanced statistical tests and probability theory.
                    </p>
                  </div>
                  <div>
                    <strong className="text-blue-900">Range:</strong>
                    <p className="text-gray-700 mt-1">
                      The difference between maximum and minimum values. Simple measure of spread. 
                      Example: Test scores 65-95 → Range = 30 points
                    </p>
                  </div>
                  <div>
                    <strong className="text-blue-900">IQR (Interquartile Range):</strong>
                    <p className="text-gray-700 mt-1">
                      The range of the middle 50% of data (Q3 - Q1). Robust measure of spread that 
                      ignores outliers. Used to identify outliers in box plots.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Common Use Cases for Students</h3>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-3 text-xl">📊</span>
                  <div>
                    <strong className="text-gray-900">Statistics Courses:</strong> Calculate descriptive statistics for homework, 
                    understand data distributions, and prepare for exams
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-3 text-xl">🔬</span>
                  <div>
                    <strong className="text-gray-900">Research Projects:</strong> Analyze survey results, experimental data, 
                    and observational studies for psychology, sociology, and science courses
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-3 text-xl">📈</span>
                  <div>
                    <strong className="text-gray-900">Business Analytics:</strong> Analyze sales data, customer metrics, 
                    and financial performance for business and economics classes
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-3 text-xl">🎓</span>
                  <div>
                    <strong className="text-gray-900">Grade Analysis:</strong> Track your academic performance, 
                    calculate GPA statistics, and identify areas for improvement
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-3 text-xl">🏥</span>
                  <div>
                    <strong className="text-gray-900">Health Sciences:</strong> Analyze patient data, clinical trial results, 
                    and epidemiological studies for nursing and medical courses
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">When should I use mean vs median?</h3>
              <p className="text-gray-700">
                Use <strong>mean</strong> when your data is normally distributed without outliers (e.g., test scores, heights). 
                Use <strong>median</strong> when you have outliers or skewed data (e.g., income, house prices). The median is 
                more robust and represents the "typical" value better when extreme values are present.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">What does standard deviation tell me?</h3>
              <p className="text-gray-700">
                Standard deviation measures how spread out your data is. A <strong>low standard deviation</strong> (e.g., 2-3) 
                means data points are close to the mean - consistent results. A <strong>high standard deviation</strong> (e.g., 15-20) 
                means data is widely spread - high variability. In a normal distribution, about 68% of data falls within 1 SD of the mean.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How many data points do I need?</h3>
              <p className="text-gray-700">
                For basic descriptive statistics, you need at least <strong>3 data points</strong>, but more is better. 
                For reliable results: 30+ points for small studies, 100+ for surveys, 1000+ for population estimates. 
                The more data you have, the more accurate your statistical measures will be.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">What is the interquartile range (IQR) used for?</h3>
              <p className="text-gray-700">
                IQR is the range of the middle 50% of your data (Q3 - Q1). It's used to: (1) Measure spread without being 
                affected by outliers, (2) Identify outliers (values below Q1 - 1.5×IQR or above Q3 + 1.5×IQR), and 
                (3) Create box plots for visual data analysis. It's more robust than range for skewed distributions.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Can I use this for my statistics homework?</h3>
              <p className="text-gray-700">
                Absolutely! This calculator is perfect for verifying your manual calculations, checking homework answers, 
                and understanding statistical concepts. However, always show your work on assignments and use this tool 
                to learn and verify, not just to get answers. Understanding the concepts is more important than the numbers.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">What if my data has no mode?</h3>
              <p className="text-gray-700">
                If all values appear only once, there is no mode (the calculator will show "None"). This is common with 
                continuous data or unique measurements. Some datasets can have multiple modes (bimodal or multimodal), 
                which indicates multiple peaks in the distribution - this calculator will show all modes if they exist.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCalculatorPage;
