import React from 'react';
import { Music2, ExternalLink } from 'lucide-react';
import {
  Youtube,
  Facebook,
  Instagram,
  Twitter,
  Music,
  Share2,
} from 'lucide-react';

const platforms = [
  // Example of how to add links:
  // Replace 'YOUR_LINK_HERE' with the actual search or direct link for each platform
  // Format: https://platform-domain.com/search?q=Juliette+Psicose+Beyond+the+Taste+-+Single
  {
    name: 'AMI',
    icon: <Music className="w-8 h-8" />,
    url: 'YOUR_LINK_HERE' // Add AMI search/direct link
  },
  {
    name: 'Anghami',
    icon: <Music className="w-8 h-8" />,
    url: 'YOUR_LINK_HERE' // Add Anghami search/direct link
  },
  {
    name: 'Apple iTunes',
    icon: <Music className="w-8 h-8" />,
    url: 'YOUR_LINK_HERE' // Add Apple iTunes search/direct link
  },
  {
    name: 'Audible Magic',
    icon: <Music className="w-8 h-8" />,
    url: 'YOUR_LINK_HERE' // Add Audible Magic search/direct link
  },
  {
    name: 'AWA',
    icon: <Music className="w-8 h-8" />,
    url: 'YOUR_LINK_HERE' // Add AWA search/direct link
  },
  {
    name: 'Boomplay',
    icon: <Music className="w-8 h-8" />,
    url: 'YOUR_LINK_HERE' // Add Boomplay search/direct link
  },
  {
    name: 'Deezer',
    icon: <Music className="w-8 h-8" />,
    url: 'YOUR_LINK_HERE' // Add Deezer search/direct link
  },
  {
    name: 'Facebook',
    icon: <Facebook className="w-8 h-8" />,
    url: 'YOUR_LINK_HERE' // Add Facebook search/direct link
  },
  {
    name: 'Hungama',
    icon: <Music className="w-8 h-8" />,
    url: 'YOUR_LINK_HERE' // Add Hungama search/direct link
  },
  {
    name: 'iHeartRadio',
    icon: <Music className="w-8 h-8" />,
    url: 'YOUR_LINK_HERE' // Add iHeartRadio search/direct link
  },
  {
    name: 'iMusica',
    icon: <Music className="w-8 h-8" />,
    url: 'YOUR_LINK_HERE' // Add iMusica search/direct link
  },
  {
    name: 'InProdicon',
    icon: <Music className="w-8 h-8" />,
    url: 'YOUR_LINK_HERE' // Add InProdicon search/direct link
  },
  {
    name: 'KDigital',
    icon: <Music className="w-8 h-8" />,
    url: 'YOUR_LINK_HERE' // Add KDigital search/direct link
  },
  {
    name: 'KKBox',
    icon: <Music className="w-8 h-8" />,
    url: 'YOUR_LINK_HERE' // Add KKBox search/direct link
  },
  {
    name: 'Kuack',
    icon: <Music className="w-8 h-8" />,
    url: 'YOUR_LINK_HERE' // Add Kuack search/direct link
  },
  {
    name: 'Lissen',
    icon: <Music className="w-8 h-8" />,
    url: 'YOUR_LINK_HERE' // Add Lissen search/direct link
  },
  {
    name: 'NetEase Cloud Music',
    icon: <Music className="w-8 h-8" />,
    url: 'YOUR_LINK_HERE' // Add NetEase Cloud Music search/direct link
  },
  {
    name: 'Nuuday',
    icon: <Music className="w-8 h-8" />,
    url: 'YOUR_LINK_HERE' // Add Nuuday search/direct link
  },
  {
    name: 'Pandora',
    icon: <Music className="w-8 h-8" />,
    url: 'YOUR_LINK_HERE' // Add Pandora search/direct link
  },
  {
    name: 'Peloton',
    icon: <Music className="w-8 h-8" />,
    url: 'YOUR_LINK_HERE' // Add Peloton search/direct link
  },
  {
    name: 'Qobuz',
    icon: <Music className="w-8 h-8" />,
    url: 'YOUR_LINK_HERE' // Add Qobuz search/direct link
  },
  {
    name: 'Saavn',
    icon: <Music className="w-8 h-8" />,
    url: 'YOUR_LINK_HERE' // Add Saavn search/direct link
  },
  {
    name: 'Slacker Radio',
    icon: <Music className="w-8 h-8" />,
    url: 'YOUR_LINK_HERE' // Add Slacker Radio search/direct link
  },
  {
    name: 'Spotify',
    icon: <Music className="w-8 h-8" />,
    url: 'YOUR_LINK_HERE' // Add Spotify search/direct link
  },
  {
    name: 'Tencent Music',
    icon: <Music className="w-8 h-8" />,
    url: 'YOUR_LINK_HERE' // Add Tencent Music search/direct link
  },
  {
    name: 'Tidal',
    icon: <Music className="w-8 h-8" />,
    url: 'YOUR_LINK_HERE' // Add Tidal search/direct link
  },
  {
    name: 'TikTok',
    icon: <Share2 className="w-8 h-8" />,
    url: 'YOUR_LINK_HERE' // Add TikTok search/direct link
  },
  {
    name: 'Trebel',
    icon: <Music className="w-8 h-8" />,
    url: 'YOUR_LINK_HERE' // Add Trebel search/direct link
  },
  {
    name: 'Tuned Global',
    icon: <Music className="w-8 h-8" />,
    url: 'YOUR_LINK_HERE' // Add Tuned Global search/direct link
  },
  {
    name: 'YouTube Music',
    icon: <Youtube className="w-8 h-8" />,
    url: 'YOUR_LINK_HERE' // Add YouTube Music search/direct link
  },
  {
    name: 'YouTube CMS',
    icon: <Youtube className="w-8 h-8" />,
    url: 'YOUR_LINK_HERE' // Add YouTube CMS search/direct link
  },
  {
    name: 'YouTube Content ID',
    icon: <Youtube className="w-8 h-8" />,
    url: 'YOUR_LINK_HERE' // Add YouTube Content ID search/direct link
  }
];

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="pt-16 pb-24 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <Music2 className="w-20 h-20 mx-auto mb-8 text-purple-400" />
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-metal">
            Juliette Psicose Beyond the Taste
          </h1>
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
          <div className="flex justify-center gap-6 mb-8">
            <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
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
          <div className="text-center text-gray-400 text-sm">
            <p>© 2024 Juliette Psicose. Todos os direitos reservados.</p>
            <p className="mt-2">Contato: info@juliettepsicose.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;