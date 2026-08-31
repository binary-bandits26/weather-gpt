import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const DELHI = { lat: 28.6139, long: 77.209 };

function useWeather() {
  const [weatherJSON, setWeatherJSON] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async (lat, long) => {
    try {
      const res = await axios.post("/api/v1/weather", { lat, long });
      setWeatherJSON(res.data);
      setError(null);
    } catch {
      setError("Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  }, []);

  const getWeather = useCallback(
    (lat, long) => {
      setLoading(true);
      fetchWeather(lat, long);
    },
    [fetchWeather],
  );

  const fetchLocation = useCallback(() => {
    if (!navigator.geolocation) {
      getWeather(DELHI.lat, DELHI.long);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getWeather(latitude, longitude);
      },
      () => {
        getWeather(DELHI.lat, DELHI.long);
      },
    );
  }, [getWeather]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchWeather(DELHI.lat, DELHI.long);
  }, [fetchWeather]);

  return { weatherJSON, loading, error, fetchLocation };
}

export default useWeather;
