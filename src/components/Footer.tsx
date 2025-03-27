
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <h3 className="text-xl font-semibold mb-4">
              <span className="text-primary">TICK</span>
              <span className="text-accent">TOCK</span>
            </h3>
            <p className="text-muted-foreground mb-4">
              Crafting exceptional timepieces for the modern connoisseur. Precision engineering meets timeless design.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
            </div>
          </div>
          
          {/* Navigation */}
          <div>
            <h3 className="text-lg font-medium mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-muted-foreground hover:text-accent transition-colors">All Watches</Link></li>
              <li><Link to="/products" className="text-muted-foreground hover:text-accent transition-colors">Luxury Collection</Link></li>
              <li><Link to="/products" className="text-muted-foreground hover:text-accent transition-colors">Sports Watches</Link></li>
              <li><Link to="/products" className="text-muted-foreground hover:text-accent transition-colors">Smart Watches</Link></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="text-lg font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Careers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Our Story</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Press</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="text-lg font-medium mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">FAQs</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Warranty Information</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} TickTock. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
