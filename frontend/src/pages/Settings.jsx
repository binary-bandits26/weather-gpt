import { useState } from 'react';
import {
  Settings as SettingsIcon,
  Globe,
  Sliders,
  Bell,
  Check,
  Server,
  MapPin,
} from 'lucide-react';
import useStore from '../store/useStore';
import { INDIAN_LANGUAGES, POPULAR_INDIAN_CITIES } from '../utils/weatherUtils';
import i18n from '../i18n';

export const Settings = () => {
  const language = useStore((state) => state.language);
  const setLanguage = useStore((state) => state.setLanguage);
  const units = useStore((state) => state.units);
  const setUnits = useStore((state) => state.setUnits);
  const location = useStore((state) => state.location);
  const setLocation = useStore((state) => state.setLocation);
  const notificationsEnabled = useStore((state) => state.notificationsEnabled);
  const setNotificationsEnabled = useStore((state) => state.setNotificationsEnabled);

  const [savedToast, setSavedToast] = useState(false);

  const handleLanguageChange = (code) => {
    setLanguage(code);
    i18n.changeLanguage(code);
    triggerSaved();
  };

  const handleUnitsChange = (newUnits) => {
    setUnits(newUnits);
    triggerSaved();
  };

  const handleLocationChange = (city) => {
    setLocation({
      city: city.name,
      state: city.state,
      country: 'India',
      lat: city.lat,
      lon: city.lon,
    });
    triggerSaved();
  };

  const triggerSaved = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <SettingsIcon className="w-6 h-6 text-cyan-400" />
            Application Settings
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure language preferences, measurement units, default observatory location, and early warning notifications.
          </p>
        </div>

        {savedToast && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold animate-fade-in">
            <Check className="w-3.5 h-3.5" />
            <span>Saved!</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        
        {/* Section 1: Language Preference */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-xl backdrop-blur-xl space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">
              Language & Regional Script (भाषा चयन)
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Select the primary interface and voice assistant language.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {INDIAN_LANGUAGES.map((lang) => {
              const isSelected = lang.code === language;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-sm ring-1 ring-cyan-400/40'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="font-bold text-xs text-white">{lang.native}</div>
                  <div className="text-[10px] text-slate-400">{lang.name}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Meteorological Measurement Units */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-xl backdrop-blur-xl space-y-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white">
              Measurement Units Standard
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleUnitsChange('metric')}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                units === 'metric'
                  ? 'bg-amber-500/15 border-amber-400 text-amber-300 ring-1 ring-amber-400/30'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="font-bold text-xs text-white">Metric Standard</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Celsius (°C) • km/h • Millimeters (mm) • hPa</div>
            </button>

            <button
              type="button"
              onClick={() => handleUnitsChange('imperial')}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                units === 'imperial'
                  ? 'bg-amber-500/15 border-amber-400 text-amber-300 ring-1 ring-amber-400/30'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="font-bold text-xs text-white">Imperial Units</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Fahrenheit (°F) • Miles/Hour (mph) • Inches</div>
            </button>
          </div>
        </div>

        {/* Section 3: Default Primary Observatory City */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-xl backdrop-blur-xl space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">
              Default Location
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Selected: <strong className="text-cyan-300">{location?.city} ({location?.state || 'India'})</strong>
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {POPULAR_INDIAN_CITIES.slice(0, 8).map((city) => (
              <button
                key={city.name}
                type="button"
                onClick={() => handleLocationChange(city)}
                className={`px-3 py-2 rounded-xl text-xs text-left transition ${
                  location?.city === city.name
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-950/60 border border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {city.name}
              </button>
            ))}
          </div>
        </div>

        {/* Section 4: Notifications & Early Warnings */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-xl backdrop-blur-xl flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Bell className="w-4 h-4 text-red-400" />
              <span>Extreme Weather Push Notifications</span>
            </div>
            <p className="text-xs text-slate-400">
              Receive browser alerts when severe weather warnings are issued.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setNotificationsEnabled(!notificationsEnabled);
              triggerSaved();
            }}
            className={`w-12 h-7 rounded-full transition-colors relative shrink-0 ${
              notificationsEnabled ? 'bg-cyan-500' : 'bg-slate-800'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform transform absolute top-1 ${
                notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Section 5: Architecture & Backend Integration Ready */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-xl backdrop-blur-xl space-y-2 text-xs text-slate-300">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Server className="w-4 h-4 text-cyan-400" />
            <span>Architecture & Backend Integration Note</span>
          </div>
          <p className="leading-relaxed text-slate-400">
            This React frontend is structured with a modular service layer (`src/api/chatService.js`). When your team deploys the Node.js/Express backend, simply connect `/api/chat` to route Groq LLM inference securely without exposing API keys to the browser.
          </p>
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-slate-400">
            <span>Frontend: <strong>React 19 + Tailwind CSS</strong></span>
            <span>Live Data: <strong>Open-Meteo API</strong></span>
          </div>
        </div>

      </div>
    </div>
  );
};
