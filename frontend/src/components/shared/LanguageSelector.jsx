import React, { useState, useRef, useEffect } from 'react';
import { Languages, ChevronDown, Check } from 'lucide-react';
import useStore from '../../store/useStore';
import { INDIAN_LANGUAGES } from '../../utils/weatherUtils';
import i18n from '../../i18n';

export const LanguageSelector = ({ variant = 'default' }) => {
  const currentLang = useStore((state) => state.language);
  const setLanguage = useStore((state) => state.setLanguage);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedObj = INDIAN_LANGUAGES.find((l) => l.code === currentLang) || INDIAN_LANGUAGES[0];

  const handleSelect = (code) => {
    setLanguage(code);
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700/80 bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 text-sm font-medium transition-all shadow-sm ${
          isOpen ? 'ring-2 ring-cyan-400/50 border-cyan-400' : ''
        }`}
        title="Change Language (भाषा बदलें)"
      >
        <Languages className="w-4 h-4 text-cyan-400" />
        <span className="hidden sm:inline">{selectedObj.native}</span>
        <span className="sm:hidden uppercase text-xs">{selectedObj.code}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-900 border border-slate-700/90 shadow-2xl shadow-black/80 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 backdrop-blur-md">
          <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
            Select Language (भाषा)
          </div>
          <div className="max-h-60 overflow-y-auto py-1">
            {INDIAN_LANGUAGES.map((lang) => {
              const isSelected = lang.code === currentLang;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm text-left hover:bg-slate-800/90 transition-colors ${
                    isSelected ? 'bg-cyan-950/40 text-cyan-400 font-semibold' : 'text-slate-300'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm">{lang.native}</span>
                    <span className="text-[11px] text-slate-500">{lang.name}</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
