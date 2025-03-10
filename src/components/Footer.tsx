
import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Mail, 
  PhoneCall,
  MapPin, 
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();
  
  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Hotel Deals', href: '/deals' },
    { name: 'Tour Packages', href: '/packages' },
    { name: 'Loyalty Program', href: '/loyalty' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact Us', href: '/contact' },
  ];
  
  const legalLinks = [
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Refund Policy', href: '/refunds' },
  ];
  
  const socialLinks = [
    { icon: <Facebook size={18} />, href: '#', label: 'Facebook' },
    { icon: <Twitter size={18} />, href: '#', label: 'Twitter' },
    { icon: <Instagram size={18} />, href: '#', label: 'Instagram' },
    { icon: <Linkedin size={18} />, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-black text-white/80">
      <div className="container mx-auto px-4">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center mb-6">
              <span className="text-2xl font-display font-bold text-gold">Luxry Privilege</span>
              <span className="text-2xl font-display font-light text-white ml-1">Club</span>
            </div>
            <p className="mb-6">
              Experience exclusive hotel privileges beyond ordinary booking platforms. Unlock member-only rates, VIP amenities, and exceptional service at luxury hotels worldwide.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.href} 
                  className="h-9 w-9 rounded-full bg-white/5 hover:bg-gold-dark hover:text-white flex items-center justify-center transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-display font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="hover:text-gold transition-colors flex items-center"
                  >
                    <ArrowRight size={14} className="mr-2 text-gold-dark" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Contact */}
          <div>
            <h3 className="text-lg font-display font-semibold text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 text-gold-dark flex-shrink-0 mt-1" />
                <span>
                 Suite 203, Progressive Square Plaza,Main Shahra e Faisal, Karachi
                </span>
              </li>
              <li className="flex items-center">
                <PhoneCall size={18} className="mr-3 text-gold-dark flex-shrink-0" />
                <span>+92 336 8356375</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-gold-dark flex-shrink-0" />
                <span>info@luxuryprivilegeclub.com</span>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-display font-semibold text-white mb-6">Newsletter</h3>
            <p className="mb-4">
              Subscribe to our newsletter for exclusive offers and luxury travel insights.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white/5 border border-white/20 rounded-l-md px-4 py-2 flex-grow focus:outline-none focus:border-gold-dark"
              />
              <button 
                type="submit" 
                className="bg-gold-dark hover:bg-gold text-white hover:text-black px-4 rounded-r-md transition-colors"
              >
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            &copy; {year} Luxury Privilege Club. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href} 
                className="text-sm hover:text-gold transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
