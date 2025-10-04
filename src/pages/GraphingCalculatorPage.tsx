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
      </div>
    </div>
  );
};

export default GraphingCalculatorPage;
