import React, { useState } from "react";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import highlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; // Estilo oscuro para el resaltado de código

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  comparaciones: string;
  resultadoFinal: string;
}

const markdownToHtml = async (markdown: string) => {
  const result = await remark()
    .use(gfm) // Soporte para GitHub Flavored Markdown
    .use(html) // Convierte Markdown a HTML
    .use(highlight) // Resaltado de código
    .process(markdown);
  return result.toString();
};

const ComparationModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  comparaciones,
  resultadoFinal,
}) => {
  const [activeTab, setActiveTab] = useState<"comparaciones" | "resultado">("comparaciones");
  const [comparacionesHtml, setComparacionesHtml] = useState("");
  const [resultadoHtml, setResultadoHtml] = useState("");

  React.useEffect(() => {
    if (isOpen) {
      markdownToHtml(comparaciones).then(setComparacionesHtml);
      markdownToHtml(resultadoFinal).then(setResultadoHtml);
    }
  }, [isOpen, comparaciones, resultadoFinal]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 max-h-[90vh] overflow-y-auto">
        {/* Encabezado del modal */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Comparación de Productos
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
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
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`flex-1 p-4 text-sm font-medium transition-colors duration-200 ${
              activeTab === "comparaciones"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("comparaciones")}
          >
            Comparaciones
          </button>
          <button
            className={`flex-1 p-4 text-sm font-medium transition-colors duration-200 ${
              activeTab === "resultado"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("resultado")}
          >
            Resultado Final
          </button>
        </div>

        {/* Contenido del modal */}
        <div className="p-6">
          {activeTab === "comparaciones" && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Comparaciones
              </h3>
              <div
                className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: comparacionesHtml }}
              />
            </div>
          )}
          {activeTab === "resultado" && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Resultado Final
              </h3>
              <div
                className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: resultadoHtml }}
              />
            </div>
          )}
        </div>

        {/* Pie del modal */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComparationModal;