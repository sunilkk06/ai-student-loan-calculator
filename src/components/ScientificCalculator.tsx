import React, { useState } from 'react';
import { Calculator, Delete, RotateCcw } from 'lucide-react';

const ScientificCalculator: React.FC = () => {
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
      // Replace × and ÷ with * and /
      let expression = display.replace(/×/g, '*').replace(/÷/g, '/');
      
      // Evaluate the expression
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
    <section id="financial-calculators" className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Financial Calculators</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Essential tools for students - from scientific calculations to financial planning
          </p>
        </div>

        {/* Scientific Calculator */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Scientific Calculator</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleAngleMode}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  isRadians
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                RAD
              </button>
              <button
                onClick={toggleAngleMode}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  !isRadians
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                DEG
              </button>
            </div>
          </div>

          <p className="text-gray-600 mb-6">
            Essential for all college-level math and science courses (algebra, calculus, physics, chemistry). 
            Features trigonometric functions, logarithms, powers/roots, scientific notation, and fraction conversions.
          </p>

          {/* Display */}
          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <div className="text-right">
              <div className="text-4xl font-mono text-green-400 break-all">
                {display}
              </div>
            </div>
          </div>

          {/* Calculator Buttons */}
          <div className="grid grid-cols-5 gap-2">
            {/* Row 1 - Scientific Functions */}
            <button onClick={() => handleScientific('sin')} className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold">
              sin
            </button>
            <button onClick={() => handleScientific('cos')} className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold">
              cos
            </button>
            <button onClick={() => handleScientific('tan')} className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold">
              tan
            </button>
            <button onClick={() => handleScientific('log')} className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold">
              log
            </button>
            <button onClick={() => handleScientific('ln')} className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold">
              ln
            </button>

            {/* Row 2 - Inverse Trig */}
            <button onClick={() => handleScientific('asin')} className="bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600 transition-colors font-semibold text-sm">
              sin⁻¹
            </button>
            <button onClick={() => handleScientific('acos')} className="bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600 transition-colors font-semibold text-sm">
              cos⁻¹
            </button>
            <button onClick={() => handleScientific('atan')} className="bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600 transition-colors font-semibold text-sm">
              tan⁻¹
            </button>
            <button onClick={() => handleScientific('sqrt')} className="bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600 transition-colors font-semibold">
              √
            </button>
            <button onClick={handlePower} className="bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600 transition-colors font-semibold">
              x^y
            </button>

            {/* Row 3 - Powers and Special */}
            <button onClick={() => handleScientific('square')} className="bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition-colors font-semibold">
              x²
            </button>
            <button onClick={() => handleScientific('cube')} className="bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition-colors font-semibold">
              x³
            </button>
            <button onClick={() => handleScientific('reciprocal')} className="bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition-colors font-semibold">
              1/x
            </button>
            <button onClick={() => handleScientific('factorial')} className="bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition-colors font-semibold">
              n!
            </button>
            <button onClick={() => handleScientific('exp')} className="bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition-colors font-semibold">
              eˣ
            </button>

            {/* Row 4 - Constants and Parentheses */}
            <button onClick={handlePi} className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              π
            </button>
            <button onClick={handleE} className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              e
            </button>
            <button onClick={() => handleParenthesis('(')} className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              (
            </button>
            <button onClick={() => handleParenthesis(')')} className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              )
            </button>
            <button onClick={() => handleScientific('abs')} className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              |x|
            </button>

            {/* Row 5 - Numbers and Operations */}
            <button onClick={() => handleNumber('7')} className="bg-gray-700 text-white p-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-xl">
              7
            </button>
            <button onClick={() => handleNumber('8')} className="bg-gray-700 text-white p-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-xl">
              8
            </button>
            <button onClick={() => handleNumber('9')} className="bg-gray-700 text-white p-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-xl">
              9
            </button>
            <button onClick={() => handleOperator('÷')} className="bg-orange-600 text-white p-4 rounded-lg hover:bg-orange-700 transition-colors font-semibold text-xl">
              ÷
            </button>
            <button onClick={handleBackspace} className="bg-red-600 text-white p-4 rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center justify-center">
              <Delete className="w-5 h-5" />
            </button>

            {/* Row 6 */}
            <button onClick={() => handleNumber('4')} className="bg-gray-700 text-white p-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-xl">
              4
            </button>
            <button onClick={() => handleNumber('5')} className="bg-gray-700 text-white p-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-xl">
              5
            </button>
            <button onClick={() => handleNumber('6')} className="bg-gray-700 text-white p-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-xl">
              6
            </button>
            <button onClick={() => handleOperator('×')} className="bg-orange-600 text-white p-4 rounded-lg hover:bg-orange-700 transition-colors font-semibold text-xl">
              ×
            </button>
            <button onClick={handleClear} className="bg-red-600 text-white p-4 rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center justify-center">
              <RotateCcw className="w-5 h-5" />
            </button>

            {/* Row 7 */}
            <button onClick={() => handleNumber('1')} className="bg-gray-700 text-white p-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-xl">
              1
            </button>
            <button onClick={() => handleNumber('2')} className="bg-gray-700 text-white p-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-xl">
              2
            </button>
            <button onClick={() => handleNumber('3')} className="bg-gray-700 text-white p-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-xl">
              3
            </button>
            <button onClick={() => handleOperator('-')} className="bg-orange-600 text-white p-4 rounded-lg hover:bg-orange-700 transition-colors font-semibold text-xl">
              −
            </button>
            <button onClick={calculate} className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors font-semibold text-xl row-span-2">
              =
            </button>

            {/* Row 8 */}
            <button onClick={() => handleNumber('0')} className="bg-gray-700 text-white p-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-xl col-span-2">
              0
            </button>
            <button onClick={handleDecimal} className="bg-gray-700 text-white p-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-xl">
              .
            </button>
            <button onClick={() => handleOperator('+')} className="bg-orange-600 text-white p-4 rounded-lg hover:bg-orange-700 transition-colors font-semibold text-xl">
              +
            </button>
          </div>

          {/* History */}
          {history.length > 0 && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-700">History</h4>
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

          {/* Quick Reference */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Quick Reference:</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-600">
              <div><strong>sin, cos, tan:</strong> Trigonometric functions</div>
              <div><strong>log:</strong> Base-10 logarithm</div>
              <div><strong>ln:</strong> Natural logarithm</div>
              <div><strong>√:</strong> Square root</div>
              <div><strong>x²:</strong> Square</div>
              <div><strong>x³:</strong> Cube</div>
              <div><strong>x^y:</strong> Power</div>
              <div><strong>n!:</strong> Factorial</div>
              <div><strong>eˣ:</strong> Exponential</div>
              <div><strong>π:</strong> Pi (3.14159...)</div>
              <div><strong>e:</strong> Euler's number (2.71828...)</div>
              <div><strong>|x|:</strong> Absolute value</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScientificCalculator;
