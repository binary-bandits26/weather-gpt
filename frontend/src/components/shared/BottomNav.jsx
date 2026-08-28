import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Map,
  ShieldAlert,
  Sprout,
  TrendingUp,
  Settings,
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Home' },
  { to: '/map', icon: Map, label: 'Map' },
  { to: '/alerts', icon: ShieldAlert, label: 'Alerts' },
  { to: '/advisories', icon: Sprout, label: 'Advisory' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 border-t border-slate-800/80 backdrop-blur-xl">
      <div className="flex items-stretch justify-around h-14">
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
          return (
            <NavLink
              key={to}
              to={to}
              className={`flex flex-col items-center justify-center flex-1 gap-0.5 text-[10px] font-semibold transition-all ${
                isActive
                  ? 'text-cyan-400'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : ''}`} />
              <span>{label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
