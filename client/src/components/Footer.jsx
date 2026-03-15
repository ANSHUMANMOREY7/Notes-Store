import { memo } from 'react';

const Footer = () => {
return (
    <footer className="bg-black text-white py-10 mt-auto h-[340px]">
      <div className="max-w-7xl mx-[50px] px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        
        <div className=''>
          <h2 className="text-white text-[33px] font-bold mb-4 font-[font1] ">Notes Store</h2>
          <p className="text-sm">Your go-to hub for organized MCA notes, study materials, and productivity resources.</p>
        </div>

        
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-purple-500 transition">Home</a></li>
            <li><a href="/about" className="hover:text-purple-500 transition">About</a></li>
            <li><a href="/contact" className="hover:text-purple-500 transition">Contact</a></li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/privacy" className="hover:text-purple-500 transition">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-purple-500 transition">Terms of Service</a></li>
            <li><a href="mailto:support@notesstore.com" className="hover:text-purple-500 transition">support@notesstore.com</a></li>
          </ul>
        </div>
      </div>
      
      <div className="text-center mt-25 pt-6 border-t border-gray-800 text-xs">
        &copy; {new Date().getFullYear()} Notes Store. All rights reserved.
      </div>
    </footer>
  );
};

export default memo(Footer);