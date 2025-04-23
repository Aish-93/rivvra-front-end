import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: Company Info */}
        <div className='ml-5'>
          <h3 className="font-bold text-lg mb-4 ">Company</h3>
          <ul>
            <li className="mb-2"><a href="/" className="hover:text-gray-400">About Us</a></li>
            <li className="mb-2"><a href="/" className="hover:text-gray-400">Careers</a></li>
            <li className="mb-2"><a href="/" className="hover:text-gray-400">Press</a></li>
            <li className="mb-2"><a href="/" className="hover:text-gray-400">Contact</a></li>
          </ul>
        </div>

        {/* Column 2: Support */}
        <div>
          <h3 className="font-bold text-lg mb-4">Support</h3>
          <ul>
            <li className="mb-2"><a href="/" className="hover:text-gray-400">Help Center</a></li>
            <li className="mb-2"><a href="/" className="hover:text-gray-400">FAQs</a></li>
            <li className="mb-2"><a href="/" className="hover:text-gray-400">Privacy Policy</a></li>
            <li className="mb-2"><a href="/" className="hover:text-gray-400">Terms of Service</a></li>
          </ul>
        </div>

        {/* Column 3: Social Media */}
        <div>
          <h3 className="font-bold text-lg mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
              <FaFacebook size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <FaTwitter size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
              <FaInstagram size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Rivvra. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
