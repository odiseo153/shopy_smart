import { faXmark, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";


export const ChatBubble = ({
    isOpen,
    onClose,
  }: {
    isOpen: boolean;
    onClose: () => void;
  }) => {
    const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
      { text: "¡Hola! ¿En qué puedo ayudarte hoy?", isUser: false }
    ]);
    const [inputMessage, setInputMessage] = useState("");
  
    if (!isOpen) return null;
  
    const handleSendMessage = async () => {
      if (!inputMessage.trim()) return;
  
      // Add user message
      setMessages(prev => [...prev, { text: inputMessage, isUser: true }]);
      
      // TODO: Integrate with your chatbot API
      // For now, we'll just echo a simple response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: "Gracias por tu mensaje. En este momento estamos trabajando en la integración del chatbot.", 
          isUser: false 
        }]);
      }, 500);
  
      setInputMessage("");
    };
  
    return (
      <div className="fixed bottom-20 right-4 w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col">
        {/* Header */}
        <div className="bg-blue-600 p-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-white font-semibold">Chat de Ayuda</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
  
        {/* Messages Container */}
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.isUser
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
  
        {/* Input Area */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Escribe tu mensaje..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      </div>
    );
  };