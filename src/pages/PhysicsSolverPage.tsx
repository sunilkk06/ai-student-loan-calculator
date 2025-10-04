import React, { useState } from 'react';
import { Zap, Calculator, Atom, Lightbulb, Waves, Rocket } from 'lucide-react';

interface FormulaTemplate {
  id: string;
  category: string;
  name: string;
  formula: string;
  description: string;
  inputs: {
    name: string;
    symbol: string;
    unit: string;
    placeholder: string;
  }[];
  output: {
    name: string;
    symbol: string;
    unit: string;
  };
  calculate: (inputs: number[]) => number;
}

const PhysicsSolverPage: React.FC = () => {
  const [selectedFormula, setSelectedFormula] = useState<FormulaTemplate | null>(null);
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  const formulas: FormulaTemplate[] = [
    // Mathematics
    {
      id: 'quadratic',
      category: 'Mathematics',
      name: 'Quadratic Equation Solver',
      formula: 'ax² + bx + c = 0',
      description: 'Solves quadratic equations using the quadratic formula',
      inputs: [
        { name: 'Coefficient a', symbol: 'a', unit: '', placeholder: '1' },
        { name: 'Coefficient b', symbol: 'b', unit: '', placeholder: '5' },
        { name: 'Coefficient c', symbol: 'c', unit: '', placeholder: '6' }
      ],
      output: { name: 'Solutions', symbol: 'x₁, x₂', unit: '' },
      calculate: (inputs) => {
        const [a, b, c] = inputs;
        const discriminant = b * b - 4 * a * c;
        if (discriminant < 0) throw new Error('No real solutions');
        const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        return x1; // Return first solution (we'll handle both in UI)
      }
    },
    // Kinematics
    {
      id: 'velocity',
      category: 'Kinematics',
      name: 'Final Velocity',
      formula: 'v = v₀ + at',
      description: 'Calculate final velocity with constant acceleration',
      inputs: [
        { name: 'Initial Velocity', symbol: 'v₀', unit: 'm/s', placeholder: '0' },
        { name: 'Acceleration', symbol: 'a', unit: 'm/s²', placeholder: '9.8' },
        { name: 'Time', symbol: 't', unit: 's', placeholder: '5' }
      ],
      output: { name: 'Final Velocity', symbol: 'v', unit: 'm/s' },
      calculate: (inputs) => {
        const [v0, a, t] = inputs;
        return v0 + a * t;
      }
    },
    {
      id: 'displacement',
      category: 'Kinematics',
      name: 'Displacement',
      formula: 's = v₀t + ½at²',
      description: 'Calculate displacement with constant acceleration',
      inputs: [
        { name: 'Initial Velocity', symbol: 'v₀', unit: 'm/s', placeholder: '0' },
        { name: 'Time', symbol: 't', unit: 's', placeholder: '5' },
        { name: 'Acceleration', symbol: 'a', unit: 'm/s²', placeholder: '9.8' }
      ],
      output: { name: 'Displacement', symbol: 's', unit: 'm' },
      calculate: (inputs) => {
        const [v0, t, a] = inputs;
        return v0 * t + 0.5 * a * t * t;
      }
    },
    // Energy
    {
      id: 'kinetic-energy',
      category: 'Energy',
      name: 'Kinetic Energy',
      formula: 'KE = ½mv²',
      description: 'Calculate kinetic energy of a moving object',
      inputs: [
        { name: 'Mass', symbol: 'm', unit: 'kg', placeholder: '10' },
        { name: 'Velocity', symbol: 'v', unit: 'm/s', placeholder: '20' }
      ],
      output: { name: 'Kinetic Energy', symbol: 'KE', unit: 'J' },
      calculate: (inputs) => {
        const [m, v] = inputs;
        return 0.5 * m * v * v;
      }
    },
    {
      id: 'potential-energy',
      category: 'Energy',
      name: 'Gravitational Potential Energy',
      formula: 'PE = mgh',
      description: 'Calculate gravitational potential energy',
      inputs: [
        { name: 'Mass', symbol: 'm', unit: 'kg', placeholder: '10' },
        { name: 'Gravity', symbol: 'g', unit: 'm/s²', placeholder: '9.8' },
        { name: 'Height', symbol: 'h', unit: 'm', placeholder: '5' }
      ],
      output: { name: 'Potential Energy', symbol: 'PE', unit: 'J' },
      calculate: (inputs) => {
        const [m, g, h] = inputs;
        return m * g * h;
      }
    },
    {
      id: 'work',
      category: 'Energy',
      name: 'Work Done',
      formula: 'W = Fd cos(θ)',
      description: 'Calculate work done by a force',
      inputs: [
        { name: 'Force', symbol: 'F', unit: 'N', placeholder: '100' },
        { name: 'Distance', symbol: 'd', unit: 'm', placeholder: '10' },
        { name: 'Angle', symbol: 'θ', unit: '°', placeholder: '0' }
      ],
      output: { name: 'Work', symbol: 'W', unit: 'J' },
      calculate: (inputs) => {
        const [F, d, theta] = inputs;
        const thetaRad = (theta * Math.PI) / 180;
        return F * d * Math.cos(thetaRad);
      }
    },
    // Electricity
    {
      id: 'ohms-law-voltage',
      category: 'Electricity',
      name: "Ohm's Law (Voltage)",
      formula: 'V = IR',
      description: 'Calculate voltage from current and resistance',
      inputs: [
        { name: 'Current', symbol: 'I', unit: 'A', placeholder: '2' },
        { name: 'Resistance', symbol: 'R', unit: 'Ω', placeholder: '10' }
      ],
      output: { name: 'Voltage', symbol: 'V', unit: 'V' },
      calculate: (inputs) => {
        const [I, R] = inputs;
        return I * R;
      }
    },
    {
      id: 'ohms-law-current',
      category: 'Electricity',
      name: "Ohm's Law (Current)",
      formula: 'I = V/R',
      description: 'Calculate current from voltage and resistance',
      inputs: [
        { name: 'Voltage', symbol: 'V', unit: 'V', placeholder: '12' },
        { name: 'Resistance', symbol: 'R', unit: 'Ω', placeholder: '6' }
      ],
      output: { name: 'Current', symbol: 'I', unit: 'A' },
      calculate: (inputs) => {
        const [V, R] = inputs;
        if (R === 0) throw new Error('Resistance cannot be zero');
        return V / R;
      }
    },
    {
      id: 'ohms-law-resistance',
      category: 'Electricity',
      name: "Ohm's Law (Resistance)",
      formula: 'R = V/I',
      description: 'Calculate resistance from voltage and current',
      inputs: [
        { name: 'Voltage', symbol: 'V', unit: 'V', placeholder: '12' },
        { name: 'Current', symbol: 'I', unit: 'A', placeholder: '2' }
      ],
      output: { name: 'Resistance', symbol: 'R', unit: 'Ω' },
      calculate: (inputs) => {
        const [V, I] = inputs;
        if (I === 0) throw new Error('Current cannot be zero');
        return V / I;
      }
    },
    {
      id: 'power',
      category: 'Electricity',
      name: 'Electrical Power',
      formula: 'P = VI',
      description: 'Calculate electrical power',
      inputs: [
        { name: 'Voltage', symbol: 'V', unit: 'V', placeholder: '12' },
        { name: 'Current', symbol: 'I', unit: 'A', placeholder: '2' }
      ],
      output: { name: 'Power', symbol: 'P', unit: 'W' },
      calculate: (inputs) => {
        const [V, I] = inputs;
        return V * I;
      }
    },
    // Waves
    {
      id: 'wave-speed',
      category: 'Waves',
      name: 'Wave Speed',
      formula: 'v = fλ',
      description: 'Calculate wave speed from frequency and wavelength',
      inputs: [
        { name: 'Frequency', symbol: 'f', unit: 'Hz', placeholder: '440' },
        { name: 'Wavelength', symbol: 'λ', unit: 'm', placeholder: '0.78' }
      ],
      output: { name: 'Wave Speed', symbol: 'v', unit: 'm/s' },
      calculate: (inputs) => {
        const [f, lambda] = inputs;
        return f * lambda;
      }
    },
    // Force & Motion
    {
      id: 'force',
      category: 'Force & Motion',
      name: "Newton's Second Law",
      formula: 'F = ma',
      description: 'Calculate force from mass and acceleration',
      inputs: [
        { name: 'Mass', symbol: 'm', unit: 'kg', placeholder: '10' },
        { name: 'Acceleration', symbol: 'a', unit: 'm/s²', placeholder: '5' }
      ],
      output: { name: 'Force', symbol: 'F', unit: 'N' },
      calculate: (inputs) => {
        const [m, a] = inputs;
        return m * a;
      }
    },
    {
      id: 'momentum',
      category: 'Force & Motion',
      name: 'Momentum',
      formula: 'p = mv',
      description: 'Calculate momentum of a moving object',
      inputs: [
        { name: 'Mass', symbol: 'm', unit: 'kg', placeholder: '10' },
        { name: 'Velocity', symbol: 'v', unit: 'm/s', placeholder: '20' }
      ],
      output: { name: 'Momentum', symbol: 'p', unit: 'kg⋅m/s' },
      calculate: (inputs) => {
        const [m, v] = inputs;
        return m * v;
      }
    }
  ];

  const categories = Array.from(new Set(formulas.map(f => f.category)));

  const handleFormulaSelect = (formula: FormulaTemplate) => {
    setSelectedFormula(formula);
    setInputValues({});
    setResult(null);
    setError('');
  };

  const handleInputChange = (symbol: string, value: string) => {
    setInputValues(prev => ({ ...prev, [symbol]: value }));
  };

  const handleCalculate = () => {
    if (!selectedFormula) return;

    setError('');
    
    // Validate all inputs are filled
    const inputs = selectedFormula.inputs.map(input => {
      const value = inputValues[input.symbol];
      if (!value || value.trim() === '') {
        setError(`Please enter a value for ${input.name}`);
        return NaN;
      }
      return parseFloat(value);
    });

    if (inputs.some(isNaN)) return;

    try {
      const calculatedResult = selectedFormula.calculate(inputs);
      setResult(calculatedResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Calculation error');
    }
  };

  const handleReset = () => {
    setInputValues({});
    setResult(null);
    setError('');
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Mathematics': return Calculator;
      case 'Kinematics': return Rocket;
      case 'Energy': return Lightbulb;
      case 'Electricity': return Zap;
      case 'Waves': return Waves;
      case 'Force & Motion': return Atom;
      default: return Calculator;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
            <Zap className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Physics & Engineering Solver
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Quick answers for common physics and engineering equations. Pre-built templates for kinematics, energy, electricity, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formula Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Formula</h2>
              
              <div className="space-y-4">
                {categories.map(category => {
                  const Icon = getCategoryIcon(category);
                  const categoryFormulas = formulas.filter(f => f.category === category);
                  
                  return (
                    <div key={category}>
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-5 h-5 text-orange-600" />
                        <h3 className="font-semibold text-gray-900">{category}</h3>
                      </div>
                      <div className="space-y-1 ml-7">
                        {categoryFormulas.map(formula => (
                          <button
                            key={formula.id}
                            onClick={() => handleFormulaSelect(formula)}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                              selectedFormula?.id === formula.id
                                ? 'bg-orange-100 text-orange-900 font-semibold'
                                : 'hover:bg-gray-100 text-gray-700'
                            }`}
                          >
                            {formula.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Calculator Section */}
          <div className="lg:col-span-2">
            {selectedFormula ? (
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedFormula.name}</h2>
                  <p className="text-gray-600 mb-3">{selectedFormula.description}</p>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-lg font-mono font-semibold text-orange-900">{selectedFormula.formula}</p>
                  </div>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700">{error}</p>
                  </div>
                )}

                {/* Inputs */}
                <div className="space-y-4 mb-6">
                  <h3 className="font-semibold text-gray-900">Input Values:</h3>
                  {selectedFormula.inputs.map(input => (
                    <div key={input.symbol} className="flex items-center gap-3">
                      <label className="w-40 text-gray-700">
                        {input.name} ({input.symbol}):
                      </label>
                      <input
                        type="number"
                        value={inputValues[input.symbol] || ''}
                        onChange={(e) => handleInputChange(input.symbol, e.target.value)}
                        placeholder={input.placeholder}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        step="any"
                      />
                      <span className="w-16 text-gray-600 text-sm">{input.unit}</span>
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mb-6">
                  <button
                    onClick={handleCalculate}
                    className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Calculate
                  </button>
                  <button
                    onClick={handleReset}
                    className="bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Reset
                  </button>
                </div>

                {/* Result */}
                {result !== null && (
                  <div className="p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border-2 border-green-200">
                    <h3 className="font-semibold text-gray-900 mb-2">Result:</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-gray-700">{selectedFormula.output.name} ({selectedFormula.output.symbol}) =</span>
                      <span className="text-3xl font-bold text-green-600">{result.toFixed(4)}</span>
                      <span className="text-gray-600">{selectedFormula.output.unit}</span>
                    </div>
                    
                    {/* Special handling for quadratic equation */}
                    {selectedFormula.id === 'quadratic' && (
                      <div className="mt-4 pt-4 border-t border-green-200">
                        <p className="text-sm text-gray-700">
                          {(() => {
                            const a = parseFloat(inputValues['a'] || '0');
                            const b = parseFloat(inputValues['b'] || '0');
                            const c = parseFloat(inputValues['c'] || '0');
                            const discriminant = b * b - 4 * a * c;
                            if (discriminant < 0) return 'No real solutions (complex roots)';
                            const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
                            const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
                            if (Math.abs(x1 - x2) < 0.0001) {
                              return `One repeated solution: x = ${x1.toFixed(4)}`;
                            }
                            return `Two solutions: x₁ = ${x1.toFixed(4)}, x₂ = ${x2.toFixed(4)}`;
                          })()}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                <Zap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Formula</h3>
                <p className="text-gray-600">
                  Choose a formula from the list on the left to start calculating.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Educational Content - How to Use */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Use the Physics/Engineering Solver</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Step 1: Select Formula</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Browse formulas by category (Mathematics, Kinematics, Energy, etc.)</li>
                <li>Click on the formula you need</li>
                <li>Read the formula description</li>
                <li>Note the required input variables</li>
              </ol>
            </div>

            <div className="bg-red-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Step 2: Enter Values</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Fill in all required input fields</li>
                <li>Use correct units as shown</li>
                <li>Enter decimal values if needed</li>
                <li>Check your values for accuracy</li>
              </ol>
            </div>

            <div className="bg-pink-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Step 3: Calculate</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Click "Calculate" button</li>
                <li>View the result with proper units</li>
                <li>For quadratic equations, see both solutions</li>
                <li>Use "Reset" to clear and start over</li>
              </ol>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pro Tips</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Double-check units before calculating</li>
                <li>Use consistent unit systems (SI preferred)</li>
                <li>Verify results make physical sense</li>
                <li>Save results for homework verification</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Formula Categories Guide */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Available Formula Categories</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Calculator className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-900">Mathematics</h3>
              </div>
              <p className="text-gray-700 mb-2">Solve algebraic equations:</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Quadratic equations (ax² + bx + c = 0)</li>
                <li>• Find roots and solutions</li>
                <li>• Handle complex and real solutions</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Rocket className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-semibold text-gray-900">Kinematics</h3>
              </div>
              <p className="text-gray-700 mb-2">Motion and velocity:</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Final velocity (v = v₀ + at)</li>
                <li>• Displacement (s = v₀t + ½at²)</li>
                <li>• Constant acceleration problems</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Lightbulb className="w-6 h-6 text-yellow-600" />
                <h3 className="text-xl font-semibold text-gray-900">Energy</h3>
              </div>
              <p className="text-gray-700 mb-2">Energy calculations:</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Kinetic energy (KE = ½mv²)</li>
                <li>• Potential energy (PE = mgh)</li>
                <li>• Work done (W = Fd cos θ)</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-6 h-6 text-orange-600" />
                <h3 className="text-xl font-semibold text-gray-900">Electricity</h3>
              </div>
              <p className="text-gray-700 mb-2">Circuit calculations:</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Ohm's Law (V = IR, I = V/R, R = V/I)</li>
                <li>• Electrical power (P = VI)</li>
                <li>• Voltage, current, resistance</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Waves className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl font-semibold text-gray-900">Waves</h3>
              </div>
              <p className="text-gray-700 mb-2">Wave properties:</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Wave speed (v = fλ)</li>
                <li>• Frequency and wavelength</li>
                <li>• Sound and light waves</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Atom className="w-6 h-6 text-red-600" />
                <h3 className="text-xl font-semibold text-gray-900">Force & Motion</h3>
              </div>
              <p className="text-gray-700 mb-2">Newton's laws:</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Force (F = ma)</li>
                <li>• Momentum (p = mv)</li>
                <li>• Mass and acceleration</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">What units should I use?</h3>
              <p className="text-gray-700">
                Use <strong>SI units</strong> (International System) for best results: meters (m), kilograms (kg), seconds (s), 
                amperes (A), etc. The calculator shows the expected unit for each input. If you use different units, 
                convert them first to avoid errors.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Can I use this for homework?</h3>
              <p className="text-gray-700">
                Yes! This solver is perfect for <strong>checking your work</strong> and understanding formulas. However, 
                always show your work on assignments. Use this tool to verify calculations, learn formula applications, 
                and build confidence. Understanding the physics is more important than just getting answers.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Why do I get an error message?</h3>
              <p className="text-gray-700">
                Common errors: (1) <strong>Division by zero</strong> - can't divide by zero resistance or current, 
                (2) <strong>No real solutions</strong> - quadratic equation has complex roots (negative discriminant), 
                (3) <strong>Missing values</strong> - fill in all required inputs. Check that your inputs make physical sense.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How accurate are the calculations?</h3>
              <p className="text-gray-700">
                The calculator uses standard physics formulas with high precision (4 decimal places shown). Results are 
                mathematically accurate, but remember that <strong>real-world measurements</strong> have uncertainty. 
                For lab work, consider significant figures and measurement error. These are ideal calculations.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">What if my formula isn't listed?</h3>
              <p className="text-gray-700">
                We've included the most common formulas for introductory physics and engineering courses. For more complex 
                equations, try: (1) Breaking them into simpler steps using available formulas, (2) Using the Scientific 
                Calculator for general math, (3) Checking if a combination of formulas works. We're adding more formulas regularly!
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How do I interpret quadratic equation results?</h3>
              <p className="text-gray-700">
                Quadratic equations can have: (1) <strong>Two distinct solutions</strong> - graph crosses x-axis twice, 
                (2) <strong>One repeated solution</strong> - graph touches x-axis once (vertex on axis), 
                (3) <strong>No real solutions</strong> - graph doesn't cross x-axis (complex roots). The calculator shows 
                all real solutions and indicates when roots are complex.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysicsSolverPage;
