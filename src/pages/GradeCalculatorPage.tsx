import React, { useState } from 'react';
import { GraduationCap, Plus, Trash2, Award, RotateCcw } from 'lucide-react';

interface Assignment {
  id: string;
  name: string;
  grade: string;
  weight: string;
}

const GradeCalculatorPage: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: '1', name: 'Midterm Exam', grade: '85', weight: '30' }
  ]);
  const [finalExamWeight, setFinalExamWeight] = useState('40');
  const [targetGrade, setTargetGrade] = useState('90');
  const [calculationMode, setCalculationMode] = useState<'grade' | 'gpa'>('grade');
  
  // GPA mode states
  const [currentGPA, setCurrentGPA] = useState('');
  const [currentCredits, setCurrentCredits] = useState('');
  const [newCourseCredits, setNewCourseCredits] = useState('');
  const [targetGPA, setTargetGPA] = useState('');
  
  const [result, setResult] = useState<number | null>(null);
  const [currentAverage, setCurrentAverage] = useState<number | null>(null);
  const [error, setError] = useState('');

  const addAssignment = () => {
    const newAssignment: Assignment = {
      id: Date.now().toString(),
      name: `Assignment ${assignments.length + 1}`,
      grade: '',
      weight: ''
    };
    setAssignments([...assignments, newAssignment]);
  };

  const removeAssignment = (id: string) => {
    if (assignments.length > 1) {
      setAssignments(assignments.filter(a => a.id !== id));
    }
  };

  const updateAssignment = (id: string, field: keyof Assignment, value: string) => {
    setAssignments(assignments.map(a => 
      a.id === id ? { ...a, [field]: value } : a
    ));
  };

  const calculateRequiredGrade = () => {
    setError('');
    setResult(null);
    setCurrentAverage(null);

    // Validate inputs
    const target = parseFloat(targetGrade);
    const finalWeight = parseFloat(finalExamWeight);

    if (isNaN(target) || isNaN(finalWeight)) {
      setError('Please enter valid target grade and final exam weight');
      return;
    }

    if (target < 0 || target > 100) {
      setError('Target grade must be between 0 and 100');
      return;
    }

    // Calculate current weighted average
    let totalWeightedGrade = 0;
    let totalWeight = 0;

    for (const assignment of assignments) {
      const grade = parseFloat(assignment.grade);
      const weight = parseFloat(assignment.weight);

      if (assignment.grade && assignment.weight) {
        if (isNaN(grade) || isNaN(weight)) {
          setError('Please enter valid grades and weights');
          return;
        }
        totalWeightedGrade += grade * weight;
        totalWeight += weight;
      }
    }

    // Check if weights add up correctly
    const remainingWeight = 100 - totalWeight - finalWeight;
    if (Math.abs(remainingWeight) > 0.01) {
      setError(`Weights don't add up to 100%. Current: ${(totalWeight + finalWeight).toFixed(1)}%, Remaining: ${remainingWeight.toFixed(1)}%`);
      return;
    }

    // Calculate current average
    if (totalWeight > 0) {
      setCurrentAverage(totalWeightedGrade / totalWeight);
    }

    // Calculate required final exam grade
    const requiredGrade = (target - (totalWeightedGrade / 100)) / (finalWeight / 100);
    setResult(requiredGrade);
  };

  const calculateRequiredCourseGrade = () => {
    setError('');
    setResult(null);

    const gpa = parseFloat(currentGPA);
    const credits = parseFloat(currentCredits);
    const newCredits = parseFloat(newCourseCredits);
    const targetGpa = parseFloat(targetGPA);

    if (isNaN(gpa) || isNaN(credits) || isNaN(newCredits) || isNaN(targetGpa)) {
      setError('Please enter all GPA values');
      return;
    }

    if (gpa < 0 || gpa > 4 || targetGpa < 0 || targetGpa > 4) {
      setError('GPA must be between 0.0 and 4.0');
      return;
    }

    // Calculate required grade for new course
    const totalPoints = gpa * credits;
    const requiredPoints = targetGpa * (credits + newCredits);
    const requiredCourseGPA = (requiredPoints - totalPoints) / newCredits;

    setResult(requiredCourseGPA);
  };

  const handleCalculate = () => {
    if (calculationMode === 'grade') {
      calculateRequiredGrade();
    } else {
      calculateRequiredCourseGrade();
    }
  };

  const handleReset = () => {
    setAssignments([{ id: '1', name: 'Midterm Exam', grade: '', weight: '' }]);
    setFinalExamWeight('40');
    setTargetGrade('90');
    setCurrentGPA('');
    setCurrentCredits('');
    setNewCourseCredits('');
    setTargetGPA('');
    setResult(null);
    setCurrentAverage(null);
    setError('');
  };

  const getLetterGrade = (grade: number): string => {
    if (grade >= 93) return 'A';
    if (grade >= 90) return 'A-';
    if (grade >= 87) return 'B+';
    if (grade >= 83) return 'B';
    if (grade >= 80) return 'B-';
    if (grade >= 77) return 'C+';
    if (grade >= 73) return 'C';
    if (grade >= 70) return 'C-';
    if (grade >= 67) return 'D+';
    if (grade >= 63) return 'D';
    if (grade >= 60) return 'D-';
    return 'F';
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <GraduationCap className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Grade & GPA Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Calculate what grade you need on your final exam or future courses to achieve your target GPA. Essential for maintaining scholarships and academic standing.
          </p>
        </div>

        {/* Mode Selection */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setCalculationMode('grade')}
              className={`py-4 px-6 rounded-xl font-semibold transition-all ${
                calculationMode === 'grade'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="text-lg mb-1">Course Grade</div>
              <div className="text-xs opacity-80">Calculate required final exam grade</div>
            </button>
            <button
              onClick={() => setCalculationMode('gpa')}
              className={`py-4 px-6 rounded-xl font-semibold transition-all ${
                calculationMode === 'gpa'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="text-lg mb-1">GPA Projection</div>
              <div className="text-xs opacity-80">Calculate required course grade for GPA</div>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              {calculationMode === 'grade' ? (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Grade Calculator</h2>

                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-700">{error}</p>
                    </div>
                  )}

                  {/* Current Assignments */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Current Grades</h3>
                      <button
                        onClick={addAssignment}
                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Add Assignment
                      </button>
                    </div>

                    <div className="space-y-3">
                      {assignments.map((assignment) => (
                        <div key={assignment.id} className="flex gap-3">
                          <input
                            type="text"
                            value={assignment.name}
                            onChange={(e) => updateAssignment(assignment.id, 'name', e.target.value)}
                            placeholder="Assignment name"
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                          <input
                            type="number"
                            value={assignment.grade}
                            onChange={(e) => updateAssignment(assignment.id, 'grade', e.target.value)}
                            placeholder="Grade %"
                            className="w-28 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            step="0.1"
                            min="0"
                            max="100"
                          />
                          <input
                            type="number"
                            value={assignment.weight}
                            onChange={(e) => updateAssignment(assignment.id, 'weight', e.target.value)}
                            placeholder="Weight %"
                            className="w-28 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            step="1"
                            min="0"
                            max="100"
                          />
                          <button
                            onClick={() => removeAssignment(assignment.id)}
                            disabled={assignments.length === 1}
                            className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Final Exam and Target */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Final Exam Weight (%)
                      </label>
                      <input
                        type="number"
                        value={finalExamWeight}
                        onChange={(e) => setFinalExamWeight(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="40"
                        step="1"
                        min="0"
                        max="100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Target Course Grade (%)
                      </label>
                      <input
                        type="number"
                        value={targetGrade}
                        onChange={(e) => setTargetGrade(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="90"
                        step="0.1"
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">GPA Projection Calculator</h2>

                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-700">{error}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Current GPA
                      </label>
                      <input
                        type="number"
                        value={currentGPA}
                        onChange={(e) => setCurrentGPA(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="3.5"
                        step="0.01"
                        min="0"
                        max="4"
                      />
                      <p className="text-xs text-gray-500 mt-1">On a 4.0 scale</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Current Total Credits
                      </label>
                      <input
                        type="number"
                        value={currentCredits}
                        onChange={(e) => setCurrentCredits(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="60"
                        step="1"
                        min="0"
                      />
                      <p className="text-xs text-gray-500 mt-1">Total credits completed so far</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        New Course Credits
                      </label>
                      <input
                        type="number"
                        value={newCourseCredits}
                        onChange={(e) => setNewCourseCredits(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="15"
                        step="1"
                        min="0"
                      />
                      <p className="text-xs text-gray-500 mt-1">Credits for upcoming semester/courses</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Target GPA
                      </label>
                      <input
                        type="number"
                        value={targetGPA}
                        onChange={(e) => setTargetGPA(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="3.7"
                        step="0.01"
                        min="0"
                        max="4"
                      />
                      <p className="text-xs text-gray-500 mt-1">Your desired cumulative GPA</p>
                    </div>
                  </div>
                </>
              )}

              {/* Buttons */}
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleCalculate}
                  className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Calculate Required Grade
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

          {/* Results Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Results</h2>

              {result !== null ? (
                <div className="space-y-6">
                  {calculationMode === 'grade' ? (
                    <>
                      {currentAverage !== null && (
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h3 className="text-sm font-semibold text-gray-700 mb-1">Current Average</h3>
                          <div className="text-2xl font-bold text-blue-600">
                            {currentAverage.toFixed(2)}%
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            Letter Grade: {getLetterGrade(currentAverage)}
                          </div>
                        </div>
                      )}

                      <div className="p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border-2 border-green-200">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Required Final Exam Grade</h3>
                        <div className="text-4xl font-bold text-green-600">
                          {result.toFixed(2)}%
                        </div>
                        <div className="text-lg text-gray-700 mt-2">
                          Letter Grade: {getLetterGrade(result)}
                        </div>
                      </div>

                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h3 className="font-semibold text-yellow-900 mb-2">💡 Analysis</h3>
                        <p className="text-sm text-yellow-800">
                          {result > 100 && 'This target is impossible to achieve. Consider adjusting your target grade.'}
                          {result >= 95 && result <= 100 && 'You need an excellent performance on the final exam!'}
                          {result >= 80 && result < 95 && 'You need a strong performance on the final exam.'}
                          {result >= 70 && result < 80 && 'You need a good performance on the final exam.'}
                          {result >= 60 && result < 70 && 'You need a passing grade on the final exam.'}
                          {result < 60 && result >= 0 && 'You have room for error - stay focused!'}
                          {result < 0 && 'You\'ve already exceeded your target! Great job!'}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border-2 border-green-200">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Required Course GPA</h3>
                        <div className="text-4xl font-bold text-green-600">
                          {result.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-600 mt-2">
                          Approximate Grade: {result >= 3.7 ? 'A-/A' : result >= 3.3 ? 'B+' : result >= 3.0 ? 'B' : result >= 2.7 ? 'B-' : result >= 2.3 ? 'C+' : result >= 2.0 ? 'C' : 'Below C'}
                        </div>
                      </div>

                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h3 className="font-semibold text-yellow-900 mb-2">💡 Analysis</h3>
                        <p className="text-sm text-yellow-800">
                          {result > 4.0 && 'This target is impossible to achieve with a 4.0 scale. Consider taking more credits or adjusting your target.'}
                          {result >= 3.7 && result <= 4.0 && 'You need excellent grades (A-/A) in your upcoming courses.'}
                          {result >= 3.0 && result < 3.7 && 'You need strong grades (B/B+) in your upcoming courses.'}
                          {result >= 2.0 && result < 3.0 && 'You need passing grades (C/C+) in your upcoming courses.'}
                          {result < 2.0 && result >= 0 && 'Your target is achievable with minimal effort.'}
                          {result < 0 && 'You\'ve already exceeded your target GPA!'}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Results Yet</h3>
                  <p className="text-gray-500">
                    Enter your grades and target to calculate what you need.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Use the Grade Calculator</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Course Grade Mode</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Add all your current assignments with grades and weights</li>
                <li>Enter the weight of your final exam</li>
                <li>Set your target course grade</li>
                <li>Calculate to see what you need on the final</li>
              </ol>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">GPA Projection Mode</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Enter your current cumulative GPA</li>
                <li>Add your total credits completed</li>
                <li>Enter credits for upcoming semester</li>
                <li>Set your target GPA to see required grades</li>
              </ol>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Grade Scale Reference</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div><strong>A:</strong> 93-100% (4.0)</div>
              <div><strong>A-:</strong> 90-92% (3.7)</div>
              <div><strong>B+:</strong> 87-89% (3.3)</div>
              <div><strong>B:</strong> 83-86% (3.0)</div>
              <div><strong>B-:</strong> 80-82% (2.7)</div>
              <div><strong>C+:</strong> 77-79% (2.3)</div>
              <div><strong>C:</strong> 73-76% (2.0)</div>
              <div><strong>C-:</strong> 70-72% (1.7)</div>
            </div>
            <p className="text-xs text-gray-600 mt-3">Note: Grade scales may vary by institution</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">What if my required grade is over 100%?</h3>
              <p className="text-gray-700">
                This means your target is <strong>mathematically impossible</strong> to achieve with your current grades. You'll need to either: (1) Lower your target grade, (2) Check if there's extra credit available, or (3) Speak with your professor about options. Focus on doing your best!
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How do I maintain my scholarship GPA?</h3>
              <p className="text-gray-700">
                Use the <strong>GPA Projection mode</strong> to calculate what grades you need each semester. Most scholarships require 3.0-3.5 GPA. Calculate early in the semester so you know your targets. If you're at risk, consider: lighter course load, tutoring, or speaking with your advisor about academic support.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">What if my weights don't add up to 100%?</h3>
              <p className="text-gray-700">
                The calculator will alert you if weights don't total 100%. Common reasons: (1) <strong>Forgot an assignment</strong> - add all graded work, (2) <strong>Wrong percentages</strong> - check your syllabus, (3) <strong>Participation grade</strong> - don't forget attendance/participation if weighted. All weights must sum to exactly 100%.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Can I use this for multiple courses?</h3>
              <p className="text-gray-700">
                <strong>Yes!</strong> Use <strong>Course Grade mode</strong> for individual classes to see what you need on finals. Use <strong>GPA Projection mode</strong> to see what overall grades you need across all courses to hit your target GPA. Calculate for each course separately, then use GPA mode for the big picture.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">What's a realistic target grade?</h3>
              <p className="text-gray-700">
                Aim for <strong>B+ or higher (87%+)</strong> if possible. For scholarships, maintain <strong>3.0+ GPA (B average)</strong>. For grad school, aim for <strong>3.5+ GPA</strong>. Dean's List typically requires <strong>3.5-3.7+</strong>. Set challenging but achievable goals - it's better to exceed a realistic target than fall short of an impossible one.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How accurate is this calculator?</h3>
              <p className="text-gray-700">
                The math is <strong>100% accurate</strong> based on your inputs. However, accuracy depends on: (1) <strong>Correct weights</strong> from your syllabus, (2) <strong>All assignments included</strong>, (3) <strong>Accurate current grades</strong>. Always double-check your syllabus and verify with your professor if unsure about grading policies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeCalculatorPage;
