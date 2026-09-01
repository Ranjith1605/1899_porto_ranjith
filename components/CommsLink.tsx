import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { MessageSquare, X, Send, Minimize2, Calendar, Mail, User, Clock, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { PROFILE } from '../constants';

type ChatState = 'IDLE' | 'BOOKING_DATE' | 'BOOKING_TIME' | 'CONFIRM_BOOKING' | 'NAME_INPUT';

interface BookingData {
  date?: string;
  time?: string;
  name?: string;
}

const CommsLink: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "CipherBot Online. I can assist you with **Appointment Booking** or providing **Contact Information**. How may I help?", timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [chatState, setChatState] = useState<ChatState>('IDLE');
  const [bookingData, setBookingData] = useState<BookingData>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (role: 'user' | 'model', text: string) => {
    setMessages(prev => [...prev, { role, text, timestamp: Date.now() }]);
  };

  const processInput = async (userInput: string) => {
    setIsThinking(true);

    // Simulate processing delay for realism
    await new Promise(resolve => setTimeout(resolve, 600));

    const lowerInput = userInput.toLowerCase();

    // Global Cancel
    if (lowerInput === 'cancel' || lowerInput === 'reset') {
      setChatState('IDLE');
      setBookingData({});
      addMessage('model', "Operation cancelled. Returning to main menu.\n\nOptions:\n- **Book Appointment**\n- **Contact Info**");
      setIsThinking(false);
      return;
    }

    switch (chatState) {
      case 'IDLE':
        if (lowerInput.includes('book') || lowerInput.includes('appointment') || lowerInput.includes('schedule')) {
          setChatState('BOOKING_DATE');
          addMessage('model', "Initiating Appointment Protocol.\n\nPlease enter your preferred **Date** (e.g., 'Tomorrow', 'Next Monday', or 'Oct 25').");
        } else if (lowerInput.includes('contact') || lowerInput.includes('reach') || lowerInput.includes('email') || lowerInput.includes('phone')) {
          addMessage('model', `Accessing Contact Database...\n\n**Email**: ${PROFILE.email}\n**LinkedIn**: ${PROFILE.linkedin}\n**GitHub**: ${PROFILE.github}\n**Location**: ${PROFILE.location}\n\n${PROFILE.availability}. Is there anything else?`);
        } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
          addMessage('model', "Greetings. I am CipherBot. I can help you **Book an Appointment** or find **Contact Info**.");
        } else {
          addMessage('model', "Command not recognized. Please specify:\n- **Book Appointment**\n- **Contact Info**");
        }
        break;

      case 'BOOKING_DATE':
        if (userInput.length < 3) {
          addMessage('model', "Error: Date ambiguous. Please enter a valid date (e.g., 'Monday', '12th Oct').");
        } else {
          setBookingData(prev => ({ ...prev, date: userInput }));
          setChatState('BOOKING_TIME');
          addMessage('model', `Date confirmed: ${userInput}.\n\nAvailable Time Slots:\n- 10:00 AM\n- 02:00 PM\n- 04:00 PM\n\nPlease type a **Time**.`);
        }
        break;

      case 'BOOKING_TIME':
        if (lowerInput.includes('10') || lowerInput.includes('2') || lowerInput.includes('4') || lowerInput.includes('am') || lowerInput.includes('pm')) {
          setBookingData(prev => ({ ...prev, time: userInput }));
          setChatState('NAME_INPUT');
          addMessage('model', `Time slot selected: ${userInput}.\n\nPlease enter your **Name** for the reservation.`);
        } else {
          // Loop clause for invalid time
          addMessage('model', "Invalid Time Slot. Please choose from available slots:\n- 10:00 AM\n- 02:00 PM\n- 04:00 PM");
        }
        break;

      case 'NAME_INPUT':
        setBookingData(prev => ({ ...prev, name: userInput }));
        setChatState('CONFIRM_BOOKING');
        addMessage('model', `Please confirm details:\n\n**Name**: ${userInput}\n**Date**: ${bookingData.date}\n**Time**: ${bookingData.time}\n\nType **Yes** to confirm or **No** to restart.`);
        break;

      case 'CONFIRM_BOOKING':
        if (lowerInput === 'yes' || lowerInput === 'y' || lowerInput === 'confirm') {
          addMessage('model', "Appointment Confirmed! ✅\n\nA calendar invite has been transmitted to your neural link (simulated). Thank you.");
          setChatState('IDLE');
          setBookingData({});
        } else {
          addMessage('model', "Booking aborted. Returning to start.");
          setChatState('IDLE');
          setBookingData({});
        }
        break;
    }

    setIsThinking(false);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input;
    addMessage('user', userMsg);
    setInput('');
    processInput(userMsg);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-80 md:w-96 bg-black/95 border border-neon-cyan shadow-[0_0_20px_rgba(0,243,255,0.2)] rounded-lg overflow-hidden flex flex-col"
            style={{ height: '500px' }}
          >
            {/* Header */}
            <div className="p-3 flex justify-between items-center border-b border-neon-cyan bg-neon-cyan/10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse bg-matrix-green"></div>
                <span className="font-mono text-xs font-bold text-neon-cyan">
                  CIPHER_BOT // ASSISTANT
                </span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                <Minimize2 size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwMDAwIiBmaWxsLW9wYWNpdHk9IjAuMiIvPgo8L3N2Zz4=')]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 text-sm rounded ${msg.role === 'user'
                      ? 'bg-neon-cyan/10 border border-neon-cyan/50 text-white'
                      : 'bg-gray-800 border border-gray-700 text-gray-300'
                    }`}>
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                </div>
              ))}
              {isThinking && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 border border-gray-700 text-neon-cyan p-2 rounded text-xs animate-pulse">
                    PROCESSING...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions (Visible when IDLE) */}
            {chatState === 'IDLE' && !isThinking && (
              <div className="p-2 bg-black border-t border-gray-800 flex gap-2 overflow-x-auto">
                <button onClick={() => { setInput('Book Appointment'); handleSend(); }} className="flex items-center gap-1 px-3 py-1 bg-gray-900 border border-gray-700 rounded text-xs text-neon-cyan hover:bg-gray-800 whitespace-nowrap">
                  <Calendar size={12} /> Book Slot
                </button>
                <button onClick={() => { setInput('Contact Info'); handleSend(); }} className="flex items-center gap-1 px-3 py-1 bg-gray-900 border border-gray-700 rounded text-xs text-neon-cyan hover:bg-gray-800 whitespace-nowrap">
                  <Mail size={12} /> Contact
                </button>
              </div>
            )}

            {/* Input */}
            <div className="p-3 bg-black border-t border-gray-800 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    // If the user presses Enter and the input matches a quick action, we want to trigger it.
                    // But handleSend uses the current 'input' state which is correct.
                    handleSend();
                  }
                }}
                placeholder="Type your command..."
                className="flex-1 bg-gray-900 text-white text-sm p-2 border border-gray-700 focus:outline-none focus:border-neon-cyan rounded font-mono transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isThinking}
                className="p-2 rounded bg-neon-cyan text-black hover:bg-white transition-colors disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black border-2 border-neon-cyan text-neon-cyan p-4 rounded-full shadow-[0_0_15px_rgba(0,243,255,0.3)] hover:bg-neon-cyan hover:text-black transition-all duration-300 group"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} className="group-hover:animate-bounce" />}
      </button>

    </div>
  );
};

export default CommsLink;