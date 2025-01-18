'use client'

import Header from '../Components/Header';
import {Carousel} from '../Components/Home/Carousel';
import CategoriesSection from '../Components/Home/CategoriesSection';
import RecommendedProductsSection from '../Components/Home/RecommendedProductSection';
import PlatformsSection from '../Components/Home/PlatformsSection';
import PromotionsSection from '../Components/Home/PromotionsSection';
import Footer from '../Components/Home/Footer';
import Offers from '../Components/Home/Offers';
import { Bubble } from '../Components/Bubbles/Bubble';




export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header />
      <Bubble />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-8">
          <div className="overflow-hidden rounded-lg shadow">
            <Carousel />
          </div>
        </section>

        {/* Categories */}
        <Offers />
        <CategoriesSection />

        {/* Recommended Products */}
        <RecommendedProductsSection />

        {/* Trending Now */}
        <PlatformsSection />

        {/* Promotions */}
        <PromotionsSection />
      </main>

      {/* Footer */}
    </div>
  );
}


  
  
  