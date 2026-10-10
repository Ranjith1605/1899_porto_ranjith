import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { MessageSquare, X, Send, Minimize2, Calendar, Mail, User, Clock, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { EVENTS } from '../context/Settings';

type ChatState = 'IDLE' | 'BOOKING_DATE' | 'BOOKING_TIME' | 'CONFIRM_BOOKING' | 'NAME_INPUT';

interface BookingData {
  date?: string;
  time?: string;
  name?: string;
}

const CommsLink: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "CipherBot Interface Online. Welcome! I can assist you with **Booking a Consultation Call**, exploring **PROJKT 360 DEGREE / CipherPolice**, or providing **Verified Contact Info** for Ranjith Ramadass.", timestamp: Date.now() }
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

  useEffect(() => {
    const onOpen = () => setIsOpen(true);
    window.addEventListener(EVENTS.openComms, onOpen);
    return () => window.removeEventListener(EVENTS.openComms, onOpen);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

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
        if (lowerInput.includes('book') || lowerInput.includes('appointment') || lowerInput.includes('schedule') || lowerInput.includes('call')) {
          setChatState('BOOKING_DATE');
          addMessage('model', "Initiating Discovery Call / Consultation Booking Protocol.\n\nPlease enter your preferred **Date** (e.g., 'Tomorrow', 'Next Monday', or 'Oct 25').");
        } else if (lowerInput.includes('contact') || lowerInput.includes('reach') || lowerInput.includes('email') || lowerInput.includes('phone') || lowerInput.includes('info')) {
          addMessage('model', "Accessing Verified Contact Dossier...\n\n- **Name**: Ranjith Ramadass\n- **Role**: AI Alchemist · Superintelligence Architect\n- **Location**: Hannover, Germany\n- **Email**: `ranjithrv1605@gmail.com`\n- **Phone**: `+49 1551 0174187`\n- **LinkedIn**: [linkedin.com/in/ranjith-ramadass-1591a819a](https://www.linkedin.com/in/ranjith-ramadass-1591a819a)\n- **GitHub**: [github.com/Ranjith1605](https://github.com/Ranjith1605)\n- **Platforms**: [cipherpolice.com](https://cipherpolice.com) · [cipherpolice.de](https://cipherpolice.de)\n\nHow else can I assist your integration needs?");
        } else if (lowerInput.includes('cipher') || lowerInput.includes('security')) {
          addMessage('model', "🛡️ **CipherPolice** is Ranjith's self-developed privacy-first security project.\n\n- Chrome MV3 extension with an LLM leak guard\n- AES-256 vault and header scanner with SSRF protection\n- MCP server and RAG on the EU AI Act\n- Live at: [cipherpolice.com](https://cipherpolice.com) & [cipherpolice.de](https://cipherpolice.de)");
        } else if (lowerInput.includes('360') || lowerInput.includes('projkt')) {
          addMessage('model', "⚡ **PROJKT 360 DEGREE** is Ranjith's research-to-content engine.\n\n- Turns thesis research on human-centred AI adoption into videos and posts\n- Aligned with the EU AI Act");
        } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
          addMessage('model', "Greetings. I am CipherBot, Ranjith's AI Interface. I can help you **Book a Discovery Call**, explore **CipherPolice / PROJKT 360 DEGREE**, or fetch **Direct Contact Info**.");
        } else {
          addMessage('model', "Command received. Please choose an action:\n- **Book Discovery Call**\n- **Contact Info**\n- **About CipherPolice**\n- **About PROJKT 360 DEGREE**");
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

  // Takes the text directly. The quick-action buttons used to call
  // setInput(x) and then handleSend(), but handleSend read `input` from the same
  // render — still the old (usually empty) value — so the buttons did nothing.
  const send = (text: string) => {
    if (!text.trim() || isThinking) return;
    addMessage('user', text);
    setInput('');
    processInput(text);
  };
  const handleSend = () => send(input);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            role="dialog"
            aria-label="CipherBot assistant"
            className="mb-4 w-[min(24rem,calc(100vw-3rem))] h-[min(500px,calc(100dvh-8rem))] bg-black/95 border border-neon-cyan shadow-[0_0_20px_rgba(0,243,255,0.2)] rounded-lg overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-3 flex justify-between items-center border-b border-neon-cyan bg-neon-cyan/10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse bg-hud-green"></div>
                <span className="font-mono text-xs font-bold text-neon-cyan">
                  CIPHER_BOT // ASSISTANT
                </span>
              </div>
              <button type="button" onClick={() => setIsOpen(false)} aria-label="Minimise chat" className="text-gray-400 hover:text-white p-1">
                <Minimize2 size={16} />
              </button>
            </div>

            {/* Messages */}
            <div aria-live="polite" className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwMDAwIiBmaWxsLW9wYWNpdHk9IjAuMiIvPgo8L3N2Zz4=')]">
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
                <button type="button" onClick={() => send('Book Call')} className="flex items-center gap-1 px-3 py-1 bg-gray-900 border border-gray-700 rounded text-xs text-neon-cyan hover:bg-gray-800 whitespace-nowrap">
                  <Calendar size={12} /> Book Call
                </button>
                <button type="button" onClick={() => send('Contact Info')} className="flex items-center gap-1 px-3 py-1 bg-gray-900 border border-gray-700 rounded text-xs text-neon-amber hover:bg-gray-800 whitespace-nowrap">
                  <Mail size={12} /> Contact
                </button>
                <button type="button" onClick={() => send('About CipherPolice')} className="flex items-center gap-1 px-3 py-1 bg-gray-900 border border-gray-700 rounded text-xs text-hud-green hover:bg-gray-800 whitespace-nowrap">
                  🛡️ CipherPolice
                </button>
                <button type="button" onClick={() => send('About PROJKT 360 DEGREE')} className="flex items-center gap-1 px-3 py-1 bg-gray-900 border border-gray-700 rounded text-xs text-neon-cyan hover:bg-gray-800 whitespace-nowrap">
                  ⚡ 360° AI
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
                  if (e.key === 'Enter') handleSend();
                }}
                placeholder="Type your command..."
                aria-label="Message CipherBot"
                className="flex-1 bg-gray-900 text-white text-sm p-2 border border-gray-700 focus:outline-none focus:border-neon-cyan rounded font-mono transition-colors"
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={!input.trim() || isThinking}
                aria-label="Send message"
                data-cursor="SEND"
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
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close CipherBot chat' : 'Open CipherBot chat'}
        data-cursor={isOpen ? 'CLOSE' : 'CHAT'}
        className="bg-black border-2 border-neon-cyan text-neon-cyan p-4 rounded-full shadow-[0_0_15px_rgba(0,243,255,0.3)] hover:bg-neon-cyan hover:text-black transition-all duration-300 group"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} className="group-hover:animate-bounce" />}
      </button>

    </div>
  );
};

export default CommsLink;