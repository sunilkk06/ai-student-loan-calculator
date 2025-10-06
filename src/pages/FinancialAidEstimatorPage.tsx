import React, { useState } from 'react';
import { GraduationCap, DollarSign, Users, Home, TrendingUp, RotateCcw, AlertCircle } from 'lucide-react';

interface SAIResult {
  sai: number;
  expectedFamilyContribution: number;
  estimatedNeed: number;
  pellEligible: boolean;
  estimatedPellGrant: number;
}

const FinancialAidEstimatorPage: React.FC = () => {
  // Parent Information
  const [parentIncome, setParentIncome] = useState('');
  const [parentAssets, setParentAssets] = useState('');
  const [numberOfParents, setNumberOfParents] = useState<'1' | '2'>('2');
  
  // Student Information
  const [studentIncome, setStudentIncome] = useState('');
  const [studentAssets, setStudentAssets] = useState('');
  const [isDependent, setIsDependent] = useState(true);
  
  // Family Information
  const [familySize, setFamilySize] = useState('4');
  const [numberOfInCollege, setNumberOfInCollege] = useState('1');
  const [stateOfResidence, setStateOfResidence] = useState('');
  
  // College Information
  const [costOfAttendance, setCostOfAttendance] = useState('');
  
  const [result, setResult] = useState<SAIResult | null>(null);
  const [error, setError] = useState('');

  const calculateSAI = () => {
    setError('');
    setResult(null);

    const pIncome = parseFloat(parentIncome) || 0;
    const pAssets = parseFloat(parentAssets) || 0;
    const sIncome = parseFloat(studentIncome) || 0;
    const sAssets = parseFloat(studentAssets) || 0;
    const fSize = parseInt(familySize);
    const numInCollege = parseInt(numberOfInCollege);
    const coa = parseFloat(costOfAttendance) || 50000;

    if (!isDependent && sIncome === 0) {
      setError('Please enter student income for independent students');
      return;
    }

    if (isDependent && pIncome === 0) {
      setError('Please enter parent income for dependent students');
      return;
    }

    // Simplified SAI Calculation (based on federal methodology)
    let parentContribution = 0;
    let studentContribution = 0;

    if (isDependent) {
      // Parent Contribution Calculation
      const incomeProtectionAllowance = 30000 + (fSize - 2) * 5000; // Simplified
      const availableIncome = Math.max(0, pIncome - incomeProtectionAllowance);
      
      // Progressive assessment rate (simplified)
      let assessedIncome = 0;
      if (availableIncome <= 20000) {
        assessedIncome = availableIncome * 0.22;
      } else if (availableIncome <= 40000) {
        assessedIncome = 20000 * 0.22 + (availableIncome - 20000) * 0.25;
      } else {
        assessedIncome = 20000 * 0.22 + 20000 * 0.25 + (availableIncome - 40000) * 0.29;
      }

      // Asset assessment (simplified - 12% of assets above protection allowance)
      const assetProtectionAllowance = numberOfParents === '2' ? 15000 : 10000;
      const assessedAssets = Math.max(0, pAssets - assetProtectionAllowance) * 0.12;

      parentContribution = (assessedIncome + assessedAssets) / numInCollege;
    }

    // Student Contribution Calculation
    const studentIncomeProtection = 7600; // Simplified
    const availableStudentIncome = Math.max(0, sIncome - studentIncomeProtection);
    const assessedStudentIncome = availableStudentIncome * 0.5; // 50% of student income

    // Student assets assessed at 20%
    const assessedStudentAssets = sAssets * 0.2;

    studentContribution = assessedStudentIncome + assessedStudentAssets;

    // Total SAI
    const sai = Math.max(0, Math.round(parentContribution + studentContribution));

    // Estimated Financial Need
    const estimatedNeed = Math.max(0, coa - sai);

    // Pell Grant Eligibility (2024-25 academic year estimates)
    const maxPellGrant = 7395;
    let pellEligible = false;
    let estimatedPellGrant = 0;

    if (sai <= 6656) {
      pellEligible = true;
      // Simplified Pell calculation
      if (sai === 0) {
        estimatedPellGrant = maxPellGrant;
      } else {
        estimatedPellGrant = Math.max(0, maxPellGrant - (sai * 0.6));
      }
      estimatedPellGrant = Math.round(estimatedPellGrant);
    }

    setResult({
      sai,
      expectedFamilyContribution: sai,
      estimatedNeed,
      pellEligible,
      estimatedPellGrant
    });
  };

  const handleReset = () => {
    setParentIncome('');
    setParentAssets('');
    setStudentIncome('');
    setStudentAssets('');
    setNumberOfParents('2');
    setFamilySize('4');
    setNumberOfInCollege('1');
    setStateOfResidence('');
    setCostOfAttendance('');
    setIsDependent(true);
    setResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <GraduationCap className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Student Aid Index (SAI) Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Estimate your Student Aid Index and potential financial aid eligibility before filling out FAFSA. Get an early idea of your expected family contribution and Pell Grant eligibility.
          </p>
        </div>

        {/* Important Notice */}
        <div className="max-w-4xl mx-auto mb-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-1">Estimate Only</h3>
              <p className="text-sm text-yellow-800">
                This is a simplified estimator. Your actual SAI may differ based on additional factors considered in the official FAFSA calculation. Always complete the official FAFSA for accurate results.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Financial Information</h2>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              {/* Dependency Status */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Student Dependency Status
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setIsDependent(true)}
                    className={`py-3 px-4 rounded-lg font-semibold transition-colors ${
                      isDependent
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Dependent
                  </button>
                  <button
                    onClick={() => setIsDependent(false)}
                    className={`py-3 px-4 rounded-lg font-semibold transition-colors ${
                      !isDependent
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Independent
                  </button>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Most undergraduates under 24 are dependent. Independent: married, have dependents, military, graduate student, or meet other criteria.
                </p>
              </div>

              <div className="space-y-6">
                {/* Parent Information (if dependent) */}
                {isDependent && (
                  <div className="border-t pt-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      Parent Information
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Number of Parents in Household
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={() => setNumberOfParents('1')}
                            className={`py-3 px-4 rounded-lg font-semibold transition-colors ${
                              numberOfParents === '1'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            One Parent
                          </button>
                          <button
                            onClick={() => setNumberOfParents('2')}
                            className={`py-3 px-4 rounded-lg font-semibold transition-colors ${
                              numberOfParents === '2'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            Two Parents
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Parent Annual Income
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <DollarSign className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="number"
                            value={parentIncome}
                            onChange={(e) => setParentIncome(e.target.value)}
                            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="75000"
                            step="1000"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Adjusted Gross Income (AGI) from tax return</p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Parent Assets (Optional)
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Home className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="number"
                            value={parentAssets}
                            onChange={(e) => setParentAssets(e.target.value)}
                            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="50000"
                            step="1000"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Savings, investments, real estate (excluding primary home)
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Student Information */}
                <div className="border-t pt-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-blue-600" />
                    Student Information
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Student Annual Income
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          value={studentIncome}
                          onChange={(e) => setStudentIncome(e.target.value)}
                          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="5000"
                          step="1000"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">From work, scholarships, or other sources</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Student Assets (Optional)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <TrendingUp className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          value={studentAssets}
                          onChange={(e) => setStudentAssets(e.target.value)}
                          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="2000"
                          step="500"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Savings accounts, investments, etc.</p>
                    </div>
                  </div>
                </div>

                {/* Family Information */}
                <div className="border-t pt-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Family Information
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Family Size
                      </label>
                      <select
                        value={familySize}
                        onChange={(e) => setFamilySize(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                        ))}
                      </select>
                      <p className="text-xs text-gray-500 mt-1">
                        Include parents and children they support
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Number in College
                      </label>
                      <select
                        value={numberOfInCollege}
                        onChange={(e) => setNumberOfInCollege(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {[1, 2, 3, 4].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                      <p className="text-xs text-gray-500 mt-1">
                        Family members in college at the same time
                      </p>
                    </div>
                  </div>
                </div>

                {/* College Cost */}
                <div className="border-t pt-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">College Cost Information</h3>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cost of Attendance (COA)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        value={costOfAttendance}
                        onChange={(e) => setCostOfAttendance(e.target.value)}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="50000"
                        step="1000"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Total annual cost (tuition, room, board, books, fees)
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={calculateSAI}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Calculate SAI
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Results</h2>

              {result ? (
                <div className="space-y-6">
                  {/* SAI */}
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Student Aid Index (SAI)</h3>
                    <div className="text-4xl font-bold text-blue-600">
                      ${result.sai.toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Your expected family contribution
                    </p>
                  </div>

                  {/* Estimated Need */}
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Estimated Financial Need</h3>
                    <div className="text-2xl font-bold text-green-600">
                      ${result.estimatedNeed.toLocaleString()}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      COA - SAI = Financial Need
                    </p>
                  </div>

                  {/* Pell Grant */}
                  <div className={`p-4 rounded-lg border ${
                    result.pellEligible 
                      ? 'bg-purple-50 border-purple-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}>
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Pell Grant Eligibility</h3>
                    {result.pellEligible ? (
                      <>
                        <div className="text-2xl font-bold text-purple-600">
                          ${result.estimatedPellGrant.toLocaleString()}
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          Estimated annual Pell Grant
                        </p>
                      </>
                    ) : (
                      <p className="text-gray-600">
                        Not eligible for Pell Grant (SAI &gt; $6,656)
                      </p>
                    )}
                  </div>

                  {/* Interpretation */}
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h3 className="font-semibold text-yellow-900 mb-2">💡 What This Means</h3>
                    <p className="text-sm text-yellow-800">
                      {result.sai === 0 && 'You may qualify for maximum federal aid including Pell Grants!'}
                      {result.sai > 0 && result.sai <= 6656 && 'You likely qualify for Pell Grants and substantial federal aid.'}
                      {result.sai > 6656 && result.sai <= 20000 && 'You may qualify for federal loans and some need-based aid.'}
                      {result.sai > 20000 && 'Your family is expected to contribute significantly. Focus on scholarships and merit aid.'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Results Yet</h3>
                  <p className="text-gray-500">
                    Enter your financial information to estimate your SAI and aid eligibility.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding the Student Aid Index (SAI)</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What is SAI?</h3>
              <p className="text-gray-700 mb-3">
                The Student Aid Index (SAI) replaced the Expected Family Contribution (EFC) in 2024-25. It's a number calculated from your FAFSA that colleges use to determine your financial aid eligibility.
              </p>
              <p className="text-gray-700">
                <strong>Formula:</strong> Financial Need = Cost of Attendance (COA) - SAI
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">SAI vs EFC</h3>
              <p className="text-gray-700 mb-3">
                <strong>Key Changes:</strong> SAI can be negative (down to -$1,500), allowing for more aid. The calculation considers family size and number in college differently.
              </p>
              <p className="text-gray-700">
                Lower SAI = More financial aid eligibility
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Pell Grant Eligibility</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li><strong>SAI $0:</strong> Max Pell (~$7,395)</li>
                <li><strong>SAI $1-6,656:</strong> Partial Pell</li>
                <li><strong>SAI &gt;$6,656:</strong> No Pell</li>
                <li>Pell Grants don't need to be repaid!</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What Affects SAI?</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Parent/Student income & assets</li>
                <li>• Family size & number in college</li>
                <li>• Age of older parent</li>
                <li>• State of residence</li>
                <li>• Dependency status</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Tips to Lower SAI</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Maximize retirement contributions</li>
                <li>• Pay off consumer debt</li>
                <li>• Time asset sales strategically</li>
                <li>• Report accurate family size</li>
                <li>• File FAFSA early (October 1)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">When should I use this calculator?</h3>
              <p className="text-gray-700">
                Use this <strong>before filing FAFSA</strong> to get an early estimate of your aid eligibility. Best time: junior year of high school or early senior year. This helps families plan financially and understand what to expect. File the actual FAFSA starting October 1 of senior year.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How accurate is this estimate?</h3>
              <p className="text-gray-700">
                This is a <strong>simplified estimator</strong> using the federal methodology. Your actual SAI may differ because the official FAFSA considers additional factors: state taxes, employment allowances, asset protection based on age, and special circumstances. Expect ±$2,000-5,000 variance. Always file FAFSA for official results.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">What if my SAI is higher than the cost of attendance?</h3>
              <p className="text-gray-700">
                A high SAI means you're <strong>not eligible for need-based federal aid</strong> (Pell Grants, subsidized loans). However, you can still: (1) Apply for merit-based scholarships, (2) Take unsubsidized federal loans (not based on need), (3) Seek private scholarships, (4) Consider work-study, (5) Apply to schools offering merit aid.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Do I have to pay my full SAI amount?</h3>
              <p className="text-gray-700">
                <strong>No!</strong> SAI is just a number used to calculate aid eligibility, not a bill. You pay: Cost of Attendance - (Grants + Scholarships + Aid). Many families pay less than their SAI through merit scholarships, outside scholarships, and choosing affordable schools. Shop around and compare financial aid packages.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How do assets affect my SAI?</h3>
              <p className="text-gray-700">
                <strong>Parent assets:</strong> Assessed at ~5-12% above protection allowance (~$10k-15k). <strong>Student assets:</strong> Assessed at 20% (bigger impact!). <strong>Not counted:</strong> Primary home equity, retirement accounts (401k, IRA), small businesses, family farms. Strategy: Keep money in parent names, maximize retirement contributions before FAFSA.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">What's the difference between FAFSA and CSS Profile?</h3>
              <p className="text-gray-700">
                <strong>FAFSA:</strong> Free, required for federal aid (Pell, federal loans), used by most schools, calculates SAI. <strong>CSS Profile:</strong> $25 fee, required by ~400 private schools for institutional aid, more detailed (includes home equity, non-custodial parent), can result in different aid amounts. File both if your schools require CSS Profile.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialAidEstimatorPage;
