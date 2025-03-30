import React from 'react';
import { Twitter, Facebook, Linkedin, Instagram, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand & About */}
          <div>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">Xpensa</h2>
            <p className="text-gray-300 mt-3">
              Take control of your finances with AI-powered insights and intuitive tracking.
            </p>
            <div className="mt-6 w-16 h-1 bg-blue-500 rounded-full"></div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-3">
              {['Transactions', 'Analytics', 'AI Assistant', 'About Us'].map((item) => (
                <li key={item}>
                  <a 
                    href={`/${item.replace(/\s+/g, '')}`} 
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <span className="mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                      <ArrowRight size={14} />
                    </span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Resources</h3>
            <ul className="space-y-3">
              {['Blog', 'Help Center', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a 
                    href={`/${item}`} 
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <span className="mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                      <ArrowRight size={14} />
                    </span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Stay Connected</h3>
            <p className="text-gray-300">Subscribe to our newsletter for updates.</p>
            <div className="mt-4 flex rounded-lg overflow-hidden shadow-lg border border-gray-700">
              <div className="bg-gray-800 px-3 flex items-center">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full bg-gray-800 p-3 text-gray-300 focus:outline-none border-none"
              />
              <button className="bg-gradient-to-r from-blue-500 to-teal-500 px-4 py-2 hover:from-blue-600 hover:to-teal-600 transition-all duration-300 font-medium">
                Subscribe
              </button>
            </div>
            <div className="mt-6 flex space-x-5">
              {[
                { icon: <Twitter size={20} />, name: 'Twitter' },
                { icon: <Facebook size={20} />, name: 'Facebook' },
                { icon: <Linkedin size={20} />, name: 'LinkedIn' },
                { icon: <Instagram size={20} />, name: 'Instagram' }
              ].map((social) => (
                <a 
                  key={social.name}
                  href="#" 
                  aria-label={social.name}
                  className="bg-gray-800 p-2.5 rounded-full text-gray-400 hover:text-white hover:bg-blue-500 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} Xpensa. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Designed with ♥ for better Financial Futures</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;