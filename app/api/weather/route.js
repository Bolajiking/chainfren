import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon) {
    return NextResponse.json(
      { error: 'Latitude and longitude are required' },
      { status: 400 }
    );
  }

  try {
    // Using OpenWeatherMap API (free tier available)
    // You'll need to get an API key from https://openweathermap.org/api
    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    if (!apiKey) {
      // Fallback: return mock data if API key is not set
      return NextResponse.json({
        temperature: 27,
        condition: 'Partly Sunny',
        location: 'Lagos, Nigeria',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        day: new Date().toLocaleDateString('en-US', { weekday: 'long' })
      });
    }

    // Use the free tier endpoint (data/2.5/weather) instead of paid (data/3.0/onecall)
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );

    if (!weatherResponse.ok) {
      const errorData = await weatherResponse.json().catch(() => ({}));
      console.error('Weather API error:', errorData);
      // Return mock data if API fails
      return NextResponse.json({
        temperature: 27,
        condition: 'Partly Sunny',
        location: 'Lagos, Nigeria',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        day: new Date().toLocaleDateString('en-US', { weekday: 'long' })
      });
    }

    const weatherData = await weatherResponse.json();

    // Get location name using reverse geocoding
    const geocodeResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`
    );

    let locationName = 'Unknown Location';
    if (geocodeResponse.ok) {
      const geocodeData = await geocodeResponse.json();
      if (geocodeData && geocodeData.length > 0) {
        const location = geocodeData[0];
        locationName = `${location.name}${location.state ? `, ${location.state}` : ''}${location.country ? `, ${location.country}` : ''}`;
      }
    }else{
      console.error("geocodeResponse error",geocodeResponse)
    }

    // Map weather condition to display text
    const conditionMap = {
      'Clear': 'Sunny',
      'Clouds': 'Partly Cloudy',
      'Rain': 'Rainy',
      'Drizzle': 'Drizzly',
      'Thunderstorm': 'Stormy',
      'Snow': 'Snowy',
      'Mist': 'Misty',
      'Fog': 'Foggy'
    };

    const condition = conditionMap[weatherData.weather[0].main] || weatherData.weather[0].main;

    return NextResponse.json({
      temperature: Math.round(weatherData.main.temp),
      condition: condition,
      location: locationName,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      day: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
      icon: weatherData.weather[0].main.toLowerCase()
    });
  } catch (error) {
    console.error('Error fetching weather:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}

