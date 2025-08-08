"use client";

import React from "react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* About Content Section */}
      <section
        className="relative bg-black text-white py-24 md:py-40 px-4 overflow-hidden"
      >
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            About <span className="text-[#FFBA00]">FlipZon</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-10 leading-relaxed px-2 md:px-8">
            FlipZon is your modern online shopping destination — delivering
            quality, convenience, and confidence. We provide an extensive
            selection of top-tier electronics and everyday essentials at
            competitive prices, all supported by seamless delivery and trusted
            service.
          </p>

          <p className="text-gray-400 text-lg md:text-xl">
            Our mission is to make online shopping simple, reliable, and
            enjoyable for everyone.
          </p>
        </div>
      </section>
    </div>
  );
}
