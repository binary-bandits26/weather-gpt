import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getWeatherData, getActiveDisasterAlerts, getClimateTrends } from '../api/weatherApi';

const useStore = create(
  persist(
    (set, get) => ({
      // Location
      location: { city: 'New Delhi', state: 'Delhi', country: 'India', lat: 28.6139, lon: 77.209 },
      setLocation: (location) => {
        set({ location });
        // Automatically fetch weather when location changes
        get().fetchWeatherData(true);
      },

      // Language
      language: 'en',
      setLanguage: (language) => set({ language }),

      // Units
      units: 'metric', // 'metric' | 'imperial'
      setUnits: (units) => set({ units }),

      // Global Data Cache
      currentWeather: null,
      forecast: null,
      alerts: [],
      climateData: [],
      isLoadingWeather: false,
      weatherError: null,
      lastFetchedLat: null,
      lastFetchedLon: null,

      // Centralized Fetch Action (deduplicates requests across components)
      fetchWeatherData: async (force = false) => {
        const { location, lastFetchedLat, lastFetchedLon, isLoadingWeather, currentWeather } = get();
        if (!location?.lat || !location?.lon) return;

        // Skip if already loading or already fetched for this coordinate (unless force refresh)
        if (!force && currentWeather && lastFetchedLat === location.lat && lastFetchedLon === location.lon) {
          return;
        }

        if (isLoadingWeather) return;

        set({ isLoadingWeather: true, weatherError: null });

        try {
          const [weather, alerts, climate] = await Promise.all([
            getWeatherData(location.lat, location.lon),
            getActiveDisasterAlerts(),
            getClimateTrends(),
          ]);

          set({
            currentWeather: weather,
            forecast: {
              daily: weather.daily,
              hourly: weather.hourly,
            },
            alerts,
            climateData: climate,
            lastFetchedLat: location.lat,
            lastFetchedLon: location.lon,
            isLoadingWeather: false,
            weatherError: null,
          });
        } catch (err) {
          console.error('Centralized weather fetch error:', err);
          set({
            isLoadingWeather: false,
            weatherError: 'Unable to load live weather. Please check your connection and try again.',
          });
        }
      },

      // UI Drawer state
      sidebarOpen: false,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      // Notifications preference
      notificationsEnabled: false,
      setNotificationsEnabled: (v) => set({ notificationsEnabled: v }),
    }),
    {
      name: 'weathergpt-store',
      partialize: (state) => ({
        location: state.location,
        language: state.language,
        units: state.units,
        notificationsEnabled: state.notificationsEnabled,
      }),
    }
  )
);

export default useStore;
