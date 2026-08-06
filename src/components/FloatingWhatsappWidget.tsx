import React, { useState } from 'react';
import { MessageCircle, X, Send, CheckCheck, Bot } from 'lucide-react';

export const FloatingWhatsappWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messagesList, setMessagesList] = useState([
    {
      sender: 'agent',
      text: 'Hello! 👋 Welcome to LuminaCare Medical Concierge. How can our reception team assist you today?',
      time: 'Just now',
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userText = message;
    setMessagesList((prev) => [
      ...prev,
      { sender: 'user', text: userText, time: 'Just now' },
    ]);
    setMessage('');

    // Simulate instant auto-reply
    setTimeout(() => {
      setMessagesList((prev) => [
        ...prev,
        {
          sender: 'agent',
          text: 'Thank you for reaching out! A LuminaCare medical liaison is reviewing your message. You can also book directly online via our Booking button above.',
          time: 'Just now',
        },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {/* Drawer Box */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="p-4 bg-emerald-600 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-emerald-600" />
              </div>
              <div>
                <h4 className="text-sm font-bold font-display">LuminaCare WhatsApp</h4>
                <p className="text-[10px] text-emerald-100">Typically replies in 1 min</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-emerald-700">
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="p-4 h-64 overflow-y-auto space-y-3 bg-slate-50 dark:bg-slate-950 text-xs">
            {messagesList.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-sm rounded-bl-none border border-slate-200/60 dark:border-slate-700/60'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
                <span className="text-[9px] text-slate-400 mt-1 flex items-center">
                  {msg.time}
                  {msg.sender === 'user' && <CheckCheck className="w-3 h-3 ml-1 text-emerald-500" />}
                </span>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 rounded-full text-xs bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
            />
            <button
              type="submit"
              className="p-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Circle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group p-4 rounded-full bg-emerald-500 text-white shadow-xl hover:scale-110 transition-transform flex items-center justify-center"
        title="Chat on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white" />
        <MessageCircle className="w-7 h-7" />
      </button>
    </div>
  );
};
