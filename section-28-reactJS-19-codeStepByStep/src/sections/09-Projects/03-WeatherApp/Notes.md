# Weather App Project

## What You'll Build

A weather application that searches for city weather data, handles loading/error states, and displays weather information beautifully.

## Key Concepts Covered

### 1. Multiple State Variables for UI States

```jsx
const [city, setCity] = useState('');      // Input value
const [weather, setWeather] = useState(null); // Weather data
const [loading, setLoading] = useState(false); // Loading indicator
const [error, setError] = useState('');     // Error message
```

**Each state controls a different aspect of the UI.**

### 2. Async Operations Pattern

```jsx
const searchWeather = async (e) => {
  e.preventDefault();
  if (!city.trim()) return;

  // 1. Start loading, clear previous states
  setLoading(true);
  setError('');
  setWeather(null);

  // 2. Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));

  // 3. Handle success or error
  const data = MOCK_WEATHER[city.toLowerCase()];
  if (data) {
    setWeather({ city: city.trim(), ...data });
  } else {
    setError(`Weather data not found for "${city}"`);
  }
  
  // 4. Stop loading
  setLoading(false);
};
```

### 3. UI State Machine

The app has 4 mutually exclusive states:

| State | Condition | Display |
|-------|-----------|---------|
| Initial | `!weather && !loading && !error` | Welcome message |
| Loading | `loading === true` | Spinner/message |
| Error | `error !== ''` | Error message |
| Success | `weather !== null` | Weather card |

```jsx
{loading && <LoadingUI />}
{error && <ErrorUI />}
{weather && !loading && <WeatherCard />}
{!weather && !loading && !error && <InitialUI />}
```

### 4. Mock Data Pattern

```jsx
const MOCK_WEATHER = {
  'new york': { temp: 72, condition: 'Partly Cloudy', ... },
  'london': { temp: 58, condition: 'Rainy', ... },
};
```

Use mock data during development before connecting to real APIs.

### 5. Quick Search Feature

```jsx
const quickSearch = (cityName) => {
  setCity(cityName);  // Update input for visual feedback
  // ... fetch weather
};
```

Programmatically trigger searches for better UX.

## State Flow Diagram

```
[Initial State]
      │
      ▼ (user searches)
[Loading State]
      │
      ├──► [Success State] ──► (user searches again) ──► [Loading]
      │
      └──► [Error State] ──► (user searches again) ──► [Loading]
```

## Features Implemented

- City search input
- Quick search buttons
- Loading indicator
- Error handling with helpful messages
- Weather display card
- Temperature, humidity, wind data
- Weather condition icons
- Gradient background

## Real API Integration

To connect to a real weather API:

```jsx
const searchWeather = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`
    );
    
    if (!response.ok) throw new Error('City not found');
    
    const data = await response.json();
    setWeather({
      city: data.name,
      temp: Math.round(data.main.temp),
      condition: data.weather[0].description,
      humidity: data.main.humidity,
      wind: Math.round(data.wind.speed),
    });
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

## CSS Techniques Used

### Gradient Background
```jsx
background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
```

### Glass-morphism Effect
```jsx
background: 'rgba(255,255,255,0.15)',
border: '1px solid rgba(255,255,255,0.3)',
```

### Pill-shaped Buttons
```jsx
borderRadius: '20px'
```

## Best Practices Demonstrated

1. **Clear state before new request**: Reset error/weather when searching
2. **Disable during loading**: Prevent duplicate requests
3. **Helpful error messages**: Guide user to valid inputs
4. **Visual feedback**: Show what's happening at each stage

## Extension Ideas

- 5-day forecast
- Celsius/Fahrenheit toggle
- Geolocation (current location)
- Recent searches history
- Weather animations
- useReducer for state management
- Custom hooks (useWeather)
