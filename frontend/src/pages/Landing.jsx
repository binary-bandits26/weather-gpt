import React from 'react';
import { Link } from 'react-router-dom';
import {
  CloudLightning,
  MessageSquare,
  ShieldAlert,
  Languages,
  Mic,
  Sprout,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Layers,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import useStore from '../store/useStore';
import { POPULAR_INDIAN_CITIES } from '../utils/weatherUtils';

export const Landing = () => {
  const location = useStore((state) => state.location);
  const setLocation = useStore((state) => state.setLocation);

  const keyFeatures = [
    {
      icon: MessageSquare,
      title: 'Conversational Weather AI',
      desc: 'Natural language querying powered by Groq LLM and high-resolution numerical weather prediction (GFS/WRF).',
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20',
    },
    {
      icon: Mic,
      title: 'Rural Voice-Enabled Assistant',
      desc: 'Hands-free voice recognition and speech synthesis in 10+ Indian languages for farmers and rural citizens.',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
    },
    {
      icon: ShieldAlert,
      title: 'Disaster Early Warnings',
      desc: 'Real-time IMD alert dissemination for cyclones, floods, thunderstorms, and heatwaves with emergency checklists.',
      color: 'text-red-400',
      bg: 'bg-red-500/10 border-red-500/20',
    },
    {
      icon: Sprout,
      title: 'Agromet Decision Support',
      desc: 'Gramin Krishi Mausam Sewa bulletins providing irrigation scheduling, crop sowing, and pest control advisories.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      icon: Layers,
      title: 'GIS Radar & Satellite Layers',
      desc: 'Interactive map with precipitation radar, temperature isobars, wind vectors, and hazard zones.',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20',
    },
    {
      icon: TrendingUp,
      title: 'Climate & Monsoon Analytics',
      desc: 'Historical 30-year climatological comparisons, monsoon rainfall departure, and thermal anomaly tracking.',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20',
    },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-8">
        
        {/* Ministry Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold shadow-lg shadow-cyan-500/5 animate-fade-in">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Smart India Hackathon • Ministry of Earth Sciences (MoES) / IMD</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]">
            Weather Intelligence <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent">
              In Natural Language.
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            WeatherGPT integrates numerical forecasting models (GFS/WRF), Doppler radar feeds, and disaster early warning systems to empower citizens, farmers, and disaster managers across India.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            to="/chat"
            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-base shadow-xl shadow-cyan-500/25 hover:shadow-cyan-400/40 transition-all hover:scale-105 active:scale-95"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Launch WeatherGPT Chat</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/40 text-slate-200 font-bold text-base transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            <Layers className="w-5 h-5 text-cyan-400" />
            <span>Open NWP Dashboard</span>
          </Link>
        </div>

        {/* Live Met Quick Switcher Bar */}
        <div className="pt-8 max-w-3xl mx-auto">
          <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-3">
            Quick Forecast for Major Indian Met Centres:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {POPULAR_INDIAN_CITIES.slice(0, 7).map((city) => (
              <button
                key={city.name}
                type="button"
                onClick={() => setLocation({ city: city.name, state: city.state, country: 'India', lat: city.lat, lon: city.lon })}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                  location?.city === city.name
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300'
                }`}
              >
                <MapPin className="w-3 h-3 text-cyan-400" />
                <span>{city.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Comprehensive Meteorological Intelligence Suite
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Engineered to fulfill all 8 key features of SIH Problem Statement #26068
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {keyFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-850 transition-all duration-300 shadow-xl hover:shadow-cyan-500/5 group"
              >
                <div className={`w-12 h-12 rounded-2xl ${feat.bg} border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${feat.color}`} />
                </div>
                <h3 className="font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Target Sectors Showcase */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-navy-950 to-slate-900 border border-slate-700/80 shadow-2xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                End-To-End Decision Support
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Built For Crucial National Infrastructure
              </h3>
            </div>
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm hover:bg-cyan-400 transition"
            >
              <span>Test AI Conversation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold text-sm">🌾 Agriculture & Farmers</span>
              <p className="text-slate-300 leading-relaxed">
                Crop-specific weather advisories, soil moisture status, and micro-irrigation scheduling in regional dialects.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-red-400 font-bold text-sm">🚨 Disaster Management</span>
              <p className="text-slate-300 leading-relaxed">
                Cyclone track predictions, flood inundation modeling, and instant multi-channel SOS alerts for NDRF/SDMA.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold text-sm">✈️ Aviation Operations</span>
              <p className="text-slate-300 leading-relaxed">
                Automated METAR/TAF decoders, CAT-III low visibility fog warnings, and high-altitude wind shear detection.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-blue-400 font-bold text-sm">⚓ Marine & Coastal</span>
              <p className="text-slate-300 leading-relaxed">
                Swell wave heights, ocean state forecasts, and cautionary port signal advisories for deep-sea fishermen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800/80 text-center text-xs text-slate-400 space-y-2">
        <p>
          WeatherGPT • SIH Problem Statement #26068 • Developed for Ministry of Earth Sciences & India Meteorological Department
        </p>
        <p className="text-slate-500">
          Powered by React, Tailwind CSS, Node.js/Express, Groq LLM & Open-Meteo NWP
        </p>
      </footer>
    </div>
  );
};
