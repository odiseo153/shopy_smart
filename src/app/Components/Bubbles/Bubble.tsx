import { faEnvelope, faInfoCircle, faComments, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { ChatBubble } from "./ChatBuble";
import { InfoBubble } from "./InfoBubble";
import { NewsletterModal } from "./NewsLetterModal";



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
      <div id="bubble-container" className="fixed bottom-4 right-4 z-50">
        <div className={`flex flex-col items-end gap-2 transition-all duration-300 ${isExpanded ? 'mb-4' : ''}`}>
          {isExpanded && (
            <>
              <div
                onClick={() => openModal('newsletter')}
                className="bg-blue-600 p-3 w-12 h-12 shadow-lg rounded-full inline-flex items-center justify-center cursor-pointer transition-transform transform hover:scale-110"
              >
                <FontAwesomeIcon icon={faEnvelope} className="text-white" />
              </div>
              <div
                onClick={() => openModal('info')}
                className="bg-blue-600 p-3 w-12 h-12 shadow-lg rounded-full inline-flex items-center justify-center cursor-pointer transition-transform transform hover:scale-110"
              >
                <FontAwesomeIcon icon={faInfoCircle} className="text-white" />
              </div>
              <div
                onClick={() => openModal('chat')}
                className="bg-blue-600 p-3 w-12 h-12 shadow-lg rounded-full inline-flex items-center justify-center cursor-pointer transition-transform transform hover:scale-110"
              >
                <FontAwesomeIcon icon={faComments} className="text-white" />
              </div>
            </>
          )}
          <div
            onClick={toggleExpand}
            className="bg-blue-600 p-3 w-12 h-12 shadow-lg rounded-full inline-flex items-center justify-center cursor-pointer transition-transform transform hover:scale-110"
          >
            <FontAwesomeIcon 
              icon={isExpanded ? faChevronDown : faChevronUp} 
              className="text-white"
            />
          </div>
        </div>
  
        <NewsletterModal isOpen={activeModal === 'newsletter'} onClose={closeModal} />
        <InfoBubble isOpen={activeModal === 'info'} onClose={closeModal} />
        <ChatBubble isOpen={activeModal === 'chat'} onClose={closeModal} />
      </div>
    );
  };