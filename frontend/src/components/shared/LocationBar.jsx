import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Search, Navigation, Loader2, X } from 'lucide-react';
import useStore from '../../store/useStore';
import { useGeolocation } from '../../hooks/useGeolocation';
import { searchLocations } from '../../api/weatherApi';
import { POPULAR_INDIAN_CITIES } from '../../utils/weatherUtils';

export const LocationBar = ({ compact = false, onSelected }) => {
  const location = useStore((state) => state.location);
  const setLocation = useStore((state) => state.setLocation);
  const { detectLocation, loading: geoLoading } = useGeolocation();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults([]);
      setSearching(false);
      return;
    }

    const timer = setTimeout(async () => {
      setSearching(true);
      const res = await searchLocations(query);
      setResults(res);
      setSearching(false);
      setIsOpen(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const handleSelect = (loc) => {
    setLocation({
      city: loc.name,
      state: loc.state || '',
      country: loc.country || 'India',
      lat: loc.lat,
      lon: loc.lon,
    });
    setQuery('');
    setIsOpen(false);
    if (onSelected) onSelected(loc);
  };

  const handleGPSDetect = async () => {
    try {
      const loc = await detectLocation();
      if (onSelected) onSelected(loc);
    } catch (err) {
      console.warn('GPS detection skipped:', err);
    }
  };

  return (
    <div className="relative w-full max-w-md" ref={containerRef}>
      <div className="relative flex items-center">
        <div className="absolute left-3 pointer-events-none text-slate-400">
          <Search className="w-4 h-4 text-cyan-400" />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={`Search city, district (Current: ${location?.city || 'Delhi'})...`}
          className="w-full pl-9 pr-20 py-2 rounded-xl bg-slate-800/90 border border-slate-700/80 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 text-slate-100 placeholder-slate-400 text-sm transition-all shadow-inner backdrop-blur-md outline-none"
        />

        <div className="absolute right-1.5 flex items-center gap-1">
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-200 rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={handleGPSDetect}
            disabled={geoLoading}
            className="flex items-center gap-1 px-2 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-lg text-xs font-medium transition-all"
            title="Auto-detect via GPS"
          >
            {geoLoading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
            ) : (
              <Navigation className="w-3.5 h-3.5 text-cyan-400" />
            )}
            <span className="hidden sm:inline">GPS</span>
          </button>
        </div>
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-slate-900 border border-slate-700/90 rounded-xl shadow-2xl shadow-black/80 py-2 z-50 max-h-72 overflow-y-auto backdrop-blur-md">
          {searching ? (
            <div className="flex items-center justify-center gap-2 py-4 text-xs text-slate-400">
              <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
              Searching meteorological stations...
            </div>
          ) : results.length > 0 ? (
            <div>
              <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Matching Cities & Districts
              </div>
              {results.map((loc, i) => (
                <button
                  key={`${loc.name}-${loc.lat}-${i}`}
                  type="button"
                  onClick={() => handleSelect(loc)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-left hover:bg-slate-800 text-slate-200 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                    <div>
                      <span className="font-medium text-slate-100">{loc.name}</span>
                      {loc.state && <span className="text-xs text-slate-400">, {loc.state}</span>}
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-500">{loc.country}</span>
                </button>
              ))}
            </div>
          ) : query.trim().length >= 2 ? (
            <div className="px-3 py-3 text-xs text-slate-400 text-center">
              No matching locations found.
            </div>
          ) : (
            <div>
              <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                Major Indian Met Centres
              </div>
              <div className="grid grid-cols-2 gap-1 p-2">
                {POPULAR_INDIAN_CITIES.slice(0, 8).map((city) => (
                  <button
                    key={city.name}
                    type="button"
                    onClick={() => handleSelect(city)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-left text-slate-300 hover:text-cyan-300 hover:bg-slate-800/80 transition-colors"
                  >
                    <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span className="truncate">{city.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
