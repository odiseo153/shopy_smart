'use client'

import Header from '../Components/Header';
import { Carousel } from '../Components/Home/Carousel';
import CategoriesSection from '../Components/Home/CategoriesSection';
import RecommendedProductsSection from '../Components/Home/RecommendedProductSection';
import PlatformsSection from '../Components/Home/PlatformsSection';
import { Bubble } from '../Components/Bubbles/Bubble';
import { FeatureSteps } from '@/components/blocks/feature-section';
import { Suspense } from 'react';
import ShopMateDescription from '../Components/Home/ShopMateDescription';


export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header />
      <Bubble />



      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <Suspense fallback={<div>Loading...</div>}>
        <section className="">
          <div className="overflow-hidden rounded-lg ">
            <FeatureSteps title='Bienvenido a ShopySmart' features={[
              {
                "step": "1",
                "title": "Todo en uno",
                "content": "No tienes que andar de plataforma en plataforma buscando el mejor precio, aquí lo encuentras",
                'image': "https://fal.media/files/panda/ufZvyywJxR93m9kX-pZ-Y.png"
              },
              {
                "step": "2",
                "title": "Comparador de precios",
                "content": "Compara precios entre diferentes tiendas y encuentra la mejor oferta",
                'image': "https://fal.media/files/panda/kHalwAFqqrWta85dZCsk1.png"
              },
              {
                "step": "3",
                "title": "Alertas de precio",
                "content": "Recibe notificaciones cuando los productos que te interesan bajen de precio",
                'image': "https://fal.media/files/koala/07CbIaggmjhTP99SiIYkV.png"
              },
              {
                "step": "4",
                "title": "Historial de precios",
                "content": "Visualiza el histórico de precios para tomar mejores decisiones de compra",
                'image': "https://fal.media/files/lion/reCauHfTknkQPKSozxgCT.png"
              }
            ]} />
          </div>
        </section>
        </Suspense>

        {/* Categories */}
        <Suspense fallback={<div>Loading...</div>}>
        <ShopMateDescription />
        </Suspense>
        
        <Suspense fallback={<div>Loading...</div>}>
        <CategoriesSection />
        </Suspense>

        {/* Recommended Products */}

        {/* Trending Now */}
        <Suspense fallback={<div>Loading...</div>}>
        <PlatformsSection />
        </Suspense>

        {/* Promotions */}
        <Suspense fallback={<div>Loading...</div>}>
        <RecommendedProductsSection />
        </Suspense>
      </main>

      {/* Footer */}
    </div>
  );
}
