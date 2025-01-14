

const trendingItems = [
    {
      name: 'Smart Home Camera',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=500&auto=format'
    },
    {
      name: 'Fitness Tracker',
      image: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=500&auto=format'
    },
    {
      name: 'Wireless Charger',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIuOuy5Qfjh0gKEE2leh54ns1Or5ewn3D_nA&s'
    },
    {
      name: 'Bluetooth Speaker',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format'
    },
    {
      name: 'Phone Case',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwne0WIhjUj4hOLdTQhOSMPsq5g4Y7PtCDng&s'
    },
    {
      name: 'Desk Lamp',
      image: 'https://m.media-amazon.com/images/I/713iJYS8jDL.jpg'
    }
  ];
  

export default function TrendingNowSection() {
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Trending Now</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {trendingItems.map((item, i) => (
            <div
              key={i}
              className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
              <h3 className="font-medium text-sm truncate">{item.name}</h3>
            </div>
          ))}
        </div>
      </section>
    );
  }
  