import { SectorAdvisories } from '../components/dashboard/SectorAdvisories';
import { LocationBar } from '../components/shared/LocationBar';
import { useWeather } from '../hooks/useWeather';
import { Sprout } from 'lucide-react';

export const Advisories = () => {
  const { location, currentWeather } = useWeather();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-20 md:pb-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/50 via-slate-900 to-cyan-950/40 border border-emerald-500/30 shadow-xl space-y-2">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Sprout className="w-4 h-4" />
          <span>Sector Decision Support (Prototype Demonstrator)</span>
        </div>
        <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
          Agromet & Sector-Specific Advisories
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
          Actionable weather decision support for farmers, agricultural extension workers, commercial aviation operators, coastal fishermen, and municipal urban resilience teams.
        </p>
      </div>

      {/* Location Selector */}
      <div className="max-w-md">
        <LocationBar />
      </div>

      {/* Sector Advisories Component */}
      <SectorAdvisories location={location} currentWeather={currentWeather} />
    </div>
  );
};
