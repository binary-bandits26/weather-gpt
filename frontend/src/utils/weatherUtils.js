// Weather & Meteorological Utility Functions for WeatherGPT (MoES / IMD)

export const SEVERITY_COLORS = {
  red: {
    bg: 'bg-red-500/15',
    border: 'border-red-500/50',
    text: 'text-red-400',
    badge: 'bg-red-500 text-white',
    glow: 'shadow-[0_0_20px_rgba(239,68,68,0.3)]',
    label: 'Red Warning (Take Action)',
    description: 'Extremely severe weather condition. High risk to life and property.',
  },
  orange: {
    bg: 'bg-amber-500/15',
    border: 'border-amber-500/50',
    text: 'text-amber-400',
    badge: 'bg-amber-500 text-slate-900 font-bold',
    glow: 'shadow-[0_0_20px_rgba(245,158,11,0.3)]',
    label: 'Orange Alert (Be Prepared)',
    description: 'Severe weather condition. Disruptions to transport, power, agriculture likely.',
  },
  yellow: {
    bg: 'bg-yellow-500/15',
    border: 'border-yellow-500/50',
    text: 'text-yellow-300',
    badge: 'bg-yellow-400 text-slate-900 font-bold',
    glow: 'shadow-[0_0_15px_rgba(250,204,21,0.2)]',
    label: 'Yellow Watch (Be Aware)',
    description: 'Moderately bad weather. Keep track of updates.',
  },
  green: {
    bg: 'bg-emerald-500/15',
    border: 'border-emerald-500/50',
    text: 'text-emerald-400',
    badge: 'bg-emerald-500 text-white',
    glow: 'shadow-[0_0_15px_rgba(16,185,129,0.2)]',
    label: 'Green (No Warning)',
    description: 'Normal weather condition. No adverse weather anticipated.',
  },
};

export const WMO_WEATHER_CODES = {
  0: { label: 'Clear Sky', icon: 'Sun', color: 'text-amber-400', bg: 'from-blue-600/30 to-amber-500/20' },
  1: { label: 'Mainly Clear', icon: 'SunMedium', color: 'text-amber-300', bg: 'from-blue-600/30 to-amber-400/20' },
  2: { label: 'Partly Cloudy', icon: 'CloudSun', color: 'text-cyan-300', bg: 'from-slate-700/40 to-blue-600/20' },
  3: { label: 'Overcast', icon: 'Cloud', color: 'text-slate-300', bg: 'from-slate-800/60 to-slate-700/40' },
  45: { label: 'Foggy', icon: 'CloudFog', color: 'text-slate-400', bg: 'from-slate-800/60 to-slate-600/30' },
  48: { label: 'Depositing Rime Fog', icon: 'CloudFog', color: 'text-slate-400', bg: 'from-slate-800/60 to-slate-600/30' },
  51: { label: 'Light Drizzle', icon: 'CloudDrizzle', color: 'text-cyan-400', bg: 'from-blue-900/50 to-slate-800/50' },
  53: { label: 'Moderate Drizzle', icon: 'CloudDrizzle', color: 'text-cyan-400', bg: 'from-blue-900/60 to-slate-800/50' },
  55: { label: 'Dense Drizzle', icon: 'CloudRain', color: 'text-blue-400', bg: 'from-blue-900/70 to-slate-800/60' },
  61: { label: 'Slight Rain', icon: 'CloudRain', color: 'text-blue-400', bg: 'from-blue-950/70 to-slate-900/60' },
  63: { label: 'Moderate Rain', icon: 'CloudRain', color: 'text-blue-400', bg: 'from-blue-950/80 to-slate-900/70' },
  65: { label: 'Heavy Rain', icon: 'CloudRainWind', color: 'text-blue-500', bg: 'from-blue-950/90 to-indigo-950/80' },
  71: { label: 'Slight Snow', icon: 'CloudSnow', color: 'text-blue-200', bg: 'from-slate-800/60 to-blue-900/40' },
  73: { label: 'Moderate Snow', icon: 'CloudSnow', color: 'text-blue-100', bg: 'from-slate-800/70 to-blue-900/50' },
  75: { label: 'Heavy Snow', icon: 'Snowflake', color: 'text-white', bg: 'from-slate-900/80 to-blue-950/60' },
  80: { label: 'Slight Rain Showers', icon: 'CloudRain', color: 'text-cyan-400', bg: 'from-blue-900/60 to-slate-900/50' },
  81: { label: 'Moderate Rain Showers', icon: 'CloudRainWind', color: 'text-blue-400', bg: 'from-blue-950/70 to-slate-900/60' },
  82: { label: 'Violent Rain Showers', icon: 'CloudLightning', color: 'text-indigo-400', bg: 'from-indigo-950/90 to-slate-950/90' },
  95: { label: 'Thunderstorm', icon: 'CloudLightning', color: 'text-amber-400', bg: 'from-purple-950/80 to-slate-950/90' },
  96: { label: 'Thunderstorm with Slight Hail', icon: 'CloudHail', color: 'text-amber-500', bg: 'from-purple-950/90 to-slate-950/90' },
  99: { label: 'Severe Thunderstorm & Heavy Hail', icon: 'CloudHail', color: 'text-red-400', bg: 'from-red-950/80 to-slate-950/90' },
};

export const getWmoInfo = (code) => {
  return WMO_WEATHER_CODES[code] || {
    label: 'Clear / Variable',
    icon: 'Sun',
    color: 'text-amber-400',
    bg: 'from-blue-600/30 to-slate-800/40',
  };
};

export const getAQIInfo = (aqi) => {
  if (aqi <= 50) return { label: 'Good', color: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-500/40', desc: 'Air quality is satisfactory.' };
  if (aqi <= 100) return { label: 'Moderate', color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/40', desc: 'Acceptable; sensitive individuals should take caution.' };
  if (aqi <= 150) return { label: 'Unhealthy for Sensitive Groups', color: 'text-amber-400', bg: 'bg-amber-500/20', border: 'border-amber-500/40', desc: 'General public not likely affected; sensitive groups at risk.' };
  if (aqi <= 200) return { label: 'Unhealthy', color: 'text-orange-500', bg: 'bg-orange-500/20', border: 'border-orange-500/40', desc: 'Everyone may begin to experience health effects.' };
  if (aqi <= 300) return { label: 'Very Unhealthy', color: 'text-red-500', bg: 'bg-red-500/20', border: 'border-red-500/40', desc: 'Health alert: risk of more serious health effects.' };
  return { label: 'Hazardous (Severe)', color: 'text-purple-400', bg: 'bg-purple-500/20', border: 'border-purple-500/40', desc: 'Emergency conditions: everyone is more likely to be affected.' };
};

export const getUVInfo = (uv) => {
  if (uv < 3) return { label: 'Low', color: 'text-emerald-400', advice: 'No protection needed.' };
  if (uv < 6) return { label: 'Moderate', color: 'text-yellow-400', advice: 'Wear sunglasses, use SPF 30+.' };
  if (uv < 8) return { label: 'High', color: 'text-amber-400', advice: 'Cover up, seek shade during midday.' };
  if (uv < 11) return { label: 'Very High', color: 'text-orange-500', advice: 'Avoid sun between 11 AM - 4 PM.' };
  return { label: 'Extreme', color: 'text-red-500', advice: 'Take full precautions, skin burns quickly.' };
};

export const INDIAN_LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', speechCode: 'en-IN' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', speechCode: 'hi-IN' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', speechCode: 'bn-IN' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', speechCode: 'ta-IN' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', speechCode: 'te-IN' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', speechCode: 'mr-IN' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', speechCode: 'gu-IN' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', speechCode: 'pa-IN' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ', speechCode: 'or-IN' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', speechCode: 'kn-IN' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', speechCode: 'ml-IN' },
];

export const POPULAR_INDIAN_CITIES = [
  { name: 'New Delhi', state: 'Delhi', lat: 28.6139, lon: 77.2090 },
  { name: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lon: 72.8777 },
  { name: 'Bengaluru', state: 'Karnataka', lat: 12.9716, lon: 77.5946 },
  { name: 'Kolkata', state: 'West Bengal', lat: 22.5726, lon: 88.3639 },
  { name: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lon: 80.2707 },
  { name: 'Hyderabad', state: 'Telangana', lat: 17.3850, lon: 78.4867 },
  { name: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lon: 72.5714 },
  { name: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lon: 75.7873 },
  { name: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8467, lon: 80.9462 },
  { name: 'Patna', state: 'Bihar', lat: 25.5941, lon: 85.1376 },
  { name: 'Bhubaneswar', state: 'Odisha', lat: 20.2961, lon: 85.8245 },
  { name: 'Guwahati', state: 'Assam', lat: 26.1445, lon: 91.7362 },
  { name: 'Shimla', state: 'Himachal Pradesh', lat: 31.1048, lon: 77.1734 },
  { name: 'Srinagar', state: 'Jammu & Kashmir', lat: 34.0837, lon: 74.7973 },
  { name: 'Kochi', state: 'Kerala', lat: 9.9312, lon: 76.2673 },
  { name: 'Visakhapatnam', state: 'Andhra Pradesh', lat: 17.6868, lon: 83.2185 },
];
