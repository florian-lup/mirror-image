'use client';

import { useState, useEffect, useCallback } from 'react';
import { HiSpeakerWave } from "react-icons/hi2";
import { PiPaperPlaneFill, PiMicrophoneFill, PiStopCircleBold } from "react-icons/pi";
import * as Tooltip from '@radix-ui/react-tooltip';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onStop: () => void;
  isLoading: boolean;
}

// TypeScript declarations for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
  }
}

export default function ChatInput({ onSendMessage, onStop, isLoading }: ChatInputProps) {
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
          setInputMessage(transcript);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        setRecognition(recognition);
        setIsSupported(true);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;
    
    onSendMessage(inputMessage);
    setInputMessage('');
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const toggleListening = useCallback(() => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  }, [recognition, isListening]);

  return (
    <div className="px-4 py-4 bg-[#1E1F1F]">
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-2 bg-[#343541] rounded-lg px-3 py-2">
            <Tooltip.Provider delayDuration={0}>
              <Tooltip.Root delayDuration={0}>
                <Tooltip.Trigger asChild>
                  <button type="button" disabled={isLoading}>
                    <HiSpeakerWave className={`text-xl ${isLoading ? 'text-gray-600' : 'text-gray-400 hover:text-gray-300'} cursor-pointer`} />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="bg-white text-gray-900 px-3 py-1.5 rounded-md text-sm"
                    sideOffset={5}
                  >
                    Voice output coming soon
                    <Tooltip.Arrow className="fill-white" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={isLoading ? "Waiting for response..." : "Start a conversation..."}
              disabled={isLoading}
              className="flex-1 bg-transparent outline-none text-[15px] text-gray-200 placeholder-gray-400 disabled:text-gray-500 disabled:placeholder-gray-600"
            />
            <button 
              type="button" 
              className="flex items-center justify-center" 
              onClick={isLoading ? onStop : handleSubmit}
              disabled={!isLoading && !inputMessage.trim()}
            >
              {isLoading ? (
                <PiStopCircleBold className="text-red-500 hover:text-red-400 text-xl cursor-pointer" />
              ) : (
                <PiPaperPlaneFill className={`text-xl ${!inputMessage.trim() ? 'text-gray-600' : 'text-gray-400 hover:text-gray-300'} cursor-pointer`} />
              )}
            </button>
            <Tooltip.Provider delayDuration={0}>
              <Tooltip.Root delayDuration={0}>
                <Tooltip.Trigger asChild>
                  <button 
                    type="button" 
                    className="flex items-center justify-center"
                    disabled={isLoading || !isSupported}
                    onClick={toggleListening}
                  >
                    <PiMicrophoneFill className={`text-xl ${
                      isLoading || !isSupported
                        ? 'text-gray-600' 
                        : isListening
                          ? 'text-red-500 hover:text-red-400'
                          : 'text-gray-400 hover:text-gray-300'
                    } cursor-pointer`} />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="bg-white text-gray-900 px-3 py-1.5 rounded-md text-sm"
                    sideOffset={5}
                  >
                    {!isSupported 
                      ? "Your browser doesn't support voice input"
                      : isListening 
                        ? "Click to stop listening" 
                        : "Click to start voice input"}
                    <Tooltip.Arrow className="fill-white" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          </div>
        </form>
      </div>
    </div>
  );
} 