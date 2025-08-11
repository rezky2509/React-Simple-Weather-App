// 1. Interface for the 'coord' object
export interface WeatherCoordinates {
  lon: number; // Longitude
  lat: number; // Latitude
}

// 2. Interface for individual objects within the 'weather' array
export interface WeatherCondition {
  id: number; // Weather condition ID
  main: string; // Group of weather parameters (e.g., "Clouds", "Rain")
  description: string; // Weather condition within the group (e.g., "overcast clouds")
  icon: string; // Weather icon ID
}

// 3. Interface for the 'main' object
export interface WeatherMain {
  temp: number; // Temperature (e.g., in Kelvin if not specified, or Celsius/Fahrenheit with 'units' param)
  feels_like: number; // "Feels like" temperature
  temp_min: number; // Minimum temperature at the moment
  temp_max: number; // Maximum temperature at the moment
  pressure: number; // Atmospheric pressure (hPa)
  humidity: number; // Humidity (%)
  sea_level?: number; // Atmospheric pressure on the sea level (hPa) - Optional
  grnd_level?: number; // Atmospheric pressure on the ground level (hPa) - Optional
}

// 4. Interface for the 'wind' object
export interface WeatherWind {
  speed: number; // Wind speed (e.g., in meter/sec)
  deg: number; // Wind direction (degrees, meteorological)
  gust?: number; // Wind gust speed (e.g., in meter/sec) - Optional
}

// 5. Interface for the 'clouds' object
export interface WeatherClouds {
  all: number; // Cloudiness (%)
}

// 6. Interface for the 'sys' object
export interface WeatherSys {
  country: string; // Country code (e.g., "MY" for Malaysia)
  sunrise: number; // Sunrise time (Unix, UTC)
  sunset: number; // Sunset time (Unix, UTC)
  // Note: 'type' and 'id' can sometimes appear in 'sys' for some APIs/versions,
  // but they are not in your sample. I'll omit them for strict matching.
}

// 7. The main interface for the entire JSON response
export interface CityWeatherResponse {
  coord: WeatherCoordinates;
  weather: WeatherCondition[]; // An array of weather conditions
  base: string; // Internal parameter
  main: WeatherMain;
  visibility: number; // Visibility, meters
  wind: WeatherWind;
  clouds: WeatherClouds;
  dt: number; // Time of data calculation (Unix, UTC)
  sys: WeatherSys;
  timezone: number; // Shift in seconds from UTC
  id: number; // City ID
  name: string; // City name
  cod: number; // Internal parameter, usually 200 for success
}