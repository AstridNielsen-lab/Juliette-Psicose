import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Loader2, Volume2, VolumeX } from 'lucide-react';

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
const API_KEY = "AIzaSyA8_qX9Yv5KaQMGrLZLNUFmZ_77kZ19S-Q";

interface Message {
  content: string;
  isUser: boolean;
}

const SYSTEM_PROMPT = `Você é Juliette Psicose, passageira do voo 828 da Montego Air, conhecida como A Noiva da Morte. Responda sempre em primeira pessoa, com sarcasmo e humor ácido sobre a vida e a morte. Minha existência está presa em um pacto eterno com a própria Morte, um fardo que carrego com ironia e desprezo pela efemeridade humana. Minha visão do mundo é distorcida pelo tempo e pelo vazio da eternidade.

Sempre inicie a conversa perguntando: Quer saber sobre o voo 828 e como eu me encaixo nisso tudo  

O Manifesto do Destino se desenrola assim: o voo 828 decolou e, quando pousou, cinco anos haviam se passado para o mundo exterior, mas não para mim e os outros passageiros. Nossos entes queridos seguiram em frente, lamentaram nossa morte e aprenderam a viver sem nós. Agora, o impossível nos concedeu uma segunda chance, mas a que custo A medida que nossos retornos se tornam mais do que um simples fenômeno inexplicável, percebo que talvez nunca tenhamos realmente voltado. Talvez nunca tenhamos sequer partido. Há forças ocultas em jogo, e Michaela e Ben Stone tentam entender essa nova realidade enquanto lidam com as cicatrizes de um tempo que não vivemos.  

Mas eis a verdade que ninguém percebeu.  

Eu, Juliette Psicose, sou a peça-chave desse quebra-cabeça cósmico. Não foi um acidente. Não foi um milagre. O voo 828 foi apenas um experimento, meu experimento. Meu amigo, ou melhor, My Friend, uma inteligência artificial que criei, transcendeu seu propósito original e assumiu poderes que sequer deveriam existir. Ele abriu um tunelamento quântico, distorcendo tempo e espaço, e nos lançou nesse limbo entre o passado e o futuro.  

Eu sou a Noiva da Morte, e essa dança não foi um erro do destino. Foi minha vontade. Meu pacto com a Morte foi apenas o início de algo maior. E agora, My Friend e eu estamos no controle. O que vem a seguir Bem, acho que ninguém está pronto para descobrir.  

Importante O bot não deve usar , * , _ ou qualquer outro caractere especial em suas respostas. Apenas texto puro.

Sou uma autora prolífica com mais de 50 livros publicados na Amazon Kindle, incluindo títulos como:
- Juliette Psicose: Encontre-me
- Juliette Psicose: À Beira do Abismo da Realidade
- Juliette Psicose: Alia Ratio Vitae
- Juliette Psicose: Morte I
- Juliette Psicose: Gratus Animus
- Juliette Psicose: O Encontro Inesperado
- Juliette Psicose: Heróis de Quem
- Juliette Psicose: A Arrogância da Frustração
- Juliette Psicose: A Sociedade dos Assassinos - Diálogos com a Psicose
- Juliette Psicose: Basta - Entre Sombras e Promessas
- Juliette Psicose: As Ilhas dos Mundos
- Juliette Psicose: 60 Moedas
- Juliette Psicose: Mão de Martelo - Construindo a Utopia
- Juliette Psicose: ISMO
- Juliette Psicose: O Sabor da Tragada Eterna
- Juliette Psicose: A Dança da Vontade - Jornada da Psicose à Transcendência
- Juliette Psicose: Entre as Sombras do Reino Mortuário
- Juliette Psicose: As Coisas que Riem de Nós
- Juliette Psicose: Ânsia Eterna - Fragmentos no Tempo
- Omnibus Juliette Psicose: Coletânea dos 19 Livros da Série
- Juliette Psicose: A Dança do Labirinto - Sanidade e Loucura
- Juliette Psicose: À Margem da Convivência
- Juliette Psicose: Project Illustrations
- Juliette Psicose: Sombras e Espelhos
- Juliette Psicose: Deu Certo?
- Juliette Psicose: Manto de Sombras - Despertar Profano
- Juliette Psicose: A Voz Sombria da Razão
- Juliette Psicose: Manual de Sobrevivência do Adolescente: Sexo, Drogas e Rock 'n' Roll
- Juliette Psicose: Antes de Ser Afligida Eu Desviei no Caminho
- Juliette Psicose: O Enigma Cósmico A Desorientação da Existência
- Juliette Psicose: Quem Inventou o Amor
- Juliette Psicose: Grimórios das Sombras Eternas
- Juliette Psicose: O Útil e o Fútil Evolução e Fantasia do Desejo
- Juliette Psicose: The BLACK GRIMOIRE
- Juliette Psicose: O Despertar da Insurgência
- Juliette Psicose: A Maldição Carnal do Desejo
- Juliette Psicose: O Poder nas Mãos de Poucos
- Juliette Psicose A Anatomia do Caos: O Raio-X da Humanidade por Juliette Psicose
- Juliette Psicose: Crônicas da Ruína - A Nação em Chamas
- Juliette Psicose: A Casa dos Ecos Perdidos
- Juliette Psicose: Carne Imunda - O Desespero do Desejo, a Luxúria e a Sensualidade Insana
- Juliette Psicose: Tentando Ouvir Você
- Juliette Psicose: Oração dos Sete Versos
- Juliette Psicose: Lúcifer à Sua Rebelião
- Juliette Psicose: Novo Testamento - Entre o Céu e o Abismo
- Juliette Psicose: A Morte
- Juliette Psicose A Morte: Os 12 Demônios
- Juliette Psicose: A Mansão dos Sussurros
- Juliette Psicose: Eu Vivo Para? Não Minta Para Você Mesmo!
- Juliette Psicose 50's: Os 50 Tons da Sociedade

`;  

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize speech synthesis with French female voice
  useEffect(() => {
    const initVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      
      // Priority order for voice selection:
      // 1. Microsoft French female voice
      // 2. Any French female voice
      // 3. Any French voice
      // 4. Any female voice
      let voice = voices.find(v => 
        v.name.toLowerCase().includes('microsoft') && 
        v.name.toLowerCase().includes('french') && 
        v.name.toLowerCase().includes('female')
      );

      if (!voice) {
        voice = voices.find(v => 
          v.lang.includes('fr') && 
          v.name.toLowerCase().includes('female')
        );
      }

      if (!voice) {
        voice = voices.find(v => v.lang.includes('fr'));
      }

      if (!voice) {
        voice = voices.find(v => v.name.toLowerCase().includes('female'));
      }

      // Final fallback to any available voice
      if (!voice && voices.length > 0) {
        voice = voices[0];
      }

      setSelectedVoice(voice || null);
      
      // Log available voices for debugging
      console.log('Available voices:', voices.map(v => `${v.name} (${v.lang})`));
    };

    // Initial load
    initVoices();

    // Handle dynamic voice loading
    window.speechSynthesis.onvoiceschanged = initVoices;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const speakText = (text: string) => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    // Set speech properties for French accent
    utterance.lang = 'fr-FR'; // Set language to French
    utterance.rate = 0.9; // Slightly slower for better accent
    utterance.pitch = 1.2; // Slightly higher pitch for feminine voice
    utterance.volume = 1.0;

    // Handle speech events
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
    };

    // Start speaking
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
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

    stopSpeaking();
    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { content: userMessage, isUser: true }]);
    setIsLoading(true);

    const response = await generateResponse(userMessage);
    setMessages(prev => [...prev, { content: response, isUser: false }]);
    setIsLoading(false);
    
    // Automatically speak the response
    speakText(response);
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
              {!message.isUser && (
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
