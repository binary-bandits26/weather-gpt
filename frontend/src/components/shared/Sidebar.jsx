import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  MessageSquare,
  LayoutDashboard,
  ShieldAlert,
  Sprout,
  TrendingUp,
  Settings,
  PhoneCall,
  Activity,
  MapPin,
  X,
  ExternalLink,
} from 'lucide-react';
import useStore from '../../store/useStore';
import { POPULAR_INDIAN_CITIES } from '../../utils/weatherUtils';

export const Sidebar = () => {
  const sidebarOpen = useStore((state) => state.sidebarOpen);
  const setSidebarOpen = useStore((state) => state.setSidebarOpen);
  const location = useStore((state) => state.location);
  const setLocation = useStore((state) => state.setLocation);
  const currentPath = useLocation().pathname;

  const links = [
    { path: '/chat', label: 'Conversational WeatherGPT', icon: MessageSquare },
    { path: '/dashboard', label: 'Live NWP Dashboard', icon: LayoutDashboard },
    { path: '/alerts', label: 'Disaster Early Warnings', icon: ShieldAlert },
    { path: '/advisories', label: 'Agromet & Sector Advisories', icon: Sprout },
    { path: '/climate', label: 'Climate Trends & Monsoon', icon: TrendingUp },
    { path: '/settings', label: 'System Configuration', icon: Settings },
  ];

  const handleCitySelect = (c) => {
    setLocation({
      city: c.name,
      state: c.state,
      country: 'India',
      lat: c.lat,
      lon: c.lon,
    });
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-72 bg-slate-950/95 border-r border-slate-800/80 p-4 z-50 flex flex-col justify-between transform transition-transform duration-300 ease-in-out backdrop-blur-2xl ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:hidden'
        }`}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <span className="font-bold text-lg text-white">Weather<span className="text-cyan-400">GPT</span></span>
              <p className="text-[11px] text-slate-400">MoES / IMD Portal</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="mt-4 space-y-1">
            <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Navigation
            </div>
            {links.map((link) => {
              const Icon = link.icon;
              const active = currentPath === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Quick Major Cities */}
          <div className="mt-6">
            <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Switch Met Station
            </div>
            <div className="mt-1 grid grid-cols-2 gap-1 max-h-40 overflow-y-auto">
              {POPULAR_INDIAN_CITIES.slice(0, 8).map((city) => (
                <button
                  key={city.name}
                  type="button"
                  onClick={() => handleCitySelect(city)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-left transition ${
                    location?.city === city.name
                      ? 'bg-cyan-950/60 text-cyan-400 font-semibold border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span className="truncate">{city.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer & Disaster Emergency Helplines */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/30">
            <div className="flex items-center gap-2 text-red-400 text-xs font-bold">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>National Disaster SOS</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-300">
              National Emergency: <strong className="text-white">112</strong><br />
              NDRF Disaster Helpline: <strong className="text-white">1070 / 1077</strong>
            </p>
          </div>

          {/* NWP Telemetry Status */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>NWP (GFS/WRF) Active</span>
            </div>
            <span className="text-slate-500">v2.4.0</span>
          </div>
        </div>
      </aside>
    </>
  );
};
