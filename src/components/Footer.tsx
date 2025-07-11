import React from 'react';
import { Heart, TreePine, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-hazboun-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Family Brand */}
          <div className="flex items-center mb-4 md:mb-0">
            <TreePine className="h-6 w-6 text-gold-400 mr-2" />
            <div>
              <h3 className="text-lg font-bold">Hazboun Family</h3>
              <p className="text-hazboun-200 text-sm">Preserving our heritage since 1610</p>
            </div>
          </div>

          {/* Contact */}
          <div className="flex items-center text-hazboun-200 text-sm mb-4 md:mb-0">
            <Mail className="h-4 w-4 mr-2 text-gold-400" />
            <span>jo.hazboun@gmail.com</span>
          </div>

          {/* Copyright */}
          <div className="flex items-center text-hazboun-200 text-sm">
            <span>&copy; {currentYear} Made with</span>
            <Heart className="h-4 w-4 text-gold-400 mx-1" />
            <span>for family connection</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;