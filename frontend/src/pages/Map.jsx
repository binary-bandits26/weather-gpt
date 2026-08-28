import { WeatherMap } from '../components/dashboard/WeatherMap';
import { LocationBar } from '../components/shared/LocationBar';
import useStore from '../store/useStore';
import { Map as MapIcon, Layers, Info } from 'lucide-react';

export const Map = () => {
  const location = useStore((state) => state.location);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-20 md:pb-6">
      {/* Top Header & Location Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <MapIcon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Interactive GIS Weather Map
            </h1>
            <p className="text-xs text-slate-400">
              Spatial visualization of precipitation, temperatures, wind vectors, and hazard zones
            </p>
          </div>
        </div>

        <div className="w-full sm:w-80">
          <LocationBar />
        </div>
      </div>

      {/* Full-Screen Weather Map Component */}
      <WeatherMap height="600px" />

      {/* Map Information Banner */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-3 text-xs text-slate-300">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-semibold text-slate-200">GIS Layer Details:</span>
          <p className="leading-relaxed text-slate-400">
            Base map tiles provided by OpenStreetMap. Meteorological layers simulated with Open-Meteo spatial coordinates. Disaster hazard zones represent active prototype alert coordinates for testing spatial warning dissemination.
          </p>
        </div>
      </div>
    </div>
  );
};
