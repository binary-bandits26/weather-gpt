import { useState } from 'react';
import {
  Sprout,
  Plane,
  Anchor,
  Building2,
  AlertTriangle,
  Droplets,
  Wind,
  Eye,
  CheckCircle2,
} from 'lucide-react';

export const SectorAdvisories = ({ location, currentWeather }) => {
  const [activeSector, setActiveSector] = useState('agri'); // 'agri' | 'aviation' | 'marine' | 'urban'

  const temp = currentWeather?.current?.temp ? Math.round(currentWeather.current.temp) : 29;
  const wind = currentWeather?.current?.windSpeed ? Math.round(currentWeather.current.windSpeed) : 16;
  const humidity = currentWeather?.current?.humidity || 60;
  const aqi = currentWeather?.current?.aqi || 68;

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-700/80 p-5 shadow-xl backdrop-blur-xl space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            Sector-Specific Decision Support (Prototype Matrix)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Tailored advisories for Agriculture, Aviation, Marine, and Municipal Governance
          </p>
        </div>

        {/* Sector Tab Selector */}
        <div className="flex items-center gap-1 p-1 bg-slate-950/80 rounded-xl border border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => setActiveSector('agri')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
              activeSector === 'agri'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sprout className="w-3.5 h-3.5" />
            <span>Agriculture</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSector('aviation')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
              activeSector === 'aviation'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Plane className="w-3.5 h-3.5" />
            <span>Aviation</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSector('marine')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
              activeSector === 'marine'
                ? 'bg-blue-500 text-white font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Anchor className="w-3.5 h-3.5" />
            <span>Marine</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSector('urban')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
              activeSector === 'urban'
                ? 'bg-purple-500 text-white font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Smart City</span>
          </button>
        </div>
      </div>

      {/* Sector 1: Agriculture (Gramin Krishi Mausam Sewa) */}
      {activeSector === 'agri' && (
        <div className="space-y-3 animate-fade-in">
          <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">
                  Crop Weather Advisory • {location?.city || 'Selected Station'}
                </h4>
                <p className="text-[11px] text-emerald-400">
                  Agromet Field Matrix (GKMS Simulation)
                </p>
              </div>
            </div>
            <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full text-xs font-semibold">
              Favorable Window
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <Droplets className="w-3.5 h-3.5" />
                <span>Irrigation Planning</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Relative humidity at {humidity}%. Light micro-irrigation recommended for standing pulses during evening hours.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Pest Surveillance</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                At {temp}°C, monitor for aphid activity in vegetable nurseries. Deploy sticky traps before chemical spraying.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Field Operations</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Clear sky conditions over next 3 days are suitable for intercultural weeding and grain drying.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sector 2: Aviation Briefing */}
      {activeSector === 'aviation' && (
        <div className="space-y-3 animate-fade-in">
          <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                <Plane className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">
                  Aerodrome Weather Report (METAR Simulation)
                </h4>
                <p className="text-[11px] text-cyan-400 font-mono">
                  METAR VIDP 271630Z 28008KT 4000 HZ NSC 31/18 Q1012 NOSIG
                </p>
              </div>
            </div>
            <span className="px-2.5 py-0.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full text-xs font-semibold">
              VFR Flight Rules
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <div className="text-cyan-400 font-bold flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" /> Runway Visibility
              </div>
              <p className="text-slate-300 leading-relaxed">
                Horizontal visibility &gt; 4,000m. No active CAT-III fog procedures required.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <div className="text-blue-400 font-bold flex items-center gap-1">
                <Wind className="w-3.5 h-3.5" /> Low-Level Wind Shear
              </div>
              <p className="text-slate-300 leading-relaxed">
                Surface winds {wind} km/h from NW. No significant shear along approach glide paths.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <div className="text-purple-400 font-bold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Convective Activity
              </div>
              <p className="text-slate-300 leading-relaxed">
                Isolated CB cloud tops observed beyond 120 nautical miles east. En-route cruising clear.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sector 3: Marine & Fishermen Advisories */}
      {activeSector === 'marine' && (
        <div className="space-y-3 animate-fade-in">
          <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                <Anchor className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">
                  Ocean State & Coastal Advisory (Simulation)
                </h4>
                <p className="text-[11px] text-blue-300">
                  Sea Condition: Rough to Moderate in Central Bay of Bengal
                </p>
              </div>
            </div>
            <span className="px-2.5 py-0.5 bg-red-500/20 text-red-300 border border-red-500/40 rounded-full text-xs font-semibold">
              Warning Signal LC-3
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <div className="text-red-400 font-bold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Fishermen Warning
              </div>
              <p className="text-slate-300 leading-relaxed">
                Squally weather with wind gusts up to 50 kmph likely. Fishermen advised against deep-sea venturing.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <div className="text-blue-400 font-bold flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5" /> Swell Wave Height
              </div>
              <p className="text-slate-300 leading-relaxed">
                High swell waves between 2.5m to 3.4m forecasted along coastal sectors during high tide.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <div className="text-cyan-400 font-bold flex items-center gap-1">
                <Anchor className="w-3.5 h-3.5" /> Port Operation
              </div>
              <p className="text-slate-300 leading-relaxed">
                Local Cautionary Signal No. 3 hoisted for coastal and small harbor vessels.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sector 4: Smart City & Urban Planning */}
      {activeSector === 'urban' && (
        <div className="space-y-3 animate-fade-in">
          <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">
                  Urban Resilience & Heat Action Plan Matrix
                </h4>
                <p className="text-[11px] text-purple-300">
                  Municipal Decision Support & Drainage Monitoring
                </p>
              </div>
            </div>
            <span className="px-2.5 py-0.5 bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded-full text-xs font-semibold">
              Advisory Code: Yellow
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <div className="text-purple-400 font-bold">Drainage & Pumping</div>
              <p className="text-slate-300 leading-relaxed">
                Stormwater stations placed on 30-minute standby. Low-lying underpasses monitored with water level sensors.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <div className="text-amber-400 font-bold">Cooling Kiosks</div>
              <p className="text-slate-300 leading-relaxed">
                Municipal water points and shaded transit sheds operational for outdoor workers during afternoon hours.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <div className="text-cyan-400 font-bold">AQI Smog Mitigation</div>
              <p className="text-slate-300 leading-relaxed">
                AQI is {aqi}. Anti-smog water mist canons deployed at designated arterial intersections.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
