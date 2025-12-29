'use client'
import React, { useState, useEffect } from 'react';

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState({
    temperature: 27,
    condition: 'PARTLY SUNNY',
    location: 'LAGOS, NIGERIA',
    time: '12:30:02',
    day: 'SUNDAY'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Get user's location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              
              try {
                const response = await fetch(
                  `/api/weather?lat=${latitude}&lon=${longitude}`
                );
                
                if (!response.ok) {
                  const errorData = await response.json().catch(() => ({}));
                  throw new Error(errorData.error || 'Failed to fetch weather');
                }
                
                const data = await response.json();
                
                // Check if we got an error in the response
                if (data.error) {
                  throw new Error(data.error);
                }
                
                setWeatherData({
                  temperature: data.temperature,
                  condition: data.condition.toUpperCase(),
                  location: data.location.toUpperCase(),
                  time: data.time,
                  day: data.day.toUpperCase()
                });
                setLoading(false);
                setError(null);
              } catch (err) {
                console.error('Weather fetch error:', err);
                // Don't set error state, just use default data
                setLoading(false);
              }
            },
            (error) => {
              // Handle different geolocation error codes
              let errorMessage = 'Location access denied';
              switch(error.code) {
                case error.PERMISSION_DENIED:
                  errorMessage = 'Location permission denied';
                  break;
                case error.POSITION_UNAVAILABLE:
                  errorMessage = 'Location information unavailable';
                  break;
                case error.TIMEOUT:
                  errorMessage = 'Location request timeout';
                  break;
                default:
                  errorMessage = 'Location error occurred';
                  break;
              }
              console.error('Geolocation error:', errorMessage, error);
              // Use default data if geolocation fails - don't show error to user
              setLoading(false);
            },
            {
              enableHighAccuracy: false,
              timeout: 10000,
              maximumAge: 300000 // Cache for 5 minutes
            }
          );
        } else {
          // Geolocation not supported, use default data
          console.log('Geolocation not supported by browser');
          setLoading(false);
        }
      } catch (err) {
        console.error('Error:', err);
        setLoading(false);
      }
    };

    fetchWeather();

    // Update time every second
    const timeInterval = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      });
      setWeatherData(prev => ({ ...prev, time: timeString }));
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  // Get weather icon based on condition
  const getWeatherIcon = () => {
    const condition = weatherData.condition.toLowerCase();
    
    if (condition.includes('sunny') || condition.includes('clear')) {
      return (
        <img src="/sunPro.png" alt="sun" className="w-32 h-32" />
      );
    } else if (condition.includes('cloudy') || condition.includes('partly')) {
      return (
       <img src="/Cloud.png" alt="cloudy" className="w-32 h-32" />
      );
    } else if (condition.includes('rain')) {
      return (
       <img src="/Rain.png" alt="rain" className="w-32 h-32" />
      );
    } else {
      // Default icon
      return (
        <img src="/Sunn.png" alt="cloudy" className="w-32 h-32" />
      );
    }
  };

  return (
    <div className="bg-[#8DAAFF] border-[2px] border-dark-blue rounded-[26px] p-6 md:p-8 h-auto md:h-[461px]">
      <div className="flex flex-col items-center gap-2 justify-center text-center">
        {loading ? (
          <div className="mb-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-dark-blue"></div>
          </div>
        ) : (
          <div className="mb-4">
            {getWeatherIcon()}
          </div>
        )}
        <p className="text-dark-blue font-semibold mb-2">
          {loading ? 'Loading...' : weatherData.condition}
        </p>
        <p className="text-black font-bold text-2xl mb-2 font-serif">
          {weatherData.temperature}°C <span className="font-serif relative">|</span> {weatherData.time}
        </p>
        <p className="text-black text-xs">
          • {weatherData.location}, {weatherData.day}
        </p>
        {error && (
          <p className="text-red-500 text-xs mt-2">Unable to fetch weather</p>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;

