import React from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import LoanCalculator from './components/LoanCalculator';

function App() {
  return (
    <div className="App min-h-screen flex flex-col">
      <Navigation />
      <main>
        <section id="calculator">
          <LoanCalculator />
        </section>
        <section id="insights" className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">AI Insights</h2>
            <p className="text-xl text-gray-600">Get personalized insights about your student loans - Coming Soon</p>
          </div>
        </section>
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