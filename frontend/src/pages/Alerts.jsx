import { AlertsPanel } from '../components/dashboard/AlertsPanel';
import { WeatherMap } from '../components/dashboard/WeatherMap';
import { useWeather } from '../hooks/useWeather';
import {
  ShieldAlert,
  PhoneCall,
  AlertTriangle,
} from 'lucide-react';

export const Alerts = () => {
  const { alerts } = useWeather();

  const emergencyContacts = [
    { name: 'National Emergency Helpline', number: '112', desc: 'Unified Police, Fire, Ambulance' },
    { name: 'NDRF Control Room (Disaster Response)', number: '1070 / 1078', desc: 'National Disaster Management' },
    { name: 'District Disaster Management (DDMA)', number: '1077', desc: 'Local Administration & Evacuation' },
    { name: 'Weather Information Toll-Free', number: '1800-180-1717', desc: 'Met Intelligence Helpline' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-20 md:pb-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/50 via-slate-900 to-amber-950/40 border border-red-500/30 shadow-xl space-y-2">
        <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4 animate-pulse" />
          <span>Disaster Early Warning System (Prototype Demonstration)</span>
        </div>
        <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
          Extreme Weather & Disaster Alerts
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
          Dissemination of cyclone advisories, flood warnings, squall lines, and severe heatwave bulletins. Prepared for real-time IMD API integration.
        </p>
      </div>

      {/* 2-Column: Alert Feed & Interactive Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AlertsPanel alerts={alerts} />
        <WeatherMap height="480px" />
      </div>

      {/* Citizen Safety & Evacuation Guidelines */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-xl backdrop-blur-xl space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <h3 className="text-base font-bold text-white tracking-tight">
            Citizen Safety Guidelines & Preparedness Checklists
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <h4 className="font-bold text-red-400 text-xs sm:text-sm flex items-center gap-1.5">
              🌀 Cyclone & Surge
            </h4>
            <ul className="space-y-1 list-disc list-inside leading-relaxed text-[11px]">
              <li>Inspect roof structure and secure loose outdoor items.</li>
              <li>Keep battery radio, power banks, and non-perishable food ready.</li>
              <li>Move inland if situated in a low-lying coastal surge zone.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <h4 className="font-bold text-amber-400 text-xs sm:text-sm flex items-center gap-1.5">
              ⚡ Lightning & Squall Lines
            </h4>
            <ul className="space-y-1 list-disc list-inside leading-relaxed text-[11px]">
              <li>Seek shelter inside sturdy pucca buildings or enclosed vehicles.</li>
              <li>Avoid tall isolated trees and open agricultural fields.</li>
              <li>Unplug sensitive electrical equipment during thunderstorms.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <h4 className="font-bold text-orange-400 text-xs sm:text-sm flex items-center gap-1.5">
              🔥 Severe Heatwave
            </h4>
            <ul className="space-y-1 list-disc list-inside leading-relaxed text-[11px]">
              <li>Avoid direct sun exposure between 12:00 noon and 3:30 PM.</li>
              <li>Drink plenty of water, ORS, and fluids frequently.</li>
              <li>Keep cattle in covered shade with adequate drinking water.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Emergency Helpline Directory */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-xl backdrop-blur-xl space-y-3">
        <div className="flex items-center gap-2">
          <PhoneCall className="w-4 h-4 text-cyan-400" />
          <h3 className="text-base font-bold text-white tracking-tight">
            National Emergency Helpline Directory
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {emergencyContacts.map((contact, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1"
            >
              <div className="text-xs text-slate-400 font-medium">{contact.name}</div>
              <div className="text-base font-bold text-white font-mono">{contact.number}</div>
              <div className="text-[10px] text-cyan-400">{contact.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
