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
    <div className="min-h-screen bg-gray-100">
      {/* Header j*/}

      <main className="  ">
        {/* Hero Sectison */}
        <section>
          <Suspense fallback={<div>Loading...</div>}>
          <Hero />
          </Suspense>
        </section>

        <section>
          <Suspense fallback={<div>Loading...</div>}>
          <About />
          </Suspense>
        </section>

        {/* Categories Section */}
        <section>
          <Suspense fallback={<div>Loading...</div>}>
            <HowItWorks />
          </Suspense>
        </section>

        <section>
          <Suspense fallback={<div>Loading...</div>}>
            <CategoriesSection />
          </Suspense>
        </section>

        {/* Platforms Section */}
        <section>
          <Suspense fallback={<div>Loading...</div>}>
            <PlatformsSection />
          </Suspense>
        </section>

        {/* Recommended Products Section */}
        <section>
          <Suspense fallback={<div>Loading...</div>}>
            <Testimonials />
          </Suspense>
        </section>

        <section>
          <Suspense fallback={<div>Loading...</div>}>
            <Footer />
          </Suspense>
        </section>
      </main>

      {/* Footer */}
    </div>
  );
}
