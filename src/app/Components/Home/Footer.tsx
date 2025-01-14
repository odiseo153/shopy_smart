


export default function Footer() {
    const footerSections = ['Help', 'AliExpress', 'Payment', 'Follow Us'];
  
    return (
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerSections.map((section) => (
              <div key={section}>
                <h3 className="font-bold mb-2">{section}</h3>
                <ul className="space-y-1">
                  {[...Array(3)].map((_, i) => (
                    <li key={i}>
                      <a href="#" className="hover:underline">Link {i + 1}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2023 AliExpress-like. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }
  