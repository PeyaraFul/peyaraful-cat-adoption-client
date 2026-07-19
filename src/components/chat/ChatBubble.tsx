"use client";

import { useState } from "react";
import { FaComments, FaTimes } from "react-icons/fa";
import ChatWindow from "./ChatWindow";

export default function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 hover:scale-110 ${
          isOpen ? "bg-red-500 hover:bg-red-600" : "bg-emerald-600 hover:bg-emerald-700"
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <FaTimes size={20} /> : <FaComments size={22} />}
      </button>
    </>
  );
}
