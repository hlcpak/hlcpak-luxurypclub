import React, { useState, useEffect } from 'react';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface NavLinkProps {
  to: string;
  label: string;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label }) => (
  <RouterNavLink
    to={to}
    className={({ isActive }) =>
      `text-white hover:text-gold transition-colors duration-200 ${
        isActive ? 'text-gold' : ''
      }`
    }
  >
    {label}
  </RouterNavLink>
);

const MobileNavLink: React.FC<NavLinkProps> = ({ to, label, onClick }) => (
  <Link to={to} className="text-white text-xl hover:text-gold transition-colors duration-200" onClick={onClick}>
    {label}
  </Link>
);

import UserProfileDropdown from '@/components/UserProfileDropdown';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed w-full top-0 z-40 transition-colors duration-300 ${isScrolled ? 'bg-black/95 backdrop-blur-sm border-b border-white/10' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            {/* Logo only visible on mobile when menu is closed */}
            <div className="md:hidden flex items-center">
              {!menuOpen && (
                <h1 className="text-xl font-display font-bold text-gold">
                  LPC
                </h1>
              )}
            </div>
            
            {/* Mobile menu button */}
            <button 
              onClick={toggleMenu} 
              className="md:hidden z-50 text-white focus:outline-none"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" label="Home" />
            <NavLink to="/deals" label="Hotel Deals" />
            <NavLink to="/packages" label="Tour Packages" />
            <NavLink to="/about" label="About Us" />
            <NavLink to="/blog" label="Blog" />
            <NavLink to="/contact" label="Contact" />
          </div>
          
          {/* Login/Signup button for desktop */}
          <div className="hidden md:block">
            <UserProfileDropdown />
          </div>
          
          {/* Mobile menu */}
          <div 
            className={`fixed inset-0 bg-black flex flex-col justify-center items-center z-40 transition-opacity duration-300 md:hidden ${
              menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="flex flex-col space-y-6 items-center">
              <MobileNavLink to="/" label="Home" onClick={closeMenu} />
              <MobileNavLink to="/deals" label="Hotel Deals" onClick={closeMenu} />
              <MobileNavLink to="/packages" label="Tour Packages" onClick={closeMenu} />
              <MobileNavLink to="/about" label="About Us" onClick={closeMenu} />
              <MobileNavLink to="/blog" label="Blog" onClick={closeMenu} />
              <MobileNavLink to="/contact" label="Contact" onClick={closeMenu} />
              <div className="pt-4">
                <UserProfileDropdown />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
