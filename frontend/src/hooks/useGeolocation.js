import { useState, useCallback } from 'react';
import axios from 'axios';
import useStore from '../store/useStore';

export const useGeolocation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const setLocation = useStore((state) => state.setLocation);

  const detectLocation = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const err = new Error('Geolocation is not supported by your browser.');
        setError(err.message);
        reject(err);
        return;
      }

      setLoading(true);
      setError(null);

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          try {
            // Reverse geocode with OpenStreetMap Nominatim or Open-Meteo
            const res = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`,
              { timeout: 5000 }
            );

            const addr = res.data?.address || {};
            const cityName =
              addr.city ||
              addr.town ||
              addr.district ||
              addr.state_district ||
              addr.county ||
              addr.state ||
              'Current Location';

            const locObj = {
              city: cityName,
              state: addr.state || '',
              country: addr.country || 'India',
              lat,
              lon,
            };

            setLocation(locObj);
            setLoading(false);
            resolve(locObj);
          } catch (err) {
            console.warn('Reverse geocode failed, using lat/lon fallback:', err);
            const fallbackLoc = {
              city: `Lat ${lat.toFixed(2)}, Lon ${lon.toFixed(2)}`,
              state: '',
              country: 'India',
              lat,
              lon,
            };
            setLocation(fallbackLoc);
            setLoading(false);
            resolve(fallbackLoc);
          }
        },
        (err) => {
          console.error('Geolocation error:', err);
          setError(err.message || 'Unable to retrieve location.');
          setLoading(false);
          reject(err);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    });
  }, [setLocation]);

  return { detectLocation, loading, error };
};
