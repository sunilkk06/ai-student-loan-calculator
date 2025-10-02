import React from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import LoanCalculator from './components/LoanCalculator';
import About from './components/About';
import AIInsights from './components/AIInsights';

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
        <section id="help" className="min-h-screen bg-white flex items-center justify-center">
          <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h2>
            <p className="text-xl text-gray-600">Find answers to common questions - Coming Soon</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;