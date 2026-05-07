import React from 'react';
import Navbar from '../components/Navbar/Navbar';

const AboutUs = () => {
  return (
    <>
    <Navbar />
    
   
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900 text-white relative overflow-x-hidden font-[font1]">

      

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-20 text-center">
        
        {/* Header Section */}
        <section className="mb-20">
          <h1 className="text-6xl font-bold tracking-tighter mb-4">
            THE  <span className="text-purple-400">BLUEPRINT</span>
          </h1>
          
        </section>

        {/* Text Content */}
        <div className="space-y-24">
          
          {/* Section 1: Concept */}
          <section className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h2 className="text-sm font-bold text-purple-400 uppercase tracking-[0.3em] mb-6">The Concept</h2>
            <p className="text-2xl md:text-3xl font-normal leading-relaxed text-gray-200">
              Notes Store was created to be a <span className="text-white font-bold">centralized repository</span>. 
              One destination to eliminate the struggle of finding study materials.
            </p>
          </section>

          
          <div className="flex justify-center items-center gap-4">
            <div className="h-[1px] w-12 bg-white/10"></div>
            <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]"></div>
            <div className="h-[1px] w-12 bg-white/10"></div>
          </div>

          {/* Section 2: Audience */}
          <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <h2 className="text-sm font-bold text-purple-400 uppercase tracking-[0.3em] mb-6">The Audience</h2>
            <p className="text-2xl md:text-3xl font-normal leading-relaxed text-gray-200">
              Tailored specifically for our <span className="text-white font-bold">MCA Students</span>, 
              providing a structured path to academic excellence.
            </p>
          </section>

       
          <div className="flex justify-center items-center gap-4">
            <div className="h-[1px] w-12 bg-white/10"></div>
            <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]"></div>
            <div className="h-[1px] w-12 bg-white/10"></div>
          </div>

          {/* Section 3: Authority */}
          <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
            <h2 className="text-sm font-bold text-purple-400 uppercase tracking-[0.3em] mb-6">The Authority</h2>
            <p className="text-2xl md:text-3xl font-normal leading-relaxed text-gray-200">
              All materials are <span className="text-white font-bold">verified and circulated by our faculty</span>, 
              ensuring 100% academic accuracy and relevance.
            </p>
          </section>
          <div className="flex justify-center items-center gap-4">
            <div className="h-[1px] w-12 bg-white/10"></div>
            <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]"></div>
            <div className="h-[1px] w-12 bg-white/10"></div>
          </div>

        </div>
        

    

      </div>
    </div>
     </>
  );
};

export default AboutUs;