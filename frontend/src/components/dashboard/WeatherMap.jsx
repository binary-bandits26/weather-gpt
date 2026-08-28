import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Layers, ShieldAlert, Wind, Thermometer, CloudRain } from 'lucide-react';
import useStore from '../../store/useStore';

// Custom SVG Markers for Leaflet
const createCustomIcon = (color = '#22d3ee', isAlert = false) => {
  return L.divIcon({
    className: 'custom-map-marker',
    html: `
      <div style="
        position: relative;
        width: 26px;
        height: 26px;
        background: ${color};
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 0 ${isAlert ? '12px' : '6px'} ${color};
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="width: 6px; height: 6px; background: white; border-radius: 50%;"></div>
      </div>
    `,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
  });
};

function ChangeMapView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export const WeatherMap = ({ height = '450px' }) => {
  const location = useStore((state) => state.location);
  const [activeLayer, setActiveLayer] = useState('radar'); // 'radar' | 'temp' | 'wind' | 'alerts'

  const centerLat = location?.lat || 20.5937;
  const centerLon = location?.lon || 78.9629;

  // Prototype Alert Hotspots for Testing
  const alertHotspots = [
    {
      id: 'hotspot-1',
      title: 'Cyclonic Storm Scenario (Demo)',
      lat: 19.8135,
      lon: 85.8312,
      severity: 'red',
      radius: 100000,
      desc: 'Simulated cyclonic system tracking along Odisha coast for disaster early warning tests.',
    },
    {
      id: 'hotspot-2',
      title: 'Heatwave Advisory Zone (Demo)',
      lat: 26.9124,
      lon: 70.9000,
      severity: 'orange',
      radius: 140000,
      desc: 'Simulated daytime heatwave (>44°C) with dry westerly winds.',
    },
    {
      id: 'hotspot-3',
      title: 'Thunderstorm Watch Zone (Demo)',
      lat: 22.5726,
      lon: 88.3639,
      severity: 'yellow',
      radius: 75000,
      desc: 'Simulated convective squall line with isolated lightning strikes.',
    },
  ];

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-700/80 p-5 shadow-xl backdrop-blur-xl space-y-3">
      {/* Header & GIS Layers Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <h3 className="text-base font-bold text-white tracking-tight">
            Spatial Weather & Radar Map
          </h3>
        </div>

        {/* Layer Switcher Buttons */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => setActiveLayer('radar')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition ${
              activeLayer === 'radar'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5" />
            <span>Precipitation</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveLayer('temp')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition ${
              activeLayer === 'temp'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Thermometer className="w-3.5 h-3.5" />
            <span>Temperature</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveLayer('wind')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition ${
              activeLayer === 'wind'
                ? 'bg-blue-500 text-white font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wind className="w-3.5 h-3.5" />
            <span>Wind</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveLayer('alerts')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition ${
              activeLayer === 'alerts'
                ? 'bg-red-500 text-white font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Alerts</span>
          </button>
        </div>
      </div>

      {/* Leaflet Map Box */}
      <div
        className="relative w-full rounded-xl overflow-hidden border border-slate-800 z-10"
        style={{ height }}
      >
        <MapContainer
          center={[centerLat, centerLon]}
          zoom={5}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <ChangeMapView center={[centerLat, centerLon]} zoom={6} />

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | Open-Meteo'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Current Selected Location Marker */}
          <Marker
            position={[centerLat, centerLon]}
            icon={createCustomIcon('#22d3ee')}
          >
            <Popup>
              <div className="p-1 text-slate-900">
                <strong className="text-sm font-bold">{location?.city || 'Selected Station'}</strong>
                <p className="text-xs text-slate-600 mt-0.5">Active Station Coordinates</p>
                <div className="mt-1 text-[11px] text-cyan-700 font-semibold">
                  Lat: {centerLat.toFixed(2)}°, Lon: {centerLon.toFixed(2)}°
                </div>
              </div>
            </Popup>
          </Marker>

          {/* Alert Hazard Circles */}
          {alertHotspots.map((spot) => {
            const color = spot.severity === 'red' ? '#ef4444' : spot.severity === 'orange' ? '#f59e0b' : '#eab308';
            return (
              <React.Fragment key={spot.id}>
                <Circle
                  center={[spot.lat, spot.lon]}
                  radius={spot.radius}
                  pathOptions={{
                    color,
                    fillColor: color,
                    fillOpacity: 0.22,
                    weight: 2,
                  }}
                />
                <Marker
                  position={[spot.lat, spot.lon]}
                  icon={createCustomIcon(color, true)}
                >
                  <Popup>
                    <div className="p-1 text-slate-900 max-w-[200px]">
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-700">
                        {spot.severity} Warning
                      </span>
                      <strong className="block text-xs font-bold mt-1 text-slate-900">{spot.title}</strong>
                      <p className="text-[11px] text-slate-600 mt-1">{spot.desc}</p>
                    </div>
                  </Popup>
                </Marker>
              </React.Fragment>
            );
          })}
        </MapContainer>

        {/* Legend Overlay */}
        <div className="absolute bottom-3 left-3 bg-slate-950/90 border border-slate-700/80 rounded-xl p-2.5 z-[1000] text-xs backdrop-blur-md shadow-lg space-y-1">
          <div className="font-bold text-white text-[10px] uppercase tracking-wider">
            Warning Color Index (Demo)
          </div>
          <div className="grid grid-cols-2 gap-x-2.5 gap-y-0.5 text-[10px]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-red-300">Red Alert</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-amber-300">Orange Alert</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-yellow-400" />
              <span className="text-yellow-300">Yellow Watch</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span className="text-cyan-300">Station Pin</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
