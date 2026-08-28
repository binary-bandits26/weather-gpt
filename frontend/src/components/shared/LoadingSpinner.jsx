import React from 'react';
import { CloudRain, Compass } from 'lucide-react';

export const LoadingSpinner = ({ text = 'Retrieving Meteorological NWP Intelligence...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center animate-fade-in">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-2 border-cyan-400/20 border-t-cyan-400 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <CloudRain className="w-6 h-6 text-cyan-300 animate-bounce" />
        </div>
      </div>
      <p className="mt-4 text-sm font-medium text-slate-300 tracking-wide">{text}</p>
      <p className="mt-1 text-xs text-slate-500">Connecting to IMD Observation Feeds & NWP Models</p>
    </div>
  );
};
