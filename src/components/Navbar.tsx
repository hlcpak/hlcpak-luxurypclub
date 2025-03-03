
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { 
  Menu, 
  X, 
  User, 
  ChevronDown 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Deals', href: '/deals' },
    { name: 'Tour Packages', href: '/packages' },
    { name: 'Videos', href: '/videos' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-black/90 backdrop-blur-lg py-3 shadow-md' : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-end">
        {/* Logo - removed from here as it's handled in the parent component */}
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href} 
              className="text-sm text-white/90 hover:text-gold transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Login/Signup Button */}
        <div className="hidden md:flex items-center ml-8">
          <button className="flex items-center space-x-2 bg-gold-dark hover:bg-gold text-white hover:text-black px-4 py-2 rounded-md transition-colors duration-300">
            <User size={18} />
            <span>Login</span>
            <ChevronDown size={16} />
          </button>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg md:hidden animate-fade-in-down">
            <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  className="text-white/90 hover:text-gold py-2 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <button className="flex items-center justify-center space-x-2 bg-gold-dark hover:bg-gold text-white hover:text-black px-4 py-3 rounded-md w-full transition-colors duration-300 mt-4">
                <User size={18} />
                <span>Login / Sign Up</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
