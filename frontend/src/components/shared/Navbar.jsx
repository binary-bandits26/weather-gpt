import { Link, useLocation } from 'react-router-dom';
import {
  CloudLightning,
  LayoutDashboard,
  Map as MapIcon,
  ShieldAlert,
  TrendingUp,
  Sprout,
  Settings,
  Bell,
  MapPin,
} from 'lucide-react';
import useStore from '../../store/useStore';
import { LanguageSelector } from './LanguageSelector';
import { useTranslation } from 'react-i18next';

export const Navbar = () => {
  const { t } = useTranslation();
  const location = useStore((state) => state.location);
  const alerts = useStore((state) => state.alerts);
  const currentPath = useLocation().pathname;

  const redAlertCount = (alerts || []).filter((a) => a.severity === 'red').length;

  const navLinks = [
    { path: '/', label: 'Overview', icon: LayoutDashboard },
    { path: '/map', label: 'Weather Map', icon: MapIcon },
    { path: '/alerts', label: 'Alerts', icon: ShieldAlert, badge: redAlertCount },
    { path: '/advisories', label: 'Advisories', icon: Sprout },
    { path: '/climate', label: 'Climate', icon: TrendingUp },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand & Prototype Tag */}
        <div className="flex items-center gap-3 shrink-0">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-md shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition-all">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <CloudLightning className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base sm:text-lg tracking-tight text-white">
                  Weather<span className="text-cyan-400">GPT</span>
                </span>
                <span className="px-1.5 py-0.2 text-[9px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded uppercase tracking-wider hidden sm:inline-block">
                  SIH Prototype
                </span>
              </div>
              <span className="text-[10px] text-slate-400 hidden sm:block">
                Powered by Open-Meteo API
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentPath === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{link.label}</span>

                {Boolean(link.badge) && (
                  <span className="ml-1 px-1.5 py-0.2 bg-red-500 text-white rounded-full text-[9px] font-bold">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Location Badge + Language + Alert Bell */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Station Pill */}
          <Link
            to="/map"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 transition"
            title="View current location on map"
          >
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span className="max-w-[110px] truncate font-medium">{location?.city || 'Delhi'}</span>
          </Link>

          {/* Multilingual Selector */}
          <LanguageSelector />

          {/* Alert Bell */}
          <Link
            to="/alerts"
            className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 hover:bg-slate-800 transition"
            title="Active Disaster Alerts"
          >
            <Bell className="w-4 h-4 text-amber-400" />
            {(alerts || []).length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                {(alerts || []).length}
              </span>
            )}
          </Link>
        </div>

      </div>
    </header>
  );
};
