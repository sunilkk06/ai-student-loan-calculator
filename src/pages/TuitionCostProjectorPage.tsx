import React, { useState } from 'react';
import { TrendingUp, DollarSign, Calendar, Percent, Calculator, Info } from 'lucide-react';

const TuitionCostProjectorPage: React.FC = () => {
  const [currentCost, setCurrentCost] = useState<string>('30000');
  const [inflationRate, setInflationRate] = useState<string>('3.5');
  const [yearsToStart, setYearsToStart] = useState<string>('0');
  const [yearsOfStudy, setYearsOfStudy] = useState<string>('4');
  const [results, setResults] = useState<{
    yearlyBreakdown: Array<{ year: number; cost: number }>;
    totalCost: number;
    totalIncrease: number;
    percentageIncrease: number;
  } | null>(null);

  const calculateProjection = () => {
    const current = parseFloat(currentCost);
    const rate = parseFloat(inflationRate) / 100;
    const startYears = parseInt(yearsToStart);
    const studyYears = parseInt(yearsOfStudy);

    if (isNaN(current) || isNaN(rate) || isNaN(startYears) || isNaN(studyYears)) {
      return;
    }

    const yearlyBreakdown: Array<{ year: number; cost: number }> = [];
    let totalCost = 0;

    // Calculate cost for each year of study
    for (let i = 0; i < studyYears; i++) {
      const yearFromNow = startYears + i;
      const yearCost = current * Math.pow(1 + rate, yearFromNow);
      yearlyBreakdown.push({
        year: yearFromNow + 1,
        cost: yearCost
      });
      totalCost += yearCost;
    }

    const totalIncrease = totalCost - (current * studyYears);
    const percentageIncrease = ((totalCost / (current * studyYears)) - 1) * 100;

    setResults({
      yearlyBreakdown,
      totalCost,
      totalIncrease,
      percentageIncrease
    });
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    calculateProjection();
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-4">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Tuition Cost Projector
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Estimate future tuition costs by factoring in expected annual increases. 
            Plan ahead and understand the total investment needed for your education.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Calculator className="w-6 h-6 mr-2 text-blue-600" />
              Projection Parameters
            </h2>

            <form onSubmit={handleCalculate} className="space-y-6">
              {/* Current Tuition Cost */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 mr-1" />
                  Current Annual Tuition Cost
                </label>
                <input
                  type="number"
                  value={currentCost}
                  onChange={(e) => setCurrentCost(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="30000"
                  min="0"
                  step="100"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter the current annual tuition cost at your target institution
                </p>
              </div>

              {/* Inflation Rate */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <Percent className="w-4 h-4 mr-1" />
                  Expected Annual Increase Rate (%)
                </label>
                <input
                  type="number"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="3.5"
                  min="0"
                  max="20"
                  step="0.1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Historical average is 3-5% per year. Check your institution's trends.
                </p>
              </div>

              {/* Years Until Start */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 mr-1" />
                  Years Until Starting College
                </label>
                <input
                  type="number"
                  value={yearsToStart}
                  onChange={(e) => setYearsToStart(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="0"
                  min="0"
                  max="20"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter 0 if starting immediately, or number of years if planning ahead
                </p>
              </div>

              {/* Years of Study */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 mr-1" />
                  Duration of Degree (Years)
                </label>
                <input
                  type="number"
                  value={yearsOfStudy}
                  onChange={(e) => setYearsOfStudy(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="4"
                  min="1"
                  max="10"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Typical: 4 years for Bachelor's, 2 years for Master's
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Calculator className="w-5 h-5" />
                <span>Calculate Future Costs</span>
              </button>
            </form>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {results ? (
              <>
                {/* Summary Cards */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
                  <h3 className="text-lg font-semibold mb-2 opacity-90">Total Projected Cost</h3>
                  <p className="text-4xl font-bold mb-4">{formatCurrency(results.totalCost)}</p>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                    <div>
                      <p className="text-sm opacity-75">Total Increase</p>
                      <p className="text-xl font-bold">{formatCurrency(results.totalIncrease)}</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-75">% Increase</p>
                      <p className="text-xl font-bold">{results.percentageIncrease.toFixed(1)}%</p>
                    </div>
                  </div>
                </div>

                {/* Yearly Breakdown */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Year-by-Year Breakdown</h3>
                  <div className="space-y-3">
                    {results.yearlyBreakdown.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Year {item.year}</p>
                            <p className="text-sm text-gray-600">
                              {parseInt(yearsToStart) + index === 0 ? 'Starting now' : `${parseInt(yearsToStart) + index} years from now`}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900">{formatCurrency(item.cost)}</p>
                          <p className="text-sm text-gray-600">
                            +{formatCurrency(item.cost - parseFloat(currentCost))}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Average Annual Cost */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Average Annual Cost</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatCurrency(results.totalCost / results.yearlyBreakdown.length)}
                      </p>
                    </div>
                    <TrendingUp className="w-12 h-12 text-blue-500" />
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Info className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Calculate</h3>
                <p className="text-gray-600">
                  Enter your tuition information and click "Calculate Future Costs" to see your projection.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-12 max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Tuition Inflation</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Why Tuition Increases</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Operating costs and faculty salaries rise with inflation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Technology and facility upgrades require investment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Reduced state funding for public institutions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Increased demand for student services and support</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Planning Tips</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>Start saving early to take advantage of compound growth</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>Consider 529 plans for tax-advantaged college savings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>Research scholarship opportunities to offset costs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>Compare in-state vs out-of-state tuition rates</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TuitionCostProjectorPage;
