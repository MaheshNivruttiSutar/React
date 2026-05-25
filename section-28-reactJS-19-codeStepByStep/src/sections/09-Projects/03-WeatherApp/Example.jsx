import { useState } from 'react';

const MOCK_WEATHER = {
  'new york': { temp: 72, condition: 'Partly Cloudy', humidity: 65, wind: 8, icon: '⛅' },
  'london': { temp: 58, condition: 'Rainy', humidity: 80, wind: 12, icon: '🌧️' },
  'tokyo': { temp: 68, condition: 'Clear', humidity: 55, wind: 5, icon: '☀️' },
  'paris': { temp: 64, condition: 'Cloudy', humidity: 70, wind: 10, icon: '☁️' },
  'sydney': { temp: 77, condition: 'Sunny', humidity: 45, wind: 15, icon: '🌞' },
  'mumbai': { temp: 88, condition: 'Hot & Humid', humidity: 85, wind: 6, icon: '🌡️' },
};

export const WeatherAppExample = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchWeather = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError('');
    setWeather(null);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const data = MOCK_WEATHER[city.toLowerCase()];
    
    if (data) {
      setWeather({ city: city.trim(), ...data });
    } else {
      setError(`Weather data not found for "${city}". Try: New York, London, Tokyo, Paris, Sydney, or Mumbai`);
    }
    
    setLoading(false);
  };

  const quickSearch = (cityName) => {
    setCity(cityName);
    setLoading(true);
    setError('');
    setWeather(null);

    setTimeout(() => {
      const data = MOCK_WEATHER[cityName.toLowerCase()];
      setWeather({ city: cityName, ...data });
      setLoading(false);
    }, 500);
  };

  return (
    <div style={{ 
      padding: '2rem', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
      minHeight: '100vh' 
    }}>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h2 style={{ color: 'white', marginBottom: '1.5rem', textAlign: 'center' }}>
          Weather App
        </h2>

        {/* Search Form */}
        <form onSubmit={searchWeather} style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
              style={{
                flex: 1,
                padding: '1rem',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1rem',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '1rem 1.5rem',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '2px solid white',
                borderRadius: '12px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
              }}
            >
              {loading ? '...' : 'Search'}
            </button>
          </div>
        </form>

        {/* Quick Search Buttons */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '0.5rem', 
          justifyContent: 'center',
          marginBottom: '1.5rem' 
        }}>
          {Object.keys(MOCK_WEATHER).map(cityName => (
            <button
              key={cityName}
              onClick={() => quickSearch(cityName)}
              style={{
                padding: '0.5rem 1rem',
                background: 'rgba(255,255,255,0.15)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '20px',
                cursor: 'pointer',
                textTransform: 'capitalize',
                fontSize: '0.85rem',
              }}
            >
              {cityName}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '16px',
            padding: '3rem',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔍</div>
            <p style={{ color: '#667eea', fontWeight: 'bold' }}>Fetching weather data...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div style={{
            background: '#ff6b6b',
            color: 'white',
            borderRadius: '16px',
            padding: '1.5rem',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>😕</div>
            <p style={{ margin: 0 }}>{error}</p>
          </div>
        )}

        {/* Weather Display */}
        {weather && !loading && (
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '16px',
            padding: '2rem',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>{weather.icon}</div>
            <h3 style={{ 
              margin: '0 0 0.5rem 0', 
              color: '#333',
              textTransform: 'capitalize',
              fontSize: '1.5rem',
            }}>
              {weather.city}
            </h3>
            <p style={{ 
              color: '#667eea', 
              margin: '0 0 1rem 0',
              fontSize: '1.1rem',
            }}>
              {weather.condition}
            </p>
            
            <div style={{ 
              fontSize: '3.5rem', 
              fontWeight: 'bold', 
              color: '#333',
              marginBottom: '1.5rem',
            }}>
              {weather.temp}°F
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '1rem',
              background: '#f8f9fa',
              borderRadius: '12px',
              padding: '1rem',
            }}>
              <div>
                <p style={{ margin: 0, color: '#999', fontSize: '0.85rem' }}>Humidity</p>
                <p style={{ margin: '0.25rem 0 0 0', fontWeight: 'bold', color: '#333' }}>
                  💧 {weather.humidity}%
                </p>
              </div>
              <div>
                <p style={{ margin: 0, color: '#999', fontSize: '0.85rem' }}>Wind Speed</p>
                <p style={{ margin: '0.25rem 0 0 0', fontWeight: 'bold', color: '#333' }}>
                  💨 {weather.wind} mph
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Initial State */}
        {!weather && !loading && !error && (
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '16px',
            padding: '3rem',
            textAlign: 'center',
            border: '2px dashed rgba(255,255,255,0.3)',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌍</div>
            <p style={{ color: 'white', margin: 0 }}>
              Search for a city to see weather information
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherAppExample;
