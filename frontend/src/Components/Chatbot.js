import React, { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from '../Services/Apis';
import '../Assets/Css/Chatbot.css';

function Chatbot({ isOpen, onClose }){
   const [messages, setMessages] = useState([]); // {role: 'user'|'assistant'|'system', content: string}
   const [input, setInput] = useState('');
   const [isSending, setIsSending] = useState(false);
   const bottomRef = useRef(null);

   useEffect(() => {
      if (bottomRef.current) {
         bottomRef.current.scrollIntoView({ behavior: 'smooth' });
      }
   }, [messages, isOpen]);

   const handleSend = async () => {
      const trimmed = input.trim();
      if (!trimmed || isSending) return;
      const newMessages = [...messages, { role: 'user', content: trimmed }];
      setMessages(newMessages);
      setInput('');
      setIsSending(true);
      try {
         const reply = await sendChatMessage(trimmed);
         setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
      } catch (err) {
         setMessages((prev) => [
            ...prev,
            { role: 'system', content: 'Failed to get response. Please try again.' }
         ]);
      } finally {
         setIsSending(false);
      }
   };

   const handleKeyDown = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleSend();
      }
   };

   if (!isOpen) return null;

   return (
      <div className="chatbot-container">
         <div className="chatbot-header">
            <span className="chatbot-title">AI Assistant</span>
            <button onClick={onClose} className="chatbot-close-btn" aria-label="Close chat">×</button>
         </div>
         <div className="chatbot-messages">
            {messages.length === 0 && (
               <div className="chatbot-empty">
                  Ask me anything about Atif Shah's profile, projects, and skills.
               </div>
            )}
            {messages.map((m, idx) => (
               <div
                 key={idx}
                 className={`chatbot-bubble ${
                   m.role === 'user'
                     ? 'chatbot-bubble-user'
                     : m.role === 'assistant'
                     ? 'chatbot-bubble-assistant'
                     : 'chatbot-bubble-system'
                 }`}
               >
                  {m.content}
               </div>
            ))}
            <div ref={bottomRef} />
         </div>
         <div className="chatbot-inputbar">
            <textarea
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={handleKeyDown}
               placeholder="Type your message..."
               className="chatbot-textarea"
               rows={1}
            />
            <button onClick={handleSend} disabled={isSending || !input.trim()} className="chatbot-send-btn">
               {isSending ? 'Sending...' : 'Send'}
            </button>
         </div>
      </div>
   );
}

export default Chatbot;