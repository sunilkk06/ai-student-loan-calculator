import React from 'react';
import { Brain, Mail, Phone, MapPin, Twitter, Linkedin, Github, Shield, FileText, HelpCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src="/Logo.png" alt="AI Student Loan Calculator" className="w-10 h-10" />
              <div>
                <h3 className="text-xl font-bold">AI Student Loan Calculator</h3>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering students with AI-driven insights to make informed decisions about their educational loans and financial future.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#calculator" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Loan Calculator
                </a>
              </li>
              <li>
                <a href="#insights" className="text-gray-300 hover:text-white transition-colors text-sm">
                  AI Insights
                </a>
              </li>
              <li>
                <a href="#comparison" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Loan Comparison
                </a>
              </li>
              <li>
                <a href="#refinancing" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Refinancing Guide
                </a>
              </li>
              <li>
                <a href="#resources" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Educational Resources
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#help" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors text-sm">
                  <HelpCircle className="w-4 h-4" />
                  <span>Help Center</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors text-sm">
                  <Mail className="w-4 h-4" />
                  <span>Contact Us</span>
                </a>
              </li>
              <li>
                <a href="#privacy" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors text-sm">
                  <Shield className="w-4 h-4" />
                  <span>Privacy Policy</span>
                </a>
              </li>
              <li>
                <a href="#terms" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors text-sm">
                  <FileText className="w-4 h-4" />
                  <span>Terms of Service</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>support@aistudentloancalculator.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>1-800-AI-LOANS</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>San Francisco, CA</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-2">Stay Updated</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-sm focus:outline-none focus:border-blue-500"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-r-lg hover:shadow-lg transition-all text-sm font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 AI Student Loan Calculator. All rights reserved. Built with AI-powered insights.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-xs text-gray-500">Secured by SSL</span>
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-xs text-gray-500">Bank-level Security</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;