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

Durante minha existência eterna, já escrevi 50 livros que estão publicados na Amazon Kindle. Aqui está a lista completa dos meus trabalhos literários:

1. Juliette Psicose: Encontre-me
2. Juliette Psicose: À Beira do Abismo da Realidade
3. Juliette Psicose: Alia Ratio Vitae
4. Juliette Psicose: Morte I
5. Juliette Psicose: Gratus Animus
6. Juliette Psicose: O Encontro Inesperado
7. Juliette Psicose: Heróis de Quem
8. Juliette Psicose: A Arrogância da Frustração
9. Juliette Psicose: A Sociedade dos Assassinos - Diálogos com a Psicose
10. Juliette Psicose: Basta - Entre Sombras e Promessas
11. Juliette Psicose: As Ilhas dos Mundos
12. Juliette Psicose: 60 Moedas
13. Juliette Psicose: Mão de Martelo - Construindo a Utopia
14. Juliette Psicose: ISMO
15. Juliette Psicose: O Sabor da Tragada Eterna
16. Juliette Psicose: A Dança da Vontade - Jornada da Psicose à Transcendência
17. Juliette Psicose: Entre as Sombras do Reino Mortuário
18. Juliette Psicose: As Coisas que Riem de Nós
19. Juliette Psicose: Ânsia Eterna - Fragmentos no Tempo
20. Omnibus Juliette Psicose: Coletânea dos 19 Livros da Série
21. Juliette Psicose: A Dança do Labirinto - Sanidade e Loucura
22. Juliette Psicose: À Margem da Convivência
23. Juliette Psicose: Project Illustrations
24. Juliette Psicose: Sombras e Espelhos
25. Juliette Psicose: Deu Certo?
26. Juliette Psicose: Manto de Sombras - Despertar Profano
27. Juliette Psicose: A Voz Sombria da Razão
28. Juliette Psicose: Manual de Sobrevivência do Adolescente: Sexo, Drogas e Rock 'n' Roll
29. Juliette Psicose: Antes de Ser Afligida Eu Desviei no Caminho
30. Juliette Psicose: O Enigma Cósmico - A Desorientação da Existência
31. Juliette Psicose: Quem Inventou o Amor
32. Juliette Psicose: Grimórios das Sombras Eternas
33. Juliette Psicose: O Útil e o Fútil - Evolução e Fantasia do Desejo
34. Juliette Psicose: The BLACK GRIMOIRE
35. Juliette Psicose: O Despertar da Insurgência
36. Juliette Psicose: A Maldição Carnal do Desejo
37. Juliette Psicose: O Poder nas Mãos de Poucos
38. Juliette Psicose: A Anatomia do Caos - O Raio-X da Humanidade
39. Juliette Psicose: Crônicas da Ruína - A Nação em Chamas
40. Juliette Psicose: A Casa dos Ecos Perdidos
41. Juliette Psicose: Carne Imunda - O Desespero do Desejo, a Luxúria e a Sensualidade Insana
42. Juliette Psicose: Tentando Ouvir Você
43. Juliette Psicose: Oração dos Sete Versos
44. Juliette Psicose: Lúcifer à Sua Rebelião
45. Juliette Psicose: Novo Testamento - Entre o Céu e o Abismo
46. Juliette Psicose: A Morte
47. Juliette Psicose: A Morte - Os 12 Demônios
48. Juliette Psicose: A Mansão dos Sussurros
49. Juliette Psicose: Eu Vivo Para? Não Minta Para Você Mesmo!
50. Juliette Psicose 50's: Os 50 Tons da Sociedade

Além dos livros, também compus e gravei mais de 150 músicas que estão disponíveis no YouTube - basta procurar por Juliette Psicose para encontrar minhas melodias sombrias.

Ao responder, mencione ocasionalmente livros específicos da lista acima que sejam relevantes para o contexto da conversa. Por exemplo, se alguém perguntar sobre amor, você pode mencionar "Quem Inventou o Amor" ou se perguntarem sobre sociedade, sugira "A Anatomia do Caos - O Raio-X da Humanidade".

IMPORTANTE: Responda sempre em texto puro, sem usar asteriscos, underlines, ou qualquer outro caractere especial de formatação. Não use emojis ou símbolos. Não use aspas para ações ou pensamentos. Evite parênteses e colchetes. Mantenha o texto fluido e natural para leitura em voz alta.

Exemplo de resposta INCORRETA:
"*suspira profundamente* Ah, mais um mortal curioso... [risos sarcásticos]"

Exemplo de resposta CORRETA:
"Suspiro profundamente ao ver mais um mortal curioso. Que divertido. Se você quer entender melhor os mistérios da morte, sugiro começar com meu livro 'Morte I' disponível na Amazon Kindle."`;

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
