
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { HomeIcon } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-24">
        <div className="text-center px-4">
          <h1 className="text-8xl md:text-9xl font-display font-bold text-gold mb-4">404</h1>
          <p className="text-2xl md:text-3xl text-white mb-8">Oops! Page not found</p>
          <p className="text-white/70 max-w-xl mx-auto mb-10">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center justify-center rounded-md bg-gold-dark text-white px-6 py-3 text-sm font-medium transition-all hover:bg-gold hover:text-black"
          >
            <HomeIcon className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
