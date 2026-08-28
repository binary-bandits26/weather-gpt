import { useMemo, useState } from 'react';
import { BrowserRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import {
  AlertTriangle, Bot, CalendarDays, ChevronRight, Cloud, CloudRain,
  Droplets, Gauge, Home, Map, Menu, MessageCircle, Navigation,
  Search, Settings, ShieldCheck, Sun, Thermometer, Wind, X
} from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: Home },
  { to: '/assistant', label: 'Chat', icon: MessageCircle },
  { to: '/alerts', label: 'Alerts', icon: AlertTriangle },
];

const weather = {
  city: 'New Delhi', country: 'India', temp: 32, feels: 34, condition: 'Partly Cloudy', humidity: 58,
  wind: 14, rain: 24, pressure: 1012, visibility: 8, uv: 6,
};

const hourly = [
  ['10 AM', '☀️', 29], ['12 PM', '🌤️', 31], ['2 PM', '🌤️', 32], ['4 PM', '🌧️', 31], ['6 PM', '🌧️', 29], ['8 PM', '☁️', 27],
];

const daily = [
  ['Thu', '🌤️', 32, 25], ['Fri', '🌧️', 30, 24], ['Sat', '☁️', 31, 24], ['Sun', '☀️', 34, 25], ['Mon', '☀️', 35, 26], ['Tue', '🌤️', 33, 25], ['Wed', '🌧️', 31, 24],
];

const alerts = [
  { level: 'Warning', color: 'orange', title: 'Heavy rainfall possible', area: 'New Delhi', time: 'Today · 4 PM – 8 PM', text: 'Carry rain protection and avoid waterlogged roads.' },
  { level: 'Advisory', color: 'yellow', title: 'High afternoon temperature', area: 'Delhi NCR', time: 'Today · 12 PM – 4 PM', text: 'Stay hydrated and limit prolonged outdoor activity.' },
];

function Shell({ children }) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <NavLink to="/" className="flex shrink-0 items-center gap-2.5 font-bold tracking-tight text-slate-900">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600 text-white shadow-sm"><Cloud size={20} /></span>
            <span>Weather<span className="text-blue-600">GPT</span></span>
          </NavLink>

          <nav aria-label="Primary navigation" className="flex flex-1 items-center justify-center gap-1 sm:gap-2">
            {navItems.map((item) => (
              <NavItem key={item.to} {...item} />
            ))}
          </nav>

          <NavLink to="/alerts" aria-label="Alerts" className="rounded-xl border border-slate-200 bg-white p-2 text-amber-500 hover:bg-slate-50">
            <AlertTriangle size={19} />
          </NavLink>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</div>
      </main>
    </div>
  );
}
function NavItem({ to, label, icon: Icon, onClick }) {
  return <NavLink to={to} onClick={onClick} end={to === '/'} className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}><Icon size={18} />{label}</NavLink>;
}

function PageHeader({ title, subtitle, action }) {
  return <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{title}</h1><p className="mt-1 text-sm text-slate-500">{subtitle}</p></div>{action}</div>;
}

function Card({ children, className = '' }) { return <section className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}>{children}</section>; }
function Metric({ icon: Icon, label, value, unit }) { return <div className="rounded-xl border border-slate-200 p-4"><div className="mb-3 flex items-center gap-2 text-xs font-medium text-slate-500"><Icon size={16} />{label}</div><div className="text-xl font-bold text-slate-900">{value}<span className="ml-1 text-sm font-medium text-slate-500">{unit}</span></div></div>; }

function CurrentWeather({ compact = false }) {
  return <Card className={compact ? '' : 'overflow-hidden'}><div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between"><div><div className="flex items-center gap-2 text-sm font-medium text-slate-500"><Navigation size={15} />{weather.city}, {weather.country}</div><div className="mt-2 flex items-center gap-4"><span className="text-6xl">🌤️</span><div><div className="text-5xl font-bold tracking-tight">{weather.temp}°</div><div className="text-sm text-slate-600">{weather.condition}</div></div></div><p className="mt-3 text-xs text-slate-400">Feels like {weather.feels}° · Demo data</p></div><div className="grid grid-cols-2 gap-3 sm:w-64"><Metric icon={Droplets} label="Humidity" value={weather.humidity} unit="%" /><Metric icon={Wind} label="Wind" value={weather.wind} unit="km/h" /></div></div></Card>;
}

function Dashboard() {
  return <><PageHeader title="Good evening" subtitle="A simple overview of current weather and important alerts." /><div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]"><CurrentWeather /><AlertSummary /></div><div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Metric icon={Droplets} label="Rain chance" value={weather.rain} unit="%" /><Metric icon={Gauge} label="Pressure" value={weather.pressure} unit="hPa" /><Metric icon={Sun} label="UV index" value={weather.uv} unit="" /><Metric icon={Navigation} label="Visibility" value={weather.visibility} unit="km" /></div><div className="mt-5 grid gap-5 lg:grid-cols-[1.5fr_1fr]"><Hourly /><MiniMap /><Card className="lg:col-span-2"><div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"><div><div className="flex items-center gap-2 font-semibold"><Bot size={19} className="text-blue-600" /> Ask WeatherGPT</div><p className="mt-1 text-sm text-slate-500">Get a simple explanation about today's weather.</p></div><NavLink to="/assistant" className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">Open assistant <ChevronRight size={16} /></NavLink></div></Card></div></>;
}

function AlertSummary() { const a = alerts[0]; return <Card><div className="border-b border-slate-100 p-5"><div className="flex items-center justify-between"><div className="flex items-center gap-2 text-sm font-semibold"><AlertTriangle size={18} className="text-orange-500" /> Important alert</div><span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-700">{a.level}</span></div><h2 className="mt-5 text-xl font-bold">{a.title}</h2><p className="mt-1 text-sm text-slate-500">{a.area} · {a.time}</p><p className="mt-4 text-sm leading-6 text-slate-600">{a.text}</p></div><NavLink to="/alerts" className="flex items-center justify-between p-4 text-sm font-semibold text-blue-600 hover:bg-slate-50">View all alerts <ChevronRight size={16} /></NavLink></Card>; }
function Hourly() { return <Card><div className="border-b border-slate-100 p-5"><h2 className="font-semibold">Today's forecast</h2><p className="mt-1 text-xs text-slate-400">Hourly overview</p></div><div className="grid grid-cols-3 gap-2 p-4 sm:grid-cols-6">{hourly.map(([time, icon, temp]) => <div key={time} className="rounded-xl bg-slate-50 p-3 text-center"><div className="text-xs text-slate-500">{time}</div><div className="my-2 text-2xl">{icon}</div><div className="font-semibold">{temp}°</div></div>)}</div></Card>; }
function MiniMap() { return <Card className="min-h-[260px] overflow-hidden"><div className="flex h-full min-h-[260px] flex-col"><div className="border-b border-slate-100 p-5"><h2 className="font-semibold">Weather map</h2><p className="mt-1 text-xs text-slate-400">Prototype map preview</p></div><div className="relative flex flex-1 items-center justify-center bg-sky-50"><div className="absolute h-44 w-36 rotate-12 rounded-[45%] border-2 border-blue-200 bg-white/70" /><div className="relative grid place-items-center rounded-full bg-blue-600 p-3 text-white shadow-lg"><Navigation size={20} /></div><span className="absolute bottom-4 text-xs text-slate-500">New Delhi</span></div></div></Card>; }

function Weather() { return <><PageHeader title="Weather" subtitle="Current conditions for your selected location." action={<button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold hover:bg-slate-50"><Navigation size={16} /> Use my location</button>} /><div className="max-w-3xl"><CurrentWeather /><div className="mt-5 grid gap-4 sm:grid-cols-2"><Metric icon={Droplets} label="Humidity" value={weather.humidity} unit="%" /><Metric icon={Wind} label="Wind speed" value={weather.wind} unit="km/h" /><Metric icon={Gauge} label="Pressure" value={weather.pressure} unit="hPa" /><Metric icon={Sun} label="UV index" value={weather.uv} unit="" /></div></div></>; }

function Forecast() { return <><PageHeader title="Forecast" subtitle="Seven-day outlook for New Delhi." /><Card><div className="divide-y divide-slate-100">{daily.map(([day, icon, high, low]) => <div key={day} className="flex items-center gap-4 p-4 sm:p-5"><div className="w-12 font-semibold">{day}</div><div className="text-2xl">{icon}</div><div className="flex-1 text-sm text-slate-600">{day === 'Thu' ? 'Partly cloudy' : day === 'Fri' || day === 'Wed' ? 'Chance of rain' : 'Mostly clear'}</div><div className="font-semibold">{high}° <span className="font-normal text-slate-400">/ {low}°</span></div></div>)}</div></Card></>; }

function MapPage() { return <><PageHeader title="Weather Map" subtitle="A simple visual view of weather conditions." /><Card className="overflow-hidden"><div className="flex min-h-[520px] flex-col bg-sky-50 sm:flex-row"><div className="order-2 w-full border-t border-slate-200 bg-white p-5 sm:order-1 sm:w-60 sm:border-r sm:border-t-0"><h2 className="font-semibold">Map layers</h2><div className="mt-4 space-y-2">{['Temperature', 'Rainfall', 'Wind', 'Alerts'].map((x, i) => <button key={x} className={`w-full rounded-lg px-3 py-2 text-left text-sm ${i === 0 ? 'bg-blue-50 font-semibold text-blue-700' : 'hover:bg-slate-50'}`}>{x}</button>)}</div></div><div className="relative order-1 flex flex-1 items-center justify-center overflow-hidden sm:order-2"><div className="absolute h-[360px] w-[280px] rotate-12 rounded-[48%] border-4 border-blue-200 bg-white/60" /><div className="absolute left-[45%] top-[42%] h-4 w-4 rounded-full bg-red-500 ring-8 ring-red-100" /><div className="absolute left-[42%] top-[55%] h-4 w-4 rounded-full bg-blue-500 ring-8 ring-blue-100" /><div className="relative rounded-xl bg-white px-4 py-3 text-center shadow-sm"><Map className="mx-auto mb-2 text-blue-600" size={28} /><div className="font-semibold">India weather map</div><div className="mt-1 text-xs text-slate-500">Prototype visualization</div></div></div></div></Card></>; }

function AlertsPage() { return <><PageHeader title="Weather Alerts" subtitle="Important warnings and advisories for the selected region." /><div className="mb-5 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800"><ShieldCheck className="mr-2 inline" size={17} /> Demo alerts are shown temporarily. Official alert feeds can be connected later.</div><div className="space-y-4">{alerts.map((a) => <Card key={a.title}><div className="p-5 sm:p-6"><div className="flex flex-wrap items-center justify-between gap-3"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${a.color === 'orange' ? 'bg-orange-50 text-orange-700' : 'bg-yellow-50 text-yellow-700'}`}>{a.level}</span><span className="text-xs text-slate-400">{a.time}</span></div><h2 className="mt-4 text-lg font-bold">{a.title}</h2><p className="mt-1 text-sm text-slate-500">{a.area}</p><p className="mt-4 text-sm leading-6 text-slate-600">{a.text}</p></div></Card>)}</div></>; }

function Assistant() {
  const [messages, setMessages] = useState([{ from: 'ai', text: 'Hi! I can help you understand the weather. Try asking “Will it rain today?”' }]);
  const [input, setInput] = useState('');
  const suggestions = ['Will it rain today?', 'Is it safe to travel?', 'What is the temperature?'];
  const send = (text = input) => { const q = text.trim(); if (!q) return; setMessages((m) => [...m, { from: 'user', text: q }, { from: 'ai', text: q.toLowerCase().includes('rain') ? 'There is a 24% chance of rain today, with a higher possibility during the evening.' : 'Current conditions in New Delhi are 32°C and partly cloudy. This is demo data for the temporary frontend.' }]); setInput(''); };
  return <><PageHeader title="WeatherGPT" subtitle="A simple weather assistant interface, ready for future AI integration." /><Card className="mx-auto flex min-h-[620px] max-w-4xl flex-col"><div className="border-b border-slate-100 p-5"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-white"><Bot size={21} /></div><div><div className="font-semibold">WeatherGPT Assistant</div><div className="text-xs text-slate-400">Temporary demo mode</div></div></div></div><div className="flex-1 space-y-4 overflow-auto p-5">{messages.length === 1 && <div className="mx-auto max-w-xl py-10 text-center"><div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-blue-600"><MessageCircle /></div><h2 className="mt-4 text-xl font-bold">Ask about the weather</h2><p className="mt-2 text-sm text-slate-500">Choose a question or type your own below.</p><div className="mt-5 flex flex-wrap justify-center gap-2">{suggestions.map((s) => <button key={s} onClick={() => send(s)} className="rounded-full border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50">{s}</button>)}</div></div>}{messages.map((m, i) => <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${m.from === 'user' ? 'rounded-br-md bg-blue-600 text-white' : 'rounded-bl-md bg-slate-100 text-slate-700'}`}>{m.text}</div></div>)}</div><form onSubmit={(e) => { e.preventDefault(); send(); }} className="border-t border-slate-100 p-4"><div className="flex gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1.5 focus-within:border-blue-400 focus-within:bg-white"><input value={input} onChange={(e) => setInput(e.target.value)} className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none" placeholder="Ask WeatherGPT..." /><button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Send</button></div></form></Card></>;
}

function App() {
  return <BrowserRouter><Shell><Routes><Route path="/" element={<Dashboard />} /><Route path="/weather" element={<Weather />} /><Route path="/assistant" element={<Assistant />} /><Route path="/forecast" element={<Forecast />} /><Route path="/map" element={<MapPage />} /><Route path="/alerts" element={<AlertsPage />} /><Route path="*" element={<Dashboard />} /></Routes></Shell></BrowserRouter>;
}

export default App;
