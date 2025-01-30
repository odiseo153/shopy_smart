export default function ShopMateDescription() {
  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Título con animación sutil */}
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up">
          ¿Qué es{" "}
          <span className="text-green-600 hover:text-green-700 transition-colors duration-300">
            Shopy Smart
          </span>
          ?
        </h2>

        {/* Descripción con animación */}
        <p className="text-xl text-gray-700 mb-10 animate-fade-in-up delay-100">
          Shopy Smart es tu asistente inteligente para compras en línea. Busca,
          compara y encuentra los mejores productos de múltiples plataformas en
          un solo lugar. Con la ayuda de inteligencia artificial, toma decisiones
          más inteligentes y personalizadas.
        </p>

        {/* Icono decorativo */}
        <div className="flex justify-center mb-8 animate-bounce-slow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>

       
      </div>
    </div>
  );
}