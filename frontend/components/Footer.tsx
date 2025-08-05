'use client';

import React from 'react';
import Link from 'next/link';
import { Package } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-white" />
              <span className="text-xl font-bold">FlipZon</span>
            </div>
            <p className="text-gray-400 text-sm sm:text-base">
              Your trusted online shopping destination for quality products and exceptional service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">Products</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">About</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Additional Column (Optional) */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Support</h3>
            <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
              <li>
                <p  className="hover:text-white transition-colors">FAQ</p>
              </li>
              <li>
                <p  className="hover:text-white transition-colors">Shipping Info</p>
              </li>
              <li>
                <p  className="hover:text-white transition-colors">Return Policy</p >
              </li>
              <li>
                <p className="hover:text-white transition-colors">Support</p>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Email: support@flipzon.com<br />
              Phone: +91 98765 43210<br />
              Location: Mumbai, India
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} FlipZon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
