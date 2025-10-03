import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import CalculatorsPage from './pages/CalculatorsPage';
import ScientificCalculatorPage from './pages/ScientificCalculatorPage';
import StudentLoanCalculatorPage from './pages/StudentLoanCalculatorPage';
import AIInsightsPage from './pages/AIInsightsPage';
import LoanComparisonPage from './pages/LoanComparisonPage';
import RefinancingPage from './pages/RefinancingPage';
import AboutPage from './pages/AboutPage';

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
            <Route path="/calculators/scientific" element={<ScientificCalculatorPage />} />
            <Route path="/calculators/student-loan" element={<StudentLoanCalculatorPage />} />
            <Route path="/insights" element={<AIInsightsPage />} />
            <Route path="/comparison" element={<LoanComparisonPage />} />
            <Route path="/refinancing" element={<RefinancingPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;