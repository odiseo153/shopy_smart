
const specialOffers = [
    {
      title: 'Summer Sale',
      image: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=800&auto=format',
      discount: '50% OFF'
    },
    {
      title: 'Tech Deals',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format',
      discount: '30% OFF'  
    }
  ];

export default function PromotionsSection() {
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Special Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specialOffers.map((promo) => (
            <div
              key={promo.title}
              className="relative overflow-hidden rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <img
                src={promo.image}
                alt={promo.title}
                className="w-full h-auto"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">{promo.title}</h3>
                  <p className="text-xl">{promo.discount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  