import { NextResponse } from 'next/server';

// Derive a {lat, lon} for the request without prompting the user.
// Priority:
//   1. Explicit ?lat&lon query (e.g. user clicked "use my precise location")
//   2. Vercel edge geo headers (x-vercel-ip-latitude / -longitude)
//   3. Cloudflare geo headers (cf-iplatitude / -longitude)
//   4. ipapi.co lookup against the client IP
//   5. Lagos fallback (matches the brand HQ)
async function resolveLatLon(request) {
  const { searchParams } = new URL(request.url)
  const qLat = searchParams.get('lat')
  const qLon = searchParams.get('lon')
  if (qLat && qLon) return { lat: qLat, lon: qLon, source: 'query' }

  const h = request.headers
  const vLat = h.get('x-vercel-ip-latitude')
  const vLon = h.get('x-vercel-ip-longitude')
  if (vLat && vLon) return { lat: vLat, lon: vLon, source: 'vercel' }

  const cfLat = h.get('cf-iplatitude')
  const cfLon = h.get('cf-iplongitude')
  if (cfLat && cfLon) return { lat: cfLat, lon: cfLon, source: 'cloudflare' }

  const fwd = h.get('x-forwarded-for') || ''
  const ip = fwd.split(',')[0].trim() || h.get('x-real-ip')
  if (ip && ip !== '127.0.0.1' && ip !== '::1') {
    try {
      const r = await fetch(`https://ipapi.co/${ip}/json/`, { headers: { 'User-Agent': 'chainfren-weather/1.0' }, cache: 'no-store' })
      if (r.ok) {
        const j = await r.json()
        if (j.latitude && j.longitude) return { lat: String(j.latitude), lon: String(j.longitude), source: 'ipapi' }
      }
    } catch {}
  }

  return { lat: '6.5244', lon: '3.3792', source: 'fallback' }
}

export async function GET(request) {
  const { lat, lon } = await resolveLatLon(request)

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

