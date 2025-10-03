import React from 'react';
import { Brain, Menu, X, Calculator, TrendingUp, HelpCircle, User, Info, BarChart2, TrendingDown } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
            <img src="/Logo.svg" alt="AI Student Calculator" className="h-16 w-auto" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#calculator" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
              <Calculator className="w-4 h-4" />
              <span>Calculator</span>
            </a>
            <a href="#about" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
              <Info className="w-4 h-4" />
              <span>About</span>
            </a>
            <a href="#insights" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
              <TrendingUp className="w-4 h-4" />
              <span>Insights</span>
            </a>
            <a href="#comparison" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
              <BarChart2 className="w-4 h-4" />
              <span>Compare</span>
            </a>
            <a href="#refinancing" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
              <TrendingDown className="w-4 h-4" />
              <span>Refinancing</span>
            </a>
            <a href="#help" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
              <HelpCircle className="w-4 h-4" />
              <span>Help</span>
            </a>
            <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all w-fit cursor-pointer">
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <a href="#calculator" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer" onClick={() => setIsMenuOpen(false)}>
                <Calculator className="w-4 h-4" />
                <span>Calculator</span>
              </a>
              <a href="#about" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer" onClick={() => setIsMenuOpen(false)}>
                <Info className="w-4 h-4" />
                <span>About</span>
              </a>
              <a href="#insights" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer" onClick={() => setIsMenuOpen(false)}>
                <TrendingUp className="w-4 h-4" />
                <span>Insights</span>
              </a>
              <a href="#comparison" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer" onClick={() => setIsMenuOpen(false)}>
                <BarChart2 className="w-4 h-4" />
                <span>Compare</span>
              </a>
              <a href="#refinancing" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer" onClick={() => setIsMenuOpen(false)}>
                <TrendingDown className="w-4 h-4" />
                <span>Refinancing</span>
              </a>
              <a href="#help" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer" onClick={() => setIsMenuOpen(false)}>
                <HelpCircle className="w-4 h-4" />
                <span>Help</span>
              </a>
              <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all w-fit cursor-pointer">
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;