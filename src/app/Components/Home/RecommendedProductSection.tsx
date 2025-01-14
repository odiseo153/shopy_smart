

const recommendedProducts = [
    {
      name: 'Wireless Earbuds',
      brand: 'Amazon',
      price: 49.99,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&auto=format'
    },
    {
      name: 'Smart Watch',
      brand: 'Aliexpress',
      price: 199.99, 
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=500&auto=format'
    },
    {
      name: 'Laptop Stand',
      brand: 'Ebay',
      price: 29.99,
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format'
    },
    {
      name: 'Coffee Maker',
      brand: 'Shopify',
      price: 89.99,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&auto=format'
    },
    {
      name: 'Backpack',
      brand: 'Corotos',
      price: 39.99,
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format'
    }
  ];

export default function RecommendedProductsSection() {
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Recommended for You</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {recommendedProducts.map((product, i) => (
            <div
              key={i}
              className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-2"
                />
                <div className="absolute top-2 right-2">
                  <span className="inline-block px-2 py-1 text-sm bg-white rounded-full shadow">
                    {product.rating} ★
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900 truncate flex-1">{product.name}</h3>
                  <span className="ml-2 px-3 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded-full">
                    {product.brand}
                  </span>
                </div>
                <p className="text-lg font-bold text-red-600">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  