import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-400 text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between sm:flex-row">
          {/* Left Section */}
          <div className="mb-4 sm:mb-0">
            <p className="text-sm">© {new Date().getFullYear()} MyApp. All rights reserved.</p>
          </div>

          {/* Center Section */}
          <div className="flex space-x-6 mb-4 sm:mb-0">
            <a href="#about" className="text-sm hover:text-gray-400">
              About Us
            </a>
            <a href="#contact" className="text-sm hover:text-gray-400">
              Contact
            </a>
            <a href="#privacy" className="text-sm hover:text-gray-400">
              Privacy Policy
            </a>
            <a href="#terms" className="text-sm hover:text-gray-400">
              Terms of Service
            </a>
          </div>

          {/* Right Section */}
          <div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
