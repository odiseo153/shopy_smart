

const categories = [
    {
      name: 'Electronics',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&auto=format',
    },
    {
      name: 'Fashion', 
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&auto=format',
    },
    {
      name: 'Home & Garden',
      image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&auto=format', 
    },
    {
      name: 'Sports',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&auto=format',
    },
    {
      name: 'Beauty',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format',
    },
    {
      name: 'Toys',
      image: 'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?w=500&auto=format',
    }
  ];


export default function CategoriesSection() {
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className="p-4 text-center bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <img
                src={category.image}
                alt={category.name}
                className="mx-auto mb-2 w-20 h-20 object-cover rounded-full"
              />
              <p className="font-medium">{category.name}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

