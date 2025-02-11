import {  useState } from "react";
import { ChatBubble } from "./ChatBuble";
import { InfoBubble } from "./InfoBubble";
import { NewsletterModal } from "./NewsLetterModal";
import { Button } from "@/components/ui/button";
import { Mail, Info, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";

export const Bubble = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeModal, setActiveModal] = useState<'newsletter' | 'info' | 'chat' | null>(null);

    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
      if (!isExpanded) {
        setActiveModal(null);
      }
    };

    const openModal = (modalType: 'newsletter' | 'info' | 'chat') => {
      setActiveModal(modalType);
      setIsExpanded(false);
    };

    const closeModal = () => {
      setActiveModal(null);
    };

    return (
      <div id="bubble-container" className="fixed bottom-4  right-4 z-50 flex flex-col items-center">
        <div className={`flex  flex-col items-center gap-2 transition-all duration-300 ${isExpanded ? 'mb-4' : ''}`}>
          <div className="flex gap-2">
            {isExpanded && (
              <>
                <Button
                  onClick={() => openModal('newsletter')}
                  className="rounded-full w-12 h-12 shadow-md hover:scale-110 transition-transform p-0 flex items-center justify-center bg-secondary text-secondary-foreground"
                  variant="secondary"
                >
                  <Mail className="h-5 w-5 " />
                </Button>
                <Button
                  onClick={() => openModal('info')}
                  className="rounded-full w-12 h-12 shadow-md hover:scale-110 transition-transform p-0 flex items-center justify-center bg-secondary text-secondary-foreground"
                  variant="secondary"
                >
                  <Info className="h-5 w-5 " />
                </Button>
                <Button
                  onClick={() => openModal('chat')}
                  className="rounded-full w-12 h-12 shadow-md hover:scale-110 transition-transform p-0 flex items-center justify-center bg-secondary text-secondary-foreground"
                  variant="secondary"
                >
                  <MessageSquare className="h-5 w-5 " />
                </Button>
              </>
            )}
          </div>
          <Button
            onClick={toggleExpand}
            className="rounded-full w-20 h-20 bg-gray-900 text-white shadow-xl hover:scale-110 transition-transform p-0 flex items-center justify-center"
          >
            {isExpanded ? <ChevronDown className="h-12 w-12 text-white" /> : <ChevronUp className="h-12 w-12  text-white" />}
          </Button>
        </div>

        <div className="flex flex-col items-center">
          <NewsletterModal isOpen={activeModal === 'newsletter'} onClose={closeModal} />
          <InfoBubble isOpen={activeModal === 'info'} onClose={closeModal} />
          <ChatBubble isOpen={activeModal === 'chat'} onClose={closeModal} />
        </div>
      </div>
    );
  };