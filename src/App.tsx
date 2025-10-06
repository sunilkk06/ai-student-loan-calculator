import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import AIAssistant from './components/AIAssistant';
import HomePage from './pages/HomePage';
import CalculatorsPage from './pages/CalculatorsPage';
import FinancialCalculatorsPage from './pages/FinancialCalculatorsPage';
import ScientificCalculatorPage from './pages/ScientificCalculatorPage';
import StudentLoanCalculatorPage from './pages/StudentLoanCalculatorPage';
import BudgetPlannerPage from './pages/BudgetPlannerPage';
import AIInsightsPage from './pages/AIInsightsPage';
import LoanComparisonPage from './pages/LoanComparisonPage';
import RefinancingPage from './pages/RefinancingPage';
import AboutPage from './pages/AboutPage';
import AcademicCalculatorsPage from './pages/AcademicCalculatorsPage';
import StatisticsCalculatorPage from './pages/StatisticsCalculatorPage';
import GraphingCalculatorPage from './pages/GraphingCalculatorPage';
import PhysicsSolverPage from './pages/PhysicsSolverPage';
import CitationFormatterPage from './pages/CitationFormatterPage';
import GradeCalculatorPage from './pages/GradeCalculatorPage';
import StudentFinancePage from './pages/StudentFinancePage';
import IDREstimatorPage from './pages/IDREstimatorPage';
import RoommateExpenseSplitterPage from './pages/RoommateExpenseSplitterPage';
import CollegeSavingsPage from './pages/CollegeSavingsPage';
import FinancialAidEstimatorPage from './pages/FinancialAidEstimatorPage';
import TVMCalculatorPage from './pages/TVMCalculatorPage';
import TuitionCostProjectorPage from './pages/TuitionCostProjectorPage';
import HelpPage from './pages/HelpPage';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/calculators" element={<CalculatorsPage />} />
            <Route path="/financial-calculators" element={<FinancialCalculatorsPage />} />
            <Route path="/calculators/scientific" element={<ScientificCalculatorPage />} />
            <Route path="/calculators/student-loan" element={<StudentLoanCalculatorPage />} />
            <Route path="/calculators/budget-planner" element={<BudgetPlannerPage />} />
            <Route path="/calculators/tvm" element={<TVMCalculatorPage />} />
            <Route path="/calculators/tuition-projector" element={<TuitionCostProjectorPage />} />
            <Route path="/insights" element={<AIInsightsPage />} />
            <Route path="/comparison" element={<LoanComparisonPage />} />
            <Route path="/refinancing" element={<RefinancingPage />} />
            <Route path="/academic" element={<AcademicCalculatorsPage />} />
            <Route path="/academic/statistics" element={<StatisticsCalculatorPage />} />
            <Route path="/academic/graphing" element={<GraphingCalculatorPage />} />
            <Route path="/academic/physics-solver" element={<PhysicsSolverPage />} />
            <Route path="/academic/citation-formatter" element={<CitationFormatterPage />} />
            <Route path="/academic/grade-calculator" element={<GradeCalculatorPage />} />
            <Route path="/student-finance" element={<StudentFinancePage />} />
            <Route path="/student-finance/idr-estimator" element={<IDREstimatorPage />} />
            <Route path="/student-finance/roommate-expense-splitter" element={<RoommateExpenseSplitterPage />} />
            <Route path="/student-finance/college-savings" element={<CollegeSavingsPage />} />
            <Route path="/student-finance/financial-aid-estimator" element={<FinancialAidEstimatorPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
        <AIAssistant />
      </div>
    </Router>
  );
}

export default App;