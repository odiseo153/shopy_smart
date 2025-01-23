import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  comparaciones: string;
  resultadoFinal: string;
}

const ComparationModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  comparaciones,
  resultadoFinal,
}) => {
  const [activeTab, setActiveTab] = useState<"comparaciones" | "resultado">("comparaciones");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 max-h-[90vh] overflow-y-auto">
        {/* Encabezado del modal */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Comparación de Productos</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Pestañas */}
        <div className="flex border-b">
          <button
            className={`flex-1 p-4 ${
              activeTab === "comparaciones"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setActiveTab("comparaciones")}
          >
            Comparaciones
          </button>
          <button
            className={`flex-1 p-4 ${
              activeTab === "resultado"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setActiveTab("resultado")}
          >
            Resultado Final
          </button>
        </div>

        {/* Contenido del modal */}
        <div className="p-4">
          {activeTab === "comparaciones" && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Comparaciones</h3>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                className="prose"
              >
                {comparaciones}
              </ReactMarkdown>
            </div>
          )}

          {activeTab === "resultado" && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Resultado Final</h3>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                className="prose"
              >
                {resultadoFinal}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* Pie del modal */}
        <div className="p-4 border-t">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComparationModal;