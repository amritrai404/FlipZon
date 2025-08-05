
'use client';

import React from 'react';
import ProductShowcase from './PorductShowCase';

export default function AboutPage() {
  return (
    <section
      id="about"
      className="relative bg-black text-white py-24 md:py-40 px-4 overflow-hidden"
    >
  
      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          About <span className="text-[#FFBA00]">FlipZon</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-10 leading-relaxed px-2 md:px-8">
          FlipZon is your modern online shopping destination — delivering quality, convenience, and confidence. We provide an extensive selection of top-tier electronics and everyday essentials at competitive prices, all supported by seamless delivery and trusted service.
        </p>

       

        <ProductShowcase/>
      </div>

    </section>
  );
}
