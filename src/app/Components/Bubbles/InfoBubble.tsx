

export const InfoBubble = ({
    isOpen,
    onClose,
  }: {
    isOpen: boolean;
    onClose: () => void;
  }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Sobre ShopyMart
          </h2>
          <div className="text-sm text-gray-600 mb-4 space-y-3">
            <p>
              ShopMate es una aplicación revolucionaria diseñada para optimizar tu experiencia de compra en línea.
            </p>
            <p>
              Nuestras características principales incluyen:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Búsqueda y comparación de productos en múltiples plataformas</li>
              <li>Asistente de IA personalizado para guiar tus decisiones de compra</li>
              <li>Interfaz moderna y fácil de usar</li>
              <li>Recomendaciones inteligentes basadas en tus preferencias</li>
            </ul>
            <p>
              Con ShopyMart, transformamos tu experiencia de compra haciéndola más eficiente, rápida y completamente personalizada.
            </p>
          </div>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    );
  };