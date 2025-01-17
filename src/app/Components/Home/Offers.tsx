export default function Offers() {
    const products = [
      {
        section: "SuperOfertas",
        timer: "12:35:22",
        items: [
          {
            image: "https://th.bing.com/th/id/OIP._RyYPm3BwlRgLvDb4El5uAHaHa?w=208&h=208&c=7&r=0&o=5&pid=1.7",
            alt: "Gaming Console",
            discount: "-90%",
            name: "Consola de videojuegos 4K",
            originalPrice: "DOP984.88",
            savings: "DOP7,804.94",
            salePrice: "DOP96.04"
          },
          {
            image: "https://th.bing.com/th/id/OIP.moK_VYTUAoNBMCwfK6cmXgHaHk?w=185&h=189&c=7&r=0&o=5&pid=1.7",
            alt: "Hair Extensions",
            discount: "-93%",
            name: "Mayfair-extensiones de cabello brasileño",
            originalPrice: "DOP3,626.85",
            savings: "DOP7,804.94",
            salePrice: "DOP249.58"
          }
        ]
      },
      {
        section: "Big Save",
        description: "+500 Marcas",
        items: [
          {
            image: "https://m.media-amazon.com/images/I/81JEFu4GvYL._AC_SS450_.jpg",
            alt: "Smart Watch",
            discount: "-93%",

            name: "Huawei-reloj inteligente 4 Pro",
            originalPrice: "DOP8,854.64",
            salePrice: "DOP1,049.70",
            savings: "DOP7,804.94"
          },
          {
            image: "https://th.bing.com/th/id/OIP.pRMvPiDMicm043_2VJWjagHaHa?w=213&h=213&c=7&r=0&o=5&pid=1.7",
            alt: "Military Jacket",
            discount: "-93%",
            name: "Maden Chaqueta M65 Militar para Hombres",
            originalPrice: "DOP7,531.21",
            salePrice: "DOP2,042.93",
            savings: "DOP5,488.28"
          }
        ]
      }
    ];

    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Ofertas de hoy</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {products.map((productSection) => (
            <section key={productSection.section} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{productSection.section}</h2>
                {productSection.timer && (
                  <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full text-sm">
                    <span>⏰</span>
                    Acaba en: {productSection.timer}
                  </div>
                )}
                {productSection.description && (
                  <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full text-sm">
                    <span>🏷️</span>
                    {productSection.description}
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {productSection.items.map((item) => (
                  <div key={item.name} className="relative border border-gray-200 rounded-lg p-4 transition-transform hover:-translate-y-1 duration-200">
                    {item.discount && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                        {item.discount}
                      </div>
                    )}
                    <img 
                      src={item.image}
                      alt={item.alt} 
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <h3 className="text-sm font-medium mb-2 line-clamp-2">
                      {item.name}
                    </h3>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500 line-through">{item.originalPrice}</p>
                      <p className="text-lg font-bold">{item.salePrice}</p>
                      {item.savings && (
                        <p className="text-sm text-red-500">Ahorras {item.savings}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    )
  }