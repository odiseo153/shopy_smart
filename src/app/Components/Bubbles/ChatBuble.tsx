import { faXmark, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      <Card className="fixed bottom-20 right-4 w-96 h-[500px] shadow-xl flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
          <CardTitle className="text-lg font-semibold">Chat de Ayuda</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
            <span className="sr-only">Cerrar chat</span>
          </Button>
        </CardHeader>
        <CardContent className="p-4 flex-1 overflow-hidden">
          <ScrollArea className="h-full w-full pr-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none dark:bg-gray-700 dark:text-gray-100'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Escribe tu mensaje..."
            />
            <Button onClick={handleSendMessage} >
              <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  };