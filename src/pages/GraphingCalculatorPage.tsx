import React, { useState, useEffect, useRef } from 'react';
import { FunctionSquare, ZoomIn, ZoomOut, RotateCcw, Grid3X3, Table } from 'lucide-react';

const GraphingCalculatorPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [functionInput, setFunctionInput] = useState('x^2');
  const [xMin, setXMin] = useState(-10);
  const [xMax, setXMax] = useState(10);
  const [yMin, setYMin] = useState(-10);
  const [yMax, setYMax] = useState(10);
  const [showGrid, setShowGrid] = useState(true);
  const [showTable, setShowTable] = useState(false);
  const [error, setError] = useState('');
  const [tableValues, setTableValues] = useState<{ x: number; y: number }[]>([]);

  // Evaluate mathematical expression
  const evaluateFunction = (x: number, func: string): number | null => {
    try {
      // Replace common math notation
      let expression = func
        .replace(/\^/g, '**')
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/sqrt/g, 'Math.sqrt')
        .replace(/abs/g, 'Math.abs')
        .replace(/ln/g, 'Math.log')
        .replace(/log/g, 'Math.log10')
        .replace(/e\b/g, 'Math.E')
        .replace(/pi/gi, 'Math.PI')
        .replace(/x/g, `(${x})`);

      // Evaluate the expression
      const result = eval(expression);
      return isFinite(result) ? result : null;
    } catch (e) {
      return null;
    }
  };

  // Draw the graph
  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Calculate scales
    const xScale = width / (xMax - xMin);
    const yScale = height / (yMax - yMin);

    // Transform coordinates
    const toCanvasX = (x: number) => (x - xMin) * xScale;
    const toCanvasY = (y: number) => height - (y - yMin) * yScale;

    // Draw grid
    if (showGrid) {
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 1;

      // Vertical grid lines
      for (let x = Math.ceil(xMin); x <= xMax; x++) {
        const canvasX = toCanvasX(x);
        ctx.beginPath();
        ctx.moveTo(canvasX, 0);
        ctx.lineTo(canvasX, height);
        ctx.stroke();
      }

      // Horizontal grid lines
      for (let y = Math.ceil(yMin); y <= yMax; y++) {
        const canvasY = toCanvasY(y);
        ctx.beginPath();
        ctx.moveTo(0, canvasY);
        ctx.lineTo(width, canvasY);
        ctx.stroke();
      }
    }

    // Draw axes
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;

    // X-axis
    if (yMin <= 0 && yMax >= 0) {
      const y0 = toCanvasY(0);
      ctx.beginPath();
      ctx.moveTo(0, y0);
      ctx.lineTo(width, y0);
      ctx.stroke();

      // X-axis labels
      ctx.fillStyle = '#000000';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      for (let x = Math.ceil(xMin); x <= xMax; x++) {
        if (x !== 0) {
          const canvasX = toCanvasX(x);
          ctx.fillText(x.toString(), canvasX, y0 + 15);
        }
      }
    }

    // Y-axis
    if (xMin <= 0 && xMax >= 0) {
      const x0 = toCanvasX(0);
      ctx.beginPath();
      ctx.moveTo(x0, 0);
      ctx.lineTo(x0, height);
      ctx.stroke();

      // Y-axis labels
      ctx.fillStyle = '#000000';
      ctx.font = '12px Arial';
      ctx.textAlign = 'right';
      for (let y = Math.ceil(yMin); y <= yMax; y++) {
        if (y !== 0) {
          const canvasY = toCanvasY(y);
          ctx.fillText(y.toString(), x0 - 5, canvasY + 4);
        }
      }
    }

    // Draw function
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.beginPath();

    let firstPoint = true;
    const step = (xMax - xMin) / width;

    for (let x = xMin; x <= xMax; x += step) {
      const y = evaluateFunction(x, functionInput);
      
      if (y !== null && y >= yMin && y <= yMax) {
        const canvasX = toCanvasX(x);
        const canvasY = toCanvasY(y);

        if (firstPoint) {
          ctx.moveTo(canvasX, canvasY);
          firstPoint = false;
        } else {
          ctx.lineTo(canvasX, canvasY);
        }
      } else {
        firstPoint = true;
      }
    }

    ctx.stroke();
  };

  // Generate table values
  const generateTable = () => {
    const values: { x: number; y: number }[] = [];
    const step = (xMax - xMin) / 20;

    for (let x = xMin; x <= xMax; x += step) {
      const y = evaluateFunction(x, functionInput);
      if (y !== null) {
        values.push({ x: parseFloat(x.toFixed(2)), y: parseFloat(y.toFixed(2)) });
      }
    }

    setTableValues(values);
  };

  // Plot function
  const plotFunction = () => {
    setError('');
    
    if (!functionInput.trim()) {
      setError('Please enter a function');
      return;
    }

    // Test if function is valid
    const testY = evaluateFunction(0, functionInput);
    if (testY === null && functionInput.includes('x')) {
      setError('Invalid function. Use x as variable. Examples: x^2, sin(x), 2*x+1');
      return;
    }

    drawGraph();
    if (showTable) {
      generateTable();
    }
  };

  // Zoom in
  const zoomIn = () => {
    const xRange = (xMax - xMin) * 0.25;
    const yRange = (yMax - yMin) * 0.25;
    setXMin(xMin + xRange);
    setXMax(xMax - xRange);
    setYMin(yMin + yRange);
    setYMax(yMax - yRange);
  };

  // Zoom out
  const zoomOut = () => {
    const xRange = (xMax - xMin) * 0.25;
    const yRange = (yMax - yMin) * 0.25;
    setXMin(xMin - xRange);
    setXMax(xMax + xRange);
    setYMin(yMin - yRange);
    setYMax(yMax + yRange);
  };

  // Reset view
  const resetView = () => {
    setXMin(-10);
    setXMax(10);
    setYMin(-10);
    setYMax(10);
  };

  // Redraw when parameters change
  useEffect(() => {
    drawGraph();
    if (showTable) {
      generateTable();
    }
  }, [xMin, xMax, yMin, yMax, showGrid]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <FunctionSquare className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Graphing Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Graph functions, find roots and intersections, and view tables of values.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Function Input</h2>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    f(x) =
                  </label>
                  <input
                    type="text"
                    value={functionInput}
                    onChange={(e) => setFunctionInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && plotFunction()}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., x^2, sin(x), 2*x+1"
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Use: x, +, -, *, /, ^, sin, cos, tan, sqrt, abs, ln, log, pi, e
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      X Min
                    </label>
                    <input
                      type="number"
                      value={xMin}
                      onChange={(e) => setXMin(parseFloat(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      X Max
                    </label>
                    <input
                      type="number"
                      value={xMax}
                      onChange={(e) => setXMax(parseFloat(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Y Min
                    </label>
                    <input
                      type="number"
                      value={yMin}
                      onChange={(e) => setYMin(parseFloat(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Y Max
                    </label>
                    <input
                      type="number"
                      value={yMax}
                      onChange={(e) => setYMax(parseFloat(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <button
                  onClick={plotFunction}
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Plot Function
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={zoomIn}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                    Zoom In
                  </button>
                  <button
                    onClick={zoomOut}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                    Zoom Out
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={resetView}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                  <button
                    onClick={() => setShowGrid(!showGrid)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                      showGrid
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                    Grid
                  </button>
                </div>

                <button
                  onClick={() => {
                    setShowTable(!showTable);
                    if (!showTable) generateTable();
                  }}
                  className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                    showTable
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Table className="w-4 h-4" />
                  {showTable ? 'Hide' : 'Show'} Table
                </button>
              </div>

              {/* Examples */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Example Functions:</h3>
                <div className="space-y-1 text-sm text-blue-800">
                  <div className="cursor-pointer hover:text-blue-600" onClick={() => setFunctionInput('x^2')}>
                    • x^2 (parabola)
                  </div>
                  <div className="cursor-pointer hover:text-blue-600" onClick={() => setFunctionInput('sin(x)')}>
                    • sin(x) (sine wave)
                  </div>
                  <div className="cursor-pointer hover:text-blue-600" onClick={() => setFunctionInput('2*x+1')}>
                    • 2*x+1 (linear)
                  </div>
                  <div className="cursor-pointer hover:text-blue-600" onClick={() => setFunctionInput('1/x')}>
                    • 1/x (hyperbola)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Graph Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Graph</h2>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>

              {/* Table of Values */}
              {showTable && tableValues.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Table of Values</h3>
                  <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
                    <table className="w-full">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">x</th>
                          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">f(x)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {tableValues.map((point, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-2 text-sm text-gray-900">{point.x}</td>
                            <td className="px-4 py-2 text-sm text-gray-900">{point.y}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Use the Graphing Calculator</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Step 1: Enter Your Function</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Type your function in the f(x) input box</li>
                <li>Use 'x' as your variable (e.g., x^2, sin(x), 2*x+1)</li>
                <li>Click example functions for quick testing</li>
                <li>Press Enter or click "Plot Function" to graph</li>
              </ol>
            </div>

            <div className="bg-teal-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Step 2: Adjust the View</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Set X Min/Max and Y Min/Max for viewing window</li>
                <li>Use "Zoom In" to see details closer</li>
                <li>Use "Zoom Out" to see broader view</li>
                <li>Click "Reset" to return to default view (-10 to 10)</li>
              </ol>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Step 3: Analyze</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Toggle "Grid" to show/hide coordinate grid</li>
                <li>Click "Show Table" to view x and f(x) values</li>
                <li>Look for roots (where graph crosses x-axis)</li>
                <li>Identify max/min points and asymptotes</li>
              </ol>
            </div>

            <div className="bg-pink-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pro Tips</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Use parentheses for complex expressions: sin(2*x)</li>
                <li>Adjust viewing window to see important features</li>
                <li>Check table values to find exact coordinates</li>
                <li>Use pi for π and e for Euler's number</li>
              </ul>
            </div>
          </div>
        </div>

        {/* What is a Graphing Calculator Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What is a Graphing Calculator?</h2>

          <div className="prose max-w-none text-gray-700">
            <p className="text-lg mb-6">
              A graphing calculator is an advanced calculator capable of plotting graphs, solving simultaneous equations, 
              and performing other tasks with variables. It's an essential tool for students in advanced mathematics, 
              science, and engineering courses, helping visualize mathematical relationships and analyze functions.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Supported Functions & Operations</h3>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Basic Operations</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>+</strong> Addition (e.g., x+5)</li>
                  <li><strong>-</strong> Subtraction (e.g., x-3)</li>
                  <li><strong>*</strong> Multiplication (e.g., 2*x)</li>
                  <li><strong>/</strong> Division (e.g., x/2)</li>
                  <li><strong>^</strong> Exponentiation (e.g., x^2, x^3)</li>
                </ul>
              </div>

              <div className="bg-teal-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Trigonometric</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>sin(x)</strong> Sine function</li>
                  <li><strong>cos(x)</strong> Cosine function</li>
                  <li><strong>tan(x)</strong> Tangent function</li>
                  <li>All functions use radians</li>
                  <li>Example: sin(x), cos(2*x)</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Advanced Functions</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>sqrt(x)</strong> Square root</li>
                  <li><strong>abs(x)</strong> Absolute value</li>
                  <li><strong>ln(x)</strong> Natural logarithm</li>
                  <li><strong>log(x)</strong> Base-10 logarithm</li>
                  <li><strong>e</strong> Euler's number (2.718...)</li>
                  <li><strong>pi</strong> Pi constant (3.14159...)</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Common Function Types</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Polynomial Functions</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Linear:</strong> y = mx + b (e.g., 2*x+1)</li>
                  <li><strong>Quadratic:</strong> y = ax² + bx + c (e.g., x^2-4*x+3)</li>
                  <li><strong>Cubic:</strong> y = ax³ + ... (e.g., x^3-2*x)</li>
                  <li>Used in physics for motion, economics for cost functions</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Trigonometric Functions</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Sine/Cosine:</strong> sin(x), cos(x)</li>
                  <li><strong>Tangent:</strong> tan(x)</li>
                  <li><strong>Transformed:</strong> 2*sin(x), cos(x+1)</li>
                  <li>Used in physics for waves, engineering for signals</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Exponential & Logarithmic</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Exponential:</strong> e^x, 2^x</li>
                  <li><strong>Logarithmic:</strong> ln(x), log(x)</li>
                  <li>Used in biology for growth, chemistry for pH</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Rational Functions</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Hyperbola:</strong> 1/x</li>
                  <li><strong>Complex:</strong> (x^2+1)/(x-2)</li>
                  <li>Shows asymptotes and discontinuities</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Common Use Cases for Students</h3>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 text-xl">📐</span>
                  <div>
                    <strong className="text-gray-900">Calculus:</strong> Visualize derivatives and integrals, find critical points, 
                    analyze function behavior, and understand limits graphically
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 text-xl">🔬</span>
                  <div>
                    <strong className="text-gray-900">Physics:</strong> Plot motion graphs (position, velocity, acceleration), 
                    analyze wave functions, and model physical phenomena
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 text-xl">⚙️</span>
                  <div>
                    <strong className="text-gray-900">Engineering:</strong> Design curves, analyze system responses, 
                    model electrical circuits, and solve differential equations
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 text-xl">💰</span>
                  <div>
                    <strong className="text-gray-900">Economics:</strong> Graph supply and demand curves, analyze cost and revenue functions, 
                    and model economic growth
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 text-xl">📊</span>
                  <div>
                    <strong className="text-gray-900">Statistics:</strong> Plot probability distributions, visualize regression lines, 
                    and analyze data trends
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How do I graph a parabola?</h3>
              <p className="text-gray-700">
                Enter a quadratic function like <strong>x^2</strong> for a basic parabola, or <strong>x^2-4*x+3</strong> for a more 
                complex one. The graph will show the characteristic U-shape. Adjust the viewing window to see the vertex (lowest/highest point) 
                and x-intercepts (roots). Use the table to find exact coordinates of key points.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Why isn't my function graphing correctly?</h3>
              <p className="text-gray-700">
                Common issues: (1) Use <strong>*</strong> for multiplication (write 2*x, not 2x), (2) Use <strong>^</strong> for exponents 
                (write x^2, not x²), (3) Check parentheses for complex expressions, (4) Adjust viewing window - your graph might be outside 
                the current view, (5) Some functions like 1/x have asymptotes that may look disconnected.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How do I find where a function crosses the x-axis?</h3>
              <p className="text-gray-700">
                X-intercepts (roots) are where the graph crosses the x-axis (where y=0). Visually locate where the graph crosses, 
                then use the <strong>table of values</strong> to find approximate x-values. Look for where f(x) changes from positive to 
                negative or vice versa. For precise values, you may need to zoom in or use algebraic methods.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">What viewing window should I use?</h3>
              <p className="text-gray-700">
                The default window (-10 to 10 for both x and y) works for most basic functions. For <strong>trigonometric functions</strong>, 
                try x: -2π to 2π (about -6.28 to 6.28). For <strong>exponential functions</strong>, try x: -5 to 5, y: -2 to 10. 
                For <strong>rational functions</strong> like 1/x, ensure you can see both branches and asymptotes. Experiment with zoom to find the best view.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Can I graph multiple functions at once?</h3>
              <p className="text-gray-700">
                Currently, this calculator graphs one function at a time. To compare functions, graph them separately and note key features. 
                For homework requiring multiple graphs, you can adjust the function and take screenshots of each, or sketch them on paper 
                using the coordinates from the table of values.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How do I use this for calculus homework?</h3>
              <p className="text-gray-700">
                Use the graphing calculator to: (1) <strong>Visualize derivatives</strong> - graph f(x) and estimate slope at points, 
                (2) <strong>Find critical points</strong> - look for max/min where slope is zero, (3) <strong>Understand integrals</strong> - 
                visualize area under curves, (4) <strong>Verify solutions</strong> - check if your algebraic work matches the graph. 
                Always show your analytical work on assignments!
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">What's the difference between radians and degrees?</h3>
              <p className="text-gray-700">
                This calculator uses <strong>radians</strong> for trigonometric functions (sin, cos, tan). In radians, a full circle is 2π 
                (about 6.28) instead of 360°. For calculus and most advanced math, always use radians. To convert: radians = degrees × π/180. 
                For example, 90° = π/2 radians ≈ 1.57.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphingCalculatorPage;
