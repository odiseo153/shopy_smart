'use client'

import Header from '../Components/Header';
import { Carousel } from '../Components/Home/Carousel';
import { Bubble } from '../Components/Bubbles/Bubble';
import { FeatureSteps } from '@/components/blocks/feature-section';
import RecommendedProductsSection from '../Components/Home/RecommendedProductSection';

import CategoriesSection from '../Components/Home/CategoriesSection';
import PlatformsSection from '../Components/Home/PlatformsSection';
import { Suspense } from 'react';
import Hero from '../Components/Home/Hero';
import HowItWorks from '../Components/Home/ShopMateDescription';
import Testimonials from '../Components/Home/Testimonial';
import Footer from '../Components/Home/Footer';
import About from '../Components/Home/About';

export default function Page() { 
  return (
    <div className="min-h-screen">


      <main>
        {/* Hero Section - Sin padding top para conectar con el header */}
        <Suspense fallback={<div className="h-[80vh] bg-blue-700 animate-pulse"></div>}>
          <Hero />
        </Suspense>

        {/* About Section */}
        <Suspense fallback={<div className="h-80 bg-gray-100 animate-pulse"></div>}>
          <About />
        </Suspense>

        {/* How It Works Section */}
        <Suspense fallback={<div className="h-80 bg-white animate-pulse"></div>}>
          <HowItWorks />
        </Suspense>

        {/* Categories Section */}
        <Suspense fallback={<div className="h-80 bg-gray-50 animate-pulse"></div>}>
          <CategoriesSection />
        </Suspense>

        {/* Platforms Section */}
        <Suspense fallback={<div className="h-80 bg-white animate-pulse"></div>}>
          <PlatformsSection />
        </Suspense>

        {/* Testimonials Section */}
        <Suspense fallback={<div className="h-80 bg-gray-50 animate-pulse"></div>}>
          <Testimonials />
        </Suspense>

        {/* Footer */}
        <Suspense fallback={<div className="h-80 bg-gray-900 animate-pulse"></div>}>
          <Footer />
        </Suspense>
      </main>

      {/* Botón de regreso arriba - Aparece al hacer scroll */}
      <button 
        id="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-full shadow-lg transition-all duration-300 z-50 flex items-center justify-center opacity-0 translate-y-10"
        style={{ opacity: 0, transform: 'translateY(2.5rem)' }}
        aria-label="Volver arriba"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>

      {/* Script para controlar el botón de regreso arriba */}
      <script 
        dangerouslySetInnerHTML={{ 
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const backToTop = document.getElementById('back-to-top');
              window.addEventListener('scroll', function() {
                if (window.scrollY > 500) {
                  backToTop.style.opacity = '1';
                  backToTop.style.transform = 'translateY(0)';
                } else {
                  backToTop.style.opacity = '0';
                  backToTop.style.transform = 'translateY(2.5rem)';
                }
              });
            });
          `
        }}
      />
    </div>
  );
}
