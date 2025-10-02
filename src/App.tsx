import React from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import LoanCalculator from './components/LoanCalculator';
import About from './components/About';
import AIInsights from './components/AIInsights';
import LoanComparison from './components/LoanComparison';
import RefinancingGuide from './components/RefinancingGuide';
import HelpCenter from './components/HelpCenter';

function App() {
  return (
    <div className="App min-h-screen flex flex-col">
      <Navigation />
      <main>
        <section id="calculator">
          <LoanCalculator />
        </section>
        <About />
        <AIInsights />
        <LoanComparison />
        <RefinancingGuide />
        <HelpCenter />
      </main>
      <Footer />
    </div>
  );
}

export default App;