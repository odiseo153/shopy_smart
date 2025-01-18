const trendingItems = [
  {
    name: 'Aliexpress',
    image: 'https://c0.klipartz.com/pngpicture/900/512/gratis-png-iconos-del-ordenador-fuente-aliexpress-thumbnail.png'
  },
  {
    name: 'Ebay',
    image: 'https://w7.pngwing.com/pngs/622/371/png-transparent-ebay-logo-ebay-sales-amazon-com-coupon-online-shopping-ebay-logo-text-logo-number.png'
  },
  {
    name: 'Gearbest',
    image: 'https://www.gearbest.ma/wp-content/uploads/2023/12/favicon-gearbest-100x100.ico'
  },
  {
    name: 'Romwe',
    image: 'https://play-lh.googleusercontent.com/ioRftbQYaiyt5Igo7TjkP7huMuBzC7T4FVV40HTul3E_RaBy1O5wn5cO0It6BKzHOw'
  },
  {
    name: 'Walmart',
    image: 'https://e7.pngegg.com/pngimages/45/625/png-clipart-yellow-logo-illustration-walmart-logo-grocery-store-retail-asda-stores-limited-icon-walmart-logo-miscellaneous-company-thumbnail.png'
  },
  {
    name: 'Asos',
    image: 'https://e7.pngegg.com/pngimages/510/48/png-clipart-asos-com-fashion-brand-clothing-online-shopping-others-fashion-logo-thumbnail.png'
  },
  {
    name: 'BestBuy',
    image: 'https://cdn.dribbble.com/users/1399110/screenshots/15908208/best_buy_refresh.png'
  },
  {
    name: 'Patagonia',
    image: 'https://i.pinimg.com/736x/5e/5d/f8/5e5df87c306b242fc92186f2dabc892b.jpg'
  },
  {
    name: 'Nike',
    image: 'https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/nike-512.png'
  }
];

export default function PlatformsSection() {
  return (
    <section className="mb-8">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        Platforms
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {trendingItems.map((item, i) => (
          <div
            key={i}
            className="p-4 bg-gradient-to-r  rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105 text-white"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-24 object-contain rounded-lg bg-white p-2"
            />
            <h3 className="mt-4 text-black text-lg font-semibold truncate text-center">
              {item.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
