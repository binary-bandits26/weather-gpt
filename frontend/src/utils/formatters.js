// Formatting Helpers for WeatherGPT

export const formatTemperature = (celsius, unit = 'metric') => {
  if (celsius === null || celsius === undefined || isNaN(celsius)) return '--';
  if (unit === 'imperial') {
    const fahrenheit = (celsius * 9) / 5 + 32;
    return `${Math.round(fahrenheit)}°F`;
  }
  return `${Math.round(celsius)}°C`;
};

export const formatWindSpeed = (kmh, unit = 'metric') => {
  if (kmh === null || kmh === undefined || isNaN(kmh)) return '--';
  if (unit === 'imperial') {
    const mph = kmh * 0.621371;
    return `${Math.round(mph)} mph`;
  }
  return `${Math.round(kmh)} km/h`;
};

export const formatPressure = (hpa) => {
  if (!hpa) return '--';
  return `${Math.round(hpa)} hPa`;
};

export const formatVisibility = (meters) => {
  if (!meters) return '--';
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(1)} km`;
  }
  return `${Math.round(meters)} m`;
};

export const formatRainfall = (mm) => {
  if (mm === undefined || mm === null) return '0 mm';
  return `${Number(mm).toFixed(1)} mm`;
};

export const formatDayName = (dateStr, locale = 'en-US', short = false) => {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString(locale, { weekday: short ? 'short' : 'long' });
  } catch {
    return dateStr;
  }
};

export const formatDateFull = (dateStr, locale = 'en-US') => {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
};

export const formatTime = (isoString, locale = 'en-US') => {
  try {
    const d = new Date(isoString);
    return d.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return isoString;
  }
};
