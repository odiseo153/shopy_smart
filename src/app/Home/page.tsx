'use client'

import Header from '../Components/Header';
import NewsletterBubble from '../Components/NewsletterBubble';
import {Carousel} from '../Components/Home/Carousel';
import CategoriesSection from '../Components/Home/CategoriesSection';
import RecommendedProductsSection from '../Components/Home/RecommendedProductSection';
import TrendingNowSection from '../Components/Home/TrendingNowSection';
import PromotionsSection from '../Components/Home/PromotionsSection';
import Footer from '../Components/Home/Footer';




export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header />
      <NewsletterBubble />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-8">
          <div className="overflow-hidden rounded-lg shadow">
            <Carousel />
          </div>
        </section>

        {/* Categories */}
        <CategoriesSection />

        {/* Recommended Products */}
        <RecommendedProductsSection />

        {/* Trending Now */}
        <TrendingNowSection />

        {/* Promotions */}
        <PromotionsSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}


  
  
  