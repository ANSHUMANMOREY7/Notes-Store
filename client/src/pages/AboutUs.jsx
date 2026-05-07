import React from 'react';
import Navbar from '../components/Navbar/Navbar';

const AboutUs = () => {
  return (
   <>
   <Navbar/>
        <div className='container mx-auto px-4 py-8'>
            <h1 className='text-3xl font-bold mb-4'>About Us</h1>
            <p className='text-lg '>
                Welcome to our Notes Store! We are dedicated to providing high-quality study materials to help students succeed in their academic journey.
            </p>
        </div>
   </>
)};

export default AboutUs;