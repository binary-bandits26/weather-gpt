import { Link } from 'react-router-dom';
import { CurrentWeather } from '../components/dashboard/CurrentWeather';
import { HourlyForecast } from '../components/dashboard/HourlyForecast';
import { ForecastStrip } from '../components/dashboard/ForecastStrip';
import { WeatherMap } from '../components/dashboard/WeatherMap';
import { LocationBar } from '../components/shared/LocationBar';
import { SkeletonLoader } from '../components/shared/SkeletonLoader';
import { useWeather } from '../hooks/useWeather';
import {
  RefreshCw,
  ArrowRight,
  ShieldAlert,
  Map as MapIcon,
  AlertCircle,
} from 'lucide-react';

export const Dashboard = () => {
  const {
    location,
    currentWeather,
    forecast,
    alerts,
    loading,
    error,
    refreshWeather,
  } = useWeather();

  const redAlerts = (alerts || []).filter((a) => a.severity === 'red');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-20 md:pb-6">
      
      {/* Top Search & Refresh Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-lg">
        <div className="flex-1 max-w-lg">
          <LocationBar />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={refreshWeather}
            disabled={loading}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Extreme Alert Notification Banner if Red Alerts Exist */}
      {redAlerts.length > 0 && (
        <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/40 flex items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-red-500/20 text-red-400 shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase bg-red-500 text-white px-2 py-0.5 rounded">
                  RED ALERT
                </span>
                <h4 className="font-bold text-sm text-white">{redAlerts[0].title}</h4>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">{redAlerts[0].description}</p>
            </div>
          </div>
          <Link
            to="/alerts"
            className="shrink-0 px-3 py-1.5 rounded-xl bg-red-500 text-white text-xs font-bold hover:bg-red-400 transition"
          >
            View Details
          </Link>
        </div>
      )}

      {/* Loading Skeleton vs Error vs Content */}
      {loading && !currentWeather ? (
        <div className="space-y-6">
          <SkeletonLoader type="hero" />
          <SkeletonLoader type="hourly" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SkeletonLoader type="card" />
            <SkeletonLoader type="card" />
          </div>
        </div>
      ) : error ? (
        <div className="p-8 rounded-2xl bg-slate-900/90 border border-slate-800 text-center space-y-3 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Unable to load weather data</h3>
          <p className="text-xs text-slate-400">{error}</p>
          <button
            type="button"
            onClick={refreshWeather}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs transition"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          {/* Current Live Weather Hero */}
          <CurrentWeather data={currentWeather} location={location} />

          {/* 24-Hour Hourly Forecast */}
          <HourlyForecast hourly={forecast?.hourly} />

          {/* 2-Column Grid: 7-Day Forecast & Spatial Weather Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ForecastStrip daily={forecast?.daily} />
            <div className="space-y-3">
              <WeatherMap height="360px" />
              <Link
                to="/map"
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-cyan-300 transition group"
              >
                <span className="flex items-center gap-2">
                  <MapIcon className="w-4 h-4 text-cyan-400" />
                  Open Full Screen Interactive GIS Weather Map
                </span>
                <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
