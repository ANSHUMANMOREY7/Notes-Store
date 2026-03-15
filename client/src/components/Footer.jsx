import { memo } from 'react';
import { FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';
const Footer = () => {
return (
    <footer className="bg-black text-white py-10 mt-auto">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-16">
        
        
        <div className=''>
          <h2 className="text-white text-[33px] font-bold mb-4 font-[font1] ">Notes Store</h2>
          <p className="text-sm">Your go-to hub for organized MCA notes, study materials, and productivity resources.</p>
        </div>

        
        <div>
          <h3 className="text-white font-semibold mb-4 text-[25px]">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-purple-500 transition">Home</a></li>
            <li><a href="/about" className="hover:text-purple-500 transition">About</a></li>
            <li><a href="/contact" className="hover:text-purple-500 transition">Contact</a></li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-white font-semibold mb-4 text-[25px]">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/privacy" className="hover:text-purple-500 transition">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-purple-500 transition">Terms of Service</a></li>
            <li><a href="" className="hover:text-purple-500 transition">support@notesstore.com</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4 text-[22px]">Connect With Us</h3>
          <div className="flex space-x-4">
            <a href="https://mail.google.com/mail/u/0/#inbox" className="hover:text-red-400 text-xl"><FaEnvelope /></a>
            <a href="https://www.instagram.com/anshumxnn_27/?hl=en" target="_blank" rel="noreferrer" className="hover:text-pink-500 text-xl"><FaInstagram /></a>
            <a href="https://www.linkedin.com/in/anshuman-morey/" target="_blank" rel="noreferrer" className="hover:text-blue-500 text-xl"><FaLinkedin /></a>
          </div>
        </div>
      </div>
      
      
      
      <div className="text-center mt-10 pt-6 border-t border-gray-800 text-xs">
        &copy; {new Date().getFullYear()} Notes Store. All rights reserved.
      </div>
    </footer>
  );
};

export default memo(Footer);