import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Share2, Search, X, Plus, MoreHorizontal, Play, Pause } from 'lucide-react';

// --- Direct Spotify API Integration ---
let cachedAccessToken = null;
let tokenExpiryTime = null;

const getAccessToken = async () => {
  if (cachedAccessToken && Date.now() < tokenExpiryTime) {
    return { access_token: cachedAccessToken };
  }
  
  const clientId = 'c8368b7dda2040788787b65238ffcc87';
  const clientSecret = 'd399d34b244d47959b1330fe98bc00a0';
  const refreshToken = 'AQCYUbaGE-k-6w3-A1zeVWdaVSV1ZMEtE7o0AV7op-Xjdfgk8MB6L03sehKYs_2bNwR1kG-TFQ5t6-TnaKbYDEue8yOsSMJKfS5h82IvMwLKKodNKHPwJXAgzg4eYWiZ0vc';
  
  const basic = btoa(`${clientId}:${clientSecret}`);
  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', refreshToken);

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { Authorization: `Basic ${basic}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });
  
  const data = await response.json();
  if (data.access_token) {
    cachedAccessToken = data.access_token;
    tokenExpiryTime = Date.now() + (data.expires_in - 50) * 1000;
  }
  return data;
};

const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();
  if (!access_token) return false;

  const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  if (response.status === 204 || response.status > 400) {
    // If paused, fetch the recently played track instead
    const recentResponse = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    if (recentResponse.status === 200) {
      const recentData = await recentResponse.json();
      if (recentData.items && recentData.items.length > 0) {
        const track = recentData.items[0].track;
        return { 
          isPlaying: false, 
          title: track.name, 
          artist: track.artists.map(a => a.name).join(', '), 
          albumArt: track.album.images[0].url, 
          songUrl: track.external_urls.spotify 
        };
      }
    }
    return false;
  }
  
  const song = await response.json();
  if (!song.item) return false;
  
  return { 
    isPlaying: song.is_playing, 
    title: song.item.name, 
    artist: song.item.artists.map(a => a.name).join(', '), 
    albumArt: song.item.album.images[0].url, 
    songUrl: song.item.external_urls.spotify 
  };
};

const searchSpotifyTracks = async (query) => {
  const { access_token } = await getAccessToken();
  if (!access_token || !query) return [];

  const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=4`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  if (response.status !== 200) return [];
  const data = await response.json();
  
  return data.tracks.items.map(track => ({
    id: track.id,
    title: track.name,
    artist: track.artists.map(a => a.name).join(', '),
    albumArt: track.album.images[0]?.url || '',
    songUrl: track.external_urls.spotify
  }));
};

const SpotifyWidget = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isManual, setIsManual] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [songData, setSongData] = useState({
    title: "Not Playing",
    artist: "Spotify",
    albumArt: "https://i.scdn.co/image/ab67616d0000b2734718e2b7e4ba05dcfc101307",
    songUrl: "#"
  });

  // Function to fetch now playing song data from literal API
  const fetchNowPlaying = async () => {
    try {
      const data = await getNowPlaying();
      if (data) {
        setSongData(data);
        setIsPlaying(data.isPlaying);
      }
    } catch (error) {
      console.error("Error fetching Spotify data:", error);
    }
  };

  useEffect(() => {
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 10000); // Update every 10s
    return () => clearInterval(interval);
  }, []);

  // Extract track ID for the Embed player
  const getTrackId = (url) => {
    if (!url || url === "#" || url === "Not Connected") return null;
    const parts = url.split('/');
    const trackString = parts[parts.length - 1];
    return trackString.split('?')[0]; // Sanitize any query parameters
  };

  const trackId = getTrackId(songData.songUrl);
  const bars = Array.from({ length: 12 });

  const handleSelectTrack = (track) => {
    setSongData({
      title: track.title,
      artist: track.artist,
      albumArt: track.albumArt,
      songUrl: track.songUrl,
      isPlaying: false // Manual selection starts paused or we just don't know live status
    });
    setIsManual(true);
    setIsPlaying(false);
    setIsSearchOpen(false);
  };

  const resetToLive = () => {
    setIsManual(false);
    fetchNowPlaying();
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    // Note: Actual Spotify playback control requires 'user-modify-playback-state' scope
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="w-full glass-morphism rounded-[32px] p-6 border border-primary/10 relative overflow-hidden group hover:border-accent/30 transition-all duration-500"
    >
      {/* Background Decorative Element */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors"></div>

      <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
        
        {/* Vinyl Record / Album Art */}
        <div className="relative w-32 h-32 flex-shrink-0">
          <motion.div 
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="w-full h-full rounded-full relative p-1 bg-[#121212] shadow-2xl"
          >
            {/* Vinyl texture lines */}
            <div className="absolute inset-0 rounded-full border border-white/5 opacity-50"></div>
            <div className="absolute inset-2 rounded-full border border-white/5 opacity-30"></div>
            
            <img 
              src={songData.albumArt} 
              alt="Album Art" 
              className="w-full h-full rounded-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
            />
            
            {/* Center hole Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 bg-background rounded-full border-2 border-[#121212] flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse shadow-[0_0_8px_rgba(var(--accent-rgb),0.8)]"></div>
              </div>
            </div>
          </motion.div>
          
          {/* Tone Arm (UI only) */}
          <motion.div 
            initial={{ rotate: -20 }}
            animate={{ rotate: isPlaying ? 0 : -20 }}
            className="absolute -top-2 -right-2 w-16 h-1 bg-secondary/20 origin-right rounded-full hidden md:block"
            style={{ transformOrigin: 'right center' }}
          >
             <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-secondary/40 rounded-sm"></div>
          </motion.div>
        </div>

        {/* Song Info */}
        <div className="flex-1 space-y-4 text-center md:text-left w-full h-full relative">
          
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute inset-0 z-30 bg-background/95 backdrop-blur-md rounded-2xl flex flex-col pt-2 pb-4 overflow-hidden"
              >
                <div className="flex items-center space-x-2 px-4 pb-3 border-b border-primary/10">
                  <Search size={16} className="text-secondary/60" />
                  <input 
                    type="text" 
                    placeholder="Search for a song to play..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="flex-1 bg-transparent border-none text-sm text-primary placeholder:text-secondary/40 focus:outline-none focus:ring-0"
                  />
                  <X size={16} className="text-secondary/60 hover:text-accent cursor-pointer" onClick={() => setIsSearchOpen(false)} />
                </div>
                
                <div className="flex-1 overflow-y-auto px-2 pt-2 space-y-1 no-scrollbar">
                  {isSearching ? (
                    <div className="text-xs text-secondary/40 text-center py-4">Searching database...</div>
                  ) : searchResults.length > 0 ? (
                    searchResults.map(track => (
                      <div 
                        key={track.id}
                        onClick={() => handleSelectTrack(track)}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-primary/5 cursor-pointer transition-colors group/item"
                      >
                        <img src={track.albumArt} alt="Album" className="w-8 h-8 rounded-md" />
                        <div className="flex-1 min-w-0 text-left">
                          <p className="text-xs font-bold text-primary truncate group-hover/item:text-accent transition-colors">{track.title}</p>
                          <p className="text-[10px] text-secondary truncate">{track.artist}</p>
                        </div>
                      </div>
                    ))
                  ) : searchQuery.length > 0 ? (
                    <div className="text-xs text-secondary/40 text-center py-4">No tracks found.</div>
                  ) : (
                    <div className="text-[10px] uppercase tracking-widest text-secondary/30 text-center py-4 font-bold">Type to search</div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className={`transition-opacity duration-300 ${isSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <div className="flex items-center justify-center md:justify-between">
               <div className="flex items-center space-x-2">
                  <Music size={14} className="text-accent animate-bounce" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent font-bold">
                    {isManual ? "Manual Selection" : "Now Playing"}
                  </span>
               </div>
               <div className="flex items-center space-x-3">
                 {isManual && (
                   <span 
                     onClick={resetToLive}
                     className="text-[10px] uppercase tracking-widest font-bold text-red-400 hover:text-red-500 cursor-pointer hidden md:block transition-colors"
                   >
                     Reset to Live
                   </span>
                 )}
                 <Search size={14} className="text-secondary/40 hover:text-accent cursor-pointer transition-colors hidden md:block" onClick={() => setIsSearchOpen(true)} />
                 <Share2 size={14} className="text-secondary/40 hover:text-accent cursor-pointer transition-colors hidden md:block" />
               </div>
            </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-primary tracking-tight group-hover:text-accent transition-colors truncate">
              {songData.title}
            </h3>
            <p className="text-secondary text-sm font-medium opacity-80">{songData.artist}</p>
          </div>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <div className="flex items-center space-x-6">
                {/* Animated Audio Bars */}
                <div className="flex items-end space-x-1 h-8">
                  {bars.map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        height: isPlaying ? [8, 24, 12, 28, 16][i % 5] : 4 
                      }}
                      transition={{ 
                        duration: 0.6, 
                        repeat: Infinity, 
                        repeatType: "reverse", 
                        delay: i * 0.05 
                      }}
                      className="w-1.5 bg-accent/40 rounded-full"
                      style={{ backgroundColor: `rgba(var(--accent-rgb), ${0.2 + (i / 12) * 0.5})` }}
                    />
                  ))}
                </div>

                {/* Status Indicator */}
                <div className="px-3 py-1 bg-accent/10 rounded-full border border-accent/20">
                   <span className="text-[10px] font-mono text-accent font-bold uppercase tracking-widest">
                     {isPlaying ? "Live Audio Active" : "Paused / Recently Played"}
                   </span>
                </div>
              </div>

              {/* New Playback Controls */}
              <div className="flex items-center space-x-4">
                <Plus size={18} className="text-secondary/60 hover:text-accent cursor-pointer transition-colors" />
                <MoreHorizontal size={18} className="text-secondary/60 hover:text-accent cursor-pointer transition-colors" />
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePlayback}
                  className="w-10 h-10 bg-primary text-background rounded-full flex items-center justify-center cursor-pointer hover:bg-accent transition-colors shadow-lg"
                >
                  {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} className="ml-0.5" fill="currentColor" />}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spotify Branding Overlay */}
      <div className="absolute bottom-4 right-8 opacity-10 group-hover:opacity-30 transition-opacity">
         <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.31c-.22.36-.677.476-1.033.256-2.822-1.725-6.374-2.113-10.557-1.157-.41.094-.823-.16-.917-.57-.094-.41.16-.823.57-.917 4.587-1.047 8.513-.6 11.65 1.32.358.218.474.675.257 1.03l.03-.062zm1.467-3.268c-.276.45-.858.59-1.308.314-3.226-1.983-8.143-2.55-11.957-1.39-.508.155-1.043-.133-1.198-.642-.155-.508.133-1.043.642-1.198 4.364-1.323 9.775-.683 13.507 1.613.45.276.59.858.314 1.308v-.005zm.123-3.39c-3.87-2.3-10.25-2.512-13.974-1.382-.593.18-1.223-.153-1.403-.746-.18-.593.153-1.223.746-1.403 4.28-1.3 11.332-1.055 15.795 1.594.534.317.708 1.01.39 1.543-.317.534-1.01.708-1.543.39l-.014.004z"/>
         </svg>
      </div>

    </motion.div>
  );
};

export default SpotifyWidget;
