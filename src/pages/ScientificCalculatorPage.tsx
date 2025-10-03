import React, { useState } from 'react';
import { Calculator, Delete, RotateCcw, BookOpen, Lightbulb, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const ScientificCalculatorPage: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [isRadians, setIsRadians] = useState(true);
  const [history, setHistory] = useState<string[]>([]);

  const handleNumber = (num: string) => {
    if (display === '0' || display === 'Error') {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (op: string) => {
    if (display !== 'Error') {
      setDisplay(display + ' ' + op + ' ');
    }
  };

  const handleDecimal = () => {
    const parts = display.split(/[\+\-\*\/]/);
    const lastPart = parts[parts.length - 1];
    if (!lastPart.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleClear = () => {
    setDisplay('0');
  };

  const handleBackspace = () => {
    if (display.length > 1 && display !== 'Error') {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const calculate = () => {
    try {
      let expression = display.replace(/×/g, '*').replace(/÷/g, '/').replace(/\^/g, '**');
      const result = eval(expression);
      
      if (isNaN(result) || !isFinite(result)) {
        setDisplay('Error');
      } else {
        const formattedResult = parseFloat(result.toFixed(10)).toString();
        setHistory([...history, `${display} = ${formattedResult}`]);
        setDisplay(formattedResult);
      }
    } catch (error) {
      setDisplay('Error');
    }
  };

  const handleScientific = (func: string) => {
    try {
      const value = parseFloat(display);
      if (isNaN(value)) {
        setDisplay('Error');
        return;
      }

      let result: number;
      const angleValue = isRadians ? value : (value * Math.PI) / 180;

      switch (func) {
        case 'sin':
          result = Math.sin(angleValue);
          break;
        case 'cos':
          result = Math.cos(angleValue);
          break;
        case 'tan':
          result = Math.tan(angleValue);
          break;
        case 'asin':
          result = Math.asin(value);
          if (!isRadians) result = (result * 180) / Math.PI;
          break;
        case 'acos':
          result = Math.acos(value);
          if (!isRadians) result = (result * 180) / Math.PI;
          break;
        case 'atan':
          result = Math.atan(value);
          if (!isRadians) result = (result * 180) / Math.PI;
          break;
        case 'log':
          result = Math.log10(value);
          break;
        case 'ln':
          result = Math.log(value);
          break;
        case 'sqrt':
          result = Math.sqrt(value);
          break;
        case 'square':
          result = value * value;
          break;
        case 'cube':
          result = value * value * value;
          break;
        case 'reciprocal':
          result = 1 / value;
          break;
        case 'factorial':
          result = factorial(Math.floor(value));
          break;
        case 'exp':
          result = Math.exp(value);
          break;
        case 'abs':
          result = Math.abs(value);
          break;
        default:
          return;
      }

      if (isNaN(result) || !isFinite(result)) {
        setDisplay('Error');
      } else {
        const formattedResult = parseFloat(result.toFixed(10)).toString();
        setHistory([...history, `${func}(${display}) = ${formattedResult}`]);
        setDisplay(formattedResult);
      }
    } catch (error) {
      setDisplay('Error');
    }
  };

  const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const handlePower = () => {
    setDisplay(display + '^');
  };

  const handlePi = () => {
    if (display === '0' || display === 'Error') {
      setDisplay(Math.PI.toString());
    } else {
      setDisplay(display + Math.PI.toString());
    }
  };

  const handleE = () => {
    if (display === '0' || display === 'Error') {
      setDisplay(Math.E.toString());
    } else {
      setDisplay(display + Math.E.toString());
    }
  };

  const toggleAngleMode = () => {
    setIsRadians(!isRadians);
  };

  const handleParenthesis = (paren: string) => {
    setDisplay(display + paren);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link to="/calculators" className="hover:text-blue-600">Financial Calculators</Link>
          <span>/</span>
          <span className="text-gray-800 font-semibold">Scientific Calculator</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Scientific Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl">
            A comprehensive scientific calculator for college students. Perfect for algebra, calculus, 
            physics, chemistry, and engineering courses. Perform complex calculations with trigonometric 
            functions, logarithms, exponentials, and more.
          </p>
        </div>

        {/* Main Calculator Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Calculator */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Calculator className="w-8 h-8 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-800">Calculator</h2>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleAngleMode}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      isRadians ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    RAD
                  </button>
                  <button
                    onClick={toggleAngleMode}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      !isRadians ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    DEG
                  </button>
                </div>
              </div>

              {/* Display */}
              <div className="bg-gray-900 rounded-lg p-6 mb-6">
                <div className="text-right">
                  <div className="text-3xl md:text-4xl font-mono text-green-400 break-all">
                    {display}
                  </div>
                </div>
              </div>

              {/* Calculator Buttons */}
              <div className="grid grid-cols-5 gap-2">
                {/* Row 1 - Scientific Functions */}
                <button onClick={() => handleScientific('sin')} className="bg-purple-600 text-white p-3 md:p-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold text-sm md:text-base">
                  sin
                </button>
                <button onClick={() => handleScientific('cos')} className="bg-purple-600 text-white p-3 md:p-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold text-sm md:text-base">
                  cos
                </button>
                <button onClick={() => handleScientific('tan')} className="bg-purple-600 text-white p-3 md:p-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold text-sm md:text-base">
                  tan
                </button>
                <button onClick={() => handleScientific('log')} className="bg-purple-600 text-white p-3 md:p-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold text-sm md:text-base">
                  log
                </button>
                <button onClick={() => handleScientific('ln')} className="bg-purple-600 text-white p-3 md:p-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold text-sm md:text-base">
                  ln
                </button>

                {/* Row 2 - Inverse Trig */}
                <button onClick={() => handleScientific('asin')} className="bg-purple-500 text-white p-3 md:p-4 rounded-lg hover:bg-purple-600 transition-colors font-semibold text-xs md:text-sm">
                  sin⁻¹
                </button>
                <button onClick={() => handleScientific('acos')} className="bg-purple-500 text-white p-3 md:p-4 rounded-lg hover:bg-purple-600 transition-colors font-semibold text-xs md:text-sm">
                  cos⁻¹
                </button>
                <button onClick={() => handleScientific('atan')} className="bg-purple-500 text-white p-3 md:p-4 rounded-lg hover:bg-purple-600 transition-colors font-semibold text-xs md:text-sm">
                  tan⁻¹
                </button>
                <button onClick={() => handleScientific('sqrt')} className="bg-purple-500 text-white p-3 md:p-4 rounded-lg hover:bg-purple-600 transition-colors font-semibold text-sm md:text-base">
                  √
                </button>
                <button onClick={handlePower} className="bg-purple-500 text-white p-3 md:p-4 rounded-lg hover:bg-purple-600 transition-colors font-semibold text-sm md:text-base">
                  x^y
                </button>

                {/* Row 3 - Powers and Special */}
                <button onClick={() => handleScientific('square')} className="bg-indigo-600 text-white p-3 md:p-4 rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-sm md:text-base">
                  x²
                </button>
                <button onClick={() => handleScientific('cube')} className="bg-indigo-600 text-white p-3 md:p-4 rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-sm md:text-base">
                  x³
                </button>
                <button onClick={() => handleScientific('reciprocal')} className="bg-indigo-600 text-white p-3 md:p-4 rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-sm md:text-base">
                  1/x
                </button>
                <button onClick={() => handleScientific('factorial')} className="bg-indigo-600 text-white p-3 md:p-4 rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-sm md:text-base">
                  n!
                </button>
                <button onClick={() => handleScientific('exp')} className="bg-indigo-600 text-white p-3 md:p-4 rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-sm md:text-base">
                  eˣ
                </button>

                {/* Row 4 - Constants and Parentheses */}
                <button onClick={handlePi} className="bg-blue-600 text-white p-3 md:p-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm md:text-base">
                  π
                </button>
                <button onClick={handleE} className="bg-blue-600 text-white p-3 md:p-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm md:text-base">
                  e
                </button>
                <button onClick={() => handleParenthesis('(')} className="bg-blue-600 text-white p-3 md:p-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm md:text-base">
                  (
                </button>
                <button onClick={() => handleParenthesis(')')} className="bg-blue-600 text-white p-3 md:p-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm md:text-base">
                  )
                </button>
                <button onClick={() => handleScientific('abs')} className="bg-blue-600 text-white p-3 md:p-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm md:text-base">
                  |x|
                </button>

                {/* Row 5 - Numbers and Operations */}
                <button onClick={() => handleNumber('7')} className="bg-gray-700 text-white p-3 md:p-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-lg md:text-xl">
                  7
                </button>
                <button onClick={() => handleNumber('8')} className="bg-gray-700 text-white p-3 md:p-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-lg md:text-xl">
                  8
                </button>
                <button onClick={() => handleNumber('9')} className="bg-gray-700 text-white p-3 md:p-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-lg md:text-xl">
                  9
                </button>
                <button onClick={() => handleOperator('÷')} className="bg-orange-600 text-white p-3 md:p-4 rounded-lg hover:bg-orange-700 transition-colors font-semibold text-lg md:text-xl">
                  ÷
                </button>
                <button onClick={handleBackspace} className="bg-red-600 text-white p-3 md:p-4 rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center justify-center">
                  <Delete className="w-5 h-5" />
                </button>

                {/* Row 6 */}
                <button onClick={() => handleNumber('4')} className="bg-gray-700 text-white p-3 md:p-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-lg md:text-xl">
                  4
                </button>
                <button onClick={() => handleNumber('5')} className="bg-gray-700 text-white p-3 md:p-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-lg md:text-xl">
                  5
                </button>
                <button onClick={() => handleNumber('6')} className="bg-gray-700 text-white p-3 md:p-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-lg md:text-xl">
                  6
                </button>
                <button onClick={() => handleOperator('×')} className="bg-orange-600 text-white p-3 md:p-4 rounded-lg hover:bg-orange-700 transition-colors font-semibold text-lg md:text-xl">
                  ×
                </button>
                <button onClick={handleClear} className="bg-red-600 text-white p-3 md:p-4 rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center justify-center">
                  <RotateCcw className="w-5 h-5" />
                </button>

                {/* Row 7 */}
                <button onClick={() => handleNumber('1')} className="bg-gray-700 text-white p-3 md:p-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-lg md:text-xl">
                  1
                </button>
                <button onClick={() => handleNumber('2')} className="bg-gray-700 text-white p-3 md:p-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-lg md:text-xl">
                  2
                </button>
                <button onClick={() => handleNumber('3')} className="bg-gray-700 text-white p-3 md:p-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-lg md:text-xl">
                  3
                </button>
                <button onClick={() => handleOperator('-')} className="bg-orange-600 text-white p-3 md:p-4 rounded-lg hover:bg-orange-700 transition-colors font-semibold text-lg md:text-xl">
                  −
                </button>
                <button onClick={calculate} className="bg-green-600 text-white p-3 md:p-4 rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg md:text-xl row-span-2">
                  =
                </button>

                {/* Row 8 */}
                <button onClick={() => handleNumber('0')} className="bg-gray-700 text-white p-3 md:p-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-lg md:text-xl col-span-2">
                  0
                </button>
                <button onClick={handleDecimal} className="bg-gray-700 text-white p-3 md:p-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-lg md:text-xl">
                  .
                </button>
                <button onClick={() => handleOperator('+')} className="bg-orange-600 text-white p-3 md:p-4 rounded-lg hover:bg-orange-700 transition-colors font-semibold text-lg md:text-xl">
                  +
                </button>
              </div>

              {/* History */}
              {history.length > 0 && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-700">Calculation History</h4>
                    <button
                      onClick={() => setHistory([])}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Clear History
                    </button>
                  </div>
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    {history.slice(-5).reverse().map((item, index) => (
                      <div key={index} className="text-sm text-gray-600 font-mono">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Related Calculators */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Related Calculators</h3>
              <div className="space-y-3">
                <Link to="/" className="block p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <div className="font-semibold text-blue-900">Student Loan Calculator</div>
                  <div className="text-sm text-blue-700">Calculate loan payments</div>
                </Link>
                <Link to="/calculators" className="block p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <div className="font-semibold text-purple-900">All Calculators</div>
                  <div className="text-sm text-purple-700">View all available tools</div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">How to Use the Scientific Calculator</h2>
          </div>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              This scientific calculator is designed specifically for college students taking math and science courses. 
              Follow these simple steps to perform calculations:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Basic Operations</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Enter numbers using the number pad (0-9)</li>
                  <li>Use +, −, ×, ÷ for basic arithmetic</li>
                  <li>Press = to calculate the result</li>
                  <li>Use C (clear) to reset or ← (backspace) to delete</li>
                </ol>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Scientific Functions</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Enter a number first</li>
                  <li>Click the desired function (sin, cos, log, etc.)</li>
                  <li>Toggle between RAD/DEG for angle measurements</li>
                  <li>Use parentheses for complex expressions</li>
                </ol>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pro Tips</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Radians vs Degrees:</strong> Most calculus problems use radians (RAD), while geometry uses degrees (DEG)</li>
                <li><strong>Order of Operations:</strong> The calculator follows PEMDAS/BODMAS rules automatically</li>
                <li><strong>Scientific Notation:</strong> Use the exp function for exponential notation</li>
                <li><strong>Constants:</strong> Use π for pi (3.14159...) and e for Euler's number (2.71828...)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* What is a Scientific Calculator Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Lightbulb className="w-8 h-8 text-yellow-600" />
            <h2 className="text-3xl font-bold text-gray-900">What is a Scientific Calculator?</h2>
          </div>

          <div className="prose max-w-none text-gray-700">
            <p className="text-lg mb-4">
              A scientific calculator is an advanced electronic calculator designed to handle complex mathematical 
              operations beyond basic arithmetic. It's an essential tool for students in STEM fields (Science, 
              Technology, Engineering, and Mathematics).
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Key Features</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Trigonometric Functions</h4>
                <p className="mb-2">
                  Calculate sine (sin), cosine (cos), tangent (tan), and their inverse functions. Essential for 
                  physics, engineering, and advanced mathematics courses.
                </p>
                <ul className="list-disc list-inside text-gray-600">
                  <li>sin, cos, tan for angle calculations</li>
                  <li>sin⁻¹, cos⁻¹, tan⁻¹ for inverse operations</li>
                  <li>Support for both radians and degrees</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Logarithmic Functions</h4>
                <p className="mb-2">
                  Perform logarithmic calculations crucial for chemistry, biology, and computer science applications.
                </p>
                <ul className="list-disc list-inside text-gray-600">
                  <li>log (base-10 logarithm) for pH calculations</li>
                  <li>ln (natural logarithm) for exponential growth</li>
                  <li>exp (e^x) for compound interest and decay</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Powers and Roots</h4>
                <p className="mb-2">
                  Calculate powers, roots, and exponentials for algebra and calculus problems.
                </p>
                <ul className="list-disc list-inside text-gray-600">
                  <li>x² (square) and x³ (cube) functions</li>
                  <li>√ (square root) for geometry</li>
                  <li>x^y for any power calculation</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Special Functions</h4>
                <p className="mb-2">
                  Advanced mathematical operations for statistics and discrete mathematics.
                </p>
                <ul className="list-disc list-inside text-gray-600">
                  <li>n! (factorial) for permutations/combinations</li>
                  <li>|x| (absolute value) for distance calculations</li>
                  <li>1/x (reciprocal) for rate problems</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Common Use Cases for Students</h3>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <TrendingUp className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Calculus:</strong> Calculate derivatives, integrals, and limits using trigonometric and exponential functions
                  </div>
                </li>
                <li className="flex items-start">
                  <TrendingUp className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Physics:</strong> Solve problems involving vectors, forces, waves, and quantum mechanics
                  </div>
                </li>
                <li className="flex items-start">
                  <TrendingUp className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Chemistry:</strong> Calculate pH levels, reaction rates, and thermodynamic equations
                  </div>
                </li>
                <li className="flex items-start">
                  <TrendingUp className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Engineering:</strong> Design calculations, signal processing, and structural analysis
                  </div>
                </li>
                <li className="flex items-start">
                  <TrendingUp className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Statistics:</strong> Probability distributions, factorials, and data analysis
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">When should I use radians vs degrees?</h3>
              <p className="text-gray-700">
                Use <strong>radians (RAD)</strong> for calculus, physics, and most advanced mathematics. Use <strong>degrees (DEG)</strong> 
                for geometry, navigation, and when angles are given in degrees (like 90°, 180°, etc.).
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">What's the difference between log and ln?</h3>
              <p className="text-gray-700">
                <strong>log</strong> is the base-10 logarithm (common logarithm), often used in chemistry for pH calculations. 
                <strong> ln</strong> is the natural logarithm (base e), used in calculus, exponential growth/decay, and compound interest.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Can I use this calculator for standardized tests?</h3>
              <p className="text-gray-700">
                While this online calculator is great for homework and practice, most standardized tests (SAT, ACT, AP exams) 
                require a physical calculator. Check your test's specific calculator policy. This tool is perfect for learning 
                and verifying your work.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How do I calculate powers like 2^8?</h3>
              <p className="text-gray-700">
                Enter the base number (2), press the <strong>x^y</strong> button, then enter the exponent (8), and press equals. 
                The calculator will display 256.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">What does the factorial (n!) function do?</h3>
              <p className="text-gray-700">
                Factorial calculates the product of all positive integers up to n. For example, 5! = 5 × 4 × 3 × 2 × 1 = 120. 
                It's essential for permutations, combinations, and probability calculations in statistics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScientificCalculatorPage;
