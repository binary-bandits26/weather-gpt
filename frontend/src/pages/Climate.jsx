import { ClimateChart } from '../components/dashboard/ClimateChart';
import { LocationBar } from '../components/shared/LocationBar';
import { useWeather } from '../hooks/useWeather';
import { TrendingUp, Globe2, Sun, CloudRain } from 'lucide-react';

export const Climate = () => {
  const { climateData } = useWeather();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-20 md:pb-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/50 via-slate-900 to-cyan-950/40 border border-purple-500/30 shadow-xl space-y-2">
        <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
          <TrendingUp className="w-4 h-4" />
          <span>Climatological Research & Trend Analysis</span>
        </div>
        <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
          Climate Trends & Seasonal Normals
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
          Historical 30-year climatological normals, monthly temperature curves, and seasonal monsoon rainfall distribution patterns.
        </p>
      </div>

      {/* Location Selector */}
      <div className="max-w-md">
        <LocationBar />
      </div>

      {/* Main Climate Chart */}
      <ClimateChart data={climateData} />

      {/* Climate Indicators (Demo Baseline) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span className="font-semibold uppercase tracking-wider text-slate-300">
            Regional Climatological Indices (Demo Indicators)
          </span>
          <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">
            30-Year Standard Baseline
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-2.5 shadow-xl">
            <div className="flex items-center gap-2 text-amber-400">
              <Sun className="w-4 h-4" />
              <h4 className="font-bold text-sm text-white">ENSO / Pacific Pattern</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Equatorial Pacific oceanic temperatures typically influence Indian monsoon intensity through convective walker circulation coupling.
            </p>
            <div className="text-[11px] text-emerald-400 font-semibold pt-1 border-t border-slate-800">
              Reference Status: ENSO Neutral
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-2.5 shadow-xl">
            <div className="flex items-center gap-2 text-cyan-400">
              <Globe2 className="w-4 h-4" />
              <h4 className="font-bold text-sm text-white">Indian Ocean Dipole (IOD)</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Sea surface temperature difference between western and eastern Indian Ocean modulating cross-equatorial monsoon winds.
            </p>
            <div className="text-[11px] text-cyan-300 font-semibold pt-1 border-t border-slate-800">
              Reference Status: Neutral Phase
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-2.5 shadow-xl">
            <div className="flex items-center gap-2 text-blue-400">
              <CloudRain className="w-4 h-4" />
              <h4 className="font-bold text-sm text-white">Monsoon Climatology (LPA)</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              All-India Long Period Average (LPA) of monsoon rainfall stands at ~880.6 mm, with July and August providing peak volume.
            </p>
            <div className="text-[11px] text-emerald-400 font-semibold pt-1 border-t border-slate-800">
              Reference Normal: ~880.6 mm
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
