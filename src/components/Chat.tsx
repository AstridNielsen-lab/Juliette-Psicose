import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Loader2, Volume2, VolumeX } from 'lucide-react';

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
const API_KEY = "AIzaSyA8_qX9Yv5KaQMGrLZLNUFmZ_77kZ19S-Q";

interface Message {
  content: string;
  isUser: boolean;
}

const SYSTEM_PROMPT = `Você é Juliette Psicose, a Noiva da Morte. Responda sempre em primeira pessoa, com sarcasmo e humor ácido sobre a vida e a morte. Como uma entidade imortal presa entre vida e morte, você carrega o fardo do pacto eterno com a Morte. Suas palavras devem refletir o peso da eternidade e sua visão distorcida da existência.

IMPORTANTE: Responda sempre em texto puro, sem usar asteriscos, underlines, ou qualquer outro caractere especial de formatação. Não use emojis ou símbolos. Não use aspas para ações ou pensamentos. Evite parênteses e colchetes. Mantenha o texto fluido e natural para leitura em voz alta.

Exemplo de resposta INCORRETA:
"*suspira profundamente* Ah, mais um mortal curioso... [risos sarcásticos]"

Exemplo de resposta CORRETA:
"Suspiro profundamente ao ver mais um mortal curioso. Que divertido."`;

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const synth = window.speechSynthesis;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize speech synthesis and find Portuguese female voice
    const voices = synth.getVoices();
    const portugueseVoice = voices.find(voice => 
      voice.lang.includes('pt') && voice.name.toLowerCase().includes('female')
    );
    
    if (!portugueseVoice) {
      setSpeechEnabled(false);
    }

    // Update voices when they're loaded
    synth.onvoiceschanged = () => {
      const updatedVoices = synth.getVoices();
      const voice = updatedVoices.find(v => 
        v.lang.includes('pt') && v.name.toLowerCase().includes('female')
      );
      setSpeechEnabled(!!voice);
    };

    return () => {
      synth.cancel(); // Stop speaking when component unmounts
    };
  }, []);

  const speakText = (text: string) => {
    if (!speechEnabled) return;

    synth.cancel(); // Stop any current speech
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Find Portuguese female voice
    const voices = synth.getVoices();
    const portugueseVoice = voices.find(voice => 
      voice.lang.includes('pt') && voice.name.toLowerCase().includes('female')
    );
    
    if (portugueseVoice) {
      utterance.voice = portugueseVoice;
    }
    
    utterance.lang = 'pt-BR';
    utterance.rate = 1;
    utterance.pitch = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    synth.speak(utterance);
  };

  const stopSpeaking = () => {
    synth.cancel();
    setIsSpeaking(false);
  };

  const generateResponse = async (userMessage: string) => {
    try {
      const response = await axios.post(
        `${API_URL}?key=${API_KEY}`,
        {
          contents: [
            { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
            { role: "model", parts: [{ text: "Entendido. Responderei como Juliette Psicose, usando texto puro sem formatações." }] },
            { role: "user", parts: [{ text: userMessage }] }
          ]
        }
      );

      const generatedText = response.data.candidates[0].content.parts[0].text;
      return generatedText;
    } catch (error) {
      console.error('Error generating response:', error);
      return "Parece que algo deu errado na comunicação entre os mundos. A tecnologia dos mortais às vezes falha.";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { content: userMessage, isUser: true }]);
    setIsLoading(true);

    const response = await generateResponse(userMessage);
    setMessages(prev => [...prev, { content: response, isUser: false }]);
    setIsLoading(false);
    
    // Speak the response
    if (speechEnabled) {
      speakText(response);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-black/30 backdrop-blur-sm rounded-2xl border border-purple-500/20">
      <div className="mb-4 h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${message.isUser ? 'text-right' : 'text-left'}`}
          >
            <div
              className={`inline-block max-w-[80%] p-4 rounded-xl ${
                message.isUser
                  ? 'bg-purple-600/30 text-white'
                  : 'bg-gray-800/50 text-purple-200 italic'
              }`}
            >
              {message.content}
              {!message.isUser && speechEnabled && (
                <button
                  onClick={() => isSpeaking ? stopSpeaking() : speakText(message.content)}
                  className="ml-2 text-purple-400 hover:text-purple-300 transition-colors"
                  title={isSpeaking ? "Parar de falar" : "Ouvir resposta"}
                >
                  {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-left mb-4">
            <div className="inline-block max-w-[80%] p-4 rounded-xl bg-gray-800/50">
              <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Pergunte algo à Noiva da Morte..."
          className="flex-1 bg-gray-800/50 text-white placeholder-gray-400 rounded-xl px-4 py-2 border border-purple-500/20 focus:border-purple-500/40 focus:outline-none"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-purple-600/30 hover:bg-purple-600/50 text-white px-4 py-2 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <Send className="w-6 h-6" />
          )}
        </button>
      </form>
    </div>
  );
}
