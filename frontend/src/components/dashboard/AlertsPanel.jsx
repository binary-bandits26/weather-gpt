import { useState } from 'react';
import { ShieldAlert, AlertTriangle, Clock, MapPin } from 'lucide-react';
import { SEVERITY_COLORS } from '../../utils/weatherUtils';
import { formatDateFull } from '../../utils/formatters';

export const AlertsPanel = ({ alerts = [] }) => {
  const [selectedSeverity, setSelectedSeverity] = useState('all');

  const filtered = (alerts || []).filter((a) => {
    if (selectedSeverity === 'all') return true;
    return a.severity === selectedSeverity;
  });

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-700/80 p-5 shadow-xl backdrop-blur-xl space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-red-400" />
          <h3 className="text-base font-bold text-white tracking-tight">
            Disaster Early Warnings & Bulletins
          </h3>
        </div>

        {/* Severity Filters */}
        <div className="flex items-center gap-1 p-1 bg-slate-950/80 rounded-xl border border-slate-800 text-xs">
          {['all', 'red', 'orange', 'yellow'].map((sev) => (
            <button
              key={sev}
              type="button"
              onClick={() => setSelectedSeverity(sev)}
              className={`px-2.5 py-1 rounded-lg capitalize font-medium transition ${
                selectedSeverity === sev
                  ? 'bg-slate-700 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {sev === 'all' ? 'All' : sev}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Grid / List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-6 text-center text-slate-400 bg-slate-950/40 rounded-xl border border-slate-800 text-xs">
            No active disaster warnings matching the selected filter.
          </div>
        ) : (
          filtered.map((alert) => {
            const sev = SEVERITY_COLORS[alert.severity] || SEVERITY_COLORS.orange;
            return (
              <div
                key={alert.id}
                className={`p-4 rounded-xl border ${sev.bg} ${sev.border} transition-all space-y-2.5`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${sev.badge}`}>
                        {alert.severity} Alert
                      </span>
                      <span className="text-xs text-slate-300 font-semibold">{alert.category}</span>
                      {alert.isDemo && (
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                          Demo Scenario
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-sm sm:text-base text-white">{alert.title}</h4>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-950/60 px-2.5 py-1 rounded-lg border border-white/5">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    <span>{alert.region}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed bg-slate-950/40 p-3 rounded-lg">
                  {alert.description}
                </p>

                {alert.instructions && (
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-400" />
                      Key Safety Directives:
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-slate-300">
                      {alert.instructions.map((inst, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-cyan-400 font-bold">•</span>
                          <span>{inst}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400">
                  <span>Source: <strong>{alert.source}</strong></span>
                  <div className="flex items-center gap-1 text-slate-300">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    <span>Valid until {formatDateFull(alert.validTill)}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
