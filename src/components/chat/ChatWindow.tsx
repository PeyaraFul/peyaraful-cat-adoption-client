"use client";

import { useEffect, useRef } from "react";
import { FaRobot, FaUser } from "react-icons/fa";
import ChatInput from "./ChatInput";
import ChatProvider from "./ChatProvider";

interface ChatWindowProps {
  onClose: () => void;
}

export default function ChatWindow({ onClose }: ChatWindowProps) {
  return (
    <ChatProvider>
      {({ messages, isLoading, sendMessage, input, setInput }) => (
        <ChatWindowInner
          onClose={onClose}
          messages={messages}
          isLoading={isLoading}
          sendMessage={sendMessage}
          input={input}
          setInput={setInput}
        />
      )}
    </ChatProvider>
  );
}

function ChatWindowInner({
  onClose,
  messages,
  isLoading,
  sendMessage,
  input,
  setInput,
}: {
  onClose: () => void;
  messages: { role: string; content: string }[];
  isLoading: boolean;
  sendMessage: (text: string) => void;
  input: string;
  setInput: (v: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const displayMessages =
    messages.length === 0
      ? [
          {
            role: "assistant",
            content:
              "Hi! 🐱 I'm Peyaraful's cat assistant. Ask me anything about cat care, adoption, or browse available cats!",
          },
        ]
      : messages;

  return (
    <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 h-[28rem] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-emerald-600 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
            <FaRobot size={16} />
          </div>
          <div>
            <p className="font-semibold text-sm">Peyaraful Assistant</p>
            <p className="text-emerald-100 text-xs">Cat adoption helper</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-emerald-100 hover:text-white"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {displayMessages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "assistant" && (
              <div className="w-7 h-7 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <FaRobot size={12} className="text-emerald-600" />
              </div>
            )}
            <div
              className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-emerald-600 text-white rounded-br-md"
                  : "bg-gray-100 text-gray-800 rounded-bl-md"
              }`}
            >
              {msg.content}
            </div>
            {msg.role === "user" && (
              <div className="w-7 h-7 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <FaUser size={12} className="text-white" />
              </div>
            )}
          </div>
        ))}
        {isLoading &&
          messages.length > 0 &&
          messages[messages.length - 1].role === "user" && (
            <div className="flex gap-2 justify-start">
              <div className="w-7 h-7 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FaRobot size={12} className="text-emerald-600" />
              </div>
              <div className="bg-gray-100 px-3 py-2 rounded-2xl rounded-bl-md">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.15s" }}
                  />
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.3s" }}
                  />
                </div>
              </div>
            </div>
          )}
      </div>

      {/* Input */}
      <ChatInput
        input={input}
        setInput={setInput}
        onSend={sendMessage}
        isLoading={isLoading}
      />
    </div>
  );
}
