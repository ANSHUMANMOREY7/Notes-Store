import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Navbar from '../components/Navbar/Navbar';
import StarsBackground from '../components/StarBackground';
import { toast } from 'react-hot-toast';
const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.init("WyWS68ennaUOloT8W");
    
    emailjs.sendForm(
      'Anshumanmorey', 
      'template_6i9ugya', 
      form.current, 
      'WyWS68ennaUOloT8W'
    )
    .then((result) => {
       toast.success('Message sent successfully!');
        e.target.reset();
    }, (error) => {
        toast.error('Failed to send message. Please try again later.');
    });
  };

  return (
    <>
    
  
      <Navbar />
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900 text-white relative overflow-x-hidden font-[font1]">
    
      {/* Signature Background Glows */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]"></div>
      </div>
      

      <div className="contact-content relative z-10 max-w-6xl mx-auto px-8 pt-22 pb-16">
        
        {/* Header Section */}
        <div className="mb-10 text-center ">
         
          <h1 className="text-4xl ">
            Contact Us
          </h1>
          <p className="text-gray-300 font-normal font-sans mb-10 text-center">
            Have questions, feedback, or need support? We're here to help! 
            
          </p>
        </div>

        <div className="contact-card-grid grid md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Side: Faculty Info Card */}
<div className="lg:col-span-2">
  <div className="contact-card h-full bg-black/70 p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden flex flex-col justify-center">
    {/* Subtle inner glow */}
    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl"></div>
    
    <h3 className="text-2xl font-bold mb-6 text-white leading-tight">
      Academic & <br />
      <span className="text-purple-400">Faculty Support</span>
    </h3>
    
    <div className="space-y-6 text-gray-300 leading-relaxed">
      <p>
        Have a specific question regarding the <span className="text-white font-medium">MCA notes</span> or encountered an issue with the materials? 
      </p>
      
    

      {/* New In-Person Location Section */}
      <div className="pt-4 border-t border-white/5">
        <p className="flex items-start gap-3">
          <span className="text-purple-400 text-xl">📍</span>
          <span>
            For urgent matters, you can <span className="text-white font-medium">directly reach the faculty</span> at <br />
            <span className="text-purple-400">Floor 1, Block A, MCA Department.</span>
          </span>
        </p>
      </div>
    </div>

    {/* Verified Badge */}
    
  </div>
</div>

          {/* Right Side: Contact Form Card */}
          <div className="lg:col-span-3">
            <div className="contact-card bg-black/70 p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
              <form ref={form} onSubmit={sendEmail} className="contact-form space-y-4 lg:space-y-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  <input 
                    name="name" 
                    type="text" 
                    placeholder="Full Name"
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 lg:rounded-2xl lg:px-6 lg:py-4 focus:outline-none focus:border-purple-500 focus:bg-black/60 transition-all font-[font1] placeholder:text-gray-500"
                  />
                  <input 
                    name="subject" 
                    type="text" 
                    placeholder="Subject"
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 lg:rounded-2xl lg:px-6 lg:py-4 focus:outline-none focus:border-purple-500 focus:bg-black/60 transition-all font-[font1] placeholder:text-gray-500"
                  />
                </div>

                <textarea 
                  name="message" 
                  rows="6"
                  placeholder="Your detailed message regarding notes or system improvement..."
                  required
                  className="contact-message w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 lg:rounded-2xl lg:px-6 lg:py-4 focus:outline-none focus:border-purple-500 focus:bg-black/60 transition-all resize-none font-[font1] placeholder:text-gray-500"
                ></textarea>

                <button type="submit" className="contact-submit w-full py-3 rounded-xl bg-black text-white font-bold transition text-sm shadow-lg cursor-pointer">
                  Send Message
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
    <StarsBackground />
      </>
  );
};

export default ContactUs;