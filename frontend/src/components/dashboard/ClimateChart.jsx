import { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import { TrendingUp } from 'lucide-react';

export const ClimateChart = ({ data = [] }) => {
  const [chartType, setChartType] = useState('both'); // 'temp' | 'rain' | 'both'

  if (!data || data.length === 0) return null;

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-700/80 p-5 shadow-xl backdrop-blur-xl space-y-4">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Historical Climate Trends & Seasonal Rainfall
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            12-Month Climatological Trend vs 30-Year Normal Baseline
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 p-1 bg-slate-950/80 rounded-xl border border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => setChartType('both')}
            className={`px-2.5 py-1 rounded-lg font-medium transition ${
              chartType === 'both'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Combined
          </button>

          <button
            type="button"
            onClick={() => setChartType('temp')}
            className={`px-2.5 py-1 rounded-lg font-medium transition ${
              chartType === 'temp'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Temperature
          </button>

          <button
            type="button"
            onClick={() => setChartType('rain')}
            className={`px-2.5 py-1 rounded-lg font-medium transition ${
              chartType === 'rain'
                ? 'bg-blue-500 text-white font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Rainfall
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-72 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="month" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <YAxis
              yAxisId="temp"
              orientation="left"
              stroke="#f59e0b"
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              unit="°C"
            />
            <YAxis
              yAxisId="rain"
              orientation="right"
              stroke="#38bdf8"
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              unit="mm"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#334155',
                borderRadius: '10px',
                color: '#f8fafc',
                fontSize: '11px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />

            {(chartType === 'rain' || chartType === 'both') && (
              <>
                <Bar
                  yAxisId="rain"
                  dataKey="rainfall"
                  name="Monthly Rainfall (mm)"
                  fill="#0284c7"
                  radius={[4, 4, 0, 0]}
                  opacity={0.85}
                />
                <Bar
                  yAxisId="rain"
                  dataKey="historicalAvgRain"
                  name="30-Yr Normal Rainfall (mm)"
                  fill="#475569"
                  radius={[4, 4, 0, 0]}
                  opacity={0.4}
                />
              </>
            )}

            {(chartType === 'temp' || chartType === 'both') && (
              <>
                <Line
                  yAxisId="temp"
                  type="monotone"
                  dataKey="avgMaxTemp"
                  name="Avg Max Temp (°C)"
                  stroke="#ef4444"
                  strokeWidth={2.5}
                  dot={{ r: 3.5, fill: '#ef4444' }}
                />
                <Line
                  yAxisId="temp"
                  type="monotone"
                  dataKey="avgMinTemp"
                  name="Avg Min Temp (°C)"
                  stroke="#38bdf8"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={{ r: 3, fill: '#38bdf8' }}
                />
              </>
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Climate Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs text-slate-300">
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
          <span className="font-bold text-amber-400 block mb-0.5">🌡️ Thermal Pattern:</span>
          Summer peak reaches ~40.5°C in May. Winter minimum records ~7.5°C in January.
        </div>
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
          <span className="font-bold text-cyan-400 block mb-0.5">🌧️ Monsoon Distribution:</span>
          July & August account for peak seasonal precipitation (cumulative ~505 mm).
        </div>
      </div>
    </div>
  );
};
