'use client'


import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Input } from "./Input";
import consultas from '../Firebase/Consultas_Firebase';


export const NewsletterBubble = () => {
  const [isVisible, setIsVisible] = useState(false); 

  const toggleModal = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div id="newsletter" className="fixed bottom-4 right-4 z-50">
      <div
        id="newsletter-icon"
        className="bg-blue-600 p-3 w-12 h-12 shadow-lg rounded-full inline-flex items-center justify-center cursor-pointer transition-transform transform hover:scale-110"
        onClick={toggleModal}
      >
        <FontAwesomeIcon icon={faEnvelope} className="text-white" />
      </div>

      <NewsletterModal isOpen={isVisible} onClose={toggleModal} />
    </div>
  );
};

const NewsletterModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Validar y agregar el correo con fecha actual
  const agregarCorreo = async () => {
    setMessage(null);
    setError(null);

  
  
    try {
      const emailExist = await consultas.getByEmail(email); 
      if (emailExist) {
        setError("Parece que ya estás registrado en nuestra newsletter.");
        return;
      }  
  
      const exito = await consultas.add(email);
      if (exito) {
        setMessage("¡Te has registrado exitosamente en nuestra newsletter!");
        setEmail(""); // Limpia el campo de entrada
      } else {
        setError("Ocurrió un problema al registrar tu correo. Intenta de nuevo.");
      }
    } catch (err) {
      setError("Hubo un error al procesar tu solicitud. Intenta más tarde.");
      console.error("Error al agregar correo:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Suscríbete a nuestro Newsletter
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Mantente actualizado con las últimas noticias y ofertas exclusivas.
        </p>
        <div className="mb-4">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu correo electrónico"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
        </div>
        <div className="flex justify-end">
          <button
            onClick={agregarCorreo}
            className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition"
          >
            Suscribirme
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 rounded-lg px-4 py-2 ml-2 hover:bg-gray-400 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterBubble;
