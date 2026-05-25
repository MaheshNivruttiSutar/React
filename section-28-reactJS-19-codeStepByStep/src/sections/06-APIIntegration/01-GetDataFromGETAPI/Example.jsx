import { useState, useEffect } from 'react';

export const GetdatafromgetapiExample = () => {
  // Users API state
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState(null);

  // Posts API state
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(1);

  // Weather API state (public API)
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(null);
  const [city, setCity] = useState('London');

  // Quotes API state
  const [quote, setQuote] = useState(null);
  const [quoteLoading, setQuoteLoading] = useState(false);

  // Fetch users from JSONPlaceholder
  const fetchUsers = async () => {
    setUsersLoading(true);
    setUsersError(null);
    
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsersError(error.message);
    } finally {
      setUsersLoading(false);
    }
  };

  // Fetch posts by user ID
  const fetchPostsByUser = async (userId) => {
    setPostsLoading(true);
    setPostsError(null);
    
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setPosts(data.slice(0, 3)); // Limit to 3 posts for display
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPostsError(error.message);
    } finally {
      setPostsLoading(false);
    }
  };

  // Fetch weather data
  const fetchWeather = async (cityName) => {
    setWeatherLoading(true);
    setWeatherError(null);
    
    try {
      // Using a free weather API (OpenWeatherMap alternative)
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=demo&q=${cityName}`);
      
      if (!response.ok) {
        // Simulate weather data for demo since we don't have API key
        const mockWeather = {
          location: { name: cityName, country: 'Demo' },
          current: {
            temp_c: Math.round(Math.random() * 30 + 5),
            condition: { text: 'Partly Cloudy', icon: '//cdn.weatherapi.com/weather/64x64/day/116.png' },
            humidity: Math.round(Math.random() * 40 + 30),
            wind_kph: Math.round(Math.random() * 20 + 5)
          }
        };
        setWeather(mockWeather);
        return;
      }
      
      const data = await response.json();
      setWeather(data);
    } catch {
      // Fallback to mock data for demo
      const mockWeather = {
        location: { name: cityName, country: 'Demo' },
        current: {
          temp_c: Math.round(Math.random() * 30 + 5),
          condition: { text: 'Demo Weather', icon: '//cdn.weatherapi.com/weather/64x64/day/116.png' },
          humidity: Math.round(Math.random() * 40 + 30),
          wind_kph: Math.round(Math.random() * 20 + 5)
        }
      };
      setWeather(mockWeather);
    } finally {
      setWeatherLoading(false);
    }
  };

  // Fetch random quote
  const fetchRandomQuote = async () => {
    setQuoteLoading(true);
    
    try {
      const response = await fetch('https://api.quotable.io/random');
      
      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }
      
      const data = await response.json();
      setQuote(data);
    } catch {
      // Fallback quote
      setQuote({
        content: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
      });
    } finally {
      setQuoteLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
    fetchRandomQuote();
  }, []);

  // Load initial posts and weather
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPostsByUser(selectedUserId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchWeather(city);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch posts when user selection changes
  useEffect(() => {
    if (selectedUserId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchPostsByUser(selectedUserId);
    }
  }, [selectedUserId]);

  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '2rem' }}>GET API Integration Examples</h2>
        
        <div style={{ display: 'grid', gap: '2rem' }}>
          
          {/* Basic GET Request - Users List */}
          <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', border: '2px solid #e0e0e0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, color: '#2196f3' }}>👥 Fetch Users List</h3>
              <button
                onClick={fetchUsers}
                disabled={usersLoading}
                style={{
                  padding: '0.5rem 1rem',
                  background: usersLoading ? '#9e9e9e' : '#4caf50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: usersLoading ? 'not-allowed' : 'pointer'
                }}
              >
                {usersLoading ? '🔄 Loading...' : '🔄 Refresh Users'}
              </button>
            </div>

            <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '4px', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>
              <strong>API Endpoint:</strong> GET https://jsonplaceholder.typicode.com/users
            </div>

            {usersError ? (
              <div style={{ padding: '1rem', background: '#ffebee', borderRadius: '4px', color: '#d32f2f', border: '1px solid #f44336' }}>
                ❌ Error: {usersError}
              </div>
            ) : usersLoading ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
                Loading users...
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '0.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                {users.map(user => (
                  <div 
                    key={user.id}
                    onClick={() => setSelectedUserId(user.id)}
                    style={{ 
                      padding: '1rem', 
                      background: selectedUserId === user.id ? '#e3f2fd' : '#f9f9f9', 
                      borderRadius: '4px',
                      border: `2px solid ${selectedUserId === user.id ? '#2196f3' : 'transparent'}`,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ fontWeight: 'bold', color: '#333' }}>{user.name}</div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>@{user.username}</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>{user.email}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dependent API Call - Posts by Selected User */}
          <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', border: '2px solid #e0e0e0' }}>
            <h3 style={{ marginTop: 0, color: '#2196f3' }}>📝 Posts by Selected User</h3>
            
            <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '4px', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>
              <strong>API Endpoint:</strong> GET https://jsonplaceholder.typicode.com/posts?userId={selectedUserId}
            </div>

            {postsError ? (
              <div style={{ padding: '1rem', background: '#ffebee', borderRadius: '4px', color: '#d32f2f' }}>
                ❌ Error: {postsError}
              </div>
            ) : postsLoading ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
                Loading posts...
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {posts.map(post => (
                  <div key={post.id} style={{ padding: '1rem', background: '#f9f9f9', borderRadius: '4px', border: '1px solid #ddd' }}>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>{post.title}</h4>
                    <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                      {post.body.substring(0, 100)}...
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Weather API with Input */}
          <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', border: '2px solid #e0e0e0' }}>
            <h3 style={{ marginTop: 0, color: '#2196f3' }}>🌤️ Weather API with Input</h3>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'center' }}>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
                style={{
                  padding: '0.75rem',
                  border: '2px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  flex: 1
                }}
              />
              <button
                onClick={() => fetchWeather(city)}
                disabled={weatherLoading || !city}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: weatherLoading ? '#9e9e9e' : '#ff9800',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: weatherLoading || !city ? 'not-allowed' : 'pointer'
                }}
              >
                {weatherLoading ? 'Loading...' : 'Get Weather'}
              </button>
            </div>

            {weatherError ? (
              <div style={{ padding: '1rem', background: '#ffebee', borderRadius: '4px', color: '#d32f2f' }}>
                ❌ Error: {weatherError}
              </div>
            ) : weather ? (
              <div style={{ 
                padding: '1.5rem', 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                borderRadius: '8px', 
                color: 'white',
                textAlign: 'center'
              }}>
                <h4 style={{ margin: '0 0 1rem 0' }}>
                  📍 {weather.location.name}, {weather.location.country}
                </h4>
                <div style={{ fontSize: '3rem', margin: '1rem 0' }}>
                  {weather.current.temp_c}°C
                </div>
                <div style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
                  {weather.current.condition.text}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', fontSize: '0.9rem' }}>
                  <span>💧 Humidity: {weather.current.humidity}%</span>
                  <span>💨 Wind: {weather.current.wind_kph} km/h</span>
                </div>
              </div>
            ) : null}
          </div>

          {/* Random Quote API */}
          <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', border: '2px solid #e0e0e0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, color: '#2196f3' }}>💬 Random Quote API</h3>
              <button
                onClick={fetchRandomQuote}
                disabled={quoteLoading}
                style={{
                  padding: '0.5rem 1rem',
                  background: quoteLoading ? '#9e9e9e' : '#9c27b0',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: quoteLoading ? 'not-allowed' : 'pointer'
                }}
              >
                {quoteLoading ? '🔄 Loading...' : '🎲 New Quote'}
              </button>
            </div>

            <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '4px', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>
              <strong>API Endpoint:</strong> GET https://api.quotable.io/random
            </div>

            {quote && (
              <div style={{ 
                padding: '2rem', 
                background: '#f3e5f5', 
                borderRadius: '8px', 
                border: '2px solid #9c27b0',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '1rem', color: '#333' }}>
                  "{quote.content}"
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#9c27b0' }}>
                  — {quote.author}
                </div>
              </div>
            )}
          </div>

          {/* API Integration Patterns */}
          <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', border: '2px solid #e0e0e0' }}>
            <h3 style={{ marginTop: 0, color: '#667eea' }}>🔧 Common GET API Patterns</h3>
            
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
              <div style={{ padding: '1rem', background: '#e3f2fd', borderRadius: '6px' }}>
                <h4 style={{ marginTop: 0, color: '#1976d2' }}>✅ Loading States</h4>
                <div style={{ fontSize: '0.9rem', fontFamily: 'monospace' }}>
                  {`const [loading, setLoading] = useState(false);
setLoading(true);
// API call
setLoading(false);`}
                </div>
              </div>
              
              <div style={{ padding: '1rem', background: '#e8f5e8', borderRadius: '6px' }}>
                <h4 style={{ marginTop: 0, color: '#388e3c' }}>✅ Error Handling</h4>
                <div style={{ fontSize: '0.9rem', fontFamily: 'monospace' }}>
                  {`try {
  const response = await fetch(url);
  if (!response.ok) throw new Error();
} catch (error) {
  setError(error.message);
}`}
                </div>
              </div>
              
              <div style={{ padding: '1rem', background: '#fff3cd', borderRadius: '6px' }}>
                <h4 style={{ marginTop: 0, color: '#856404' }}>✅ Dependent Calls</h4>
                <div style={{ fontSize: '0.9rem', fontFamily: 'monospace' }}>
                  {`useEffect(() => {
  if (userId) {
    fetchPostsByUser(userId);
  }
}, [userId]);`}
                </div>
              </div>
              
              <div style={{ padding: '1rem', background: '#fce4ec', borderRadius: '6px' }}>
                <h4 style={{ marginTop: 0, color: '#c2185b' }}>✅ User Input APIs</h4>
                <div style={{ fontSize: '0.9rem', fontFamily: 'monospace' }}>
                  {`const handleSearch = () => {
  fetchData(searchTerm);
};`}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GetdatafromgetapiExample;