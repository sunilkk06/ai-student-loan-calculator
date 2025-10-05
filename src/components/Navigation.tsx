import React from 'react';
import { Menu, X, TrendingUp, HelpCircle, User, BarChart2, TrendingDown, DollarSign, Book, Wallet } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
            <img src="/Logo.svg" alt="AI Student Calculator" className="h-16 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/insights" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
              <TrendingUp className="w-4 h-4" />
              <span>Insights</span>
            </Link>
            <Link to="/comparison" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
              <BarChart2 className="w-4 h-4" />
              <span>Compare</span>
            </Link>
            <Link to="/financial-calculators" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
              <DollarSign className="w-4 h-4" />
              <span>Financial Calculators</span>
            </Link>
            <Link to="/academic" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
              <Book className="w-4 h-4" />
              <span>Academic Calculators</span>
            </Link>
            <Link to="/student-finance" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
              <Wallet className="w-4 h-4" />
              <span>Student Finance & Planning</span>
            </Link>
            <Link to="/refinancing" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
              <TrendingDown className="w-4 h-4" />
              <span>Refinancing</span>
            </Link>
            <Link to="/help" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
              <HelpCircle className="w-4 h-4" />
              <span>Help</span>
            </Link>
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
              <Link to="/insights" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer" onClick={() => setIsMenuOpen(false)}>
                <TrendingUp className="w-4 h-4" />
                <span>Insights</span>
              </Link>
              <Link to="/comparison" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer" onClick={() => setIsMenuOpen(false)}>
                <BarChart2 className="w-4 h-4" />
                <span>Compare</span>
              </Link>
              <Link to="/financial-calculators" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer" onClick={() => setIsMenuOpen(false)}>
                <DollarSign className="w-4 h-4" />
                <span>Financial Calculators</span>
              </Link>
              <Link to="/academic" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer" onClick={() => setIsMenuOpen(false)}>
                <Book className="w-4 h-4" />
                <span>Academic Calculators</span>
              </Link>
              <Link to="/student-finance" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer" onClick={() => setIsMenuOpen(false)}>
                <Wallet className="w-4 h-4" />
                <span>Student Finance & Planning</span>
              </Link>
              <Link to="/refinancing" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer" onClick={() => setIsMenuOpen(false)}>
                <TrendingDown className="w-4 h-4" />
                <span>Refinancing</span>
              </Link>
              <Link to="/help" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer" onClick={() => setIsMenuOpen(false)}>
                <HelpCircle className="w-4 h-4" />
                <span>Help</span>
              </Link>
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