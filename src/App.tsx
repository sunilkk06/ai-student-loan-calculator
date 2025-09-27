import React from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import LoanCalculator from './components/LoanCalculator';

function App() {
  return (
    <div className="App min-h-screen flex flex-col">
      <Navigation />
      <LoanCalculator />
      <Footer />
    </div>
  );
}

export default App;