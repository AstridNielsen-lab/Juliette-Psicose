import React from 'react';
import { Music2, ExternalLink, Phone } from 'lucide-react';
import {
  Youtube,
  Facebook,
  Instagram,
  Twitter,
  Music,
  Share2,
} from 'lucide-react';
import { Chat } from './components/Chat';

const platforms = [
  {
    name: 'Spotify',
    icon: <Music className="w-8 h-8" />,
    url: 'https://open.spotify.com/search/Juliette%20Psicose%20Beyond%20the%20Taste'
  },
  {
    name: 'Apple Music',
    icon: <Music className="w-8 h-8" />,
    url: 'https://music.apple.com/search?term=Juliette+Psicose+Beyond+the+Taste'
  },
  {
    name: 'YouTube Music',
    icon: <Music className="w-8 h-8" />,
    url: 'https://music.youtube.com/search?q=Juliette%20Psicose%20Beyond%20the%20Taste'
  },
  {
    name: 'Amazon Music',
    icon: <Music className="w-8 h-8" />,
    url: 'https://music.amazon.com.br/search/Juliette%20Psicose%20Beyond%20the%20Taste'
  },
  {
    name: 'Deezer',
    icon: <Music className="w-8 h-8" />,
    url: 'https://www.deezer.com/search/Juliette%20Psicose%20Beyond%20the%20Taste'
  },
  {
    name: 'Tidal',
    icon: <Music className="w-8 h-8" />,
    url: 'https://listen.tidal.com/search?q=Juliette%20Psicose%20Beyond%20the%20Taste'
  },
  {
    name: 'TikTok',
    icon: <Music className="w-8 h-8" />,
    url: 'https://www.tiktok.com/search?q=Juliette%20Psicose%20Beyond%20the%20Taste'
  },
  {
    name: 'iMusica',
    icon: <Music className="w-8 h-8" />,
    url: 'https://www.imusica.com.br/busca/Juliette%20Psicose%20Beyond%20the%20Taste'
  }
];

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="pt-16 pb-24 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <Music2 className="w-20 h-20 mx-auto mb-8 text-purple-400" />
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-10 font-metal">
            Juliette Psicose Beyond the Taste
          </h1>
          <div className="max-w-3xl mx-auto mb-12 p-6 bg-black/30 backdrop-blur-sm rounded-2xl border border-purple-500/20 hover:border-purple-500/30 transition-colors">
            <p className="text-lg md:text-xl text-purple-200 leading-relaxed italic">
              Juliette Psicose é uma criatura lendária, escolhida pela Morte para ser sua companheira eterna. 
              Sua existência é regida pelo acordo com o além, o que a torna uma figura enigmática e misteriosa. 
              Ela habita a linha tênue entre a vida e a morte, sempre observando a passagem do tempo e o jogo dos ciclos. 
              Sua perspectiva sobre a existência é única e sarcástica, moldada por suas experiências de existir além do mundo mortal.
            </p>
          </div>
          <div className="max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-purple-200 mb-6">Converse com Juliette Psicose</h2>
            <Chat />
          </div>
          <p className="text-xl md:text-2xl text-purple-200 mb-8">
            Ouça nossa nova música em todas as plataformas digitais!
          </p>
          <div className="max-w-2xl mx-auto">
            <iframe 
              style={{ borderRadius: "12px" }}
              src="https://open.spotify.com/embed/track/1XoZ5Lbfcdd2o8HJQZgiO6?utm_source=generator" 
              width="100%" 
              height="352" 
              frameBorder="0" 
              allowFullScreen 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
            />
          </div>
        </div>
      </header>

      {/* Platforms Grid */}
      <main className="max-w-6xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {platforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl hover:bg-purple-900/50 transition-all duration-300 flex flex-col items-center justify-center gap-4 border border-purple-500/20 hover:border-purple-500/40"
            >
              <div className="text-purple-400 group-hover:text-purple-300 transition-colors">
                {platform.icon}
              </div>
              <span className="text-white font-medium text-center">
                {platform.name}
              </span>
              <ExternalLink className="w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-sm py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center gap-8">
            <div className="flex justify-center gap-6">
              <a 
                href="https://www.facebook.com/Juliette.Psicose" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-purple-200">
              <a 
                href="https://wa.me/5511970603441" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-purple-300 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>(11) 97060-3441</span>
              </a>
              <span className="hidden md:inline">•</span>
              <a 
                href="https://www.amazon.com.br/Juliette-Psicose/dp/B0CLKWDQNJ" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-purple-300 transition-colors"
              >
                Amazon Kindle
              </a>
              <span className="hidden md:inline">•</span>
              <a 
                href="https://likelook.wixsite.com/solutions" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-purple-300 transition-colors"
              >
                Like Look Solutions
              </a>
            </div>
            <div className="text-center text-gray-400 text-sm">
              <p>© 2024 Juliette Psicose. Todos os direitos reservados.</p>
              <p className="mt-2">Criado por Julio Campos Machado</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;