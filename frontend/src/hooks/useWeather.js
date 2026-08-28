import { useEffect, useCallback } from 'react';
import useStore from '../store/useStore';

export const useWeather = () => {
  const location = useStore((state) => state.location);
  const currentWeather = useStore((state) => state.currentWeather);
  const forecast = useStore((state) => state.forecast);
  const alerts = useStore((state) => state.alerts);
  const climateData = useStore((state) => state.climateData);
  const loading = useStore((state) => state.isLoadingWeather);
  const error = useStore((state) => state.weatherError);
  const fetchWeatherData = useStore((state) => state.fetchWeatherData);

  const refreshWeather = useCallback(() => {
    fetchWeatherData(true);
  }, [fetchWeatherData]);

  useEffect(() => {
    fetchWeatherData(false);
  }, [fetchWeatherData]);

  return {
    location,
    currentWeather,
    forecast,
    alerts,
    climateData,
    loading,
    error,
    refreshWeather,
  };
};
